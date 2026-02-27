'use client';
import { useState, useEffect } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';

const BROWSERS = [
  {
    name: 'Chrome',
    sub: 'Chrome Web Store',
    version: 'v1.0.0',
    logo: '/assets/download/chrome.png',
    url: '#',
    accent: '#4285F4',
    accentAlt: '#34A853',
    users: '2M+',
    rating: '4.9',
  },
  {
    name: 'Firefox',
    logo: '/assets/download/firefox.png',
    sub: 'Firefox Add-ons',
    version: 'v1.0.0',
    url: '#',
    accent: '#FF7139',
    accentAlt: '#FF980E',
    users: '800K+',
    rating: '4.8',
  },
];

const FEATURES = [
  { icon: '🔒', label: 'No ads or data collection' },
  { icon: '⚡', label: 'Ultra lightweight — <200KB' },
  { icon: '🆓', label: '100% free forever' },
  { icon: '🔓', label: 'Open source' },
  { icon: '🔄', label: 'Auto-updates' },
  { icon: '🌐', label: 'Works on all websites' },
];

export default function DownloadPage() {
  const [clicked, setClicked] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ position: 'relative', textAlign: 'center', padding: '4rem 1.5rem 6rem', overflow: 'hidden', minHeight: '100vh' }}>

      {/* Ambient orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div className="orb-a" style={{
          position: 'absolute', top: '-10%', left: '15%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
        }} />
        <div className="orb-b" style={{
          position: 'absolute', bottom: '5%', right: '10%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%)',
        }} />
        <div className="orb-c" style={{
          position: 'absolute', top: '40%', left: '-5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }} />
      </div>

      {/* Grid overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Badge */}
        <div className={mounted ? 'anim-delay-1' : 'pre-anim'}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 50,
            border: '1px solid rgba(139,92,246,0.4)',
            background: 'rgba(139,92,246,0.08)',
            backdropFilter: 'blur(12px)',
            marginBottom: '1.5rem',
            fontSize: '.78rem', fontWeight: 600,
            color: '#a78bfa',
            letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            fontFamily: 'var(--font-display)',
          }}>
            <span className="dot-pulse" style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#a78bfa', boxShadow: '0 0 8px #a78bfa',
              display: 'inline-block',
            }} />
            Get the Extension
          </div>
        </div>

        {/* Heading */}
        <div className={mounted ? 'anim-delay-2' : 'pre-anim'}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            fontWeight: 900, lineHeight: 1.05,
            marginBottom: '1.2rem', letterSpacing: '-0.03em',
          }}>
            Download{' '}
            <span style={{
              background: 'linear-gradient(135deg, #818cf8, #a78bfa, #e879f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(167,139,250,0.4))',
            }}>
              DFCraft
            </span>
          </h1>
        </div>

        {/* Sub */}
        <div className={mounted ? 'anim-delay-3' : 'pre-anim'}>
          <p style={{
            fontSize: '1.05rem', color: 'var(--text-muted)',
            margin: '0 auto 3.5rem', maxWidth: 420, lineHeight: 1.65,
          }}>
            Free forever. No account required.<br />Available for Chrome and Firefox.
          </p>
        </div>

        {/* Browser cards */}
        <div
          className={mounted ? 'anim-delay-4' : 'pre-anim'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem', maxWidth: 620, margin: '0 auto 4rem',
          }}
        >
          {BROWSERS.map((b) => (
            <div
              key={b.name}
              onMouseEnter={() => setHovered(b.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative', borderRadius: 24, padding: '2px',
                background: hovered === b.name
                  ? `linear-gradient(135deg, ${b.accent}, ${b.accentAlt})`
                  : 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                transition: 'all .4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: hovered === b.name ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: hovered === b.name
                  ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${b.accent}33`
                  : '0 4px 24px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 24, pointerEvents: 'none', zIndex: 2,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
              }} />

              <div style={{
                position: 'relative', borderRadius: 22, padding: '2.2rem 1.75rem',
                background: 'rgba(12,12,18,0.92)', backdropFilter: 'blur(24px)',
                textAlign: 'center', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)',
                  width: 200, height: 200, borderRadius: '50%',
                  background: `radial-gradient(circle, ${b.accent}22, transparent 70%)`,
                  transition: 'opacity .4s',
                  opacity: hovered === b.name ? 1 : 0.4,
                }} />

                {/* Logo */}
                <div style={{
                  width: 72, height: 72, margin: '0 auto 1.2rem', position: 'relative',
                  transition: 'transform .4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: hovered === b.name ? 'scale(1.15) rotate(-3deg)' : 'scale(1)',
                }}>
                  <div
                    className={hovered === b.name ? 'spin-ring' : ''}
                    style={{
                      position: 'absolute', inset: -4, borderRadius: '50%',
                      background: `conic-gradient(${b.accent}, ${b.accentAlt}, ${b.accent})`,
                      opacity: hovered === b.name ? 0.6 : 0,
                      transition: 'opacity .4s', filter: 'blur(2px)',
                    }}
                  />
                  <img
                    src={b.logo} alt={b.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'contain',
                      borderRadius: '50%', position: 'relative', zIndex: 1,
                      filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                    }}
                  />
                </div>

                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.4rem',
                  fontWeight: 800, color: '#fff', marginBottom: '.3rem', letterSpacing: '-0.02em',
                }}>
                  {b.name}
                </div>

                <p style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginBottom: '.8rem' }}>
                  {b.sub} · {b.version}
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', marginBottom: '1.5rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '.85rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>{b.users}</div>
                    <div style={{ fontSize: '.68rem', color: 'var(--text-muted)' }}>users</div>
                  </div>
                  <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '.85rem', fontWeight: 700, color: '#fbbf24', fontFamily: 'var(--font-display)' }}>★ {b.rating}</div>
                    <div style={{ fontSize: '.68rem', color: 'var(--text-muted)' }}>rating</div>
                  </div>
                </div>

                <a
                  href={b.url}
                  onClick={e => { e.preventDefault(); setClicked(b.name); }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '12px 28px', borderRadius: 50, width: '100%',
                    background: clicked === b.name
                      ? 'rgba(255,255,255,0.08)'
                      : `linear-gradient(135deg, ${b.accent}, ${b.accentAlt})`,
                    color: '#fff', textDecoration: 'none',
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.88rem',
                    letterSpacing: '-0.01em',
                    border: clicked === b.name ? `1px solid ${b.accent}44` : '1px solid transparent',
                    boxShadow: clicked === b.name ? 'none' : `0 4px 20px ${b.accent}55`,
                    transition: 'all .3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: hovered === b.name && clicked !== b.name ? 'scale(1.05)' : 'scale(1)',
                    cursor: 'pointer',
                  }}
                >
                  {clicked === b.name ? (
                    <>
                      <span className="spin-icon">⏳</span>
                      Coming Soon...
                    </>
                  ) : (
                    <>
                      <span>⬇</span>
                      Add to {b.name}
                    </>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className={mounted ? 'anim-delay-5' : 'pre-anim'}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: 480, margin: '0 auto 2.5rem' }}
        >
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1))' }} />
          <span style={{ fontSize: '.75rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
            Why DFCraft?
          </span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(270deg, transparent, rgba(255,255,255,0.1))' }} />
        </div>

        {/* Feature pills */}
        <div
          className={mounted ? 'anim-delay-6' : 'pre-anim'}
          style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '.6rem', justifyContent: 'center', maxWidth: 580, margin: '0 auto' }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="feature-pill"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 50, padding: '8px 18px',
                fontSize: '.8rem', color: 'rgba(255,255,255,0.7)',
                fontFamily: 'var(--font-display)',
                backdropFilter: 'blur(12px)',
                transition: 'all .3s', cursor: 'default',
              }}
            >
              <span>{f.icon}</span>
              {f.label}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className={mounted ? 'anim-delay-8' : 'pre-anim'}>
          <p style={{
            marginTop: '3rem', fontSize: '.75rem',
            color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-display)',
          }}>
            No signup. No credit card. Works instantly after install.
          </p>
        </div>

      </div>

      <style>{`
        /* Hidden before mount */
        .pre-anim { opacity: 0; }

        /* Staggered fade-up — each class has its own delay baked in */
        .anim-delay-1 { animation: fadeUp 0.6s ease 0.1s both; }
        .anim-delay-2 { animation: fadeUp 0.6s ease 0.2s both; }
        .anim-delay-3 { animation: fadeUp 0.6s ease 0.3s both; }
        .anim-delay-4 { animation: fadeUp 0.6s ease 0.4s both; }
        .anim-delay-5 { animation: fadeUp 0.6s ease 0.55s both; }
        .anim-delay-6 { animation: fadeUp 0.6s ease 0.6s both; }
        .anim-delay-8 { animation: fadeUp 0.6s ease 0.8s both; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Pulsing dot */
        .dot-pulse {
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #a78bfa; }
          50%       { opacity: .5; box-shadow: 0 0 4px #a78bfa; }
        }

        /* Spinning ring on logo hover */
        .spin-ring {
          animation: spinRing 3s linear infinite;
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Spinning icon (coming soon) */
        .spin-icon {
          display: inline-block;
          animation: spinIcon 1s linear infinite;
        }
        @keyframes spinIcon {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Ambient orbs */
        .orb-a { animation: driftA 14s ease-in-out infinite; }
        .orb-b { animation: driftB 18s ease-in-out infinite; }
        .orb-c { animation: driftC 22s ease-in-out infinite; }

        @keyframes driftA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(40px, 30px) scale(1.05); }
        }
        @keyframes driftB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-50px, -40px) scale(1.08); }
        }
        @keyframes driftC {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(30px, -60px); }
        }

        /* Feature pill hover */
        .feature-pill:hover {
          background: rgba(139,92,246,0.15) !important;
          border-color: rgba(139,92,246,0.4) !important;
          color: #fff !important;
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}