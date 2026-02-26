import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CursorGlow } from '@/components/ui/CursorGlow';

export const metadata: Metadata = {
  title: 'DFCraft — Craft Your Focus.',
  description: 'The ultimate productivity browser extension. Pomodoro timer, task manager, distraction blocker, and focus sounds in one sleek package.',
  keywords: ['productivity', 'pomodoro', 'focus', 'browser extension', 'todo', 'distraction blocker'],
  authors: [{ name: 'DFCraft Team' }],
  openGraph: {
    title: 'DFCraft — Craft Your Focus.',
    description: 'The ultimate productivity browser extension.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Background layers */}
        <div className="bg-glow" />
        <div className="bg-horizon" />
        <div className="bg-grid" />

        {/* Custom cursor */}
        <CursorGlow />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main style={{ position: 'relative', zIndex: 3 }}>
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}