import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { InquiryForm } from "@/components/InquiryForm";
import { PricingCards } from "@/components/PricingCards";
import { CategoryGrid } from "@/components/CategoryGrid";
import { curationSteps, categories, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "List Your Opportunity",
  description: "Showcase your product, service, franchise, licensing, private label or distribution opportunity to qualified international partners.",
  alternates: { canonical: `${site.url}/list-your-opportunity` }
};

export default function ListOpportunityPage() {
  return (
    <>
      <section className="companies-hero">
        <div>
          <div className="eyebrow">For Companies</div>
          <h1>Showcase your business opportunity to qualified <span>international partners.</span></h1>
          <p>We help you reach importers, distributors, franchisees, operators and investors looking for the right opportunities.</p>
          <ul className="check-list">
            <li>Curated & Verified Platform</li>
            <li>Qualified International Reach</li>
            <li>Structured Opportunity Profile</li>
            <li>Serious Inquiries That Convert</li>
          </ul>
        </div>
        <div className="companies-visual">
          <img src="/assets/companies-hero-collage.webp" alt="International business partners and logistics visuals" />
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <h2>Who Can List?</h2>
          <p>We welcome a wide range of business opportunities.</p>
        </div>
        <div className="who-grid">
          {categories.map((category) => (
            <div className="who-card" key={category.title}>
              <img src={category.image} alt="" />
              <span>{category.title}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section" id="how-it-works">
        <div className="section-heading">
          <h2>Our Curation Process</h2>
        </div>
        <div className="process-row">
          {curationSteps.map(([num, title, text]) => (
            <div className="process-step" key={num}>
              <div className="process-num">{num}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <PricingCards />

      <section className="content-section" id="application">
        <InquiryForm title="Apply to List Your Opportunity" />
      </section>

      <CTA compact />
    </>
  );
}
