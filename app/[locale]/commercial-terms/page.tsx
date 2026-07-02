import type { Metadata } from "next";
import { PricingCards } from "@/components/PricingCards";
import { CTA } from "@/components/CTA";
import { getTranslations } from "next-intl/server";
import { site } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'commercial' });
  return {
    title: t('hero.eyebrow'),
    description: t('hero.subheadline'),
    alternates: { canonical: `${site.url}/${locale}/commercial-terms` }
  };
};

export default async function CommercialTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('commercial');
  const tCta = await getTranslations('cta');

  return (
    <>
      <section className="page-hero">
        <div>
          <div className="eyebrow">{t('hero.eyebrow')}</div>
          <h1>{t('hero.headline')}</h1>
          <p>{t('hero.subheadline')}</p>
        </div>
        <img src="/assets/packages-section.webp" alt="Partner Market Global commercial package cards" />
      </section>
      <PricingCards
        locale={locale}
        title={t('packages.title')}
        subtitle={t('packages.subtitle')}
        legalNote={t('packages.legalNote')}
        mostPopular={t('packages.mostPopular')}
        perMonth={t('packages.perMonth')}
        oneTime={t('packages.oneTime')}
        byAgreement={t('packages.byAgreement')}
        getStarted={t('packages.getStarted')}
        contactUs={t('packages.contactUs')}
      />
      <section className="content-section">
        <h2>{t('importantNotes.title')}</h2>
        <p>{t('importantNotes.note1')}</p>
        <p>{t('importantNotes.note2')}</p>
      </section>
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
