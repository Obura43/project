import type { Metadata } from 'next';
import { AffordableHousingLevyClient } from './ahl-client';

export const metadata: Metadata = {
  title: 'Affordable Housing Levy Calculator Kenya 2026',
  description:
    'Calculate Kenya Affordable Housing Levy for employees and employers, including estimated tax relief from monthly gross salary.',
  alternates: { canonical: '/calculators/affordable-housing-levy' },
  keywords: [
    'Affordable Housing Levy calculator Kenya',
    'AHL calculator Kenya',
    'housing levy Kenya',
    'employee housing levy',
    'employer housing levy',
  ],
  openGraph: {
    title: 'Affordable Housing Levy Calculator Kenya | EasyGov Kenya',
    description: 'Estimate employee levy, employer levy, total levy, and tax relief from gross salary.',
    url: 'https://easygov.co.ke/calculators/affordable-housing-levy',
    type: 'website',
    siteName: 'EasyGov Kenya',
    locale: 'en_KE',
  },
};

export default function AffordableHousingLevyPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Affordable Housing Levy Calculator Kenya',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: 'https://easygov.co.ke/calculators/affordable-housing-levy',
    description: metadata.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AffordableHousingLevyClient />
    </>
  );
}
