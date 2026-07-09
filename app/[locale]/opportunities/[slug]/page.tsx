import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/InquiryForm";
import { StructuredData } from "@/components/StructuredData";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { opportunities, site } from "@/lib/data";
import { absoluteUrl, canonicalUrl, pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string; locale: string }> };

export function generateStaticParams() {
  return opportunities.map((opportunity) => ({ slug: opportunity.slug }));
}

async function getOpportunity(slug: string) {
  return opportunities.find((opportunity) => opportunity.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const opportunity = await getOpportunity(slug);
  if (!opportunity) return {};
  const metadata = pageMetadata({
    locale,
    path: `/opportunities/${opportunity.slug}`,
    title: opportunity.title,
    description: opportunity.summary,
    image: opportunity.heroImage
  });
  return opportunity.seoKeywords?.length
    ? { ...metadata, keywords: opportunity.seoKeywords }
    : metadata;
}

export default async function OpportunityDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const opportunity = await getOpportunity(slug);
  if (!opportunity) return notFound();

  const t = await getTranslations('opportunityDetail');

  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "@id": `${canonicalUrl(locale, `/opportunities/${opportunity.slug}`)}#offer`,
    name: opportunity.title,
    description: opportunity.summary,
    url: canonicalUrl(locale, `/opportunities/${opportunity.slug}`),
    image: absoluteUrl(opportunity.heroImage),
    category: opportunity.type,
    areaServed: opportunity.targetMarkets.map((market) => ({
      "@type": "Place",
      name: market
    })),
    availableAtOrFrom: {
      "@type": "Place",
      name: opportunity.originCountry
    },
    availability: "https://schema.org/InStock",
    ...(opportunity.brand
      ? { brand: { "@type": "Brand", name: opportunity.brand } }
      : {}),
    ...(opportunity.company
      ? { offeredBy: { "@type": "Organization", name: opportunity.company } }
      : {}),
    seller: {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url
    },
    itemOffered: {
      "@type": "Service",
      name: opportunity.title,
      serviceType: opportunity.type,
      category: opportunity.sector,
      description: opportunity.description,
      image: absoluteUrl(opportunity.heroImage),
      areaServed: opportunity.targetMarkets.map((market) => ({
        "@type": "Place",
        name: market
      }))
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Origin country", value: opportunity.originCountry },
      { "@type": "PropertyValue", name: "Target markets", value: opportunity.targetMarkets.join(", ") },
      { "@type": "PropertyValue", name: "Commercial model", value: opportunity.commercialModel },
      { "@type": "PropertyValue", name: "Investment requirement", value: opportunity.investmentRequirement },
      { "@type": "PropertyValue", name: "Status", value: opportunity.status }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: site.name,
        item: canonicalUrl(locale)
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Opportunities",
        item: canonicalUrl(locale, "/opportunities")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: opportunity.title,
        item: canonicalUrl(locale, `/opportunities/${opportunity.slug}`)
      }
    ]
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
      <StructuredData data={[offerSchema, breadcrumbSchema]} />
      <Link href={`/${locale}/opportunities`} className="breadcrumb">{t('back')}</Link>
      <section className="detail-shell">
        <article className="detail-main">
          <img className="detail-hero-img" src={opportunity.heroImage} alt={opportunity.imageAlt || opportunity.title} />
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
                <Link className="btn btn-primary full" href={`/${locale}/contact?oppTitle=${encodeURIComponent(opportunity.title)}&oppSlug=${opportunity.slug}&source=${opportunity.id.startsWith("jip-") ? "JIP Japan" : "General"}`}>{t('sendInquiry')}</Link>
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
                <img src={opportunity.heroImage} alt={`${opportunity.title} product showcase`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
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

            <InquiryForm oppTitle={opportunity.title} oppSlug={opportunity.slug} source={opportunity.id.startsWith("jip-") ? "JIP Japan" : "General"} />
          </div>
        </article>

        <aside className="side-panel">
          <h3>{t('interested')}</h3>
          <p>Send us a qualified inquiry to receive more information.</p>
          <Link href={`/${locale}/contact?oppTitle=${encodeURIComponent(opportunity.title)}&oppSlug=${opportunity.slug}&source=${opportunity.id.startsWith("jip-") ? "JIP Japan" : "General"}`} className="btn btn-primary full">{t('sendInquiry')}</Link>
          <Link href={`/${locale}/contact?oppTitle=${encodeURIComponent(opportunity.title)}&oppSlug=${opportunity.slug}&source=${opportunity.id.startsWith("jip-") ? "JIP Japan" : "General"}`} className="btn btn-line full" style={{ marginTop: 10 }}>{t('askQuestion')}</Link>
          <div className="secure-box">{t('secureBox')}</div>
        </aside>
      </section>
    </>
  );
}
