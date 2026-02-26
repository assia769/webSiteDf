'use client';

import Link from 'next/link';
import { GlowCard } from '@/components/ui/GlowCard';

/* ── Pomodoro mini ring ── */
function PomoRing() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem 0' }}>
      <div style={{ width:110, height:110, position:'relative' }}>
        <svg viewBox="0 0 110 110" style={{ width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
          <defs>
            <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed"/>
              <stop offset="100%" stopColor="#ec4899"/>
            </linearGradient>
          </defs>
          <circle fill="none" stroke="rgba(168,85,247,.15)" strokeWidth={6} cx={55} cy={55} r={46}/>
          <circle
            fill="none" stroke="url(#pg)" strokeWidth={6}
            strokeLinecap="round" cx={55} cy={55} r={46}
            strokeDasharray={289} strokeDashoffset={50}
            style={{ filter:'drop-shadow(0 0 6px rgba(168,85,247,.8))', animation:'pomoPulse 3s ease-in-out infinite' }}
          />
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', fontWeight:700, color:'#fff', lineHeight:1 }}>25:00</span>
          <div style={{ width:24, height:2, background:'rgba(255,255,255,.35)', borderRadius:1, marginTop:5 }}/>
        </div>
      </div>
    </div>
  );
}

/* ── ToDo mini list ── */
function TodoPreview() {
  const items = [
    { text:'Documentation',   done:true,  badge:null },
    { text:'Build UI',        done:false, badge:'High',   bc:'high' },
    { text:'Review Class',    done:false, badge:'Medium', bc:'medium' },
    { text:'Meeting with Aida', done:false, badge:'Low',  bc:'low' },
  ];
  return (
    <div style={{ padding:'.4rem 0' }}>
      {items.map((it,i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:'.6rem', padding:'.42rem 0', borderBottom:i<items.length-1?'1px solid rgba(255,255,255,.05)':'' }}>
          <div style={{ width:16, height:16, borderRadius:'50%', border:'1.5px solid rgba(168,85,247,.45)', background:it.done?'#7c3aed':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'.55rem', color:'#fff' }}>
            {it.done && '✓'}
          </div>
          <span style={{ flex:1, fontSize:'.77rem', color:it.done?'rgba(255,255,255,.35)':'rgba(255,255,255,.7)', textDecoration:it.done?'line-through':'none' }}>{it.text}</span>
          {it.badge && <span className={`badge badge-${it.bc}`}>{it.badge}</span>}
        </div>
      ))}
    </div>
  );
}

/* ── Blocker mini ── */
function BlockerPreview() {
  return (
    <div style={{ padding:'.4rem 0' }}>
      <p style={{ fontSize:'.76rem', color:'rgba(255,255,255,.5)', marginBottom:'.6rem' }}>Enter website URL to block.</p>
      <div style={{ display:'flex', gap:'.45rem', marginBottom:'.8rem' }}>
        <input defaultValue="facebook.com" readOnly style={{ flex:1, background:'rgba(255,255,255,.07)', border:'1px solid rgba(168,85,247,.22)', borderRadius:8, padding:'7px 10px', color:'rgba(255,255,255,.8)', fontSize:'.75rem', outline:'none' }}/>
        <button style={{ padding:'7px 14px', background:'#7c3aed', border:'none', borderRadius:8, color:'#fff', fontSize:'.75rem', fontWeight:600 }}>Add</button>
      </div>
      <div style={{ display:'flex', gap:'.7rem', justifyContent:'center' }}>
        {['⏮','⏹','⏭'].map((ic,i) => (
          <div key={i} style={{ width:36, height:36, borderRadius:'50%', background:i===1?'rgba(168,85,247,.28)':'rgba(255,255,255,.08)', border:`1px solid ${i===1?'rgba(168,85,247,.5)':'rgba(255,255,255,.14)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.85rem' }}>
            {ic}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Sound mini ── */
function SoundPreview() {
  return (
    <div>
      <div style={{ width:'100%', height:80, borderRadius:10, background:'linear-gradient(135deg,#0f1a2e,#1a0a3a)', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'.65rem' }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(13,5,32,.8), transparent)' }}/>
        <span style={{ fontSize:'2rem', position:'relative', zIndex:1 }}>🌲</span>
        <span style={{ position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)', fontSize:'.85rem', fontWeight:600, color:'#fff', zIndex:1 }}>Forest</span>
      </div>
      <div style={{ display:'flex', gap:4, justifyContent:'center', marginBottom:'.55rem' }}>
        {[false,true,false].map((a,i)=><div key={i} style={{ width:6, height:6, borderRadius:'50%', background:a?'#4ade80':'rgba(255,255,255,.2)' }}/>)}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'.55rem', fontSize:'.65rem', color:'rgba(255,255,255,.4)' }}>
        <span>0:10</span>
        <div style={{ flex:1, height:3, background:'rgba(255,255,255,.14)', borderRadius:2, position:'relative' }}>
          <div style={{ position:'absolute', left:0, top:0, height:'100%', width:'55%', background:'linear-gradient(90deg,#7c3aed,#a855f7)', borderRadius:2 }}/>
        </div>
        <span>0:08</span>
      </div>
    </div>
  );
}

const CARDS = [
  { href:'/pomodoro', title:'Pomodoro Timer',     sub:'Maximize your concentration.', inner:<PomoRing/> },
  { href:'/todo',     title:'To-Do List',          sub:'Prioritize your workflow.',    inner:<TodoPreview/> },
  { href:'/blocker',  title:'Distraction Blocker', sub:'Penalize website distractions.',inner:<BlockerPreview/> },
  { href:'/sound',    title:'Sound Focus Player',  sub:'Elevate your focus choices.',  inner:<SoundPreview/> },
];

export function Features() {
  return (
    <section style={{ position:'relative', zIndex:5 }}>
      {/* 4-col cards grid */}
      <div
        style={{
          display:'grid',
          gridTemplateColumns:'repeat(4,1fr)',
          gap:16,
          padding:'0 5%',
        }}
      >
        {CARDS.map(({ href, title, sub, inner }, i) => (
          <Link key={href} href={href} style={{ textDecoration:'none', color:'inherit' }}>
            <GlowCard
              style={{ padding:'1.5rem 1.25rem', cursor:'none' }}
              glowColor={`rgba(168,85,247,${.18 + i * .02})`}
            >
              {inner}
              <div style={{ textAlign:'center', marginTop:'.25rem' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'1.05rem', fontWeight:600, marginBottom:'.3rem', color:'#fff' }}>
                  {title}
                </div>
                <div style={{ fontSize:'.74rem', color:'rgba(255,255,255,.42)', lineHeight:1.5 }}>{sub}</div>
              </div>
            </GlowCard>
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 540px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}