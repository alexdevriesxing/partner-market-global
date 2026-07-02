import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { site } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: t('title'),
    description: t('intro'),
    alternates: { canonical: `${site.url}/${locale}/privacy-policy` }
  };
};

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('privacy');
  const tSite = await getTranslations('site');

  return (
    <section className="content-section">
      <h1>{t('title')}</h1>
      <p>{t('lastUpdated')}</p>
      <p>{t('intro')}</p>
      <h2>{t('infoTitle')}</h2>
      <ul>
        {t.raw('infoList').map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h2>{t('howTitle')}</h2>
      <p>{t('howText')}</p>
      <h2>{t('sharingTitle')}</h2>
      <p>{t('sharingText')}</p>
      <h2>{t('contactTitle')}</h2>
      <p>{t('contactText')} {tSite('email')}.</p>
    </section>
  );
}
