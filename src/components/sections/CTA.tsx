'use client';

import { useEffect, useRef, useState } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function CTA() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const orbRef      = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const [visible, setVisible]   = useState(false);

  /* Scroll reveal */
  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold:.18 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Mouse-tracking orb inside section */
  useEffect(() => {
    const section = sectionRef.current; if (!section) return;
    const onMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const r = section.getBoundingClientRect();
      orbRef.current.style.transform = `translate(${e.clientX - r.left - 280}px, ${e.clientY - r.top - 280}px)`;
    };
    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  /* 3D tilt on the card */
  useEffect(() => {
    const card = cardRef.current; if (!card) return;
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top ) / r.height - .5;
      card.style.transform = `perspective(1100px) rotateY(${x * 8}deg) rotateX(${-y * 5}deg) scale(1.015)`;
    };
    const onLeave = () => { card.style.transform = 'perspective(1100px) rotateY(0) rotateX(0) scale(1)'; };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ position:'relative', zIndex:5, padding:'5rem 5% 5.5rem', overflow:'hidden', borderTop:'1px solid rgba(168,85,247,.09)' }}
    >
      {/* Mouse orb */}
      <div ref={orbRef} style={{
        position:'absolute', width:560, height:560, borderRadius:'50%', pointerEvents:'none',
        background:'radial-gradient(circle, rgba(168,85,247,.1) 0%, transparent 65%)',
        transition:'transform .9s cubic-bezier(.25,.46,.45,.94)',
        zIndex:0,
      }}/>

      {/* Tiltable glass card */}
      <div
        ref={cardRef}
        style={{
          position:'relative', maxWidth:900, margin:'0 auto', zIndex:2,
          background:'rgba(16,6,40,.72)',
          border:'1px solid rgba(168,85,247,.17)',
          borderRadius:28, padding:'4.5rem 3.5rem',
          backdropFilter:'blur(32px) saturate(1.7)',
          WebkitBackdropFilter:'blur(32px) saturate(1.7)',
          overflow:'hidden',
          boxShadow:'0 40px 90px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.04), inset 0 1px 0 rgba(255,255,255,.06)',
          transition:'transform .5s cubic-bezier(.25,.46,.45,.94)',
          opacity: visible ? 1 : 0,
          transform: visible
            ? 'perspective(1100px) rotateY(0) rotateX(0) scale(1)'
            : 'perspective(1100px) rotateY(0) rotateX(0) scale(.95) translateY(45px)',
          transitionProperty: 'opacity, transform',
          transitionDuration: '.85s',
          textAlign:'center',
        }}
      >
        {/* Ambient gradient fill */}
        <div style={{ position:'absolute',inset:0,pointerEvents:'none', background:`
          radial-gradient(ellipse 65% 55% at 50% -5%, rgba(168,85,247,.2), transparent),
          radial-gradient(ellipse 45% 40% at 15% 110%, rgba(96,165,250,.07), transparent),
          radial-gradient(ellipse 38% 45% at 85% 108%, rgba(236,72,153,.07), transparent)
        `}}/>

        {/* Dot grid */}
        <div style={{ position:'absolute',inset:0,pointerEvents:'none',
          backgroundImage:'radial-gradient(circle,rgba(168,85,247,.14) 1px,transparent 1px)',
          backgroundSize:'30px 30px',
          mask:'radial-gradient(ellipse 65% 75% at 50% 50%,black 15%,transparent 68%)',
          WebkitMask:'radial-gradient(ellipse 65% 75% at 50% 50%,black 15%,transparent 68%)',
        }}/>

        {/* Neon scan line that moves */}
        <div style={{ position:'absolute',left:0,right:0,height:1,
          background:'linear-gradient(90deg,transparent 8%,rgba(168,85,247,.5) 42%,rgba(236,72,153,.35) 58%,transparent 88%)',
          animation:'ctaScan 4s linear infinite',
          pointerEvents:'none',
        }}/>

        {/* Top shimmer border */}
        <div style={{ position:'absolute',top:0,left:'12%',right:'12%',height:1,
          background:'linear-gradient(90deg,transparent,rgba(168,85,247,.65),rgba(236,72,153,.45),transparent)',
          pointerEvents:'none',
        }}/>

        {/* Corner brackets */}
        {[
          { top:12, left:12,   borderTop:'1.5px solid rgba(168,85,247,.6)', borderLeft:'1.5px solid rgba(168,85,247,.6)'  },
          { top:12, right:12,  borderTop:'1.5px solid rgba(236,72,153,.6)', borderRight:'1.5px solid rgba(236,72,153,.6)' },
          { bottom:12, left:12,  borderBottom:'1.5px solid rgba(168,85,247,.5)', borderLeft:'1.5px solid rgba(168,85,247,.5)'  },
          { bottom:12, right:12, borderBottom:'1.5px solid rgba(236,72,153,.5)', borderRight:'1.5px solid rgba(236,72,153,.5)' },
        ].map((s, i) => (
          <div key={i} style={{ position:'absolute', width:22, height:22, pointerEvents:'none', ...s }}/>
        ))}

        {/* Content */}
        <div style={{ position:'relative', zIndex:1 }}>
          {/* Eyebrow */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'rgba(168,85,247,.09)', border:'1px solid rgba(168,85,247,.25)',
            padding:'7px 18px', borderRadius:50,
            fontFamily:'var(--font-display)', fontSize:'.7rem', fontWeight:700,
            letterSpacing:'.14em', textTransform:'uppercase', color:'var(--purple-l)',
            marginBottom:'1.5rem',
          }}>
            <span style={{ width:5,height:5,borderRadius:'50%',background:'#e879f9',animation:'badgePulse 2s ease infinite',display:'block',boxShadow:'0 0 7px #e879f9' }}/>
            Get Started Today
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily:'var(--font-display)',
            fontSize:'clamp(2.3rem,5.2vw,4rem)',
            fontWeight:800, lineHeight:.97,
            letterSpacing:'-.042em', color:'#fff',
            marginBottom:'1rem',
          }}>
            Start building your<br/>
            <span style={{
              background:'linear-gradient(108deg,var(--purple-l),#e879f9,var(--blue))',
              backgroundSize:'200% 100%',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              animation:'gradientShift 5s ease infinite',
              filter:'drop-shadow(0 0 20px rgba(168,85,247,.6))',
            }}>focus</span> today.
          </h2>

          {/* Sub */}
          <p style={{
            fontSize:'1rem', color:'var(--text-muted)', fontWeight:300,
            maxWidth:420, margin:'0 auto 2.5rem', lineHeight:1.78,
          }}>
            Join 10,000+ users who have transformed their productivity with FocusCraft. Free forever.
          </p>

          {/* CTAs */}
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', marginBottom:'2.5rem' }}>
            <MagneticButton href="/download">⬇ Download Free Extension</MagneticButton>
            <MagneticButton href="/guide" variant="ghost">📖 Learn More</MagneticButton>
          </div>

          {/* Social proof */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'2rem', flexWrap:'wrap' }}>
            {[
              { icon:'★', val:'4.9/5',  label:'Rating'    },
              { icon:'↓', val:'10K+',   label:'Downloads'  },
              { icon:'♾', val:'Free',   label:'Forever'    },
            ].map(({ icon, val, label }) => (
              <div key={label} style={{ display:'flex', alignItems:'center', gap:9 }}>
                <div style={{
                  width:30, height:30, borderRadius:10,
                  background:'rgba(168,85,247,.12)', border:'1px solid rgba(168,85,247,.22)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'.75rem', color:'var(--purple-l)',
                }}>{icon}</div>
                <div>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'.88rem', color:'#fff', lineHeight:1 }}>{val}</div>
                  <div style={{ fontSize:'.6rem', color:'var(--text-muted)', letterSpacing:'.09em', textTransform:'uppercase', fontFamily:'var(--font-display)' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ctaScan {
          0%   { top:-1px; opacity:0; }
          4%   { opacity:1; }
          96%  { opacity:.8; }
          100% { top:100%; opacity:0; }
        }
      `}</style>
    </section>
  );
}