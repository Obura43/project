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
  calculatePaye,
  KENYA_PAYROLL_LAST_REVIEWED,
  PAYE_TAX_BANDS,
  PERSONAL_RELIEF,
} from '@/lib/kenya-calculators';

export function PayeClient() {
  const [grossSalary, setGrossSalary] = useState('');
  const [pensionContribution, setPensionContribution] = useState('');
  const [insurancePremium, setInsurancePremium] = useState('');
  const [otherDeductions, setOtherDeductions] = useState('');
  const [includeAhlRelief, setIncludeAhlRelief] = useState(true);
  const [result, setResult] = useState<ReturnType<typeof calculatePaye> | null>(null);

  function calculate() {
    setResult(
      calculatePaye({
        grossSalary: parseFloat(grossSalary) || 0,
        pensionContribution: parseFloat(pensionContribution) || 0,
        insurancePremium: parseFloat(insurancePremium) || 0,
        otherDeductions: parseFloat(otherDeductions) || 0,
        includeAffordableHousingRelief: includeAhlRelief,
      })
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
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
          Estimate monthly PAYE, SHA, NSSF, Affordable Housing Levy, tax reliefs, and net pay from your gross salary.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">Rates reviewed: {KENYA_PAYROLL_LAST_REVIEWED}</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-primary" />
            Enter Monthly Pay Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="gross">Gross Monthly Salary (KES)</Label>
            <Input id="gross" type="number" min="0" placeholder="e.g. 100000" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="pension">Tax-deductible Pension Contribution (KES)</Label>
            <Input id="pension" type="number" min="0" placeholder="e.g. 0" value={pensionContribution} onChange={(e) => setPensionContribution(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="insurance">Insurance Premium Eligible for Relief (KES)</Label>
            <Input id="insurance" type="number" min="0" placeholder="e.g. 5000" value={insurancePremium} onChange={(e) => setInsurancePremium(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="other">Other Non-Statutory Deductions (KES)</Label>
            <Input id="other" type="number" min="0" placeholder="e.g. loan, Sacco, advance" value={otherDeductions} onChange={(e) => setOtherDeductions(e.target.value)} />
          </div>
          <label className="flex items-start gap-2 rounded-md border p-3 text-sm">
            <input
              type="checkbox"
              checked={includeAhlRelief}
              onChange={(e) => setIncludeAhlRelief(e.target.checked)}
              className="mt-1"
            />
            <span>Apply Affordable Housing Levy tax relief where applicable</span>
          </label>
          <Button onClick={calculate} className="w-full">Calculate PAYE and Net Pay</Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="mb-6 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Estimated Monthly Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <ResultRow label="Gross Salary" value={result.grossSalary} />
              <ResultRow label="NSSF Employee Contribution" value={result.nssf} />
              <ResultRow label="Taxable Pay" value={result.taxablePay} />
              <ResultRow label="PAYE Before Relief" value={result.payeBeforeRelief} />
              <ResultRow label="Personal Relief" value={result.personalRelief} muted />
              <ResultRow label="Insurance Relief" value={result.insuranceRelief} muted />
              <ResultRow label="Affordable Housing Relief" value={result.affordableHousingRelief} muted />
              <ResultRow label="PAYE After Relief" value={result.paye} destructive />
              <ResultRow label="SHA Contribution" value={result.sha} />
              <ResultRow label="Affordable Housing Levy" value={result.affordableHousingLevy} />
              {result.otherDeductions > 0 && <ResultRow label="Other Deductions" value={result.otherDeductions} />}
              <Separator />
              <div className="flex justify-between gap-4 text-base">
                <span className="font-semibold">Estimated Net Pay</span>
                <span className="text-right font-bold text-primary">KES {result.netPay.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Rates Used</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>PAYE bands: {PAYE_TAX_BANDS.map((band) => band.label).join('; ')}.</p>
          <p>Monthly personal relief: KES {PERSONAL_RELIEF.toLocaleString()}.</p>
          <p>The calculator includes NSSF, SHA, and Affordable Housing Levy using the shared EasyGov payroll formula module.</p>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> This calculator is an estimate for planning. Confirm payroll treatment, relief eligibility, and final tax due with KRA, your employer, or a qualified tax professional.
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

function ResultRow({ label, value, muted, destructive }: { label: string; value: number; muted?: boolean; destructive?: boolean }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={`text-right font-semibold ${muted ? 'text-primary' : ''} ${destructive ? 'text-destructive' : ''}`}>
        KES {value.toLocaleString()}
      </span>
    </div>
  );
}
