'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add('visible'), delay); obs.disconnect(); }
    }, { threshold: .12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── Pomo Ring ── 
   FIX: Math.cos/sin produce floating point differences between server and client.
   Solution: render only on client with useState/useEffect to avoid hydration mismatch.
*/
function PomoRing() {
  const C = 314; // 2πr, r=50
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Placeholder with same dimensions shown during SSR / before mount
  if (!mounted) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem 0 .5rem', position:'relative' }}>
        <div style={{ width:102, height:102, borderRadius:'50%', background:'rgba(168,85,247,.05)', border:'1px solid rgba(168,85,247,.1)' }} />
      </div>
    );
  }

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem 0 .5rem', position:'relative' }}>
      <svg viewBox="0 0 110 110" style={{ width:102, height:102, transform:'rotate(-90deg)', overflow:'visible' }}>
        <defs>
          <linearGradient id="fpg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#7c3aed"/>
            <stop offset="50%"  stopColor="#a855f7"/>
            <stop offset="100%" stopColor="#ec4899"/>
          </linearGradient>
          <filter id="fglow">
            <feGaussianBlur stdDeviation="3.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle fill="none" stroke="rgba(168,85,247,.1)" strokeWidth={6} cx={55} cy={55} r={50}/>
        {/* Tick marks — computed client-side only, no hydration mismatch */}
        {Array.from({length:12}).map((_,i) => {
          const a = (i*30-90)*Math.PI/180;
          const x1 = 55+46*Math.cos(a);
          const y1 = 55+46*Math.sin(a);
          const x2 = 55+43*Math.cos(a);
          const y2 = 55+43*Math.sin(a);
          return (
            <line
              key={i}
              x1={x1} y1={y1}
              x2={x2} y2={y2}
              stroke="rgba(168,85,247,.22)"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          );
        })}
        {/* Arc */}
        <circle
          fill="none"
          stroke="url(#fpg)"
          strokeWidth={6}
          strokeLinecap="round"
          cx={55} cy={55} r={50}
          strokeDasharray={C}
          strokeDashoffset={C*.25}
          filter="url(#fglow)"
          style={{ animation:'pomoPulse 3s ease-in-out infinite' }}
        />
        {/* Glowing end dot */}
        <circle
          cx={55 + 50*Math.cos((-90 + (C-C*.25)/C*360)*Math.PI/180)}
          cy={55 + 50*Math.sin((-90 + (C-C*.25)/C*360)*Math.PI/180)}
          r={4.5}
          fill="#e879f9"
          style={{ filter:'drop-shadow(0 0 7px #e879f9)' }}
        />
      </svg>
      <div style={{ position:'absolute', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <span style={{ fontFamily:'var(--font-display)', fontSize:'1.45rem', fontWeight:800, color:'#fff', lineHeight:1 }}>25:00</span>
        <span style={{ fontSize:'.55rem', letterSpacing:'.15em', color:'rgba(168,85,247,.7)', fontFamily:'var(--font-display)', fontWeight:600, textTransform:'uppercase', marginTop:3 }}>FOCUS</span>
      </div>
    </div>
  );
}

/* ── Todo Preview ── */
function TodoPreview() {
  const items = [
    { text:'Documentation',     done:true,  badge:null,     bc:''       },
    { text:'Build UI',          done:false, badge:'High',   bc:'high'   },
    { text:'Review Class',      done:false, badge:'Medium', bc:'medium' },
    { text:'Meeting with Aida', done:false, badge:'Low',    bc:'low'    },
  ];
  return (
    <div style={{ padding:'.25rem 0 .15rem' }}>
      {items.map((it,i)=>(
        <div key={i} style={{ display:'flex', alignItems:'center', gap:'.62rem', padding:'.44rem 0', borderBottom:i<items.length-1?'1px solid rgba(255,255,255,.04)':'' }}>
          <div style={{
            width:16, height:16, borderRadius:'50%', flexShrink:0,
            border:`1.5px solid ${it.done?'rgba(168,85,247,.8)':'rgba(168,85,247,.3)'}`,
            background: it.done ? 'linear-gradient(135deg,var(--purple-d),var(--purple))' : 'transparent',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'.5rem', color:'#fff',
            boxShadow: it.done ? '0 0 12px rgba(168,85,247,.5)' : 'none',
          }}>{it.done && '✓'}</div>
          <span style={{ flex:1, fontSize:'.75rem', color:it.done?'rgba(255,255,255,.28)':'rgba(255,255,255,.7)', textDecoration:it.done?'line-through':'none' }}>{it.text}</span>
          {it.badge && <span className={`badge badge-${it.bc}`}>{it.badge}</span>}
        </div>
      ))}
    </div>
  );
}

/* ── Blocker Preview ── */
function BlockerPreview() {
  return (
    <div style={{ padding:'.2rem 0' }}>
      <p style={{ fontSize:'.71rem', color:'rgba(255,255,255,.38)', marginBottom:'.65rem', lineHeight:1.55 }}>Block distracting websites during focus.</p>
      <div style={{ display:'flex', gap:'.4rem', marginBottom:'.85rem' }}>
        <input defaultValue="instagram.com" readOnly style={{
          flex:1, background:'rgba(255,255,255,.05)', border:'1px solid rgba(168,85,247,.18)',
          borderRadius:9, padding:'7px 10px', color:'rgba(255,255,255,.65)',
          fontSize:'.72rem', outline:'none', fontFamily:'var(--font-body)',
        }}/>
        <button style={{
          padding:'7px 14px', background:'linear-gradient(135deg,var(--purple-d),var(--purple))',
          border:'none', borderRadius:9, color:'#fff', fontSize:'.72rem', fontWeight:700,
          fontFamily:'var(--font-display)', boxShadow:'0 0 16px rgba(168,85,247,.4)',
        }}>Block</button>
      </div>
      <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
        {['twitter.com','reddit.com','youtube.com'].map(s=>(
          <span key={s} style={{
            padding:'3px 9px', borderRadius:20, background:'rgba(168,85,247,.1)',
            border:'1px solid rgba(168,85,247,.22)', fontSize:'.63rem',
            color:'rgba(168,85,247,.85)', fontFamily:'var(--font-display)', fontWeight:600,
          }}>⊘ {s}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Sound Preview ── */
function SoundPreview() {
  const bars = [11,18,26,14,22,30,16,24,12,20,28,15,21];
  return (
    <div>
      <div style={{
        width:'100%', height:80, borderRadius:13,
        background:'linear-gradient(135deg,#0f1a2e,#1a0a3a,#0a1528)',
        position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center',
        marginBottom:'.68rem', border:'1px solid rgba(168,85,247,.14)',
      }}>
        <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 60% 35%,rgba(168,85,247,.28),transparent 60%)' }}/>
        <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
          <span style={{ fontSize:'1.5rem' }}>🌲</span>
          <div style={{ display:'flex', gap:2, alignItems:'flex-end', height:16 }}>
            {bars.map((h,i)=>(
              <div key={i} style={{
                width:3, background:'linear-gradient(to top,var(--purple-d),var(--purple-l))',
                borderRadius:2, opacity:.82,
                animation:`waveAnim ${.38+i*.05}s ease-in-out infinite alternate`,
                animationDelay:`${i*.06}s`, height:h*.48,
              }}/>
            ))}
          </div>
        </div>
        <span style={{ position:'absolute',bottom:8,right:11,fontSize:'.7rem',fontFamily:'var(--font-display)',fontWeight:700,color:'rgba(255,255,255,.65)' }}>Forest Rain</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'.58rem' }}>
        <span style={{ fontSize:'.58rem',color:'rgba(255,255,255,.35)',fontFamily:'var(--font-display)' }}>0:10</span>
        <div style={{ flex:1,height:3,borderRadius:2,background:'rgba(255,255,255,.09)',position:'relative' }}>
          <div style={{ position:'absolute',left:0,top:0,height:'100%',width:'55%',background:'linear-gradient(90deg,var(--purple-d),var(--purple))',borderRadius:2,boxShadow:'0 0 7px rgba(168,85,247,.55)' }}/>
          <div style={{ position:'absolute',left:'55%',top:'50%',transform:'translate(-50%,-50%)',width:7,height:7,borderRadius:'50%',background:'var(--purple)',boxShadow:'0 0 9px rgba(168,85,247,.9)' }}/>
        </div>
        <span style={{ fontSize:'.58rem',color:'rgba(255,255,255,.35)',fontFamily:'var(--font-display)' }}>1:00</span>
      </div>
    </div>
  );
}

/* ── Cards config ── */
const CARDS = [
  { href:'/pomodoro', icon:'⏱', title:'Pomodoro Timer',     sub:'Deep work sessions with precision timing and smart break reminders.', inner:<PomoRing/>,      glow:'rgba(168,85,247,.25)' },
  { href:'/todo',     icon:'✓', title:'Smart To-Do List',   sub:'Prioritize tasks with urgency labels and streamlined tracking.',      inner:<TodoPreview/>,   glow:'rgba(96,165,250,.2)'  },
  { href:'/blocker',  icon:'⊘', title:'Distraction Blocker',sub:'Lock out distracting sites automatically during focus windows.',      inner:<BlockerPreview/>,glow:'rgba(236,72,153,.2)'  },
  { href:'/sound',    icon:'♪', title:'Focus Soundscapes',  sub:'Ambient audio environments engineered for sustained concentration.',  inner:<SoundPreview/>,  glow:'rgba(52,211,153,.18)' },
];

export function Features() {
  const hRef = useReveal(0);

  return (
    <section style={{ position:'relative', zIndex:5, padding:'5rem 5% 4rem' }}>

      {/* Section header */}
      <div ref={hRef} className="reveal" style={{ marginBottom:'3rem' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:'.85rem' }}>
          <div style={{ width:30, height:1.5, background:'linear-gradient(90deg,var(--purple),transparent)' }}/>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'.7rem', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--purple-l)' }}>Everything you need</span>
        </div>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.9rem,3.8vw,2.9rem)', fontWeight:800, letterSpacing:'-.032em', lineHeight:1.06, color:'#fff', marginBottom:'.8rem' }}>
          Four tools.<br/>
          <span className="gradient-text">One flow.</span>
        </h2>
        <p style={{ fontSize:'.93rem', color:'var(--text-muted)', maxWidth:440, lineHeight:1.78, fontWeight:300 }}>
          Each feature works together, creating a seamless environment for sustained concentration.
        </p>
      </div>

      {/* Grid */}
      <div className="features-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
        {CARDS.map(({ href, icon, title, sub, inner, glow }, i) => (
          <Link key={href} href={href} style={{ textDecoration:'none', color:'inherit' }}>
            <GlowCard
              glowColor={glow}
              intensity="medium"
              style={{
                padding:'1.5rem 1.3rem 1.25rem', cursor:'none',
                animation:'fadeUp .7s ease both',
                animationDelay:`${i*.1+.1}s`,
              }}
            >
              {/* Icon chip */}
              <div style={{
                width:42, height:42, borderRadius:13, marginBottom:'.35rem',
                background:'linear-gradient(135deg,rgba(168,85,247,.22),rgba(168,85,247,.07))',
                border:'1px solid rgba(168,85,247,.25)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.15rem',
                boxShadow:'0 4px 18px rgba(168,85,247,.18)',
              }}>{icon}</div>

              {inner}

              <div style={{ marginTop:'.78rem' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'.96rem', fontWeight:700, color:'#fff', marginBottom:'.28rem', letterSpacing:'-.012em' }}>{title}</div>
                <div style={{ fontSize:'.74rem', color:'rgba(255,255,255,.38)', lineHeight:1.62, fontWeight:300 }}>{sub}</div>
              </div>

              {/* Explore arrow */}
              <div style={{ marginTop:'.9rem', display:'flex', alignItems:'center', gap:5, fontSize:'.7rem', fontFamily:'var(--font-display)', fontWeight:600, color:'rgba(168,85,247,.55)' }}>
                Explore <span style={{ transition:'transform .2s' }}>→</span>
              </div>
            </GlowCard>
          </Link>
        ))}
      </div>

      <style>{`
        @media(max-width:1100px){ .features-grid{ grid-template-columns:repeat(2,1fr) !important; } }
        @media(max-width:560px) { .features-grid{ grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  );
}