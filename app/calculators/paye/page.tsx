import type { Metadata } from 'next';
import { PayeClient } from './paye-client';

export const metadata: Metadata = {
  title: 'PAYE Calculator Kenya 2026',
  description:
    'Calculate Kenya PAYE, SHA, NSSF, Affordable Housing Levy, tax reliefs, and estimated net pay from your monthly gross salary.',
  alternates: { canonical: '/calculators/paye' },
  keywords: [
    'PAYE calculator Kenya',
    'Kenya net pay calculator',
    'KRA PAYE calculator',
    'salary calculator Kenya',
    'SHA NSSF PAYE calculator',
  ],
  openGraph: {
    title: 'PAYE Calculator Kenya 2026 | EasyGov Kenya',
    description: 'Estimate PAYE, SHA, NSSF, Affordable Housing Levy, tax reliefs, and net pay.',
    url: 'https://easygov.co.ke/calculators/paye',
    type: 'website',
    siteName: 'EasyGov Kenya',
    locale: 'en_KE',
  },
};

export default function PAYECalculatorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'PAYE Calculator Kenya',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: 'https://easygov.co.ke/calculators/paye',
    description: metadata.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PayeClient />
    </>
  );
}
