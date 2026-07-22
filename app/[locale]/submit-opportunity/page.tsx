import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SubmitOpportunityForm } from "@/components/SubmitOpportunityForm";
import { pageMetadata } from "@/lib/seo";

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

  return (
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

      </div>
    </div>
  );
}
