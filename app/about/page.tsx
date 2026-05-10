import type { Metadata } from 'next';
import { AlertTriangle, BookOpen, CheckSquare, Calculator, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About EasyGov Kenya',
  description: 'Learn about EasyGov Kenya, an independent platform that simplifies access to information about Kenyan government services.',
};

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Plain Language Guides',
    description: 'We explain government services in simple, clear language that anyone can understand.',
  },
  {
    icon: <CheckSquare className="h-6 w-6" />,
    title: 'Document Checklists',
    description: 'Each guide includes a checklist of documents you need to prepare before applying.',
  },
  {
    icon: <Calculator className="h-6 w-6" />,
    title: 'Cost Estimators',
    description: 'Use our calculators to estimate fees, taxes, and contributions before you apply.',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Regular Updates',
    description: 'We review our guides regularly and show "last updated" dates on every page.',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">About EasyGov Kenya</h1>

      <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          EasyGov Kenya is an independent platform created to simplify access to information about
          Kenyan government services. Our goal is to help ordinary users understand processes before
          visiting official portals or service centres.
        </p>
        <p>
          We explain public services in plain language, provide document checklists, publish
          practical guides, and create calculators that help users estimate costs or contributions.
        </p>
        <p>
          EasyGov Kenya does not replace official government websites. We encourage users to complete
          applications, payments, and final verification only through official government platforms.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-foreground">What We Offer</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-1 font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div id="disclaimer" className="mt-12 rounded-lg border border-amber-200 bg-amber-50 p-5">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <h3 className="font-semibold text-amber-800">Disclaimer</h3>
            <p className="mt-1 text-sm text-amber-800">
              EasyGov Kenya is an independent informational website. We are not affiliated with the
              Government of Kenya, eCitizen, KRA, NTSA, HELB, BRS, SHA, or any public agency. Always
              confirm final requirements, fees, and application status on the official government portals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
