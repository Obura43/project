import Link from 'next/link';
import {
  Search,
  Plane,
  Receipt,
  Building2,
  GraduationCap,
  ShieldCheck,
  Car,
  BookOpen,
  Calculator,
  CheckSquare,
  Clock,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { NewsletterForm } from '@/components/newsletter-form';
import { guides } from '@/data/guides';
import { categories } from '@/data/categories';
import { calculators } from '@/data/calculators';
import { updates } from '@/data/updates';

const categoryIcons: Record<string, React.ReactNode> = {
  Passports: <Plane className="h-5 w-5" />,
  'KRA & Taxes': <Receipt className="h-5 w-5" />,
  'Business Registration': <Building2 className="h-5 w-5" />,
  'Education & HELB': <GraduationCap className="h-5 w-5" />,
  'Good Conduct': <ShieldCheck className="h-5 w-5" />,
  'NTSA & Driving': <Car className="h-5 w-5" />,
};

const popularGuides = guides.slice(0, 6);

const whyCards = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Plain Language',
    description: 'We break down complicated government processes into simple steps anyone can follow.',
  },
  {
    icon: <CheckSquare className="h-6 w-6" />,
    title: 'Checklists',
    description: 'Each guide includes a document checklist so you know what to prepare before applying.',
  },
  {
    icon: <Calculator className="h-6 w-6" />,
    title: 'Calculators',
    description: 'Use simple tools to estimate deductions, fees, and contributions.',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Updated Guides',
    description: 'We show "last updated" dates so users know when the information was reviewed.',
  },
];

const faqs = [
  {
    question: 'Is EasyGov Kenya a government website?',
    answer: 'No. EasyGov Kenya is an independent informational platform. We are not affiliated with the Government of Kenya or any public agency.',
  },
  {
    question: 'Can I apply for services through EasyGov Kenya?',
    answer: 'No. We provide guides and information only. All applications must be completed on official government portals such as eCitizen, iTax, or the relevant agency website.',
  },
  {
    question: 'Are the fees shown on EasyGov Kenya official?',
    answer: 'We provide estimates based on publicly available information. Fees may change, so always confirm the current amount on the official portal before paying.',
  },
  {
    question: 'How often is the information updated?',
    answer: 'We review and update our guides regularly. Each guide shows a "last updated" date so you can see when it was last reviewed.',
  },
  {
    question: 'Can I trust the calculators on EasyGov Kenya?',
    answer: 'Our calculators provide estimates for general guidance only. They are not a substitute for official calculations from KRA, SHA, NSSF, or other agencies.',
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'EasyGov Kenya',
            url: 'https://easygov.co.ke',
            description: 'Simple Guides for Kenyan Government Services',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://easygov.co.ke/guides?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28 sm:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Simple Guides for{' '}
              <span className="text-primary">Kenyan Government Services</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              EasyGov Kenya helps you understand public services in plain language — from
              passports and KRA returns to HELB, business registration, driving licenses, and more.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/guides">
                  Browse Guides
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/calculators">
                  Use Calculators
                  <Calculator className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-xl">
            <form action="/guides" method="get" className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="q"
                  placeholder="Search passport, KRA, HELB, ID, business registration..."
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">Popular Guides</h2>
            <p className="mt-2 text-muted-foreground">
              Step-by-step guides for the most searched Kenyan government services.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
                <Card className="h-full transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {categoryIcons[guide.category] || <BookOpen className="h-5 w-5" />}
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">
                        {guide.category}
                      </span>
                    </div>
                    <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                      {guide.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2 text-sm">
                      {guide.intro}
                    </CardDescription>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {guide.badges.slice(0, 2).map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/guides">
                View All Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Government Calculators */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">Government Calculators</h2>
            <p className="mt-2 text-muted-foreground">
              Estimate your taxes, contributions, and fees before applying.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => (
              <Link key={calc.slug} href={`/calculators/${calc.slug}`} className="group">
                <Card className="h-full transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Calculator className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      {calc.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{calc.description}</CardDescription>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {calc.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">Latest Updates</h2>
            <p className="mt-2 text-muted-foreground">
              Tips and reminders to help you navigate government services.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {updates.map((update) => (
              <Link key={update.slug} href={`/updates/${update.slug}`} className="group">
                <Card className="h-full transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="mb-2 text-xs font-medium text-muted-foreground">
                      {update.category} &middot; {update.date}
                    </div>
                    <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                      {update.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{update.excerpt}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/updates">
                View All Updates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why EasyGov Kenya */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Government services made easier
            </h2>
            <p className="mt-2 text-muted-foreground">
              Why thousands of Kenyans use EasyGov Kenya to prepare for government services.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyCards.map((card) => (
              <Card key={card.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {card.icon}
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">Browse by Category</h2>
            <p className="mt-2 text-muted-foreground">
              Find guides organized by government service category.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/categories/${cat.slug}`} className="group">
                <Card className="h-full transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                  <CardContent className="p-4 text-center">
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {cat.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <CardContent className="p-5">
                  <h3 className="mb-2 font-semibold text-foreground">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Stay Updated
          </h2>
          <p className="mt-2 text-muted-foreground">
            Get notified when we publish new guides or update existing ones.
          </p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t bg-muted/20 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p className="text-sm text-muted-foreground">
              EasyGov Kenya is an independent informational website. We are not affiliated with the
              Government of Kenya, eCitizen, KRA, NTSA, HELB, BRS, SHA, or any public agency. Always
              confirm final requirements, fees, and application status on the official government portals.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
