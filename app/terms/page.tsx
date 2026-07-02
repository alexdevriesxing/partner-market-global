import type { Metadata } from "next";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use and disclaimer for Partner Market Global.",
  alternates: { canonical: `${site.url}/terms` }
};

export default function TermsPage() {
  return (
    <section className="content-section">
      <h1>Terms of Use</h1>
      <p>Last updated: 2 July 2026</p>
      <p>
        Partner Market Global is a curated business opportunity showcase. By using this website, you agree that listings are provided for information and business introduction purposes only.
      </p>
      <h2 id="disclaimer">Disclaimer</h2>
      <p>
        We do not guarantee commercial success, profitability, financing, market entry approval, legal compliance or partner performance.
        We do not provide legal, financial, investment, franchise, tax or securities advice. Users must conduct their own due diligence.
      </p>
      <h2>Listings</h2>
      <p>
        We may reject, edit, suspend or remove listings that are incomplete, misleading, outdated or unsuitable for the platform.
      </p>
      <h2>Inquiries</h2>
      <p>
        Submitting an inquiry does not create a partnership, franchise agreement, distribution agreement or investment relationship.
      </p>
      <h2>Contact</h2>
      <p>Questions about these terms can be sent to {site.email}.</p>
    </section>
  );
}
