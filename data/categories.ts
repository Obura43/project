export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    name: "Passports",
    slug: "passports",
    description: "Guides for Kenyan passport application, renewal, replacement, and travel documents.",
    icon: "Plane",
  },
  {
    name: "KRA & Taxes",
    slug: "kra-taxes",
    description: "Simple guides for KRA PIN, iTax returns, tax compliance, PAYE, and filing deadlines.",
    icon: "Receipt",
  },
  {
    name: "Business Registration",
    slug: "business-registration",
    description: "Guides for business name registration, company registration, BRS, and compliance.",
    icon: "Building2",
  },
  {
    name: "Education & HELB",
    slug: "education-helb",
    description: "Guides for HELB loans, higher education funding, student requirements, and application steps.",
    icon: "GraduationCap",
  },
  {
    name: "National ID",
    slug: "national-id",
    description: "Guides for applying, replacing, or correcting details on Kenyan identity documents.",
    icon: "CreditCard",
  },
  {
    name: "NTSA & Driving",
    slug: "ntsa-driving",
    description: "Guides for driving licenses, vehicle services, logbooks, and NTSA processes.",
    icon: "Car",
  },
  {
    name: "Good Conduct",
    slug: "good-conduct",
    description: "Guides for applying for a Police Clearance Certificate in Kenya.",
    icon: "ShieldCheck",
  },
  {
    name: "Health & SHA",
    slug: "health-sha",
    description: "Simple explanations about SHA, healthcare registration, and contribution information.",
    icon: "Heart",
  },
  {
    name: "eCitizen",
    slug: "ecitizen",
    description: "Guides for creating, using, and troubleshooting eCitizen services.",
    icon: "Globe",
  },
  {
    name: "CRB",
    slug: "crb",
    description: "Guides about CRB clearance, credit reports, loan listing, and financial reputation.",
    icon: "FileText",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
