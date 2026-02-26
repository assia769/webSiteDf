'use client';

import Link from 'next/link';
import { FloatingRobot } from '@/components/ui/FloatingRobot';
import { ParticleField } from '@/components/ui/ParticleField';
import { MagneticButton } from '@/components/ui/MagneticButton';

// 3D floating cubes config
const CUBES = [
  { w:55, h:55, top:'8%',  left:'3%',  dur:'7s',   delay:'-1s',  r:'10px' },
  { w:38, h:38, top:'15%', left:'35%', dur:'9s',   delay:'-3s',  r:'6px'  },
  { w:28, h:28, top:'12%', right:'30%',dur:'6.5s', delay:'-2s',  r:'5px'  },
  { w:22, h:22, top:'25%', right:'10%',dur:'8s',   delay:'-5s',  r:'5px'  },
  { w:46, h:46, top:'50%', left:'2%',  dur:'10s',  delay:'-4s',  r:'9px'  },
  { w:18, h:18, top:'65%', left:'15%', dur:'7.5s', delay:'-1.5s',r:'4px'  },
  { w:62, h:62, top:'5%',  right:'5%', dur:'11s',  delay:'-6s',  r:'12px' },
  { w:32, h:32, bottom:'15%',right:'25%',dur:'8.5s',delay:'-2.5s',r:'6px' },
  { w:16, h:16, top:'40%', left:'28%', dur:'6s',   delay:'-.5s', r:'4px'  },
  { w:44, h:44, bottom:'25%',left:'8%',dur:'9.5s', delay:'-7s',  r:'9px'  },
  { w:25, h:25, top:'75%', right:'8%', dur:'7s',   delay:'-3.5s',r:'5px'  },
  { w:35, h:35, top:'30%', right:'38%',dur:'8s',   delay:'-4.5s',r:'7px'  },
];

export function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        overflow: 'hidden',
      }}
    >
      {/* Particles */}
      <ParticleField />

      {/* 3D Cubes */}
      {CUBES.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: c.w, height: c.h,
            top: c.top, left: (c as any).left, right: (c as any).right, bottom: (c as any).bottom,
            border: '1px solid rgba(168,85,247,.32)',
            background: 'rgba(120,50,220,.07)',
            backdropFilter: 'blur(2px)',
            borderRadius: c.r,
            animation: `cubeDrift linear infinite`,
            animationDuration: c.dur,
            animationDelay: c.delay,
            zIndex: 1,
          }}
        />
      ))}

      {/* Hero text */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: 580,
          paddingTop: 'var(--nav-h)',
          animation: 'fadeUp .9s ease both',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--glass)',
            border: '1px solid var(--glass-b)',
            padding: '6px 16px', borderRadius: 50,
            fontSize: '.78rem', fontWeight: 500,
            color: 'var(--purple-l)',
            marginBottom: '1.75rem',
            backdropFilter: 'blur(10px)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '.03em',
          }}
        >
          <span
            style={{
              width: 6, height: 6, background: 'var(--purple-l)',
              borderRadius: '50%',
              animation: 'badgePulse 2s ease infinite',
              display: 'block',
            }}
          />
          v1.0 Now Available — Free Extension
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.2rem, 7.5vw, 6rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-.04em',
            marginBottom: '1.1rem',
            color: '#fff',
            animation: 'fadeUp .9s .12s ease both',
          }}
        >
          Craft Your Focus.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
            color: 'rgba(255,255,255,.65)',
            marginBottom: '2.2rem',
            fontWeight: 400,
            animation: 'fadeUp .9s .24s ease both',
          }}
        >
          The ultimate productivity extension.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex', gap: '1rem', flexWrap: 'wrap',
            animation: 'fadeUp .9s .36s ease both',
          }}
        >
          <MagneticButton href="/download">
            ⬇ Download Now
          </MagneticButton>
          <MagneticButton href="/guide" variant="ghost">
            📖 View Guide
          </MagneticButton>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex', gap: '2.5rem', marginTop: '3.5rem',
            animation: 'fadeUp .9s .5s ease both',
          }}
        >
          {[
            { num: '10K+', label: 'Users' },
            { num: '4.9★', label: 'Rating' },
            { num: 'Free', label: 'Forever' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem', fontWeight: 800,
                  background: 'linear-gradient(135deg, var(--purple-l), #e879f9)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {num}
              </div>
              <div style={{ fontSize: '.75rem', color: 'var(--text-muted)', letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Robot */}
      <FloatingRobot />

      {/* Floor disc */}
      <div
        style={{
          position: 'absolute',
          width: 700, height: 120,
          right: '4%', bottom: '28%',
          background: 'radial-gradient(ellipse, rgba(180,80,255,.45) 0%, rgba(120,40,200,.2) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
          zIndex: 1,
          pointerEvents: 'none',
          transform: 'translateX(10%)',
        }}
      />
    </section>
  );
}