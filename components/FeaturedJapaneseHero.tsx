"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface FeaturedJapaneseHeroProps {
  locale: string;
}

export function FeaturedJapaneseHero({ locale }: FeaturedJapaneseHeroProps) {
  const oppUrl = `/${locale}/opportunities/premium-japanese-tsubame-drinkware`;
  const inquireUrl = `/${locale}/opportunities/premium-japanese-tsubame-drinkware#inquire`;
  const collectionsUrl = `/${locale}/opportunities/premium-japanese-tsubame-drinkware#collections`;

  const chips = [
    "Japan",
    "Premium Consumer Goods",
    "Drinkware",
    "Giftware",
    "Retail",
    "HORECA",
    "Distribution",
    "Corporate Gifting"
  ];

  return (
    <section className="featured-hero-tsubame" aria-label="Featured Japanese Opportunity">
      <div className="tsubame-hero-inner">
        <motion.div
          className="tsubame-hero-content"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="tsubame-top-badge-row">
            <span className="tsubame-eyebrow">FEATURED JAPANESE OPPORTUNITY</span>
            <span className="tsubame-badge-new">NEW FEATURED OPPORTUNITY</span>
          </div>

          <h1 className="tsubame-title">
            Premium Japanese Drinkware <br className="hidden-mobile" />
            <span>Crafted in Tsubame</span>
          </h1>

          <p className="tsubame-description">
            Discover an exceptional collection of Japanese-made premium drinkware combining centuries of metalworking
            craftsmanship with contemporary design. From stainless-steel and gold-finished tumblers to striking blue
            Ginkobi Ao vessels, Mt. Fuji sake cups and elegant gift sets, the collection offers strong potential across
            premium retail, hospitality, gifting and specialist distribution.
          </p>

          <div className="tsubame-chips-wrap">
            {chips.map((chip) => (
              <span key={chip} className="tsubame-chip">
                {chip}
              </span>
            ))}
          </div>

          <div className="tsubame-actions">
            <Link href={oppUrl} className="btn-tsubame-primary">
              Explore the Opportunity
            </Link>
            <Link href={inquireUrl} className="btn-tsubame-secondary">
              Request Partnership Information
            </Link>
          </div>

          <div className="tsubame-tertiary">
            <Link href={collectionsUrl} className="tsubame-tertiary-link">
              View Product Collections →
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="tsubame-hero-media"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={oppUrl} className="tsubame-image-card" tabIndex={-1} aria-hidden="true">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="/images/opportunities/tsubame/tsubame-hero-800.webp"
                type="image/webp"
              />
              <source
                media="(max-width: 1024px)"
                srcSet="/images/opportunities/tsubame/tsubame-hero-1200.webp"
                type="image/webp"
              />
              <source
                srcSet="/images/opportunities/tsubame/tsubame-hero.webp"
                type="image/webp"
              />
              <img
                src="/images/opportunities/tsubame/tsubame-hero.jpg"
                alt="Premium Japanese Tsubame stainless steel, gold-finished and blue artisan drinkware"
                width={1920}
                height={1080}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="tsubame-hero-img"
              />
            </picture>
            <div className="tsubame-image-caption">
              <span className="caption-tag">Tsubame, Niigata — Made in Japan</span>
              <span className="caption-sub">Stainless Steel • 24K Gold • Ginkobi Blue • Pure Copper</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
