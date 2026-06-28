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
  AFFORDABLE_HOUSING_LEVY_RATE,
  AFFORDABLE_HOUSING_RELIEF_RATE,
  calculateAffordableHousingLevy,
  KENYA_PAYROLL_LAST_REVIEWED,
} from '@/lib/kenya-calculators';

export function AffordableHousingLevyClient() {
  const [grossSalary, setGrossSalary] = useState('');
  const gross = parseFloat(grossSalary) || 0;
  const result = calculateAffordableHousingLevy(gross);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/calculators" className="hover:text-primary">Calculators</Link>
        <span>/</span>
        <span className="text-foreground">Affordable Housing Levy</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Affordable Housing Levy Calculator Kenya</h1>
        <p className="mt-2 text-muted-foreground">
          Estimate the employee deduction, employer contribution, total levy, and related tax relief from monthly gross pay.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">Rates reviewed: {KENYA_PAYROLL_LAST_REVIEWED}</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-primary" />
            Enter Gross Salary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="gross">Gross Monthly Salary (KES)</Label>
          <Input id="gross" type="number" min="0" placeholder="e.g. 100000" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} />
        </CardContent>
      </Card>

      <Card className="mb-6 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Estimated Monthly Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <ResultRow label="Gross Salary" value={gross} />
            <ResultRow label="Employee Levy" value={result.employeeLevy} />
            <ResultRow label="Employer Levy" value={result.employerLevy} />
            <ResultRow label="Estimated Employee Tax Relief" value={result.employeeRelief} />
            <Separator />
            <div className="flex justify-between gap-4 text-base">
              <span className="font-semibold">Total Levy</span>
              <span className="text-right font-bold text-primary">KES {result.totalLevy.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Rates Used</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Employee deduction: {(AFFORDABLE_HOUSING_LEVY_RATE * 100).toFixed(1)}% of gross monthly salary.</p>
          <p>Employer contribution: {(AFFORDABLE_HOUSING_LEVY_RATE * 100).toFixed(1)}% of gross monthly salary.</p>
          <p>Estimated employee tax relief: {(AFFORDABLE_HOUSING_RELIEF_RATE * 100).toFixed(0)}% of the employee levy where applicable.</p>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> This is an estimate. Confirm final payroll treatment and relief eligibility with official guidance, your employer, or a qualified tax professional.
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
      <span className="text-right font-semibold">KES {Math.round(value).toLocaleString()}</span>
    </div>
  );
}
