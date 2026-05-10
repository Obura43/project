import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  CheckSquare,
  AlertTriangle,
  HelpCircle,
  ArrowLeft,
  ExternalLink,
  Clock,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DisclaimerBanner } from '@/components/disclaimer-banner';
import { PrintButton } from '@/components/print-button';
import { guides, getGuideBySlug } from '@/data/guides';
import { getCategoryBySlug } from '@/data/categories';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      type: 'article',
      url: `https://easygov.co.ke/guides/${guide.slug}`,
    },
  };
}

export default function GuidePage({ params }: PageProps) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const category = getCategoryBySlug(guide.categorySlug);
  const relatedGuides = guides.filter((g) =>
    guide.relatedGuides.includes(g.slug)
  );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    dateModified: '2026-05-01',
    author: {
      '@type': 'Organization',
      name: 'EasyGov Kenya',
      url: 'https://easygov.co.ke',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EasyGov Kenya',
      url: 'https://easygov.co.ke',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-primary">Guides</Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/categories/${category.slug}`} className="hover:text-primary">
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground">{guide.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex flex-wrap gap-2">
            {guide.badges.map((badge) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {guide.title}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: {guide.lastUpdated}</span>
            {category && (
              <>
                <span>&middot;</span>
                <Link
                  href={`/categories/${category.slug}`}
                  className="hover:text-primary"
                >
                  {category.name}
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Print Button */}
        <div className="mb-6">
          <PrintButton />
        </div>

        {/* Intro */}
        <div className="mb-8 text-muted-foreground leading-relaxed">
          <p>{guide.intro}</p>
        </div>

        {/* Quick Summary */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-primary">Quick Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {guide.quickSummary.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Requirements Checklist */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Requirements Checklist
          </h2>
          <Card>
            <CardContent className="p-5">
              <ul className="space-y-2.5">
                {guide.requirementsChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-primary/30 text-xs text-primary">
                      {i + 1}
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Step-by-Step Guide
          </h2>
          <div className="space-y-3">
            {guide.steps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-lg border bg-white p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {i + 1}
                </div>
                <p className="mt-1 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Common Mistakes to Avoid
          </h2>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="p-5">
              <ul className="space-y-2.5">
                {guide.commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-900">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {guide.faqs.map((faq, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">{faq.question}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Official Source Notes */}
        <Card className="mb-8 border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <ExternalLink className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Official Sources</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {guide.officialSourceNotes}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mb-8">
          <DisclaimerBanner />
        </div>

        <Separator className="my-8" />

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">Related Guides</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedGuides.map((rg) => (
                <Link key={rg.slug} href={`/guides/${rg.slug}`} className="group">
                  <Card className="transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                          {rg.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{rg.category}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back Link */}
        <div className="print:hidden">
          <Button asChild variant="ghost">
            <Link href="/guides">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Guides
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
