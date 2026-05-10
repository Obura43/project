import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { updates } from '@/data/updates';

export const metadata: Metadata = {
  title: 'Updates',
  description: 'Tips and reminders to help you navigate Kenyan government services.',
};

export default function UpdatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Latest Updates</h1>
        <p className="mt-2 text-muted-foreground">
          Tips and reminders to help you navigate Kenyan government services.
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
    </div>
  );
}
