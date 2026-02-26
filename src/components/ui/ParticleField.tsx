'use client';

import { useEffect, useRef } from 'react';

export function ParticleField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      const size = 1 + Math.random() * 2.5;
      Object.assign(p.style, {
        position: 'absolute',
        left: Math.random() * 100 + '%',
        width: size + 'px',
        height: size + 'px',
        background: Math.random() > .6 ? '#c084fc' : '#a855f7',
        borderRadius: '50%',
        animation: `particleDrift linear infinite`,
        animationDuration: (6 + Math.random() * 14) + 's',
        animationDelay: (-Math.random() * 18) + 's',
        opacity: (0.3 + Math.random() * 0.6).toString(),
      });
      container.appendChild(p);
      particles.push(p);
    }

    return () => { particles.forEach(p => p.remove()); };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute', inset: 0,
        overflow: 'hidden', pointerEvents: 'none', zIndex: 1,
      }}
    />
  );
}