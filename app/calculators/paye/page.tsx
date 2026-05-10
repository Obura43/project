'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calculator, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Kenya PAYE tax bands (2024/2025 rates - confirm officially)
const taxBands = [
  { min: 0, max: 24000, rate: 0.1 },
  { min: 24000, max: 32333, rate: 0.25 },
  { min: 32333, max: 500000, rate: 0.3 },
  { min: 500000, max: 800000, rate: 0.325 },
  { min: 800000, max: Infinity, rate: 0.35 },
];

const PERSONAL_RELIEF = 2400;
const INSURANCE_RELIEF_CAP = 5000;
const AHL_RELIEF_RATE = 0.15;
const AHL_RELIEF_CAP = 9000;

export default function PAYECalculator() {
  const [grossSalary, setGrossSalary] = useState('');
  const [pensionContribution, setPensionContribution] = useState('');
  const [insuranceRelief, setInsuranceRelief] = useState('');
  const [otherDeductions, setOtherDeductions] = useState('');
  const [result, setResult] = useState<{
    taxablePay: number;
    paye: number;
    netPay: number;
    nhif: number;
    nssf: number;
  } | null>(null);

  function calculate() {
    const gross = parseFloat(grossSalary) || 0;
    const pension = parseFloat(pensionContribution) || 0;
    const insurance = parseFloat(insuranceRelief) || 0;
    const other = parseFloat(otherDeductions) || 0;

    // NSSF (Tier I + Tier II simplified)
    const nssfEmployee = Math.min(gross * 0.06, 2160);

    // Taxable pay after NSSF
    const taxablePay = Math.max(0, gross - nssfEmployee - pension);

    // Calculate tax
    let tax = 0;
    let remaining = taxablePay;
    for (const band of taxBands) {
      const taxableInBand = Math.min(remaining, band.max - band.min);
      tax += taxableInBand * band.rate;
      remaining -= taxableInBand;
      if (remaining <= 0) break;
    }

    // Personal relief
    tax = Math.max(0, tax - PERSONAL_RELIEF);

    // Insurance relief (15% of premium, capped)
    const insuranceReliefAmount = Math.min(insurance * 0.15, INSURANCE_RELIEF_CAP);
    tax = Math.max(0, tax - insuranceReliefAmount);

    // AHL relief (simplified)
    const ahlRelief = Math.min(0, 0); // Placeholder

    // NHIF (simplified old rates - confirm officially)
    let nhif = 0;
    if (gross <= 5999) nhif = 150;
    else if (gross <= 7999) nhif = 300;
    else if (gross <= 11999) nhif = 400;
    else if (gross <= 14999) nhif = 500;
    else if (gross <= 19999) nhif = 600;
    else if (gross <= 24999) nhif = 750;
    else if (gross <= 29999) nhif = 850;
    else if (gross <= 34999) nhif = 900;
    else if (gross <= 39999) nhif = 950;
    else if (gross <= 44999) nhif = 1000;
    else if (gross <= 49999) nhif = 1100;
    else if (gross <= 59999) nhif = 1200;
    else if (gross <= 69999) nhif = 1300;
    else if (gross <= 79999) nhif = 1400;
    else if (gross <= 89999) nhif = 1500;
    else if (gross <= 99999) nhif = 1600;
    else nhif = 1700;

    const netPay = gross - tax - nssfEmployee - nhif - other;

    setResult({
      taxablePay: Math.round(taxablePay),
      paye: Math.round(tax),
      netPay: Math.round(netPay),
      nhif,
      nssf: Math.round(nssfEmployee),
    });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/calculators" className="hover:text-primary">Calculators</Link>
        <span>/</span>
        <span className="text-foreground">PAYE Calculator</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">PAYE Calculator Kenya</h1>
        <p className="mt-2 text-muted-foreground">
          Estimate your Pay As You Earn tax, net pay, and deductions based on your gross monthly salary.
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
            <Label htmlFor="gross">Gross Monthly Salary (KES)</Label>
            <Input
              id="gross"
              type="number"
              placeholder="e.g. 100000"
              value={grossSalary}
              onChange={(e) => setGrossSalary(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="pension">Pension Contribution (KES)</Label>
            <Input
              id="pension"
              type="number"
              placeholder="e.g. 20000"
              value={pensionContribution}
              onChange={(e) => setPensionContribution(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="insurance">Insurance Premium (KES)</Label>
            <Input
              id="insurance"
              type="number"
              placeholder="e.g. 5000"
              value={insuranceRelief}
              onChange={(e) => setInsuranceRelief(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="other">Other Deductions (KES)</Label>
            <Input
              id="other"
              type="number"
              placeholder="e.g. 0"
              value={otherDeductions}
              onChange={(e) => setOtherDeductions(e.target.value)}
            />
          </div>
          <Button onClick={calculate} className="w-full">
            Calculate PAYE
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
                <span className="text-muted-foreground">Taxable Pay</span>
                <span className="font-semibold">KES {result.taxablePay.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">PAYE Tax</span>
                <span className="font-semibold text-destructive">KES {result.paye.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">NSSF (Employee)</span>
                <span className="font-semibold">KES {result.nssf.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">NHIF/SHA</span>
                <span className="font-semibold">KES {result.nhif.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base">
                <span className="font-semibold">Estimated Net Pay</span>
                <span className="font-bold text-primary">KES {result.netPay.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> This is an estimate based on publicly available tax bands. Tax laws and rates may change. Confirm your actual PAYE with KRA or a qualified tax professional.
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
