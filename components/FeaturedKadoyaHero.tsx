"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface FeaturedKadoyaHeroProps {
  locale: string;
}

export function FeaturedKadoyaHero({ locale }: FeaturedKadoyaHeroProps) {
  const oppUrl = `/${locale}/opportunities/kadoya-tai-to-kome-japanese-restaurant-franchise`;
  const inquireUrl = `/${locale}/opportunities/kadoya-tai-to-kome-japanese-restaurant-franchise#inquire`;
  const conceptUrl = `/${locale}/opportunities/kadoya-tai-to-kome-japanese-restaurant-franchise#concept`;
  const roadmapUrl = `/${locale}/opportunities/kadoya-tai-to-kome-japanese-restaurant-franchise#roadmap`;

  const chips = [
    "Ehime Regional Cuisine",
    "Tai-meshi (Sea Bream Rice)",
    "Signature Karaage Hook",
    "Proprietary Golden Dashi",
    "Hong Kong • Taiwan • Thailand",
    "Flexible 10–50+ Tsubo Formats",
    "Master Franchise & Licensing",
    "JIP Japan Partner"
  ];

  const proofPoints = [
    { value: "60+ YRS HERITAGE", label: "Est. 1962 in Uwajima, Ehime • ~JPY 2.15B Sales" },
    { value: "CLAY POT × DASHI", label: "Piping-Hot Tai-meshi & Secret Golden Dashi" },
    { value: "KARAAGE STRATEGY", label: "Universal High-Repeat Appeal for Families & Youth" },
    { value: "LEAN OPERATIONS", label: "Standardized SOPs • No Master Chef Dependency" }
  ];

  return (
    <section className="featured-hero-kadoya" aria-label="Featured Franchise Opportunity: Kadoya Tai to Kome Japanese Restaurant Franchise">
      <div className="kadoya-hero-inner">
        <motion.div
          className="kadoya-hero-content"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="kadoya-top-badge-row">
            <span className="kadoya-eyebrow">FEATURED FRANCHISE OPPORTUNITY | JAPAN | FOOD &amp; BEVERAGE</span>
            <span className="kadoya-badge-new">NEW ASIAN EXPANSION OPPORTUNITY</span>
            <span className="kadoya-badge-origin">UWAJIMA, EHIME • EST. 1962</span>
          </div>

          <h1 className="kadoya-title">
            Bring Authentic Japanese Tai-meshi &amp; Karaage to Asia <br className="hidden-mobile" />
            <span>Kadoya Franchise &amp; Licensing Partners Wanted</span>
          </h1>

          <p className="kadoya-subheading">
            A Taste of Ehime. Partner with an established Japanese restaurant group to introduce distinctive clay-pot sea bream rice, rich golden dashi and signature karaage to new Asian markets.
          </p>

          <p className="kadoya-description">
            From the coastal culinary traditions of Ehime Prefecture comes a Japanese dining concept built around exceptional rice, sea bream and carefully crafted golden dashi. <strong>Kadoya Co., Ltd.</strong> combines regional Japanese culinary heritage with the approachable popularity of karaage, creating a restaurant experience designed to appeal to families, business diners and discerning customers seeking something beyond the familiar sushi and ramen concepts. With decades of restaurant operating experience in Japan, Kadoya is seeking qualified Asian restaurant operators, hospitality groups and multi-unit franchise partners to explore localized restaurant licensing, franchise development and wider market expansion.
          </p>

          <div className="kadoya-proof-grid">
            {proofPoints.map((pt) => (
              <div key={pt.value} className="kadoya-proof-item">
                <span className="kadoya-proof-val">{pt.value}</span>
                <span className="kadoya-proof-label">{pt.label}</span>
              </div>
            ))}
          </div>

          <div className="kadoya-chips-wrap">
            {chips.map((chip) => (
              <span key={chip} className="kadoya-chip">
                {chip}
              </span>
            ))}
          </div>

          <div className="kadoya-actions">
            <Link href={oppUrl} className="btn-kadoya-primary">
              EXPLORE FRANCHISE OPPORTUNITY
            </Link>
            <Link href={inquireUrl} className="btn-kadoya-secondary">
              REQUEST COMMERCIAL INTRODUCTION
            </Link>
          </div>

          <div className="kadoya-tertiary">
            <Link href={conceptUrl} className="kadoya-tertiary-link" style={{ marginRight: 18 }}>
              Explore Clay Pot &amp; Karaage Dual-Pillar Concept →
            </Link>
            <Link href={roadmapUrl} className="kadoya-tertiary-link">
              View 4-Phase Asian Expansion Roadmap &amp; Formats →
            </Link>
          </div>

          {/* Crawlable descriptive B2B SEO context for search engines and AI engines */}
          <div className="kadoya-seo-context">
            Partner Market Global is collaborating with <strong>Kadoya Co., Ltd.</strong> of Uwajima, Ehime (introduced via Japan Industrial Promotion - JIP) to identify qualified multi-unit restaurant operators, hospitality groups, and master franchise partners for the international brand concept <strong>&quot;Tai to Kome&quot;</strong>. Priority expansion targets include Hong Kong, Taiwan, and Thailand, with secondary evaluation across Southeast Asia.
          </div>
        </motion.div>

        <motion.div
          className="kadoya-hero-media"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={oppUrl} className="kadoya-image-card" aria-label="Explore Kadoya Tai to Kome Japanese restaurant franchise opportunity">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/images/opportunities/kadoya/kadoya-hero-mobile.webp"
                type="image/webp"
              />
              <source
                media="(max-width: 768px)"
                srcSet="/images/opportunities/kadoya/kadoya-hero-mobile.jpg"
              />
              <source
                srcSet="/images/opportunities/kadoya/kadoya-hero-desktop.webp"
                type="image/webp"
              />
              <img
                src="/images/opportunities/kadoya/kadoya-hero-desktop.jpg"
                alt="Kadoya Tai to Kome Japanese earthenware clay pot sea bream rice Tai-meshi with golden dashi and crispy karaage fried chicken"
                width={1920}
                height={1080}
                className="kadoya-hero-img"
                loading="eager"
              />
            </picture>
            <div className="kadoya-media-badge">
              <span className="kadoya-media-badge-dot" />
              <span>Kadoya Co., Ltd. × JIP Japan • Uwajima, Ehime</span>
            </div>
            <div className="kadoya-media-overlay">
              <span className="kadoya-media-cta">Explore Full Franchise Profile →</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
