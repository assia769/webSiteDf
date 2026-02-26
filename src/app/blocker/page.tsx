'use client';

import { useState } from 'react';
import { type BlockedSite } from '@/lib/utils';

const INIT_BLOCKED: BlockedSite[] = [
  { id: 1, url: 'facebook.com',  addedAt: new Date() },
  { id: 2, url: 'twitter.com',   addedAt: new Date() },
  { id: 3, url: 'instagram.com', addedAt: new Date() },
];

export default function BlockerPage() {
  const [sites, setSites] = useState<BlockedSite[]>(INIT_BLOCKED);
  const [input, setInput]   = useState('');
  const [toast, setToast]   = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const add = () => {
    const url = input.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
    if (!url) return;
    if (sites.some(s => s.url === url)) {
      showToast(`⚠️ ${url} is already blocked`);
      return;
    }
    setSites(prev => [{ id: Date.now(), url, addedAt: new Date() }, ...prev]);
    setInput('');
    showToast(`🚫 ${url} blocked!`);
  };

  const remove = (id: number) => {
    const site = sites.find(s => s.id === id);
    setSites(prev => prev.filter(s => s.id !== id));
    if (site) showToast(`✅ ${site.url} unblocked`);
  };

  return (
    <div className="page-wrapper">
      <span className="label-tag">Distraction Blocker</span>
      <h1 className="page-heading">
        <span className="gradient-text">Block</span> the Noise
      </h1>
      <p className="page-sub">
        Add any website to block it during your focus sessions. Click Unblock to remove it.
      </p>

      <div style={{ maxWidth: 580 }}>
        {/* Input */}
        <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1.75rem' }}>
          <input
            placeholder="e.g. facebook.com or https://youtube.com"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            style={{
              flex: 1,
              background: 'rgba(168,85,247,.05)',
              border: '1px solid var(--glass-b)',
              borderRadius: 'var(--radius)',
              padding: '12px 16px',
              color: 'var(--text)',
              fontFamily: 'var(--font-body)',
              fontSize: '.95rem',
              outline: 'none',
              transition: 'border-color .25s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--purple)'}
            onBlur={e => e.target.style.borderColor = 'var(--glass-b)'}
          />
          <button
            onClick={add}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              color: '#fff', border: 'none', borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.9rem',
              boxShadow: '0 0 18px rgba(168,85,247,.3)',
              whiteSpace: 'nowrap',
              transition: 'all .2s',
            }}
          >
            🚫 Block Site
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Blocked', value: sites.length, color: '#f87171' },
            { label: 'Focus gain', value: `+${sites.length * 12}min`, color: '#4ade80' },
          ].map(s => (
            <div
              key={s.label}
              style={{
                background: 'var(--glass)',
                border: '1px solid var(--glass-b)',
                borderRadius: 12, padding: '.75rem 1.25rem',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: s.color }}>
                {s.value}
              </div>
              <div style={{ fontSize: '.72rem', color: 'var(--text-muted)', letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Blocked list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
          {sites.map(site => (
            <div
              key={site.id}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--glass-b)',
                borderRadius: 14, padding: '.9rem 1.2rem',
                display: 'flex', alignItems: 'center', gap: '.9rem',
                animation: 'slideIn .3s ease',
                backdropFilter: 'blur(14px)',
                transition: 'border-color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(168,85,247,.35)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--glass-b)')}
            >
              <span style={{ fontSize: '1rem' }}>🚫</span>
              <span
                style={{
                  flex: 1,
                  fontFamily: 'Courier New, monospace',
                  fontSize: '.84rem',
                  color: 'rgba(255,255,255,.6)',
                  letterSpacing: '.02em',
                }}
              >
                {site.url}
              </span>
              <button
                onClick={() => remove(site.id)}
                style={{
                  background: 'rgba(239,68,68,.12)',
                  border: '1px solid rgba(239,68,68,.25)',
                  color: '#f87171',
                  borderRadius: 8, padding: '5px 14px',
                  fontSize: '.74rem', fontFamily: 'var(--font-display)', fontWeight: 600,
                  transition: 'all .2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,.25)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(239,68,68,.12)')}
              >
                Unblock
              </button>
            </div>
          ))}

          {sites.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-dim)', fontFamily: 'var(--font-display)' }}>
              ✅ No sites blocked. Add one above.
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed', bottom: '1.75rem', right: '1.75rem', zIndex: 9000,
            background: 'rgba(20,8,50,.95)',
            border: '1px solid rgba(168,85,247,.4)',
            borderRadius: 12, padding: '.85rem 1.25rem',
            fontSize: '.85rem', fontFamily: 'var(--font-body)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 25px rgba(168,85,247,.25)',
            animation: 'toastIn .3s ease',
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}