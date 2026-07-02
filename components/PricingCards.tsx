import Link from "next/link";

type PricingPackage = {
  name: string;
  price: string;
  recurring: string;
  popular?: boolean;
  cta: string;
  features: string[];
};

type PricingCardsProps = {
  locale?: string;
  packages?: PricingPackage[];
  title?: string;
  subtitle?: string;
  legalNote?: string;
  mostPopular?: string;
  perMonth?: string;
  oneTime?: string;
  byAgreement?: string;
  getStarted?: string;
  contactUs?: string;
};

export function PricingCards({
  locale = "en",
  packages,
  title = "Commercial Packages",
  subtitle = "Choose the package that fits your goals. All prices in EUR.",
  legalNote = "All packages are subject to our Terms of Use. We do not provide legal, financial or investment advice.",
  mostPopular = "Most Popular",
  perMonth = "/ month",
  oneTime = "One-time",
  byAgreement = "By agreement",
  getStarted = "Get Started",
  contactUs = "Contact Us"
}: PricingCardsProps) {
  const defaultPackages: PricingPackage[] = [
    {
      name: "Basic Curated Listing",
      price: "€149",
      recurring: `+ €49 ${perMonth}`,
      cta: getStarted,
      features: ["Standard profile page", "Inquiry form & lead capture", "Standard placement", "Basic support"]
    },
    {
      name: "Premium Showcase",
      price: "€399",
      recurring: `+ €149 ${perMonth}`,
      popular: true,
      cta: getStarted,
      features: ["Everything in Basic", "Featured placement", "Enhanced profile & visuals", "Priority support"]
    },
    {
      name: "Partner Search Campaign",
      price: "€950+",
      recurring: oneTime,
      cta: getStarted,
      features: ["Everything in Premium", "Targeted outreach", "Curated prospect list", "Campaign report"]
    },
    {
      name: "Success / Introduction Fee",
      price: "Custom",
      recurring: byAgreement,
      cta: contactUs,
      features: ["Only where legally appropriate", "Based on value & scope", "Transparent terms"]
    }
  ];

  const displayPackages = packages || defaultPackages;

  return (
    <section className="pricing-section">
      <div className="section-heading">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="pricing-grid">
        {displayPackages.map((pkg) => (
          <article className={pkg.popular ? "pricing-card popular" : "pricing-card"} key={pkg.name}>
            {pkg.popular && <div className="popular-ribbon">{mostPopular}</div>}
            <h3>{pkg.name}</h3>
            <div className="price">{pkg.price}</div>
            <p>{pkg.recurring}</p>
            <ul>
              {pkg.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
            </ul>
            <Link className={pkg.popular ? "btn btn-orange full" : "btn btn-line full"} href={`/${locale}/list-your-opportunity#application`}>
              {pkg.cta}
            </Link>
          </article>
        ))}
      </div>
      <p className="legal-note">{legalNote}</p>
    </section>
  );
}
