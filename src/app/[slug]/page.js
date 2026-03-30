import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const TEAL = '#0D9488'
const AMBER = '#F59E0B'

export async function generateMetadata({ params }) {
  const { data: store } = await supabase
    .from('stores')
    .select('name, tagline')
    .eq('slug', params.slug)
    .single()
  if (!store) return { title: 'Store not found' }
  return {
    title: store.name + ' | Souk',
    description: store.tagline || 'Shop on Souk',
  }
}

export default async function StorePage({ params }) {
  const { data: store } = await supabase
    .from('stores')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!store) notFound()

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', store.id)
    .order('created_at', { ascending: true })

  const color = store.theme_color || TEAL

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', background: '#FAFAF9', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        padding: '32px 20px 28px',
        textAlign: 'center',
        color: '#fff',
      }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🛍️</div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>{store.name}</h1>
        {store.tagline && <p style={{ margin: '8px 0 0', opacity: 0.9, fontSize: 14 }}>{store.tagline}</p>}
        {store.category && (
          <span style={{
            display: 'inline-block', marginTop: 10,
            background: 'rgba(255,255,255,0.2)', padding: '4px 14px',
            borderRadius: 100, fontSize: 12, fontWeight: 600,
          }}>{store.category}</span>
        )}
        {store.instagram_handle && (
          <div style={{ marginTop: 12 }}>
            <a
              href={`https://instagram.com/${store.instagram_handle.replace('@','')}`}
              target="_blank" rel="noreferrer"
              style={{ color: '#fff', fontSize: 13, opacity: 0.85, textDecoration: 'none' }}
            >
              📸 @{store.instagram_handle.replace('@','')}
            </a>
          </div>
        )}
      </div>

      {/* Products */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px' }}>
        {products && products.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
            {products.map(product => {
              const waNumber = (store.wa_prefix || '+971').replace('+','') + (store.wa_number || '')
              const msg = encodeURIComponent(`Hi! I'm interested in "${product.name}" from ${store.name}. Is it available?`)
              const waUrl = `https://wa.me/${waNumber}?text=${msg}`
              return (
                <div key={product.id} style={{
                  background: '#fff', borderRadius: 16, overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                }}>
                  <div style={{
                    height: 140,
                    background: `linear-gradient(135deg, ${color}22, ${AMBER}22)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 52,
                  }}>
                    {product.emoji || '🛍️'}
                  </div>
                  <div style={{ padding: '12px 14px 14px' }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{product.name}</div>
                    {product.description && (
                      <div style={{ fontSize: 12, color: '#78716C', marginBottom: 8, lineHeight: 1.4 }}>
                        {product.description}
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: 16, color }}>{store.currency} {product.price}</span>
                      <a
                        href={waUrl}
                        target="_blank" rel="noreferrer"
                        style={{
                          background: '#25D366', color: '#fff', borderRadius: 8,
                          padding: '6px 10px', fontSize: 12, fontWeight: 700,
                          textDecoration: 'none',
                        }}
                      >
                        💬 Ask
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#A8A29E' }}>
            <div style={{ fontSize: 40 }}>📦</div>
            <p style={{ marginTop: 12 }}>No products yet</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px 16px 40px', color: '#A8A29E', fontSize: 12 }}>
        Built with{' '}
        <a href="https://getsouk.app" style={{ color: TEAL, textDecoration: 'none', fontWeight: 700 }}>
          Souk
        </a>
        {' '}· <Link href="/stores" style={{ color: '#A8A29E' }}>Browse all stores</Link>
      </div>
    </main>
  )
}
