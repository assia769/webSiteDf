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

const SOCIALS = [
  {
    key: 'x',
    label: '𝕏',
    href: '#',
    title: 'Follow on X',
  },
  {
    key: 'gh',
    label: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    href: '#',
    title: 'GitHub',
  },
  {
    key: 'dc',
    label: (
      <svg width="16" height="13" viewBox="0 0 71 55" fill="currentColor">
        <path d="M60.105 4.898A58.55 58.55 0 0045.653.415a40.204 40.204 0 00-1.832 3.77 54.138 54.138 0 00-16.256 0 40.256 40.256 0 00-1.835-3.77 58.362 58.362 0 00-14.452 4.483C1.677 18.17-.41 31.016.127 43.684a58.674 58.674 0 0017.9 9.073 44.217 44.217 0 003.821-6.23 38.378 38.378 0 01-6.022-2.91c.506-.372 1-.76 1.476-1.157a41.899 41.899 0 0035.996 0c.48.397.974.785 1.476 1.157a38.31 38.31 0 01-6.025 2.913 44.12 44.12 0 003.82 6.23 58.546 58.546 0 0017.91-9.076c.538-14.016-2.313-26.747-9.373-37.786zM23.7 36.372c-3.497 0-6.36-3.22-6.36-7.153 0-3.933 2.8-7.16 6.36-7.16 3.56 0 6.41 3.22 6.36 7.16.006 3.933-2.8 7.153-6.36 7.153zm23.6 0c-3.498 0-6.36-3.22-6.36-7.153 0-3.933 2.8-7.16 6.36-7.16 3.56 0 6.408 3.22 6.36 7.16 0 3.933-2.8 7.153-6.36 7.153z"/>
      </svg>
    ),
    href: '#',
    title: 'Discord',
  },
];

export function Footer() {
  return (
    <footer className="dfcraft-footer">
      {/* Top glow line */}
      <div className="footer-glow-line" />

      {/* Subtle noise/grid texture overlay */}
      <div className="footer-texture" />

      <div className="footer-inner">

        {/* ── Brand column ─────────────────────────────── */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <div className="footer-logo-ring">
              <Image
                src="/assets/robot/logo.png"
                alt="DFCraft"
                width={36}
                height={36}
                style={{ objectFit: 'contain', borderRadius: 8 }}
              />
            </div>
            <span className="footer-logo-name">DFCraft</span>
          </Link>

          <p className="footer-tagline">
            The ultimate productivity browser extension.
            Free forever. Master your focus, craft your time.
          </p>

          {/* Social icons */}
          <div className="footer-socials">
            {SOCIALS.map(s => (
              <a
                key={s.key}
                href={s.href}
                title={s.title}
                className="footer-social-btn"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Mini status badge */}
          <div className="footer-status">
            <span className="footer-status-dot" />
            All systems operational
          </div>
        </div>

        {/* ── Nav columns ──────────────────────────────── */}
        {COLS.map(col => (
          <div key={col.title} className="footer-col">
            <h4 className="footer-col-title">{col.title}</h4>
            <ul className="footer-col-list">
              {col.links.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    <span className="footer-link-arrow">→</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ───────────────────────────────── */}
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span className="footer-copy">© 2025 DFCraft</span>
          <span className="footer-divider">·</span>
          <span className="footer-authors">Built with 💜 by Assia, Ayman &amp; Ossama</span>
        </div>
        <div className="footer-bottom-right">
          <span className="footer-version">v1.0.0</span>
          <span className="footer-made-with">Made in Morocco 🇲🇦</span>
        </div>
      </div>

      <style>{`
        /* ── Footer shell ─────────────────────────────── */
        .dfcraft-footer {
          position: relative;
          z-index: 5;
          padding: 0 5%;
          overflow: hidden;
        }

        /* Animated rainbow top border */
        .footer-glow-line {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(129,140,248,0.6) 20%,
            rgba(167,139,250,0.9) 40%,
            rgba(232,121,249,0.9) 60%,
            rgba(129,140,248,0.6) 80%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shiftLine 6s linear infinite;
          margin-bottom: 0;
        }
        @keyframes shiftLine {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Subtle dot-grid texture */
        .footer-texture {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: linear-gradient(to bottom, transparent, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.5) 70%, transparent);
        }

        /* ── Inner grid ───────────────────────────────── */
        .footer-inner {
          position: relative;
          display: grid;
          grid-template-columns: 2.2fr 1fr 1fr 1fr;
          gap: 3rem;
          padding: 3.5rem 0 3rem;
        }

        /* ── Brand ────────────────────────────────────── */
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 1rem;
          width: fit-content;
        }

        .footer-logo-ring {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          padding: 2px;
          background: linear-gradient(135deg, rgba(167,139,250,0.5), rgba(232,121,249,0.3));
          box-shadow: 0 0 20px rgba(167,139,250,0.2);
          transition: box-shadow .3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer-logo:hover .footer-logo-ring {
          box-shadow: 0 0 32px rgba(167,139,250,0.5);
        }

        .footer-logo-name {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #e0d7ff, #c084fc, #e879f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: filter .3s;
        }
        .footer-logo:hover .footer-logo-name {
          filter: drop-shadow(0 0 12px rgba(192,132,252,0.6));
        }

        .footer-tagline {
          color: rgba(255,255,255,0.32);
          font-size: .82rem;
          line-height: 1.75;
          max-width: 270px;
          margin: 0 0 1.4rem;
          font-family: var(--font-body);
        }

        /* ── Social buttons ───────────────────────────── */
        .footer-socials {
          display: flex;
          gap: .6rem;
          margin-bottom: 1.2rem;
        }

        .footer-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.4);
          font-size: .8rem;
          font-weight: 700;
          text-decoration: none;
          transition: all .25s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: var(--font-display);
          position: relative;
          overflow: hidden;
        }
        .footer-social-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(167,139,250,0.15), rgba(232,121,249,0.1));
          opacity: 0;
          transition: opacity .25s;
        }
        .footer-social-btn:hover {
          color: #fff;
          border-color: rgba(167,139,250,0.5);
          box-shadow: 0 0 16px rgba(167,139,250,0.3);
          transform: translateY(-3px) scale(1.08);
        }
        .footer-social-btn:hover::before { opacity: 1; }

        /* ── Status pill ──────────────────────────────── */
        .footer-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px;
          border-radius: 50px;
          background: rgba(52,211,153,0.06);
          border: 1px solid rgba(52,211,153,0.18);
          color: rgba(52,211,153,0.8);
          font-size: .72rem;
          font-family: var(--font-display);
          letter-spacing: 0.04em;
          width: fit-content;
        }
        .footer-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 6px #34d399;
          animation: statusPulse 2.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }

        /* ── Nav columns ──────────────────────────────── */
        .footer-col {}

        .footer-col-title {
          font-family: var(--font-display);
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
          margin: 0 0 1.1rem;
          position: relative;
          padding-left: 14px;
        }
        .footer-col-title::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a78bfa, #e879f9);
          box-shadow: 0 0 6px rgba(167,139,250,0.6);
        }

        .footer-col-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: .4rem;
        }

        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.38);
          font-size: .83rem;
          text-decoration: none;
          font-family: var(--font-body);
          transition: all .2s;
          padding: 3px 0;
          position: relative;
        }
        .footer-link-arrow {
          font-size: .7rem;
          opacity: 0;
          transform: translateX(-6px);
          transition: all .2s;
          color: #a78bfa;
        }
        .footer-link:hover {
          color: rgba(255,255,255,0.85);
          transform: translateX(4px);
        }
        .footer-link:hover .footer-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Bottom bar ───────────────────────────────── */
        .footer-bottom {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 0 1.75rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-bottom::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          width: 120px;
          height: 1px;
          background: linear-gradient(90deg, rgba(167,139,250,0.5), transparent);
        }

        .footer-bottom-left {
          display: flex;
          align-items: center;
          gap: .7rem;
          flex-wrap: wrap;
        }
        .footer-copy {
          color: rgba(255,255,255,0.28);
          font-size: .75rem;
          font-family: var(--font-display);
          font-weight: 600;
        }
        .footer-divider {
          color: rgba(255,255,255,0.15);
          font-size: .75rem;
        }
        .footer-authors {
          color: rgba(255,255,255,0.22);
          font-size: .75rem;
          font-family: var(--font-body);
        }

        .footer-bottom-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .footer-version {
          font-family: var(--font-display);
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .08em;
          color: rgba(167,139,250,0.5);
          padding: 3px 9px;
          border: 1px solid rgba(167,139,250,0.15);
          border-radius: 50px;
          background: rgba(167,139,250,0.05);
        }
        .footer-made-with {
          color: rgba(255,255,255,0.2);
          font-size: .72rem;
          font-family: var(--font-display);
          letter-spacing: .04em;
        }

        /* ── Responsive ───────────────────────────────── */
        @media (max-width: 900px) {
          .footer-inner {
            grid-template-columns: 1fr 1fr 1fr;
          }
          .footer-brand {
            grid-column: 1 / -1;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .footer-tagline { max-width: 100%; margin-bottom: 0; }
        }
        @media (max-width: 600px) {
          .footer-inner {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .footer-brand { flex-direction: column; gap: .75rem; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: .75rem; }
        }
        @media (max-width: 380px) {
          .footer-inner { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}