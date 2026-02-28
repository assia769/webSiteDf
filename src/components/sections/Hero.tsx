'use client';

import { useEffect, useRef, useState } from 'react';
import { FloatingRobot } from '@/components/ui/FloatingRobot';
import { ParticleField } from '@/components/ui/ParticleField';
import { MagneticButton } from '@/components/ui/MagneticButton';

function PlasmaOrb({ size, x, y, color, delay }: {
  size: number; x: string; y: string; color: string; delay: string;
}) {
  return (
    <div style={{
      position: 'absolute', width: size, height: size, left: x, top: y,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: `blur(${size * .28}px)`,
      animation: 'plasmaPulse 4s ease-in-out infinite',
      animationDelay: delay,
      pointerEvents: 'none', zIndex: 0,
    }} />
  );
}

function Shard({ style, glowColor, size, delay, duration, animName }: {
  style?: React.CSSProperties; glowColor: string; size: number;
  delay: string; duration: string; animName: string;
}) {
  return (
    <div style={{
      position: 'absolute', width: size, height: size,
      borderRadius: size * .2,
      border: `1px solid ${glowColor}`,
      background: `linear-gradient(135deg, ${glowColor.replace(/[\d.]+\)$/, '.07)')}, transparent)`,
      backdropFilter: 'blur(3px)',
      boxShadow: `0 0 ${size * .6}px ${glowColor}, inset 0 0 ${size * .35}px ${glowColor.replace(/[\d.]+\)$/, '.04)')}`,
      animation: `${animName} ${duration} ease-in-out infinite`,
      animationDelay: delay,
      ...style,
    }} />
  );
}

function SplitText({ text, baseDelay = 0, style }: {
  text: string; baseDelay?: number; style?: React.CSSProperties;
}) {
  return (
    <span style={{ display: 'inline-block', ...style }}>
      {text.split('').map((ch, i) => (
        <span key={i} style={{
          display: 'inline-block',
          animation: `letterReveal .65s cubic-bezier(.22,1,.36,1) both`,
          animationDelay: `${baseDelay + i * .048}s`,
        }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

function ScanLine() {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, height: 1,
      background: 'linear-gradient(90deg, transparent 0%, rgba(168,85,247,.0) 15%, rgba(168,85,247,.55) 50%, rgba(168,85,247,.0) 85%, transparent)',
      animation: 'scanLine 7s linear infinite',
      pointerEvents: 'none', zIndex: 12,
    }} />
  );
}

function FloatRing({ size, top, left, delay, speed }: {
  size: number; top: string; left: string; delay: string; speed: string;
}) {
  return (
    <div style={{
      position: 'absolute', width: size, height: size, top, left,
      borderRadius: '50%',
      border: '1px solid rgba(168,85,247,.16)',
      boxShadow: '0 0 18px rgba(168,85,247,.08), inset 0 0 18px rgba(168,85,247,.04)',
      animation: `ringFloat ${speed} ease-in-out infinite`,
      animationDelay: delay, zIndex: 1, pointerEvents: 'none',
    }}>
      <div style={{ position: 'absolute', inset: '18%', borderRadius: '50%', border: '1px solid rgba(236,72,153,.1)' }} />
    </div>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'hidden' | 'enter' | 'active'>('hidden');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('enter'),   80);
    const t2 = setTimeout(() => setPhase('active'), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== 'active') return;
    let raf: number;
    let tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth  - .5) * 2;
      ty = (e.clientY / window.innerHeight - .5) * 2;
    };
    const tick = () => {
      heroRef.current?.querySelectorAll<HTMLElement>('[data-d]').forEach(el => {
        const d = parseFloat(el.dataset.d || '1');
        el.style.transform = `translate(${tx * d * 20}px, ${ty * d * 13}px)`;
      });
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    tick();
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, [phase]);

  const isIn = phase === 'enter' || phase === 'active';

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: '0 5%', overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes letterReveal {
          from { opacity:0; transform:translateY(44px) rotateX(-50deg); filter:blur(10px); }
          to   { opacity:1; transform:translateY(0) rotateX(0deg); filter:blur(0); }
        }
        @keyframes cyberSlideUp {
          from { opacity:0; transform:translateY(55px) skewY(3deg); filter:blur(14px); }
          to   { opacity:1; transform:translateY(0) skewY(0deg); filter:blur(0); }
        }
        @keyframes scanLine {
          0%   { top:-1px; opacity:0; }
          4%   { opacity:1; }
          96%  { opacity:.7; }
          100% { top:100%; opacity:0; }
        }
        @keyframes plasmaPulse {
          0%,100% { transform:scale(1); opacity:.65; }
          50%     { transform:scale(1.32); opacity:1; }
        }
        @keyframes shardA {
          0%,100% { transform:translateY(0px) rotate(0deg) rotateX(0deg); }
          33%     { transform:translateY(-26px) rotate(122deg) rotateX(18deg); }
          66%     { transform:translateY(-12px) rotate(243deg) rotateX(-14deg); }
        }
        @keyframes shardB {
          0%,100% { transform:translateY(0px) rotate(0deg) rotateY(0deg); }
          50%     { transform:translateY(-34px) rotate(185deg) rotateY(22deg); }
        }
        @keyframes shardC {
          0%,100% { transform:translateY(0px) rotate(0deg); }
          40%     { transform:translateY(-20px) rotate(148deg); }
          80%     { transform:translateY(-30px) rotate(296deg); }
        }
        @keyframes ringFloat {
          0%,100% { transform:translateY(0px) rotate(0deg); }
          50%     { transform:translateY(-18px) rotate(6deg); }
        }
        @keyframes horizonGlow {
          0%,100% { opacity:.45; transform:scaleX(1); }
          50%     { opacity:.9; transform:scaleX(1.18); }
        }
        @keyframes badgePulse {
          0%,100% { box-shadow:0 0 0 0 rgba(168,85,247,.65); }
          50%     { box-shadow:0 0 0 9px transparent; }
        }
        @keyframes statIn {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes focusGlowPulse {
          0%,100% { filter:drop-shadow(0 0 28px rgba(168,85,247,.85)) drop-shadow(0 0 55px rgba(168,85,247,.45)); }
          50%     { filter:drop-shadow(0 0 48px rgba(200,100,255,1)) drop-shadow(0 0 90px rgba(168,85,247,.7)); }
        }
        @keyframes cubeDrift {
          0%   { transform:translateY(0px) rotate(0deg); opacity:.65; }
          50%  { transform:translateY(-28px) rotate(180deg); opacity:1; }
          100% { transform:translateY(0px) rotate(360deg); opacity:.65; }
        }
        /* Individual float animations — each card has its own rhythm */
        @keyframes fc1 {
          0%,100% { transform:translateY(0px) rotate(0deg); }
          50%     { transform:translateY(-10px) rotate(.5deg); }
        }
        @keyframes fc2 {
          0%,100% { transform:translateY(0px) rotate(0deg); }
          50%     { transform:translateY(-14px) rotate(-1deg); }
        }
        @keyframes fc3 {
          0%,100% { transform:translateY(0px) rotate(0deg); }
          33%     { transform:translateY(-8px) rotate(.3deg); }
          66%     { transform:translateY(-16px) rotate(-.3deg); }
        }
        @keyframes fc4 {
          0%,100% { transform:translateY(0px) rotate(0deg); }
          50%     { transform:translateY(-12px) rotate(.8deg); }
        }
        @keyframes mockFloat {
          0%,100% { transform:perspective(800px) rotateX(5deg) rotateY(-10deg) translateY(0px); }
          50%     { transform:perspective(800px) rotateX(7deg) rotateY(-8deg) translateY(-10px); }
        }
      `}</style>

      {/* ══ BACKGROUND ══ */}
      <PlasmaOrb size={750} x="-8%"  y="-15%" color="rgba(110,30,210,.38)"  delay="0s"    />
      <PlasmaOrb size={520} x="52%"  y="28%"  color="rgba(168,85,247,.22)"  delay="-2s"   />
      <PlasmaOrb size={360} x="8%"   y="62%"  color="rgba(236,72,153,.16)"  delay="-3.5s" />
      <PlasmaOrb size={290} x="74%"  y="4%"   color="rgba(96,165,250,.13)"  delay="-1.2s" />
      <ParticleField />
      <ScanLine />

      {/* Floating cubes */}
      {([
        { w:55, h:55, top:'8%',    left:'3%',    dur:'7s',   delay:'-1s'   },
        { w:38, h:38, top:'15%',   left:'35%',   dur:'9s',   delay:'-3s'   },
        { w:28, h:28, top:'12%',   right:'30%',  dur:'6.5s', delay:'-2s'   },
        { w:22, h:22, top:'25%',   right:'10%',  dur:'8s',   delay:'-5s'   },
        { w:46, h:46, top:'50%',   left:'2%',    dur:'10s',  delay:'-4s'   },
        { w:18, h:18, top:'65%',   left:'15%',   dur:'7.5s', delay:'-1.5s' },
        { w:62, h:62, top:'5%',    right:'5%',   dur:'11s',  delay:'-6s'   },
        { w:30, h:30, bottom:'15%',right:'26%',  dur:'8.5s', delay:'-2.5s' },
      ] as any[]).map((c, i) => (
        <div key={i} style={{
          position: 'absolute', width: c.w, height: c.h,
          top: c.top, left: c.left, right: c.right, bottom: c.bottom,
          border: '1px solid rgba(168,85,247,.22)',
          background: 'rgba(120,50,220,.05)',
          backdropFilter: 'blur(2px)',
          borderRadius: Math.max(c.w * .15, 4),
          animation: `cubeDrift ${c.dur} linear infinite`,
          animationDelay: c.delay, zIndex: 1,
        }} />
      ))}

      {/* Floating rings */}
      <div data-d="0.3" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <FloatRing size={190} top="10%"  left="7%"  delay="0s"    speed="7s" />
        <FloatRing size={130} top="70%"  left="13%" delay="-2.5s" speed="9s" />
        <FloatRing size={230} top="18%"  left="70%" delay="-4s"   speed="8s" />
        <FloatRing size={95}  top="80%"  left="80%" delay="-1.5s" speed="6s" />
      </div>

      {/* Shards BEHIND text z=2 */}
      <div data-d="0.8" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
        <Shard size={54} style={{ top:'9%',  left:'2%'  }} glowColor="rgba(168,85,247,.55)" delay="0s"    duration="8s"  animName="shardA" />
        <Shard size={36} style={{ top:'73%', left:'4%'  }} glowColor="rgba(236,72,153,.5)"  delay="-3s"   duration="10s" animName="shardB" />
        <Shard size={26} style={{ top:'33%', left:'43%' }} glowColor="rgba(96,165,250,.45)" delay="-5.5s" duration="7s"  animName="shardC" />
        <Shard size={16} style={{ top:'56%', left:'39%' }} glowColor="rgba(168,85,247,.6)"  delay="-1s"   duration="9s"  animName="shardA" />
        <Shard size={42} style={{ top:'20%', left:'55%' }} glowColor="rgba(232,121,249,.4)" delay="-7s"   duration="11s" animName="shardB" />
      </div>

      {/* ══ HERO TEXT z=5 ══ */}
      <div style={{ position: 'relative', zIndex: 5, maxWidth: 580, paddingTop: 'var(--nav-h)', animation: 'fadeUp .9s ease both' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--glass)', border: '1px solid var(--glass-b)',
          padding: '6px 16px', borderRadius: 50, fontSize: '.78rem', fontWeight: 500,
          color: 'var(--purple-l)', marginBottom: '1.75rem',
          backdropFilter: 'blur(10px)', fontFamily: 'var(--font-display)', letterSpacing: '.03em',
          opacity: isIn ? 1 : 0, transform: isIn ? 'translateY(0)' : 'translateY(-18px)',
          transition: 'opacity .8s ease, transform .8s ease',
        }}>
          <span style={{ width:6, height:6, background:'var(--purple-l)', borderRadius:'50%', animation:'badgePulse 2s ease infinite', display:'block' }} />
          v1.0 Now Available — Free Extension
        </div>

        <div style={{ marginBottom: '1.1rem', perspective: '700px', perspectiveOrigin: '50% 60%' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(3.2rem, 7.5vw, 6rem)',
            fontWeight: 800, lineHeight: 1.0, letterSpacing: '-.04em', color: '#fff', margin: 0,
            animation: isIn ? 'cyberSlideUp .95s cubic-bezier(.22,1,.36,1) .18s both' : 'none',
          }}>
            <SplitText text="Craft" baseDelay={.28} style={{ marginRight: '.22em' }} />
            <SplitText text="Your"  baseDelay={.58} />
          </h1>
          <div style={{ position: 'relative', display: 'inline-block', zIndex: 8 }}>
            <div style={{
              position: 'absolute', inset: '-25% -6%',
              background: 'radial-gradient(ellipse 85% 65% at 50% 55%, rgba(168,85,247,.38), transparent 68%)',
              filter: 'blur(22px)', zIndex: -1, animation: 'focusGlowPulse 3.5s ease-in-out infinite',
            }} />
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(3.2rem, 7.5vw, 6rem)',
              fontWeight: 800, lineHeight: 1.0, letterSpacing: '-.04em',
              margin: 0, display: 'block', position: 'relative', zIndex: 8,
              background: 'linear-gradient(135deg, var(--purple-l) 0%, #e879f9 50%, var(--purple-l) 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              animation: 'gradientShift 4s ease infinite, focusGlowPulse 3.5s ease-in-out infinite',
            }}>Focus.</h1>
            <div style={{
              position: 'absolute', bottom: -4, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(168,85,247,.9), rgba(236,72,153,.7), transparent)',
              filter: 'blur(1px)', boxShadow: '0 0 14px rgba(168,85,247,.85)',
              opacity: phase === 'active' ? 1 : 0, transition: 'opacity .6s 1.8s',
            }} />
          </div>
        </div>

        <p style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', color: 'rgba(255,255,255,.65)', marginBottom: '2.2rem', fontWeight: 400, animation: 'fadeUp .9s .24s ease both' }}>
          The ultimate productivity extension.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fadeUp .9s .36s ease both' }}>
          <MagneticButton href="/download">⬇ Download Now</MagneticButton>
          <MagneticButton href="/guide" variant="ghost">📖 View Guide</MagneticButton>
        </div>

        <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3.5rem', animation: 'fadeUp .9s .5s ease both' }}>
          {[{ num:'10K+', label:'Users' },{ num:'4.9★', label:'Rating' },{ num:'Free', label:'Forever' }].map(({ num, label }, i) => (
            <div key={label} style={{ animation: isIn ? `statIn .5s ease ${1.45 + i * .13}s both` : 'none' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1.6rem', fontWeight:800, background:'linear-gradient(135deg,var(--purple-l),#e879f9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{num}</div>
              <div style={{ fontSize:'.75rem', color:'var(--text-muted)', letterSpacing:'.08em', textTransform:'uppercase', fontFamily:'var(--font-display)', marginTop:4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SHARDS IN FRONT z=9 ══ */}
      <div data-d="1.3" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 9 }}>
        <Shard size={60} style={{ top:'5%',  left:'51%' }} glowColor="rgba(168,85,247,.62)"  delay="-2s"   duration="9s"  animName="shardA" />
        <Shard size={38} style={{ top:'43%', left:'47%' }} glowColor="rgba(236,72,153,.58)"  delay="-6.5s" duration="11s" animName="shardB" />
        <Shard size={22} style={{ top:'22%', left:'61%' }} glowColor="rgba(96,165,250,.52)"  delay="-4s"   duration="8s"  animName="shardC" />
        <Shard size={68} style={{ top:'63%', left:'54%' }} glowColor="rgba(168,85,247,.48)"  delay="-1.5s" duration="13s" animName="shardA" />
        <Shard size={30} style={{ top:'14%', left:'76%' }} glowColor="rgba(232,121,249,.55)" delay="-7s"   duration="7s"  animName="shardB" />
        <Shard size={46} style={{ top:'54%', left:'34%' }} glowColor="rgba(96,165,250,.42)"  delay="-3.5s" duration="10s" animName="shardC" />
      </div>

      {/* ══ ROBOT z=10 ══ */}
      <FloatingRobot />

      {/* ════════════════════════════════════════════════
          FLOATING CARDS — tous positionnés en right/bottom
          pour coller au robot qui est en bas-droite
      ════════════════════════════════════════════════ */}

      {/* ── Mockup browser — juste au-dessus du robot, légèrement à gauche ── */}
      <div style={{
        position: 'absolute',
        bottom: '50%',   /* juste au-dessus de la tête du robot */
        right: '1%',
        width: 300, height: 185,
        background: 'linear-gradient(150deg, rgba(22,10,52,.97), rgba(10,4,26,.99))',
        border: '1px solid rgba(168,85,247,.28)',
        borderRadius: 16,
        boxShadow: '0 24px 60px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.05), inset 0 1px 0 rgba(255,255,255,.07), 0 0 40px rgba(168,85,247,.12)',
        overflow: 'hidden',
        zIndex: 8,
        animation: 'mockFloat 7s ease-in-out infinite',
      }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 55% 45% at 30% 20%,rgba(168,85,247,.18),transparent)' }}/>
        {/* browser dots */}
        <div style={{ display:'flex', alignItems:'center', gap:5, padding:'9px 12px 8px', borderBottom:'1px solid rgba(255,255,255,.06)' }}>
          {['#ff5f57','#febc2e','#28c840'].map((c,i)=>(
            <div key={i} style={{ width:7,height:7,borderRadius:'50%',background:c,opacity:.8 }}/>
          ))}
          <div style={{ flex:1,height:5,borderRadius:3,background:'rgba(255,255,255,.06)',marginLeft:6 }}/>
        </div>
        {/* content */}
        <div style={{ padding:'10px 12px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <div style={{ width:26,height:26,borderRadius:8,background:'linear-gradient(135deg,rgba(168,85,247,.5),rgba(236,72,153,.3))',border:'1px solid rgba(168,85,247,.3)',flexShrink:0 }}/>
            <div>
              <div style={{ width:68,height:5,borderRadius:3,background:'linear-gradient(90deg,rgba(168,85,247,.55),rgba(236,72,153,.25))',marginBottom:4 }}/>
              <div style={{ width:44,height:4,borderRadius:2,background:'rgba(255,255,255,.08)' }}/>
            </div>
            <div style={{ marginLeft:'auto',display:'flex',gap:4 }}>
              <div style={{ width:48,height:17,borderRadius:9,background:'rgba(168,85,247,.3)',border:'1px solid rgba(168,85,247,.2)' }}/>
              <div style={{ width:34,height:17,borderRadius:9,background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.07)' }}/>
            </div>
          </div>
          <div style={{ display:'flex', gap:6 }}>
            {[
              { label:'FOCUS',  val:'94%', bg:'rgba(168,85,247,.22)' },
              { label:'TASKS',  val:'12',  bg:'rgba(96,165,250,.15)'  },
              { label:'STREAK', val:'7d',  bg:'rgba(236,72,153,.15)'  },
            ].map(s=>(
              <div key={s.label} style={{ flex:1,borderRadius:9,background:s.bg,border:'1px solid rgba(255,255,255,.07)',padding:'7px 8px' }}>
                <div style={{ fontSize:'.4rem',color:'rgba(255,255,255,.45)',fontFamily:'var(--font-display)',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:2 }}>{s.label}</div>
                <div style={{ fontSize:'.85rem',fontWeight:800,fontFamily:'var(--font-display)',color:'#fff' }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:'absolute',top:0,left:'15%',right:'15%',height:1,background:'linear-gradient(90deg,transparent,rgba(168,85,247,.55),transparent)',pointerEvents:'none' }}/>
      </div>

      {/* ── FOCUS SCORE — coin haut-droit, collé à la bordure ── */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '30%',
        background: 'rgba(10,3,28,.9)',
        border: '1px solid rgba(168,85,247,.3)',
        borderRadius: 14, padding: '11px 15px',
        backdropFilter: 'blur(18px)',
        boxShadow: '0 8px 32px rgba(0,0,0,.5), 0 0 22px rgba(168,85,247,.14)',
        zIndex: 11, minWidth: 126,
        animation: 'fc1 5s ease-in-out infinite',
      }}>
        <div style={{ position:'absolute',top:0,left:'15%',right:'15%',height:1,background:'linear-gradient(90deg,transparent,rgba(168,85,247,.6),transparent)' }}/>
        <div style={{ fontSize:'.5rem',fontFamily:'var(--font-display)',letterSpacing:'.12em',textTransform:'uppercase',color:'rgba(255,255,255,.38)',marginBottom:3 }}>Focus Score</div>
        <div style={{ fontFamily:'var(--font-display)',fontSize:'1.45rem',fontWeight:800,lineHeight:1,marginBottom:6,
          background:'linear-gradient(135deg,var(--purple-l),#e879f9)',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
        }}>94%</div>
        <div style={{ display:'flex',gap:2,alignItems:'flex-end',height:16 }}>
          {[65,80,55,90,70,85,94].map((h,i)=>(
            <div key={i} style={{ width:3.5,borderRadius:2,height:h*.17,background:`rgba(168,85,247,${.3+h*.007})`,boxShadow:h>80?'0 0 4px rgba(168,85,247,.6)':'none' }}/>
          ))}
        </div>
      </div>

      {/* ── ⏱ 25:00 — au-dessus et à gauche du robot ── */}
      <div style={{
        position: 'absolute',
        bottom: '30%',   /* au-dessus de la tête */
        right: '1%',    /* à gauche du robot */
        background: 'rgba(10,3,28,.9)',
        border: '1px solid rgba(168,85,247,.32)',
        borderRadius: 30, padding: '7px 15px',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 4px 20px rgba(0,0,0,.45), 0 0 14px rgba(168,85,247,.18)',
        zIndex: 11,
        display: 'flex', alignItems: 'center', gap: 7,
        animation: 'fc2 6s ease-in-out infinite',
      }}>
        <span style={{ fontSize:'.8rem' }}>⏱</span>
        <span style={{ fontFamily:'var(--font-display)',fontSize:'.78rem',fontWeight:700,color:'#fff',letterSpacing:'.04em' }}>25:00</span>
      </div>

      {/* ── ⊘ Blocked — à gauche du robot, niveau milieu ── */}
      <div style={{
        position: 'absolute',
        bottom: '40%',   /* niveau milieu du robot */
        right: '30%',    /* bien à gauche du robot */
        background: 'rgba(10,3,28,.9)',
        border: '1px solid rgba(236,72,153,.3)',
        borderRadius: 30, padding: '7px 15px',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 4px 20px rgba(0,0,0,.45), 0 0 12px rgba(236,72,153,.14)',
        zIndex: 11,
        display: 'flex', alignItems: 'center', gap: 7,
        animation: 'fc3 7s ease-in-out infinite',
      }}>
        <span style={{ fontSize:'.72rem',color:'rgba(236,72,153,.9)' }}>⊘</span>
        <span style={{ fontFamily:'var(--font-display)',fontSize:'.72rem',fontWeight:700,color:'rgba(255,255,255,.8)',letterSpacing:'.04em' }}>Blocked</span>
      </div>

      {/* ── ✓ Completed 12 Tasks — bas-gauche du robot ── */}
      <div style={{
        position: 'absolute',
        bottom: '22%',   /* bas du robot */
        right: '30%',    /* à gauche du robot */
        background: 'rgba(10,3,28,.92)',
        border: '1px solid rgba(34,197,94,.25)',
        borderRadius: 14, padding: '9px 13px',
        backdropFilter: 'blur(18px)',
        boxShadow: '0 8px 32px rgba(0,0,0,.5), 0 0 18px rgba(34,197,94,.1)',
        zIndex: 11,
        display: 'flex', alignItems: 'center', gap: 9,
        animation: 'fc4 5.5s ease-in-out infinite',
      }}>
        <div style={{
          width:26,height:26,borderRadius:8,
          background:'rgba(34,197,94,.2)',border:'1px solid rgba(34,197,94,.38)',
          display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:'.7rem',color:'#4ade80',flexShrink:0,
        }}>✓</div>
        <div>
          <div style={{ fontSize:'.48rem',fontFamily:'var(--font-display)',letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(255,255,255,.35)',marginBottom:2 }}>Completed</div>
          <div style={{ fontFamily:'var(--font-display)',fontSize:'.82rem',fontWeight:800,color:'#fff' }}>12 Tasks</div>
        </div>
      </div>

      {/* Floor disc glow */}
      <div style={{
        position: 'absolute', width: 700, height: 120,
        right: '4%', bottom: '28%',
        background: 'radial-gradient(ellipse, rgba(180,80,255,.45) 0%, rgba(120,40,200,.2) 40%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(20px)',
        zIndex: 1, pointerEvents: 'none', transform: 'translateX(10%)',
      }} />

      {/* Horizon glow line */}
      <div style={{
        position: 'absolute', bottom: '21%', left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg,transparent 4%,rgba(168,85,247,.28) 28%,rgba(236,72,153,.18) 62%,transparent 92%)',
        animation: 'horizonGlow 5s ease-in-out infinite',
        pointerEvents: 'none', zIndex: 1,
      }} />
    </section>
  );
}