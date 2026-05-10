import Link from 'next/link';

const footerLinks = {
  'EasyGov Kenya': [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/about#disclaimer', label: 'Disclaimer' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
  ],
  'Popular Services': [
    { href: '/guides/how-to-apply-for-kenyan-passport', label: 'Passport Application' },
    { href: '/guides/how-to-file-kra-returns-itax', label: 'KRA Returns' },
    { href: '/guides/how-to-apply-for-helb-first-time-applicant', label: 'HELB Application' },
    { href: '/guides/how-to-register-business-name-kenya', label: 'Business Registration' },
    { href: '/guides/how-to-apply-for-good-conduct-certificate-kenya', label: 'Good Conduct' },
  ],
  Categories: [
    { href: '/categories/kra-taxes', label: 'KRA & Taxes' },
    { href: '/categories/passports', label: 'Passports' },
    { href: '/categories/business-registration', label: 'Business' },
    { href: '/categories/education-helb', label: 'Education' },
    { href: '/categories/ntsa-driving', label: 'NTSA' },
    { href: '/categories/crb', label: 'CRB' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">{heading}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t pt-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <span className="text-xs font-bold text-white">EG</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                EasyGov Kenya
              </span>
            </div>
            <p className="max-w-xl text-xs text-muted-foreground">
              EasyGov Kenya is an independent informational platform and is not affiliated with the Government of Kenya, eCitizen, KRA, NTSA, HELB, BRS, SHA, or any public agency.
            </p>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} EasyGov Kenya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
