'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';

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
      const emailjs = await import('@emailjs/browser');
      await emailjs.default.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
          // This matches {{to_email}} in your EmailJS template if needed
          to_email:   'dfcraft2026@protonmail.com',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
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
    boxSizing: 'border-box',
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
        {/* ── Left panel ────────────────────────────── */}
        <div>
          <span className="label-tag">Get in Touch</span>
          <h1 className="page-heading">
            Let&apos;s talk<br />
            <span className="gradient-text">about focus.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '2rem', fontSize: '1rem' }}>
            Have a question, feature request, or want to collaborate? We&apos;d love to hear from you.
          </p>

          {/* Email display */}
          <a
            href="mailto:dfcraft2026@protonmail.com"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '.9rem',
              marginBottom: '2rem', textDecoration: 'none',
              padding: '10px 14px',
              background: 'rgba(168,85,247,.06)',
              border: '1px solid rgba(168,85,247,.18)',
              borderRadius: 12,
              transition: 'all .25s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(168,85,247,.12)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,85,247,.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(168,85,247,.06)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,85,247,.18)';
            }}
          >
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, rgba(124,58,237,.3), rgba(168,85,247,.2))',
              border: '1px solid rgba(168,85,247,.25)',
              borderRadius: 9,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', flexShrink: 0,
            }}>
              📧
            </div>
            <div>
              <div style={{ fontSize: '.68rem', color: 'rgba(168,85,247,.7)', fontFamily: 'var(--font-display)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 2 }}>
                Email us
              </div>
              <div style={{ fontSize: '.875rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                dfcraft2026@protonmail.com
              </div>
            </div>
          </a>

          {/* Response time badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 12px', borderRadius: 50,
            background: 'rgba(52,211,153,.06)',
            border: '1px solid rgba(52,211,153,.18)',
            color: 'rgba(52,211,153,.8)',
            fontSize: '.72rem', fontFamily: 'var(--font-display)',
            letterSpacing: '.04em', marginBottom: '2rem',
          } as React.CSSProperties}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#34d399', boxShadow: '0 0 6px #34d399',
              flexShrink: 0,
            }} />
            Usually replies within 24 hours
          </div>

          {/* Robot mascot */}
          <Image
            src="/assets/robot/ai.png"
            alt="DFCraft mascot"
            width={140}
            height={150}
            style={{
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 20px rgba(168,85,247,.45))',
              animation: 'robotLevitate 4s ease-in-out infinite',
              display: 'block',
              marginTop: '.5rem',
            }}
          />
        </div>

        {/* ── Form panel ────────────────────────────── */}
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
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 0%, rgba(168,85,247,.07), transparent 60%)',
            pointerEvents: 'none',
          }} />

          {/* ── Success state ── */}
          {status === 'sent' ? (
            <div style={{ textAlign: 'center', padding: '3rem 2rem', position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '.6rem', color: 'var(--text)' }}>
                Message sent!
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '.5rem' }}>
                We&apos;ll get back to you within 24 hours.
              </p>
              <p style={{ color: 'rgba(255,255,255,.25)', fontSize: '.8rem', fontFamily: 'var(--font-display)' }}>
                dfcraft2026@protonmail.com
              </p>
              <button
                onClick={() => setStatus('idle')}
                style={{
                  marginTop: '1.5rem', background: 'none', cursor: 'pointer',
                  border: '1px solid var(--glass-b)', color: 'var(--text-muted)',
                  padding: '8px 20px', borderRadius: 8, fontSize: '.85rem',
                  fontFamily: 'var(--font-body)',
                  transition: 'all .2s',
                }}
              >
                Send another →
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.1rem' }}>
                {[
                  { label: 'Name',  name: 'name',  type: 'text',  placeholder: 'Your name' },
                  { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="form-label" style={{ display: 'block', marginBottom: 6, fontSize: '.8rem', color: 'rgba(255,255,255,.45)', fontFamily: 'var(--font-display)', letterSpacing: '.04em' }}>
                      {f.label}
                    </label>
                    <input
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      required
                      value={form[f.name as keyof typeof form]}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => {
                        e.target.style.borderColor = 'rgba(168,85,247,.6)';
                        e.target.style.boxShadow = '0 0 20px rgba(168,85,247,.15)';
                        e.target.style.background = 'rgba(168,85,247,.08)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'var(--glass-b)';
                        e.target.style.boxShadow = '';
                        e.target.style.background = 'rgba(168,85,247,.05)';
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '1.1rem' }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '.8rem', color: 'rgba(255,255,255,.45)', fontFamily: 'var(--font-display)', letterSpacing: '.04em' }}>
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  placeholder="Feature request, bug report, collaboration..."
                  value={form.subject}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(168,85,247,.6)';
                    e.target.style.boxShadow = '0 0 20px rgba(168,85,247,.15)';
                    e.target.style.background = 'rgba(168,85,247,.08)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'var(--glass-b)';
                    e.target.style.boxShadow = '';
                    e.target.style.background = 'rgba(168,85,247,.05)';
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.4rem' }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '.8rem', color: 'rgba(255,255,255,.45)', fontFamily: 'var(--font-display)', letterSpacing: '.04em' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: 'none', height: 130 }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(168,85,247,.6)';
                    e.target.style.boxShadow = '0 0 20px rgba(168,85,247,.15)';
                    e.target.style.background = 'rgba(168,85,247,.08)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'var(--glass-b)';
                    e.target.style.boxShadow = '';
                    e.target.style.background = 'rgba(168,85,247,.05)';
                  }}
                />
              </div>

              {/* Error message */}
              {status === 'error' && (
                <div style={{
                  marginBottom: '1rem', padding: '10px 14px',
                  background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.25)',
                  borderRadius: 8, color: 'rgba(252,165,165,.9)', fontSize: '.83rem',
                  fontFamily: 'var(--font-body)',
                }}>
                  ⚠️ Something went wrong. Please check your connection and try again, or email us directly at{' '}
                  <a href="mailto:dfcraft2026@protonmail.com" style={{ color: '#f87171', textDecoration: 'underline' }}>
                    dfcraft2026@protonmail.com
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  width: '100%', padding: '13px',
                  background: status === 'sending'
                    ? 'rgba(124,58,237,.5)'
                    : 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  color: '#fff', border: 'none', borderRadius: 'var(--radius)',
                  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.95rem',
                  boxShadow: status === 'sending' ? 'none' : '0 0 22px rgba(168,85,247,.3)',
                  transition: 'all .3s',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  letterSpacing: '.01em',
                }}
              >
                {status === 'sending' ? '⏳ Sending...' :
                 status === 'error'   ? '↩ Try again' :
                                        'Send Message ✉️'}
              </button>

              <p style={{ textAlign: 'center', marginTop: '.9rem', fontSize: '.72rem', color: 'rgba(255,255,255,.2)', fontFamily: 'var(--font-display)' }}>
                Delivered to dfcraft2026@protonmail.com
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .page-wrapper > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </div>
  );
}