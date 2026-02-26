'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { formatTime, TIMER_DURATIONS, type TimerMode } from '@/lib/utils';

const CIRCUMFERENCE = 2 * Math.PI * 116;

const MODES: { id: TimerMode; label: string; emoji: string }[] = [
  { id: 'focus', label: 'Focus',       emoji: '🎯' },
  { id: 'short', label: 'Short Break', emoji: '☕' },
  { id: 'long',  label: 'Long Break',  emoji: '🌙' },
];

export default function PomodoroPage() {
  const [mode, setMode]       = useState<TimerMode>('focus');
  const [seconds, setSeconds] = useState(TIMER_DURATIONS.focus);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles]   = useState(0);
  const intervalRef           = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = TIMER_DURATIONS[mode];
  const pct   = (total - seconds) / total;
  const offset = CIRCUMFERENCE - pct * CIRCUMFERENCE;

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const tick = useCallback(() => {
    setSeconds(s => {
      if (s <= 1) {
        stop();
        setRunning(false);
        if (mode === 'focus') setCycles(c => c + 1);
        return 0;
      }
      return s - 1;
    });
  }, [mode, stop]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      stop();
    }
    return stop;
  }, [running, tick, stop]);

  const toggle = () => setRunning(r => !r);

  const reset = () => {
    stop(); setRunning(false);
    setSeconds(TIMER_DURATIONS[mode]);
  };

  const skip = () => {
    stop(); setRunning(false);
    const next: Record<TimerMode, TimerMode> = { focus: 'short', short: 'focus', long: 'focus' };
    handleModeChange(next[mode]);
  };

  const handleModeChange = (m: TimerMode) => {
    stop(); setRunning(false);
    setMode(m); setSeconds(TIMER_DURATIONS[m]);
  };

  return (
    <div
      className="page-wrapper"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.5rem', minHeight: '80vh' }}
    >
      <div style={{ textAlign: 'center' }}>
        <span className="label-tag">Pomodoro Timer</span>
        <h1 className="page-heading" style={{ marginTop: '.25rem' }}>
          Stay in the{' '}
          <span className="gradient-text">zone</span>
        </h1>
      </div>

      {/* Big ring */}
      <div style={{ width: 260, height: 260, position: 'relative' }}>
        <svg viewBox="0 0 260 260" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
          <defs>
            <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed"/>
              <stop offset="100%" stopColor="#ec4899"/>
            </linearGradient>
          </defs>
          {/* Track */}
          <circle
            fill="none"
            stroke="rgba(168,85,247,.12)"
            strokeWidth={6}
            cx={130} cy={130} r={116}
          />
          {/* Progress */}
          <circle
            fill="none"
            stroke="url(#timerGrad)"
            strokeWidth={6}
            strokeLinecap="round"
            cx={130} cy={130} r={116}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset .9s linear',
              filter: 'drop-shadow(0 0 10px rgba(168,85,247,.8))',
            }}
          />
        </svg>

        {/* Center */}
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '3.5rem', fontWeight: 800,
              lineHeight: 1, color: '#fff',
              letterSpacing: '-.02em',
            }}
          >
            {formatTime(seconds)}
          </div>
          <div
            style={{
              fontSize: '.72rem', color: 'var(--text-muted)',
              letterSpacing: '.14em', textTransform: 'uppercase',
              marginTop: '.4rem', fontFamily: 'var(--font-display)',
            }}
          >
            {MODES.find(m => m.id === mode)?.label}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {[
          { icon: '↩', action: reset, size: 52 },
          { icon: running ? '⏸' : '▶', action: toggle, size: 68, isPrimary: true },
          { icon: '⏭', action: skip, size: 52 },
        ].map(btn => (
          <button
            key={btn.icon}
            onClick={btn.action}
            style={{
              width: btn.size, height: btn.size,
              borderRadius: '50%',
              background: btn.isPrimary
                ? 'linear-gradient(135deg, #7c3aed, #a855f7)'
                : 'rgba(255,255,255,.08)',
              border: btn.isPrimary ? 'none' : '1px solid rgba(255,255,255,.15)',
              color: '#fff',
              fontSize: btn.isPrimary ? '1.5rem' : '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: btn.isPrimary ? '0 0 28px rgba(168,85,247,.5)' : '',
              transition: 'all .25s',
            }}
          >
            {btn.icon}
          </button>
        ))}
      </div>

      {/* Mode tabs */}
      <div style={{ display: 'flex', gap: '.75rem' }}>
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => handleModeChange(m.id)}
            style={{
              padding: '9px 22px', borderRadius: 50,
              background: mode === m.id ? 'rgba(168,85,247,.22)' : 'rgba(255,255,255,.07)',
              border: `1px solid ${mode === m.id ? 'rgba(168,85,247,.45)' : 'rgba(255,255,255,.12)'}`,
              color: mode === m.id ? 'var(--purple-l)' : 'rgba(255,255,255,.55)',
              fontSize: '.86rem', fontWeight: 500,
              fontFamily: 'var(--font-display)',
              transition: 'all .2s',
            }}
          >
            {m.emoji} {m.label}
          </button>
        ))}
      </div>

      {/* Cycle counter */}
      <div
        style={{
          fontSize: '.82rem', color: 'var(--text-dim)',
          fontFamily: 'var(--font-display)', letterSpacing: '.04em',
        }}
      >
        Cycle{' '}
        <span style={{ color: 'var(--purple-l)' }}>{cycles}</span>
        {' '}/ 4
      </div>
    </div>
  );
}