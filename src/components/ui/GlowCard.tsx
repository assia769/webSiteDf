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
  const ref      = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const spotRef  = useRef<HTMLDivElement>(null);

  const TILT = intensity === 'soft' ? 6 : intensity === 'strong' ? 15 : 10;

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current; if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x  = e.clientX - left;
    const y  = e.clientY - top;
    const nx = (x - width  / 2) / (width  / 2);
    const ny = (y - height / 2) / (height / 2);

    /* 3D tilt */
    card.style.transform = `
      perspective(800px)
      rotateY(${nx * TILT}deg)
      rotateX(${-ny * TILT * .65}deg)
      translateZ(10px)
      scale3d(1.025,1.025,1.025)
    `;

    /* Directional shadow */
    card.style.boxShadow = `
      ${-nx * 18}px ${-ny * 12 + 22}px 65px rgba(0,0,0,.55),
      0 0 55px ${glowColor},
      0 0 110px ${glowColor.replace(/[\d.]+\)$/, '.07)')},
      inset 0 1px 0 rgba(255,255,255,.07)
    `;

    /* Spotlight radial following cursor */
    if (spotRef.current) {
      spotRef.current.style.opacity = '1';
      spotRef.current.style.background = `radial-gradient(260px circle at ${x}px ${y}px, ${glowColor.replace(/[\d.]+\)$/, '.2)')}, transparent 70%)`;
    }

    /* Neon border brightness */
    card.style.borderColor = `rgba(168,85,247,${.1 + Math.abs(nx) * .28 + Math.abs(ny) * .18})`;
  }, [TILT, glowColor]);

  const onMouseLeave = useCallback(() => {
    const card = ref.current; if (!card) return;
    card.style.transform  = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0) scale3d(1,1,1)';
    card.style.boxShadow  = '';
    card.style.borderColor = '';
    if (spotRef.current) spotRef.current.style.opacity = '0';
  }, []);

  const onMouseEnter = useCallback(() => {
    const shine = shineRef.current; if (!shine) return;
    shine.style.transition = 'none';
    shine.style.left = '-80%';
    void shine.offsetHeight; // force reflow
    shine.style.transition = 'left .7s cubic-bezier(.25,.46,.45,.94)';
    shine.style.left = '165%';
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
      {/* Base inner gradient */}
      <div style={{ position:'absolute',inset:0,pointerEvents:'none',zIndex:0, background:'linear-gradient(135deg,rgba(168,85,247,.055) 0%,transparent 55%,rgba(168,85,247,.03) 100%)' }}/>

      {/* Cursor-following spotlight */}
      <div ref={spotRef} style={{ position:'absolute',inset:0,pointerEvents:'none',zIndex:1, opacity:0, transition:'opacity .3s', borderRadius:'var(--radius-lg)' }}/>

      {/* Shine sweep on hover */}
      <div ref={shineRef} style={{ position:'absolute',top:0,left:'-80%', width:'55%',height:'100%', background:'linear-gradient(108deg,transparent,rgba(255,255,255,.06),transparent)', transform:'skewX(-14deg)', pointerEvents:'none', zIndex:2 }}/>

      {/* Top-edge shimmer line */}
      <div style={{ position:'absolute',top:0,left:'8%',right:'8%',height:1, background:'linear-gradient(90deg,transparent,rgba(168,85,247,.5),rgba(232,121,249,.3),transparent)', pointerEvents:'none', zIndex:3 }}/>

      {/* Content */}
      <div style={{ position:'relative', zIndex:4 }}>
        {children}
      </div>
    </div>
  );
}