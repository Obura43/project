import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'EasyGov Kenya terms of use — how to use this website responsibly.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: May 2026</p>

      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Informational Use Only</h2>
          <p>
            EasyGov Kenya provides general information about Kenyan government services. All content on this website is for informational purposes only and should not be relied upon as legal, tax, immigration, or financial advice.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Not Affiliated with Government</h2>
          <p>
            EasyGov Kenya is not affiliated with, endorsed by, or connected to the Government of Kenya, eCitizen, KRA, NTSA, HELB, BRS, SHA, or any other government agency or public body.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Official Portals Are Final Authority</h2>
          <p>
            For all government services, the official government portals and offices are the final authority on requirements, fees, processes, and application status. Always confirm information on official platforms before making decisions or payments.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Fees and Processes May Change</h2>
          <p>
            Government service fees, requirements, and processes may change at any time. While we strive to keep our guides updated, we cannot guarantee that all information is current at the time you read it. Always verify with official sources.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Calculator Results Are Estimates</h2>
          <p>
            Our calculators provide estimates for general guidance only. They are not official calculations and should not be used as a substitute for calculations provided by KRA, SHA, NSSF, Immigration, BRS, or any other government agency.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">User Responsibility</h2>
          <p>
            You are responsible for verifying all information before using it to make decisions about government services. EasyGov Kenya is not liable for any loss, delay, or inconvenience resulting from the use of information on this website.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Do Not Submit Sensitive Information</h2>
          <p>
            Do not submit sensitive personal information such as passwords, ID scans, KRA PIN passwords, payment details, or government portal login credentials through our contact form or any other feature on this website.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Intellectual Property</h2>
          <p>
            All content on EasyGov Kenya, including text, design, and code, is the property of EasyGov Kenya unless otherwise stated. You may not reproduce, distribute, or modify our content without permission.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Changes to These Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the website after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Contact</h2>
          <p>
            For questions about these terms, please use our <a href="/contact" className="text-primary hover:underline">contact form</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
