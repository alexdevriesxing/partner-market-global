import Link from "next/link";

export function CTA({ compact = false, locale = "en" }: { compact?: boolean; locale?: string }) {
  return (
    <section className={compact ? "cta-band compact" : "cta-band"}>
      <div>
        <h2>Have a product, service, brand or franchise ready for new markets?</h2>
        <p>Showcase your opportunity to qualified international partners.</p>
      </div>
      <div className="cta-features">
        <span>✈ Reach global qualified partners</span>
        <span>▣ Structured & verified opportunity profile</span>
        <span>◔ Qualified inquiries that convert</span>
        <span>✣ Grow your business internationally</span>
      </div>
      <div className="cta-actions">
        <Link className="btn btn-orange" href={`/${locale}/list-your-opportunity`}>Apply to List Your Opportunity</Link>
        <Link className="btn btn-dark-outline" href={`/${locale}/commercial-terms`}>View Commercial Terms</Link>
      </div>
    </section>
  );
}
