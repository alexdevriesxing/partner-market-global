import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { site } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  return {
    title: t('title'),
    description: t('intro'),
    alternates: { canonical: `${site.url}/${locale}/terms` }
  };
};

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('terms');
  const tSite = await getTranslations('site');

  return (
    <section className="content-section">
      <h1>{t('title')}</h1>
      <p>{t('lastUpdated')}</p>
      <p>{t('intro')}</p>
      <h2 id="disclaimer">{t('disclaimerTitle')}</h2>
      <p>{t('disclaimerText')}</p>
      <h2>{t('listingsTitle')}</h2>
      <p>{t('listingsText')}</p>
      <h2>{t('inquiriesTitle')}</h2>
      <p>{t('inquiriesText')}</p>
      <h2>{t('contactTitle')}</h2>
      <p>{t('contactText')} {tSite('email')}.</p>
    </section>
  );
}
