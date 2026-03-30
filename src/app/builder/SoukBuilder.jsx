'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const TEAL = '#0D9488'
const AMBER = '#F59E0B'
const BG = '#FAFAF9'
const DARK = '#1C1917'

const CATEGORIES = [
  'Fashion & Clothing', 'Accessories & Jewellery', 'Beauty & Skincare',
  'Home Decor', 'Food & Sweets', 'Art & Prints', 'Kids & Toys', 'Other',
]
const CURRENCIES = ['AED', 'SAR', 'USD', 'EUR', 'GBP', 'KWD', 'QAR', 'BHD', 'OMR']
const WHATSAPP_COUNTRIES = [
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+966', flag: '🇸🇦', name: 'KSA' },
  { code: '+1',   flag: '🇺🇸', name: 'US' },
  { code: '+44',  flag: '🇬🇧', name: 'UK' },
  { code: '+91',  flag: '🇮🇳', name: 'India' },
  { code: '+92',  flag: '🇵🇰', name: 'Pakistan' },
  { code: '+20',  flag: '🇪🇬', name: 'Egypt' },
  { code: '+962', flag: '🇯🇴', name: 'Jordan' },
]
const PRODUCT_EMOJIS = ['👗','👜','💄','🏺','🍫','🖼️','🧸','💍','👟','🌸','🧴','☕','🎀','🛍️']

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// ─── UI primitives ────────────────────────────────────────────────────────────
const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#57534E', marginBottom: 6 }}>{label}</label>}
    <input {...props} style={{
      width: '100%', boxSizing: 'border-box', padding: '10px 14px',
      border: '1.5px solid #D6D3D1', borderRadius: 10, fontSize: 14,
      outline: 'none', background: '#fff', color: DARK, ...props.style,
    }}
      onFocus={e => e.target.style.borderColor = TEAL}
      onBlur={e => e.target.style.borderColor = '#D6D3D1'}
    />
  </div>
)

const Textarea = ({ label, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#57534E', marginBottom: 6 }}>{label}</label>}
    <textarea {...props} style={{
      width: '100%', boxSizing: 'border-box', padding: '10px 14px',
      border: '1.5px solid #D6D3D1', borderRadius: 10, fontSize: 14,
      outline: 'none', background: '#fff', color: DARK, resize: 'vertical', minHeight: 70,
      ...props.style,
    }}
      onFocus={e => e.target.style.borderColor = TEAL}
      onBlur={e => e.target.style.borderColor = '#D6D3D1'}
    />
  </div>
)

const Select = ({ label, options, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#57534E', marginBottom: 6 }}>{label}</label>}
    <select {...props} style={{
      width: '100%', padding: '10px 14px', border: '1.5px solid #D6D3D1',
      borderRadius: 10, fontSize: 14, outline: 'none', background: '#fff', color: DARK, cursor: 'pointer',
    }}>
      {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
    </select>
  </div>
)

const Btn = ({ children, variant = 'primary', ...props }) => (
  <button {...props} style={{
    padding: '12px 24px', borderRadius: 12, fontSize: 15, fontWeight: 700,
    cursor: props.disabled ? 'not-allowed' : 'pointer', border: 'none',
    background: variant === 'primary' ? TEAL : variant === 'amber' ? AMBER : '#E7E5E4',
    color: variant === 'ghost' ? DARK : '#fff',
    opacity: props.disabled ? 0.6 : 1,
    ...props.style,
  }}>{children}</button>
)

const Steps = ({ current, total }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < total - 1 ? 1 : 0 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700,
          background: i <= current ? TEAL : '#E7E5E4',
          color: i <= current ? '#fff' : '#78716C', flexShrink: 0,
        }}>{i < current ? '✓' : i + 1}</div>
        {i < total - 1 && <div style={{ flex: 1, height: 2, background: i < current ? TEAL : '#E7E5E4', margin: '0 4px' }} />}
      </div>
    ))}
  </div>
)

// ─── Step components ──────────────────────────────────────────────────────────
const StepStoreInfo = ({ data, onChange, onNext }) => (
  <div>
    <h2 style={{ fontSize: 22, fontWeight: 800, color: DARK, margin: '0 0 6px' }}>Your store</h2>
    <p style={{ color: '#78716C', fontSize: 14, marginTop: 0, marginBottom: 24 }}>Tell us about your shop</p>
    <Input label="Store name *" placeholder="e.g. Layla's Closet" value={data.storeName} onChange={e => onChange({ storeName: e.target.value })} />
    <Input label="Your tagline" placeholder="e.g. Handpicked modest fashion" value={data.tagline} onChange={e => onChange({ tagline: e.target.value })} />
    <Select label="Category" options={CATEGORIES} value={data.category} onChange={e => onChange({ category: e.target.value })} />
    <Input label="Instagram handle" placeholder="@yourbrand" value={data.instagramHandle} onChange={e => onChange({ instagramHandle: e.target.value })} />
    <Btn style={{ width: '100%', marginTop: 8 }} onClick={onNext} disabled={!data.storeName}>Continue →</Btn>
  </div>
)

const StepContact = ({ data, onChange, onNext, onBack }) => (
  <div>
    <h2 style={{ fontSize: 22, fontWeight: 800, color: DARK, margin: '0 0 6px' }}>Contact details</h2>
    <p style={{ color: '#78716C', fontSize: 14, marginTop: 0, marginBottom: 24 }}>Customers will message you on WhatsApp</p>
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#57534E', marginBottom: 6 }}>WhatsApp number *</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <select value={data.waPrefix} onChange={e => onChange({ waPrefix: e.target.value })}
          style={{ padding: '10px 12px', border: '1.5px solid #D6D3D1', borderRadius: 10, fontSize: 14, background: '#fff', cursor: 'pointer', flexShrink: 0 }}>
          {WHATSAPP_COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
        </select>
        <input value={data.waNumber} onChange={e => onChange({ waNumber: e.target.value })} placeholder="50 123 4567"
          style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #D6D3D1', borderRadius: 10, fontSize: 14, outline: 'none', background: '#fff', color: DARK }} />
      </div>
    </div>
    <Select label="Currency" options={CURRENCIES} value={data.currency} onChange={e => onChange({ currency: e.target.value })} />
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#57534E', marginBottom: 10 }}>Theme color</label>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {['#0D9488','#6366F1','#EC4899','#F59E0B','#10B981','#EF4444','#3B82F6','#8B5CF6'].map(c => (
          <div key={c} onClick={() => onChange({ themeColor: c })} style={{
            width: 36, height: 36, borderRadius: '50%', background: c, cursor: 'pointer',
            border: data.themeColor === c ? `3px solid ${DARK}` : '3px solid transparent',
            transform: data.themeColor === c ? 'scale(1.2)' : 'scale(1)',
          }} />
        ))}
      </div>
    </div>
    <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
      <Btn variant="ghost" onClick={onBack} style={{ flex: 1 }}>← Back</Btn>
      <Btn onClick={onNext} disabled={!data.waNumber} style={{ flex: 2 }}>Continue →</Btn>
    </div>
  </div>
)

const StepProducts = ({ data, onChange, onNext, onBack }) => {
  const products = data.products || [{ name: '', description: '', price: '', emoji: '🛍️' }]
  const updateProduct = (i, field, value) => {
    onChange({ products: products.map((p, idx) => idx === i ? { ...p, [field]: value } : p) })
  }
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: DARK, margin: '0 0 6px' }}>Your products</h2>
      <p style={{ color: '#78716C', fontSize: 14, marginTop: 0, marginBottom: 24 }}>Add up to 12 items</p>
      {products.map((product, i) => (
        <div key={i} style={{ background: '#fff', border: '1.5px solid #E7E5E4', borderRadius: 14, padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#A8A29E', flex: 1 }}>ITEM {i + 1}</div>
            {products.length > 1 && (
              <button onClick={() => onChange({ products: products.filter((_, idx) => idx !== i) })}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: 18, padding: 0 }}>✕</button>
            )}
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#57534E', marginBottom: 8 }}>Icon</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {PRODUCT_EMOJIS.map(em => (
                <span key={em} onClick={() => updateProduct(i, 'emoji', em)} style={{
                  fontSize: 20, cursor: 'pointer', padding: 4, borderRadius: 8,
                  background: product.emoji === em ? `${TEAL}22` : 'transparent',
                  border: product.emoji === em ? `1.5px solid ${TEAL}` : '1.5px solid transparent',
                }}>{em}</span>
              ))}
            </div>
          </div>
          <Input placeholder="Product name *" value={product.name} onChange={e => updateProduct(i, 'name', e.target.value)} />
          <Textarea placeholder="Short description (optional)" value={product.description} onChange={e => updateProduct(i, 'description', e.target.value)} />
          <Input placeholder={`Price (${data.currency || 'AED'})`} value={product.price} onChange={e => updateProduct(i, 'price', e.target.value)} />
        </div>
      ))}
      {products.length < 12 && (
        <button onClick={() => onChange({ products: [...products, { name: '', description: '', price: '', emoji: '🛍️' }] })}
          style={{ width: '100%', padding: 12, border: `2px dashed ${TEAL}`, borderRadius: 14, background: 'transparent', color: TEAL, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 20 }}>
          + Add another item
        </button>
      )}
      <div style={{ display: 'flex', gap: 10 }}>
        <Btn variant="ghost" onClick={onBack} style={{ flex: 1 }}>← Back</Btn>
        <Btn onClick={onNext} disabled={!products.some(p => p.name)} style={{ flex: 2 }}>Preview my store →</Btn>
      </div>
    </div>
  )
}

const StepPreview = ({ data, onBack, savedSlug, saving, error }) => {
  const [copied, setCopied] = useState(false)
  const storeUrl = savedSlug ? `https://getsouk.app/${savedSlug}` : null

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: DARK, margin: '0 0 6px' }}>
        {savedSlug ? '🎉 Your store is live!' : 'Saving your store...'}
      </h2>
      <p style={{ color: '#78716C', fontSize: 14, marginTop: 0, marginBottom: 20 }}>
        {savedSlug ? 'Share the link — customers can message you directly on WhatsApp' : 'Just a moment...'}
      </p>

      {saving && (
        <div style={{ textAlign: 'center', padding: 32, color: TEAL, fontWeight: 600 }}>Setting up your store...</div>
      )}

      {error && (
        <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 12, padding: 16, marginBottom: 20, color: '#dc2626' }}>
          {error}
        </div>
      )}

      {savedSlug && storeUrl && (
        <>
          <div style={{ background: `${TEAL}11`, border: `1.5px solid ${TEAL}33`, borderRadius: 14, padding: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, marginBottom: 8 }}>YOUR STORE LINK</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{
                flex: 1, background: '#fff', borderRadius: 10, padding: '10px 14px',
                fontSize: 14, color: DARK, fontWeight: 600, border: '1.5px solid #E7E5E4',
                overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
              }}>🔗 getsouk.app/{savedSlug}</div>
              <Btn onClick={() => {
                navigator.clipboard?.writeText(storeUrl).catch(() => {})
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }} variant={copied ? 'ghost' : 'primary'} style={{ padding: '10px 16px', fontSize: 13 }}>
                {copied ? '✓ Copied!' : 'Copy'}
              </Btn>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#57534E', marginBottom: 12 }}>Share your store</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href={`https://wa.me/?text=Check%20out%20my%20store%3A%20${encodeURIComponent(storeUrl)}`}
                target="_blank" rel="noreferrer"
                style={{ flex: 1, textAlign: 'center', background: '#25D366', color: '#fff', padding: 12, borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
                💬 WhatsApp
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"
                style={{ flex: 1, textAlign: 'center', background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: '#fff', padding: 12, borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
                📸 Instagram
              </a>
            </div>
          </div>

          <a href={`/${savedSlug}`} target="_blank" rel="noreferrer"
            style={{ display: 'block', textAlign: 'center', background: '#f3f4f6', color: DARK, padding: '12px 0', borderRadius: 10, textDecoration: 'none', fontWeight: 600, marginBottom: 12 }}>
            👁 View your store
          </a>
        </>
      )}

      <Btn variant="ghost" onClick={onBack} style={{ width: '100%' }}>← Edit store</Btn>
    </div>
  )
}

// ─── Main builder ─────────────────────────────────────────────────────────────
const STEPS = ['Store info', 'Contact', 'Products', 'Go live!']

export default function SoukBuilder() {
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [savedSlug, setSavedSlug] = useState(null)
  const [saveError, setSaveError] = useState(null)
  const [data, setData] = useState({
    storeName: '', tagline: '', category: 'Fashion & Clothing',
    instagramHandle: '', waPrefix: '+971', waNumber: '',
    currency: 'AED', themeColor: TEAL,
    products: [{ name: '', description: '', price: '', emoji: '👗' }],
  })

  const update = patch => setData(d => ({ ...d, ...patch }))

  const saveStore = async () => {
    setSaving(true)
    setSaveError(null)
    try {
      const baseSlug = slugify(data.storeName)
      let slug = baseSlug
      // Check slug uniqueness
      const { data: existing } = await supabase.from('stores').select('slug').eq('slug', slug).single()
      if (existing) slug = baseSlug + '-' + Date.now().toString(36)

      const { data: store, error: storeError } = await supabase
        .from('stores')
        .insert([{
          name: data.storeName,
          slug,
          tagline: data.tagline || null,
          category: data.category,
          instagram_handle: data.instagramHandle || null,
          wa_prefix: data.waPrefix,
          wa_number: data.waNumber,
          currency: data.currency,
          theme_color: data.themeColor,
        }])
        .select()
        .single()

      if (storeError) throw storeError

      const validProducts = data.products.filter(p => p.name)
      if (validProducts.length > 0) {
        const { error: productsError } = await supabase
          .from('products')
          .insert(validProducts.map(p => ({
            store_id: store.id,
            name: p.name,
            description: p.description || null,
            price: p.price || null,
            emoji: p.emoji || '🛍️',
          })))
        if (productsError) throw productsError
      }

      setSavedSlug(slug)
    } catch (err) {
      setSaveError('Something went wrong. Please try again. ' + (err.message || ''))
    } finally {
      setSaving(false)
    }
  }

  const handleGoLive = () => {
    setStep(3)
    saveStore()
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: BG, minHeight: '100vh' }}>
      <div style={{
        background: '#fff', borderBottom: '1px solid #F0EFEE', padding: '14px 20px',
        display: 'flex', alignItems: 'center', gap: 10, position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ fontWeight: 900, fontSize: 22, color: TEAL, letterSpacing: '-0.5px' }}>souk</div>
        <div style={{ width: 1, height: 18, background: '#E7E5E4' }} />
        <div style={{ fontSize: 13, color: '#A8A29E' }}>Your shop in 60 seconds</div>
        {savedSlug && (
          <a href={`/${savedSlug}`} target="_blank" rel="noreferrer"
            style={{ marginLeft: 'auto', background: TEAL, borderRadius: 8, color: '#fff', padding: '7px 16px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
            👁 View store
          </a>
        )}
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '32px 20px 64px' }}>
        <Steps current={step} total={STEPS.length} />
        {step === 0 && <StepStoreInfo data={data} onChange={update} onNext={() => setStep(1)} />}
        {step === 1 && <StepContact data={data} onChange={update} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
        {step === 2 && <StepProducts data={data} onChange={update} onNext={handleGoLive} onBack={() => setStep(1)} />}
        {step === 3 && <StepPreview data={data} onBack={() => setStep(2)} savedSlug={savedSlug} saving={saving} error={saveError} />}
      </div>

      {step < 3 && data.storeName && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff',
          borderTop: '1px solid #E7E5E4', padding: '10px 20px',
          display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
        }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: data.themeColor || TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🛍️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: DARK }}>{data.storeName}</div>
            {data.tagline && <div style={{ fontSize: 12, color: '#A8A29E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.tagline}</div>}
          </div>
          <span style={{ fontSize: 12, color: TEAL, fontWeight: 600 }}>Building...</span>
        </div>
      )}
    </div>
  )
}
