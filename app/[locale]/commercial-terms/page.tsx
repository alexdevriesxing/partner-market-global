import type { Metadata } from "next";
import { PricingCards } from "@/components/PricingCards";
import { CTA } from "@/components/CTA";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/commercial-terms",
    title: "Commission-Based Commercial Terms",
    description: "Commercial terms are provided on inquiry and are 100% commission based.",
    image: "/assets/packages-section.webp"
  });
};

export default async function CommercialTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tCta = await getTranslations('cta');

  return (
    <>
      <section className="page-hero">
        <div>
          <div className="eyebrow">Commercial Terms</div>
          <h1>Commercial terms are on inquiry and 100% commission based.</h1>
          <p>
            Partner Market Global does not publish fixed listing packages or monthly pricing.
            Commission scope, trigger, territory and timing are agreed in writing before work starts.
          </p>
        </div>
        <img src="/assets/packages-section.webp" alt="Partner Market Global commission-based commercial terms" />
      </section>
      <PricingCards locale={locale} />
      <section className="content-section">
        <h2>Important Notes</h2>
        <p>
          Partner Market Global provides marketing, curation and lead-generation services on a
          commission-based inquiry model. We do not provide legal, financial, investment,
          franchise, tax or securities advice.
        </p>
        <p>
          Any commission percentage, payment trigger, territory, exclusions and timing must be
          agreed in a clear written agreement before representation or partner-search work starts.
        </p>
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
