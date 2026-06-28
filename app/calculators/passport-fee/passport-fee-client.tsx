'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, AlertTriangle, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const passportTypes = [
  { value: '34-page-ordinary', label: '34-page Ordinary Passport', fee: 7500, docs: ['Completed passport application form', 'Original birth certificate and copy', 'Original national ID and copy for adults', 'Payment invoice or receipt', 'Passport photos where required'] },
  { value: '50-page-ordinary', label: '50-page Ordinary Passport', fee: 9500, docs: ['Completed passport application form', 'Original birth certificate and copy', 'Original national ID and copy for adults', 'Payment invoice or receipt', 'Passport photos where required'] },
  { value: '66-page-ordinary', label: '66-page Ordinary Passport', fee: 12500, docs: ['Completed passport application form', 'Original birth certificate and copy', 'Original national ID and copy for adults', 'Payment invoice or receipt', 'Passport photos where required'] },
  { value: 'diplomatic', label: 'Diplomatic Passport', fee: 15000, docs: ['Completed passport application form', 'Official supporting letter', 'Original birth certificate and copy', 'Original national ID and copy', 'Payment invoice or receipt'] },
  { value: 'lost-replacement', label: 'Lost Passport Replacement', fee: 20000, docs: ['Completed passport application form', 'Police abstract', 'Affidavit', 'Original birth certificate and copy', 'Original national ID and copy', 'Payment invoice or receipt'] },
  { value: 'mutilated-replacement', label: 'Mutilated Passport Replacement', fee: 20000, docs: ['Completed passport application form', 'Mutilated passport', 'Original birth certificate and copy', 'Original national ID and copy', 'Payment invoice or receipt'] },
];

export function PassportFeeClient() {
  const [selectedType, setSelectedType] = useState(passportTypes[0].value);
  const result = passportTypes.find((t) => t.value === selectedType) || passportTypes[0];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/calculators" className="hover:text-primary">Calculators</Link>
        <span>/</span>
        <span className="text-foreground">Passport Fee Estimator</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Kenyan Passport Fee Estimator</h1>
        <p className="mt-2 text-muted-foreground">
          Estimate ordinary, diplomatic, lost, or mutilated passport application fees before applying through official immigration services.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-primary" />
            Select Passport Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="type">Passport Type or Application Reason</Label>
          <select
            id="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {passportTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </CardContent>
      </Card>

      <Card className="mb-6 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Estimated Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-muted-foreground">Selected Option</span>
              <span className="text-right font-semibold">{result.label}</span>
            </div>
            <div className="flex justify-between gap-4 text-base">
              <span className="font-semibold">Estimated Application Fee</span>
              <span className="text-right font-bold text-primary">KES {result.fee.toLocaleString()}</span>
            </div>
            <Separator />
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Common Documents to Prepare</p>
              <ul className="space-y-1.5">
                {result.docs.map((doc) => (
                  <li key={doc} className="flex items-start gap-2 text-sm">
                    <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> Passport fees, convenience charges, and document requirements may change. Confirm the final amount on eCitizen or the official immigration portal before paying.
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
