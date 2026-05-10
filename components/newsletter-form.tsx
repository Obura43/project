'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
        <p className="font-semibold text-primary">Thank you for subscribing!</p>
        <p className="mt-1 text-sm text-muted-foreground">
          This is a placeholder — connect your email service to enable real subscriptions.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-3 sm:flex-row sm:justify-center" onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Enter your email address"
        required
        className="sm:max-w-xs"
      />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
