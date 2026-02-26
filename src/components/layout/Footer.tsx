import Link from 'next/link';
import Image from 'next/image';

const COLS = [
  {
    title: 'Product',
    links: [
      { href: '/download', label: 'Download' },
      { href: '/guide',    label: 'Guide' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { href: '/pomodoro', label: 'Pomodoro' },
      { href: '/todo',     label: 'ToDo List' },
      { href: '/blocker',  label: 'Blocker' },
      { href: '/sound',    label: 'Sounds' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/team',    label: 'Team' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        position: 'relative', zIndex: 5,
        padding: '3.5rem 5% 1.75rem',
        borderTop: '1px solid rgba(255,255,255,.06)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}
      >
        {/* Brand */}
        <div>
          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: '.85rem' }}
          >
            <Image src="/assets/robot/logo.png" alt="DFCraft" width={32} height={32} style={{ objectFit: 'contain' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, background: 'linear-gradient(135deg,#d8b4fe,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              DfCraft
            </span>
          </Link>
          <p style={{ color: 'rgba(255,255,255,.38)', fontSize: '.82rem', lineHeight: 1.7, maxWidth: 260, marginBottom: '1.2rem' }}>
            The ultimate productivity browser extension. Free forever. Master your focus, craft your time.
          </p>
          <div style={{ display: 'flex', gap: '.65rem' }}>
            {['𝕏', 'GH', 'DC'].map(s => (
              <a
                key={s}
                href="#"
                style={{
                  width: 34, height: 34,
                  background: 'var(--glass)', border: '1px solid var(--glass-b)',
                  borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,.4)', fontSize: '.72rem', fontWeight: 700,
                  textDecoration: 'none', transition: 'all .2s',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {COLS.map(col => (
          <div key={col.title}>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '.68rem', fontWeight: 700,
                letterSpacing: '.1em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,.35)', marginBottom: '.9rem',
              }}
            >
              {col.title}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {col.links.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{ color: 'rgba(255,255,255,.42)', fontSize: '.82rem', textDecoration: 'none', transition: 'color .2s', fontFamily: 'var(--font-body)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,.05)',
          color: 'rgba(255,255,255,.28)', fontSize: '.75rem',
        }}
      >
        <span>© 2025 DFCraft — Built with 💜 by Assia, Ayman &amp; Ossama</span>
        <span style={{ fontFamily: 'var(--font-display)', letterSpacing: '.06em' }}>v1.0.0</span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div:first-child { grid-template-columns: 1fr 1fr !important; gap: 1.5rem !important; }
        }
        @media (max-width: 480px) {
          footer > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}