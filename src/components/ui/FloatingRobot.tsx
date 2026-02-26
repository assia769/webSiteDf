'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export function FloatingRobot() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on mouse move
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      const { innerWidth, innerHeight } = window;
      const dx = (e.clientX / innerWidth  - .5) * 22;
      const dy = (e.clientY / innerHeight - .5) * 14;
      wrapRef.current.style.transform =
        `translateY(var(--float-y, 0px)) translate(${dx}px, ${dy}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'absolute',
        right: '4%',
        top: '50%',
        width: 'min(480px, 44vw)',
        zIndex: 4,
        animation: 'robotLevitate 5s ease-in-out infinite',
        transition: 'transform .1s linear',
        willChange: 'transform',
      }}
    >
      {/* Sparkles */}
      {SPARKLES.map((sp, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...sp.pos,
            width: sp.size,
            height: sp.size,
            background: sp.color,
            clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)',
            animation: `sparkle 2s ease-in-out infinite`,
            animationDelay: sp.delay,
          }}
        />
      ))}

      {/* Orbital ring */}
      <svg
        viewBox="0 0 400 80"
        fill="none"
        style={{
          position: 'absolute', bottom: '22%', left: '-15%',
          width: '130%', pointerEvents: 'none',
          animation: 'orbitalSpin 8s linear infinite',
        }}
      >
        <ellipse cx="200" cy="40" rx="195" ry="28" stroke="rgba(180,100,255,.38)" strokeWidth="1.5" fill="none"/>
        <circle cx="395" cy="40" r="4" fill="rgba(200,130,255,.8)"/>
        <circle cx="5"   cy="40" r="3" fill="rgba(168,85,247,.6)"/>
      </svg>

      {/* Floor glow */}
      <div
        style={{
          position: 'absolute', bottom: '-6%', left: '50%',
          width: '80%', height: 50,
          background: 'radial-gradient(ellipse, rgba(200,120,255,.6) 0%, rgba(140,60,220,.2) 50%, transparent 75%)',
          borderRadius: '50%',
          filter: 'blur(12px)',
          animation: 'floorPulse 3s ease-in-out infinite',
        }}
      />

      {/* AI Character image */}
      <Image
        src="/assets/robot/ai.png"
        alt="DFCraft AI Mascot"
        width={480}
        height={520}
        priority
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 50px rgba(180,100,255,.65)) drop-shadow(0 30px 80px rgba(0,0,0,.6))',
          position: 'relative',
          zIndex: 2,
        }}
      />
    </div>
  );
}

const SPARKLES = [
  { pos: { top: '5%',  left: '5%'  }, size: 8,  color: '#fff',     delay: '0s' },
  { pos: { top: '8%',  right: '10%'}, size: 6,  color: '#e879f9',  delay: '.6s' },
  { pos: { bottom: '32%', right: '4%' }, size: 7, color: '#c084fc', delay: '1.2s' },
  { pos: { top: '32%', left: '-4%' }, size: 6,  color: '#fff',     delay: '1.8s' },
  { pos: { top: '58%', right: '-2%'}, size: 4,  color: '#f0abfc',  delay: '.3s' },
];