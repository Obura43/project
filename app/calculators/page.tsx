import Link from 'next/link';
import type { Metadata } from 'next';
import { Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { calculators } from '@/data/calculators';

export const metadata: Metadata = {
  title: 'Kenya Government Calculators',
  description:
    'Use EasyGov Kenya calculators to estimate PAYE, SHA, NSSF, Affordable Housing Levy, passport fees, and business registration costs.',
  alternates: {
    canonical: '/calculators',
  },
  keywords: [
    'Kenya government calculators',
    'PAYE calculator Kenya',
    'SHA calculator Kenya',
    'NSSF calculator Kenya',
    'Affordable Housing Levy calculator',
    'passport fee calculator Kenya',
    'business registration cost Kenya',
  ],
  openGraph: {
    title: 'Kenya Government Calculators | EasyGov Kenya',
    description:
      'Estimate Kenyan payroll deductions, public service fees, and registration costs with plain-language calculators.',
    url: 'https://easygov.co.ke/calculators',
    type: 'website',
    siteName: 'EasyGov Kenya',
    locale: 'en_KE',
  },
};

export default function CalculatorsPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Kenya Government Calculators',
    description: metadata.description,
    url: 'https://easygov.co.ke/calculators',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: calculators.map((calc, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: calc.title,
        description: calc.description,
        url: `https://easygov.co.ke/calculators/${calc.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Kenya Government Calculators</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Estimate Kenyan payroll deductions, health contributions, pension contributions, public service fees, and registration costs. Results are planning estimates only; always confirm final amounts with official sources.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calc) => (
            <Link key={calc.slug} href={`/calculators/${calc.slug}`} className="group">
              <Card className="h-full transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    {calc.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{calc.description}</CardDescription>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {calc.badges.map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> These calculators provide estimates for general guidance only. They are not a substitute for official calculations from KRA, SHA, NSSF, Immigration, BRS, your employer, or a qualified professional.
          </p>
        </div>
      </div>
    </>
  );
}
