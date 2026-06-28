import type { Metadata } from 'next';
import { BusinessRegistrationClient } from './business-registration-client';

export const metadata: Metadata = {
  title: 'Business Registration Cost Estimator Kenya 2026',
  description:
    'Estimate business name, company, partnership, and LLP registration costs in Kenya, including common BRS document requirements.',
  alternates: { canonical: '/calculators/business-registration' },
  keywords: [
    'business registration cost Kenya',
    'BRS fees Kenya',
    'business name registration cost',
    'company registration fee Kenya',
  ],
  openGraph: {
    title: 'Business Registration Cost Estimator Kenya | EasyGov Kenya',
    description: 'Estimate BRS registration costs and common document requirements before applying.',
    url: 'https://easygov.co.ke/calculators/business-registration',
    type: 'website',
    siteName: 'EasyGov Kenya',
    locale: 'en_KE',
  },
};

export default function BusinessRegistrationPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Business Registration Cost Estimator Kenya',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://easygov.co.ke/calculators/business-registration',
    description: metadata.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BusinessRegistrationClient />
    </>
  );
}
