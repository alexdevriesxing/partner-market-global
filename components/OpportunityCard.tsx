"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Opportunity } from "@/lib/data";

export function OpportunityCard({ opportunity, locale = "en" }: { opportunity: Opportunity; locale?: string }) {
  const t = useTranslations("opportunities");
  return (
    <article className="opportunity-card">
      <div className="card-image-wrap">
        <img src={opportunity.cardImage} alt={opportunity.imageAlt || `${opportunity.title} — opportunity image`} loading="lazy" />
        <span className="type-pill">{opportunity.type.split(" / ")[0]}</span>
        {opportunity.id.startsWith("jip-") && opportunity.originCountry === "Japan" && (
          <div className="jip-card-logo" style={{
            position: "absolute",
            top: "9px",
            right: "11px",
            background: "rgba(255, 255, 255, 0.95)",
            padding: "3px 6px",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
            zIndex: 10
          }}>
            <img src="/assets/jip-logo.png" alt="JIP Japan" style={{ height: "14px", width: "auto", objectFit: "contain", transform: "none" }} />
          </div>
        )}
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
        <Link className="btn btn-line full" href={`/${locale}/opportunities/${opportunity.slug}`}>{t("viewDetails")}</Link>
      </div>
    </article>
  );
}
