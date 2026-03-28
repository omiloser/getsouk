import './globals.css'
export const metadata = {
  title: 'Souk – Build Your Free Online Store',
  description: 'Create a beautiful storefront for your Instagram or WhatsApp shop in minutes. Free for MENA sellers.',
  keywords: 'online store, Instagram shop, WhatsApp shop, UAE, MENA, storefront builder',
  openGraph: { title: 'Souk – Build Your Free Online Store', description: 'Create a beautiful storefront for your Instagram or WhatsApp shop in minutes.', url: 'https://getsouk.app', siteName: 'Souk', locale: 'en_AE', type: 'website' },
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
