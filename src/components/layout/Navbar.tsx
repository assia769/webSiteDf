'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/',          label: 'Home' },
  { href: '/team',      label: 'Team' },
  { href: '/contact',   label: 'Contact' },
  { href: '/download',  label: 'Download' },
  { href: '/sound',     label: 'Haunit' },
  { href: '/guide',     label: 'Guide' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 'var(--nav-h)',
        display: 'flex', alignItems: 'center',
        padding: '0 5%',
        backdropFilter: 'blur(24px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
        background: scrolled ? 'rgba(13,5,32,.97)' : 'rgba(13,5,32,.65)',
        borderBottom: '1px solid rgba(168,85,247,.12)',
        transition: 'background .4s',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          textDecoration: 'none', marginRight: 'auto',
        }}
      >
        <Image
          src="/assets/robot/logo1.png"
          alt="DFCraft Logo"
          width={36}
          height={36}
          style={{ objectFit: 'contain' }}
          priority
        />
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.45rem', fontWeight: 700,
            background: 'linear-gradient(135deg, #d8b4fe, #a855f7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', letterSpacing: '-.02em',
          }}
        >
          DfCraft
        </span>
      </Link>

      {/* Desktop links */}
      <ul
        style={{
          display: 'flex', gap: '2.2rem', listStyle: 'none',
          ...(menuOpen ? {
            position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0,
            flexDirection: 'column', gap: '1.4rem',
            background: 'rgba(13,5,32,.98)', padding: '1.5rem 5%',
            borderBottom: '1px solid rgba(168,85,247,.15)',
          } : {}),
        }}
      >
        {LINKS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '.875rem', fontWeight: 500,
                  color: active ? '#fff' : 'rgba(255,255,255,.65)',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '2px',
                  transition: 'color .2s',
                  ...(active ? {
                    color: '#fff',
                  } : {}),
                }}
              >
                {label}
                {active && (
                  <span style={{
                    position: 'absolute', bottom: -4, left: 0, right: 0,
                    height: 1.5, background: '#a855f7', borderRadius: 1,
                  }} />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Burger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        style={{
          display: 'none',
          flexDirection: 'column', gap: 5,
          background: 'none', border: 'none', padding: 6,
          marginLeft: '1rem',
        }}
      >
        <span style={{ width: 22, height: 2, background: 'rgba(255,255,255,.8)', borderRadius: 1, display: 'block', transition: '.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : '' }} />
        <span style={{ width: 22, height: 2, background: 'rgba(255,255,255,.8)', borderRadius: 1, display: 'block', opacity: menuOpen ? 0 : 1, transition: '.3s' }} />
        <span style={{ width: 22, height: 2, background: 'rgba(255,255,255,.8)', borderRadius: 1, display: 'block', transition: '.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : '' }} />
      </button>

      <style>{`
        @media (max-width: 768px) {
          nav ul { display: ${menuOpen ? 'flex' : 'none'} !important; }
          nav button { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}