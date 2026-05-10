'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function SHACalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [result, setResult] = useState<{ contribution: number } | null>(null);

  function calculate() {
    const income = parseFloat(monthlyIncome) || 0;
    // SHA contribution rates are subject to change - these are placeholder estimates
    // Confirm on official SHA sources
    let contribution = 0;
    if (income <= 0) contribution = 0;
    else if (income <= 2999) contribution = 300;
    else if (income <= 5999) contribution = 500;
    else if (income <= 9999) contribution = 800;
    else if (income <= 14999) contribution = 1200;
    else if (income <= 19999) contribution = 1500;
    else if (income <= 24999) contribution = 1800;
    else if (income <= 34999) contribution = 2500;
    else if (income <= 49999) contribution = 3500;
    else if (income <= 74999) contribution = 5000;
    else if (income <= 99999) contribution = 7500;
    else contribution = Math.min(income * 0.025, 10000);

    setResult({ contribution: Math.round(contribution) });
  }

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
        <h1 className="text-3xl font-bold text-foreground">SHA Contribution Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          Estimate your Social Health Authority contribution based on your monthly income.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-primary" />
            Enter Your Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="income">Monthly Income (KES)</Label>
            <Input
              id="income"
              type="number"
              placeholder="e.g. 50000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate SHA Contribution
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="mb-6 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Estimated Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly Income</span>
                <span className="font-semibold">KES {parseFloat(monthlyIncome).toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base">
                <span className="font-semibold">Estimated SHA Contribution</span>
                <span className="font-bold text-primary">KES {result.contribution.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> SHA rules and contribution rates may change. These are estimates based on publicly available information. Confirm your actual contribution on official SHA sources.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Button asChild variant="ghost">
          <Link href="/calculators">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculators
          </Link>
        </Button>
      </div>
    </div>
  );
}
