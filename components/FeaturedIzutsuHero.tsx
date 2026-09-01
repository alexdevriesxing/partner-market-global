"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface FeaturedIzutsuHeroProps {
  locale: string;
}

export function FeaturedIzutsuHero({ locale }: FeaturedIzutsuHeroProps) {
  const oppUrl = `/${locale}/opportunities/izutsu-yatsuhashi-kyoto`;
  const inquireUrl = `/${locale}/opportunities/izutsu-yatsuhashi-kyoto#inquiry`;
  const productsUrl = `/${locale}/opportunities/izutsu-yatsuhashi-kyoto#products`;

  const chips = [
    "Japan",
    "Kyoto",
    "Est. 1805",
    "Premium Food",
    "Luxury Hospitality",
    "180+ Day Shelf Life",
    "Japanese Confectionery"
  ];

  const proofPoints = [
    { value: "EST. 1805", label: "Kyoto Heritage" },
    { value: "180+ DAYS", label: "Export-Friendly Shelf Life" },
    { value: "UJI MATCHA", label: "Premium Collaboration Potential" },
    { value: "LUXURY HOSPITALITY", label: "Hotels • Restaurants • Gifting" }
  ];

  return (
    <section className="featured-hero-izutsu" aria-label="Featured Japanese Food Opportunity">
      <div className="izutsu-hero-inner">
        <motion.div
          className="izutsu-hero-content"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="izutsu-top-badge-row">
            <span className="izutsu-eyebrow">FEATURED JAPANESE FOOD OPPORTUNITY</span>
            <span className="izutsu-badge-new">NEW FEATURED OPPORTUNITY</span>
            <span className="izutsu-badge-origin">KYOTO, JAPAN • EST. 1805</span>
          </div>

          <h1 className="izutsu-title">
            220 Years of Kyoto Tradition <br className="hidden-mobile" />
            <span>Ready for the World</span>
          </h1>

          <p className="izutsu-description">
            Founded in Kyoto in 1805, Izutsu Yatsuhashi Honpo brings one of Kyoto&apos;s traditional confectionery
            specialties to international hospitality, premium dining, gifting and distribution channels.
            Its hard-baked Yatsuhashi combines an authentic Kyoto story with an unusually export-friendly
            shelf-life proposition of more than 180 days without additives.
          </p>

          <div className="izutsu-proof-grid">
            {proofPoints.map((pt) => (
              <div key={pt.value} className="izutsu-proof-item">
                <span className="izutsu-proof-val">{pt.value}</span>
                <span className="izutsu-proof-label">{pt.label}</span>
              </div>
            ))}
          </div>

          <div className="izutsu-chips-wrap">
            {chips.map((chip) => (
              <span key={chip} className="izutsu-chip">
                {chip}
              </span>
            ))}
          </div>

          <div className="izutsu-actions">
            <Link href={oppUrl} className="btn-izutsu-primary">
              Explore the Opportunity
            </Link>
            <Link href={inquireUrl} className="btn-izutsu-secondary">
              Request Product Information
            </Link>
          </div>

          <div className="izutsu-tertiary">
            <Link href={productsUrl} className="izutsu-tertiary-link">
              View Authentic Product Lineup →
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="izutsu-hero-media"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={oppUrl} className="izutsu-image-card" tabIndex={-1} aria-hidden="true">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="/images/opportunities/izutsu-yatsuhashi/izutsu-hero-mobile.webp"
                type="image/webp"
              />
              <source
                media="(max-width: 1024px)"
                srcSet="/images/opportunities/izutsu-yatsuhashi/izutsu-hero-tablet.webp"
                type="image/webp"
              />
              <source
                srcSet="/images/opportunities/izutsu-yatsuhashi/izutsu-hero.webp"
                type="image/webp"
              />
              <img
                src="/images/opportunities/izutsu-yatsuhashi/izutsu-hero.jpg"
                alt="Michelin-level presentation of Izutsu Yatsuhashi baked cinnamon confectionery and Uji Matcha on dark Kyoto tableware"
                width={1920}
                height={1080}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="izutsu-hero-img"
              />
            </picture>
            <div className="izutsu-image-caption">
              <span className="caption-tag">Gion, Kyoto — Founded 1805</span>
              <span className="caption-sub">Traditional Baked Cinnamon &amp; Uji Matcha Yatsuhashi • 180+ Day Shelf Life</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
