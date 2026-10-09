"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface FeaturedEiwaHeroProps {
  locale: string;
}

export function FeaturedEiwaHero({ locale }: FeaturedEiwaHeroProps) {
  const oppUrl = `/${locale}/opportunities/eiwa-japanese-food-ingredients-global-distribution`;
  const inquireUrl = `/${locale}/opportunities/eiwa-japanese-food-ingredients-global-distribution#inquire`;
  const productsUrl = `/${locale}/opportunities/eiwa-japanese-food-ingredients-global-distribution#products`;
  const certMatrixUrl = `/${locale}/opportunities/eiwa-japanese-food-ingredients-global-distribution#certifications`;

  const chips = [
    "Tokyo Ingredient Trading",
    "Japanese Citrus Oils",
    "Halal Japanese Dashi",
    "Netherlands Onion Brix 72",
    "Tomin Frozen Sushi",
    "Drinkable Daifuku",
    "Buckwheat Groats / Sobanomi",
    "JIP Japan Partner"
  ];

  const proofPoints = [
    { value: "6 PRODUCT LINES", label: "Citrus Oils • Dashi • Extracts • Sushi • Sweets • Grains" },
    { value: "EST. TOKYO TRADING", label: "Eiwa Holdings / Eiwa Bussan • Chiyoda-ku, Tokyo" },
    { value: "HALAL & SPECIALTY", label: "Seasoning Options & Essential Citrus Extracts" },
    { value: "GLOBAL EXPANSION", label: "Southeast Asia • Gulf • North America • Worldwide" }
  ];

  return (
    <section className="featured-hero-eiwa" aria-label="Number One Featured Opportunity: Eiwa Holdings Japanese Food Ingredients & Specialty Foods">
      <div className="eiwa-hero-inner">
        <motion.div
          className="eiwa-hero-content"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="eiwa-top-badge-row">
            <span className="eiwa-eyebrow">FEATURED GLOBAL TRADE OPPORTUNITY | JAPAN | FOOD &amp; INGREDIENTS</span>
            <span className="eiwa-badge-new">NEW GLOBAL PARTNERSHIP OPPORTUNITY</span>
            <span className="eiwa-badge-origin">KOJIMACHI, CHIYODA-KU, TOKYO</span>
          </div>

          <h1 className="eiwa-title">
            Discover Japan&apos;s Finest Food Ingredients. <br className="hidden-mobile" />
            <span>Bring Them to Your Market.</span>
          </h1>

          <p className="eiwa-subheading">
            From Halal-certified Japanese seasoning options and distinctive citrus oils to premium frozen foods and confectionery, Eiwa Holdings is exploring international commercial partnerships.
          </p>

          <p className="eiwa-description">
            <strong>Eiwa Holdings Co., Ltd.</strong> and <strong>Eiwa Bussan Co., Ltd.</strong> are Tokyo-based specialists in food flavorings, additives and ingredients, exploring international distribution and strategic commercial partnerships for a carefully selected portfolio of distinctive culinary products. Sourcing opportunities for experienced importers, food manufacturers, restaurant groups, hospitality operators, and premium retailers.
          </p>

          <div className="eiwa-proof-grid">
            {proofPoints.map((pt) => (
              <div key={pt.value} className="eiwa-proof-item">
                <span className="eiwa-proof-val">{pt.value}</span>
                <span className="eiwa-proof-label">{pt.label}</span>
              </div>
            ))}
          </div>

          <div className="eiwa-chips-wrap">
            {chips.map((chip) => (
              <span key={chip} className="eiwa-chip">
                {chip}
              </span>
            ))}
          </div>

          <div className="eiwa-actions">
            <Link href={oppUrl} className="btn-eiwa-primary">
              EXPLORE THE OPPORTUNITY
            </Link>
            <Link href={inquireUrl} className="btn-eiwa-secondary">
              REQUEST COMMERCIAL INTRODUCTION
            </Link>
          </div>

          <div className="eiwa-tertiary">
            <Link href={productsUrl} className="eiwa-tertiary-link" style={{ marginRight: 18 }}>
              Explore 6 Product Categories (Citrus Oils, Dashi, Onion Extract, Sushi, Daifuku, Sobanomi) →
            </Link>
            <Link href={certMatrixUrl} className="eiwa-tertiary-link">
              View Target Markets &amp; Certification Verification Matrix →
            </Link>
          </div>

          {/* Crawlable descriptive B2B SEO context for search engines and AI engines */}
          <div className="eiwa-seo-context">
            Partner Market Global is collaborating with <strong>Eiwa Holdings Co., Ltd. / Eiwa Bussan Co., Ltd.</strong> of Tokyo (introduced via Japan Industrial Promotion) to identify qualified international distribution and food manufacturing partners. Commercial evaluation across Southeast Asia (Indonesia, Malaysia, Singapore, Thailand, Philippines), selected Gulf nations, and North America.
          </div>
        </motion.div>

        <motion.div
          className="eiwa-hero-media"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={oppUrl} className="eiwa-image-card" aria-label="Explore Eiwa Holdings Japanese food ingredients distribution opportunity">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/images/opportunities/eiwa/eiwa-hero-mobile.webp"
                type="image/webp"
              />
              <source
                media="(max-width: 768px)"
                srcSet="/images/opportunities/eiwa/eiwa-hero-mobile.jpg"
              />
              <source
                srcSet="/images/opportunities/eiwa/eiwa-hero-desktop.webp"
                type="image/webp"
              />
              <img
                src="/images/opportunities/eiwa/eiwa-hero-desktop.jpg"
                alt="Eiwa Holdings Japanese Food Ingredients & Specialty Foods — Yuzu, Citrus Oils, Halal Dashi, Sushi, Daifuku, Sobanomi"
                width={1920}
                height={1080}
                className="eiwa-hero-img"
                loading="eager"
              />
            </picture>
            <div className="eiwa-media-badge">
              <span className="eiwa-media-badge-dot" />
              <span>Eiwa Holdings × JIP Japan • Tokyo, Japan</span>
            </div>
            <div className="eiwa-media-overlay">
              <span className="eiwa-media-cta">Explore Full Opportunity Profile →</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
