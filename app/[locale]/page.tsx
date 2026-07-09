import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { CategoryGrid } from "@/components/CategoryGrid";
import { OpportunityCard } from "@/components/OpportunityCard";
import { TrustStrip } from "@/components/TrustStrip";
import { StructuredData } from "@/components/StructuredData";
import { HeroSectionClient } from "@/components/HeroSectionClient";
import { getTranslations } from "next-intl/server";
import { opportunities } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site' });
  return pageMetadata({
    locale,
    title: t('name'),
    description: t('description')
  });
}

const getHomeJapanTranslations = (locale: string) => {
  const trans: Record<string, Record<string, string>> = {
    en: {
      title: "Featured Japan Opportunities",
      viewAll: "Explore Japan Hub →",
      subtitle: "Pre-screened Japanese commercial partnerships, distribution rights, and franchise listings from JIP Japan."
    },
    ja: {
      title: "注目の日本ビジネス機会",
      viewAll: "日本の案件ハブを見る →",
      subtitle: "JIP Japanアライアンスから届いた、事前審査済みの日本の商業提携、販売代理権、フランチャイズ案件。"
    },
    es: {
      title: "Oportunidades destacadas de Japón",
      viewAll: "Explorar el hub de Japón →",
      subtitle: "Asociaciones comerciales, derechos de distribución y franquicias pre-vettadas de JIP Japón."
    },
    de: {
      title: "Hervorgehobene Möglichkeiten aus Japan",
      viewAll: "Japan-Hub erkunden →",
      subtitle: "Vorab geprüfte japanische Handelspartnerschaften, Vertriebsrechte und Franchise-Angebote von JIP Japan."
    },
    fr: {
      title: "Opportunités japonaises en vedette",
      viewAll: "Explorer le hub du Japon →",
      subtitle: "Partenariats commerciaux, droits de distribution et franchises pré-sélectionnés de JIP Japon."
    },
    nl: {
      title: "Uitgelichte kansen uit Japan",
      viewAll: "Ontdek de Japan Hub →",
      subtitle: "Vooraf gescreende Japanse commerciële samenwerkingen, distributierechten en franchise-aanbiedingen van JIP Japan."
    }
  };
  return trans[locale] || trans.en;
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tHero = await getTranslations('hero');
  const tFeatured = await getTranslations('featured');
  const tFaq = await getTranslations('faq');
  const tCta = await getTranslations('cta');
  const tTrust = await getTranslations('trust');
  const tJapanHome = getHomeJapanTranslations(locale);

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
          {opportunities.filter(o => !o.id.startsWith("jip-")).slice(0, 3).map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} locale={locale} />
          ))}
        </div>
      </section>

      <section className="featured-section japan-featured-home bg-soft">
        <div className="section-top">
          <h2>{tJapanHome.title}</h2>
          <Link href={`/${locale}/japan`}>{tJapanHome.viewAll}</Link>
        </div>
        <p className="section-subtitle">{tJapanHome.subtitle}</p>
        <div className="opportunity-grid">
          {opportunities.filter(o => o.originCountry === "Japan" && o.featured).slice(0, 3).map((opportunity) => (
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
