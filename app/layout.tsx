import type { Metadata } from 'next'
import './globals.css'
import Script from "next/script";
export const metadata: Metadata = {
  title: 'QR Code Builder',
  description: 'Built by Appeland',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5067440394652005"
     crossorigin="anonymous"></script>
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
      </head>
      <body>{children}</body>
    </html>
  );
}

