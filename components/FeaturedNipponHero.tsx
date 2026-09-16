"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface FeaturedNipponHeroProps {
  locale: string;
}

export function FeaturedNipponHero({ locale }: FeaturedNipponHeroProps) {
  const oppUrl = `/${locale}/opportunities/nippon-career-ultra-thin-meat-slicing`;
  const inquireUrl = `/${locale}/opportunities/nippon-career-ultra-thin-meat-slicing#inquire`;
  const modelsUrl = `/${locale}/opportunities/nippon-career-ultra-thin-meat-slicing#models`;
  const downloadsUrl = `/${locale}/opportunities/nippon-career-ultra-thin-meat-slicing#downloads`;

  const chips = [
    "Japan Engineered",
    "Meat Processing Automation",
    "Supermarket Retail Trays",
    "E-Series Industrial Slicers",
    "Central Kitchen Prep",
    "14+ Export Markets",
    "ISO 9001 Certified"
  ];

  const proofPoints = [
    { value: "DOWN TO ~1.5 MM", label: "Ultra-Thin Chilled Raw Slices" },
    { value: "APPROX. 95%", label: "Usable Raw Meat Yield" },
    { value: "~1 MINUTE", label: "Toolless Band Blade Swap" },
    { value: "1,000+ UNITS", label: "Proven Japanese Track Record" }
  ];

  return (
    <section className="featured-hero-nippon" aria-label="Featured Japanese Industrial Equipment Opportunity">
      <div className="nippon-hero-inner">
        <motion.div
          className="nippon-hero-content"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="nippon-top-badge-row">
            <span className="nippon-eyebrow">FEATURED JAPANESE INDUSTRIAL OPPORTUNITY</span>
            <span className="nippon-badge-new">NEW B2B LISTING</span>
            <span className="nippon-badge-origin">MATSUYAMA, JAPAN • EST. 1970</span>
          </div>

          <h1 className="nippon-title">
            Industrial Fresh Meat Slicing <br className="hidden-mobile" />
            <span>Japanese Precision Technology</span>
          </h1>

          <p className="nippon-description">
            Partner Market Global introduces <strong>Nippon Career Industry Co., Ltd.</strong> of Japan to qualified supermarket groups, commercial meatpackers, restaurant chains, and machinery distributors. Slice fresh chilled raw meat down to ~1.5 mm without pre-freezing, delivering approx. 95% yield efficiency, automated shingling, and 1-minute toolless band-blade replacement.
          </p>

          <div className="nippon-proof-grid">
            {proofPoints.map((pt) => (
              <div key={pt.value} className="nippon-proof-item">
                <span className="nippon-proof-val">{pt.value}</span>
                <span className="nippon-proof-label">{pt.label}</span>
              </div>
            ))}
          </div>

          <div className="nippon-chips-wrap">
            {chips.map((chip) => (
              <span key={chip} className="nippon-chip">
                {chip}
              </span>
            ))}
          </div>

          <div className="nippon-actions">
            <Link href={oppUrl} className="btn-nippon-primary">
              Explore the Opportunity
            </Link>
            <Link href={inquireUrl} className="btn-nippon-secondary">
              Request Commercial Introduction
            </Link>
          </div>

          <div className="nippon-tertiary">
            <Link href={modelsUrl} className="nippon-tertiary-link" style={{ marginRight: 16 }}>
              Compare E-Series Models →
            </Link>
            <Link href={downloadsUrl} className="nippon-tertiary-link">
              Download Official Catalogues (PDF) →
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="nippon-hero-media"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={oppUrl} className="nippon-image-card" tabIndex={-1} aria-hidden="true">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="/images/opportunities/nippon-career/nippon-career-hero-800.webp"
                type="image/webp"
              />
              <source
                media="(max-width: 1024px)"
                srcSet="/images/opportunities/nippon-career/nippon-career-hero-1200.webp"
                type="image/webp"
              />
              <source
                srcSet="/images/opportunities/nippon-career-ultra-thin-meat-slicing-hero.webp"
                type="image/webp"
              />
              <img
                src="/images/opportunities/nippon-career-ultra-thin-meat-slicing-hero.jpg"
                alt="Nippon Career Industry ultra-thin fresh meat slicing technology in high-capacity meat processing facility"
                width={1920}
                height={1080}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="nippon-hero-img"
              />
            </picture>
            <div className="nippon-image-caption">
              <span className="caption-tag">Nippon Career Industry Co., Ltd. — Matsuyama, Japan</span>
              <span className="caption-sub">Patented E-Series Industrial Slicers • ~1.5 mm Fresh Cuts • ~95% Yield Efficiency</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
