import Link from 'next/link';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function CTA() {
  return (
    <section
      style={{
        position: 'relative', zIndex: 5,
        padding: '2.5rem 5%',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
        borderTop: '1px solid rgba(255,255,255,.06)',
      }}
    >
      {/* Hover glow */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(168,85,247,.06), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <span
        style={{
          fontSize: '1.05rem',
          fontWeight: 500,
          color: 'rgba(255,255,255,.65)',
          fontFamily: 'var(--font-body)',
        }}
      >
        Start building your focus today.
      </span>
      <Link
        href="/download"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 38, height: 38, borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,.28)',
          color: '#fff', textDecoration: 'none',
          fontSize: '1rem',
          transition: 'all .3s',
        }}
      >
        →
      </Link>
    </section>
  );
}