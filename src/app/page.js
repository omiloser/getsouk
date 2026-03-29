'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const TEAL = '#0D9488'
const AMBER = '#F59E0B'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleWaitlist = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(null)
    try {
      const { error: sbError } = await supabase
        .from('waitlist')
        .insert([{ email }])
      if (sbError && sbError.code !== '23505') throw sbError
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', color: '#111', background: '#fff', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 32px', borderBottom: '1px solid #f0f0f0' }}>
        <span style={{ fontWeight: 800, fontSize: 22, color: TEAL, letterSpacing: '-0.5px' }}>souk</span>
        <a href="#waitlist" style={{ background: TEAL, color: '#fff', padding: '9px 22px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
          Get early access
        </a>
      </nav>
      <section style={{ textAlign: 'center', padding: '80px 24px 60px', maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: '#f0fdf4', color: TEAL, borderRadius: 999, padding: '6px 16px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          Built for Instagram and WhatsApp sellers
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-1.5px' }}>
          Your store, live in 60 seconds
        </h1>
        <p style={{ fontSize: 18, color: '#555', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 40px' }}>
          Turn your Instagram catalog into a real storefront. Share one link. Accept WhatsApp orders. Get paid.
        </p>
        <a href="#waitlist" style={{ background: AMBER, color: '#fff', padding: '16px 36px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 18, display: 'inline-block' }}>
          Join the waitlist
        </a>
      </section>
      <div style={{ background: '#f9fafb', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', padding: '16px 24px', textAlign: 'center', color: '#888', fontSize: 14 }}>
        UAE · Saudi Arabia · Egypt · Jordan · Morocco · and more
      </div>
      <section id="how" style={{ padding: '80px 24px', maxWidth: 960, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 36, fontWeight: 800, marginBottom: 56 }}>How it works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
          {[
            { step: '1', emoji: '📸', title: 'Paste your Instagram', desc: 'Connect your profile and we pull your posts automatically.' },
            { step: '2', emoji: '🏪', title: 'Customize your store', desc: 'Pick a name, colors, and prices. Takes under a minute.' },
            { step: '3', emoji: '🔗', title: 'Share your link', desc: 'One link in bio. Customers browse and tap to order on WhatsApp.' },
          ].map(({ step, emoji, title, desc }) => (
            <div key={step} style={{ background: '#f9fafb', borderRadius: 16, padding: '32px 28px' }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{emoji}</div>
              <div style={{ color: TEAL, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>STEP {step}</div>
              <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 10 }}>{title}</h3>
              <p style={{ color: '#666', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: '#f9fafb', padding: '80px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 36, fontWeight: 800, marginBottom: 56 }}>Everything you need</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { emoji: '📦', title: 'Product catalog', desc: 'Add products with photos, prices, and descriptions.' },
              { emoji: '💬', title: 'WhatsApp orders', desc: 'Orders go straight to your WhatsApp - no app needed.' },
              { emoji: '🎨', title: 'Custom branding', desc: 'Your colors, your logo, your vibe.' },
              { emoji: '📊', title: 'Order tracking', desc: 'See what is selling and follow up with customers.' },
              { emoji: '💳', title: 'Payment links', desc: 'Accept Visa, Mastercard, and local payment methods.' },
              { emoji: '🌐', title: 'Arabic and English', desc: 'Full RTL support so your store feels local.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} style={{ background: '#fff', borderRadius: 12, padding: '24px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{emoji}</div>
                <h4 style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{title}</h4>
                <p style={{ color: '#777', fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '80px 24px', maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Simple pricing</h2>
        <p style={{ color: '#666', marginBottom: 48, fontSize: 17 }}>Start free. Pay only when you grow.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {[
            { name: 'Free', price: '0', period: 'forever', features: ['1 storefront', 'Up to 20 products', 'WhatsApp orders', 'Souk branding'], cta: 'Start free', highlight: false },
            { name: 'Pro', price: '49', period: 'AED / month', features: ['Unlimited products', 'Custom domain', 'Remove branding', 'Analytics dashboard'], cta: 'Join waitlist', highlight: true },
          ].map(({ name, price, period, features, cta, highlight }) => (
            <div key={name} style={{ border: highlight ? ('2px solid ' + TEAL) : '1px solid #e5e7eb', borderRadius: 16, padding: '36px 28px', background: highlight ? '#f0fdfa' : '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{name}</div>
              <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: '-1px', marginBottom: 4 }}>
                {price === '0' ? 'Free' : ('AED ' + price)}
              </div>
              <div style={{ color: '#888', fontSize: 13, marginBottom: 28 }}>{period}</div>
              <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, marginBottom: 28 }}>
                {features.map(f => (
                  <li key={f} style={{ padding: '6px 0', fontSize: 15, color: '#444' }}>
                    <span style={{ color: TEAL, marginRight: 8 }}>checkmark</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#waitlist" style={{ display: 'block', background: highlight ? TEAL : '#f3f4f6', color: highlight ? '#fff' : '#333', padding: '12px 0', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
                {cta}
              </a>
            </div>
          ))}
        </div>
      </section>
      <section id="waitlist" style={{ background: TEAL, padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Be first to launch</h2>
        <p style={{ color: '#ccfbf1', fontSize: 17, marginBottom: 40 }}>
          Join 500+ sellers waiting for early access. We are onboarding in waves.
        </p>
        {submitted ? (
          <div style={{ background: '#fff', color: TEAL, borderRadius: 12, padding: '24px 36px', display: 'inline-block', fontWeight: 700, fontSize: 18 }}>
            You are on the list! We will be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleWaitlist} style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ padding: '14px 20px', borderRadius: 8, border: 'none', fontSize: 16, width: 280, outline: 'none' }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{ background: AMBER, color: '#fff', border: 'none', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Joining...' : 'Get early access'}
            </button>
          </form>
        )}
        {error && <p style={{ color: '#fecdd3', marginTop: 16 }}>{error}</p>}
      </section>
      <footer style={{ textAlign: 'center', padding: '32px 24px', color: '#aaa', fontSize: 14, borderTop: '1px solid #f0f0f0' }}>
        <span style={{ fontWeight: 700, color: TEAL }}>souk</span> · Built in the UAE ·{' '}
        <a href="mailto:hello@getsouk.app" style={{ color: '#aaa' }}>hello@getsouk.app</a>
      </footer>
    </main>
  )
            }
