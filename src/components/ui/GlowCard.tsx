'use client';

import { useRef } from 'react';
import { CSSProperties, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  glowColor?: string;
}

export function GlowCard({
  children,
  style,
  onClick,
  glowColor = 'rgba(168,85,247,.18)',
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const dx = (e.clientX - left - width  / 2) / (width  / 2);
    const dy = (e.clientY - top  - height / 2) / (height / 2);
    card.style.transform = `perspective(700px) rotateY(${dx * 8}deg) rotateX(${-dy * 5}deg) translateY(-6px)`;
    card.style.boxShadow = `0 24px 55px rgba(0,0,0,.4), 0 0 40px ${glowColor}`;
  };

  const onMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = '';
      ref.current.style.boxShadow = '';
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--glass-b)',
        borderRadius: 'var(--radius-lg)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform .4s cubic-bezier(.25,.46,.45,.94), border-color .3s, box-shadow .4s',
        cursor: onClick ? 'none' : 'default',
        ...style,
      }}
    >
      {/* Inner glow overlay */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(168,85,247,.06), transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  );
}