import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SubmitOpportunityForm } from "@/components/SubmitOpportunityForm";
import { pageMetadata, canonicalUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  return pageMetadata({
    locale,
    path: "/submit-opportunity",
    title: "Submit a Business Opportunity | Partner Market Global",
    description: "Submit your product, service, distribution, investment or partnership opportunity to Partner Market Global for review."
  });
}

export default async function SubmitOpportunityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": canonicalUrl(locale, "")
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Submit an Opportunity",
          "item": canonicalUrl(locale, "/submit-opportunity")
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I submit a business opportunity to Partner Market Global?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Companies, manufacturers, brand owners, and authorized representatives can fill out the 3-step online intake form on Partner Market Global. Provide details regarding the opportunity title, company background, description, requested partner types, target markets, pictures, and contact details."
          }
        },
        {
          "@type": "Question",
          "name": "What types of business opportunities can be submitted?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Partner Market Global accepts international B2B opportunities across product distribution rights, export/import partnerships, licensing, master franchise rights, private label/OEM manufacturing, joint ventures, and strategic investments."
          }
        },
        {
          "@type": "Question",
          "name": "What happens after submitting an opportunity?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Submissions receive a unique reference code (e.g. PMG-20260722-XXXX) and are routed to our review team at De Vries Sales Consultancy. If further information or qualification is needed, our team contacts the submitter before creating a verified public showcase profile."
          }
        },
        {
          "@type": "Question",
          "name": "What if no target countries or regions are specified during submission?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If target countries are left blank during intake, the opportunity is automatically registered and evaluated internally as open 'Worldwide'."
          }
        }
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <div className="submit-opportunity-page" style={{ padding: "48px 20px 80px 20px", background: "var(--body-bg, #f8fafc)", minHeight: "80vh" }}>
        <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
          
          {/* Header Introduction */}
          <div className="section-top text-center" style={{ marginBottom: 40 }}>
            <span className="eyebrow" style={{ color: "var(--primary, #0f766e)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              OPPORTUNITY INTAKE
            </span>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 700, margin: "8px 0 16px 0", color: "var(--foreground, #0f172a)" }}>
              Submit a Business Opportunity
            </h1>
            <p style={{ fontSize: "1.05rem", color: "#475569", maxWidth: 720, margin: "0 auto 16px auto", lineHeight: 1.6 }}>
              Do you represent a company looking for distributors, importers, retailers, investors, licensees, franchise partners, customers or strategic partners?
            </p>
            <p style={{ fontSize: "0.95rem", color: "#64748b", maxWidth: 700, margin: "0 auto 20px auto", lineHeight: 1.5 }}>
              Tell us briefly about the opportunity and upload any relevant pictures or documents. Partner Market Global will review the submission and contact you if we need further information. The form normally takes only a few minutes to complete.
            </p>
            
            <div style={{ display: "inline-block", background: "#fff", padding: "10px 18px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.85rem", color: "#64748b", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
              🔒 <strong>Note:</strong> Please do not submit confidential information that you are not authorised to share.
            </div>
          </div>

          {/* Interactive 3-Step Intake Form Component */}
          <SubmitOpportunityForm locale={locale} />

          {/* GAIO / AI Search Semantic FAQ & Guidance Section */}
          <section className="faq-section" style={{ marginTop: 64, borderTop: "1px solid #e2e8f0", paddingTop: 40 }}>
            <div className="section-top text-center" style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a" }}>
                Opportunity Submission FAQ & Process
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#64748b" }}>
                Clear answers for brand owners, manufacturers, and international trade representatives.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              <div style={{ background: "#ffffff", padding: 20, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#0f766e", marginBottom: 8 }}>
                  Who can submit an opportunity?
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.5 }}>
                  Submissions are open to manufacturers, brand owners, service providers, trade associations, and authorized consultants seeking international channel expansion.
                </p>
              </div>

              <div style={{ background: "#ffffff", padding: 20, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#0f766e", marginBottom: 8 }}>
                  How are submissions evaluated?
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.5 }}>
                  Our team reviews submission details, market readiness, certifications, and product distinctiveness before shortlisting opportunities for showcase inclusion.
                </p>
              </div>

              <div style={{ background: "#ffffff", padding: 20, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#0f766e", marginBottom: 8 }}>
                  Is target market default to Worldwide?
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.5 }}>
                  Yes. If target countries or regions are left blank during intake, the opportunity is automatically evaluated as open for worldwide market development.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
