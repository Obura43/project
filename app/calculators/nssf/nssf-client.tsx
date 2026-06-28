'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  calculateNssf,
  KENYA_PAYROLL_LAST_REVIEWED,
  NSSF_LOWER_EARNINGS_LIMIT,
  NSSF_RATE,
  NSSF_UPPER_EARNINGS_LIMIT,
} from '@/lib/kenya-calculators';

export function NssfClient() {
  const [pensionableEarnings, setPensionableEarnings] = useState('');
  const earnings = parseFloat(pensionableEarnings) || 0;
  const result = calculateNssf(earnings);

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
        <h1 className="text-3xl font-bold text-foreground">NSSF Calculator Kenya</h1>
        <p className="mt-2 text-muted-foreground">
          Estimate employee and employer NSSF contributions by Tier I and Tier II pensionable earnings.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">Rates reviewed: {KENYA_PAYROLL_LAST_REVIEWED}</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-primary" />
            Enter Pensionable Earnings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="earnings">Monthly Pensionable Earnings (KES)</Label>
            <Input id="earnings" type="number" min="0" placeholder="e.g. 100000" value={pensionableEarnings} onChange={(e) => setPensionableEarnings(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Estimated Monthly Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <ResultRow label="Pensionable Earnings" value={result.pensionableEarnings} />
            <ResultRow label="Tier I Employee Contribution" value={result.tier1Contribution} />
            <ResultRow label="Tier II Employee Contribution" value={result.tier2Contribution} />
            <ResultRow label="Total Employee Contribution" value={result.employeeContribution} />
            <ResultRow label="Employer Contribution" value={result.employerContribution} />
            <Separator />
            <div className="flex justify-between gap-4 text-base">
              <span className="font-semibold">Total Monthly NSSF</span>
              <span className="text-right font-bold text-primary">KES {result.totalContribution.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Rates Used</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Employee rate: {(NSSF_RATE * 100).toFixed(0)}%. Employer rate: {(NSSF_RATE * 100).toFixed(0)}%.</p>
          <p>Lower earnings limit: KES {NSSF_LOWER_EARNINGS_LIMIT.toLocaleString()}. Upper earnings limit: KES {NSSF_UPPER_EARNINGS_LIMIT.toLocaleString()}.</p>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> NSSF rates and earnings limits may change. Confirm current statutory payroll rates with NSSF, KRA guidance, or your employer.
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

function ResultRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-semibold">KES {value.toLocaleString()}</span>
    </div>
  );
}
