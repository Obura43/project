'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { calculateSha, KENYA_PAYROLL_LAST_REVIEWED, SHA_MINIMUM, SHA_RATE } from '@/lib/kenya-calculators';

export function ShaClient() {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const income = parseFloat(monthlyIncome) || 0;
  const contribution = calculateSha(income);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/calculators" className="hover:text-primary">Calculators</Link>
        <span>/</span>
        <span className="text-foreground">SHA Calculator</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">SHA Contribution Calculator Kenya</h1>
        <p className="mt-2 text-muted-foreground">
          Estimate your monthly Social Health Authority contribution using income at 2.75%, subject to the minimum contribution.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">Rates reviewed: {KENYA_PAYROLL_LAST_REVIEWED}</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-primary" />
            Enter Monthly Income
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="income">Monthly Income (KES)</Label>
            <Input id="income" type="number" min="0" placeholder="e.g. 50000" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Estimated Monthly Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monthly Income</span>
              <span className="font-semibold">KES {income.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rate Used</span>
              <span className="font-semibold">{(SHA_RATE * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Minimum Contribution</span>
              <span className="font-semibold">KES {SHA_MINIMUM.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between gap-4 text-base">
              <span className="font-semibold">Estimated SHA Contribution</span>
              <span className="text-right font-bold text-primary">KES {contribution.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> SHA contribution rules can change. Confirm the final payable amount on official SHA channels or through your employer before paying.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Button asChild variant="ghost">
          <Link href="/calculators"><ArrowLeft className="mr-2 h-4 w-4" />Back to Calculators</Link>
        </Button>
      </div>
    </div>
  );
}
