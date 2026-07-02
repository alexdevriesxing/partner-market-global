import type { Metadata } from "next";
import { curationSteps, trustChecks, site } from "@/lib/data";
import { CTA } from "@/components/CTA";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'curation' });
  return {
    title: t('hero.eyebrow'),
    description: t('hero.subheadline'),
    alternates: { canonical: `${site.url}/${locale}/curation-process` }
  };
};

export default async function CurationProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('curation');
  const tForCompanies = await getTranslations('forCompanies');

  return (
    <>
      <section className="page-hero">
        <div>
          <div className="eyebrow">{t('hero.eyebrow')}</div>
          <h1>{t('hero.headline')}</h1>
          <p>{t('hero.subheadline')}</p>
        </div>
        <img src="/assets/curation-process-strip.webp" alt="Five-step curation process" />
      </section>

      <section className="content-section">
        <div className="process-row">
          {curationSteps.map(([num, title, text]) => (
            <div className="process-step" key={num}>
              <div className="process-num">{num}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2>{t('whatWeCheck')}</h2>
        <div className="trust-grid">
          {trustChecks.map(([title, text], index) => (
            <div className="trust-card" key={title}>
              <div className="trust-icon">{index + 1}</div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2>{t('disclaimer')}</h2>
        <p>{t('disclaimerText')}</p>
      </section>

      <CTA compact locale={locale} />
    </>
  );
}
