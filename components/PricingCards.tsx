import Link from "next/link";
import { commercialPackages } from "@/lib/data";

export function PricingCards() {
  return (
    <section className="pricing-section">
      <div className="section-heading">
        <h2>Commercial Packages</h2>
        <p>Choose the package that fits your goals. All prices in EUR.</p>
      </div>
      <div className="pricing-grid">
        {commercialPackages.map((pkg) => (
          <article className={pkg.popular ? "pricing-card popular" : "pricing-card"} key={pkg.name}>
            {pkg.popular && <div className="popular-ribbon">Most Popular</div>}
            <h3>{pkg.name}</h3>
            <div className="price">{pkg.price}</div>
            <p>{pkg.recurring}</p>
            <ul>
              {pkg.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
            </ul>
            <Link className={pkg.popular ? "btn btn-orange full" : "btn btn-line full"} href="/list-your-opportunity#application">
              {pkg.cta}
            </Link>
          </article>
        ))}
      </div>
      <p className="legal-note">All packages are subject to our Terms of Use. We do not provide legal, financial or investment advice.</p>
    </section>
  );
}
