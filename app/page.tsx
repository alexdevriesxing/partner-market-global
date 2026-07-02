"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CTA } from "@/components/CTA";
import { CategoryGrid } from "@/components/CategoryGrid";
import { OpportunityCard } from "@/components/OpportunityCard";
import { TrustStrip } from "@/components/TrustStrip";
import { StructuredData } from "@/components/StructuredData";
import { FadeUp } from "@/components/Animations";
import { opportunities, site } from "@/lib/data";

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

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Partner Market Global?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Partner Market Global is a curated B2B showcase for import, export, distribution, licensing, private label and franchise opportunities."
        }
      },
      {
        "@type": "Question",
        name: "Can companies list franchise or distribution opportunities?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Companies can apply to list product, service, franchise, licensing, private label and country partner opportunities after review and curation."
        }
      },
      {
        "@type": "Question",
        name: "Does Partner Market Global guarantee commercial success?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Partner Market Global provides a curated showcase platform but does not guarantee commercial success, profitability or partner performance. All interested parties should conduct their own due diligence."
        }
      },
      {
        "@type": "Question",
        name: "How do I inquire about an opportunity?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Click any View Details button on an opportunity card, review the full profile, and submit a qualified inquiry through the secure inquiry form on the opportunity detail page."
        }
      }
    ]
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <section className="hero-section">
        <div className="hero-copy">
          <FadeUp>
            <div className="eyebrow">{site.tagline}</div>
            <h1>Curated global business opportunities, ready for the right <span>market partner.</span></h1>
            <p>
              Explore verified import, export, distribution, franchise and licensing opportunities from ambitious companies looking to expand internationally.
            </p>
            <div className="hero-actions">
              <Link href="/opportunities" className="btn btn-primary">Explore Opportunities</Link>
              <Link href="/list-your-opportunity" className="btn btn-line">List Your Opportunity</Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="hero-stats">
              <div className="stat"><span className="stat-icon">✓</span><span><strong>120+</strong><span>Vetted Opportunities</span></span></div>
              <div className="stat"><span className="stat-icon">◎</span><span><strong>42+</strong><span>Countries</span></span></div>
              <div className="stat"><span className="stat-icon">◆</span><span><strong>18+</strong><span>Industry Sectors</span></span></div>
              <div className="stat"><span className="stat-icon">●</span><span><strong>850+</strong><span>Qualified Partners</span></span></div>
            </div>
          </FadeUp>
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

      <section className="featured-section">
        <FadeUp>
          <div className="section-top">
            <h2>Featured Opportunities</h2>
            <Link href="/opportunities">View all opportunities →</Link>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="opportunity-grid">
            {opportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </FadeUp>
      </section>

      <CategoryGrid />
      <TrustStrip />
      <CTA />
    </>
  );
}
