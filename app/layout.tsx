import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QR Builder',
  description: 'Built by Appeland',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <!-- Google tag (gtag.js) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-1DQH49VWLB"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-1DQH49VWLB');
      </script>
      <body>{children}</body>
    </html>
  )
}
