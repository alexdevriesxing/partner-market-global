import Link from "next/link";
import { CategoryPageData, getMatchingOpportunities } from "@/lib/category-pages";
import { OpportunityCard } from "@/components/OpportunityCard";
import { StructuredData } from "@/components/StructuredData";
import { CategoryGrid } from "@/components/CategoryGrid";
import { CTA } from "@/components/CTA";
import { canonicalUrl } from "@/lib/seo";

interface CategoryPageTemplateProps {
  locale: string;
  data: CategoryPageData;
}

export function CategoryPageTemplate({ locale, data }: CategoryPageTemplateProps) {
  const matchingOpps = getMatchingOpportunities(data.typeKey);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl(locale)
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Opportunities",
        item: canonicalUrl(locale, "/opportunities")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.title,
        item: canonicalUrl(locale, `/${data.slug}`)
      }
    ]
  };

  return (
    <>
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      {/* Hero Section */}
      <section className="page-hero">
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div className="eyebrow" style={{ color: "var(--primary)", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>
            {data.eyebrow}
          </div>
          <h1 style={{ fontSize: "2.4rem", lineHeight: "1.2", marginBottom: "16px", color: "var(--foreground)" }}>
            {data.heroHeadline}
          </h1>
          <p style={{ fontSize: "1.15rem", color: "var(--muted, #475569)", lineHeight: "1.6", marginBottom: "24px" }}>
            {data.heroSubheadline}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#opportunities" className="btn btn-primary" style={{ padding: "12px 24px", borderRadius: "8px", fontWeight: "600" }}>
              Explore Active Listings ({matchingOpps.length})
            </a>
            <Link href={`/${locale}/submit-opportunity`} className="btn btn-secondary" style={{ padding: "12px 24px", borderRadius: "8px", fontWeight: "600" }}>
              List Your Opportunity
            </Link>
          </div>
        </div>
      </section>

      {/* Direct Answer & Definition Section for GAIO/AEO */}
      <section className="content-section" style={{ paddingTop: "0", paddingBottom: "40px" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)", border: "1px solid #bae6fd", borderRadius: "12px", padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "1.4rem" }}>⚡</span>
              <strong style={{ fontSize: "1.1rem", color: "#0369a1", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Commercial Overview & Direct Answer
              </strong>
            </div>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.7", color: "#0f172a", marginBottom: "16px", fontWeight: "500" }}>
              {data.directAnswer}
            </p>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#334155", margin: 0 }}>
              {data.definition}
            </p>
          </div>
        </div>
      </section>

      {/* Active Matching Opportunities Grid */}
      <section className="featured-section" id="opportunities" style={{ backgroundColor: "var(--soft-bg, #f8fafc)", padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div className="section-top" style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <span className="eyebrow" style={{ color: "var(--primary)", fontWeight: "600", letterSpacing: "0.05em" }}>LIVE DEALS</span>
              <h2 style={{ fontSize: "1.8rem", color: "var(--foreground)", margin: "4px 0" }}>Active {data.eyebrow} Listings</h2>
              <p style={{ color: "var(--muted, #64748b)", margin: 0 }}>Pre-screened commercial opportunities available for immediate buyer qualification.</p>
            </div>
            <Link href={`/${locale}/opportunities`} style={{ fontWeight: "600", color: "var(--primary)", textDecoration: "underline" }}>
              View all opportunities ({matchingOpps.length}+) →
            </Link>
          </div>

          <div className="opportunity-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {matchingOpps.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="content-section" style={{ padding: "56px 0" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
          <div className="section-heading" style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className="eyebrow" style={{ color: "var(--primary)", fontWeight: "600", letterSpacing: "0.05em" }}>TARGET BUYER PROFILES</span>
            <h2 style={{ fontSize: "2rem", color: "var(--foreground)" }}>Who is this opportunity suited for?</h2>
            <p style={{ maxWidth: "640px", margin: "8px auto 0", color: "var(--muted, #64748b)" }}>
              Commercial criteria and target partner profiles evaluated during the qualification process.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {data.whoIsItFor.map((item, idx) => (
              <div key={idx} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "24px", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", marginBottom: "14px" }}>
                  {idx + 1}
                </div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--foreground)" }}>{item.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: "1.5", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Structure & Qualification */}
      <section className="content-section bg-soft" style={{ padding: "56px 0", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px" }}>
          <div className="section-heading" style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className="eyebrow" style={{ color: "var(--primary)", fontWeight: "600", letterSpacing: "0.05em" }}>COMMERCIAL FRAMEWORK</span>
            <h2 style={{ fontSize: "2rem", color: "var(--foreground)" }}>Qualification & Commercial Terms</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "32px" }}>
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "var(--foreground)", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                📋 Partner Qualification Requirements
              </h3>
              <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "0.9rem", lineHeight: "1.6", color: "#334155" }}>
                {data.qualificationCriteria.map((crit, idx) => (
                  <li key={idx} style={{ marginBottom: "8px" }}>{crit}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "var(--foreground)", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                ⚖ Commercial & Logistics Model
              </h3>
              <div style={{ fontSize: "0.9rem", lineHeight: "1.6", color: "#334155" }}>
                <p style={{ marginBottom: "10px" }}><strong>Commercial Model:</strong> {data.commercialStructure.model}</p>
                <p style={{ marginBottom: "10px" }}><strong>Pricing & Terms:</strong> {data.commercialStructure.terms}</p>
                <p style={{ marginBottom: "10px" }}><strong>Exclusivity:</strong> {data.commercialStructure.exclusivity}</p>
                <p style={{ margin: 0 }}><strong>Logistics:</strong> {data.commercialStructure.logistics}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" style={{ padding: "56px 0" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
          <div className="section-heading" style={{ textAlign: "center", marginBottom: "36px" }}>
            <span className="eyebrow" style={{ color: "var(--primary)", fontWeight: "600", letterSpacing: "0.05em" }}>FAQ</span>
            <h2 style={{ fontSize: "2rem", color: "var(--foreground)" }}>Frequently Asked Questions</h2>
            <p style={{ color: "#64748b", margin: "8px 0 0" }}>Key information regarding {data.title.toLowerCase()}.</p>
          </div>

          <div className="faq-grid" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {data.faqs.map((faq, idx) => (
              <div key={idx} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px" }}>
                <h3 style={{ fontSize: "1.05rem", color: "#0f172a", margin: "0 0 8px 0" }}>{faq.question}</h3>
                <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: "1.6", margin: 0 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid for Interlinking */}
      <CategoryGrid locale={locale} />

      {/* Final CTA */}
      <CTA
        locale={locale}
        headline="Ready to expand your commercial portfolio?"
        subheadline="Connect directly with verified international brand owners or list your company's expansion opportunity."
        feature1="Pre-screened verified manufacturers"
        feature2="100% commission-based transparent terms"
        feature3="Direct decision-maker communication"
        feature4="Comprehensive document & sample support"
        ctaList="List an Opportunity"
        ctaTerms="View Commercial Terms"
      />
    </>
  );
}
