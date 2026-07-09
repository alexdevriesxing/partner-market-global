"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const floatVariants = {
  initial: { y: 0 },
  animate: { y: [-8, 8, -8] }
};

const cardTransition = (delay: number) => ({
  duration: 5 + delay,
  repeat: Infinity,
  ease: "easeInOut" as const,
  delay
});

interface HeroSectionClientProps {
  locale: string;
  tagline: string;
  headline: string;
  subheadline: string;
  ctaExplore: string;
  ctaList: string;
  stats: {
    opportunities: string;
    countries: string;
    sectors: string;
    partners: string;
  };
  statValues: {
    opportunities: string;
    countries: string;
    sectors: string;
    partners: string;
  };
}

export function HeroSectionClient({
  locale,
  tagline,
  headline,
  subheadline,
  ctaExplore,
  ctaList,
  stats,
  statValues
}: HeroSectionClientProps) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="eyebrow">{tagline}</div>
          <h1 dangerouslySetInnerHTML={{ __html: headline.replace(/<span>(.*?)<\/span>/, '<span>$1</span>') }} />
          <p>{subheadline}</p>
          <div className="hero-actions">
            <Link href={`/${locale}/opportunities`} className="btn btn-primary">{ctaExplore}</Link>
            <Link href={`/${locale}/list-your-opportunity`} className="btn btn-line">{ctaList}</Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="hero-stats"
        >
          <div className="stat"><span className="stat-icon">✓</span><span><strong>{statValues.opportunities}</strong><span>{stats.opportunities}</span></span></div>
          <div className="stat"><span className="stat-icon">◎</span><span><strong>{statValues.countries}</strong><span>{stats.countries}</span></span></div>
          <div className="stat"><span className="stat-icon">◆</span><span><strong>{statValues.sectors}</strong><span>{stats.sectors}</span></span></div>
          <div className="stat"><span className="stat-icon">●</span><span><strong>{statValues.partners}</strong><span>{stats.partners}</span></span></div>
        </motion.div>
      </div>
      <div className="hero-visual" aria-label="Global opportunity map">
        <img className="world-map" src="/assets/hero-map-section.webp" alt="Global market map with opportunity cards" />
        <motion.div
          className="float-card one"
          animate={floatVariants.animate}
          initial={floatVariants.initial}
          transition={cardTransition(0)}
        >
          <b>Master Franchise Available</b><span className="franchise">Franchise</span>
        </motion.div>
        <motion.div
          className="float-card two"
          animate={floatVariants.animate}
          initial={floatVariants.initial}
          transition={cardTransition(0.8)}
        >
          <b>Premium Skincare Brand Seeking Distributors</b><span className="export">Export</span>
        </motion.div>
        <motion.div
          className="float-card three"
          animate={floatVariants.animate}
          initial={floatVariants.initial}
          transition={cardTransition(1.6)}
        >
          <b>Healthy Snack Brand Importer Wanted</b><span className="import">Import</span>
        </motion.div>
        <motion.div
          className="float-card four"
          animate={floatVariants.animate}
          initial={floatVariants.initial}
          transition={cardTransition(2.4)}
        >
          <b>Industrial Equipment Distributor Wanted</b><span className="distribution">Distribution</span>
        </motion.div>
      </div>
    </section>
  );
}
