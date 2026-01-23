import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'QR Code Builder',
  description: 'Built by Appeland',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://qr-codebuilder.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Adsense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5067440394652005"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SKRKFH63XR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SKRKFH63XR');
          `}
        </Script>

        {/* JSON-LD Schema */}
        <Script id="schema-json" type="application/ld+json" strategy="afterInteractive">
          {`
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "QR Code Builder",
            "url": "https://qr-codebuilder.com/",
            "description": "Free online QR code generator to create QR codes for any Websites, links, URLs, text, phone numbers, or emails instantly.",
            "applicationCategory": "Utility",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
          `}
        </Script>

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://qr-codebuilder.com" />

        {/* Meta description */}
        <meta
          name="description"
          content="Create Free QR codes for Websites, text, phone numbers, emails instantly. 100% free QR Code Generator with no signup required."
        />
