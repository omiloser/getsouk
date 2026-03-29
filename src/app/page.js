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
