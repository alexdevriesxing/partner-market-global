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
  getStarted?: string;
  contactUs?: string;
};

export function PricingCards({
  locale = "en",
  packages,
  title = "Commercial Terms On Inquiry",
  subtitle = "Partner Market Global works on a 100% commission-based model. The exact commission, scope and trigger are agreed in writing before representation starts.",
  legalNote = "Commercial terms are provided on inquiry. Commission applies only under a written agreement that defines scope, territory, trigger, timing and any exclusions. We do not provide legal, financial or investment advice.",
  mostPopular = "Commission Based",
  getStarted = "Inquire About Terms",
  contactUs = "Discuss Commission Terms"
}: PricingCardsProps) {
  const defaultPackages: PricingPackage[] = [
    {
      name: "Commission-Based Listing",
      price: "On inquiry",
      recurring: "100% commission based",
      cta: contactUs,
      features: [
        "No public fixed listing package",
        "Commercial scope agreed before launch",
        "Curated opportunity profile",
        "Qualified inquiry handling"
      ]
    },
    {
      name: "Qualified Introduction",
      price: "Commission only",
      recurring: "Based on agreed outcomes",
      popular: true,
      cta: getStarted,
      features: [
        "Introductions only after qualification",
        "Commission trigger defined in writing",
        "Relevant decision-maker matching",
        "Transparent follow-up process"
      ]
    },
    {
      name: "Partner Search Support",
      price: "On inquiry",
      recurring: "Commission agreement required",
      cta: contactUs,
      features: [
        "Targeted partner search when suitable",
        "Territory and opportunity scope defined",
        "No generic upfront package pricing",
        "Only where legally appropriate"
      ]
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
              {pkg.features.map((feature) => <li key={feature}>- {feature}</li>)}
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
