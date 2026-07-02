import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { InquiryForm } from "@/components/InquiryForm";
import { PricingCards } from "@/components/PricingCards";
import { CategoryGrid } from "@/components/CategoryGrid";
import { curationSteps, categories, site } from "@/lib/data";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'forCompanies' });
  return {
    title: t('hero.eyebrow'),
    description: t('hero.subheadline'),
    alternates: { canonical: `${site.url}/${locale}/list-your-opportunity` }
  };
};

export default async function ListOpportunityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('forCompanies');
  const tCategories = await getTranslations('categories');
  const tInquiry = await getTranslations('inquiry');

  return (
    <>
      <section className="companies-hero">
        <div>
          <div className="eyebrow">{t('hero.eyebrow')}</div>
          <h1>{t('hero.headline')}</h1>
          <p>{t('hero.subheadline')}</p>
          <ul className="check-list">
            {t.raw('hero.checklist').map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="companies-visual">
          <img src="/assets/companies-hero-collage.webp" alt="International business partners and logistics visuals" />
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <h2>{t('whoCanList.title')}</h2>
          <p>{t('whoCanList.subtitle')}</p>
        </div>
        <div className="who-grid">
          {categories.map((category) => (
            <div className="who-card" key={category.title}>
              <img src={category.image} alt="" />
              <span>{category.title}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section" id="how-it-works">
        <div className="section-heading">
          <h2>{t('curation.title')}</h2>
        </div>
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

      <PricingCards locale={locale} />

      <section className="content-section" id="application">
        <InquiryForm title={tInquiry('title')} />
      </section>

      <CTA compact locale={locale} />
    </>
  );
}
