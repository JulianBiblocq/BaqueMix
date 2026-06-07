/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { instrumentsConfig } from '../data';
import { Language } from '../types';

import { getNextStepValue } from './InstrumentDetailEditor';

export interface TouchSelectorState {
  patternId: number;
  stepIdx: number;
  instId: string;
  x: number;
  y: number;
  currentVal: string | number;
  onSelect: (val: string) => void;
}

interface TouchStrokeSelectorProps {
  selector: TouchSelectorState;
  hoveredStroke: string | null;
  setHoveredStroke: (val: string | null) => void;
  onClose: () => void;
  lang: Language;
}

export const TouchStrokeSelector: React.FC<TouchStrokeSelectorProps> = ({
  selector,
  hoveredStroke,
  setHoveredStroke,
  onClose,
  lang,
}) => {
  const hoveredStrokeRef = useRef<string | null>(null);

  useEffect(() => {
    hoveredStrokeRef.current = hoveredStroke;
  }, [hoveredStroke]);

  const inst = instrumentsConfig.find((i) => i.id === selector.instId);
  if (!inst) return null;

  // Extract strokes excluding 'text' key
  const instStrokes = Object.keys(inst.colors).filter((k) => k !== 'text');
  // Include "0" (silence) at the beginning of the list
  const allChoices = ['0', ...instStrokes];

  useEffect(() => {
    // 1. Touch drag-to-select tracking
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element) {
        const strokeVal = element.getAttribute('data-stroke-val');
        if (strokeVal !== null) {
          setHoveredStroke(strokeVal);
        } else {
          setHoveredStroke(null);
        }
      }
    };

    const handleTouchEnd = () => {
      if (hoveredStrokeRef.current !== null && hoveredStrokeRef.current !== String(selector.currentVal)) {
        selector.onSelect(hoveredStrokeRef.current);
      } else {
        const nextVal = getNextStepValue(inst.id, inst.type, selector.currentVal);
        selector.onSelect(String(nextVal));
      }
      onClose();
    };

    // 2. Mouse up validation (when dragging/releasing mouse outside)
    const handleMouseUp = () => {
      if (hoveredStrokeRef.current !== null && hoveredStrokeRef.current !== String(selector.currentVal)) {
        selector.onSelect(hoveredStrokeRef.current);
      } else {
        const nextVal = getNextStepValue(inst.id, inst.type, selector.currentVal);
        selector.onSelect(String(nextVal));
      }
      onClose();
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [selector, onClose, setHoveredStroke, inst]);

  return (
    <div
      className="fixed z-[9999] flex flex-col items-center pointer-events-none"
      style={{
        left: `${selector.x}px`,
        top: `${selector.y}px`,
        transform: 'translate(-50%, -100%) translateY(-10px)',
      }}
    >
      {/* Popover Bubble Container */}
      <div className="flex items-center gap-1.5 p-2 bg-[#f4ecd8] border-2 border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a] pointer-events-auto select-none rounded-none">
        {allChoices.map((stroke) => {
          const isSilence = stroke === '0';
          const strokeVal = isSilence ? '0' : stroke;
          const isHovered = hoveredStroke === strokeVal;

          let bgColor = isSilence ? '#7f8c8d' : (inst.colors[stroke] || '#111');
          let textColor = isSilence ? '#fff' : (inst.colors.text || '#fff');
          if (inst.id === 'gongue' && (stroke === 'AIG' || stroke === 'aig')) {
            textColor = '#000';
          }

          // Display label formatting
          let displayLabel = stroke;
          if (isSilence) {
            displayLabel = 'Ø';
          } else if (inst.type === 'gongue') {
            if (stroke === 'GRV') displayLabel = 'G';
            else if (stroke === 'grv') displayLabel = 'g';
            else if (stroke === 'AIG') displayLabel = 'A';
            else if (stroke === 'aig') displayLabel = 'a';
          }

          return (
            <div
              key={stroke}
              data-stroke-val={strokeVal}
              onMouseEnter={() => setHoveredStroke(strokeVal)}
              onMouseLeave={() => setHoveredStroke(null)}
              className={`w-9 h-9 flex items-center justify-center font-bold text-xs cursor-pointer transition-all border-2 ${
                isHovered
                  ? 'border-[#f1c40f] scale-110 shadow-[0_0_8px_#f1c40f] z-10'
                  : 'border-[#1a1a1a]'
              }`}
              style={{
                backgroundColor: bgColor,
                color: textColor,
              }}
            >
              {displayLabel}
            </div>
          );
        })}
      </div>

      {/* Popover Downward Arrow */}
      <div
        className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#1a1a1a]"
        style={{ marginTop: '-2px' }}
      />
    </div>
  );
};
