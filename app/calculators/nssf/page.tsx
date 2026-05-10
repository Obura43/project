'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function NSSFCalculator() {
  const [pensionableEarnings, setPensionableEarnings] = useState('');
  const [result, setResult] = useState<{
    employeeContribution: number;
    employerContribution: number;
    totalContribution: number;
  } | null>(null);

  function calculate() {
    const earnings = parseFloat(pensionableEarnings) || 0;
    // NSSF rates - confirm current statutory rates officially
    // Tier I: First 7,000 at 6%
    // Tier II: Next 29,000 (7,001 - 36,000) at 6%
    const tier1Cap = 7000;
    const tier2Cap = 36000;
    const rate = 0.06;

    let employeeContribution = 0;
    if (earnings <= tier1Cap) {
      employeeContribution = earnings * rate;
    } else if (earnings <= tier2Cap) {
      employeeContribution = tier1Cap * rate + (earnings - tier1Cap) * rate;
    } else {
      employeeContribution = tier1Cap * rate + (tier2Cap - tier1Cap) * rate;
    }

    const employerContribution = employeeContribution; // Same rate for employer
    const totalContribution = employeeContribution + employerContribution;

    setResult({
      employeeContribution: Math.round(employeeContribution),
      employerContribution: Math.round(employerContribution),
      totalContribution: Math.round(totalContribution),
    });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/calculators" className="hover:text-primary">Calculators</Link>
        <span>/</span>
        <span className="text-foreground">NSSF Calculator</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">NSSF Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          Estimate your NSSF employee and employer contributions based on pensionable earnings.
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
            <Label htmlFor="earnings">Monthly Pensionable Earnings (KES)</Label>
            <Input
              id="earnings"
              type="number"
              placeholder="e.g. 30000"
              value={pensionableEarnings}
              onChange={(e) => setPensionableEarnings(e.target.value)}
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate NSSF
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
                <span className="text-muted-foreground">Pensionable Earnings</span>
                <span className="font-semibold">KES {parseFloat(pensionableEarnings).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Employee Contribution (6%)</span>
                <span className="font-semibold">KES {result.employeeContribution.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Employer Contribution (6%)</span>
                <span className="font-semibold">KES {result.employerContribution.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base">
                <span className="font-semibold">Total Monthly Contribution</span>
                <span className="font-bold text-primary">KES {result.totalContribution.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> NSSF rates and tiers may change. Confirm current statutory rates on the official NSSF website or with your employer.
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
