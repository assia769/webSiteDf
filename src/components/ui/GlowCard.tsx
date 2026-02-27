'use client';

import { useRef, useCallback } from 'react';
import { CSSProperties, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  glowColor?: string;
  intensity?: 'soft' | 'medium' | 'strong';
}

export function GlowCard({
  children,
  className,
  style,
  onClick,
  glowColor = 'rgba(168,85,247,.22)',
  intensity = 'medium',
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const TILT = intensity === 'soft' ? 6 : intensity === 'strong' ? 14 : 10;

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const dx = (x - width  / 2) / (width  / 2);  // -1 to 1
    const dy = (y - top - height / 2) / (height / 2);  // -1 to 1
    const nx = (x - width  / 2) / (width  / 2);
    const ny = (y - height / 2) / (height / 2);

    // 3D tilt
    card.style.transform = `
      perspective(900px)
      rotateY(${nx * TILT}deg)
      rotateX(${-ny * (TILT * 0.65)}deg)
      translateZ(8px)
      scale3d(1.02, 1.02, 1.02)
    `;

    // Dynamic shadow depth
    const shadowX = -nx * 16;
    const shadowY = -ny * 12;
    card.style.boxShadow = `
      ${shadowX}px ${shadowY + 20}px 60px rgba(0,0,0,.55),
      0 0 50px ${glowColor},
      0 0 100px ${glowColor.replace(/[\d.]+\)$/, '0.08)')},
      inset 0 1px 0 rgba(255,255,255,.07)
    `;

    // Spotlight follow cursor
    if (spotRef.current) {
      spotRef.current.style.opacity = '1';
      spotRef.current.style.background = `
        radial-gradient(
          280px circle at ${x}px ${y}px,
          ${glowColor.replace(/[\d.]+\)$/, '0.18)')},
          transparent 70%
        )
      `;
    }

    // border highlight on active edge
    const borderX = (x / width) * 100;
    const borderY = (y / height) * 100;
    card.style.borderImage = `none`;
    card.style.borderColor = `rgba(168,85,247,${0.12 + Math.abs(nx) * 0.25 + Math.abs(ny) * 0.15})`;
  }, [TILT, glowColor]);

  const onMouseLeave = useCallback(() => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0) scale3d(1,1,1)';
    card.style.boxShadow = '';
    card.style.borderColor = '';
    if (spotRef.current) spotRef.current.style.opacity = '0';
  }, []);

  const onMouseEnter = useCallback(() => {
    // Shine sweep
    if (shineRef.current) {
      shineRef.current.style.transition = 'none';
      shineRef.current.style.left = '-80%';
      // force reflow
      void shineRef.current.offsetHeight;
      shineRef.current.style.transition = 'left .65s cubic-bezier(.25,.46,.45,.94)';
      shineRef.current.style.left = '160%';
    }
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--glass-b)',
        borderRadius: 'var(--radius-lg)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform .45s cubic-bezier(.25,.46,.45,.94), box-shadow .45s, border-color .3s',
        cursor: onClick ? 'none' : 'default',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      }}
    >
      {/* Base inner glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'linear-gradient(135deg, rgba(168,85,247,.05) 0%, transparent 55%, rgba(168,85,247,.03) 100%)',
      }} />

      {/* Dynamic spotlight (follows cursor) */}
      <div
        ref={spotRef}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          opacity: 0, transition: 'opacity .3s',
          borderRadius: 'var(--radius-lg)',
        }}
      />

      {/* Shine sweep on hover */}
      <div
        ref={shineRef}
        style={{
          position: 'absolute', top: 0, left: '-80%',
          width: '55%', height: '100%',
          background: 'linear-gradient(105deg, transparent, rgba(255,255,255,.055), transparent)',
          transform: 'skewX(-15deg)',
          pointerEvents: 'none', zIndex: 2,
        }}
      />

      {/* Top edge shimmer line */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(168,85,247,.45), rgba(232,121,249,.3), transparent)',
        pointerEvents: 'none', zIndex: 3,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 4 }}>
        {children}
      </div>
    </div>
  );
}