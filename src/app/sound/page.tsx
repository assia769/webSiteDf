'use client';

import { useState } from 'react';
import { SOUND_TRACKS, type SoundId } from '@/lib/utils';

export default function SoundPage() {
  const [active, setActive] = useState<SoundId | null>(null);
  const [volume, setVolume] = useState(75);

  const toggle = (id: SoundId) => {
    setActive(prev => prev === id ? null : id);
  };

  return (
    <div className="page-wrapper">
      <span className="label-tag">Ambient Sounds</span>
      <h1 className="page-heading">
        Find your <span className="gradient-text">flow</span>
      </h1>
      <p className="page-sub">
        Ambient audio blocks distractions and signals to your brain that it&apos;s time to focus.
      </p>

      {/* Volume */}
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          marginBottom: '2rem', maxWidth: 400,
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>🔈</span>
        <input
          type="range" min={0} max={100}
          value={volume}
          onChange={e => setVolume(+e.target.value)}
          style={{
            flex: 1, height: 4, appearance: 'none',
            background: `linear-gradient(90deg, #7c3aed ${volume}%, rgba(255,255,255,.15) ${volume}%)`,
            borderRadius: 2, outline: 'none',
          }}
        />
        <span style={{ fontSize: '1.1rem' }}>🔊</span>
        <span style={{ fontSize: '.8rem', color: 'var(--text-muted)', minWidth: 32, textAlign: 'right', fontFamily: 'var(--font-display)' }}>
          {volume}%
        </span>
      </div>

      {/* Sound cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
          gap: '1.25rem',
          maxWidth: 900,
        }}
      >
        {SOUND_TRACKS.map(track => {
          const isActive = active === track.id;
          return (
            <button
              key={track.id}
              onClick={() => toggle(track.id as SoundId)}
              style={{
                background: 'var(--card-bg)',
                border: `1px solid ${isActive ? 'rgba(168,85,247,.55)' : 'var(--glass-b)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                textAlign: 'center',
                backdropFilter: 'blur(18px)',
                transition: 'all .3s',
                transform: isActive ? 'translateY(-6px)' : '',
                boxShadow: isActive ? '0 20px 45px rgba(0,0,0,.3), 0 0 25px rgba(168,85,247,.2)' : '',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(168,85,247,.1), transparent)',
                    pointerEvents: 'none',
                  }}
                />
              )}

              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '.65rem' }}>
                {track.emoji}
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700, marginBottom: '.25rem',
                  color: isActive ? '#fff' : 'rgba(255,255,255,.85)',
                }}
              >
                {track.name}
              </div>
              <p style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginBottom: '.9rem' }}>
                {track.desc}
              </p>

              {/* Wave bars */}
              <div
                style={{
                  display: 'flex', gap: 3,
                  justifyContent: 'center', height: 24,
                  alignItems: 'center',
                }}
                className={isActive ? 'wave-active' : ''}
              >
                {[8, 14, 10, 18, 12].map((h, i) => (
                  <div
                    key={i}
                    className="wave-bar"
                    style={{
                      height: isActive ? undefined : h,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>

              {isActive && (
                <div
                  style={{
                    position: 'absolute', top: '.75rem', right: '.75rem',
                    width: 8, height: 8, borderRadius: '50%', background: '#4ade80',
                    boxShadow: '0 0 10px #4ade80',
                    animation: 'badgePulse 1.5s ease infinite',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {active && (
        <div
          style={{
            marginTop: '2rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
            background: 'var(--glass)',
            border: '1px solid var(--glass-b)',
            borderRadius: 'var(--radius)',
            padding: '.85rem 1.25rem',
            maxWidth: 380,
            backdropFilter: 'blur(14px)',
            animation: 'slideIn .3s ease',
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>
            {SOUND_TRACKS.find(t => t.id === active)?.emoji}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.88rem', color: '#fff' }}>
              Now Playing: {SOUND_TRACKS.find(t => t.id === active)?.name}
            </div>
            <div style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>Volume: {volume}%</div>
          </div>
          <div style={{ display: 'flex', gap: 3, alignItems: 'center' }} className="wave-active">
            {[8, 14, 10].map((h, i) => <div key={i} className="wave-bar" style={{ animationDelay: `${i*.1}s` }} />)}
          </div>
        </div>
      )}
    </div>
  );
}