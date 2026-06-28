'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, BookOpen, Plane, Receipt, Building2, GraduationCap, ShieldCheck, Car, CreditCard, Heart, Globe, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { guides } from '@/data/guides';
import { categories } from '@/data/categories';

const categoryIcons: Record<string, React.ReactNode> = {
  Passports: <Plane className="h-5 w-5" />,
  'KRA & Taxes': <Receipt className="h-5 w-5" />,
  'Business Registration': <Building2 className="h-5 w-5" />,
  'Education & HELB': <GraduationCap className="h-5 w-5" />,
  'Good Conduct': <ShieldCheck className="h-5 w-5" />,
  'NTSA & Driving': <Car className="h-5 w-5" />,
  'National ID': <CreditCard className="h-5 w-5" />,
  'Health & SHA': <Heart className="h-5 w-5" />,
  eCitizen: <Globe className="h-5 w-5" />,
  CRB: <FileText className="h-5 w-5" />,
};

export function GuidesClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = guides;
    if (selectedCategory) {
      result = result.filter((g) => g.categorySlug === selectedCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.intro.toLowerCase().includes(q) ||
          g.quickSummary.some((item) => item.toLowerCase().includes(q))
      );
    }
    return result;
  }, [query, selectedCategory]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Kenya Government Service Guides</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Step-by-step guides, document checklists, common mistakes, and FAQs for Kenyan government services including eCitizen, KRA, passports, national ID, HELB, NTSA, SHA, CRB, and business registration.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search passport, KRA PIN, lost ID, HELB, SHA, driving license..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            !selectedCategory
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">No guides found matching your search.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((guide) => (
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
      )}
    </div>
  );
}
