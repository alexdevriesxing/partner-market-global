"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface FeaturedCelebleHeroProps {
  locale: string;
}

export function FeaturedCelebleHero({ locale }: FeaturedCelebleHeroProps) {
  const oppUrl = `/${locale}/opportunities/celeble-non-alcoholic-sparkling-wine-distribution`;
  const inquireUrl = `/${locale}/opportunities/celeble-non-alcoholic-sparkling-wine-distribution#inquire`;
  const productsUrl = `/${locale}/opportunities/celeble-non-alcoholic-sparkling-wine-distribution#lineup`;
  const dataUrl = `/${locale}/opportunities/celeble-non-alcoholic-sparkling-wine-distribution#market`;

  const chips = [
    "Japan F&B Innovation",
    "0.00% Sparkling Wine",
    "Zero Caffeine",
    "100% Vegan Friendly",
    "Fine Dining & HORECA",
    "Sommelier Endorsed",
    "Toyama, Japan",
    "Proven Global Exports"
  ];

  const proofPoints = [
    { value: "0.00% ALCOHOL", label: "Authentic Fermentation, Zero Alcohol" },
    { value: "0 CAFFEINE", label: "Vegan & Diverse Culture Friendly" },
    { value: "4 PROVEN SKUS", label: "Blanc • Rosé • Dry • Blanc Mini" },
    { value: "GLOBAL EXPORTS", label: "USA • Saudi Arabia • Singapore • Taiwan" }
  ];

  return (
    <section className="featured-hero-celeble" aria-label="Lead Featured Opportunity: Celeblé Japanese Premium Sparkling Beverage">
      <div className="celeble-hero-inner">
        <motion.div
          className="celeble-hero-content"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="celeble-top-badge-row">
            <span className="celeble-eyebrow">FEATURED OPPORTUNITY</span>
            <span className="celeble-badge-new">NEW GLOBAL PARTNERSHIP OPPORTUNITY</span>
            <span className="celeble-badge-origin">TOYAMA, JAPAN • EST. 2000</span>
          </div>

          <h1 className="celeble-title">
            Japanese Premium 0.00% Sparkling Beverage <br className="hidden-mobile" />
            <span>Seeking Global Distribution Partners</span>
          </h1>

          <p className="celeble-description">
            <strong>Balance Co., Ltd.</strong> of Toyama, Japan is seeking qualified international importers, distributors and market-development partners for <strong>Celeblé</strong>, its premium 0.00% sparkling beverage range. Fermented from wine-grape varieties to deliver authentic wine complexity, crisp food-pairing acidity, and delicate effervescence without alcohol or caffeine.
          </p>

          <div className="celeble-proof-grid">
            {proofPoints.map((pt) => (
              <div key={pt.value} className="celeble-proof-item">
                <span className="celeble-proof-val">{pt.value}</span>
                <span className="celeble-proof-label">{pt.label}</span>
              </div>
            ))}
          </div>

          <div className="celeble-chips-wrap">
            {chips.map((chip) => (
              <span key={chip} className="celeble-chip">
                {chip}
              </span>
            ))}
          </div>

          <div className="celeble-actions">
            <Link href={oppUrl} className="btn-celeble-primary">
              Explore the Opportunity
            </Link>
            <Link href={inquireUrl} className="btn-celeble-secondary">
              Request Distribution Terms
            </Link>
          </div>

          <div className="celeble-tertiary">
            <Link href={productsUrl} className="celeble-tertiary-link" style={{ marginRight: 18 }}>
              Compare 4 Celeblé SKUs (Blanc, Rosé, Dry, Mini) →
            </Link>
            <Link href={dataUrl} className="celeble-tertiary-link">
              View Japan Restaurant Adoption Data →
            </Link>
          </div>

          {/* Crawlable descriptive B2B SEO context for search engines and AI engines */}
          <div className="celeble-seo-context">
            Partner Market Global is collaborating with <strong>Balance Co., Ltd.</strong> of Toyama, Japan to establish qualified international distribution partnerships for <strong>Celeblé</strong>, Japan&apos;s leading culinary 0.00% non-alcoholic sparkling beverage. Inquiries welcome from licensed beverage importers, luxury hotel procurement teams, and premium retail groups.
          </div>
        </motion.div>

        <motion.div
          className="celeble-hero-media"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={oppUrl} className="celeble-image-card" aria-label="Explore Celeblé 0.00% sparkling beverage distribution opportunity">
            <picture>
              <source
                srcSet="/images/opportunities/celeble/celeble-featured-opportunity-home.webp"
                type="image/webp"
              />
              <img
                src="/images/opportunities/celeble/celeble-featured-opportunity-home.webp"
                alt="Celeblé Japanese premium 0.00% non-alcoholic sparkling beverage bottle and champagne flute with gourmet food pairings"
                width={1600}
                height={895}
                className="celeble-hero-img"
                loading="eager"
              />
            </picture>
            <div className="celeble-media-badge">
              <span className="celeble-media-badge-dot" />
              <span>Balance Co., Ltd. • 0.00% Diversity Sparkling</span>
            </div>
            <div className="celeble-media-overlay">
              <span className="celeble-media-cta">Explore Full Opportunity Profile →</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
