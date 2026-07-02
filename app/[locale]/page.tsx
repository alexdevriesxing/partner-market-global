import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { CategoryGrid } from "@/components/CategoryGrid";
import { OpportunityCard } from "@/components/OpportunityCard";
import { TrustStrip } from "@/components/TrustStrip";
import { StructuredData } from "@/components/StructuredData";
import { HeroSectionClient } from "@/components/HeroSectionClient";
import { getTranslations } from "next-intl/server";
import { opportunities, site } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site' });
  return {
    title: t('name'),
    description: t('description'),
    alternates: { canonical: `${site.url}/${locale}` },
    metadataBase: new URL(site.url),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tHero = await getTranslations('hero');
  const tFeatured = await getTranslations('featured');
  const tFaq = await getTranslations('faq');
  const tCta = await getTranslations('cta');
  const tTrust = await getTranslations('trust');

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: tFaq('whatIs.question'),
        acceptedAnswer: { "@type": "Answer", text: tFaq('whatIs.answer') }
      },
      {
        "@type": "Question",
        name: tFaq('canList.question'),
        acceptedAnswer: { "@type": "Answer", text: tFaq('canList.answer') }
      },
      {
        "@type": "Question",
        name: tFaq('guarantee.question'),
        acceptedAnswer: { "@type": "Answer", text: tFaq('guarantee.answer') }
      },
      {
        "@type": "Question",
        name: tFaq('howInquire.question'),
        acceptedAnswer: { "@type": "Answer", text: tFaq('howInquire.answer') }
      }
    ]
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <HeroSectionClient
        locale={locale}
        tagline={tHero('eyebrow')}
        headline={tHero('headline')}
        subheadline={tHero('subheadline')}
        ctaExplore={tHero('ctaExplore')}
        ctaList={tHero('ctaList')}
        stats={{
          opportunities: tHero('stats.opportunities'),
          countries: tHero('stats.countries'),
          sectors: tHero('stats.sectors'),
          partners: tHero('stats.partners')
        }}
      />

      <section className="featured-section">
        <div className="section-top">
          <h2>{tFeatured('title')}</h2>
          <Link href={`/${locale}/opportunities`}>{tFeatured('viewAll')}</Link>
        </div>
        <div className="opportunity-grid">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} locale={locale} />
          ))}
        </div>
      </section>

      <CategoryGrid locale={locale} />
      <TrustStrip
        headline={tTrust('title')}
        subheadline={tTrust('subtitle')}
        trust1={tTrust('businessVerification')}
        trust1Desc={tTrust('businessVerificationDesc')}
        trust2={tTrust('credentialReview')}
        trust2Desc={tTrust('credentialReviewDesc')}
        trust3={tTrust('opportunityAssessment')}
        trust3Desc={tTrust('opportunityAssessmentDesc')}
        trust4={tTrust('documentSupport')}
        trust4Desc={tTrust('documentSupportDesc')}
        trust5={tTrust('secureInquiries')}
        trust5Desc={tTrust('secureInquiriesDesc')}
      />
      <CTA
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
