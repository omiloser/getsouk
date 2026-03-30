import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const TEAL = '#0D9488'
const AMBER = '#F59E0B'

export const metadata = {
  title: 'Browse Stores | Souk',
  description: 'Discover Instagram and WhatsApp sellers across the UAE and MENA.',
}

export default async function StoresPage({ searchParams }) {
  const category = searchParams?.category || null
  const search = searchParams?.search || null

  let query = supabase
    .from('stores')
    .select('id, name, slug, tagline, category, theme_color, instagram_handle')
    .order('created_at', { ascending: false })
    .limit(60)

  if (category) query = query.eq('category', category)
  if (search) query = query.ilike('name', `%${search}%`)

  const { data: stores } = await query

  const categories = [
    'Fashion & Clothing', 'Accessories & Jewellery', 'Beauty & Skincare',
    'Home Decor', 'Food & Sweets', 'Art & Prints', 'Kids & Toys', 'Other',
  ]

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', background: '#FAFAF9', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 24px', borderBottom: '1px solid #f0f0f0', background: '#fff',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: TEAL, textDecoration: 'none' }}>souk</Link>
        <Link href="/builder" style={{
          background: TEAL, color: '#fff', padding: '8px 18px',
          borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14,
        }}>
          Open your store
        </Link>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Browse stores</h1>
        <p style={{ color: '#666', marginBottom: 32 }}>Discover sellers across UAE and MENA</p>

        {/* Search */}
        <form method="GET" style={{ marginBottom: 24, display: 'flex', gap: 10 }}>
          <input
            name="search"
            defaultValue={search || ''}
            placeholder="Search stores..."
            style={{
              flex: 1, padding: '10px 16px', borderRadius: 10,
              border: '1.5px solid #D6D3D1', fontSize: 14, outline: 'none',
            }}
          />
          <button type="submit" style={{
            background: TEAL, color: '#fff', border: 'none',
            padding: '10px 20px', borderRadius: 10, fontWeight: 600, cursor: 'pointer',
          }}>Search</button>
        </form>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          <Link href="/stores" style={{
            padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600,
            background: !category ? TEAL : '#f3f4f6',
            color: !category ? '#fff' : '#555',
            textDecoration: 'none',
          }}>All</Link>
          {categories.map(cat => (
            <Link key={cat} href={`/stores?category=${encodeURIComponent(cat)}`} style={{
              padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600,
              background: category === cat ? TEAL : '#f3f4f6',
              color: category === cat ? '#fff' : '#555',
              textDecoration: 'none',
            }}>{cat}</Link>
          ))}
        </div>

        {/* Grid */}
        {stores && stores.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
            {stores.map(store => (
              <Link key={store.id} href={`/${store.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#fff', borderRadius: 16, overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}>
                  <div style={{
                    height: 80,
                    background: `linear-gradient(135deg, ${store.theme_color || TEAL}, ${store.theme_color || TEAL}88)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 32,
                  }}>🛍️</div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#1C1917', marginBottom: 4 }}>{store.name}</div>
                    {store.tagline && (
                      <div style={{ fontSize: 12, color: '#78716C', marginBottom: 8, lineHeight: 1.4 }}>{store.tagline}</div>
                    )}
                    {store.category && (
                      <span style={{
                        background: '#f3f4f6', color: '#555',
                        padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600,
                      }}>{store.category}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '64px 0', color: '#A8A29E' }}>
            <div style={{ fontSize: 48 }}>🛍️</div>
            <p style={{ marginTop: 16, fontSize: 18 }}>No stores yet. Be the first!</p>
            <Link href="/builder" style={{
              display: 'inline-block', marginTop: 16,
              background: TEAL, color: '#fff', padding: '12px 28px',
              borderRadius: 10, textDecoration: 'none', fontWeight: 700,
            }}>Open your store</Link>
          </div>
        )}
      </div>
    </main>
  )
}
