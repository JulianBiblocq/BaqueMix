import React, { useEffect, useRef, useContext } from 'react';
import { TimelineUIContext } from '../contexts/TimelineUIContext';
import { useAudio } from '../contexts/AudioContext';

const TimelinePlayheadComponent: React.FC = () => {
  const uiContext = useContext(TimelineUIContext);
  const audio = useAudio();
  const playheadRef = useRef<HTMLDivElement>(null);
  
  // État du moteur d'extrapolation
  const engineState = useRef({ 
    lastX: 0,
    lastTime: 0,
    velocity: 0, // Pixels par milliseconde
    isStopped: true,
  });
  
  const layoutCache = useRef({ 
    vw: 0, 
    lastScrollX: -1 
  });

  const MEASURE_W = uiContext ? uiContext.MEASURE_W : 0;
  const HEADER_W = uiContext ? uiContext.HEADER_W : 0;

  // Réinitialiser la vélocité et l'extrapolateur quand on met en pause ou qu'on arrête la lecture
  useEffect(() => {
    if (!audio.isPlaying) {
      engineState.current.isStopped = true;
      engineState.current.velocity = 0;
      const el = playheadRef.current;
      if (el) {
        el.style.transition = 'none';
      }
    }
  }, [audio.isPlaying]);

  useEffect(() => {
    const scrollEl = document.getElementById('timeline-scroll-container');
    if (!scrollEl) return;

    layoutCache.current.vw = scrollEl.clientWidth - HEADER_W;
    
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        layoutCache.current.vw = entries[0].contentRect.width - HEADER_W;
      }
    });
    resizeObserver.observe(scrollEl);

    const handleTick = (e: Event) => {
      const customEvent = e as CustomEvent<{ step: number; measure: number; maxTicks: number; ratio?: number }>;
      const { step, measure, ratio = step / customEvent.detail.maxTicks } = customEvent.detail;
      const el = playheadRef.current;
      
      if (!el) return;

      const now = performance.now();

      // --- 1. GESTION DE L'ARRÊT ---
      if (step < 0) {
        engineState.current.isStopped = true;
        el.style.transition = 'none';
        el.style.display = 'none';
        if (scrollEl) scrollEl.scrollLeft = 0;
        layoutCache.current.lastScrollX = 0;
        return;
      }

      if (el.style.display !== 'block') el.style.display = 'block';

      // Position mathématique absolue
      const exactX = measure * MEASURE_W + ratio * MEASURE_W;
      const dx = exactX - engineState.current.lastX;

      // --- 2. DÉTECTION DE RUPTURE (Lecture initiale, Loop, ou Seek manuel) ---
      // Si on recule, ou si on fait un bond anormalement grand (> 50% d'une mesure)
      if (engineState.current.isStopped || dx < 0 || Math.abs(dx) > MEASURE_W * 0.5) {
        engineState.current.isStopped = false;
        engineState.current.velocity = 0;
        engineState.current.lastX = exactX;
        engineState.current.lastTime = now;

        // Snap immédiat sans transition
        el.style.transition = 'none';
        el.style.transform = `translate3d(${HEADER_W + exactX}px, 0, 0)`;
        
        // Sécurité : force le reflow CSS pour garantir l'application immédiate du saut
        void el.offsetWidth;
        
        // Ajustement forcé du scroll en cas de saut (ex: retour au début de la boucle)
        if (layoutCache.current.vw > 0 && scrollEl) {
           const targetScroll = Math.max(0, exactX - layoutCache.current.vw * 0.1);
           scrollEl.scrollLeft = targetScroll;
           layoutCache.current.lastScrollX = targetScroll;
        }
        return;
      }

      // --- 3. CALCUL DE LA VÉLOCITÉ ---
      const dt = now - engineState.current.lastTime;
      
      // On ignore les calculs si dt est trop petit (< 20ms) pour éviter les pics de vélocité
      // quand plusieurs ticks sont "rattrapés" dans la même frame (très fréquent sur le step 0/1).
      if (dt >= 20) {
        if (dt < 2000) {
          const currentVel = dx / dt;
          // Sécurité supplémentaire : ignorer les vélocités absurdes (> 10 px/ms)
          if (currentVel > 0 && currentVel < 10) {
            engineState.current.velocity = engineState.current.velocity === 0 
              ? currentVel 
              : engineState.current.velocity * 0.7 + currentVel * 0.3;
          }
        } else {
          // Si dt est trop grand (ex: onglet inactif), on réinitialise la vélocité
          engineState.current.velocity = 0;
        }
        
        engineState.current.lastX = exactX;
        engineState.current.lastTime = now;
      }

      // --- 4. DEAD RECKONING (Extrapolation 100% GPU) ---
      if (engineState.current.velocity > 0) {
        // On demande au CSS de viser une position dans le futur.
        // lookAheadMs doit être supérieur au temps entre deux ticks (dt) pour que 
        // la transition ne s'arrête jamais avant le prochain tick.
        const lookAheadMs = Math.max(150, dt > 0 ? dt * 1.5 : 200);
        const predictedX = exactX + (engineState.current.velocity * lookAheadMs);

        el.style.transition = `transform ${lookAheadMs}ms linear`;
        el.style.transform = `translate3d(${HEADER_W + predictedX}px, 0, 0)`;
      } else {
        // Fallback si on n'a pas encore de vélocité
        el.style.transition = 'none';
        el.style.transform = `translate3d(${HEADER_W + exactX}px, 0, 0)`;
      }

      // --- 5. AUTO-SCROLL (Pagination douce) ---
      const { vw, lastScrollX } = layoutCache.current;
      if (vw > 0 && scrollEl) {
        const currentScroll = lastScrollX !== -1 ? lastScrollX : scrollEl.scrollLeft;
        const playheadScreenX = exactX - currentScroll;

        // Tourne la page uniquement quand on arrive à 95% de l'écran visible
        if (playheadScreenX > vw * 0.95) {
          const nextScroll = currentScroll + (vw * 0.90);
          scrollEl.scrollLeft = nextScroll;
          layoutCache.current.lastScrollX = nextScroll;
        } 
      }
    };

    window.addEventListener('o-girador-tick', handleTick);

    return () => {
      window.removeEventListener('o-girador-tick', handleTick);
      resizeObserver.disconnect();
    };
  }, [MEASURE_W, HEADER_W]);

  if (!uiContext) return null;

  return (
    <div
      ref={playheadRef}
      className="absolute top-0 bottom-0 border-l-2 border-red-600 pointer-events-none z-30 shadow-[0_0_10px_rgba(220,38,38,0.7)]"
      style={{
        left: 0,
        display: 'none',
        willChange: 'transform',
      }}
    />
  );
};

export const TimelinePlayhead = React.memo(TimelinePlayheadComponent);
