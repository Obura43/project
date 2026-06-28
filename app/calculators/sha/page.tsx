import type { Metadata } from 'next';
import { ShaClient } from './sha-client';

export const metadata: Metadata = {
  title: 'SHA Contribution Calculator Kenya 2026',
  description:
    'Calculate your estimated monthly SHA contribution in Kenya using income at 2.75% with the minimum contribution applied.',
  alternates: { canonical: '/calculators/sha' },
  keywords: ['SHA calculator Kenya', 'Social Health Authority contribution', 'SHIF calculator Kenya', 'SHA 2.75%'],
  openGraph: {
    title: 'SHA Contribution Calculator Kenya | EasyGov Kenya',
    description: 'Estimate your monthly Social Health Authority contribution in Kenya.',
    url: 'https://easygov.co.ke/calculators/sha',
    type: 'website',
    siteName: 'EasyGov Kenya',
    locale: 'en_KE',
  },
};

export default function SHACalculatorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'SHA Contribution Calculator Kenya',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: 'https://easygov.co.ke/calculators/sha',
    description: metadata.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ShaClient />
    </>
  );
}
