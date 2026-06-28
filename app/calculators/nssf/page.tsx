import type { Metadata } from 'next';
import { NssfClient } from './nssf-client';

export const metadata: Metadata = {
  title: 'NSSF Calculator Kenya 2026',
  description:
    'Calculate Kenya NSSF employee and employer contributions using Tier I and Tier II pensionable earnings limits.',
  alternates: { canonical: '/calculators/nssf' },
  keywords: ['NSSF calculator Kenya', 'NSSF contribution calculator', 'NSSF Tier I Tier II', 'Kenya payroll calculator'],
  openGraph: {
    title: 'NSSF Calculator Kenya | EasyGov Kenya',
    description: 'Estimate employee and employer NSSF contributions by Tier I and Tier II.',
    url: 'https://easygov.co.ke/calculators/nssf',
    type: 'website',
    siteName: 'EasyGov Kenya',
    locale: 'en_KE',
  },
};

export default function NSSFCalculatorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'NSSF Calculator Kenya',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: 'https://easygov.co.ke/calculators/nssf',
    description: metadata.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <NssfClient />
    </>
  );
}
