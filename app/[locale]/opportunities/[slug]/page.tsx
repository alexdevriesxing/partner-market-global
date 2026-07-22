import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/InquiryForm";
import { StructuredData } from "@/components/StructuredData";
import { JIPJapanBadge } from "@/components/JIPJapanBadge";
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
    title: opportunity.slug === "yachiyo-mengyo-handa-somen-eu-distribution"
      ? "Yachiyo Mengyo Handa Somen EU Distribution | Partner Market Global"
      : opportunity.title,
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
  const isJip = opportunity.sourcePartner === "JIP Japan" || opportunity.id.startsWith("jip-");

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
    [t('quickFacts.partnerType'), "Importer, Distributor, Retailer, Foodservice"],
    [t('quickFacts.exclusivity'), opportunity.exclusivity || "Possible by territory"],
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
                <div className="badge-stack" style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", marginBottom: "12px" }}>
                  {isJip && <JIPJapanBadge variant="detail" showLabel={true} />}
                  {opportunity.verificationBadges.map((badge) => <span className="top-badge" key={badge}>✓ {badge}</span>)}
                </div>
                <h1>{opportunity.title}</h1>
                <p>{opportunity.summary}</p>
              </div>
              <div className="quick-panel">
                <strong>{t('interested')}</strong>
                <p>Send a qualified inquiry to receive more information.</p>
                <Link className="btn btn-primary full" href={`/${locale}/contact?oppTitle=${encodeURIComponent(opportunity.title)}&oppSlug=${opportunity.slug}&source=${isJip ? "JIP Japan" : "General"}`}>{t('sendInquiry')}</Link>
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

                {opportunity.slug === "nittoh-japanese-dollies-utility-carts-distribution" && (
                  <div className="track-record-panel" style={{ marginTop: 24, padding: 16, backgroundColor: "var(--card-bg, #ffffff)", borderRadius: 8, borderLeft: "4px solid #0056b3", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <h4 style={{ margin: "0 0 10px 0", fontSize: "1rem", fontWeight: "600" }}>Partner-Provided Commercial Track Record</h4>
                    <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0, fontSize: "0.95rem" }}>
                      <li style={{ marginBottom: 8 }}>📊 Nittoh supplies store-fixture dollies to Seven-Eleven locations throughout Japan, representing approximately 40,000 units per year.</li>
                      <li style={{ marginBottom: 8 }}>📊 Shipments of approximately 30,000 units per month to MUJI.</li>
                      <li style={{ marginBottom: 8 }}>📊 Shipments of approximately 10,000 units per month to major distribution and e-commerce channels including ASKUL and MonotaRO.</li>
                      <li style={{ marginBottom: 8 }}>📊 Nittoh holds a leading Japanese market position in household and office dollies.</li>
                    </ul>
                    <p style={{ margin: "12px 0 0 0", fontSize: "0.85rem", fontStyle: "italic", color: "#666" }}>
                      Customer references, market-position statements and shipment figures were supplied by the opportunity owner and remain subject to confirmation during commercial due diligence.
                    </p>
                  </div>
                )}

                {opportunity.slug === "ichiban-ken-indonesia-master-franchise" && (
                  <div className="track-record-panel" style={{ marginTop: 24, padding: 16, backgroundColor: "var(--card-bg, #ffffff)", borderRadius: 8, borderLeft: "4px solid #d9534f", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <h4 style={{ margin: "0 0 10px 0", fontSize: "1rem", fontWeight: "600" }}>Partner-Provided Regional Track Record</h4>
                    <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0, fontSize: "0.95rem" }}>
                      <li style={{ marginBottom: 8 }}>🍜 The brand currently operates ten restaurants in Vietnam.</li>
                      <li style={{ marginBottom: 8 }}>🍜 Franchise expansion into Thailand and the Philippines.</li>
                      <li style={{ marginBottom: 8 }}>🍜 Supporting operating data, store lists and franchise documents should be requested during qualification.</li>
                    </ul>
                    <p style={{ margin: "12px 0 0 0", fontSize: "0.85rem", fontStyle: "italic", color: "#666" }}>
                      Regional store and franchise-network information was supplied by the opportunity owner and remains subject to confirmation during due diligence.
                    </p>
                  </div>
                )}
              </div>
              <div className="content-card product-shot">
                <img src={opportunity.cardImage} alt={`${opportunity.title} product showcase`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
              </div>
            </div>

            {/* Custom Rich Sections for Yachiyo Mengyo */}
            {opportunity.slug === "yachiyo-mengyo-handa-somen-eu-distribution" && (
              <>
                {/* 4. PRODUCT STORY */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <h2>A Distinctive Noodle Tradition from Tokushima</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "center", marginTop: 16 }}>
                    <div>
                      <p style={{ lineHeight: 1.6, marginBottom: 12 }}>
                        Handa Somen originated in the Yoshino River region during the Edo period (Kyoho Era, approx. 300 years ago). Boatmen handling water transport began crafting these noodles for their own consumption and as regional souvenirs.
                      </p>
                      <p style={{ lineHeight: 1.6, marginBottom: 12 }}>
                        Because the noodles were originally crafted for self-sustenance rather than commercial speed, they were stretched substantially thicker without cutting corners. This distinct heritage gives Handa Somen its signature firm chewiness and smooth throat-passage (<em>nodogoshi</em>).
                      </p>
                      <p style={{ lineHeight: 1.6, marginBottom: 12 }}>
                        Under JAS standards, their physical thickness technically places them in the &quot;Hiyamugi&quot; category. However, because of their 300-year regional tradition, Handa Somen is uniquely permitted to retain the official &quot;Soumen&quot; designation.
                      </p>
                      <div style={{ padding: 12, backgroundColor: "var(--soft-bg, #f8fafc)", borderRadius: 8, borderLeft: "3px solid var(--primary, #0f766e)", fontSize: "0.9rem", color: "#475569" }}>
                        <strong>Revival Story:</strong> Following a bankruptcy threat in 2020, nationwide consumer demand and local support in Tsurugi Town led Soraniwa Group to step in and rescue Yachiyo Mengyo, preserving its hand-stretching legacy while modernizing production for world-standard organic certification.
                      </div>
                    </div>
                    <div>
                      <img
                        src="/images/opportunities/yachiyo/yachiyo-handa-tradition.webp"
                        alt="Handa Somen traditional hand-stretched noodle bundles"
                        style={{ width: "100%", height: "auto", borderRadius: 12, objectFit: "cover" }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. INGREDIENT PHILOSOPHY */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <h2>Carefully Selected Japanese Ingredients</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "center", marginTop: 16 }}>
                    <div>
                      <img
                        src="/images/opportunities/yachiyo/yachiyo-wheat-sourcing.webp"
                        alt="Golden wheat fields for Yachiyo domestic wheat sourcing"
                        style={{ width: "100%", height: "auto", borderRadius: 12, objectFit: "cover" }}
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p style={{ lineHeight: 1.6, marginBottom: 12 }}>
                        While 85% of wheat circulating in Japan is imported, Yachiyo Mengyo strictly prioritizes domestic Japanese agricultural ingredients:
                      </p>
                      <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
                        <li style={{ marginBottom: 10 }}>🌾 <strong>100% Hokkaido-Grown Organic Wheat:</strong> Sourced for the Organic Yachiyo line, cultivated without neonicotinoids or glyphosate.</li>
                        <li style={{ marginBottom: 10 }}>🌊 <strong>Uzushio Salt from Naruto, Tokushima:</strong> Pure sea salt extracted from Tokushima seawater with seawater impurities thoroughly removed.</li>
                        <li style={{ marginBottom: 10 }}>🌾 <strong>Expeller-Pressed Domestic Rice Bran Oil:</strong> Traditional solvent-free rice bran oil used during hand-stretching.</li>
                        <li style={{ marginBottom: 10 }}>🌱 <strong>Zero Chemical Additives:</strong> Completely free of artificial preservatives, colorants, or synthetic agents.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 6. CERTIFICATIONS AND INTERNATIONAL READINESS */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <h2>Certifications & International Readiness</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 16 }}>
                    <div style={{ padding: 16, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, textAlign: "center", backgroundColor: "var(--card-bg, #fff)" }}>
                      <span style={{ fontSize: "2rem" }}>🌱</span>
                      <h4 style={{ margin: "8px 0 4px 0", fontSize: "1rem" }}>Organic JAS</h4>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Certified organic manufacturing facility for Handa Somen.</p>
                    </div>
                    <div style={{ padding: 16, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, textAlign: "center", backgroundColor: "var(--card-bg, #fff)" }}>
                      <span style={{ fontSize: "2rem" }}>🏭</span>
                      <h4 style={{ margin: "8px 0 4px 0", fontSize: "1rem" }}>ISO 22000</h4>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>International food safety management standard compliance.</p>
                    </div>
                    <div style={{ padding: 16, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, textAlign: "center", backgroundColor: "var(--card-bg, #fff)" }}>
                      <span style={{ fontSize: "2rem" }}>☪️</span>
                      <h4 style={{ margin: "8px 0 4px 0", fontSize: "1rem" }}>Halal Certification</h4>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Clears Halal standards for Muslim consumers worldwide.</p>
                    </div>
                    <div style={{ padding: 16, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, textAlign: "center", backgroundColor: "var(--card-bg, #fff)" }}>
                      <span style={{ fontSize: "2rem" }}>🥬</span>
                      <h4 style={{ margin: "8px 0 4px 0", fontSize: "1rem" }}>Vegan Compatible</h4>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>100% plant-based recipes with zero animal-derived ingredients.</p>
                    </div>
                  </div>
                  <p style={{ marginTop: 16, fontSize: "0.85rem", fontStyle: "italic", color: "#64748b" }}>
                    Note: Certification scope, current certificates, EU labelling requirements, product specifications and market-specific documentation are available for review during partner qualification.
                  </p>
                </div>

                {/* 7. PRODUCT LINEUP */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <h2>Product Lineup</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginTop: 16 }}>
                    <div style={{ border: "1px solid var(--border, #e2e8f0)", borderRadius: 10, padding: 16, backgroundColor: "var(--card-bg, #fff)", display: "flex", flexDirection: "column" }}>
                      <img src="/images/opportunities/yachiyo/lineup-handa-soumen-yachiyo.webp" alt="Handa Soumen Yachiyo packaging" style={{ width: "100%", height: 160, objectFit: "contain", borderRadius: 6, marginBottom: 12 }} loading="lazy" />
                      <h4 style={{ margin: "0 0 8px 0", fontSize: "1rem" }}>A. Handa Soumen Yachiyo</h4>
                      <p style={{ fontSize: "0.85rem", color: "#475569", flexGrow: 1, margin: 0 }}>Traditional hand-stretched Handa Somen using Hokkaido wheat, Tokushima sea salt, and domestic rice bran oil.</p>
                    </div>
                    <div style={{ border: "1px solid var(--border, #e2e8f0)", borderRadius: 10, padding: 16, backgroundColor: "var(--card-bg, #fff)", display: "flex", flexDirection: "column" }}>
                      <img src="/images/opportunities/yachiyo/lineup-organic-yachiyo.webp" alt="Organic Yachiyo packaging" style={{ width: "100%", height: 160, objectFit: "contain", borderRadius: 6, marginBottom: 12 }} loading="lazy" />
                      <h4 style={{ margin: "0 0 8px 0", fontSize: "1rem" }}>B. Organic Yachiyo</h4>
                      <p style={{ fontSize: "0.85rem", color: "#475569", flexGrow: 1, margin: 0 }}>Organic Handa Somen made with 100% organic Hokkaido wheat and additive-free formulation.</p>
                    </div>
                    <div style={{ border: "1px solid var(--border, #e2e8f0)", borderRadius: 10, padding: 16, backgroundColor: "var(--card-bg, #fff)", display: "flex", flexDirection: "column" }}>
                      <img src="/images/opportunities/yachiyo/lineup-handa-hosoudon-yachiyo.webp" alt="Thin Udon Yachiyo packaging" style={{ width: "100%", height: 160, objectFit: "contain", borderRadius: 6, marginBottom: 12 }} loading="lazy" />
                      <h4 style={{ margin: "0 0 8px 0", fontSize: "1rem" }}>C. Handa Thin Udon Yachiyo</h4>
                      <p style={{ fontSize: "0.85rem", color: "#475569", flexGrow: 1, margin: 0 }}>A thin udon format combining udon-like springiness with versatile preparation options.</p>
                    </div>
                    <div style={{ border: "1px solid var(--border, #e2e8f0)", borderRadius: 10, padding: 16, backgroundColor: "var(--card-bg, #fff)", display: "flex", flexDirection: "column" }}>
                      <img src="/images/opportunities/yachiyo/lineup-frozen-handa-somen.webp" alt="Frozen Handa Somen packaging" style={{ width: "100%", height: 160, objectFit: "contain", borderRadius: 6, marginBottom: 12 }} loading="lazy" />
                      <h4 style={{ margin: "0 0 8px 0", fontSize: "1rem" }}>D. Frozen Handa Somen Yachiyo</h4>
                      <p style={{ fontSize: "0.85rem", color: "#475569", flexGrow: 1, margin: 0 }}>Frozen noodle format for convenient foodservice, restaurant, or prepared-meal applications.</p>
                    </div>
                  </div>
                  <p style={{ marginTop: 16, fontSize: "0.85rem", fontStyle: "italic", color: "#64748b" }}>
                    Detailed SKU specifications, packaging information, shelf life, MOQs and wholesale terms are available upon qualified inquiry.
                  </p>
                </div>

                {/* 9. USAGE AND MENU APPLICATIONS */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <h2>Usage & Menu Applications</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", marginBottom: 16 }}>
                    Serving inspiration demonstrating the culinary versatility of Yachiyo hand-stretched noodles across Asian-ethnic, Japanese traditional, fusion, and pasta-style dishes:
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                    <div style={{ border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, overflow: "hidden" }}>
                      <img src="/images/opportunities/yachiyo/recipe-green-curry-somen.webp" alt="Green Curry Dipping Somen" style={{ width: "100%", height: 140, objectFit: "cover" }} loading="lazy" />
                      <div style={{ padding: 12 }}>
                        <strong style={{ fontSize: "0.95rem", display: "block", marginBottom: 4 }}>Green Curry Dipping Somen</strong>
                        <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Pair extra-thick Handa Somen with rich coconut curry soup packed with spices.</p>
                      </div>
                    </div>
                    <div style={{ border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, overflow: "hidden" }}>
                      <img src="/images/opportunities/yachiyo/recipe-beef-sukiyaki-somen.webp" alt="Beef Sukiyaki Kamaage Somen" style={{ width: "100%", height: 140, objectFit: "cover" }} loading="lazy" />
                      <div style={{ padding: 12 }}>
                        <strong style={{ fontSize: "0.95rem", display: "block", marginBottom: 4 }}>Beef Sukiyaki Kamaage Somen</strong>
                        <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Sweet and savory simmered beef with rich sauce; noodles hold firm texture.</p>
                      </div>
                    </div>
                    <div style={{ border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, overflow: "hidden" }}>
                      <img src="/images/opportunities/yachiyo/recipe-taiwanese-mee-sua.webp" alt="Taiwanese Mee Sua-Style Somen" style={{ width: "100%", height: 140, objectFit: "cover" }} loading="lazy" />
                      <div style={{ padding: 12 }}>
                        <strong style={{ fontSize: "0.95rem", display: "block", marginBottom: 4 }}>Taiwanese Mee Sua-Style Somen</strong>
                        <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Bonito broth-based thickened soup with Five-Spice Powder and elastic noodle bite.</p>
                      </div>
                    </div>
                    <div style={{ border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, overflow: "hidden" }}>
                      <img src="/images/opportunities/yachiyo/recipe-yamagata-dashi-somen.webp" alt="Yamagata Dashi-Style Bukkake Somen" style={{ width: "100%", height: 140, objectFit: "cover" }} loading="lazy" />
                      <div style={{ padding: 12 }}>
                        <strong style={{ fontSize: "0.95rem", display: "block", marginBottom: 4 }}>Yamagata Dashi Bukkake Somen</strong>
                        <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Chopped summer vegetables with smooth throat-passage noodles for healthy dining.</p>
                      </div>
                    </div>
                    <div style={{ border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, overflow: "hidden" }}>
                      <img src="/images/opportunities/yachiyo/recipe-korean-bibim-somen.webp" alt="Korean Bibim Somen" style={{ width: "100%", height: 140, objectFit: "cover" }} loading="lazy" />
                      <div style={{ padding: 12 }}>
                        <strong style={{ fontSize: "0.95rem", display: "block", marginBottom: 4 }}>Korean Bibim Somen</strong>
                        <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Tossed in sweet & spicy gochujang sauce with a chewy, mochi-like noodle texture.</p>
                      </div>
                    </div>
                    <div style={{ border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, overflow: "hidden" }}>
                      <img src="/images/opportunities/yachiyo/recipe-mentaiko-cream-somen.webp" alt="Mentaiko Cream Somen" style={{ width: "100%", height: 140, objectFit: "cover" }} loading="lazy" />
                      <div style={{ padding: 12 }}>
                        <strong style={{ fontSize: "0.95rem", display: "block", marginBottom: 4 }}>Mentaiko Cream Somen</strong>
                        <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>Pasta-style adaptation combining spicy cod roe with smooth cream and shiro-dashi.</p>
                      </div>
                    </div>
                  </div>
                  <p style={{ marginTop: 12, fontSize: "0.8rem", fontStyle: "italic", color: "#64748b" }}>
                    Note: The above recipes illustrate serving inspiration and menu applications. The noodles themselves are vegan-compatible, while finished dishes depend on ingredients chosen by the restaurant or consumer.
                  </p>
                </div>
              </>
            )}

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

            <InquiryForm oppTitle={opportunity.title} oppSlug={opportunity.slug} source={isJip ? "JIP Japan" : "General"} />
          </div>
        </article>

        <aside className="side-panel">
          <h3>{t('interested')}</h3>
          <p>Send us a qualified inquiry to receive more information.</p>
          <Link href={`/${locale}/contact?oppTitle=${encodeURIComponent(opportunity.title)}&oppSlug=${opportunity.slug}&source=${isJip ? "JIP Japan" : "General"}`} className="btn btn-primary full">{t('sendInquiry')}</Link>
          <Link href={`/${locale}/contact?oppTitle=${encodeURIComponent(opportunity.title)}&oppSlug=${opportunity.slug}&source=${isJip ? "JIP Japan" : "General"}`} className="btn btn-line full" style={{ marginTop: 10 }}>{t('askQuestion')}</Link>
          <div className="secure-box">{t('secureBox')}</div>
        </aside>
      </section>
    </>
  );
}

