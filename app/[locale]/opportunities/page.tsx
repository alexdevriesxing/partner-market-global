import type { Metadata } from "next";
import { CategoryGrid } from "@/components/CategoryGrid";
import { OpportunityCard } from "@/components/OpportunityCard";
import { CTA } from "@/components/CTA";
import { StructuredData } from "@/components/StructuredData";
import { getTranslations } from "next-intl/server";
import { opportunities } from "@/lib/data";
import { absoluteUrl, canonicalUrl, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'opportunities' });
  return pageMetadata({
    locale,
    path: "/opportunities",
    title: t('title'),
    description: t('subtitle'),
    image: "/assets/featured-opportunities-strip.webp"
  });
};

export default async function OpportunitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('opportunities');
  const tCta = await getTranslations('cta');

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t('title'),
    description: t('subtitle'),
    url: canonicalUrl(locale, "/opportunities"),
    numberOfItems: opportunities.length,
    itemListElement: opportunities.map((opportunity, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: canonicalUrl(locale, `/opportunities/${opportunity.slug}`),
      name: opportunity.title,
      item: {
        "@type": "Offer",
        name: opportunity.title,
        description: opportunity.summary,
        url: canonicalUrl(locale, `/opportunities/${opportunity.slug}`),
        image: absoluteUrl(opportunity.cardImage),
        category: opportunity.type,
        areaServed: opportunity.targetMarkets.join(", ")
      }
    }))
  };

  const filters = [
    t('filters.all'),
    t('filters.import'),
    t('filters.export'),
    t('filters.franchise'),
    t('filters.distribution'),
    t('filters.licensing'),
    t('filters.privateLabel'),
    t('filters.countryPartner')
  ];

  return (
    <>
      <StructuredData data={itemListSchema} />
      <section className="page-hero">
        <div>
          <div className="eyebrow">{t('title')}</div>
          <h1>{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </div>
        <img src="/assets/featured-opportunities-strip.webp" alt="Featured opportunity cards" />
      </section>

      <div className="filter-bar">
        {filters.map((filter) => <span className="filter-chip" key={filter}>{filter}</span>)}
      </div>

      <section className="featured-section">
        <div className="opportunity-grid">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} locale={locale} />
          ))}
        </div>
      </section>

      <CategoryGrid locale={locale} />
      <CTA
        compact
        locale={locale}
        headline={tCta('headline')}
        subheadline={tCta('subheadline')}
        feature1={tCta('features.global')}
        feature2={tCta('features.structured')}
        feature3={tCta('features.qualified')}
        feature4={tCta('features.grow')}
        ctaList={tCta('ctaList')}
        ctaTerms={tCta('ctaTerms')}
      />
    </>
  );
}
