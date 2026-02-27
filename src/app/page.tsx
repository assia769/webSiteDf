import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { CTA } from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      {/* ── Persistent background layers (fixed, behind everything) ── */}
      <div className="bg-glow"    aria-hidden="true" />
      <div className="bg-horizon" aria-hidden="true" />
      <div className="bg-grid"    aria-hidden="true" />

      {/* ── Page sections ── */}
      <Hero />
      <Features />
      <CTA />
    </>
  );
}