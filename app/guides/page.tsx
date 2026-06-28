import type { Metadata } from 'next';
import { guides } from '@/data/guides';
import { GuidesClient } from './guides-client';

export const metadata: Metadata = {
  title: 'Kenya Government Service Guides',
  description:
    'Browse step-by-step Kenyan government service guides for eCitizen, KRA, passports, national ID, HELB, NTSA, SHA, CRB, and business registration.',
  alternates: {
    canonical: '/guides',
  },
  keywords: [
    'Kenya government service guides',
    'eCitizen guides',
    'KRA guides Kenya',
    'Kenyan passport application',
    'Kenya national ID',
    'HELB application',
    'NTSA services',
    'SHA Kenya',
  ],
  openGraph: {
    title: 'Kenya Government Service Guides | EasyGov Kenya',
    description:
      'Plain-language Kenyan government service guides with steps, checklists, mistakes to avoid, FAQs, and official-source reminders.',
    url: 'https://easygov.co.ke/guides',
    type: 'website',
    siteName: 'EasyGov Kenya',
    locale: 'en_KE',
  },
  twitter: {
    card: 'summary',
    title: 'Kenya Government Service Guides | EasyGov Kenya',
    description:
      'Find step-by-step guides for eCitizen, KRA, passports, HELB, NTSA, SHA, CRB, and more.',
  },
};

export default function GuidesPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Kenya Government Service Guides',
    description:
      'Step-by-step guides, checklists, common mistakes, and FAQs for Kenyan government services.',
    url: 'https://easygov.co.ke/guides',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: guides.map((guide, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://easygov.co.ke/guides/${guide.slug}`,
        name: guide.title,
        description: guide.metaDescription,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <GuidesClient />
    </>
  );
}
