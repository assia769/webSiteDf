'use client';

import { GlowCard } from '@/components/ui/GlowCard';

const TEAM = [
  {
    initials: 'A',
    name: 'Assia Houbbadi',
    role: 'UI/UX Designer & Frontend',
    bio: 'Crafted every visual detail of DFCraft — from mascotte illustrations to the smooth animation system. Passionate about design that feels alive.',
    gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    email: 'houbbadiassia@gmail.com',
  },
  {
    initials: 'Ay',
    name: 'Ayman Igri',
    role: 'Full Stack Developer',
    bio: 'Built the extension\'s core — timer engine, storage system, and distraction blocking logic. Loves clean, performant code that just works.',
    gradient: 'linear-gradient(135deg, #4f46e5, #9333ea)',
  },
  {
    initials: 'Os',
    name: 'Ossama Lakhdar',
    role: 'Backend & Research',
    bio: 'Researched productivity science and deep work principles. Built the sound engine and settings infrastructure powering DFCraft.',
    gradient: 'linear-gradient(135deg, #0d9488, #7c3aed)',
  },
];

export default function TeamPage() {
  return (
    <div className="page-wrapper">
      <span className="label-tag">The Builders</span>
      <h1 className="page-heading">
        Meet the{' '}
        <span className="gradient-text">Team</span>
      </h1>
      <p className="page-sub">
        Three passionate developers who built DFCraft to help everyone achieve deep focus and meaningful work.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem',
          maxWidth: 1000,
        }}
      >
        {TEAM.map((member, i) => (
          <GlowCard
            key={member.name}
            style={{
              padding: '2.25rem 2rem',
              textAlign: 'center',
              animationDelay: `${i * .15}s`,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 86, height: 86,
                borderRadius: '50%',
                background: member.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.4rem',
                fontFamily: 'var(--font-display)',
                fontSize: '1.7rem', fontWeight: 700, color: '#fff',
                border: '2.5px solid rgba(168,85,247,.35)',
                boxShadow: '0 0 28px rgba(168,85,247,.32)',
              }}
            >
              {member.initials}
            </div>

            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem', fontWeight: 700,
                marginBottom: '.35rem', color: '#fff',
              }}
            >
              {member.name}
            </div>

            <div
              style={{
                fontSize: '.75rem', color: 'var(--purple-l)',
                letterSpacing: '.07em', marginBottom: '.9rem',
                fontWeight: 600, fontFamily: 'var(--font-display)',
              }}
            >
              {member.role}
            </div>

            <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              {member.bio}
            </p>

            {member.email && (
              <a
                href={`mailto:${member.email}`}
                style={{
                  display: 'inline-block', marginTop: '1rem',
                  fontSize: '.78rem', color: 'var(--purple-l)',
                  textDecoration: 'none', opacity: .7,
                }}
              >
                {member.email}
              </a>
            )}
          </GlowCard>
        ))}
      </div>
    </div>
  );
}