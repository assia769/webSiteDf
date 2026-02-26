'use client';

import { useRef, ReactNode } from 'react';
import { CSSProperties } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  style?: CSSProperties;
  variant?: 'primary' | 'ghost';
  type?: 'button' | 'submit';
}

export function MagneticButton({
  children,
  onClick,
  href,
  style,
  variant = 'primary',
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const dx = (e.clientX - left - width  / 2) * .35;
    const dy = (e.clientY - top  - height / 2) * .35;
    el.style.transform = `translate(${dx}px, ${dy}px) translateY(-3px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    borderRadius: 50,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '1rem',
    textDecoration: 'none',
    border: 'none',
    transition: 'all .3s cubic-bezier(.25,.46,.45,.94)',
    position: 'relative',
    overflow: 'hidden',
    letterSpacing: '.01em',
    ...(variant === 'primary' ? {
      padding: '14px 34px',
      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #9333ea 100%)',
      color: '#fff',
      boxShadow: '0 0 30px rgba(168,85,247,.5), inset 0 1px 0 rgba(255,255,255,.18)',
    } : {
      padding: '13px 28px',
      background: 'var(--glass)',
      border: '1px solid var(--glass-b)',
      color: 'var(--text)',
      backdropFilter: 'blur(10px)',
    }),
    ...style,
  };

  const shimmer = (
    <span
      style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, transparent, rgba(255,255,255,.15), transparent)',
        transform: 'translateX(-100%)',
        transition: 'transform .5s',
      }}
      className="btn-shimmer"
    />
  );

  const Tag = href ? 'a' : 'button';

  return (
    // @ts-ignore
    <Tag
      ref={ref as any}
      href={href}
      type={!href ? type : undefined}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={baseStyle}
    >
      {shimmer}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <style>{`
        .btn-shimmer { display: block; }
        *:hover > .btn-shimmer { transform: translateX(100%) !important; }
      `}</style>
    </Tag>
  );
}