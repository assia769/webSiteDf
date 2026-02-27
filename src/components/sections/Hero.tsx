'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FloatingRobot } from '@/components/ui/FloatingRobot';
import { ParticleField } from '@/components/ui/ParticleField';
import { MagneticButton } from '@/components/ui/MagneticButton';

/* ── 3D Device Mockup with parallax ── */
function DeviceMockup() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth  - 0.5) * 20;
      ty = (e.clientY / window.innerHeight - 0.5) * -12;
    };

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;

      if (sceneRef.current) {
        sceneRef.current.style.transform =
          `rotateY(${cx}deg) rotateX(${cy}deg)`;
      }
      // Parallax floating cards at different depth rates
      if (card1Ref.current) {
        card1Ref.current.style.transform =
          `translateX(${cx * 1.8}px) translateY(${cy * 1.4}px) translateZ(30px)`;
      }
      if (card2Ref.current) {
        card2Ref.current.style.transform =
          `translateX(${cx * -1.2}px) translateY(${cy * -1}px) translateZ(20px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    tick();
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={{
      position: 'absolute',
      right: '-2%', top: '50%',
      transform: 'translateY(-50%)',
      width: '52vw', maxWidth: 680, height: '70vh',
      perspective: 1100,
      zIndex: 3,
    }}>
      {/* Outer perspective wrapper */}
      <div style={{
        width: '100%', height: '100%', position: 'relative',
        transformStyle: 'preserve-3d',
        animation: 'deviceFloat 7s ease-in-out infinite',
      }}>
        {/* 3D scene that tracks mouse */}
        <div
          ref={sceneRef}
          style={{
            width: '100%', height: '100%', position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform .08s linear',
          }}
        >
          {/* ── Main browser mockup ── */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 360, height: 230,
            transform: 'translate(-50%,-50%) rotateY(-18deg) rotateX(6deg)',
            transformStyle: 'preserve-3d',
            background: 'linear-gradient(150deg, rgba(26,12,58,.97), rgba(12,5,28,.99))',
            border: '1px solid rgba(168,85,247,.3)',
            borderRadius: 20,
            boxShadow: `
              0 50px 100px rgba(0,0,0,.7),
              0 0 0 1px rgba(255,255,255,.05),
              inset 0 1px 0 rgba(255,255,255,.08),
              0 0 80px rgba(168,85,247,.18)
            `,
            overflow: 'hidden',
          }}>
            {/* Ambient glow inside */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `
                radial-gradient(ellipse 60% 45% at 30% 20%, rgba(168,85,247,.2), transparent),
                radial-gradient(ellipse 40% 35% at 80% 80%, rgba(96,165,250,.1), transparent)
              `,
            }} />

            {/* Browser bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 14px 9px',
              borderBottom: '1px solid rgba(255,255,255,.06)',
            }}>
              {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: .8 }} />
              ))}
              <div style={{
                flex: 1, height: 7, borderRadius: 4,
                background: 'rgba(255,255,255,.06)', marginLeft: 8,
              }} />
            </div>

            {/* Content */}
            <div style={{ padding: '14px 16px' }}>
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: 'linear-gradient(135deg, rgba(168,85,247,.5), rgba(236,72,153,.3))',
                  border: '1px solid rgba(168,85,247,.3)',
                  flexShrink: 0,
                }} />
                <div>
                  <div style={{ width: 80, height: 7, borderRadius: 4, background: 'linear-gradient(90deg, rgba(168,85,247,.6), rgba(236,72,153,.3))', marginBottom: 5 }} />
                  <div style={{ width: 55, height: 5, borderRadius: 3, background: 'rgba(255,255,255,.1)' }} />
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
                  {[60,40].map((w,i) => (
                    <div key={i} style={{ width: w, height: 22, borderRadius: 11, background: i===0 ? 'rgba(168,85,247,.35)' : 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.08)' }} />
                  ))}
                </div>
              </div>

              {/* Stat cards row */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {[
                  { c: 'rgba(168,85,247,.28)', label: 'Focus', val: '94%' },
                  { c: 'rgba(96,165,250,.2)',  label: 'Tasks',  val: '12' },
                  { c: 'rgba(236,72,153,.2)',  label: 'Streak', val: '7d' },
                ].map((s, i) => (
                  <div key={i} style={{
                    flex: 1, borderRadius: 10,
                    background: s.c,
                    border: '1px solid rgba(255,255,255,.08)',
                    padding: '8px 10px',
                  }}>
                    <div style={{ fontSize: '.48rem', color: 'rgba(255,255,255,.5)', fontFamily: 'var(--font-display)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 3 }}>{s.label}</div>
                    <div style={{ fontSize: '.9rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#fff' }}>{s.val}</div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,.07)', overflow: 'hidden' }}>
                <div style={{ width: '68%', height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, var(--purple-d), var(--purple), var(--pink))', boxShadow: '0 0 8px rgba(168,85,247,.6)' }} />
              </div>
            </div>

            {/* Reflection */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
              background: 'linear-gradient(to top, rgba(168,85,247,.05), transparent)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* ── Floating card 1 — Focus Score ── */}
          <div
            ref={card1Ref}
            style={{
              position: 'absolute', top: '14%', right: '4%',
              transition: 'transform .08s linear',
              background: 'rgba(13,5,32,.88)',
              border: '1px solid rgba(168,85,247,.22)',
              borderRadius: 16, padding: '14px 18px',
              backdropFilter: 'blur(20px)',
              minWidth: 130,
              boxShadow: '0 12px 40px rgba(0,0,0,.5), 0 0 24px rgba(168,85,247,.12)',
            }}
          >
            <div style={{ fontSize: '.6rem', fontFamily: 'var(--font-display)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)', marginBottom: 5 }}>Focus Score</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg, var(--purple-l), #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>94%</div>
            <div style={{ display: 'flex', gap: 3, marginTop: 8 }}>
              {[65, 80, 55, 90, 70, 85, 94].map((h, i) => (
                <div key={i} style={{ width: 3, height: h * .24, borderRadius: 2, background: `rgba(168,85,247,${0.3 + h * .006})` }} />
              ))}
            </div>
          </div>

          {/* ── Floating card 2 — Task complete ── */}
          <div
            ref={card2Ref}
            style={{
              position: 'absolute', bottom: '16%', left: '6%',
              transition: 'transform .08s linear',
              background: 'rgba(13,5,32,.88)',
              border: '1px solid rgba(255,255,255,.1)',
              borderRadius: 16, padding: '12px 16px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 12px 40px rgba(0,0,0,.5)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}
          >
            <div style={{ width: 34, height: 34, borderRadius: 12, background: 'linear-gradient(135deg, rgba(34,197,94,.3), rgba(16,185,129,.2))', border: '1px solid rgba(34,197,94,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.95rem' }}>✓</div>
            <div>
              <div style={{ fontSize: '.62rem', fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,.4)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Completed</div>
              <div style={{ fontSize: '.85rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: '#fff' }}>12 Tasks</div>
            </div>
          </div>

          {/* ── Orbiting pill rings ── */}
          {[
            { text: '⏱ 25:00', dur: '16s', delay: '0s', r: 200 },
            { text: '⊘ Blocked', dur: '22s', delay: '-7s', r: 230 },
            { text: '🎵 Forest', dur: '13s', delay: '-4s', r: 185 },
          ].map((p, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: p.r * 2, height: p.r * 2,
                marginLeft: -p.r, marginTop: -p.r,
                borderRadius: '50%',
                border: '1px dashed rgba(168,85,247,.1)',
                animation: `orbitRing ${p.dur} linear infinite`,
                animationDelay: p.delay,
              }}
            >
              <div style={{
                position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(13,5,32,.85)',
                border: '1px solid rgba(168,85,247,.22)',
                borderRadius: 30, padding: '5px 12px',
                backdropFilter: 'blur(12px)',
                fontSize: '.68rem', fontFamily: 'var(--font-display)', fontWeight: 600,
                color: 'rgba(255,255,255,.75)',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 16px rgba(0,0,0,.4)',
              }}>{p.text}</div>
            </div>
          ))}

          {/* ── Depth rings ── */}
          {[360, 460, 560].map((s, i) => (
            <div key={i} style={{
              position: 'absolute', top: '50%', left: '50%',
              width: s, height: s,
              marginLeft: -s/2, marginTop: -s/2,
              borderRadius: '50%',
              border: '1px solid rgba(168,85,247,.06)',
              transform: 'rotateX(72deg) rotateY(-18deg)',
              pointerEvents: 'none',
              animation: `ringPulse ${6 + i * 2}s ease-in-out infinite`,
              animationDelay: `${-i * 2}s`,
            }} />
          ))}
        </div>
      </div>

      {/* Floor glow disc */}
      <div style={{
        position: 'absolute', bottom: '18%', left: '50%',
        width: 480, height: 60,
        transform: 'translateX(-10%)',
        background: 'radial-gradient(ellipse, rgba(168,85,247,.45), rgba(120,40,200,.15) 40%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(18px)',
        animation: 'floorPulse 4s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
export function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '0 5%',
      overflow: 'hidden',
    }}>
      <ParticleField />

      {/* ── Floating 3D cubes background ── */}
      {[
        { w:55, h:55, top:'8%',  left:'3%',  dur:'7s',   delay:'-1s'  },
        { w:38, h:38, top:'15%', left:'35%', dur:'9s',   delay:'-3s'  },
        { w:28, h:28, top:'12%', right:'30%',dur:'6.5s', delay:'-2s'  },
        { w:22, h:22, top:'25%', right:'10%',dur:'8s',   delay:'-5s'  },
        { w:46, h:46, top:'50%', left:'2%',  dur:'10s',  delay:'-4s'  },
        { w:18, h:18, top:'65%', left:'15%', dur:'7.5s', delay:'-1.5s'},
        { w:62, h:62, top:'5%',  right:'5%', dur:'11s',  delay:'-6s'  },
        { w:30, h:30, bottom:'15%', right:'26%', dur:'8.5s', delay:'-2.5s'},
      ].map((c, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: c.w, height: c.h,
          top: (c as any).top, left: (c as any).left,
          right: (c as any).right, bottom: (c as any).bottom,
          border: '1px solid rgba(168,85,247,.2)',
          background: 'rgba(120,50,220,.04)',
          backdropFilter: 'blur(2px)',
          borderRadius: Math.max(c.w * .15, 4),
          animation: `cubeDrift ${c.dur} linear infinite`,
          animationDelay: c.delay,
          zIndex: 1,
        }} />
      ))}

      {/* ── Hero text ── */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        maxWidth: 580,
        paddingTop: 'var(--nav-h)',
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(168,85,247,.1)',
          border: '1px solid rgba(168,85,247,.25)',
          padding: '7px 18px', borderRadius: 50,
          fontSize: '.75rem', fontWeight: 600,
          color: 'var(--purple-l)',
          marginBottom: '1.75rem',
          backdropFilter: 'blur(12px)',
          fontFamily: 'var(--font-display)',
          letterSpacing: '.05em',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity .7s ease, transform .7s ease',
        }}>
          <span style={{
            width: 6, height: 6, background: 'var(--purple-l)',
            borderRadius: '50%',
            animation: 'badgePulse 2s ease infinite',
            display: 'block',
          }} />
          v1.0 Now Available — Free Extension
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.4rem, 7.5vw, 6.2rem)',
          fontWeight: 800,
          lineHeight: .96,
          letterSpacing: '-.045em',
          marginBottom: '1rem',
          color: '#fff',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity .75s .1s ease, transform .75s .1s ease',
        }}>
          Craft Your
          <br />
          <span style={{
            background: 'linear-gradient(110deg, var(--purple-l) 0%, #e879f9 40%, var(--blue) 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradientShift 5s ease infinite',
            display: 'inline-block',
          }}>
            Focus.
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(.95rem, 2vw, 1.18rem)',
          color: 'var(--text-muted)',
          marginBottom: '2.5rem',
          fontWeight: 300,
          lineHeight: 1.75,
          maxWidth: 440,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity .75s .22s ease, transform .75s .22s ease',
        }}>
          The all-in-one productivity extension. Timer, tasks, site blocking, and ambient sound — engineered for deep work.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: '1rem', flexWrap: 'wrap',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity .75s .34s ease, transform .75s .34s ease',
        }}>
          <MagneticButton href="/download">⬇ Download Free</MagneticButton>
          <MagneticButton href="/guide" variant="ghost">📖 View Guide</MagneticButton>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '2.5rem', marginTop: '3.5rem',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity .75s .48s ease, transform .75s .48s ease',
        }}>
          {[
            { num: '10K+', label: 'Users' },
            { num: '4.9★', label: 'Rating' },
            { num: 'Free', label: 'Forever' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.65rem', fontWeight: 800,
                background: 'linear-gradient(135deg, var(--purple-l), #e879f9)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                lineHeight: 1,
              }}>{num}</div>
              <div style={{
                fontSize: '.7rem', color: 'var(--text-muted)',
                letterSpacing: '.1em', textTransform: 'uppercase',
                fontFamily: 'var(--font-display)', marginTop: 4,
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Device + Robot */}
      <DeviceMockup />
      <FloatingRobot />

      {/* Extra animation keyframes */}
      <style>{`
        @keyframes deviceFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-18px); }
        }
        @keyframes orbitRing {
          from { transform: rotateZ(0deg);   }
          to   { transform: rotateZ(360deg); }
        }
        @keyframes ringPulse {
          0%,100% { opacity: .35; }
          50%      { opacity: .08; }
        }
      `}</style>
    </section>
  );
}