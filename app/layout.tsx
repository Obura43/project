import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: {
    default: 'EasyGov Kenya - Simple Guides for Kenyan Government Services',
    template: '%s | EasyGov Kenya',
  },
  description:
    'EasyGov Kenya helps you understand Kenyan government services in plain language — from passports and KRA returns to HELB, business registration, driving licenses, and more.',
  metadataBase: new URL('https://easygov.co.ke'),
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://easygov.co.ke',
    siteName: 'EasyGov Kenya',
    title: 'EasyGov Kenya - Simple Guides for Kenyan Government Services',
    description:
      'EasyGov Kenya helps you understand Kenyan government services in plain language.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyGov Kenya - Simple Guides for Kenyan Government Services',
    description:
      'EasyGov Kenya helps you understand Kenyan government services in plain language.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6621272459770552"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Header />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
