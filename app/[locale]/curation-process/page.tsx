import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'curation' });
  return pageMetadata({
    locale,
    path: "/curation-process",
    title: t('hero.eyebrow'),
    description: t('hero.subheadline'),
    image: "/assets/curation-process-strip.webp"
  });
};

const curationStepKeys = [
  { num: "1", titleKey: "submit", descKey: "submitDesc" },
  { num: "2", titleKey: "review", descKey: "reviewDesc" },
  { num: "3", titleKey: "profile", descKey: "profileDesc" },
  { num: "4", titleKey: "goLive", descKey: "goLiveDesc" },
  { num: "5", titleKey: "inquiries", descKey: "inquiriesDesc" }
];

const trustCheckKeys = [
  { titleKey: "businessVerification", descKey: "businessVerificationDesc" },
  { titleKey: "credentialReview", descKey: "credentialReviewDesc" },
  { titleKey: "opportunityAssessment", descKey: "opportunityAssessmentDesc" },
  { titleKey: "documentSupport", descKey: "documentSupportDesc" },
  { titleKey: "secureInquiries", descKey: "secureInquiriesDesc" }
];

export default async function CurationProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('curation');
  const tSteps = await getTranslations('forCompanies');
  const tTrust = await getTranslations('trust');
  const tCta = await getTranslations('cta');

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
          {curationStepKeys.map((step) => (
            <div className="process-step" key={step.num}>
              <div className="process-num">{step.num}</div>
              <h3>{tSteps(`curation.steps.${step.titleKey}`)}</h3>
              <p>{tSteps(`curation.steps.${step.descKey}`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2>{t('whatWeCheck')}</h2>
        <div className="trust-grid">
          {trustCheckKeys.map((check, index) => (
            <div className="trust-card" key={check.titleKey}>
              <div className="trust-icon">{index + 1}</div>
              <strong>{tTrust(check.titleKey)}</strong>
              <span>{tTrust(check.descKey)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2>{t('disclaimer')}</h2>
        <p>{t('disclaimerText')}</p>
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
