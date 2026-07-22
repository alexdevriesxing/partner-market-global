import Link from "next/link";

type CTAProps = {
  compact?: boolean;
  locale?: string;
  headline?: string;
  subheadline?: string;
  feature1?: string;
  feature2?: string;
  feature3?: string;
  feature4?: string;
  ctaList?: string;
  ctaTerms?: string;
};

export function CTA({
  compact = false,
  locale = "en",
  headline = "Have a product, service, brand or franchise ready for new markets?",
  subheadline = "Showcase your opportunity to qualified international partners.",
  feature1 = "Reach global qualified partners",
  feature2 = "Structured & verified opportunity profile",
  feature3 = "Qualified inquiries that convert",
  feature4 = "Grow your business internationally",
  ctaList = "Submit an Opportunity",
  ctaTerms = "View Commercial Terms"
}: CTAProps) {
  return (
    <section className={compact ? "cta-band compact" : "cta-band"}>
      <div>
        <h2>{headline}</h2>
        <p>{subheadline}</p>
      </div>
      <div className="cta-features">
        <span>✈ {feature1}</span>
        <span>▣ {feature2}</span>
        <span>◔ {feature3}</span>
        <span>✣ {feature4}</span>
      </div>
      <div className="cta-actions">
        <Link className="btn btn-orange" href={`/${locale}/submit-opportunity`}>{ctaList}</Link>
        <Link className="btn btn-dark-outline" href={`/${locale}/commercial-terms`}>{ctaTerms}</Link>
      </div>
    </section>
  );
}
