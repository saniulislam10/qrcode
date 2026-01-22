import type { Metadata } from 'next'
import './globals.css'
import Script from "next/script";
export const metadata: Metadata = {
  title: 'QR Builder',
  description: 'Built by Appeland',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1DQH49VWLB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1DQH49VWLB');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}

