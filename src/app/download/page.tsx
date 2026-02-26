'use client';

import { useState } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';

const BROWSERS = [
  {
    emoji: '🟢',
    name: 'Chrome',
    sub: 'Chrome Web Store · v1.0.0',
    url: '#',
    color: '#4ade80',
  },
  {
    emoji: '🦊',
    name: 'Firefox',
    sub: 'Firefox Add-ons · v1.0.0',
    url: '#',
    color: '#fb923c',
  },
];

const FEATURES = [
  '🔒 No ads or data collection',
  '⚡ Ultra lightweight — <200KB',
  '🆓 100% free forever',
  '🔓 Open source',
  '🔄 Auto-updates',
  '🌐 Works on all websites',
];

export default function DownloadPage() {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div className="page-wrapper" style={{ textAlign: 'center' }}>
      <span className="label-tag">Get the Extension</span>
      <h1 className="page-heading">
        Download{' '}
        <span className="gradient-text">DFCraft</span>
      </h1>
      <p className="page-sub" style={{ margin: '0 auto 3rem', maxWidth: 440 }}>
        Free forever. No account required. Available for Chrome and Firefox.
      </p>

      {/* Download cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          maxWidth: 580,
          margin: '0 auto 3rem',
        }}
      >
        {BROWSERS.map(b => (
          <GlowCard
            key={b.name}
            style={{ padding: '2.2rem 1.75rem', textAlign: 'center', cursor: 'none' }}
            onClick={() => setClicked(b.name)}
          >
            <div style={{ fontSize: '3.2rem', marginBottom: '.9rem', display: 'block' }}>{b.emoji}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '.4rem', color: '#fff' }}>
              {b.name}
            </div>
            <p style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{b.sub}</p>

            <a
              href={b.url}
              onClick={e => { e.preventDefault(); setClicked(b.name); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 24px', borderRadius: 50,
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                color: '#fff', textDecoration: 'none',
                fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.88rem',
                boxShadow: clicked === b.name ? '0 0 30px rgba(168,85,247,.6)' : '0 0 16px rgba(168,85,247,.3)',
                transition: 'all .3s',
                transform: clicked === b.name ? 'scale(1.06)' : 'scale(1)',
              }}
            >
              {clicked === b.name ? '⏳ Coming Soon...' : `Download for ${b.name}`}
            </a>
          </GlowCard>
        ))}
      </div>

      {/* Feature badges */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '.65rem',
          justifyContent: 'center',
          maxWidth: 600,
          margin: '0 auto',
        }}
      >
        {FEATURES.map(f => (
          <span
            key={f}
            style={{
              background: 'var(--glass)',
              border: '1px solid var(--glass-b)',
              borderRadius: 50,
              padding: '6px 16px',
              fontSize: '.78rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-display)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {f}
          </span>
        ))}
      </div>

      <style>{`
        @media (max-width: 480px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}