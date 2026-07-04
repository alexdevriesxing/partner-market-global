import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { site } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('eyebrow'),
    description: t('headline'),
    alternates: { canonical: `${site.url}/${locale}/about` }
  };
};

export default async function AboutPage() {
  const t = await getTranslations('about');

  return (
    <section className="content-section">
      <div className="eyebrow">{t('eyebrow')}</div>
      <h1>{t('headline')}</h1>
      <p>{t('body1')}</p>
      <p>{t('body2')}</p>
      <h2>{t('focusTitle')}</h2>
      <ul>
        {t.raw('focusList').map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
