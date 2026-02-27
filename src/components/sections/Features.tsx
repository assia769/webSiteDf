'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────────────────────────
   MINI PREVIEWS
───────────────────────────────────────── */

function PomoRing() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.1rem 0 .6rem', position: 'relative' }}>
      <svg viewBox="0 0 120 120" style={{ width: 108, height: 108, transform: 'rotate(-90deg)', overflow: 'visible' }}>
        <defs>
          <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed"/>
            <stop offset="50%" stopColor="#a855f7"/>
            <stop offset="100%" stopColor="#ec4899"/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle fill="none" stroke="rgba(168,85,247,.1)" strokeWidth={7} cx={60} cy={60} r={50}/>
        {/* Tick marks */}
        {Array.from({length: 12}).map((_, i) => {
          const angle = (i * 30 - 90) * Math.PI / 180;
          const r1 = 46, r2 = 43;
          return (
            <line key={i}
              x1={60 + r1 * Math.cos(angle)} y1={60 + r1 * Math.sin(angle)}
              x2={60 + r2 * Math.cos(angle)} y2={60 + r2 * Math.sin(angle)}
              stroke="rgba(168,85,247,.25)" strokeWidth={1.5} strokeLinecap="round"
            />
          );
        })}
        {/* Progress arc */}
        <circle
          fill="none" stroke="url(#pg)" strokeWidth={7}
          strokeLinecap="round" cx={60} cy={60} r={50}
          strokeDasharray={314} strokeDashoffset={78}
          filter="url(#glow)"
          style={{ animation: 'pomoPulse 3s ease-in-out infinite' }}
        />
        {/* Glowing dot at progress end */}
        <circle
          cx={60 + 50 * Math.cos(((-90 + (314-78)/314*360)) * Math.PI/180)}
          cy={60 + 50 * Math.sin(((-90 + (314-78)/314*360)) * Math.PI/180)}
          r={5} fill="#e879f9"
          style={{ filter: 'drop-shadow(0 0 6px #e879f9)' }}
        />
      </svg>

      {/* Center text */}
      <div style={{
        position: 'absolute', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>25:00</span>
        <span style={{ fontSize: '.58rem', letterSpacing: '.14em', color: 'rgba(168,85,247,.7)', fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', marginTop: 3 }}>Focus</span>
      </div>
    </div>
  );
}

function TodoPreview() {
  const items = [
    { text: 'Documentation',    done: true,  badge: null     },
    { text: 'Build UI',         done: false, badge: 'High',   bc: 'high'   },
    { text: 'Review Class',     done: false, badge: 'Medium', bc: 'medium' },
    { text: 'Meeting with Aida',done: false, badge: 'Low',    bc: 'low'    },
  ];
  return (
    <div style={{ padding: '.3rem 0 .2rem' }}>
      {items.map((it, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: '.65rem',
          padding: '.45rem 0',
          borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,.045)' : '',
        }}>
          {/* Check circle */}
          <div style={{
            width: 17, height: 17, borderRadius: '50%',
            border: `1.5px solid ${it.done ? 'var(--purple-d)' : 'rgba(168,85,247,.35)'}`,
            background: it.done ? 'linear-gradient(135deg,var(--purple-d),var(--purple))' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, fontSize: '.5rem', color: '#fff',
            boxShadow: it.done ? '0 0 10px rgba(168,85,247,.4)' : 'none',
            transition: 'all .2s',
          }}>
            {it.done && '✓'}
          </div>
          <span style={{
            flex: 1, fontSize: '.76rem',
            color: it.done ? 'rgba(255,255,255,.3)' : 'rgba(255,255,255,.72)',
            textDecoration: it.done ? 'line-through' : 'none',
          }}>{it.text}</span>
          {it.badge && <span className={`badge badge-${it.bc}`}>{it.badge}</span>}
        </div>
      ))}
    </div>
  );
}

function BlockerPreview() {
  return (
    <div style={{ padding: '.2rem 0' }}>
      <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.4)', marginBottom: '.7rem', lineHeight: 1.5 }}>Block distracting websites during focus sessions.</p>
      <div style={{ display: 'flex', gap: '.4rem', marginBottom: '.9rem' }}>
        <input defaultValue="instagram.com" readOnly style={{
          flex: 1, background: 'rgba(255,255,255,.06)',
          border: '1px solid rgba(168,85,247,.2)', borderRadius: 9,
          padding: '7px 10px', color: 'rgba(255,255,255,.7)',
          fontSize: '.73rem', outline: 'none',
          fontFamily: 'var(--font-body)',
        }}/>
        <button style={{
          padding: '7px 14px',
          background: 'linear-gradient(135deg, var(--purple-d), var(--purple))',
          border: 'none', borderRadius: 9,
          color: '#fff', fontSize: '.72rem', fontWeight: 700,
          fontFamily: 'var(--font-display)',
          boxShadow: '0 0 14px rgba(168,85,247,.35)',
        }}>Block</button>
      </div>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {['twitter.com','reddit.com','youtube.com'].map(s => (
          <span key={s} style={{
            padding: '3px 9px', borderRadius: 20,
            background: 'rgba(168,85,247,.12)',
            border: '1px solid rgba(168,85,247,.22)',
            fontSize: '.64rem', color: 'rgba(168,85,247,.85)',
            fontFamily: 'var(--font-display)', fontWeight: 600,
          }}>⊘ {s}</span>
        ))}
      </div>
    </div>
  );
}

function SoundPreview() {
  const bars = [12, 20, 28, 16, 24, 32, 18, 26, 14, 22, 30, 16, 22];
  return (
    <div>
      {/* Album art */}
      <div style={{
        width: '100%', height: 82, borderRadius: 13,
        background: 'linear-gradient(135deg,#0f1a2e,#1a0a3a,#0a1528)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '.7rem',
        border: '1px solid rgba(168,85,247,.15)',
      }}>
        <div style={{ position:'absolute',inset:0, background:'radial-gradient(ellipse at 60% 35%, rgba(168,85,247,.28), transparent 60%)' }}/>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '1.6rem' }}>🌲</span>
          {/* Equalizer bars */}
          <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 18 }}>
            {bars.map((h, i) => (
              <div key={i} style={{
                width: 3, height: h * .5,
                background: 'linear-gradient(to top, var(--purple-d), var(--purple-l))',
                borderRadius: 2, opacity: .8,
                animation: `waveAnim ${.4 + i * .05}s ease-in-out infinite alternate`,
                animationDelay: `${i * .06}s`,
              }}/>
            ))}
          </div>
        </div>
        <span style={{ position: 'absolute', bottom: 8, right: 12, fontSize: '.73rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'rgba(255,255,255,.7)' }}>Forest Rain</span>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
        <span style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.38)', fontFamily: 'var(--font-display)' }}>0:10</span>
        <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,.1)', borderRadius: 2, position: 'relative' }}>
          <div style={{ position:'absolute',left:0,top:0,height:'100%',width:'55%', background:'linear-gradient(90deg,var(--purple-d),var(--purple))', borderRadius:2, boxShadow:'0 0 6px rgba(168,85,247,.5)' }}/>
          <div style={{ position:'absolute',left:'55%',top:'50%',transform:'translate(-50%,-50%)',width:8,height:8,borderRadius:'50%',background:'var(--purple)',boxShadow:'0 0 8px rgba(168,85,247,.8)' }}/>
        </div>
        <span style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.38)', fontFamily: 'var(--font-display)' }}>1:00</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CARDS CONFIG
───────────────────────────────────────── */
const CARDS = [
  {
    href: '/pomodoro', icon: '⏱',
    title: 'Pomodoro Timer',
    sub: 'Deep work sessions with precision timing and smart break reminders.',
    inner: <PomoRing />,
    glowColor: 'rgba(168,85,247,.25)',
  },
  {
    href: '/todo', icon: '✓',
    title: 'Smart To-Do List',
    sub: 'Prioritize tasks with urgency labels and streamlined completion tracking.',
    inner: <TodoPreview />,
    glowColor: 'rgba(96,165,250,.2)',
  },
  {
    href: '/blocker', icon: '⊘',
    title: 'Distraction Blocker',
    sub: 'Lock out distracting sites during your focus windows automatically.',
    inner: <BlockerPreview />,
    glowColor: 'rgba(236,72,153,.2)',
  },
  {
    href: '/sound', icon: '♪',
    title: 'Focus Soundscapes',
    sub: 'Ambient audio environments engineered for sustained concentration.',
    inner: <SoundPreview />,
    glowColor: 'rgba(52,211,153,.18)',
  },
];

/* ─────────────────────────────────────────
   FEATURES
───────────────────────────────────────── */
export function Features() {
  const titleRef = useReveal();

  return (
    <section style={{ position: 'relative', zIndex: 5, padding: '5rem 5% 4rem' }}>

      {/* Section header */}
      <div ref={titleRef} className="reveal" style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          marginBottom: '.85rem',
        }}>
          <div style={{ width: 28, height: 1.5, background: 'linear-gradient(90deg,var(--purple),transparent)' }}/>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '.72rem', fontWeight: 700,
            letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--purple-l)',
          }}>Everything you need</span>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05,
          color: '#fff', marginBottom: '.8rem',
        }}>
          Four tools.<br/>
          <span className="gradient-text">One flow.</span>
        </h2>
        <p style={{
          fontSize: '.95rem', color: 'var(--text-muted)',
          maxWidth: 440, lineHeight: 1.75, fontWeight: 300,
        }}>
          Each feature works together, creating a seamless environment for sustained concentration.
        </p>
      </div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
      }}
        className="features-grid"
      >
        {CARDS.map(({ href, icon, title, sub, inner, glowColor }, i) => (
          <Link
            key={href}
            href={href}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <GlowCard
              glowColor={glowColor}
              intensity="medium"
              style={{
                padding: '1.5rem 1.3rem 1.3rem',
                cursor: 'none',
                animation: 'fadeUp .7s ease both',
                animationDelay: `${i * .1 + .15}s`,
              }}
            >
              {/* Icon chip */}
              <div style={{
                width: 42, height: 42, borderRadius: 13,
                background: 'linear-gradient(135deg, rgba(168,85,247,.2), rgba(168,85,247,.08))',
                border: '1px solid rgba(168,85,247,.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', marginBottom: '.3rem',
                boxShadow: '0 4px 16px rgba(168,85,247,.15)',
              }}>
                {icon}
              </div>

              {/* Mini preview */}
              {inner}

              {/* Text */}
              <div style={{ marginTop: '.75rem' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '.98rem', fontWeight: 700,
                  color: '#fff', marginBottom: '.3rem',
                  letterSpacing: '-.01em',
                }}>{title}</div>
                <div style={{
                  fontSize: '.76rem',
                  color: 'rgba(255,255,255,.4)',
                  lineHeight: 1.6, fontWeight: 300,
                }}>{sub}</div>
              </div>

              {/* Arrow */}
              <div style={{
                marginTop: '.9rem',
                display: 'flex', alignItems: 'center', gap: 4,
                fontSize: '.72rem', fontFamily: 'var(--font-display)', fontWeight: 600,
                color: 'rgba(168,85,247,.6)',
              }}>
                Explore <span>→</span>
              </div>
            </GlowCard>
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 1100px) { .features-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px)  { .features-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}