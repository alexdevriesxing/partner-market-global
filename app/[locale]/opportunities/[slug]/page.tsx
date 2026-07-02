import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/InquiryForm";
import { StructuredData } from "@/components/StructuredData";
import { getTranslations } from "next-intl/server";
import { opportunities, site } from "@/lib/data";

type PageProps = { params: Promise<{ slug: string; locale: string }> };

export function generateStaticParams() {
  return opportunities.map((opportunity) => ({ slug: opportunity.slug }));
}

async function getOpportunity(slug: string) {
  return opportunities.find((opportunity) => opportunity.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const opportunity = await getOpportunity(slug);
  if (!opportunity) return {};
  return {
    title: opportunity.title,
    description: opportunity.summary,
    alternates: { canonical: `${site.url}/${locale}/opportunities/${opportunity.slug}` },
    openGraph: {
      title: opportunity.title,
      description: opportunity.summary,
      url: `${site.url}/${locale}/opportunities/${opportunity.slug}`,
      images: [{ url: opportunity.heroImage, width: 1200, height: 630, alt: opportunity.title }]
    }
  };
}

export default async function OpportunityDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const opportunity = await getOpportunity(slug);
  if (!opportunity) return notFound();

  const t = await getTranslations('opportunityDetail');

  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: opportunity.title,
    description: opportunity.summary,
    category: opportunity.type,
    areaServed: opportunity.targetMarkets.join(", "),
    availability: "https://schema.org/InStock",
    url: `${site.url}/${locale}/opportunities/${opportunity.slug}`,
    seller: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    }
  };

  const facts = [
    [t('quickFacts.originCountry'), opportunity.originCountry],
    [t('quickFacts.targetMarkets'), opportunity.targetMarkets.join(", ")],
    [t('quickFacts.partnerType'), "Importer, Distributor, Franchisee, Operator"],
    [t('quickFacts.exclusivity'), "Possible by territory"],
    [t('quickFacts.investmentReq'), opportunity.investmentRequirement],
    [t('quickFacts.status'), opportunity.status]
  ];

  return (
    <>
      <StructuredData data={offerSchema} />
      <Link href={`/${locale}/opportunities`} className="breadcrumb">{t('back')}</Link>
      <section className="detail-shell">
        <article className="detail-main">
          <img className="detail-hero-img" src={opportunity.heroImage} alt={opportunity.title} />
          <div className="detail-content">
            <div className="detail-title-row">
              <div>
                <div className="badge-stack">
                  {opportunity.verificationBadges.map((badge) => <span className="top-badge" key={badge}>✓ {badge}</span>)}
                </div>
                <h1>{opportunity.title}</h1>
                <p>{opportunity.summary}</p>
              </div>
              <div className="quick-panel">
                <strong>{t('interested')}</strong>
                <p>Send a qualified inquiry to receive more information.</p>
                <a className="btn btn-primary full" href="#inquiry">{t('sendInquiry')}</a>
                <a className="btn btn-line full" href="#documents" style={{ marginTop: 8 }}>{t('saveOpportunity')}</a>
              </div>
            </div>

            <div className="quick-facts">
              {facts.map(([label, value]) => (
                <div className="fact" key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>
          </div>

          <div className="tabs">
            {[
              t('tabs.overview'),
              t('tabs.company'),
              t('tabs.products'),
              t('tabs.market'),
              t('tabs.partnerProfile'),
              t('tabs.commercial'),
              t('tabs.territories'),
              t('tabs.more')
            ].map((tab) => <a href={`#${tab.toLowerCase().replaceAll(" ", "-")}`} key={tab}>{tab}</a>)}
          </div>

          <div className="detail-content">
            <div className="content-grid-2">
              <div className="content-card" id="overview">
                <h2>{t('overview')}</h2>
                <p>{opportunity.description}</p>
                <h3>{t('keyHighlights')}</h3>
                <ul>
                  {opportunity.credentials.map((item) => <li key={item}>✓ {item}</li>)}
                </ul>
              </div>
              <div className="content-card product-shot">
                <img src="/assets/detail-product-shot.webp" alt="Product showcase" />
              </div>
            </div>

            <div className="content-grid-2">
              <div className="content-card" id="company">
                <h2>{t('companyBackground')}</h2>
                <p>{opportunity.companyBackground}</p>
              </div>
              <div className="content-card" id="products">
                <h2>{t('productDetails')}</h2>
                <p>{opportunity.productDetails}</p>
              </div>
            </div>

            <div className="content-grid-2">
              <div className="content-card" id="market">
                <h2>{t('marketOpportunity')}</h2>
                <p>{opportunity.marketOpportunity}</p>
              </div>
              <div className="content-card" id="partner-profile">
                <h2>{t('idealPartner')}</h2>
                <p>{opportunity.partnerProfile}</p>
              </div>
            </div>

            <div className="content-grid-2">
              <div className="content-card" id="commercial">
                <h2>{t('commercialModel')}</h2>
                <p>{opportunity.commercialModel}</p>
                <h3>{t('territoryAvailability')}</h3>
                <p>{opportunity.territoryAvailability}</p>
              </div>
              <div className="content-card" id="documents">
                <h2>{t('documentsAvailable')}</h2>
                <div className="document-grid">
                  {opportunity.documentsAvailable.map((document) => (
                    <div className="document-item" key={document}><span className="pdf-icon">▣</span>{document}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="content-grid-2">
              <div className="content-card">
                <h2>{t('whyPartner')}</h2>
                <ul>
                  {t.raw('whyPartnerList').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="content-card">
                <h2>{t('risksNotes')}</h2>
                <p>{opportunity.risks}</p>
              </div>
            </div>

            <InquiryForm />
          </div>
        </article>

        <aside className="side-panel">
          <h3>{t('interested')}</h3>
          <p>Send us a qualified inquiry to receive more information.</p>
          <a href="#inquiry" className="btn btn-primary full">{t('sendInquiry')}</a>
          <a href={`/${locale}/contact`} className="btn btn-line full" style={{ marginTop: 10 }}>{t('askQuestion')}</a>
          <div className="secure-box">{t('secureBox')}</div>
        </aside>
      </section>
    </>
  );
}
