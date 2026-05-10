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
    description: "Estimate your Pay As You Earn tax, net pay, and deductions based on your gross salary.",
    category: "KRA & Taxes",
    icon: "Calculator",
    badges: ["Calculator Available", "Updated May 2026"],
  },
  {
    title: "SHA Contribution Calculator",
    slug: "sha",
    description: "Estimate your Social Health Authority contribution based on your monthly income.",
    category: "Health & SHA",
    icon: "Heart",
    badges: ["Calculator Available", "Updated May 2026"],
  },
  {
    title: "NSSF Calculator",
    slug: "nssf",
    description: "Estimate your NSSF employee and employer contributions based on pensionable earnings.",
    category: "KRA & Taxes",
    icon: "PiggyBank",
    badges: ["Calculator Available", "Updated May 2026"],
  },
  {
    title: "Passport Fee Estimator",
    slug: "passport-fee",
    description: "Estimate passport application fees based on passport type and application reason.",
    category: "Passports",
    icon: "Plane",
    badges: ["Calculator Available", "Updated May 2026"],
  },
  {
    title: "Business Registration Cost Estimator",
    slug: "business-registration",
    description: "Estimate business registration costs based on the type of business entity.",
    category: "Business Registration",
    icon: "Building2",
    badges: ["Calculator Available", "Updated May 2026"],
  },
];

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find((c) => c.slug === slug);
}
