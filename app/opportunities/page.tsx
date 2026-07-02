import type { Metadata } from "next";
import { CategoryGrid } from "@/components/CategoryGrid";
import { OpportunityCard } from "@/components/OpportunityCard";
import { CTA } from "@/components/CTA";
import { opportunities, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Import, Export, Distribution & Franchise Opportunities",
  description: "Browse curated B2B opportunities for importers, exporters, distributors, franchisees, licensing partners and country market operators.",
  alternates: { canonical: `${site.url}/opportunities` }
};

export default function OpportunitiesPage() {
  const filters = ["All", "Import", "Export", "Franchise", "Distribution", "Licensing", "Private Label / OEM", "Country Partner"];
  return (
    <>
      <section className="page-hero">
        <div>
          <div className="eyebrow">Opportunity Showcase</div>
          <h1>Browse curated <span>business opportunities</span></h1>
          <p>
            Explore verified import, export, distribution, master franchise, licensing and private label opportunities from businesses ready to enter new markets.
          </p>
        </div>
        <img src="/assets/featured-opportunities-strip.webp" alt="Featured opportunity cards" />
      </section>

      <div className="filter-bar">
        {filters.map((filter) => <span className="filter-chip" key={filter}>{filter}</span>)}
      </div>

      <section className="featured-section">
        <div className="opportunity-grid">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </section>

      <CategoryGrid />
      <CTA compact />
    </>
  );
}
