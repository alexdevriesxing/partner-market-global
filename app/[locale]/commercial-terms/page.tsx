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
      <PricingCards locale={locale} />
      <section className="content-section">
        <h2>{t('importantNotes.title')}</h2>
        <p>{t('importantNotes.note1')}</p>
        <p>{t('importantNotes.note2')}</p>
      </section>
      <CTA compact locale={locale} />
    </>
  );
}
