import type { Metadata } from "next";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Partner Market Global connects ambitious businesses with qualified international market partners through curated opportunity profiles.",
  alternates: { canonical: `${site.url}/about` }
};

export default function AboutPage() {
  return (
    <section className="content-section">
      <div className="eyebrow">About Partner Market Global</div>
      <h1>Connecting brands, businesses and opportunities with the right partners around the world.</h1>
      <p>
        Partner Market Global is designed for companies that want a better way to present international opportunities than a generic directory or cold outreach campaign.
      </p>
      <p>
        We structure each opportunity into a clear, investor-deck-quality profile covering partner requirements, market scope,
        commercial model, credentials, available documents and the next step for interested parties.
      </p>
      <h2>Our Focus</h2>
      <ul>
        <li>Import and export opportunities</li>
        <li>Distribution and country partner rights</li>
        <li>Franchise and master franchise opportunities</li>
        <li>Licensing, brand partnerships and private label / OEM opportunities</li>
      </ul>
    </section>
  );
}
