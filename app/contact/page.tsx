'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { AlertTriangle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Contact EasyGov Kenya</h1>
      <p className="mt-2 text-muted-foreground">
        Have a correction, suggestion, or service guide request? Contact the EasyGov Kenya team.
      </p>

      {submitted ? (
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold text-primary">Thank you for your message!</p>
            <p className="mt-2 text-sm text-muted-foreground">
              We have received your message and will review it. This is a placeholder response —
              connect your email service to enable real contact form submissions.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g. Correction to passport guide" required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> Do not submit sensitive personal information such as
            passwords, ID scans, KRA PIN passwords, or payment details through this form.
          </p>
        </div>
      </div>
    </div>
  );
}
