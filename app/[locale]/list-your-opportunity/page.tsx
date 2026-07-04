import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { InquiryForm } from "@/components/InquiryForm";
import { PricingCards } from "@/components/PricingCards";
import { pageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'forCompanies' });
  return pageMetadata({
    locale,
    path: "/list-your-opportunity",
    title: t('hero.eyebrow'),
    description: t('hero.subheadline'),
    image: "/assets/companies-hero-collage.webp"
  });
};

const categoryKeys = [
  "import", "export", "franchise", "distribution",
  "licensing", "masterFranchise", "countryPartner", "privateLabel"
];

const categoryImages = [
  "/assets/import-opportunities.svg",
  "/assets/export-opportunities.svg",
  "/assets/franchise-opportunities.svg",
  "/assets/distribution-rights.svg",
  "/assets/licensing-partnerships.svg",
  "/assets/master-franchise.svg",
  "/assets/country-partner.svg",
  "/assets/private-label-oem.svg"
];

const curationStepKeys = [
  { num: "1", titleKey: "submit", descKey: "submitDesc" },
  { num: "2", titleKey: "review", descKey: "reviewDesc" },
  { num: "3", titleKey: "profile", descKey: "profileDesc" },
  { num: "4", titleKey: "goLive", descKey: "goLiveDesc" },
  { num: "5", titleKey: "inquiries", descKey: "inquiriesDesc" }
];

export default async function ListOpportunityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('forCompanies');
  const tCategories = await getTranslations('categories');
  const tInquiry = await getTranslations('inquiry');
  const tCta = await getTranslations('cta');

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
          {categoryKeys.map((key, index) => (
            <div className="who-card" key={key}>
              <img src={categoryImages[index]} alt="" aria-hidden="true" />
              <span>{tCategories(key)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section" id="how-it-works">
        <div className="section-heading">
          <h2>{t('curation.title')}</h2>
        </div>
        <div className="process-row">
          {curationStepKeys.map((step) => (
            <div className="process-step" key={step.num}>
              <div className="process-num">{step.num}</div>
              <h3>{t(`curation.steps.${step.titleKey}`)}</h3>
              <p>{t(`curation.steps.${step.descKey}`)}</p>
            </div>
          ))}
        </div>
      </section>

      <PricingCards locale={locale} />

      <section className="content-section" id="application">
        <InquiryForm
          title={tInquiry('title')}
          subtitle={tInquiry('subtitle')}
          nameLabel={`${tInquiry('fields.fullName')} *`}
          namePlaceholder={tInquiry('placeholders.name')}
          companyLabel={`${tInquiry('fields.company')} *`}
          companyPlaceholder={tInquiry('placeholders.company')}
          emailLabel={`${tInquiry('fields.email')} *`}
          emailPlaceholder={tInquiry('placeholders.email')}
          phoneLabel={`${tInquiry('fields.phone')} *`}
          phonePlaceholder={tInquiry('placeholders.phone')}
          countryLabel={`${tInquiry('fields.country')} *`}
          countryDefault={tInquiry('placeholders.countrySelect')}
          websiteLabel={tInquiry('fields.website')}
          websitePlaceholder={tInquiry('placeholders.website')}
          partnerTypeLabel={`${tInquiry('fields.partnerType')} *`}
          partnerTypeDefault={tInquiry('placeholders.partnerTypeSelect')}
          activityLabel={`${tInquiry('fields.currentActivity')} *`}
          activityPlaceholder={tInquiry('placeholders.activity')}
          networkLabel={`${tInquiry('fields.network')} *`}
          networkPlaceholder={tInquiry('placeholders.network')}
          reasonLabel={`${tInquiry('fields.reason')} *`}
          reasonPlaceholder={tInquiry('placeholders.reason')}
          requirementsLabel={`${tInquiry('fields.requirements')} *`}
          requirementsDefault={tInquiry('placeholders.requirementsSelect')}
          yesOption={tInquiry('requirements.0')}
          discussOption={tInquiry('requirements.1')}
          noOption={tInquiry('requirements.2')}
          consentText={tInquiry('consent')}
          submitLabel={tInquiry('submit')}
          disclaimer={tInquiry('privacyNote')}
        />
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
