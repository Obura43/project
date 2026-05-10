import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'EasyGov Kenya privacy policy — how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: May 2026</p>

      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Introduction</h2>
          <p>
            EasyGov Kenya (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website easygov.co.ke. This privacy policy explains how we collect, use, and protect information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Information We Collect</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li><strong>Contact Form Data:</strong> If you use our contact form, we collect the name, email, subject, and message you provide.</li>
            <li><strong>Newsletter Email:</strong> If you subscribe to our newsletter, we collect your email address.</li>
            <li><strong>Analytics Data:</strong> We may use analytics tools to collect anonymous usage data such as page views, referral sources, and device information.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">How We Use Your Information</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>To respond to contact form messages.</li>
            <li>To send newsletter updates if you subscribed.</li>
            <li>To improve our website using anonymous analytics.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Data We Do Not Collect</h2>
          <p>
            We do not ask for and you should never submit sensitive personal information through our website, including passwords, ID scans, KRA PIN passwords, payment details, or any government portal login credentials.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">No Selling of Personal Data</h2>
          <p>
            We do not sell, rent, or share your personal data with third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Cookies</h2>
          <p>
            We may use essential cookies and analytics cookies to operate and improve our website. You can manage cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Third-Party Links</h2>
          <p>
            Our website may contain links to external websites, including official government portals. We are not responsible for the privacy practices of those external sites.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Data Removal Requests</h2>
          <p>
            If you would like us to remove your personal data from our records, please contact us through our contact form or email. We will process removal requests in accordance with applicable data protection laws.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be posted on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Contact</h2>
          <p>
            For privacy-related questions or data removal requests, please use our <a href="/contact" className="text-primary hover:underline">contact form</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
