import type { Metadata } from 'next';
import { PassportFeeClient } from './passport-fee-client';

export const metadata: Metadata = {
  title: 'Kenyan Passport Fee Estimator 2026',
  description:
    'Estimate Kenyan passport application fees for 34-page, 50-page, 66-page, diplomatic, lost, and mutilated passport applications.',
  alternates: { canonical: '/calculators/passport-fee' },
  keywords: ['Kenya passport fees', 'passport fee calculator Kenya', 'eCitizen passport fees', 'Kenyan passport application fee'],
  openGraph: {
    title: 'Kenyan Passport Fee Estimator | EasyGov Kenya',
    description: 'Estimate passport application fees and common document requirements before applying.',
    url: 'https://easygov.co.ke/calculators/passport-fee',
    type: 'website',
    siteName: 'EasyGov Kenya',
    locale: 'en_KE',
  },
};

export default function PassportFeePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Kenyan Passport Fee Estimator',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    url: 'https://easygov.co.ke/calculators/passport-fee',
    description: metadata.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PassportFeeClient />
    </>
  );
}
