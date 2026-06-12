/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Tone from 'tone';

const filenames = {
  fort: [
    'Tarol fort D1.wav',
    'Tarol fort D2.wav',
    'Tarol fort D3.wav',
    'Tarol fort D4.wav'
  ],
  faible: [
    'Tarol faible d1.wav',
    'Tarol faible d2.wav',
    'Tarol faible d3.wav',
    'Tarol faible d4.wav'
  ],
  click: [
    'Tarol click c1.wav',
    'Tarol click c2.wav'
  ],
  fla: [
    'Tarol fla1.wav',
    'Tarol fla2.wav'
  ],
  tremer: [
    'Tarol tremer.wav'
  ],
  cerclage: [
    'Tarol cerclage x.wav'
  ]
};

export class TarolSampler {
  private buffers: { [key: string]: Tone.ToneAudioBuffer[] } = {
    fort: [],
    faible: [],
    click: [],
    fla: [],
    tremer: [],
    cerclage: []
  };

  private lastIndices: { [key: string]: number } = {
    fort: -1,
    faible: -1,
    click: -1,
    fla: -1,
    tremer: -1,
    cerclage: -1
  };

  private channel: Tone.Channel | null = null;
  private activeSources: Set<Tone.ToneBufferSource> = new Set();
  private activeTremerSources: Set<Tone.ToneBufferSource> = new Set();

  constructor() {}

  /**
   * Connect to the Mixer channel of Tarol
   */
  public connect(channel: Tone.Channel): this {
    this.channel = channel;
    return this;
  }

  /**
   * Preload all 14 samples using Tone.ToneAudioBuffer
   */
  public async load(baseUrl: string, onSampleLoaded?: () => void): Promise<void> {
    const promises: Promise<void>[] = [];

    Object.keys(filenames).forEach((groupKey) => {
      const files = filenames[groupKey as keyof typeof filenames];
      files.forEach((filename, idx) => {
        // Encode filenames properly to support spaces
        const url = `${baseUrl}${encodeURIComponent(filename)}`;
        
        promises.push(
          new Promise<void>((resolve, reject) => {
            const buf = new Tone.ToneAudioBuffer(
              url,
              () => {
                this.buffers[groupKey][idx] = buf;
                if (onSampleLoaded) {
                  onSampleLoaded();
                }
                resolve();
              },
              (err) => {
                console.error(`Failed to load Tarol sample: ${url}`, err);
                reject(err);
              }
            );
          })
        );
      });
    });

    await Promise.all(promises);
  }

  /**
   * Select a random index that differs from the last played index in the group (anti-repetition)
   */
  private selectIndex(groupKey: string, numSamples: number): number {
    if (numSamples <= 1) return 0;
    const lastIdx = this.lastIndices[groupKey];
    
    const available: number[] = [];
    for (let i = 0; i < numSamples; i++) {
      if (i !== lastIdx) {
        available.push(i);
      }
    }
    
    const chosen = available[Math.floor(Math.random() * available.length)];
    this.lastIndices[groupKey] = chosen;
    return chosen;
  }

  /**
   * Play a specific stroke type at triggerTime with optional velocity/gain and decay multipliers
   */
  public play(strokeKey: string, time: number, velocity: number, decayMultiplier: number): void {
    let groupKey = '';
    
    // Normalize keys (supports both hyphens from scheduler and underscores from sandbox)
    const k = strokeKey.toLowerCase().replace('_', '-');
    if (k === 'fort-d' || k === 'fort-e') {
      groupKey = 'fort';
    } else if (k === 'faible-d' || k === 'faible-e') {
      groupKey = 'faible';
    } else if (k === 'click') {
      groupKey = 'click';
    } else if (k === 'fla') {
      groupKey = 'fla';
    } else if (k === 'tremer') {
      groupKey = 'tremer';
    } else if (k === 'cerclage') {
      groupKey = 'cerclage';
    } else {
      console.warn(`TarolSampler: unknown stroke key: ${strokeKey}`);
      return;
    }

    const groupBuffers = this.buffers[groupKey];
    if (!groupBuffers || groupBuffers.length === 0) return;

    // Smart Round-Robin index selection
    const chosenIdx = this.selectIndex(groupKey, groupBuffers.length);
    const buffer = groupBuffers[chosenIdx];
    if (!buffer || !buffer.loaded) return;

    // Choke trêmulo: stop any active trêmulo sound when another sound starts
    if (this.activeTremerSources.size > 0) {
      this.activeTremerSources.forEach((src) => {
        try {
          src.stop(time);
        } catch (_) {}
      });
      this.activeTremerSources.clear();
    }

    // Create Tone.ToneBufferSource (autoDispose is true by default)
    const source = new Tone.ToneBufferSource({
      url: buffer
    });

    // Create a Gain node to control velocity/volume
    const gainNode = new Tone.Gain(velocity);
    source.connect(gainNode);

    // Connect to channel or destination
    if (this.channel) {
      gainNode.connect(this.channel);
    } else {
      gainNode.toDestination();
    }

    // Apply decay multiplier if less than 1.0 (truncates duration)
    const duration = buffer.duration * decayMultiplier;
    
    // Play sound
    if (decayMultiplier < 1.0) {
      source.start(time, 0, duration);
    } else {
      source.start(time);
    }

    // Keep track of active sources for stopAll
    this.activeSources.add(source);
    
    if (groupKey === 'tremer') {
      this.activeTremerSources.add(source);
      source.onended = () => {
        this.activeTremerSources.delete(source);
        this.activeSources.delete(source);
        gainNode.dispose();
      };
    } else {
      source.onended = () => {
        this.activeSources.delete(source);
        gainNode.dispose();
      };
    }
  }

  /**
   * Stop all active sources
   */
  public stopAll(): void {
    this.activeSources.forEach((source) => {
      try {
        source.stop();
      } catch (_) {}
    });
    this.activeSources.clear();
  }
}
