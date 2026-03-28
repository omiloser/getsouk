'use client'
import { useState } from 'react'

const TEAL = '#0D9488'
const AMBER = '#F59E0B'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleWaitlist = (e) => {
    e.preventDefault()
    // TODO: connect to Supabase waitlist table
    setSubmitted(true)
  }

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', background: '#FAFAF9', color: '#1C1917' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 32px', borderBottom: '1px solid #E7E5E4', background: '#fff', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: TEAL, letterSpacing: -0.5 }}>souk</span>
          <span style={{ fontSize: 11, background: AMBER, color: '#fff', borderRadius: 4, padding: '2px 6px', fontWeight: 700 }}>BETA</span>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="#pricing" style={{ fontSize: 14, color: '#57534E', fontWeight: 500 }}>Pricing</a>
          <a href="/builder" style={{ background: TEAL, color: '#fff', padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600 }}>
            Build your store &rarr;
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 24px 60px', maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: '#F0FDF4', color: '#15803D', border: '1px solid #BBF7D0', borderRadius: 20, padding: '6px 14px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
          Free for the first 100 sellers
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1, marginBottom: 20, letterSpacing: -1.5 }}>
          Your Instagram shop<br />
          <span style={{ color: TEAL }}>deserves a real storefront</span>
        </h1>
        <p style={{ fontSize: 18, color: '#78716C', lineHeight: 1.6, marginBottom: 36, maxWidth: 540, margin: '0 auto 36px' }}>
          Build a beautiful link-in-bio store with WhatsApp checkout in under 3 minutes.
          No code, no monthly fees to start.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/builder" style={{ background: TEAL, color: '#fff', padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 700, display: 'inline-block' }}>
            Create my store &mdash; it&apos;s free
          </a>
          <a href="#how" style={{ background: '#fff', color: '#1C1917', padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 600, border: '1.5px solid #E7E5E4', display: 'inline-block' }}>
            See how it works
          </a>
        </div>
        <p style={{ marginTop: 16, fontSize: 13, color: '#A8A29E' }}>No credit card needed &middot; Takes 3 minutes &middot; Link works on Instagram &amp; TikTok</p>
      </section>

      {/* Social proof strip */}
      <div style={{ background: TEAL, padding: '16px 24px', textAlign: 'center', color: '#fff', fontSize: 14, fontWeight: 500 }}>
        Trusted by sellers across UAE, Saudi Arabia, Egypt &amp; Jordan
      </div>

      {/* How it works */}
      <section id="how" style={{ padding: '80px 24px', maxWidth: 960, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Up and selling in 3 steps</h2>
        <p style={{ textAlign: 'center', color: '#78716C', marginBottom: 56, fontSize: 16 }}>No tech skills needed. Seriously.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
          {[
            { step: '01', icon: '🏪', title: 'Set up your store', desc: 'Add your name, logo colour, category, and WhatsApp number.' },
            { step: '02', icon: '📦', title: 'Add your products', desc: 'Upload up to 12 items with photos, prices, and descriptions.' },
            { step: '03', icon: '🔗', title: 'Share your link', desc: 'Drop your getsouk.app/yourname link in your Instagram bio and start getting orders.' },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1.5px solid #F5F5F4' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: TEAL, marginBottom: 12, letterSpacing: 1 }}>{step}</div>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: 14, color: '#78716C', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ background: '#F5F5F4', padding: '80px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Everything you need to sell online</h2>
          <p style={{ textAlign: 'center', color: '#78716C', marginBottom: 56, fontSize: 16 }}>Built for MENA sellers, not Silicon Valley startups.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { icon: '💬', title: 'WhatsApp checkout', desc: 'Every product has a "Buy on WhatsApp" button. Orders come straight to your phone.' },
              { icon: '🎨', title: 'Beautiful themes', desc: 'Pick your brand colour and get a store that looks professional instantly.' },
              { icon: '💰', title: 'Multi-currency', desc: 'AED, SAR, USD, EUR and more. Show prices in your customers currency.' },
              { icon: '📱', title: 'Mobile-first', desc: 'Your store looks stunning on every phone. 90% of MENA shoppers buy on mobile.' },
              { icon: '🔗', title: 'Instagram bio link', desc: 'One link. Swap your linktree for a real shop that converts.' },
              { icon: '📊', title: 'Analytics (Pro)', desc: 'See who visits your store, which products they click, and where they are from.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1.5px solid #E7E5E4' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{title}</h3>
                <p style={{ fontSize: 14, color: '#78716C', lineHeight: 1.5 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '80px 24px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Simple pricing</h2>
        <p style={{ textAlign: 'center', color: '#78716C', marginBottom: 56, fontSize: 16 }}>Start free. Upgrade when you&apos;re ready to grow.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, border: '1.5px solid #E7E5E4' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Free</h3>
            <div style={{ fontSize: 42, fontWeight: 800, marginBottom: 4 }}>AED 0</div>
            <p style={{ fontSize: 14, color: '#78716C', marginBottom: 24 }}>Forever free</p>
            {['Up to 6 products', 'WhatsApp checkout', 'Custom link', 'Basic themes', 'SSL & mobile-ready'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 14 }}>
                <span style={{ color: TEAL, fontWeight: 700 }}>✓</span> {f}
              </div>
            ))}
            <a href="/builder" style={{ display: 'block', textAlign: 'center', marginTop: 24, background: '#F5F5F4', color: '#1C1917', padding: '12px 0', borderRadius: 10, fontWeight: 600, fontSize: 15 }}>
              Get started free
            </a>
          </div>
          <div style={{ background: TEAL, borderRadius: 20, padding: 32, color: '#fff', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -14, right: 24, background: AMBER, color: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>MOST POPULAR</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Pro</h3>
            <div style={{ fontSize: 42, fontWeight: 800, marginBottom: 4 }}>AED 33<span style={{ fontSize: 18, fontWeight: 400 }}>/mo</span></div>
            <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 24 }}>or AED 299/year (save 25%)</p>
            {['Unlimited products', 'Everything in Free', 'Analytics dashboard', 'Priority support', 'Custom domain (coming soon)', 'Remove Souk branding'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 14 }}>
                <span style={{ fontWeight: 700 }}>✓</span> {f}
              </div>
            ))}
            <a href="/builder" style={{ display: 'block', textAlign: 'center', marginTop: 24, background: '#fff', color: TEAL, padding: '12px 0', borderRadius: 10, fontWeight: 700, fontSize: 15 }}>
              Start Pro free trial
            </a>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section style={{ background: TEAL, padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Be among the first sellers</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 32 }}>Join our early access list and get 3 months Pro free.</p>
        {submitted ? (
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '20px 32px', display: 'inline-block', color: '#fff', fontWeight: 600, fontSize: 16 }}>
            You&apos;re on the list! We&apos;ll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleWaitlist} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ padding: '14px 20px', borderRadius: 10, border: 'none', fontSize: 15, width: 300, outline: 'none' }}
            />
            <button type="submit" style={{ background: AMBER, color: '#fff', padding: '14px 28px', borderRadius: 10, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              Join waitlist &rarr;
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer style={{ background: '#1C1917', color: '#A8A29E', padding: '40px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 18 }}>souk</span>
          <span style={{ marginLeft: 16, fontSize: 13 }}>&copy; 2025 Souk. All rights reserved.</span>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 13 }}>
          <a href="/terms" style={{ color: '#A8A29E' }}>Terms of Service</a>
          <a href="/privacy" style={{ color: '#A8A29E' }}>Privacy Policy</a>
          <a href="mailto:hello@getsouk.app" style={{ color: '#A8A29E' }}>Contact</a>
        </div>
      </footer>
    </main>
  )
}
