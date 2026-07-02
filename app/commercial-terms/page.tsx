import type { Metadata } from "next";
import { PricingCards } from "@/components/PricingCards";
import { CTA } from "@/components/CTA";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Commercial Terms",
  description: "Commercial package options for listing import, export, distribution, licensing and franchise opportunities on Partner Market Global.",
  alternates: { canonical: `${site.url}/commercial-terms` }
};

export default function CommercialTermsPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <div className="eyebrow">Commercial Terms</div>
          <h1>Transparent packages for <span>international opportunity promotion</span></h1>
          <p>Choose a simple listing, premium showcase or partner-search campaign depending on your growth goals.</p>
        </div>
        <img src="/assets/packages-section.webp" alt="Partner Market Global commercial package cards" />
      </section>
      <PricingCards />
      <section className="content-section">
        <h2>Important Notes</h2>
        <p>
          Partner Market Global provides marketing, curation and lead-generation services. We do not provide legal, financial,
          investment, franchise, tax or securities advice. Companies and interested partners are responsible for their own due
          diligence, legal review and market-specific compliance.
        </p>
        <p>
          Success or introduction fees should only be used where legally appropriate and always under a clear written agreement.
        </p>
      </section>
      <CTA compact />
    </>
  );
}
