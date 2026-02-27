'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/',         label: 'Home',     icon: '⌂' },
  { href: '/team',     label: 'Team',     icon: '◈' },
  { href: '/contact',  label: 'Contact',  icon: '✦' },
  { href: '/download', label: 'Download', icon: '↓' },
  { href: '/sound',    label: 'Igri',     icon: '◉' },
  { href: '/guide',    label: 'Guide',    icon: '✧' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mouseX, setMouseX] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = navRef.current?.getBoundingClientRect();
    if (rect) setMouseX(e.clientX - rect.left);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        @keyframes navEntry {
          from { opacity: 0; transform: translateY(-100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes linkUnderline {
          from { width: 0; opacity: 0; }
          to   { width: 100%; opacity: 1; }
        }
        @keyframes menuSlideIn {
          from { opacity: 0; transform: translateY(-10px) scaleY(0.95); }
          to   { opacity: 1; transform: translateY(0) scaleY(1); }
        }
        @keyframes shimmerMove {
          from { transform: translateX(-100%); }
          to   { transform: translateX(400%); }
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.8); opacity: 0.4; }
        }

        .nav-link {
          position: relative;
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(255,255,255,0.55);
          padding: 6px 14px;
          border-radius: 8px;
          transition: color 0.25s, background 0.25s;
          overflow: hidden;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .nav-link:hover {
          color: #fff;
          background: rgba(168,85,247,0.1);
        }
        .nav-link.active {
          color: #fff;
          background: rgba(168,85,247,0.15);
        }
        .nav-link .shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent);
          transform: translateX(-100%);
          pointer-events: none;
        }
        .nav-link:hover .shimmer {
          animation: shimmerMove 0.6s ease forwards;
        }
        .nav-link .link-icon {
          font-size: 0.65rem;
          opacity: 0.5;
          transition: opacity 0.2s, transform 0.2s;
        }
        .nav-link:hover .link-icon,
        .nav-link.active .link-icon {
          opacity: 1;
          transform: scale(1.3);
        }
        .nav-link .active-bar {
          position: absolute;
          bottom: 0;
          left: 14px;
          right: 14px;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, #a855f7, #6366f1, transparent);
          border-radius: 1px;
          animation: linkUnderline 0.3s ease forwards;
        }
        .nav-link .active-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #a855f7;
          flex-shrink: 0;
          animation: dotPulse 2s ease-in-out infinite;
        }

        .burger-line {
          width: 22px;
          height: 2px;
          background: rgba(255,255,255,0.8);
          border-radius: 2px;
          display: block;
          transition: transform 0.3s, opacity 0.3s;
        }

        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .burger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          height: 'var(--nav-h, 72px)',
          display: 'flex', alignItems: 'center',
          padding: '0 4% 0 3.5%',
          backdropFilter: 'blur(32px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
          background: scrolled
            ? 'rgba(8,3,22,0.96)'
            : 'rgba(8,3,22,0.55)',
          borderBottom: scrolled
            ? '1px solid rgba(168,85,247,0.2)'
            : '1px solid rgba(168,85,247,0.07)',
          boxShadow: scrolled
            ? '0 4px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(168,85,247,0.1)'
            : 'none',
          transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
          animation: 'navEntry 0.6s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* Mouse spotlight effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(400px circle at ${mouseX}px 50%, rgba(168,85,247,0.04), transparent 60%)`,
          pointerEvents: 'none',
        }} />

        {/* LEFT: Logo — plain, large, no effects */}
        <Link href="/" style={{ textDecoration: 'none', marginRight: 'auto', zIndex: 1, display: 'flex', alignItems: 'center' }}>
          <Image
            src="/assets/robot/logo.png"
            alt="DFCraft Logo"
            width={200}
            height={200}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>

        {/* CENTER: Desktop links */}
        <ul
          className="desktop-links"
          style={{
            display: 'flex',
            gap: '0.2rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {LINKS.map(({ href, label, icon }, i) => {
            const active = pathname === href;
            const delay = `${i * 0.06}s`;
            return (
              <li key={href} style={{ animation: 'navEntry 0.5s cubic-bezier(0.16,1,0.3,1) both', animationDelay: delay }}>
                <Link
                  href={href}
                  className={`nav-link${active ? ' active' : ''}`}
                  onMouseEnter={() => setHovered(href)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="shimmer" />
                  {active && <span className="active-dot" />}
                  <span className="link-icon">{icon}</span>
                  {label}
                  {active && <span className="active-bar" />}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* RIGHT: Burger only */}
        <div style={{ zIndex: 1, display: 'flex', alignItems: 'center' }}>
          <button
            className="burger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              background: 'rgba(168,85,247,0.1)',
              border: '1px solid rgba(168,85,247,0.25)',
              borderRadius: 10,
              padding: '8px 10px',
              cursor: 'pointer',
            }}
          >
            <span className="burger-line" style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : '' }} />
            <span className="burger-line" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="burger-line" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : '' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: 'fixed',
            top: 'var(--nav-h, 72px)',
            left: 0,
            right: 0,
            zIndex: 999,
            background: 'rgba(8,3,22,0.98)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            borderBottom: '1px solid rgba(168,85,247,0.2)',
            padding: '1.2rem 5% 1.5rem',
            animation: 'menuSlideIn 0.3s cubic-bezier(0.16,1,0.3,1) both',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {LINKS.map(({ href, label, icon }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`nav-link${active ? ' active' : ''}`}
                    style={{ padding: '10px 16px', width: '100%', boxSizing: 'border-box' }}
                  >
                    <span className="shimmer" />
                    {active && <span className="active-dot" />}
                    <span className="link-icon">{icon}</span>
                    {label}
                    {active && <span className="active-bar" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}