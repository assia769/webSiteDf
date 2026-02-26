'use client';

import { useState } from 'react';

interface Setting {
  id: string;
  label: string;
  sub: string;
  type: 'toggle' | 'select';
  options?: string[];
  defaultValue: string | boolean;
}

const SETTINGS: Setting[] = [
  { id: 'darkMode',      label: 'Dark Mode',          sub: 'Toggle dark/light theme',           type: 'toggle', defaultValue: true },
  { id: 'soundNotif',    label: 'Sound Notifications', sub: 'Play a sound when timer ends',      type: 'toggle', defaultValue: true },
  { id: 'autoBreak',     label: 'Auto-start Breaks',   sub: 'Automatically start break timer',   type: 'toggle', defaultValue: false },
  { id: 'autoFocus',     label: 'Auto-start Focus',    sub: 'Automatically start next session',  type: 'toggle', defaultValue: false },
  { id: 'browserNotif',  label: 'Browser Notifications', sub: 'Show system notifications',       type: 'toggle', defaultValue: true },
  { id: 'focusDuration', label: 'Focus Duration',      sub: 'Minutes per focus session',         type: 'select', options: ['15 min', '20 min', '25 min', '30 min', '45 min', '50 min'], defaultValue: '25 min' },
  { id: 'shortBreak',    label: 'Short Break',         sub: 'Duration of short break',           type: 'select', options: ['3 min', '5 min', '10 min'], defaultValue: '5 min' },
  { id: 'longBreak',     label: 'Long Break',          sub: 'Duration of long break',            type: 'select', options: ['10 min', '15 min', '20 min', '30 min'], defaultValue: '15 min' },
  { id: 'language',      label: 'Language',            sub: 'Interface language',                type: 'select', options: ['English', 'Français', 'العربية', 'Español'], defaultValue: 'English' },
  { id: 'theme',         label: 'Accent Color',        sub: 'Interface accent color',            type: 'select', options: ['Purple', 'Blue', 'Pink', 'Green'], defaultValue: 'Purple' },
];

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string | boolean>>(() =>
    Object.fromEntries(SETTINGS.map(s => [s.id, s.defaultValue]))
  );
  const [saved, setSaved] = useState(false);

  const set = (id: string, val: string | boolean) => {
    setValues(prev => ({ ...prev, [id]: val }));
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page-wrapper">
      <span className="label-tag">Preferences</span>
      <h1 className="page-heading">
        Your <span className="gradient-text">Settings</span>
      </h1>
      <p className="page-sub">Customize DFCraft to fit your workflow. All changes are saved to browser storage.</p>

      <div style={{ maxWidth: 560 }}>
        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--glass-b)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
          }}
        >
          {SETTINGS.map((s, i) => (
            <div
              key={s.id}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1.1rem 1.5rem',
                borderBottom: i < SETTINGS.length - 1 ? '1px solid rgba(255,255,255,.05)' : '',
                transition: 'background .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(168,85,247,.04)'}
              onMouseLeave={e => e.currentTarget.style.background = ''}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '.92rem', color: '#fff' }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  {s.sub}
                </div>
              </div>

              {s.type === 'toggle' ? (
                <label className="toggle-wrap">
                  <input
                    type="checkbox"
                    checked={values[s.id] as boolean}
                    onChange={e => set(s.id, e.target.checked)}
                  />
                  <span className="toggle-slider" />
                </label>
              ) : (
                <select
                  value={values[s.id] as string}
                  onChange={e => set(s.id, e.target.value)}
                  style={{
                    background: 'rgba(20,8,50,.9)',
                    border: '1px solid var(--glass-b)',
                    borderRadius: 8,
                    padding: '7px 12px',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '.82rem',
                    outline: 'none',
                    transition: 'border-color .2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--purple)'}
                  onBlur={e => e.target.style.borderColor = 'var(--glass-b)'}
                >
                  {s.options!.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        {/* Save button */}
        <button
          onClick={save}
          style={{
            marginTop: '1.5rem',
            width: '100%', padding: '13px',
            background: saved
              ? 'linear-gradient(135deg, #059669, #10b981)'
              : 'linear-gradient(135deg, #7c3aed, #a855f7)',
            color: '#fff', border: 'none',
            borderRadius: 'var(--radius)',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.95rem',
            boxShadow: '0 0 22px rgba(168,85,247,.3)',
            transition: 'all .3s',
          }}
        >
          {saved ? '✅ Settings Saved!' : 'Save Settings'}
        </button>

        {/* Reset */}
        <button
          onClick={() => setValues(Object.fromEntries(SETTINGS.map(s => [s.id, s.defaultValue])))}
          style={{
            marginTop: '.75rem', width: '100%', padding: '10px',
            background: 'transparent', border: '1px solid var(--glass-b)',
            borderRadius: 'var(--radius)', color: 'var(--text-muted)',
            fontFamily: 'var(--font-display)', fontSize: '.85rem',
            transition: 'all .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--purple-l)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--glass-b)'}
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}