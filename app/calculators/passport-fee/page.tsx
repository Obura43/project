'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, AlertTriangle, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const passportTypes = [
  { value: '34-page-ordinary', label: '34-page Ordinary Passport', fee: 4550, docs: ['Form 19', 'Birth certificate', 'National ID', 'Passport photos'] },
  { value: '50-page-ordinary', label: '50-page Ordinary Passport', fee: 6050, docs: ['Form 19', 'Birth certificate', 'National ID', 'Passport photos'] },
  { value: '66-page-ordinary', label: '66-page Ordinary Passport', fee: 7550, docs: ['Form 19', 'Birth certificate', 'National ID', 'Passport photos'] },
  { value: 'diplomatic', label: 'Diplomatic Passport', fee: 7550, docs: ['Form 19', 'Official letter', 'Birth certificate', 'National ID'] },
  { value: 'lost-replacement', label: 'Lost Passport Replacement', fee: 12250, docs: ['Form 19', 'Police abstract', 'Affidavit', 'Birth certificate', 'National ID'] },
  { value: 'mutilated-replacement', label: 'Mutilated Passport Replacement', fee: 12250, docs: ['Form 19', 'Mutilated passport', 'Birth certificate', 'National ID'] },
];

export default function PassportFeeCalculator() {
  const [selectedType, setSelectedType] = useState(passportTypes[0].value);
  const result = passportTypes.find((t) => t.value === selectedType);

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
        <h1 className="text-3xl font-bold text-foreground">Passport Fee Estimator</h1>
        <p className="mt-2 text-muted-foreground">
          Estimate passport application fees based on passport type and application reason.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-primary" />
            Select Passport Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="type">Passport Type</Label>
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {passportTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
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
                <span className="text-muted-foreground">Passport Type</span>
                <span className="font-semibold">{result.label}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="font-semibold">Estimated Fee</span>
                <span className="font-bold text-primary">KES {result.fee.toLocaleString()}</span>
              </div>
              <Separator />
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">Required Documents</p>
                <ul className="space-y-1.5">
                  {result.docs.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> Passport fees may change. These are estimates based on publicly available information. Confirm latest fees on eCitizen or the Immigration portal before paying.
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
