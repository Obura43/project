export interface Calculator {
  title: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  badges: string[];
}

export const calculators: Calculator[] = [
  {
    title: "PAYE Calculator Kenya",
    slug: "paye",
    description: "Estimate PAYE, SHA, NSSF, Affordable Housing Levy, tax reliefs, and net pay from your monthly gross salary.",
    category: "KRA & Taxes",
    icon: "Calculator",
    badges: ["Calculator Available", "Updated June 2026"],
  },
  {
    title: "SHA Contribution Calculator",
    slug: "sha",
    description: "Estimate your monthly SHA contribution using income at 2.75% with the minimum contribution applied.",
    category: "Health & SHA",
    icon: "Heart",
    badges: ["Calculator Available", "Updated June 2026"],
  },
  {
    title: "NSSF Calculator",
    slug: "nssf",
    description: "Estimate NSSF employee and employer contributions using Tier I and Tier II pensionable earnings limits.",
    category: "KRA & Taxes",
    icon: "PiggyBank",
    badges: ["Calculator Available", "Updated June 2026"],
  },
  {
    title: "Affordable Housing Levy Calculator",
    slug: "affordable-housing-levy",
    description: "Estimate employee levy, employer levy, total levy, and related tax relief from gross monthly pay.",
    category: "KRA & Taxes",
    icon: "Home",
    badges: ["Calculator Available", "New", "Updated June 2026"],
  },
  {
    title: "Passport Fee Estimator",
    slug: "passport-fee",
    description: "Estimate Kenyan passport fees for ordinary, diplomatic, lost, or mutilated passport applications.",
    category: "Passports",
    icon: "Plane",
    badges: ["Calculator Available", "Updated June 2026"],
  },
  {
    title: "Business Registration Cost Estimator",
    slug: "business-registration",
    description: "Estimate BRS registration costs for a business name, company, partnership, or LLP.",
    category: "Business Registration",
    icon: "Building2",
    badges: ["Calculator Available", "Updated June 2026"],
  },
];

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find((c) => c.slug === slug);
}
