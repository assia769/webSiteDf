'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // EmailJS integration
      // Replace these with your actual EmailJS credentials from .env.local
      const emailjs = await import('@emailjs/browser');
      await emailjs.default.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: 'houbbadiassia@gmail.com',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(168,85,247,.05)',
    border: '1px solid var(--glass-b)',
    borderRadius: 'var(--radius)',
    padding: '12px 16px',
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: '.95rem',
    outline: 'none',
    transition: 'all .25s',
  };

  return (
    <div className="page-wrapper">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '4rem',
          alignItems: 'start',
          maxWidth: 1100,
        }}
      >
        {/* Left */}
        <div>
          <span className="label-tag">Get in Touch</span>
          <h1 className="page-heading">
            Let&apos;s talk<br />
            <span className="gradient-text">about focus.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '2rem', fontSize: '1rem' }}>
            Have a question, feature request, or want to collaborate? We&apos;d love to hear from you.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '.9rem', marginBottom: '2rem' }}>
            <div style={{ width: 38, height: 38, background: 'var(--glass)', border: '1px solid var(--glass-b)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              📧
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>houbbadiassia@gmail.com</span>
          </div>

          {/* Mini robot */}
          <Image
            src="/assets/robot/ai.png"
            alt="DFCraft mascot"
            width={140}
            height={150}
            style={{
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 20px rgba(168,85,247,.45))',
              animation: 'robotLevitate 4s ease-in-out infinite',
              marginTop: '1.5rem',
            }}
          />
        </div>

        {/* Form */}
        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--glass-b)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.2rem',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, rgba(168,85,247,.07), transparent 60%)', pointerEvents: 'none' }} />

          {status === 'sent' ? (
            <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '.6rem' }}>Message sent!</h3>
              <p style={{ color: 'var(--text-muted)' }}>We&apos;ll get back to you within 24 hours.</p>
              <button
                onClick={() => setStatus('idle')}
                style={{ marginTop: '1.5rem', background: 'none', border: '1px solid var(--glass-b)', color: 'var(--text-muted)', padding: '8px 20px', borderRadius: 8, fontSize: '.85rem' }}
              >
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.1rem' }}>
                {[
                  { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
                  { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="form-label">{f.label}</label>
                    <input
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      required
                      value={form[f.name as keyof typeof form]}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = 'var(--purple)'; e.target.style.boxShadow = '0 0 20px rgba(168,85,247,.15)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--glass-b)'; e.target.style.boxShadow = ''; }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '1.1rem' }}>
                <label className="form-label">Subject</label>
                <input
                  name="subject"
                  type="text"
                  placeholder="Feature request, bug report, collaboration..."
                  value={form.subject}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'var(--purple)'; e.target.style.boxShadow = '0 0 20px rgba(168,85,247,.15)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--glass-b)'; e.target.style.boxShadow = ''; }}
                />
              </div>

              <div style={{ marginBottom: '1.4rem' }}>
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  required
                  value={form.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: 'none', height: 120 }}
                  onFocus={e => { e.target.style.borderColor = 'var(--purple)'; e.target.style.boxShadow = '0 0 20px rgba(168,85,247,.15)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--glass-b)'; e.target.style.boxShadow = ''; }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  width: '100%', padding: '13px',
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  color: '#fff', border: 'none', borderRadius: 'var(--radius)',
                  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.95rem',
                  boxShadow: '0 0 22px rgba(168,85,247,.3)',
                  transition: 'all .3s',
                  opacity: status === 'sending' ? .7 : 1,
                }}
              >
                {status === 'sending' ? '⏳ Sending...' : status === 'error' ? '❌ Try again' : 'Send Message ✉️'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .page-wrapper > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}