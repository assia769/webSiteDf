'use client';

import { useEffect, useRef, useState } from 'react';

const TEAM = [
  {
    id: 'assia',
    name: 'Assia Houbbadi',
    role: 'Full Stack Developer',
    tags: ['UI/UX Design', 'Frontend', 'Software Engineering'],
    bio: 'Software engineering student with a passion for crafting pixel-perfect interfaces. Brings ideas to life through thoughtful design systems and seamless user experiences.',
    image: '/assets/team/assia.jpg',
    linkedin: 'https://www.linkedin.com/in/assia-houbbadi-6726b0272',
    color: '#a855f7',
    colorDark: '#7c3aed',
    angle: -15,
  },
  {
    id: 'igri',
    name: 'Ayman Igri',
    role: 'Full Stack Developer',
    tags: ['Backend', 'Frontend', 'Software Engineering'],
    bio: 'Software engineering student who loves architecting robust systems. Writes clean, performant code and thrives at the intersection of elegant logic and great UX.',
    image: '/assets/team/igri.png',
    linkedin: 'https://www.linkedin.com/in/aymen-igri-8b6167304',
    color: '#6366f1',
    colorDark: '#4f46e5',
    angle: 0,
  },
  {
    id: 'ossama',
    name: 'Ossama Lakhdar',
    role: 'Full Stack Developer',
    tags: ['Backend', 'UI/UX Design', 'Software Engineering'],
    bio: 'Software engineering student with a sharp eye for both systems and design. Bridges the gap between powerful backend logic and beautiful, intuitive interfaces.',
    image: null,
    linkedin: 'https://www.linkedin.com/in/ossama-lekhdar',
    color: '#14b8a6',
    colorDark: '#0d9488',
    angle: 15,
  },
];

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.6 + 0.1,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,85,247,${p.alpha})`;
        ctx.fill();
      }
      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168,85,247,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

function TeamCard({ member, index }: { member: typeof TEAM[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <div
      style={{
        perspective: '1200px',
        animationDelay: `${index * 0.2}s`,
        animation: 'cardEntry 0.8s cubic-bezier(0.16,1,0.3,1) both',
        animationDelay: `${index * 0.18}s`,
      }}
    >
      <div
        ref={cardRef}
        onClick={() => setFlipped(f => !f)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
        onMouseMove={handleMouseMove}
        style={{
          width: 300,
          height: 420,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: flipped ? 'transform 0.7s cubic-bezier(0.4,0,0.2,1)' : 'transform 0.3s ease',
          transform: flipped
            ? `rotateY(180deg) rotateX(${mousePos.y * 0.3}deg)`
            : `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg) ${hovered ? 'translateZ(20px)' : ''}`,
          cursor: 'pointer',
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: 24,
            background: 'linear-gradient(145deg, rgba(15,10,30,0.95) 0%, rgba(25,15,50,0.9) 100%)',
            border: `1px solid ${member.color}40`,
            boxShadow: hovered
              ? `0 30px 80px ${member.color}40, 0 0 0 1px ${member.color}60, inset 0 1px 0 rgba(255,255,255,0.1)`
              : `0 10px 40px rgba(0,0,0,0.5), 0 0 0 1px ${member.color}20`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2.5rem 2rem 2rem',
          }}
        >
          {/* Glow orb */}
          <div style={{
            position: 'absolute',
            top: -60,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${member.color}30 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          {/* Holographic shimmer */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, transparent 30%, ${member.color}08 50%, transparent 70%)`,
            backgroundSize: '200% 200%',
            animation: 'shimmer 3s linear infinite',
            pointerEvents: 'none',
          }} />

          {/* Avatar */}
          <div style={{
            width: 110,
            height: 110,
            borderRadius: '50%',
            position: 'relative',
            marginBottom: '1.5rem',
            flexShrink: 0,
          }}>
            <div style={{
              position: 'absolute',
              inset: -3,
              borderRadius: '50%',
              background: `conic-gradient(${member.color}, ${member.colorDark}, ${member.color})`,
              animation: 'spin 4s linear infinite',
            }} />
            <div style={{
              position: 'absolute',
              inset: 2,
              borderRadius: '50%',
              background: '#0a0518',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, ${member.colorDark}, ${member.color})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: '#fff',
                  fontFamily: '"Syne", sans-serif',
                }}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
          </div>

          <div style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '1.3rem',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '0.3rem',
            letterSpacing: '-0.02em',
          }}>
            {member.name}
          </div>

          <div style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: member.color,
            marginBottom: '1.2rem',
            fontFamily: '"DM Mono", monospace',
          }}>
            {member.role}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: '1.5rem' }}>
            {member.tags.map(tag => (
              <span key={tag} style={{
                fontSize: '0.65rem',
                padding: '3px 10px',
                borderRadius: 100,
                background: `${member.color}15`,
                border: `1px solid ${member.color}35`,
                color: member.color,
                fontFamily: '"DM Mono", monospace',
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Flip hint */}
          <div style={{
            marginTop: 'auto',
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.3)',
            fontFamily: '"DM Mono", monospace',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span style={{ animation: 'pulse 2s ease-in-out infinite' }}>⟳</span>
            click to flip
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 24,
            background: `linear-gradient(145deg, ${member.colorDark}20 0%, rgba(10,5,25,0.97) 40%)`,
            border: `1px solid ${member.color}50`,
            boxShadow: `0 30px 80px ${member.color}30, inset 0 1px 0 rgba(255,255,255,0.08)`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            padding: '2.5rem 2rem',
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: -80,
            right: -80,
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${member.color}20 0%, transparent 70%)`,
          }} />

          <div style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: member.color,
            marginBottom: '0.8rem',
            textTransform: 'uppercase',
          }}>
            About
          </div>

          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.9rem',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.75)',
            marginBottom: '2rem',
            flex: 1,
          }}>
            {member.bio}
          </p>

          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 20px',
              borderRadius: 14,
              background: `linear-gradient(135deg, ${member.colorDark}, ${member.color})`,
              color: '#fff',
              textDecoration: 'none',
              fontFamily: '"Syne", sans-serif',
              fontWeight: 700,
              fontSize: '0.85rem',
              boxShadow: `0 8px 30px ${member.color}40`,
              transition: 'transform 0.2s, box-shadow 0.2s',
              position: 'relative',
              zIndex: 1,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = `0 14px 40px ${member.color}60`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${member.color}40`;
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Connect on LinkedIn
          </a>

          <div style={{
            marginTop: '1rem',
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.2)',
            fontFamily: '"DM Mono", monospace',
            textAlign: 'center',
          }}>
            click to flip back
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cardEntry {
          from { opacity: 0; transform: translateY(60px) rotateX(20deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;600&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes titleEntry {
          from { opacity: 0; transform: translateY(-30px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.07; }
        }
      `}</style>

      <ParticleField />

      {/* Ambient orbs */}
      <div style={{
        position: 'fixed', top: '10%', left: '10%', width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
        animation: 'floatOrb 8s ease-in-out infinite',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '10%', right: '8%', width: 350, height: 350,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
        animation: 'floatOrb 10s ease-in-out infinite reverse',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(168,85,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.05) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        animation: 'gridPulse 5s ease-in-out infinite',
      }} />

      <div className="page-wrapper" style={{ position: 'relative', zIndex: 1 }}>

        <div style={{
          animation: 'titleEntry 0.7s cubic-bezier(0.16,1,0.3,1) both',
          textAlign: 'center',
          marginBottom: '3.5rem',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 100,
            background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.3)',
            marginBottom: '1.2rem',
            fontFamily: '"DM Mono", monospace',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: '#a855f7',
            textTransform: 'uppercase',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a855f7', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
            The Builders
          </div>

          <h1 style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: '#fff',
            marginBottom: '1rem',
          }}>
            Meet the{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #14b8a6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Team
            </span>
          </h1>

          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.45)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Three software engineering students & full stack developers who built DFCraft to help everyone achieve deep focus.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {TEAM.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>

        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.1em',
        }}>
          hover to tilt · click to flip
        </div>
      </div>
    </>
  );
}