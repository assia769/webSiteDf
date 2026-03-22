import { Hero }         from '@/components/sections/Hero';
import { AppShowcase }  from '@/components/sections/AppShowcase';
import { CTA }          from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <div className="bg-glow"    aria-hidden="true" />
      <div className="bg-horizon" aria-hidden="true" />
      <div className="bg-grid"    aria-hidden="true" />

      <Hero />
      <AppShowcase />
      <CTA />
    </>
  );
}