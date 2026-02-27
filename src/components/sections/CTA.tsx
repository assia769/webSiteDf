'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Orb follows mouse inside section
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const onMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const r = section.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      orbRef.current.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
    };
    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 5,
        padding: '5rem 5% 5rem',
        overflow: 'hidden',
        borderTop: '1px solid rgba(168,85,247,.1)',
      }}
    >
      {/* Mouse-tracking orb */}
      <div
        ref={orbRef}
        style={{
          position: 'absolute',
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,.12) 0%, transparent 65%)',
          pointerEvents: 'none',
          transition: 'transform .8s cubic-bezier(.25,.46,.45,.94)',
          zIndex: 0,
        }}
      />

      {/* Main glass container */}
      <div style={{
        position: 'relative',
        maxWidth: 900, margin: '0 auto',
        background: 'rgba(20,8,50,.65)',
        border: '1px solid rgba(168,85,247,.18)',
        borderRadius: 28,
        padding: '4rem 3.5rem',
        backdropFilter: 'blur(32px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(32px) saturate(1.6)',
        overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.04), inset 0 1px 0 rgba(255,255,255,.06)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(.97)',
        transition: 'opacity .8s ease, transform .8s cubic-bezier(.25,.46,.45,.94)',
        textAlign: 'center',
      }}>

        {/* Background gradient fill */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 70% 60% at 50% -10%, rgba(168,85,247,.18), transparent),
            radial-gradient(ellipse 50% 40% at 20% 110%, rgba(96,165,250,.08), transparent),
            radial-gradient(ellipse 40% 50% at 80% 110%, rgba(236,72,153,.07), transparent)
          `,
        }} />

        {/* Dot grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `radial-gradient(circle, rgba(168,85,247,.12) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          mask: 'radial-gradient(ellipse 70% 80% at 50% 50%, black 20%, transparent 70%)',
          WebkitMask: 'radial-gradient(ellipse 70% 80% at 50% 50%, black 20%, transparent 70%)',
        }} />

        {/* Top shimmer line */}
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(168,85,247,.6), rgba(236,72,153,.4), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(168,85,247,.1)',
          border: '1px solid rgba(168,85,247,.22)',
          padding: '6px 16px', borderRadius: 50,
          fontFamily: 'var(--font-display)', fontSize: '.7rem', fontWeight: 700,
          letterSpacing: '.14em', textTransform: 'uppercase',
          color: 'var(--purple-l)',
          marginBottom: '1.5rem',
          position: 'relative', zIndex: 1,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--purple-l)', animation: 'badgePulse 2s ease infinite', display: 'block' }}/>
          Get Started Today
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          fontWeight: 800, lineHeight: .98,
          letterSpacing: '-.04em',
          color: '#fff',
          marginBottom: '1.1rem',
          position: 'relative', zIndex: 1,
        }}>
          Start building your<br/>
          <span style={{
            background: 'linear-gradient(110deg, var(--purple-l), #e879f9, var(--blue))',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            animation: 'gradientShift 5s ease infinite',
          }}>focus</span> today.
        </h2>

        {/* Sub */}
        <p style={{
          fontSize: '1rem', color: 'var(--text-muted)',
          fontWeight: 300, maxWidth: 420,
          margin: '0 auto 2.5rem',
          lineHeight: 1.75,
          position: 'relative', zIndex: 1,
        }}>
          Join 10,000+ users who have transformed their productivity with FocusCraft. Free forever.
        </p>

        {/* CTA buttons */}
        <div style={{
          display: 'flex', gap: '1rem',
          justifyContent: 'center', flexWrap: 'wrap',
          position: 'relative', zIndex: 1,
        }}>
          <MagneticButton href="/download">⬇ Download Free Extension</MagneticButton>
          <MagneticButton href="/guide" variant="ghost">📖 Learn More</MagneticButton>
        </div>

        {/* Social proof row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '2rem', marginTop: '2.5rem',
          position: 'relative', zIndex: 1,
        }}>
          {[
            { icon: '★', val: '4.9/5', label: 'Rating' },
            { icon: '↓', val: '10K+',  label: 'Downloads' },
            { icon: '♾', val: 'Free',  label: 'Forever'   },
          ].map(({ icon, val, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 10,
                background: 'rgba(168,85,247,.12)',
                border: '1px solid rgba(168,85,247,.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '.75rem', color: 'var(--purple-l)',
              }}>{icon}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '.9rem', color: '#fff', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: '.62rem', color: 'var(--text-muted)', letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}