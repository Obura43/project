import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, Plane, Receipt, Building2, GraduationCap, ShieldCheck, Car, CreditCard, Heart, Globe, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { categories, getCategoryBySlug } from '@/data/categories';
import { guides, getGuidesByCategory } from '@/data/guides';

const categoryIcons: Record<string, React.ReactNode> = {
  Passports: <Plane className="h-6 w-6" />,
  'KRA & Taxes': <Receipt className="h-6 w-6" />,
  'Business Registration': <Building2 className="h-6 w-6" />,
  'Education & HELB': <GraduationCap className="h-6 w-6" />,
  'Good Conduct': <ShieldCheck className="h-6 w-6" />,
  'NTSA & Driving': <Car className="h-6 w-6" />,
  'National ID': <CreditCard className="h-6 w-6" />,
  'Health & SHA': <Heart className="h-6 w-6" />,
  eCitizen: <Globe className="h-6 w-6" />,
  CRB: <FileText className="h-6 w-6" />,
};

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};
  return {
    title: `${category.name} - Guides | EasyGov Kenya`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: PageProps) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const categoryGuides = getGuidesByCategory(params.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-primary">Guides</Link>
        <span>/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {categoryIcons[category.name] || <BookOpen className="h-6 w-6" />}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{category.name}</h1>
          <p className="mt-1 text-muted-foreground">{category.description}</p>
        </div>
      </div>

      {categoryGuides.length === 0 ? (
        <div className="py-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">
            No guides available in this category yet. Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryGuides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
              <Card className="h-full transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                <CardHeader className="pb-3">
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
      )}

      <div className="mt-8">
        <Button asChild variant="ghost">
          <Link href="/guides">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Guides
          </Link>
        </Button>
      </div>
    </div>
  );
}
