'use client';

import { useState } from 'react';

const SECTIONS = [
  {
    id: 'install',
    label: 'Installation',
    icon: '🔧',
    content: (
      <>
        <p>DFCraft installs in under 30 seconds from the Chrome Web Store or Firefox Add-ons.</p>
        <div className="code-blk">
          1. Open Chrome Web Store{'\n'}
          2. Search &quot;DFCraft&quot;{'\n'}
          3. Click &quot;Add to Chrome&quot;{'\n'}
          4. Pin the extension icon in toolbar
        </div>
        <p>For developer/manual installation from source:</p>
        <div className="code-blk">
          git clone https://github.com/dfcraft/extension{'\n'}
          cd extension && npm install && npm run build{'\n'}
          chrome://extensions → Enable Developer Mode{'\n'}
          → &quot;Load Unpacked&quot; → select /dist folder
        </div>
      </>
    ),
  },
  {
    id: 'pomodoro',
    label: 'Pomodoro Timer',
    icon: '⏱',
    content: (
      <>
        <p>The Pomodoro Technique breaks work into focused 25-minute intervals separated by short breaks, boosting productivity by up to 40%.</p>
        <div className="code-blk">
          Focus Session:   25 minutes{'\n'}
          Short Break:      5 minutes{'\n'}
          Long Break:      15 minutes (every 4 cycles)
        </div>
        <p>Start the timer, work deeply until it rings, then take your break. DFCraft tracks your cycles automatically and notifies you when it&apos;s time to switch.</p>
      </>
    ),
  },
  {
    id: 'todo',
    label: 'ToDo List',
    icon: '📝',
    content: (
      <>
        <p>The task manager helps you plan your work session before starting the timer. Assign priorities to stay focused on what matters most.</p>
        <p>Priority levels:</p>
        <div className="code-blk">
          🔴 High   — Must complete today{'\n'}
          🟡 Medium — Should complete this week{'\n'}
          🟢 Low    — Nice to have
        </div>
        <p>All tasks are saved to browser local storage and persist across sessions.</p>
      </>
    ),
  },
  {
    id: 'blocker',
    label: 'Site Blocker',
    icon: '🚫',
    content: (
      <>
        <p>Enter any domain to block it during your focus sessions. DFCraft intercepts navigation to blocked sites and redirects you back to work.</p>
        <div className="code-blk">
          Example domains to block:{'\n'}
          facebook.com{'\n'}
          youtube.com{'\n'}
          twitter.com{'\n'}
          reddit.com
        </div>
        <p>Tip: Enable the blocker before starting your Pomodoro session for maximum focus.</p>
      </>
    ),
  },
  {
    id: 'sounds',
    label: 'Focus Sounds',
    icon: '🎵',
    content: (
      <>
        <p>Background ambient audio is scientifically proven to improve focus by masking irregular environmental distractions.</p>
        <p>Available soundscapes:</p>
        <div className="code-blk">
          🌧️ Rain        — Steady white noise{'\n'}
          🎧 Lo-Fi       — Chill instrumental beats{'\n'}
          🌊 White Noise — Pure broadband audio{'\n'}
          🌲 Forest      — Nature ambiance{'\n'}
          ☕ Café        — Coffee shop murmur{'\n'}
          🚀 Space       — Deep cosmic tones
        </div>
      </>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    content: (
      <>
        <p>Customize DFCraft to fit your workflow. All preferences are saved automatically.</p>
        <div className="code-blk">
          Timer durations  — Customize focus/break lengths{'\n'}
          Notifications    — Sound + browser alerts{'\n'}
          Auto-start       — Auto-begin next session{'\n'}
          Language         — EN, FR, AR, ES{'\n'}
          Theme            — Dark / Light mode
        </div>
      </>
    ),
  },
];

export default function GuidePage() {
  const [active, setActive] = useState('install');
  const current = SECTIONS.find(s => s.id === active)!;

  return (
    <div className="page-wrapper">
      <span className="label-tag">Documentation</span>
      <h1 className="page-heading">
        DFCraft <span className="gradient-text">Guide</span>
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '210px 1fr',
          gap: '3rem',
          marginTop: '2.5rem',
        }}
      >
        {/* Sidebar */}
        <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 2rem)', height: 'fit-content' }}>
          <ul style={{ listStyle: 'none' }}>
            {SECTIONS.map(s => (
              <li key={s.id}>
                <button
                  onClick={() => setActive(s.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '.65rem',
                    width: '100%', padding: '9px 12px',
                    background: active === s.id ? 'rgba(168,85,247,.1)' : 'transparent',
                    border: 'none',
                    borderLeft: `2px solid ${active === s.id ? 'var(--purple)' : 'transparent'}`,
                    borderRadius: '0 8px 8px 0',
                    color: active === s.id ? 'var(--purple-l)' : 'var(--text-muted)',
                    fontSize: '.85rem', fontFamily: 'var(--font-body)',
                    textAlign: 'left', transition: 'all .2s',
                    marginBottom: '.15rem',
                  }}
                >
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div
          key={current.id}
          style={{ animation: 'fadeIn .3s ease' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem', fontWeight: 700,
              marginBottom: '1.25rem', color: '#fff',
              display: 'flex', alignItems: 'center', gap: '.6rem',
            }}
          >
            {current.icon} {current.label}
          </h2>

          <div
            style={{
              color: 'var(--text-muted)',
              lineHeight: 1.8, fontSize: '.92rem',
            }}
          >
            <style>{`
              .guide-content p { margin-bottom: .85rem; }
              .code-blk {
                background: rgba(0,0,0,.45);
                border: 1px solid rgba(168,85,247,.2);
                border-radius: 12px;
                padding: 1.1rem 1.4rem;
                font-family: 'Courier New', monospace;
                font-size: .8rem;
                color: #c084fc;
                line-height: 1.75;
                overflow-x: auto;
                margin: .9rem 0;
                white-space: pre;
              }
            `}</style>
            <div className="guide-content">
              {current.content}
            </div>
          </div>

          {/* Navigation between sections */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,.06)' }}>
            {SECTIONS.findIndex(s => s.id === active) > 0 && (
              <button
                onClick={() => setActive(SECTIONS[SECTIONS.findIndex(s => s.id === active) - 1].id)}
                style={{
                  padding: '8px 18px', background: 'var(--glass)',
                  border: '1px solid var(--glass-b)', borderRadius: 8,
                  color: 'var(--text-muted)', fontSize: '.85rem', fontFamily: 'var(--font-body)',
                }}
              >
                ← Previous
              </button>
            )}
            {SECTIONS.findIndex(s => s.id === active) < SECTIONS.length - 1 && (
              <button
                onClick={() => setActive(SECTIONS[SECTIONS.findIndex(s => s.id === active) + 1].id)}
                style={{
                  padding: '8px 18px',
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  border: 'none', borderRadius: 8,
                  color: '#fff', fontSize: '.85rem', fontFamily: 'var(--font-display)', fontWeight: 600,
                  marginLeft: 'auto',
                }}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .page-wrapper > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}