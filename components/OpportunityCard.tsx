"use client";
import Link from "next/link";
import type { Opportunity } from "@/lib/data";

export function OpportunityCard({ opportunity, locale = "en" }: { opportunity: Opportunity; locale?: string }) {
  return (
    <article className="opportunity-card">
      <div className="card-image-wrap">
        <img src={opportunity.cardImage} alt={`${opportunity.title} hero image`} loading="lazy" />
        <span className="type-pill">{opportunity.type.split(" / ")[0]}</span>
      </div>
      <div className="card-body">
        <h3>{opportunity.title}</h3>
        <p>{opportunity.summary}</p>
        <div className="meta-row">
          <span>📍 {opportunity.originCountry}</span>
          <span>🌍 {opportunity.targetMarkets.slice(0, 2).join(", ")}</span>
        </div>
        <div className="badge-row">
          {opportunity.verificationBadges.slice(0, 2).map((badge) => (
            <span className="mini-badge" key={badge}>✓ {badge}</span>
          ))}
        </div>
        <Link className="btn btn-line full" href={`/${locale}/opportunities/${opportunity.slug}`}>View Details</Link>
      </div>
    </article>
  );
}
