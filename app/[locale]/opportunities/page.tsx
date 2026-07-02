import type { Metadata } from "next";
import { CategoryGrid } from "@/components/CategoryGrid";
import { OpportunityCard } from "@/components/OpportunityCard";
import { CTA } from "@/components/CTA";
import { getTranslations } from "next-intl/server";
import { opportunities, site } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'opportunities' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { canonical: `${site.url}/${locale}/opportunities` }
  };
};

export default async function OpportunitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('opportunities');
  const tCta = await getTranslations('cta');

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
