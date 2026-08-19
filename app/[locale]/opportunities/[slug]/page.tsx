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
    title: opportunity.slug === "sonic-friends-europe-2027"
      ? "SONIC & FRIENDS European Distribution & Retail Opportunity | PartnerMarketGlobal"
      : opportunity.slug === "yachiyo-mengyo-handa-somen-eu-distribution"
      ? "Yachiyo Mengyo Handa Somen EU Distribution | Partner Market Global"
      : opportunity.title,
    description: opportunity.slug === "sonic-friends-europe-2027"
      ? "European retailers, distributors and wholesalers can enquire about the new SONIC & FRIENDS merchandise range from Japan for the 2027 Sonic retail window."
      : opportunity.summary,
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

                {opportunity.slug === "ebara-foods-indonesia-distribution-noodle-partnership" && (
                  <div className="track-record-panel" style={{ marginTop: 24, padding: 16, backgroundColor: "var(--card-bg, #ffffff)", borderRadius: 8, borderLeft: "4px solid #0f766e", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <h4 style={{ margin: "0 0 10px 0", fontSize: "1rem", fontWeight: "600" }}>Ebara Foods Group Key Information</h4>
                    <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0, fontSize: "0.95rem" }}>
                      <li style={{ marginBottom: 8 }}>🏢 <strong>Established 1958:</strong> Ebara Foods Industry, Inc. is a leading Japanese seasoning and sauce manufacturer.</li>
                      <li style={{ marginBottom: 8 }}>🌏 <strong>Regional Operations:</strong> Managed through EBARA SINGAPORE PTE. LTD. and EBARA FOODS MALAYSIA SDN. BHD.</li>
                      <li style={{ marginBottom: 8 }}>📍 <strong>Priority Launch Market:</strong> Bali B2B foodservice network & specialist ramen-supply proposition.</li>
                      <li style={{ marginBottom: 8 }}>⚠️ <strong>Exclusion Note:</strong> MASUYA is an active Ebara partner and is strictly excluded from partner search outreach.</li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="content-card product-shot">
                <img src={opportunity.cardImage} alt={`${opportunity.title} product showcase`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
              </div>
            </div>

            {/* Custom Rich Sections for SONIC & FRIENDS */}
            {opportunity.slug === "sonic-friends-europe-2027" && (
              <>
                {/* 1. HERO B2B OVERVIEW & QUICK ACTIONS */}
                <div className="content-card" style={{ marginTop: 24, background: "linear-gradient(135deg, #0b1e36 0%, #173b6c 50%, #0056b3 100%)", color: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 16 }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ background: "#ffcc00", color: "#000", padding: "4px 10px", borderRadius: 6, fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.5px" }}>⭐ NEW OPPORTUNITY</span>
                      <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", padding: "4px 10px", borderRadius: 6, fontWeight: 700, fontSize: "0.8rem" }}>🎬 2027 RETAIL WINDOW</span>
                      <span style={{ background: "#ef4444", color: "#fff", padding: "4px 10px", borderRadius: 6, fontWeight: 700, fontSize: "0.8rem" }}>⏳ TIME SENSITIVE (SEPT 2026 ORDER CUT-OFF)</span>
                    </div>
                    <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>
                      Principal: <strong>Japan Industrial Promotion Inc.</strong> (Daiki Fukaura)
                    </div>
                  </div>

                  <h2 style={{ color: "#ffffff", fontSize: "1.8rem", margin: "0 0 10px 0", fontWeight: 800, letterSpacing: "-0.5px" }}>
                    SONIC &amp; FRIENDS — A New Retail Opportunity for Europe
                  </h2>
                  <p style={{ fontSize: "1.05rem", lineHeight: 1.6, margin: "0 0 20px 0", color: "rgba(255,255,255,0.92)", maxWidth: "850px" }}>
                    SEGA introduces a new character merchandise collection bringing Sonic and his companions to life in an exceptionally cute, approachable visual style. PartnerMarketGlobal is working in direct cooperation with Japan Industrial Promotion to identify qualified European retail and distribution partners for the 2027 commercial launch.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
                    <a href="#inquiry" className="btn btn-primary" style={{ background: "#ffcc00", color: "#000", border: "none", fontWeight: 700, padding: "10px 20px" }}>
                      📥 Request Buyer Information
                    </a>
                    <a href="#inquiry" className="btn btn-line" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.6)", padding: "10px 20px" }}>
                      🤝 Discuss Distribution
                    </a>
                    <a href="#core-range" className="btn btn-line" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.6)", padding: "10px 20px" }}>
                      🧸 View Product Range
                    </a>
                  </div>
                </div>

                {/* 2. ABOUT THE CONCEPT */}
                <div className="content-card" id="about-concept" style={{ marginTop: 24 }}>
                  <h2>About SONIC &amp; FRIENDS: A Cute, Approachable Character Evolution</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "center", marginTop: 16 }}>
                    <div>
                      <p style={{ lineHeight: 1.6, marginBottom: 12 }}>
                        <strong>SONIC &amp; FRIENDS</strong> is a character series created by <strong>SEGA</strong> that reimagines Sonic and his companions through a softer, highly stylized and exceptionally cute design aesthetic.
                      </p>
                      <p style={{ lineHeight: 1.6, marginBottom: 12 }}>
                        The collection substantially expands the merchandising potential of the Sonic brand far beyond the franchise&apos;s traditional core gaming audience. Its approachable, kawaii character treatment unlocks multi-demographic retail appeal:
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginTop: 14 }}>
                        <div style={{ padding: 10, background: "var(--soft-bg, #f8fafc)", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                          🎮 <strong>Existing Sonic Fans &amp; Gamers</strong>
                        </div>
                        <div style={{ padding: 10, background: "var(--soft-bg, #f8fafc)", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                          🧸 <strong>Plush &amp; Character Collectors</strong>
                        </div>
                        <div style={{ padding: 10, background: "var(--soft-bg, #f8fafc)", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                          👨‍👩‍👧‍👦 <strong>Children &amp; Family Shoppers</strong>
                        </div>
                        <div style={{ padding: 10, background: "var(--soft-bg, #f8fafc)", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                          🎀 <strong>Female &amp; Kawaii Consumers</strong>
                        </div>
                        <div style={{ padding: 10, background: "var(--soft-bg, #f8fafc)", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                          🎁 <strong>Gift Buyers &amp; Lifestyle Stores</strong>
                        </div>
                        <div style={{ padding: 10, background: "var(--soft-bg, #f8fafc)", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                          🏬 <strong>Department &amp; Specialty Chains</strong>
                        </div>
                      </div>
                      <p style={{ lineHeight: 1.6, marginTop: 14, fontSize: "0.95rem", color: "#475569" }}>
                        The commercial proposition is significantly broader than traditional video-game merchandise, offering higher impulse buy rates and broader shelf placement opportunities.
                      </p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="/images/opportunities/sonic-friends/sonic-friends-group-art.png"
                        alt="SONIC & FRIENDS character lineup group art official SEGA"
                        style={{ width: "100%", maxHeight: "300px", objectFit: "contain", borderRadius: 12 }}
                        loading="lazy"
                      />
                      <span style={{ fontSize: "0.8rem", color: "#64748b", display: "block", marginTop: 8 }}>Official SEGA SONIC &amp; FRIENDS Character Aesthetic</span>
                    </div>
                  </div>
                </div>

                {/* 3. BRAND CONTEXT & COMMERCIAL PROOF POINTS */}
                <div className="content-card" id="brand-context" style={{ marginTop: 24 }}>
                  <h2>More Than Three Decades of Sonic &amp; $1 Billion+ Box Office</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "start", marginTop: 16 }}>
                    <div>
                      <p style={{ lineHeight: 1.6, marginBottom: 14 }}>
                        Created by <strong>SEGA</strong> in 1991, Sonic the Hedgehog has evolved from gaming&apos;s most recognizable mascot into a multi-generational entertainment powerhouse spanning video games, feature films, animation, music tours, and consumer products.
                      </p>
                      <div style={{ padding: 16, backgroundColor: "#eff6ff", borderRadius: 10, borderLeft: "4px solid #0056b3", marginBottom: 14 }}>
                        <h4 style={{ margin: "0 0 6px 0", color: "#1e3a8a", fontSize: "1.1rem" }}>🌟 $1 Billion+ Worldwide Box Office</h4>
                        <p style={{ margin: 0, fontSize: "0.9rem", color: "#1e40af", lineHeight: 1.5 }}>
                          Produced by Paramount Pictures in collaboration with SEGA, the Sonic movie franchise has grossed over <strong>$1 Billion worldwide</strong>, ranking among the highest-grossing video game movie adaptations of all time.
                        </p>
                      </div>
                      <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                        The combination of massive theatrical awareness and 35 years of franchise affinity provides proven European retail sell-through potential.
                      </p>
                    </div>

                    <div style={{ background: "var(--soft-bg, #f8fafc)", padding: 18, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <h4 style={{ margin: "0 0 12px 0", fontSize: "1rem", color: "#0f172a" }}>Sonic Movie Theatrical Performance in Key European Markets</h4>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                        <thead>
                          <tr style={{ borderBottom: "2px solid #cbd5e1", textAlign: "left" }}>
                            <th style={{ padding: "8px 6px" }}>Country</th>
                            <th style={{ padding: "8px 6px" }}>Movie 1</th>
                            <th style={{ padding: "8px 6px" }}>Movie 2</th>
                            <th style={{ padding: "8px 6px" }}>Growth</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                            <td style={{ padding: "8px 6px" }}>🇬🇧 <strong>United Kingdom</strong></td>
                            <td style={{ padding: "8px 6px" }}>$22.3M</td>
                            <td style={{ padding: "8px 6px", fontWeight: 700, color: "#0f766e" }}>$26.3M</td>
                            <td style={{ padding: "8px 6px", color: "#16a34a" }}>+18%</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                            <td style={{ padding: "8px 6px" }}>🇩🇪 <strong>Germany</strong></td>
                            <td style={{ padding: "8px 6px" }}>$7.7M</td>
                            <td style={{ padding: "8px 6px", fontWeight: 700, color: "#0f766e" }}>$22.8M</td>
                            <td style={{ padding: "8px 6px", color: "#16a34a" }}>+196%</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                            <td style={{ padding: "8px 6px" }}>🇫🇷 <strong>France</strong></td>
                            <td style={{ padding: "8px 6px" }}>$13.2M</td>
                            <td style={{ padding: "8px 6px", fontWeight: 700, color: "#0f766e" }}>$13.6M</td>
                            <td style={{ padding: "8px 6px", color: "#16a34a" }}>+3%</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "8px 6px" }}>🇪🇸 <strong>Spain</strong></td>
                            <td style={{ padding: "8px 6px" }}>$4.8M</td>
                            <td style={{ padding: "8px 6px", fontWeight: 700, color: "#0f766e" }}>$6.4M</td>
                            <td style={{ padding: "8px 6px", color: "#16a34a" }}>+33%</td>
                          </tr>
                        </tbody>
                      </table>
                      <div style={{ marginTop: 10, fontSize: "0.8rem", color: "#64748b", fontStyle: "italic" }}>
                        Data source: Official theatrical box office tracking.
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. 2027 EUROPEAN MOVIE RETAIL WINDOW */}
                <div className="content-card" id="movie-window" style={{ marginTop: 24, border: "2px solid #3b82f6", background: "#f0f7ff" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div>
                      <h2 style={{ margin: "0 0 6px 0", color: "#1e40af" }}>A Major European Retail Window: March–April 2027</h2>
                      <p style={{ margin: 0, fontSize: "0.95rem", color: "#334155" }}>
                        Official European theatrical release dates for the new Sonic movie create an unprecedented retail attention surge:
                      </p>
                    </div>
                    <span style={{ background: "#2563eb", color: "#fff", padding: "6px 14px", borderRadius: 8, fontWeight: 700, fontSize: "0.85rem" }}>
                      🎬 THEATRICAL SCHEDULE
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginTop: 16 }}>
                    <div style={{ padding: 12, background: "#ffffff", borderRadius: 8, textAlign: "center", border: "1px solid #bfdbfe", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                      <span style={{ fontSize: "1.3rem" }}>🇧🇪</span>
                      <strong style={{ display: "block", fontSize: "0.85rem", marginTop: 4 }}>Belgium</strong>
                      <span style={{ fontSize: "0.9rem", color: "#2563eb", fontWeight: 700 }}>March 17, 2027</span>
                    </div>
                    <div style={{ padding: 12, background: "#ffffff", borderRadius: 8, textAlign: "center", border: "1px solid #bfdbfe", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                      <span style={{ fontSize: "1.3rem" }}>🇩🇪</span>
                      <strong style={{ display: "block", fontSize: "0.85rem", marginTop: 4 }}>Germany</strong>
                      <span style={{ fontSize: "0.9rem", color: "#2563eb", fontWeight: 700 }}>March 18, 2027</span>
                    </div>
                    <div style={{ padding: 12, background: "#ffffff", borderRadius: 8, textAlign: "center", border: "1px solid #bfdbfe", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                      <span style={{ fontSize: "1.3rem" }}>🇮🇹</span>
                      <strong style={{ display: "block", fontSize: "0.85rem", marginTop: 4 }}>Italy</strong>
                      <span style={{ fontSize: "0.9rem", color: "#2563eb", fontWeight: 700 }}>March 18, 2027</span>
                    </div>
                    <div style={{ padding: 12, background: "#ffffff", borderRadius: 8, textAlign: "center", border: "1px solid #bfdbfe", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                      <span style={{ fontSize: "1.3rem" }}>🇵🇹</span>
                      <strong style={{ display: "block", fontSize: "0.85rem", marginTop: 4 }}>Portugal</strong>
                      <span style={{ fontSize: "0.9rem", color: "#2563eb", fontWeight: 700 }}>March 18, 2027</span>
                    </div>
                    <div style={{ padding: 12, background: "#ffffff", borderRadius: 8, textAlign: "center", border: "1px solid #bfdbfe", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                      <span style={{ fontSize: "1.3rem" }}>🇪🇸</span>
                      <strong style={{ display: "block", fontSize: "0.85rem", marginTop: 4 }}>Spain</strong>
                      <span style={{ fontSize: "0.9rem", color: "#2563eb", fontWeight: 700 }}>March 19, 2027</span>
                    </div>
                    <div style={{ padding: 12, background: "#ffffff", borderRadius: 8, textAlign: "center", border: "1px solid #bfdbfe", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                      <span style={{ fontSize: "1.3rem" }}>🇬🇧</span>
                      <strong style={{ display: "block", fontSize: "0.85rem", marginTop: 4 }}>United Kingdom</strong>
                      <span style={{ fontSize: "0.9rem", color: "#2563eb", fontWeight: 700 }}>March 19, 2027</span>
                    </div>
                    <div style={{ padding: 12, background: "#ffffff", borderRadius: 8, textAlign: "center", border: "1px solid #bfdbfe", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                      <span style={{ fontSize: "1.3rem" }}>🇫🇷</span>
                      <strong style={{ display: "block", fontSize: "0.85rem", marginTop: 4 }}>France</strong>
                      <span style={{ fontSize: "0.9rem", color: "#2563eb", fontWeight: 700 }}>March 24, 2027</span>
                    </div>
                  </div>

                  <div style={{ marginTop: 16, padding: 14, background: "#ffffff", borderRadius: 8, borderLeft: "4px solid #2563eb" }}>
                    <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "#1e293b" }}>
                      <strong>Strategic Retail Alignment:</strong> With product availability scheduled ahead of the European theatrical launch period (January 2027 Shenzhen FOB arrival / European availability March–April 2027), retailers have a distinct commercial opportunity to position SONIC &amp; FRIENDS merchandise alongside renewed consumer attention surrounding the Sonic franchise.
                    </p>
                  </div>

                  <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10, fontSize: "0.85rem", color: "#475569" }}>
                    <span>🎵 <strong>Supporting Tour Visibility:</strong> Sonic 35th Anniversary &quot;Sonic Live in Concert&quot; tour in Brussels (ING Arena, Feb 24, 2027) &amp; Paris (Le Grand Rex, Feb 28, 2027).</span>
                  </div>
                </div>

                {/* 5. CORE PRODUCT RANGE */}
                <div className="content-card" id="core-range" style={{ marginTop: 24 }}>
                  <h2>Core Product Range: SONIC &amp; FRIENDS</h2>
                  <p style={{ color: "#64748b", marginTop: 4 }}>
                    High-quality, officially licensed plush and collectible assortment manufactured to premium Japanese retail specifications.
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 18 }}>
                    {/* Item 1: Mascot Plush */}
                    <div style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 16, background: "#ffffff", display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", padding: "10px 0", background: "#f8fafc", borderRadius: 8 }}>
                        <img src="/images/opportunities/sonic-friends/sonic-friends-mascot-sonic.webp" alt="Sonic Mascot Plush" style={{ height: "64px", objectFit: "contain" }} />
                        <img src="/images/opportunities/sonic-friends/sonic-friends-mascot-tails.webp" alt="Tails Mascot Plush" style={{ height: "64px", objectFit: "contain" }} />
                        <img src="/images/opportunities/sonic-friends/sonic-friends-mascot-knuckles.webp" alt="Knuckles Mascot Plush" style={{ height: "64px", objectFit: "contain" }} />
                        <img src="/images/opportunities/sonic-friends/sonic-friends-mascot-amy.webp" alt="Amy Mascot Plush" style={{ height: "64px", objectFit: "contain" }} />
                        <img src="/images/opportunities/sonic-friends/sonic-friends-mascot-shadow.webp" alt="Shadow Mascot Plush" style={{ height: "64px", objectFit: "contain" }} />
                        <img src="/images/opportunities/sonic-friends/sonic-friends-mascot-rouge.webp" alt="Rouge Mascot Plush" style={{ height: "64px", objectFit: "contain" }} />
                        <img src="/images/opportunities/sonic-friends/sonic-friends-mascot-silver.webp" alt="Silver Mascot Plush" style={{ height: "64px", objectFit: "contain" }} />
                        <img src="/images/opportunities/sonic-friends/sonic-friends-mascot-chao.webp" alt="Chao Mascot Plush" style={{ height: "64px", objectFit: "contain" }} />
                        <img src="/images/opportunities/sonic-friends/sonic-friends-mascot-dr-eggman.webp" alt="Dr Eggman Mascot Plush" style={{ height: "64px", objectFit: "contain" }} />
                      </div>
                      <h4 style={{ margin: "14px 0 6px 0", fontSize: "1.05rem" }}>SONIC &amp; FRIENDS Mascot Plush</h4>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 10px 0" }}>
                        Compact mascot plush with ball-chain attachment suited to bags, backpacks, gifting, impulse checkout, and character display merchandising.
                      </p>
                      <ul style={{ paddingLeft: 18, margin: "0 0 12px 0", fontSize: "0.85rem", color: "#334155" }}>
                        <li><strong>9 Characters:</strong> Sonic, Tails, Knuckles, Amy, Shadow, Rouge, Silver, Chao, Dr. Eggman</li>
                        <li><strong>Size:</strong> Approx. 140–160 mm depending on character (W50–60 × H130–160 × D40–50 mm)</li>
                        <li><strong>Master Carton:</strong> 48 pcs (W540 × H240 × D300 mm)</li>
                      </ul>
                      <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px dashed #e2e8f0", fontSize: "0.85rem", color: "#0f766e", fontWeight: 600 }}>
                        🔒 Wholesale pricing available on qualified inquiry
                      </div>
                    </div>

                    {/* Item 2: Medium Plush */}
                    <div style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 16, background: "#ffffff", display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", gap: 10, justifyContent: "center", padding: "10px 0", background: "#f8fafc", borderRadius: 8 }}>
                        <img src="/images/opportunities/sonic-friends/sonic-friends-plush-m-sonic.webp" alt="Sonic Medium Plush" style={{ height: "70px", objectFit: "contain" }} />
                        <img src="/images/opportunities/sonic-friends/sonic-friends-plush-m-tails.webp" alt="Tails Medium Plush" style={{ height: "70px", objectFit: "contain" }} />
                        <img src="/images/opportunities/sonic-friends/sonic-friends-plush-m-amy.webp" alt="Amy Medium Plush" style={{ height: "70px", objectFit: "contain" }} />
                        <img src="/images/opportunities/sonic-friends/sonic-friends-plush-m-shadow.webp" alt="Shadow Medium Plush" style={{ height: "70px", objectFit: "contain" }} />
                      </div>
                      <h4 style={{ margin: "14px 0 6px 0", fontSize: "1.05rem" }}>SONIC &amp; FRIENDS Plush — Medium (240 mm)</h4>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 10px 0" }}>
                        Standard-size character plush crafted with ultra-soft fabrics. Ideal for retail shelves, bedrooms, character collections, and lifestyle stores.
                      </p>
                      <ul style={{ paddingLeft: 18, margin: "0 0 12px 0", fontSize: "0.85rem", color: "#334155" }}>
                        <li><strong>Core Characters:</strong> Sonic, Tails, Amy, Shadow</li>
                        <li><strong>Size:</strong> W160 × H240 × D150 mm</li>
                        <li><strong>Master Carton:</strong> 12 pcs (W560 × H540 × D310 mm)</li>
                      </ul>
                      <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px dashed #e2e8f0", fontSize: "0.85rem", color: "#0f766e", fontWeight: 600 }}>
                        🔒 Wholesale pricing available on qualified inquiry
                      </div>
                    </div>

                    {/* Item 3: Cushion Sonic */}
                    <div style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 16, background: "#ffffff", display: "flex", flexDirection: "column" }}>
                      <div style={{ textAlign: "center", padding: "10px 0", background: "#f8fafc", borderRadius: 8 }}>
                        <img src="/images/opportunities/sonic-friends/sonic-friends-cushion-sonic.webp" alt="Sonic Character Cushion" style={{ height: "70px", objectFit: "contain" }} />
                      </div>
                      <h4 style={{ margin: "14px 0 6px 0", fontSize: "1.05rem" }}>SONIC &amp; FRIENDS Cushion — Sonic</h4>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 10px 0" }}>
                        Soft die-cut Sonic character cushion designed for home décor, gifting, bedrooms, gaming chairs, and lifestyle merchandising.
                      </p>
                      <ul style={{ paddingLeft: 18, margin: "0 0 12px 0", fontSize: "0.85rem", color: "#334155" }}>
                        <li><strong>Format:</strong> Die-cut plush face cushion</li>
                        <li><strong>Size:</strong> W300 × H250 × D150 mm</li>
                        <li><strong>Master Carton:</strong> 24 pcs (W550 × H460 × D550 mm)</li>
                      </ul>
                      <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px dashed #e2e8f0", fontSize: "0.85rem", color: "#0f766e", fontWeight: 600 }}>
                        🔒 Wholesale pricing available on qualified inquiry
                      </div>
                    </div>

                    {/* Item 4: Large Sonic Plush */}
                    <div style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 16, background: "#ffffff", display: "flex", flexDirection: "column" }}>
                      <div style={{ textAlign: "center", padding: "10px 0", background: "#f8fafc", borderRadius: 8 }}>
                        <img src="/images/opportunities/sonic-friends/sonic-friends-plush-l-sonic.webp" alt="Large Sonic Plush" style={{ height: "70px", objectFit: "contain" }} />
                      </div>
                      <h4 style={{ margin: "14px 0 6px 0", fontSize: "1.05rem" }}>SONIC &amp; FRIENDS Plush — Large Sonic (400 mm)</h4>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 10px 0" }}>
                        Large-format flagship Sonic plush intended to deliver powerful shelf presence and serve as a visual focal point in retail window displays.
                      </p>
                      <ul style={{ paddingLeft: 18, margin: "0 0 12px 0", fontSize: "0.85rem", color: "#334155" }}>
                        <li><strong>Format:</strong> Large statement plush</li>
                        <li><strong>Size:</strong> W280 × H400 × D200 mm</li>
                        <li><strong>Master Carton:</strong> 6 pcs (W750 × H480 × D360 mm)</li>
                      </ul>
                      <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px dashed #e2e8f0", fontSize: "0.85rem", color: "#0f766e", fontWeight: 600 }}>
                        🔒 Wholesale pricing available on qualified inquiry
                      </div>
                    </div>

                    {/* Item 5: Sleeping Sonic */}
                    <div style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 16, background: "#ffffff", display: "flex", flexDirection: "column" }}>
                      <div style={{ textAlign: "center", padding: "10px 0", background: "#f8fafc", borderRadius: 8 }}>
                        <img src="/images/opportunities/sonic-friends/sonic-friends-plush-sonic-sleeping.webp" alt="Sleeping Sonic Plush" style={{ height: "70px", objectFit: "contain" }} />
                      </div>
                      <h4 style={{ margin: "14px 0 6px 0", fontSize: "1.05rem" }}>SONIC &amp; FRIENDS Sleeping Sonic (350 mm)</h4>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 10px 0" }}>
                        Adorable lying-down Sonic plush with a soft, peaceful lifestyle and comforting gift positioning.
                      </p>
                      <ul style={{ paddingLeft: 18, margin: "0 0 12px 0", fontSize: "0.85rem", color: "#334155" }}>
                        <li><strong>Format:</strong> Lying-down / Sleeping plush</li>
                        <li><strong>Size:</strong> W350 × H200 × D150 mm</li>
                        <li><strong>Master Carton:</strong> 12 pcs (W720 × H560 × D270 mm)</li>
                      </ul>
                      <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px dashed #e2e8f0", fontSize: "0.85rem", color: "#0f766e", fontWeight: 600 }}>
                        🔒 Wholesale pricing available on qualified inquiry
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. SANRIO COLLABORATION RANGE */}
                <div className="content-card" id="sanrio-collab" style={{ marginTop: 24, background: "#fffdfa", border: "1px solid #fed7aa" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div>
                      <h2 style={{ margin: "0 0 6px 0", color: "#9a3412" }}>Additional Character Collaborations: SONIC &amp; FRIENDS × Sanrio characters</h2>
                      <p style={{ margin: 0, fontSize: "0.95rem", color: "#7c2d12" }}>
                        Exclusive collaborative character lineup pairing iconic SEGA and Sanrio characters in collectible formats.
                      </p>
                    </div>
                    <span style={{ background: "#ea580c", color: "#fff", padding: "4px 12px", borderRadius: 6, fontWeight: 700, fontSize: "0.8rem" }}>
                      SPECIAL COLLABORATION
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginTop: 16 }}>
                    <div style={{ padding: 12, background: "#ffffff", borderRadius: 8, border: "1px solid #ffedd5" }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                        <img src="/images/opportunities/sonic-friends/sonic-sanrio-strap-figure-box.webp" alt="Strap Figure Box" style={{ height: "48px" }} />
                        <div>
                          <strong style={{ fontSize: "0.9rem", display: "block" }}>Strap Figure Blind Box</strong>
                          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>6 pcs/box · 72 pcs/carton</span>
                        </div>
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "#475569", margin: 0 }}>Collectible miniature strap figures in countertop display format.</p>
                    </div>

                    <div style={{ padding: 12, background: "#ffffff", borderRadius: 8, border: "1px solid #ffedd5" }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                        <img src="/images/opportunities/sonic-friends/sonic-sanrio-fuwa-fuwa-relax-box.webp" alt="Fuwa Fuwa Figure Box" style={{ height: "48px" }} />
                        <div>
                          <strong style={{ fontSize: "0.9rem", display: "block" }}>Fuwa Fuwa Flocked Figures</strong>
                          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Relax &amp; Enjoy Editions · Blind Box</span>
                        </div>
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "#475569", margin: 0 }}>Soft velvety flocking texture for premium tactile collectability.</p>
                    </div>

                    <div style={{ padding: 12, background: "#ffffff", borderRadius: 8, border: "1px solid #ffedd5" }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                        <img src="/images/opportunities/sonic-friends/sonic-sanrio-mascot-sonic-hellokitty.webp" alt="Sanrio Mascot Plush" style={{ height: "48px" }} />
                        <div>
                          <strong style={{ fontSize: "0.9rem", display: "block" }}>Sanrio Collab Mascots (80 mm)</strong>
                          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>6 Character Pairings · 48 pcs/carton</span>
                        </div>
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "#475569", margin: 0 }}>Sonic × Hello Kitty, Tails × Cinnamoroll, Shadow × Hangyodon, Knuckles × Kuromi, Eggman × PompomPurin, Amy × My Melody.</p>
                    </div>

                    <div style={{ padding: 12, background: "#ffffff", borderRadius: 8, border: "1px solid #ffedd5" }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                        <img src="/images/opportunities/sonic-friends/sonic-sanrio-plush-m-sonic-hellokitty.webp" alt="Sanrio Medium Plush" style={{ height: "48px" }} />
                        <div>
                          <strong style={{ fontSize: "0.9rem", display: "block" }}>Sanrio Collab Medium Plush (240 mm)</strong>
                          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>6 Character Pairings · 48 pcs/carton</span>
                        </div>
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "#475569", margin: 0 }}>Full-size collaborative plush products suited to gift &amp; lifestyle retail.</p>
                    </div>
                  </div>

                  <div style={{ marginTop: 14, padding: 12, background: "#fff7ed", borderRadius: 8, fontSize: "0.85rem", color: "#9a3412" }}>
                    Additional collaborative character merchandise is also available for selected buyers. Contact PartnerMarketGlobal for the current buyer catalogue, volume options, and commercial availability.
                  </div>
                </div>

                {/* 7. INDICATIVE COMMERCIAL STRUCTURE & GATING NOTICE */}
                <div className="content-card" id="commercial-structure" style={{ marginTop: 24 }}>
                  <h2>Indicative Commercial Structure</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginTop: 16 }}>
                    <div style={{ padding: 16, background: "var(--soft-bg, #f8fafc)", borderRadius: 8, borderLeft: "4px solid var(--primary, #0f766e)" }}>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem" }}>📦 Estimated Product Availability</h4>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#334155" }}>
                        January 2027 warehouse readiness in Shenzhen for European ocean/air transit, timing retail shelves for March–April 2027.
                      </p>
                    </div>

                    <div style={{ padding: 16, background: "var(--soft-bg, #f8fafc)", borderRadius: 8, borderLeft: "4px solid var(--primary, #0f766e)" }}>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem" }}>🚢 Commercial Logistics Basis</h4>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#334155" }}>
                        Shenzhen FOB terms. Standard master carton specifications and consolidated shipping documentation provided.
                      </p>
                    </div>

                    <div style={{ padding: 16, background: "var(--soft-bg, #f8fafc)", borderRadius: 8, borderLeft: "4px solid var(--primary, #0f766e)" }}>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem" }}>📊 Minimum Order Quantities (MOQ)</h4>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#334155" }}>
                        Commonly listed at approximately 3,000 pieces per SKU for the core plush lineup. Channel and assortment options subject to discussion.
                      </p>
                    </div>
                  </div>

                  <div style={{ marginTop: 20, padding: 18, backgroundColor: "#fef2f2", borderRadius: 10, border: "1px solid #fca5a5" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
                      <span style={{ fontSize: "1.5rem" }}>🔒</span>
                      <div>
                        <h4 style={{ margin: "0 0 4px 0", color: "#991b1b", fontSize: "1.05rem" }}>
                          Confidential Commercial Information Notice
                        </h4>
                        <p style={{ margin: 0, fontSize: "0.9rem", color: "#7f1d1d", lineHeight: 1.5 }}>
                          Detailed wholesale pricing, SRP guidelines, confidential line sheets, carton dimensions, and contractual terms are available to qualified retail and distribution partners upon request. Please submit a qualified inquiry below to receive the official buyer pack.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 8. PRODUCTION & COMMERCIAL TIMELINE */}
                <div className="content-card" id="timeline" style={{ marginTop: 24 }}>
                  <h2>Production &amp; Commercial Timeline</h2>
                  <div style={{ position: "relative", marginTop: 20, paddingLeft: 24, borderLeft: "3px solid #0056b3" }}>
                    <div style={{ marginBottom: 20, position: "relative" }}>
                      <div style={{ position: "absolute", left: -31, top: 2, width: 14, height: 14, borderRadius: "50%", background: "#0056b3", border: "3px solid #ffffff" }}></div>
                      <strong style={{ fontSize: "0.95rem", color: "#0056b3" }}>August 2026</strong>
                      <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem", color: "#334155" }}>European retailer and distributor qualification and initial outreach.</p>
                    </div>

                    <div style={{ marginBottom: 20, position: "relative" }}>
                      <div style={{ position: "absolute", left: -31, top: 2, width: 14, height: 14, borderRadius: "50%", background: "#ef4444", border: "3px solid #ffffff" }}></div>
                      <strong style={{ fontSize: "0.95rem", color: "#dc2626" }}>Early September 2026 (Target Order Window)</strong>
                      <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem", color: "#334155" }}>Target order cut-off window for current production planning and manufacturing allocation.</p>
                    </div>

                    <div style={{ marginBottom: 20, position: "relative" }}>
                      <div style={{ position: "absolute", left: -31, top: 2, width: 14, height: 14, borderRadius: "50%", background: "#0056b3", border: "3px solid #ffffff" }}></div>
                      <strong style={{ fontSize: "0.95rem", color: "#0056b3" }}>January 2027</strong>
                      <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem", color: "#334155" }}>Estimated Shenzhen warehouse availability and export logistics dispatch.</p>
                    </div>

                    <div style={{ marginBottom: 20, position: "relative" }}>
                      <div style={{ position: "absolute", left: -31, top: 2, width: 14, height: 14, borderRadius: "50%", background: "#0056b3", border: "3px solid #ffffff" }}></div>
                      <strong style={{ fontSize: "0.95rem", color: "#0056b3" }}>February 2027</strong>
                      <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem", color: "#334155" }}>Sonic 35th Anniversary European live concert events begin in Brussels (Feb 24) and Paris (Feb 28).</p>
                    </div>

                    <div style={{ marginBottom: 20, position: "relative" }}>
                      <div style={{ position: "absolute", left: -31, top: 2, width: 14, height: 14, borderRadius: "50%", background: "#16a34a", border: "3px solid #ffffff" }}></div>
                      <strong style={{ fontSize: "0.95rem", color: "#15803d" }}>March 17–24, 2027</strong>
                      <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem", color: "#334155" }}>Major European Sonic movie theatrical release window across Belgium, Germany, Italy, Portugal, Spain, UK, and France.</p>
                    </div>

                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: -31, top: 2, width: 14, height: 14, borderRadius: "50%", background: "#16a34a", border: "3px solid #ffffff" }}></div>
                      <strong style={{ fontSize: "0.95rem", color: "#15803d" }}>March–April 2027</strong>
                      <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem", color: "#334155" }}>Target European in-store and e-commerce retail activation period during peak consumer window.</p>
                    </div>
                  </div>
                </div>

                {/* 9. WE ARE LOOKING FOR PARTNERS */}
                <div className="content-card" id="target-partners" style={{ marginTop: 24 }}>
                  <h2>We Are Looking for Partners</h2>
                  <p style={{ lineHeight: 1.6, color: "#334155" }}>
                    PartnerMarketGlobal, in cooperation with Japan Industrial Promotion Inc., is actively seeking discussions with qualified European trade partners:
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 12 }}>
                    <div style={{ padding: 12, background: "var(--soft-bg, #f8fafc)", borderRadius: 8 }}>🏬 <strong>European National Retail Chains</strong></div>
                    <div style={{ padding: 12, background: "var(--soft-bg, #f8fafc)", borderRadius: 8 }}>🧸 <strong>Toy Retailers &amp; Superstores</strong></div>
                    <div style={{ padding: 12, background: "var(--soft-bg, #f8fafc)", borderRadius: 8 }}>🎮 <strong>Gaming &amp; Entertainment Specialists</strong></div>
                    <div style={{ padding: 12, background: "var(--soft-bg, #f8fafc)", borderRadius: 8 }}>🎌 <strong>Pop-Culture &amp; Character-Goods Stores</strong></div>
                    <div style={{ padding: 12, background: "var(--soft-bg, #f8fafc)", borderRadius: 8 }}>🎁 <strong>Gift &amp; Department Stores</strong></div>
                    <div style={{ padding: 12, background: "var(--soft-bg, #f8fafc)", borderRadius: 8 }}>🌐 <strong>E-commerce &amp; Marketplace Operators</strong></div>
                    <div style={{ padding: 12, background: "var(--soft-bg, #f8fafc)", borderRadius: 8 }}>🚚 <strong>Licensed Merchandise Distributors</strong></div>
                    <div style={{ padding: 12, background: "var(--soft-bg, #f8fafc)", borderRadius: 8 }}>📦 <strong>Importers &amp; Regional Wholesalers</strong></div>
                  </div>
                  <div style={{ marginTop: 16, padding: 14, background: "#f0fdf4", borderRadius: 8, borderLeft: "4px solid #16a34a" }}>
                    <strong style={{ color: "#166534" }}>Interested in SONIC &amp; FRIENDS for your territory?</strong>
                    <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem", color: "#15803d" }}>
                      Request the buyer presentation, wholesale catalogue, and commercial terms via the dedicated buyer qualification form below.
                    </p>
                  </div>
                </div>

                {/* 10. REPRESENTATION & IP LEGAL NOTICE */}
                <div className="content-card" style={{ marginTop: 24, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "1rem" }}>Representation &amp; Facilitation</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, margin: "0 0 12px 0" }}>
                    European market development facilitated by <strong>PartnerMarketGlobal</strong> on behalf of <strong>Japan Industrial Promotion Inc.</strong> (Principal contact: Daiki Fukaura). Inquiries are reviewed and routed securely through our qualified buyer introduction process.
                  </p>
                  <h3 style={{ margin: "12px 0 8px 0", fontSize: "1rem" }}>Intellectual Property &amp; Legal Notice</h3>
                  <p style={{ fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>
                    © SEGA. SONIC THE HEDGEHOG and SONIC &amp; FRIENDS are registered trademarks or trademarks of SEGA CORPORATION. © 2027 SANRIO CO., LTD. Hello Kitty, Cinnamoroll, Kuromi, My Melody, Hangyodon, and Pompompurin are trademarks of SANRIO CO., LTD. Sonic Movie properties © Paramount Pictures Corporation. PartnerMarketGlobal provides independent commercial facilitation and does not claim ownership or licensing rights to third-party intellectual property.
                  </p>
                </div>
              </>
            )}

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

            {/* Custom Rich Sections for Ebara Foods */}
            {opportunity.slug === "ebara-foods-indonesia-distribution-noodle-partnership" && (
              <>
                {/* PROPOSED PRODUCT SOLUTION */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <h2>Proposed Product Solution</h2>
                  <p style={{ lineHeight: 1.6, marginBottom: 16, color: "#475569" }}>
                    The opportunity is presented as a combined professional ramen and noodle-production solution, giving prospective partners a complete proposition for restaurants that currently manufacture noodles or prepare soup components in-house.
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
                    <div style={{ padding: 16, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, backgroundColor: "var(--card-bg, #fff)" }}>
                      <h3 style={{ marginTop: 0, fontSize: "1.05rem", color: "#0f766e" }}>🍜 Ramen Soup Solutions</h3>
                      <ul style={{ paddingLeft: 20, margin: 0, fontSize: "0.9rem", color: "#334155" }}>
                        <li style={{ marginBottom: 6 }}>Tori Paitan-style chicken soup base</li>
                        <li style={{ marginBottom: 6 }}>Rich Miso ramen soup base</li>
                        <li style={{ marginBottom: 6 }}>Tonkotsu-style pork bone soup base</li>
                        <li style={{ marginBottom: 6 }}>Vegetable & plant-forward ramen soup bases</li>
                        <li>Other professional Japanese soup bases (subject to availability)</li>
                      </ul>
                    </div>

                    <div style={{ padding: 16, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, backgroundColor: "var(--card-bg, #fff)" }}>
                      <h3 style={{ marginTop: 0, fontSize: "1.05rem", color: "#0f766e" }}>🌾 Noodle-Production Ingredients</h3>
                      <ul style={{ paddingLeft: 20, margin: 0, fontSize: "0.9rem", color: "#334155" }}>
                        <li style={{ marginBottom: 6 }}>Kansui (alkaline noodle agents)</li>
                        <li style={{ marginBottom: 6 }}>Texture & chewiness enhancement agents</li>
                        <li style={{ marginBottom: 6 }}>Soup thickeners & viscosity solutions</li>
                        <li>Consistency & shelf-life management ingredients</li>
                      </ul>
                    </div>

                    <div style={{ padding: 16, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, backgroundColor: "var(--card-bg, #fff)" }}>
                      <h3 style={{ marginTop: 0, fontSize: "1.05rem", color: "#0f766e" }}>🧪 Foodservice Seasonings</h3>
                      <ul style={{ paddingLeft: 20, margin: 0, fontSize: "0.9rem", color: "#334155" }}>
                        <li style={{ marginBottom: 6 }}>Professional Japanese culinary sauces</li>
                        <li style={{ marginBottom: 6 }}>Dashi and tare seasoning bases</li>
                        <li style={{ marginBottom: 6 }}>Menu customization & chef support items</li>
                        <li>Technical recipe guidance and dosage support</li>
                      </ul>
                    </div>
                  </div>

                  <p style={{ marginTop: 16, fontSize: "0.85rem", fontStyle: "italic", color: "#64748b" }}>
                    Note: Final product availability, formulations, pack sizes, ingredients, certifications, halal status, pricing and minimum order quantities will be confirmed during partner qualification. Product eligibility may differ by formulation and route to market.
                  </p>
                </div>

                {/* MARKET RATIONALE & BALI PRIORITY */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <h2>Market Rationale & Bali Launch Priority</h2>
                  <p style={{ lineHeight: 1.6, marginBottom: 14 }}>
                    Outside Indonesia’s largest distribution hubs, reliable access to fresh or frozen specialist ramen noodles can be limited. Consequently, many ramen operators produce noodles themselves or source them through local micro-manufacturers.
                  </p>
                  <p style={{ lineHeight: 1.6, marginBottom: 16 }}>
                    This gap creates a strategic opportunity to connect professional noodle production with compatible soup bases and texture agents. A local distributor or manufacturer can offer restaurants a coherent ramen solution rather than selling individual ingredients in isolation.
                  </p>

                  <h3 style={{ fontSize: "1.1rem", marginBottom: 12 }}>Why Bali is the Initial Priority Market:</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                    <div style={{ padding: 14, backgroundColor: "var(--soft-bg, #f8fafc)", borderRadius: 8, borderLeft: "3px solid #0f766e" }}>
                      <strong>Concentrated Hospitality Sector:</strong> High density of hotels, resorts, izakayas, and independent dining venues.
                    </div>
                    <div style={{ padding: 14, backgroundColor: "var(--soft-bg, #f8fafc)", borderRadius: 8, borderLeft: "3px solid #0f766e" }}>
                      <strong>International & Japanese Dining:</strong> Strong consumer and tourist demand for authentic Japanese culinary experiences.
                    </div>
                    <div style={{ padding: 14, backgroundColor: "var(--soft-bg, #f8fafc)", borderRadius: 8, borderLeft: "3px solid #0f766e" }}>
                      <strong>Technical Selling Fit:</strong> Independent chefs and local manufacturers value specialist technical application support.
                    </div>
                    <div style={{ padding: 14, backgroundColor: "var(--soft-bg, #f8fafc)", borderRadius: 8, borderLeft: "3px solid #0f766e" }}>
                      <strong>Ideal B2B Testbed:</strong> Practical environment to validate the commercial model before expanding to Java and other islands.
                    </div>
                  </div>
                </div>

                {/* PRIORITY TARGET PARTNERS */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <h2>Priority Target Partners</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginTop: 16 }}>
                    <div style={{ padding: 16, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8 }}>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem" }}>1. Specialist B2B & Foodservice Distributors</h4>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#475569" }}>
                        Indonesian distributors with active HORECA/Japanese restaurant coverage, warehousing, and willingness to actively sell Ebara as a core line. <em style={{ color: "#b91c1c" }}>Note: MASUYA is an active partner and is explicitly excluded from outreach.</em>
                      </p>
                    </div>

                    <div style={{ padding: 16, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8 }}>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem" }}>2. Ramen-Ingredient Wholesalers</h4>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#475569" }}>
                        Wholesalers supplying ramen shops, izakayas, hotels, resorts, central kitchens, and specialty Japanese food accounts.
                      </p>
                    </div>

                    <div style={{ padding: 16, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8 }}>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem" }}>3. Noodle Manufacturers</h4>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#475569" }}>
                        Fresh, chilled, or frozen noodle producers seeking to expand SKU ranges, introduce kansui & texture solutions, and offer bundled noodle-and-soup packages to restaurant clients.
                      </p>
                    </div>

                    <div style={{ padding: 16, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8 }}>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem" }}>4. Local Trading Companies</h4>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#475569" }}>
                        Commercial trading firms with strong Japanese-Indonesian networks, food import compliance expertise, and established distribution routes.
                      </p>
                    </div>

                    <div style={{ padding: 16, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8 }}>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem" }}>5. Strategic Investment or M&A Candidates</h4>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#475569" }}>
                        Ebara is open to evaluating suitable Indonesian foodservice distributors, ramen specialists, or noodle manufacturers for strategic alliances, minority/majority investment, or acquisition. All M&A discussions are exploratory and subject to strategic fit, valuation, and due diligence.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ILLUSTRATIVE BALI PARTNER MODEL */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <h2>Illustrative Bali Partner Model</h2>
                  <div style={{ padding: 16, backgroundColor: "var(--soft-bg, #f8fafc)", borderRadius: 8, borderLeft: "4px solid #0f766e" }}>
                    <p style={{ lineHeight: 1.6, margin: 0, fontSize: "0.95rem" }}>
                      A suitable example would be a Bali-based ramen operator or local noodle producer that supplies noodles to a network of independent restaurants. Such a partner could combine its locally produced noodles with Ebara soup bases, kansui, and supporting seasonings to offer restaurant customers a complete ramen solution.
                    </p>
                    <ul style={{ marginTop: 12, paddingLeft: 20, fontSize: "0.9rem", color: "#334155" }}>
                      <li>Manufacture or supply noodles locally while offering compatible Ebara soup bases.</li>
                      <li>Supply complete ingredient bundles to independent restaurants across Bali.</li>
                      <li>Provide menu development, dosage guidance, and recipe standardization.</li>
                      <li>Build recurring B2B restaurant relationships and reduce reliance on Java imports.</li>
                    </ul>
                  </div>
                </div>

                {/* PHASED MARKET-ENTRY APPROACH */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <h2>Phased Market-Entry Approach</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginTop: 16 }}>
                    <div style={{ padding: 14, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, textAlign: "center" }}>
                      <span style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f766e" }}>Phase 1</span>
                      <h4 style={{ margin: "6px 0 4px 0", fontSize: "0.95rem" }}>Bali Partner Identification</h4>
                      <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>Identify B2B distributors, noodle makers, and trading firms with Bali coverage.</p>
                    </div>
                    <div style={{ padding: 14, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, textAlign: "center" }}>
                      <span style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f766e" }}>Phase 2</span>
                      <h4 style={{ margin: "6px 0 4px 0", fontSize: "0.95rem" }}>Product Validation</h4>
                      <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>Select initial range, conduct restaurant trials, validate product fit and BPOM scope.</p>
                    </div>
                    <div style={{ padding: 14, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, textAlign: "center" }}>
                      <span style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f766e" }}>Phase 3</span>
                      <h4 style={{ margin: "6px 0 4px 0", fontSize: "0.95rem" }}>Focused Launch</h4>
                      <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>Commercial rollout across izakayas, hotels, restaurant groups, and noodle clients.</p>
                    </div>
                    <div style={{ padding: 14, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, textAlign: "center" }}>
                      <span style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f766e" }}>Phase 4</span>
                      <h4 style={{ margin: "6px 0 4px 0", fontSize: "0.95rem" }}>Territory Expansion</h4>
                      <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>Extend into Jakarta, Surabaya, and key Indonesian urban markets.</p>
                    </div>
                    <div style={{ padding: 14, border: "1px solid var(--border, #e2e8f0)", borderRadius: 8, textAlign: "center" }}>
                      <span style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f766e" }}>Phase 5</span>
                      <h4 style={{ margin: "6px 0 4px 0", fontSize: "0.95rem" }}>Strategic Cooperation</h4>
                      <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>Evaluate joint ventures, localized manufacturing, or acquisition discussions.</p>
                    </div>
                  </div>
                </div>

                {/* REGULATORY AND HALAL CONSIDERATIONS */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <h2>Regulatory & Compliance Information</h2>
                  <p style={{ lineHeight: 1.6, fontSize: "0.95rem", color: "#334155" }}>
                    Product registration, import requirements, ingredient declarations, halal obligations, non-halal handling, labelling and distribution requirements must be reviewed for each product and channel before commercial launch. Bali may provide a practical initial market for selected foodservice products, but all activities remain subject to applicable Indonesian regulations and professional legal and regulatory advice.
                  </p>
                  <ul style={{ paddingLeft: 20, fontSize: "0.9rem", color: "#475569", marginTop: 10 }}>
                    <li style={{ marginBottom: 6 }}>Halal and non-halal SKUs must be clearly identified and segregated in handling.</li>
                    <li style={{ marginBottom: 6 }}>Claims must be supported by valid official certification per SKU.</li>
                    <li>BPOM import clearance, customs classification, and labelling compliance must be verified during partner qualification.</li>
                  </ul>
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

