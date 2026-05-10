import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { updates, getUpdateBySlug } from '@/data/updates';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return updates.map((update) => ({ slug: update.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const update = getUpdateBySlug(params.slug);
  if (!update) return {};
  return {
    title: update.title,
    description: update.excerpt,
  };
}

export default function UpdateDetailPage({ params }: PageProps) {
  const update = getUpdateBySlug(params.slug);
  if (!update) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/updates" className="hover:text-primary">Updates</Link>
        <span>/</span>
        <span className="text-foreground">{update.title}</span>
      </nav>

      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>{update.date}</span>
        <span>&middot;</span>
        <span>{update.category}</span>
      </div>

      <h1 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl">
        {update.title}
      </h1>

      <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
        {update.content.split('\n\n').map((paragraph, i) => {
          if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
            return <h2 key={i} className="mt-6 text-lg font-semibold text-foreground">{paragraph.replace(/\*\*/g, '')}</h2>;
          }
          if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n').filter(Boolean);
            return (
              <ul key={i} className="my-3 ml-4 list-disc space-y-1">
                {items.map((item, j) => (
                  <li key={j}>{item.replace(/^- /, '')}</li>
                ))}
              </ul>
            );
          }
          if (/^\d+\./.test(paragraph)) {
            const items = paragraph.split('\n').filter(Boolean);
            return (
              <ol key={i} className="my-3 ml-4 list-decimal space-y-1">
                {items.map((item, j) => (
                  <li key={j}>{item.replace(/^\d+\.\s*/, '')}</li>
                ))}
              </ol>
            );
          }
          return <p key={i} className="my-3">{paragraph}</p>;
        })}
      </div>

      <Separator className="my-8" />

      <Button asChild variant="ghost">
        <Link href="/updates">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Updates
        </Link>
      </Button>
    </div>
  );
}
