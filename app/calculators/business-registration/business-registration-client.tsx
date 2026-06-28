'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, AlertTriangle, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const businessTypes = [
  {
    value: 'business-name',
    label: 'Business Name Registration',
    fee: 950,
    checklist: ['eCitizen account', 'Proposed business names', 'Owner ID or passport details', 'Business activity description', 'Business address', 'KRA PIN where requested'],
  },
  {
    value: 'private-limited',
    label: 'Private Limited Company',
    fee: 10650,
    checklist: ['eCitizen account', 'Company name details', 'Director and shareholder details', 'Registered office address', 'Share capital information', 'Director ID or passport copies', 'KRA PIN details where requested'],
  },
  {
    value: 'partnership',
    label: 'Partnership Registration',
    fee: 2500,
    checklist: ['eCitizen account', 'Partnership name', 'Partner details', 'Business address', 'Partnership deed where applicable', 'Partner ID or passport copies', 'KRA PIN details where requested'],
  },
  {
    value: 'llp',
    label: 'Limited Liability Partnership',
    fee: 25000,
    checklist: ['eCitizen account', 'LLP name details', 'Partner and manager details', 'Registered office address', 'Identification documents', 'KRA PIN details where requested'],
  },
];

export function BusinessRegistrationClient() {
  const [selectedType, setSelectedType] = useState(businessTypes[0].value);
  const result = businessTypes.find((t) => t.value === selectedType) || businessTypes[0];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/calculators" className="hover:text-primary">Calculators</Link>
        <span>/</span>
        <span className="text-foreground">Business Registration Cost</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Business Registration Cost Estimator Kenya</h1>
        <p className="mt-2 text-muted-foreground">
          Estimate registration costs and document requirements for a business name, company, partnership, or LLP before applying through BRS.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-primary" />
            Select Business Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="type">Business Type</Label>
          <select
            id="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {businessTypes.map((type) => (
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
              <span className="text-muted-foreground">Business Type</span>
              <span className="text-right font-semibold">{result.label}</span>
            </div>
            <div className="flex justify-between gap-4 text-base">
              <span className="font-semibold">Estimated Application Cost</span>
              <span className="text-right font-bold text-primary">KES {result.fee.toLocaleString()}</span>
            </div>
            <Separator />
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Document Checklist</p>
              <ul className="space-y-1.5">
                {result.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
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
            <strong>Disclaimer:</strong> BRS fees, portal charges, document requirements, and approval rules may change. Confirm the final payable amount on eCitizen or the BRS portal before submitting.
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
