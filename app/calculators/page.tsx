import Link from 'next/link';
import type { Metadata } from 'next';
import { Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { calculators } from '@/data/calculators';

export const metadata: Metadata = {
  title: 'Government Calculators',
  description: 'Estimate your taxes, contributions, and fees with EasyGov Kenya calculators.',
};

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Government Calculators</h1>
        <p className="mt-2 text-muted-foreground">
          Use these tools to estimate your taxes, contributions, and fees. Results are estimates only — always confirm with official sources.
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
          <strong>Disclaimer:</strong> These calculators provide estimates for general guidance only. They are not a substitute for official calculations from KRA, SHA, NSSF, Immigration, or BRS. Always confirm amounts on official government portals.
        </p>
      </div>
    </div>
  );
}
