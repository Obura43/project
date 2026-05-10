export interface UpdatePost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
}

export const updates: UpdatePost[] = [
  {
    title: "Always Confirm Government Fees Before Payment",
    slug: "confirm-government-fees-before-payment",
    excerpt: "Government service fees may change. Always confirm the latest fee on the official portal before paying.",
    content: `Government service fees in Kenya can change without much public notice. Relying on screenshots, outdated blog posts, or word of mouth can lead to paying the wrong amount or falling victim to fraud.

**Why you should always confirm fees officially:**

- **Fees change frequently.** Government agencies update fees through gazette notices or portal updates. A fee you saw last month may no longer be correct.
- **Screenshots are unreliable.** A screenshot from a friend or social media post may show outdated information.
- **Unofficial agents may quote wrong fees.** Some agents add their own charges or quote old rates to exploit applicants.
- **Official portals are the source of truth.** The eCitizen portal, KRA iTax, NTSA, and other official platforms show the current fees at the time of application.

**What to do before paying:**

1. Log in to the official portal for the service you need.
2. Check the current fee displayed on the portal.
3. Pay only through the official payment channels shown on the portal.
4. Keep your payment receipt or confirmation.
5. If the fee seems different from what you expected, confirm again on the official site.

EasyGov Kenya provides general estimates and guides, but we always encourage users to confirm final amounts on official government platforms before making any payment.`,
    date: "May 2026",
    category: "General Tips",
  },
  {
    title: "Keep Your eCitizen Login Details Private",
    slug: "keep-ecitizen-login-details-private",
    excerpt: "Your eCitizen account can access sensitive services. Keep your password secure and avoid sharing it.",
    content: `Your eCitizen account is the gateway to many Kenyan government services, including passport applications, business registration, good conduct certificates, and driving license services. Sharing your login details can put your personal information and applications at risk.

**Why you should protect your eCitizen account:**

- **Your account holds sensitive data.** It contains your ID details, application history, payment records, and personal information.
- **Agents can misuse your account.** Some people share login details with agents to help with applications, but this can lead to unauthorized changes, incorrect applications, or even fraud.
- **Password resets can be complicated.** If someone changes your password or email, recovering your account may be difficult and time-consuming.

**How to keep your account safe:**

1. Use a strong, unique password that you do not reuse on other sites.
2. Never share your password with anyone, including agents or friends.
3. If you need help with an application, visit the official office yourself or use only trusted, verified channels.
4. Enable any available security features on your account.
5. If you suspect your account has been compromised, reset your password immediately using the official eCitizen password recovery option.
6. Always log out from shared or public devices.

EasyGov Kenya will never ask for your eCitizen login details. If anyone claiming to represent us asks for your password, it is a scam.`,
    date: "May 2026",
    category: "Account Safety",
  },
  {
    title: "Why Document Names Must Match",
    slug: "why-document-names-must-match",
    excerpt: "Name mismatches across ID, birth certificate, passport, and KRA records can delay applications.",
    content: `One of the most common reasons government applications are delayed or rejected is name inconsistency. If your name appears differently on your national ID, birth certificate, passport, KRA PIN, or other documents, you may face problems during verification.

**Why name consistency matters:**

- **Verification checks compare documents.** Immigration, KRA, and registration offices cross-check your details across multiple documents.
- **Even small differences cause problems.** A missing middle name, a different spelling, or a swapped name order can trigger a mismatch.
- **Delays can be costly.** Correcting names after a failed application wastes time and may require additional fees.

**Common name mismatch scenarios:**

- Your ID says "John Kamau" but your birth certificate says "John Kamau Njuguna."
- Your passport has your full name but your KRA PIN uses a shortened version.
- A marriage name change has not been updated across all documents.

**What to do before applying:**

1. Check that your name appears the same way on all key documents: ID, birth certificate, passport, KRA PIN, and any other required documents.
2. If there is a mismatch, apply for a correction through the appropriate official channel before starting your main application.
3. Name corrections may require supporting documents such as affidavits, gazette notices, or official application forms.
4. Allow extra time for corrections before your application deadline.

EasyGov Kenya recommends checking all your documents for name consistency well before starting any major government application.`,
    date: "May 2026",
    category: "Document Tips",
  },
];

export function getUpdateBySlug(slug: string): UpdatePost | undefined {
  return updates.find((u) => u.slug === slug);
}
