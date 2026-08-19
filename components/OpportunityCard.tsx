"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Opportunity } from "@/lib/data";

import { JIPJapanBadge } from "@/components/JIPJapanBadge";

export function OpportunityCard({ opportunity, locale = "en" }: { opportunity: Opportunity; locale?: string }) {
  const t = useTranslations("opportunities");
  const isJip = opportunity.sourcePartner === "JIP Japan" || opportunity.sourcePartner === "Japan Industrial Promotion Inc." || opportunity.id.startsWith("jip-");
  const isSonic = opportunity.slug === "sonic-friends-europe-2027";

  return (
    <article className="opportunity-card">
      <div className="card-image-wrap">
        <img src={opportunity.cardImage} alt={opportunity.imageAlt || `${opportunity.title} — opportunity image`} loading="lazy" />
        <span className="type-pill">{opportunity.type.split(" / ")[0]}</span>
        {isSonic && (
          <span style={{ position: "absolute", top: 10, left: 10, background: "#ffcc00", color: "#000", fontWeight: 800, fontSize: "0.75rem", padding: "3px 8px", borderRadius: 4, zIndex: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
            ⭐ NEW
          </span>
        )}
        {isJip && <JIPJapanBadge variant="card" showLabel={false} />}
      </div>
      <div className="card-body">
        <h3>{isSonic ? "SONIC & FRIENDS — European Retail & Distribution 2027" : opportunity.title}</h3>
        <p>{opportunity.summary}</p>
        <div className="meta-row">
          <span>📍 {opportunity.originCountry}</span>
          <span>🌍 {opportunity.targetMarkets.slice(0, 2).join(", ")}</span>
        </div>
        <div className="badge-row">
          {opportunity.verificationBadges.slice(0, 3).map((badge) => (
            <span className="mini-badge" key={badge}>✓ {badge}</span>
          ))}
        </div>
        <Link className="btn btn-line full" href={`/${locale}/opportunities/${opportunity.slug}`}>{t("viewDetails")}</Link>
      </div>
    </article>
  );
}
