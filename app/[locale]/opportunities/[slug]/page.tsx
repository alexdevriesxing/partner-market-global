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
    title: opportunity.slug === "eiwa-japanese-food-ingredients-global-distribution"
      ? "Premium Japanese Food Ingredients & Specialty Foods — Global Distribution Partners Wanted | Eiwa Holdings"
      : opportunity.slug === "kadoya-tai-to-kome-japanese-restaurant-franchise"
      ? "Bring Authentic Japanese Tai-meshi & Karaage to Asia — Kadoya Franchise & Licensing Partners Wanted | Partner Market Global"
      : opportunity.slug === "celeble-non-alcoholic-sparkling-wine-distribution"
      ? "Japanese Premium 0.00% Sparkling Beverage Seeking Global Distribution Partners | Celeblé"
      : opportunity.slug === "nippon-career-ultra-thin-meat-slicing"
      ? "Nippon Career Industrial Meat Slicers | International Business Opportunity"
      : opportunity.slug === "izutsu-yatsuhashi-kyoto"
      ? "Izutsu Yatsuhashi Kyoto Confectionery Distribution Opportunity | PartnerMarketGlobal"
      : opportunity.slug === "premium-japanese-tsubame-drinkware"
      ? "Premium Japanese Tsubame Drinkware Distribution Opportunity | PartnerMarketGlobal"
      : opportunity.slug === "sonic-friends-europe-2027"
      ? "SONIC & FRIENDS European Distribution & Retail Opportunity | PartnerMarketGlobal"
      : opportunity.slug === "yachiyo-mengyo-handa-somen-eu-distribution"
      ? "Yachiyo Mengyo Handa Somen EU Distribution | Partner Market Global"
      : opportunity.title,
    description: opportunity.slug === "eiwa-japanese-food-ingredients-global-distribution"
      ? "Discover Japan's finest food ingredients with Eiwa Holdings of Tokyo. Exploring international distribution for Japanese citrus oils, Halal dashi, onion concentrate, Tomin frozen sushi, drinkable daifuku & buckwheat groats."
      : opportunity.slug === "kadoya-tai-to-kome-japanese-restaurant-franchise"
      ? "Partner with Kadoya Co., Ltd. (Uwajima, Ehime) to introduce authentic clay-pot sea bream rice (Tai-meshi), rich golden dashi, and signature crispy karaage to Asia. Franchise & restaurant licensing opportunities across Hong Kong, Taiwan, Thailand & Southeast Asia."
      : opportunity.slug === "celeble-non-alcoholic-sparkling-wine-distribution"
      ? "Balance Co., Ltd. of Toyama, Japan is seeking qualified international importers, distributors and market-development partners for Celeblé, its premium 0.00% sparkling beverage range."
      : opportunity.slug === "nippon-career-ultra-thin-meat-slicing"
      ? "Partner Market Global is seeking supermarkets, meat processors, distributors and restaurant groups interested in Nippon Career Industry's Japanese ultra-thin fresh meat slicing technology."
      : opportunity.slug === "izutsu-yatsuhashi-kyoto"
      ? "Explore international distribution and luxury hospitality opportunities for Izutsu Yatsuhashi, Kyoto's legendary confectionery brand established in 1805 with a 180+ day shelf life."
      : opportunity.slug === "premium-japanese-tsubame-drinkware"
      ? "Explore an international distribution opportunity for premium Japanese drinkware crafted in Tsubame, Niigata, including stainless-steel tumblers, sake cups, gold, blue and specialty collections."
      : opportunity.slug === "sonic-friends-europe-2027"
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

  const eiwaFaqs = [
    {
      question: "What products are included in Eiwa Holdings' export portfolio?",
      answer: "Eiwa Holdings offers six distinct product categories: Japanese citrus oils (Yuzu, Sudachi, Kabosu, Naoshichi, Ginger), Halal-certified Japanese dashi seasoning, Dutch-origin onion concentrate Brix 72 (imported by Eiwa Bussan), Tomin liquid-frozen sushi (platters, packs, unagi bowls), Drinkable Daifuku (ItWokashi modern mochi confectionery in 6 flavours), and premium whole Japanese buckwheat groats (Sobanomi)."
    },
    {
      question: "Are all products in the Eiwa Holdings portfolio Halal-certified?",
      answer: "No. Halal certification varies by product category. Japanese citrus oils and Japanese dashi are described as Halal in supplier catalogue materials, but specific certifying bodies, certificates, and covered SKUs require confirmation during commercial qualification. The Onion Concentrate Brix 72 (Netherlands origin) currently has unconfirmed Halal status. Tomin Frozen Sushi, Drinkable Daifuku, and Buckwheat Groats do not hold Halal certification."
    },
    {
      question: "Where does the Onion Concentrate Brix 72 originate?",
      answer: "The Onion Concentrate Brix 72 is produced in the Netherlands and imported into Japan by Eiwa Bussan Co., Ltd. It is concentrated 12–14:1 using low-temperature vacuum evaporation to preserve fresh allium sweetness and aroma. It is not of Japanese domestic origin."
    },
    {
      question: "What freezing technology is used for Tomin Frozen Sushi, and what cold-chain conditions are required?",
      answer: "The sushi is produced by specialist manufacturer Uota (株式会社魚太) using Tomin liquid freezing technology. By freezing through liquid coolant at approximately -30°C, ice crystals remain microscopic, preventing cellular wall damage and drip loss upon thawing. The product requires strict uninterrupted -18°C or lower cold-chain logistics from Japan to destination."
    },
    {
      question: "Can the Drinkable Daifuku and Sobanomi Buckwheat be certified Kosher or Gluten-Free?",
      answer: "According to supplier catalogue documentation, Drinkable Daifuku does not hold Kosher or Halal certifications. Whole Japanese Buckwheat Groats (Sobanomi) are inherently gluten-free botanical seeds (Polygonaceae), but commercial guarantees against potential agricultural cross-contact with gluten-containing grains (wheat, barley) must be formally confirmed per batch before retail labelling claims."
    },
    {
      question: "What target partner profiles is Eiwa Holdings seeking?",
      answer: "Eiwa Holdings is seeking specialist B2B food ingredient distributors, industrial food flavoring/additive companies, Japanese food & HORECA importers, restaurant groups & central kitchens, international hotel chains, airline catering procurement, and premium supermarket/health food buyers."
    },
    {
      question: "Which international geographic markets are prioritized?",
      answer: "Primary priority markets include Southeast Asia (Indonesia, Malaysia, Singapore, Thailand, Vietnam, Philippines), with secondary evaluation for the Middle East (UAE, Saudi Arabia), North America (USA, Canada), and Europe, subject to import regulatory feasibility and partner qualification."
    },
    {
      question: "How does the commercial introduction and sampling process work through Partner Market Global?",
      answer: "Partner Market Global screens qualified B2B trade inquiries in partnership with Japan Industrial Promotion (JIP). After initial verification of company credentials, target territory, and cold-chain/import capabilities, qualified buyers receive confidential product technical sheets, export pricing discussions, and test sample coordination directly with Eiwa Holdings' international trade team."
    }
  ];

  const kadoyaFaqs = [
    {
      question: "What is Tai-meshi, and how do Uwajima and Matsuyama styles differ?",
      answer: "Tai-meshi is an iconic regional culinary specialty originating from Ehime Prefecture in Shikoku, Japan, centered on Japanese sea bream (tai) and rice. Kadoya specializes in both traditional styles: Uwajima-style Tai-meshi features fresh, sashimi-grade raw sea bream seasoned in a savory egg-yolk and dashi sauce served over hot rice; while Matsuyama-style Tai-meshi features seasoned sea bream cooked together with seasoned rice, traditionally served piping-hot in an earthenware clay pot. For Asian expansion, Kadoya emphasizes the comforting, cooked clay-pot preparation paired with rich golden dashi."
    },
    {
      question: "Why is the 'Karaage Hook Strategy' central to the international concept?",
      answer: "While sea bream is prized as an exquisite fish in Japan, white fish alone can sometimes be perceived as subtle or unfamiliar by casual international diners. Pairing Kadoya's signature crispy Japanese karaage (fried chicken) with sea bream rice overcomes the plainness of white fish, providing an immediately recognizable, juicy favorite that appeals to children, younger demographics, and families. This ensures high-frequency weekday dining alongside premium clay-pot meals."
    },
    {
      question: "How is the signature golden dashi supplied to overseas restaurants?",
      answer: "Kadoya exports its proprietary, highly concentrated golden dashi and essential secret seasonings directly from Japan to maintain authentic flavor profiles and brand consistency. Fresh ingredients such as fish, rice, vegetables, and chicken are sourced locally within the target Asian market, dramatically lowering international supply chain costs and import tariffs while ensuring local freshness."
    },
    {
      question: "Can the menu be localized for Asian consumer preferences?",
      answer: "Yes. Kadoya's international partnership framework explicitly accommodates flavor localization—such as adjusting sweet and savory sauce profiles to suit local palates across Hong Kong, Taiwan, and Thailand—subject to Kadoya's brand guidelines and approval. Regional side dishes and beverage pairings may also be tailored to local dining habits."
    },
    {
      question: "What franchise and licensing formats are available?",
      answer: "Kadoya offers flexible commercial structures depending on operator capabilities: Single-Market Restaurant Licensing, Flagship Franchise Stores, Multi-Unit Development Agreements, and Master Franchise Rights covering an entire country or region. Additionally, menu licensing (supplying proprietary dashi to existing Japanese restaurant groups) is available as an agile pilot entry."
    },
    {
      question: "Which geographic markets are prioritized for international rollout?",
      answer: "Primary priority targets specifically designated in Kadoya's international roadmap include Hong Kong, Taiwan, and Thailand. Secondary evaluation markets include Singapore, Indonesia, Malaysia, the Philippines, and Vietnam. Each market is assessed based on local dining preferences, seafood import logistics, and franchise partner track record."
    },
    {
      question: "What are the store format requirements and expected capital investment?",
      answer: "Store formats range from flexible 10-tsubo (approx. 33 m²) express or food-hall concepts to 50+ tsubo (approx. 165+ m²) flagship full-service dining restaurants. Formats suit shopping malls, high-traffic streetfronts, transit hubs, airports, and hotel restaurants. While the supplier model presents illustrative monthly sales of JPY 7M–10M with a 2–3 year payback, exact kitchen investment, lease terms, and capital expenditure vary by territory and are detailed in confidential franchise documentation."
    },
    {
      question: "Does the concept require hiring expensive Japanese master chefs?",
      answer: "No. A core operational advantage of Kadoya's international licensing model is operational standardization. Utilizing imported dashi concentrate and comprehensive kitchen SOPs, stores can be operated efficiently by 2–3 trained local kitchen staff per shift without relying on expensive expatriate Japanese master chefs."
    },
    {
      question: "How can qualified restaurant operators and franchise groups apply?",
      answer: "Interested multi-unit operators and hospitality groups can submit a qualified B2B inquiry through Partner Market Global. Inquiries are screened in collaboration with Japan Industrial Promotion (JIP). Qualified applicants receive the full confidential franchise disclosure package, unit economics, and direct introductory meetings with Kadoya's executive leadership."
    }
  ];

  const nipponCareerFaqs = [
    {
      question: "Can Nippon Career slicers cut completely fresh and chilled raw meat without pre-freezing?",
      answer: "Yes. Nippon Career's E-Series slicers are specifically engineered to slice fresh and chilled raw meat (typically at -2°C to +4°C) down to approximately 1.5 mm without requiring deep-freezing or surface crusting. This preserves cellular structure, natural juices, and mouthfeel."
    },
    {
      question: "How does the patented band blade replacement compare to conventional rotary disc slicers?",
      answer: "Conventional industrial slicers use heavy circular disc blades that take 30 to 45 minutes to sharpen, balance, and align with skilled mechanics. Nippon Career utilizes an ultra-sharp, thin continuous band blade that can be safely exchanged in approximately one minute by regular floor operators without specialized maintenance tools."
    },
    {
      question: "What is the achievable slice thickness range across E-Series machines?",
      answer: "Depending on the model (EX1-32, EY1-30, EZ1-34) and meat characteristics (temperature, firmness, cut type), slice thickness is continuously adjustable from ultra-thin ~1.5 mm ribbons up to 20 mm or 30 mm commercial portions."
    },
    {
      question: "What raw meat yield efficiency can commercial meat processors achieve?",
      answer: "Industrial operators report usable raw meat yields of approximately 95%. The combination of continuous positive meat feeding, razor-sharp band blade cutting, and minimal end-piece waste significantly reduces scrap compared to traditional commercial slicing equipment."
    },
    {
      question: "What types of meat cuts and proteins can be processed?",
      answer: "E-Series slicers are engineered for boneless chilled beef (brisket, ribeye, striploin, chuck roll), boneless pork (belly, loin, collar), boneless poultry breast, and lamb cuts intended for Shabu-Shabu, Sukiyaki, Korean BBQ, hot pot, supermarket retail trays, and central kitchen prep."
    },
    {
      question: "How do the automated shingling and stacking mechanisms work?",
      answer: "An integrated multi-stage servo-controlled discharge conveyor shingles sliced meat in uniform overlapping layers, stacks portions in counted batches, or folds slices with interleaving sheets (on the EZ1-34 model), preparing cuts directly for food trays without manual touching."
    },
    {
      question: "How is daily sanitation and toolless washdown handled?",
      answer: "The machine is constructed from heavy-gauge food-grade stainless steel with IP65 washdown-rated components. Belts, scrapers, and blade guards disassemble without hand tools for rapid daily chemical sanitation complying with HACCP, USDA, and EU hygiene requirements."
    },
    {
      question: "What are the electrical and facility utility requirements for overseas installations?",
      answer: "Standard models operate on 3-phase industrial power (200V / 220V / 380V / 400V / 480V 50/60Hz configurations available for export). Nippon Career provides facility installation schematics and electrical matching guidelines for foreign industrial plants."
    },
    {
      question: "How are replacement band blades and spare parts supplied internationally?",
      answer: "Consumable band blades and high-wear components are distributed through authorized regional machinery partners and can also be dispatched directly from Nippon Career's factory in Matsuyama, Japan, ensuring ongoing operational continuity."
    },
    {
      question: "What commercial partnership arrangements are available through Partner Market Global?",
      answer: "Partner Market Global facilitates direct commercial introductions between qualified machinery distributors, supermarket chains, and meat packing processors and Nippon Career Industry's executive board in Japan. We coordinate technical reviews, commercial terms, and sample test slicing."
    }
  ];

  const faqSchema = opportunity.slug === "eiwa-japanese-food-ingredients-global-distribution" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: eiwaFaqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  } : opportunity.slug === "kadoya-tai-to-kome-japanese-restaurant-franchise" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: kadoyaFaqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  } : opportunity.slug === "nippon-career-ultra-thin-meat-slicing" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: nipponCareerFaqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  } : null;

  return (
    <>
      <StructuredData data={[offerSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]} />
      <Link href={`/${locale}/opportunities`} className="breadcrumb">{t('back')}</Link>
      <section className="detail-shell">
        <article className="detail-main">
          {opportunity.slug === "eiwa-japanese-food-ingredients-global-distribution" ? (
            <div className="eiwa-detail-hero">
              <picture>
                <source
                  media="(max-width: 640px)"
                  srcSet="/images/opportunities/eiwa/eiwa-hero-mobile.webp"
                  type="image/webp"
                />
                <source
                  srcSet="/images/opportunities/eiwa/eiwa-hero-desktop.webp"
                  type="image/webp"
                />
                <img
                  className="detail-hero-img"
                  src="/images/opportunities/eiwa/eiwa-hero-desktop.webp"
                  alt="Eiwa Holdings Japanese food ingredients, citrus oils, Halal dashi, Dutch onion concentrate Brix 72, Tomin frozen sushi, Drinkable Daifuku, and buckwheat groats"
                />
              </picture>
            </div>
          ) : opportunity.slug === "kadoya-tai-to-kome-japanese-restaurant-franchise" ? (
            <div className="kadoya-detail-hero">
              <picture>
                <source
                  media="(max-width: 640px)"
                  srcSet="/images/opportunities/kadoya/kadoya-hero-mobile.webp"
                  type="image/webp"
                />
                <source
                  srcSet="/images/opportunities/kadoya/kadoya-hero-desktop.webp"
                  type="image/webp"
                />
                <img
                  className="detail-hero-img"
                  src="/images/opportunities/kadoya/kadoya-hero-desktop.webp"
                  alt="Kadoya Tai to Kome authentic clay pot sea bream rice, golden dashi, and signature karaage Japanese restaurant franchise"
                />
              </picture>
            </div>
          ) : opportunity.slug === "celeble-non-alcoholic-sparkling-wine-distribution" ? (
            <div className="celeble-detail-hero">
              <picture>
                <source
                  srcSet="/images/opportunities/celeble/celeble-featured-opportunity-home.webp"
                  type="image/webp"
                />
                <img
                  className="detail-hero-img"
                  src="/images/opportunities/celeble/celeble-featured-opportunity-home.webp"
                  alt="Celeblé Japanese premium 0.00% non-alcoholic sparkling beverage bottle and champagne flute with gourmet food pairings"
                />
              </picture>
            </div>
          ) : opportunity.slug === "izutsu-yatsuhashi-kyoto" ? (
            <div className="izutsu-detail-hero">
              <picture>
                <source
                  srcSet="/images/opportunities/izutsu-yatsuhashi/izutsu-opp-hero-mobile.webp"
                  type="image/webp"
                />
                <source
                  srcSet="/images/opportunities/izutsu-yatsuhashi/izutsu-opp-hero-tablet.webp"
                  type="image/webp"
                />
                <source
                  srcSet="/images/opportunities/izutsu-yatsuhashi/izutsu-opp-hero.webp"
                  type="image/webp"
                />
                <img
                  className="detail-hero-img"
                  src="/images/opportunities/izutsu-yatsuhashi/izutsu-opp-hero.jpg"
                  alt="Izutsu Yatsuhashi authentic traditional Kyoto baked confectionery and Uji Matcha"
                />
              </picture>
            </div>
          ) : opportunity.slug === "nippon-career-ultra-thin-meat-slicing" ? (
            <div className="nippon-detail-hero">
              <picture>
                <source
                  media="(max-width: 640px)"
                  srcSet="/images/opportunities/nippon-career/nippon-career-hero-800.webp"
                  type="image/webp"
                />
                <source
                  media="(max-width: 1024px)"
                  srcSet="/images/opportunities/nippon-career/nippon-career-hero-1200.webp"
                  type="image/webp"
                />
                <source
                  srcSet="/images/opportunities/nippon-career-ultra-thin-meat-slicing-hero.webp"
                  type="image/webp"
                />
                <img
                  className="detail-hero-img"
                  src="/images/opportunities/nippon-career-ultra-thin-meat-slicing-hero.jpg"
                  alt="Nippon Career Industry Japanese industrial ultra-thin fresh meat slicing line E-Series"
                />
              </picture>
            </div>
          ) : (
            <img className="detail-hero-img" src={opportunity.heroImage} alt={opportunity.imageAlt || opportunity.title} />
          )}
          <div className="detail-content">
            <div className="detail-title-row">
              <div>
                <div className="badge-stack" style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", marginBottom: "12px" }}>
                  {isJip && <JIPJapanBadge variant="detail" showLabel={true} />}
                  {opportunity.verificationBadges.map((badge) => <span className="top-badge" key={badge}>✓ {badge}</span>)}
                </div>
                <h1>{opportunity.slug === "eiwa-japanese-food-ingredients-global-distribution" ? "Discover Japan's Finest Food Ingredients. Bring Them to Your Market." : opportunity.slug === "kadoya-tai-to-kome-japanese-restaurant-franchise" ? "Bring Authentic Japanese Tai-meshi & Karaage to Asia — Kadoya Franchise & Licensing" : opportunity.slug === "celeble-non-alcoholic-sparkling-wine-distribution" ? "Japanese Premium 0.00% Sparkling Beverage Seeking Global Distribution Partners" : opportunity.slug === "izutsu-yatsuhashi-kyoto" ? "Izutsu Yatsuhashi — A Taste of Kyoto Since 1805" : opportunity.slug === "nippon-career-ultra-thin-meat-slicing" ? "Nippon Career Industry — Industrial Fresh Meat Slicers & Processing Systems" : opportunity.title}</h1>
                <p>{opportunity.slug === "eiwa-japanese-food-ingredients-global-distribution" ? "Eiwa Holdings and Eiwa Bussan (Tokyo) are exploring international distribution and strategic commercial partnerships for a distinctive portfolio of food ingredients: Japanese citrus oils, Halal dashi, Dutch onion concentrate Brix 72, Tomin liquid-frozen sushi, Drinkable Daifuku, and buckwheat groats." : opportunity.slug === "kadoya-tai-to-kome-japanese-restaurant-franchise" ? "Partner with Kadoya Co., Ltd. (est. 1962, Ehime Prefecture) to introduce authentic clay-pot sea bream rice, rich golden dashi, and signature karaage to Hong Kong, Taiwan, Thailand, and key Asian dining markets." : opportunity.slug === "celeble-non-alcoholic-sparkling-wine-distribution" ? "Balance Co., Ltd. of Toyama, Japan is seeking qualified international importers, distributors and market-development partners for Celeblé, its premium 0.00% sparkling beverage range." : opportunity.slug === "izutsu-yatsuhashi-kyoto" ? "A premium Japanese confectionery opportunity for luxury hotels, high-end restaurants, premium cafés, gifting partners and distributors in the United States and Middle East." : opportunity.slug === "nippon-career-ultra-thin-meat-slicing" ? "Direct B2B partner introduction for qualified supermarket groups, meat processors, restaurant chains, and industrial food machinery distributors seeking Japan's leading ultra-thin fresh meat slicing technology." : opportunity.summary}</p>
              </div>
              <div className="quick-panel">
                <strong>{t('interested')}</strong>
                <p>Send a qualified inquiry to receive more information.</p>
                <Link className="btn btn-primary full" href={`/${locale}/contact?oppTitle=${encodeURIComponent(opportunity.title)}&oppSlug=${opportunity.slug}&source=${isJip ? "JIP Japan" : "General"}`}>{t('sendInquiry')}</Link>
                {opportunity.slug === "eiwa-japanese-food-ingredients-global-distribution" ? (
                  <>
                    <a className="btn btn-primary full" href="#inquire">Request Product Catalog &amp; Terms</a>
                    <a className="btn btn-line full" href="#eiwa-products" style={{ marginTop: 8 }}>View 6 Product Categories</a>
                    <a className="btn btn-line full" href="/downloads/eiwa-holdings-export-product-catalog.pdf" download style={{ marginTop: 8 }}>Download Export Catalog (PDF)</a>
                  </>
                ) : opportunity.slug === "kadoya-tai-to-kome-japanese-restaurant-franchise" ? (
                  <>
                    <a className="btn btn-primary full" href="#inquire">Request Franchise Information</a>
                    <a className="btn btn-line full" href="#kadoya-concept" style={{ marginTop: 8 }}>View Concept &amp; Menu</a>
                    <a className="btn btn-line full" href="/downloads/kadoya-tai-to-kome-franchise-presentation.pdf" download style={{ marginTop: 8 }}>Download FC Presentation (PDF)</a>
                  </>
                ) : opportunity.slug === "celeble-non-alcoholic-sparkling-wine-distribution" ? (
                  <>
                    <a className="btn btn-primary full" href="#inquire">Request Distribution Terms</a>
                    <a className="btn btn-line full" href="#lineup" style={{ marginTop: 8 }}>View 4-SKU Lineup</a>
                    <a className="btn btn-line full" href="#market" style={{ marginTop: 8 }}>Restaurant &amp; Market Data</a>
                  </>
                ) : opportunity.slug === "izutsu-yatsuhashi-kyoto" ? (
                  <>
                    <a className="btn btn-primary full" href="#inquire">Request Partnership Information</a>
                    <a className="btn btn-line full" href="#products" style={{ marginTop: 8 }}>View Products</a>
                  </>
                ) : opportunity.slug === "nippon-career-ultra-thin-meat-slicing" ? (
                  <>
                    <a className="btn btn-primary full" href="#inquire">Request Commercial Introduction</a>
                    <a className="btn btn-line full" href="#models" style={{ marginTop: 8 }}>View E-Series Models</a>
                    <a className="btn btn-line full" href="#downloads" style={{ marginTop: 8 }}>Download Catalogues &amp; PDFs</a>
                  </>
                ) : (
                  <a className="btn btn-line full" href="#documents" style={{ marginTop: 8 }}>{t('saveOpportunity')}</a>
                )}
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

            {/* Custom Rich Sections for Izutsu Yatsuhashi Kyoto Confectionery */}
            {opportunity.slug === "izutsu-yatsuhashi-kyoto" && (
              <>
                {/* 1. TOP PROMPT BANNER */}
                <div className="izutsu-prompt-banner">
                  <div>
                    <span className="izutsu-prompt-text">Interested in representing Izutsu Yatsuhashi in your market?</span>
                    <p style={{ margin: "4px 0 0 0", fontSize: "0.88rem", opacity: 0.9 }}>
                      Connect with PartnerMarketGlobal for international export agreements, luxury hotel amenity supply, and exclusive distributor partnerships.
                    </p>
                  </div>
                  <a href="#inquire" className="izutsu-prompt-btn">Request Partnership Information</a>
                </div>

                {/* 2. AUTHENTIC HERITAGE & STORYTELLING */}
                <div className="content-card" id="heritage" style={{ marginTop: 24 }}>
                  <div className="izutsu-authenticity-badge">
                    <span>🏛️</span>
                    <span>AUTHENTIC HERITAGE DOCUMENTATION • EST. 1805 (BUNKA 2)</span>
                  </div>
                  <h2>220 Years of Kyoto Heritage: What is Yatsuhashi?</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "start", marginTop: 16 }}>
                    <div>
                      <p style={{ lineHeight: 1.65, marginBottom: 14, color: "#334155" }}>
                        Founded in <strong>1805 (Bunka 2 of the Edo Period)</strong> in Kyoto&apos;s celebrated Gion district, <strong>Izutsu Yatsuhashi Honpo</strong> is one of Japan&apos;s oldest and most revered confectionery houses.
                      </p>
                      <p style={{ lineHeight: 1.65, marginBottom: 14, color: "#334155" }}>
                        The name and shape trace back to <strong>Yatsuhashi Kengyo</strong>, the legendary musician recognized as the father of modern Japanese koto music. Following his death in Kyoto, local confectioners created a hard-baked rice wafer curved gracefully in the arch of a traditional <em>koto</em> (Japanese harp) in his honor.
                      </p>
                      <p style={{ lineHeight: 1.65, marginBottom: 14, color: "#334155" }}>
                        Guided by the founding family motto <strong>&quot;利益より永続&quot; (Continuity and Trust Over Short-Term Profit)</strong>, Izutsu has preserved this orthodox recipe for over two centuries while expanding to approximately 340 artisans and staff, operating its historic flagship and the prestigious &quot;Kitaza&quot; cultural building in Gion.
                      </p>
                    </div>
                    <div>
                      <img
                        src="/images/opportunities/izutsu-yatsuhashi/authentic-baked-yatsuhashi-banner.webp"
                        alt="Authentic Kyoto Izutsu Yatsuhashi traditional baked confectionery on dark lacquer plate"
                        style={{ width: "100%", height: "auto", borderRadius: 12, objectFit: "cover", border: "1px solid #e2e8f0" }}
                        loading="lazy"
                      />
                      <p style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 6, fontStyle: "italic", textAlign: "center" }}>
                        Authentic Izutsu Yatsuhashi: Hard-baked cinnamon wafers curved in the silhouette of a Japanese koto
                      </p>
                    </div>
                  </div>

                  <div className="tsubame-stats-row" style={{ marginTop: 24 }}>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val" style={{ color: "#991b1b" }}>1805</span>
                      <span className="tsubame-stat-label">Founded (Bunka 2)</span>
                    </div>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val" style={{ color: "#991b1b" }}>220+ Years</span>
                      <span className="tsubame-stat-label">Kyoto Artisan Heritage</span>
                    </div>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val" style={{ color: "#991b1b" }}>180+ Days</span>
                      <span className="tsubame-stat-label">Guaranteed Ambient Shelf Life</span>
                    </div>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val" style={{ color: "#991b1b" }}>Gion, Kyoto</span>
                      <span className="tsubame-stat-label">Flagship &amp; Historic Kitaza</span>
                    </div>
                  </div>

                  <div className="izutsu-heritage-grid">
                    <div className="izutsu-heritage-card">
                      <img
                        src="/images/opportunities/izutsu-yatsuhashi/authentic-kyoto-heritage-illustration.webp"
                        alt="Historical Edo period woodblock illustration of Izutsu tea shop in Gion Kyoto 1805"
                      />
                      <div className="izutsu-heritage-caption">
                        <strong>Edo-Period Archival Illustration</strong>
                        Original woodblock depicting the historic Izutsu tea shop (&quot;祇園町北側 井筒茶店&quot;) welcoming travelers and pilgrims in Gion, Kyoto.
                      </div>
                    </div>
                    <div className="izutsu-heritage-card">
                      <img
                        src="/images/opportunities/izutsu-yatsuhashi/authentic-calligraphy-motto.webp"
                        alt="Izutsu Yatsuhashi founding philosophy calligraphy motto"
                      />
                      <div className="izutsu-heritage-caption">
                        <strong>The Founding House Philosophy</strong>
                        Original calligraphy scroll reading <em>&quot;利益より永続&quot;</em> — prioritizing enduring quality, trust, and multi-generational relationships over short-term gain.
                      </div>
                    </div>
                    <div className="izutsu-heritage-card">
                      <img
                        src="/images/opportunities/izutsu-yatsuhashi/authentic-kyoto-gion-headquarters.webp"
                        alt="Izutsu Yatsuhashi Honpo Gion headquarters building and Kitaza in Kyoto"
                      />
                      <div className="izutsu-heritage-caption">
                        <strong>Gion Flagship &amp; Historic Kitaza</strong>
                        Headquarters in the heart of Gion, Kyoto, housing the traditional confectionery salon and the exclusive Kitaza luxury venue for VIP tastings.
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. CORE AUTHENTIC PRODUCT LINEUP */}
                <div className="content-card" id="products" style={{ marginTop: 24 }}>
                  <div className="izutsu-authenticity-badge">
                    <span>✨</span>
                    <span>CORE AUTHENTIC PRODUCT PHOTOGRAPHY • SUPPLIER DOCUMENTATION</span>
                  </div>
                  <h2>Key Commercial Product Lineup</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Izutsu Yatsuhashi offers two core culinary profiles paired with flexible packaging formats engineered for luxury hospitality, retail shelves, and international freight stability:
                  </p>

                  <div className="izutsu-products-grid">
                    {/* Product Card 1: Kyoto Specialty Izutsu Yatsuhashi */}
                    <div className="izutsu-product-card">
                      <div className="izutsu-product-img-wrap">
                        <span className="izutsu-product-badge">Flagship Classic</span>
                        <img
                          src="/images/opportunities/izutsu-yatsuhashi/authentic-traditional-gift-box.webp"
                          alt="Authentic Izutsu Yatsuhashi traditional packaged gift box with koto illustration and individually wrapped wafers"
                          className="izutsu-product-img-contain"
                        />
                      </div>
                      <div className="izutsu-product-body">
                        <h3>Kyoto Specialty: Izutsu Yatsuhashi</h3>
                        <div className="izutsu-product-headline">Traditional Hard-Baked Cinnamon Wafers</div>
                        <p>
                          The timeless orthodox specialty of Kyoto. Thin, crisp wafers delicately curved into the shape of a Japanese koto. Formulated with carefully selected rice flour, sugar, and natural <em>nikki</em> (cinnamon), refined to deliver an aromatic, light, and wonderfully crunchy bite. Made completely without additives.
                        </p>
                        <div className="izutsu-product-specs">
                          <strong>Shelf Life:</strong> 180+ days at room temperature • <strong>Additives:</strong> Zero • <strong>Packaging:</strong> Traditional presentation box with sealed twin-pack inner sleeves
                        </div>
                        <div className="izutsu-product-apps">
                          <strong>Key Channels:</strong> Luxury hotel turndown amenities, fine dining dessert pairings, executive corporate gifting, international specialty retailers.
                        </div>
                      </div>
                    </div>

                    {/* Product Card 2: Uji Matcha Yatsuhashi */}
                    <div className="izutsu-product-card">
                      <div className="izutsu-product-img-wrap">
                        <span className="izutsu-product-badge" style={{ background: "#166534" }}>Premium Collaboration</span>
                        <img
                          src="/images/opportunities/izutsu-yatsuhashi/authentic-uji-matcha-yatsuhashi.webp"
                          alt="Authentic Uji Matcha Yatsuhashi confectionery on dark textured Japanese ceramic platter"
                          className="izutsu-product-img"
                        />
                      </div>
                      <div className="izutsu-product-body">
                        <h3>Uji Matcha Yatsuhashi</h3>
                        <div className="izutsu-product-headline" style={{ color: "#166534" }}>Rich First-Harvest Uji Matcha Infusion</div>
                        <p>
                          Developed in collaboration with world-renowned Uji matcha tea masters. Generous layers of authentic stone-ground Uji matcha are dusted onto traditional baked Yatsuhashi, creating a sophisticated equilibrium between the warm sweetness of cinnamon and the refined, complex umami-bitterness of pure green tea.
                        </p>
                        <div className="izutsu-product-specs" style={{ background: "#f0fdf4", borderColor: "#bbf7d0", color: "#14532d" }}>
                          <strong>Ingredients:</strong> Genuine Uji Matcha • <strong>Profile:</strong> Umami &amp; aromatic spice • <strong>Shelf Life:</strong> 180+ days guaranteed
                        </div>
                        <div className="izutsu-product-apps">
                          <strong>Key Channels:</strong> Specialty matcha salons, luxury afternoon tea services, hotel executive lounges, Michelin-starred dessert garnishes.
                        </div>
                      </div>
                    </div>

                    {/* Product Card 3: Modern Stand-Up Resealable Pouch */}
                    <div className="izutsu-product-card">
                      <div className="izutsu-product-img-wrap">
                        <span className="izutsu-product-badge" style={{ background: "#0f766e" }}>Retail &amp; Cafe Format</span>
                        <img
                          src="/images/opportunities/izutsu-yatsuhashi/authentic-uji-matcha-pouch.webp"
                          alt="Authentic Izutsu Uji Matcha stand-up resealable barrier pouch packaging"
                          className="izutsu-product-img-contain"
                        />
                      </div>
                      <div className="izutsu-product-body">
                        <h3>Modern Resealable Stand-Up Pouch</h3>
                        <div className="izutsu-product-headline" style={{ color: "#0f766e" }}>Designed for Contemporary Retail &amp; Cafe Culture</div>
                        <p>
                          A versatile, shelf-ready format combining authentic Kyoto aesthetics with modern retail practicality. The metallized moisture-barrier foil with a resealable zipper maintains peak crispness, making it perfect for premium supermarket shelves, specialty cafes, grab-and-go luxury snacking, and boutique concept stores.
                        </p>
                        <div className="izutsu-product-specs" style={{ background: "#f0fdfa", borderColor: "#99f6e4", color: "#115e59" }}>
                          <strong>Format:</strong> High-barrier zip pouch • <strong>Merchandising:</strong> Peg or shelf display • <strong>Convenience:</strong> Resealable single-consumer portion
                        </div>
                        <div className="izutsu-product-apps">
                          <strong>Key Channels:</strong> Specialty coffee shops, boutique grocers, airport duty-free travel retail, luxury minibar offerings.
                        </div>
                      </div>
                    </div>

                    {/* Product Card 4: Authentic Ceramic Presentation Plate */}
                    <div className="izutsu-product-card">
                      <div className="izutsu-product-img-wrap">
                        <span className="izutsu-product-badge" style={{ background: "#4338ca" }}>Hospitality Presentation</span>
                        <img
                          src="/images/opportunities/izutsu-yatsuhashi/authentic-baked-yatsuhashi-plate.webp"
                          alt="Authentic Izutsu Yatsuhashi curved wafers served on dark lacquer ceramic plate"
                          className="izutsu-product-img-contain"
                        />
                      </div>
                      <div className="izutsu-product-body">
                        <h3>Hospitality &amp; Foodservice Service</h3>
                        <div className="izutsu-product-headline" style={{ color: "#4338ca" }}>The Perfect Companion for Coffee, Tea &amp; Cocktails</div>
                        <p>
                          In luxury hospitality settings, baked Yatsuhashi provides an elegant, sculptural garnish that captivates international guests. The arched shape nests comfortably beside espresso cups, ceremonial matcha bowls, or artisanal cocktails, providing a distinctive crunch and conversation piece for discerning patrons.
                        </p>
                        <div className="izutsu-product-specs" style={{ background: "#eef2ff", borderColor: "#c7d2fe", color: "#3730a3" }}>
                          <strong>Serving:</strong> Ready-to-serve ambient confection • <strong>Texture:</strong> Ultra-crisp crunch • <strong>Story:</strong> 220 years of Kyoto hospitality
                        </div>
                        <div className="izutsu-product-apps">
                          <strong>Key Channels:</strong> Five-star hotel bars, boutique coffee roasters, private member clubs, first-class airline dining.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. THREE STRATEGIC GLOBAL ADVANTAGES */}
                <div className="content-card" id="advantages" style={{ marginTop: 24 }}>
                  <h2>Three Strategic Advantages for Global Partners</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Why Izutsu Yatsuhashi delivers an exceptional commercial proposition for international importers and distributors:
                  </p>

                  <div className="izutsu-advantages-grid">
                    <div className="izutsu-advantage-box">
                      <div className="izutsu-advantage-num">01</div>
                      <h3>Global Standard 180-Day Guarantee</h3>
                      <p>
                        Unlike soft raw sweets (<em>nama-yatsuhashi</em>) which expire in just 7 to 10 days, Izutsu&apos;s traditional hard-baking method ensures a minimum <strong>180-day quality guarantee without chemical additives</strong>. This protects distributors against supply chain delays and guarantees fresh retail inventory after ocean freight.
                      </p>
                    </div>

                    <div className="izutsu-advantage-box">
                      <div className="izutsu-advantage-num">02</div>
                      <h3>Globally Popular Uji Matcha Collaboration</h3>
                      <p>
                        Authentic Japanese matcha continues to experience explosive worldwide demand. Izutsu&apos;s co-developed Uji Matcha collection unlocks high-margin menus and retail placement through direct cross-proposals pairing with green tea, artisanal coffee, and gourmet desserts.
                      </p>
                    </div>

                    <div className="izutsu-advantage-box">
                      <div className="izutsu-advantage-num">03</div>
                      <h3>Multi-Faceted Packaging Strategy</h3>
                      <p>
                        A balanced dual-format approach: traditional &quot;Kabuki&quot; presentation boxes commanding high gift price points for luxury hotels and VIP gifting, alongside sophisticated resealable stand-up pouches tailored for modern cafe counters and high-turnover retail shelves.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. PROVEN INTERNATIONAL APPEAL & WESTERN TASTE RESONANCE */}
                <div className="izutsu-testimonials-panel" id="international-proof">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <span style={{ fontSize: "0.76rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 800, color: "#ffd782" }}>
                        INTERNATIONAL CONSUMER RESEARCH
                      </span>
                      <h3 style={{ margin: "4px 0 0 0", fontSize: "1.4rem", color: "#ffffff" }}>
                        Ranked #1 in Japanese Souvenirs Chosen by Foreign Visitors
                      </h3>
                    </div>
                    <span style={{ background: "linear-gradient(135deg, #d4af37, #f59e0b)", color: "#1c080b", fontWeight: 800, fontSize: "0.85rem", padding: "6px 14px", borderRadius: 999 }}>
                      #1 OVERSEAS CHOICE
                    </span>
                  </div>

                  <p style={{ fontSize: "0.92rem", color: "#e2e8f0", marginTop: 12, lineHeight: 1.6 }}>
                    In extensive consumer research and broadcast evaluations (&quot;Foreigners&apos; Souvenir Election&quot;), Western travelers decisively favored <strong>baked Yatsuhashi (Yaki-Yatsuhashi)</strong> over soft raw varieties, captivated by the crispy bite and natural cinnamon warmth:
                  </p>

                  <div className="izutsu-quotes-grid">
                    <div className="izutsu-quote-card">
                      <blockquote>&ldquo;This cinnamon cookie is amazingly delicious!&rdquo;</blockquote>
                      <cite>— International Visitor Evaluation</cite>
                    </div>
                    <div className="izutsu-quote-card">
                      <blockquote>&ldquo;The crispy, crunchy texture is absolutely delightful.&rdquo;</blockquote>
                      <cite>— Western Culinary Panelist</cite>
                    </div>
                    <div className="izutsu-quote-card">
                      <blockquote>&ldquo;With its familiar cinnamon flavor, it pairs perfectly with morning coffee.&rdquo;</blockquote>
                      <cite>— Specialty Coffee Buyer</cite>
                    </div>
                  </div>

                  <div style={{ marginTop: 24, padding: "18px 20px", background: "rgba(255, 255, 255, 0.05)", borderRadius: 10, border: "1px solid rgba(255, 255, 255, 0.12)" }}>
                    <h4 style={{ margin: "0 0 8px 0", fontSize: "1rem", color: "#ffd782" }}>Export Readiness &amp; MAFF Institutional Alignment</h4>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "#cbd5e1", lineHeight: 1.6 }}>
                      Izutsu Yatsuhashi strictly adheres to global food safety standards and clears stringent agricultural pesticide residue criteria worldwide (including Taiwan, the United States, and the European Union). Export documentation, certificate of origin, and phytosanitary declarations are supported in close collaboration with Japan&apos;s Ministry of Agriculture, Forestry and Fisheries (MAFF).
                    </p>
                  </div>
                </div>

                {/* 6. TARGET CHANNELS & COMMERCIAL PROPOSITION */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <h2>Target Commercial Partnership Channels</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    PartnerMarketGlobal is actively introducing Izutsu Yatsuhashi across qualified B2B channels in North America, the Middle East, and Europe:
                  </p>

                  <div className="tsubame-partners-grid">
                    <div className="tsubame-partner-chip">
                      <span style={{ fontSize: "1.3rem" }}>🏨</span>
                      <div>
                        <strong>Luxury Hotels &amp; Resorts</strong>
                        <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Turndown amenities, lounge tea service &amp; VIP suites</span>
                      </div>
                    </div>
                    <div className="tsubame-partner-chip">
                      <span style={{ fontSize: "1.3rem" }}>☕</span>
                      <div>
                        <strong>Specialty Coffee &amp; Cafés</strong>
                        <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Artisanal coffee companion &amp; modern pouch sales</span>
                      </div>
                    </div>
                    <div className="tsubame-partner-chip">
                      <span style={{ fontSize: "1.3rem" }}>🏬</span>
                      <div>
                        <strong>Premium Department Stores</strong>
                        <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Gourmet food halls, Japanese specialty sections</span>
                      </div>
                    </div>
                    <div className="tsubame-partner-chip">
                      <span style={{ fontSize: "1.3rem" }}>✈️</span>
                      <div>
                        <strong>Airlines &amp; Airport Duty-Free</strong>
                        <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>First/Business class dining &amp; travel retail</span>
                      </div>
                    </div>
                    <div className="tsubame-partner-chip">
                      <span style={{ fontSize: "1.3rem" }}>🎁</span>
                      <div>
                        <strong>Corporate Gifting Agencies</strong>
                        <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Prestige Japanese confectionery presentation boxes</span>
                      </div>
                    </div>
                    <div className="tsubame-partner-chip">
                      <span style={{ fontSize: "1.3rem" }}>🚢</span>
                      <div>
                        <strong>National Food Importers</strong>
                        <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Exclusive and regional distribution rights</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Custom Rich Sections for Premium Japanese Tsubame Drinkware */}
            {opportunity.slug === "premium-japanese-tsubame-drinkware" && (
              <>
                {/* 1. TOP PROMPT BANNER */}
                <div className="tsubame-prompt-banner">
                  <div>
                    <span className="tsubame-prompt-text">Interested in representing these products in your market?</span>
                    <p style={{ margin: "4px 0 0 0", fontSize: "0.88rem", opacity: 0.9 }}>
                      Connect with PartnerMarketGlobal for international distribution, wholesale lines, and OEM personalization.
                    </p>
                  </div>
                  <a href="#inquiry" className="tsubame-prompt-btn">Request Partnership Information</a>
                </div>

                {/* 2. STORYTELLING: MADE IN TSUBAME, JAPAN */}
                <div className="content-card" id="why-tsubame" style={{ marginTop: 24 }}>
                  <h2>Made in Tsubame, Japan</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "center", marginTop: 16 }}>
                    <div>
                      <p style={{ lineHeight: 1.6, marginBottom: 14, color: "#334155" }}>
                        Located in Niigata Prefecture, <strong>Tsubame City</strong> is globally recognized as Japan&apos;s premier center for precision metalworking. The city&apos;s metalworking heritage traces back approximately <strong>400 years</strong> to the early Edo Period, beginning with traditional hand-forged Japanese nails (<em>wakugi</em>) and expanding through hammered copperware, files, and modern precision metalware.
                      </p>
                      <p style={{ lineHeight: 1.6, marginBottom: 14, color: "#334155" }}>
                        Today, Tsubame is Japan&apos;s No. 1 supplier of Western-style metal tableware. Combining time-honored artisan techniques with modern metallurgical engineering, Tsubame manufacturers produce drinking vessels cherished for their thermal efficiency, tactile comfort, and refined beauty. Products are officially certified with the prestigious <strong>&quot;Made in TSUBAME&quot;</strong> quality mark.
                      </p>
                    </div>
                    <div>
                      <img
                        src="/images/opportunities/tsubame/tsubame-craftsmanship.webp"
                        alt="Tsubame master artisan metalworking and finishing"
                        style={{ width: "100%", height: "auto", borderRadius: 12, objectFit: "cover" }}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="tsubame-stats-row">
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val">400 Years</span>
                      <span className="tsubame-stat-label">Metalworking Heritage</span>
                    </div>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val">Made in Japan</span>
                      <span className="tsubame-stat-label">Tsubame, Niigata Prefecture</span>
                    </div>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val">Premium Finishes</span>
                      <span className="tsubame-stat-label">Steel • 24K Gold • Copper • Ginkobi Blue</span>
                    </div>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val">OEM Available</span>
                      <span className="tsubame-stat-label">Laser Engraving &amp; Personalization</span>
                    </div>
                  </div>
                </div>

                {/* 3. PRODUCT COLLECTIONS */}
                <div className="content-card" id="collections" style={{ marginTop: 24 }}>
                  <h2>Product Collections</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Explore the six distinctive product families manufactured in Tsubame, combining traditional artisan finishes with modern functional elegance:
                  </p>

                  <div className="tsubame-collections-grid">
                    {/* Collection 1: Tsubame Artisan Tumblers */}
                    <div className="tsubame-collection-card">
                      <div className="tsubame-collection-img-wrap">
                        <img
                          src="/images/opportunities/tsubame/collection-tsubame-tumbler.webp"
                          alt="Tsubame Artisan Tumblers stainless steel"
                          className="tsubame-collection-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="tsubame-collection-body">
                        <span className="tsubame-collection-num">Collection 1</span>
                        <h3>Tsubame Artisan Tumblers</h3>
                        <div className="tsubame-collection-headline">Double-Walled &amp; Single-Walled Precision Drinkware</div>
                        <p>
                          A broad collection of Japanese-made tumblers and drinking vessels featuring stainless steel, traditional finishing techniques and premium presentation. Multiple vessel formats and finishes make the collection suitable for gifting, home use, restaurants, bars and specialist retail.
                        </p>
                        <div className="tsubame-collection-specs">
                          <strong>Specifications:</strong> 18-8 Stainless Steel • Double-wall &amp; single-wall construction • Straight &amp; lock tumbler formats • Traditional Yamanaka Urushi lacquer collaboration
                        </div>
                      </div>
                    </div>

                    {/* Collection 2: Ginkobi Ao */}
                    <div className="tsubame-collection-card">
                      <div className="tsubame-collection-img-wrap">
                        <img
                          src="/images/opportunities/tsubame/collection-ginkobi-ao.webp"
                          alt="Ginkobi Ao antique silver blue tumbler collection"
                          className="tsubame-collection-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="tsubame-collection-body">
                        <span className="tsubame-collection-num">Collection 2</span>
                        <h3>Ginkobi Ao</h3>
                        <div className="tsubame-collection-headline">The Blue of Japanese Craftsmanship</div>
                        <p>
                          A striking metallic-blue collection made using 18-8 stainless steel with an antique silver-plated finish. Its distinctive blue appearance gives the range an immediately recognizable luxury identity.
                        </p>
                        <div className="tsubame-collection-specs">
                          <strong>Lineup:</strong> Guisake Cup (100ml), Small Tumbler (300ml), Large Tumbler (440ml), Cheers Tumbler (380ml), Double-Wall Ice Pail • Paulownia wooden gift boxes
                        </div>
                      </div>
                    </div>

                    {/* Collection 3: The Luxury of Gold */}
                    <div className="tsubame-collection-card">
                      <div className="tsubame-collection-img-wrap">
                        <img
                          src="/images/opportunities/tsubame/collection-gold-series.webp"
                          alt="The Luxury of Gold stainless steel drinkware with 24K gold plated interior"
                          className="tsubame-collection-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="tsubame-collection-body">
                        <span className="tsubame-collection-num">Collection 3</span>
                        <h3>The Luxury of Gold</h3>
                        <div className="tsubame-collection-headline">24K Gold Plated Interior Warmth</div>
                        <p>
                          Premium stainless-steel drinking vessels featuring luxurious gold-finished interiors. The collection combines understated silver exteriors with warm gold interiors and lends itself particularly well to premium gifting, hospitality and specialist retail.
                        </p>
                        <div className="tsubame-collection-specs">
                          <strong>Lineup:</strong> Guinomi sake cups (100ml), Small Tumbler (300ml), Large Tumbler (440ml), Tears Tumbler (380ml) • Inner surface 24K Gold Plating • Wooden gift packaging
                        </div>
                      </div>
                    </div>

                    {/* Collection 4: Mt. Fuji Sake Cups */}
                    <div className="tsubame-collection-card">
                      <div className="tsubame-collection-img-wrap">
                        <img
                          src="/images/opportunities/tsubame/collection-mt-fuji.webp"
                          alt="Mt Fuji stainless steel sake cup with sandblasted summit"
                          className="tsubame-collection-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="tsubame-collection-body">
                        <span className="tsubame-collection-num">Collection 4</span>
                        <h3>Mt. Fuji Sake Cups</h3>
                        <div className="tsubame-collection-headline">Iconic Silhouette with Sandblasted Summit</div>
                        <p>
                          Distinctively Japanese sake cups inspired by Mount Fuji. The featured stainless-steel cups combine polished metal surfaces with an iconic silhouette, providing an excellent premium souvenir, gift and Japanese lifestyle proposition.
                        </p>
                        <div className="tsubame-collection-specs">
                          <strong>Models:</strong> FM-102 (Inner 24K Gold Plated, 75ml) &amp; FM-100 (Polished Stainless Steel, 75ml) • Sandblasted snowy summit • Individual gift presentation
                        </div>
                      </div>
                    </div>

                    {/* Collection 5: Copper & Specialty Finishes */}
                    <div className="tsubame-collection-card">
                      <div className="tsubame-collection-img-wrap">
                        <img
                          src="/images/opportunities/tsubame/collection-copper-specialty.webp"
                          alt="Kagayaki Pure Copper Beer Tumbler and Sakura collection"
                          className="tsubame-collection-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="tsubame-collection-body">
                        <span className="tsubame-collection-num">Collection 5</span>
                        <h3>Copper &amp; Specialty Finishes</h3>
                        <div className="tsubame-collection-headline">Kagayaki Pure Copper &amp; Sakura Motifs</div>
                        <p>
                          Additional ranges extend the collection into copper and specialty metallic finishes, providing distributors and retailers with a broader premium assortment and attractive gift-set opportunities.
                        </p>
                        <div className="tsubame-collection-specs">
                          <strong>Lineup:</strong> Pure Copper beer tumblers &amp; sake ware (inner tin plating) • Gold, Silver &amp; Antique Silver finishes • 2pc &amp; 3pc gift sets in paulownia wooden boxes • Satin Sakura collection
                        </div>
                      </div>
                    </div>

                    {/* Collection 6: OEM & Personalized Gifts */}
                    <div className="tsubame-collection-card">
                      <div className="tsubame-collection-img-wrap">
                        <img
                          src="/images/opportunities/tsubame/collection-oem.webp"
                          alt="OEM name engraving and personalization"
                          className="tsubame-collection-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="tsubame-collection-body">
                        <span className="tsubame-collection-num">Collection 6</span>
                        <h3>OEM &amp; Personalized Gifts</h3>
                        <div className="tsubame-collection-headline">Create Your Own Premium Japanese Gift</div>
                        <p>
                          The manufacturer also offers OEM opportunities for commemorative products and original goods, including personalization by name engraving on appropriate materials. Laser engraving is recommended for most metals, while silkscreen printing is utilized for lacquered finishes. Specific projects require confirmation with the manufacturer.
                        </p>
                        <div className="tsubame-collection-specs">
                          <strong>Capability:</strong> Laser engraving on stainless steel &amp; copper • Silkscreen printing for lacquered finishes • Corporate branding &amp; bespoke gift editions
                        </div>
                        <a href="#inquiry" className="tsubame-oem-cta">Discuss an OEM Project →</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. TARGET PARTNERS ("Who Should Explore This Opportunity?") */}
                <div className="content-card" id="target-partners" style={{ marginTop: 24 }}>
                  <h2>Who Should Explore This Opportunity?</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    This opportunity is ideally positioned for commercial partners seeking differentiated, high-margin Japanese lifestyle and tableware products:
                  </p>

                  <div className="tsubame-partners-grid">
                    <div className="tsubame-partner-chip"><span>🌐</span> National Distributors</div>
                    <div className="tsubame-partner-chip"><span>📦</span> Premium Goods Importers</div>
                    <div className="tsubame-partner-chip"><span>🏬</span> Department Stores</div>
                    <div className="tsubame-partner-chip"><span>✨</span> Design &amp; Lifestyle Retailers</div>
                    <div className="tsubame-partner-chip"><span>🗾</span> Japanese Specialty Retailers</div>
                    <div className="tsubame-partner-chip"><span>🛒</span> Premium E-commerce Platforms</div>
                    <div className="tsubame-partner-chip"><span>🍽️</span> Hotel &amp; Hospitality Suppliers</div>
                    <div className="tsubame-partner-chip"><span>🏨</span> Luxury Hotels &amp; Resorts</div>
                    <div className="tsubame-partner-chip"><span>🍶</span> Japanese Dining &amp; Izakayas</div>
                    <div className="tsubame-partner-chip"><span>🍷</span> Sake &amp; Beverage Specialists</div>
                    <div className="tsubame-partner-chip"><span>🎁</span> Corporate Gifting Businesses</div>
                    <div className="tsubame-partner-chip"><span>🎀</span> Luxury Gifting Companies</div>
                    <div className="tsubame-partner-chip"><span>✈️</span> Duty-Free Operators</div>
                    <div className="tsubame-partner-chip"><span>🏛️</span> Museum &amp; Design Stores</div>
                    <div className="tsubame-partner-chip"><span>🏠</span> Homeware Retailers</div>
                    <div className="tsubame-partner-chip"><span>💼</span> Promotional Merchandise Firms</div>
                    <div className="tsubame-partner-chip"><span>⚙️</span> Private-Label / OEM Buyers</div>
                  </div>
                </div>

                {/* 5. COMMERCIAL USE CASES */}
                <div className="content-card" id="use-cases" style={{ marginTop: 24 }}>
                  <h2>Commercial Use Cases</h2>
                  <div className="tsubame-usecases-grid">
                    <div className="tsubame-usecase-card">
                      <h4><span>🏬</span> Premium Retail</h4>
                      <p>High-design Japanese drinkware capable of standing out in department stores, lifestyle boutiques, and specialist homeware environments.</p>
                    </div>
                    <div className="tsubame-usecase-card">
                      <h4><span>🥂</span> Hospitality</h4>
                      <p>Distinctive tumblers and sake vessels for premium restaurants, cocktail bars, luxury hotels, and Japanese fine-dining concepts.</p>
                    </div>
                    <div className="tsubame-usecase-card">
                      <h4><span>🎁</span> Corporate Gifting</h4>
                      <p>Gift-set presentation in traditional wooden boxes (kiribako) and premium metallic finishes make the products ideal for executive and corporate gifting.</p>
                    </div>
                    <div className="tsubame-usecase-card">
                      <h4><span>🗾</span> Japan Lifestyle &amp; Gifting</h4>
                      <p>Strong Japanese provenance and recognizable design make selected ranges particularly suitable for Japanese cultural concepts and tourism gifting.</p>
                    </div>
                    <div className="tsubame-usecase-card">
                      <h4><span>🛒</span> E-Commerce</h4>
                      <p>Highly visual product ranges that can be effectively marketed through specialist online retailers, curated gift platforms, and premium marketplaces.</p>
                    </div>
                    <div className="tsubame-usecase-card">
                      <h4><span>⚙️</span> OEM &amp; Personalization</h4>
                      <p>Personalized commemorative products, corporate editions, and original branded goods for qualified commercial projects.</p>
                    </div>
                  </div>
                </div>

                {/* 6. CATALOG DOWNLOADS ("Explore the Collections") */}
                <div className="content-card" id="catalogs" style={{ marginTop: 24 }}>
                  <h2>Explore the Collections</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Review the official product catalogues and technical specifications for the Tsubame drinkware collections:
                  </p>

                  <div className="tsubame-catalogs-grid">
                    <div className="tsubame-catalog-card">
                      <div className="tsubame-catalog-header">
                        <span className="tsubame-pdf-badge">PDF</span>
                        <div>
                          <h4>Tsubame Tumbler Collection</h4>
                          <p>Full 12-page comprehensive product catalogue, finishes &amp; dimensions</p>
                        </div>
                      </div>
                      <a href="/Maruyama Stainless.pdf" target="_blank" rel="noopener noreferrer" className="btn-catalog-download">
                        View Catalogue (PDF) ↗
                      </a>
                    </div>

                    <div className="tsubame-catalog-card">
                      <div className="tsubame-catalog-header">
                        <span className="tsubame-pdf-badge">PDF</span>
                        <div>
                          <h4>Ginkobi Ao Collection</h4>
                          <p>Antique silver blue stainless-steel tumblers &amp; sake ware</p>
                        </div>
                      </div>
                      <a href="/Ginkobi_Ao_Catalog.pdf" target="_blank" rel="noopener noreferrer" className="btn-catalog-download">
                        View Catalogue (PDF) ↗
                      </a>
                    </div>

                    <div className="tsubame-catalog-card">
                      <div className="tsubame-catalog-header">
                        <span className="tsubame-pdf-badge">PDF</span>
                        <div>
                          <h4>Mt. Fuji Sake Cup Collection</h4>
                          <p>English product catalogue for Mt. Fuji cold sake cups (FM-100 / FM-102)</p>
                        </div>
                      </div>
                      <a href="/Mt_Fuji_Sake_Cup_Catalog_English.pdf" target="_blank" rel="noopener noreferrer" className="btn-catalog-download">
                        View Catalogue (PDF) ↗
                      </a>
                    </div>

                    <div className="tsubame-catalog-card">
                      <div className="tsubame-catalog-header">
                        <span className="tsubame-pdf-badge">PDF</span>
                        <div>
                          <h4>The Luxury of Gold</h4>
                          <p>24K gold plated interior drinking vessels &amp; sake cups</p>
                        </div>
                      </div>
                      <a href="/The_Luxury_of_Gold_Catalog.pdf" target="_blank" rel="noopener noreferrer" className="btn-catalog-download">
                        View Catalogue (PDF) ↗
                      </a>
                    </div>
                  </div>
                </div>

                {/* 7. BOTTOM PROMPT BANNER */}
                <div className="tsubame-prompt-banner" style={{ marginTop: 24 }}>
                  <div>
                    <span className="tsubame-prompt-text">Interested in representing these products in your market?</span>
                    <p style={{ margin: "4px 0 0 0", fontSize: "0.88rem", opacity: 0.9 }}>
                      Submit your commercial qualification below to receive wholesale pricing, export terms, and sample details.
                    </p>
                  </div>
                  <a href="#inquiry" className="tsubame-prompt-btn">Request Partnership Information</a>
                </div>
              </>
            )}

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

            {/* Custom Rich Sections for Celeblé / Balance Co., Ltd. Japan */}
            {opportunity.slug === "celeble-non-alcoholic-sparkling-wine-distribution" && (
              <>
                {/* 1. TOP PROMPT BANNER */}
                <div className="celeble-prompt-banner" style={{ background: "linear-gradient(135deg, #09120e 0%, #101d16 55%, #08100c 100%)", border: "1px solid rgba(16, 185, 129, 0.4)", borderRadius: 14, padding: "24px 28px", color: "#f8fafc", marginBottom: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}>
                  <div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#34d399", display: "inline-block", marginBottom: 6 }}>
                      ⭐ LEAD GLOBAL OPPORTUNITY • BALANCE CO., LTD. (TOYAMA, JAPAN)
                    </span>
                    <h3 style={{ margin: "0 0 8px 0", fontSize: "1.3rem", fontWeight: 700, color: "#ffffff" }}>
                      Seeking International Beverage Importers, Fine-Dining Distributors &amp; Luxury HORECA Partners
                    </h3>
                    <p style={{ margin: "0 0 16px 0", fontSize: "0.92rem", lineHeight: 1.6, color: "#cbd5e1" }}>
                      Partner Market Global is collaborating with <strong>Balance Co., Ltd.</strong> of Toyama, Japan to appoint qualified national importers, wine &amp; spirits wholesalers, and hospitality distributors for <strong>Celeblé</strong>—Japan&apos;s culinary 0.00% non-alcoholic sparkling beverage.
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <a href="#inquire" className="btn btn-primary" style={{ background: "linear-gradient(135deg, #059669, #10b981)", borderColor: "#34d399", padding: "10px 22px", borderRadius: 8, fontWeight: 700 }}>
                      Request Distribution Terms
                    </a>
                    <a href="#lineup" className="btn btn-line" style={{ color: "#34d399", borderColor: "rgba(52, 211, 153, 0.4)", padding: "10px 20px", borderRadius: 8 }}>
                      View 4-SKU Lineup
                    </a>
                    <a href="#market" className="btn btn-line" style={{ color: "#34d399", borderColor: "rgba(52, 211, 153, 0.4)", padding: "10px 20px", borderRadius: 8 }}>
                      Japan Restaurant Data
                    </a>
                  </div>
                </div>

                {/* 2. THE CULINARY & FERMENTATION ADVANTAGE */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700 }}>PROPRIETARY FERMENTATION INNOVATION</span>
                  </div>
                  <h2>Why Celeblé: Authentic Sparkling Wine Taste at 0.00% Alcohol</h2>
                  <p style={{ lineHeight: 1.65, fontSize: "0.95rem", color: "#334155" }}>
                    Conventional non-alcoholic wines rely on dealcoholization, a process that removes alcohol after regular winemaking but inherently strips delicate aromatic compounds and frequently leaves detectable residual alcohol (&gt;0.00%). On the other extreme, wine-flavored grape juices are unfermented and heavy with cloying sugars that overpower fine food.
                  </p>
                  <p style={{ lineHeight: 1.65, fontSize: "0.95rem", color: "#334155" }}>
                    <strong>Celeblé solves this culinary challenge:</strong> Using the juice of premium wine-grape varieties, Balance Co., Ltd. ferments the juice using a specialized, proprietary technique that metabolizes sugars and develops natural wine acidity and mouthfeel <em>without producing alcohol</em>. The result is verified <strong>0.00% Alc.</strong>, <strong>0 caffeine</strong>, and zero animal-derived ingredients.
                  </p>

                  <div style={{ marginTop: 20, borderRadius: 12, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                    <img
                      src="/images/opportunities/celeble/celeble-fermentation-chart.webp"
                      alt="Fermentation Process Comparison: Wine vs. De-Alcoholic Wine vs. Grape Juice vs. Celeblé"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                    <div style={{ padding: "12px 16px", background: "#f8fafc", fontSize: "0.85rem", color: "#64748b" }}>
                      Figure 1: Proprietary fermentation process comparison from the Balance Co., Ltd. technical briefing deck.
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 24 }}>
                    <div style={{ padding: 16, borderRadius: 10, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                      <strong style={{ color: "#166534", display: "block", marginBottom: 4 }}>0.00% Alcohol Guaranteed</strong>
                      <span style={{ fontSize: "0.88rem", color: "#15803d", lineHeight: 1.5 }}>
                        Safe for designated drivers, medical contraindications, expectant mothers, and zero-proof lifestyle consumers.
                      </span>
                    </div>
                    <div style={{ padding: 16, borderRadius: 10, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                      <strong style={{ color: "#166534", display: "block", marginBottom: 4 }}>Zero Caffeine &amp; 100% Vegan</strong>
                      <span style={{ fontSize: "0.88rem", color: "#15803d", lineHeight: 1.5 }}>
                        Zero animal-derived ingredients and certified zero caffeine. Respects diverse international cultural and dietary values.
                      </span>
                    </div>
                    <div style={{ padding: 16, borderRadius: 10, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                      <strong style={{ color: "#166534", display: "block", marginBottom: 4 }}>Sommelier-Approved Gastronomy</strong>
                      <span style={{ fontSize: "0.88rem", color: "#15803d", lineHeight: 1.5 }}>
                        Crisp acidity and fine sparkling bubbles cleanse the palate and pair seamlessly with multi-course dining.
                      </span>
                    </div>
                    <div style={{ padding: 16, borderRadius: 10, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                      <strong style={{ color: "#166534", display: "block", marginBottom: 4 }}>High HORECA Revenue Lift</strong>
                      <span style={{ fontSize: "0.88rem", color: "#15803d", lineHeight: 1.5 }}>
                        Replaces low-margin soft drinks with premium JPY 600–800 (200ml) or JPY 1,000–1,800 (355ml) restaurant drink pricing.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. PRODUCT LINEUP & ASSORTMENT */}
                <div className="content-card" id="lineup" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700 }}>COMMERCIAL PRODUCT PORTFOLIO</span>
                  </div>
                  <h2>Celeblé Product Assortment: 4 Dedicated SKUs</h2>
                  <p style={{ lineHeight: 1.65, fontSize: "0.95rem", color: "#334155" }}>
                    Available in two practical bottle formats: the <strong>355ml sharing bottle</strong> (serves 2–3 flutes, ideal for tables, pairings and toasts) and the <strong>200ml personal mini bottle</strong> (serves 1–2 flutes, ideal for solo diners, lunch menus, room service and airline service).
                  </p>

                  <div style={{ marginBottom: 20, borderRadius: 12, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                    <img
                      src="/images/opportunities/celeble/celeble-lineup-bottles.webp"
                      alt="Celeblé Product Lineup: Blanc, Rose, Dry, and Blanc Mini"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                    <div style={{ padding: 18, borderRadius: 12, background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#059669", textTransform: "uppercase", marginBottom: 4 }}>Flagship SKU</div>
                      <h3 style={{ margin: "0 0 6px 0", fontSize: "1.1rem" }}>Celeblé Blanc (355ml)</h3>
                      <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.5, margin: "0 0 10px 0" }}>
                        Recreates the refined palate and fine effervescence of white Champagne. Golden straw tone, refreshing citrus and green apple notes with crisp, lively bubbles.
                      </p>
                      <div style={{ fontSize: "0.8rem", color: "#334155", background: "#f8fafc", padding: "6px 10px", borderRadius: 6 }}>
                        <strong>Format:</strong> 355ml Glass Bottle (2–3 flutes)
                      </div>
                    </div>

                    <div style={{ padding: 18, borderRadius: 12, background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#db2777", textTransform: "uppercase", marginBottom: 4 }}>Celebration SKU</div>
                      <h3 style={{ margin: "0 0 6px 0", fontSize: "1.1rem" }}>Celeblé Rosé (355ml)</h3>
                      <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.5, margin: "0 0 10px 0" }}>
                        Vibrant salmon-pink hue with expressive red berry and botanical aromatics. Rounded palate and balanced acidity, excellent for toasts and seafood pairings.
                      </p>
                      <div style={{ fontSize: "0.8rem", color: "#334155", background: "#f8fafc", padding: "6px 10px", borderRadius: 6 }}>
                        <strong>Format:</strong> 355ml Glass Bottle (2–3 flutes)
                      </div>
                    </div>

                    <div style={{ padding: 18, borderRadius: 12, background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#2563eb", textTransform: "uppercase", marginBottom: 4 }}>Gastronomy SKU</div>
                      <h3 style={{ margin: "0 0 6px 0", fontSize: "1.1rem" }}>Celeblé Dry (355ml)</h3>
                      <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.5, margin: "0 0 10px 0" }}>
                        Extra-dry profile engineered specifically for multi-course savory dining. Minimal residual sweetness, pronounced minerality and sharp, palate-cleansing finish.
                      </p>
                      <div style={{ fontSize: "0.8rem", color: "#334155", background: "#f8fafc", padding: "6px 10px", borderRadius: 6 }}>
                        <strong>Format:</strong> 355ml Glass Bottle (2–3 flutes)
                      </div>
                    </div>

                    <div style={{ padding: 18, borderRadius: 12, background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#d97706", textTransform: "uppercase", marginBottom: 4 }}>Single-Serve SKU</div>
                      <h3 style={{ margin: "0 0 6px 0", fontSize: "1.1rem" }}>Celeblé Blanc Mini (200ml)</h3>
                      <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.5, margin: "0 0 10px 0" }}>
                        Single-serve personal format (1–2 flutes) eliminating open-bottle wastage. Perfect for solo diners, executive lunch menus, mini-bars and in-flight catering.
                      </p>
                      <div style={{ fontSize: "0.8rem", color: "#334155", background: "#f8fafc", padding: "6px 10px", borderRadius: 6 }}>
                        <strong>Format:</strong> 200ml Glass Bottle (1–2 flutes)
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. RESTAURANT ADOPTION & JAPAN MARKET VALIDATION */}
                <div className="content-card" id="market" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700 }}>DOMESTIC COMMERCIAL VALIDATION</span>
                  </div>
                  <h2>Japan Foodservice Breakdown &amp; Market Growth</h2>
                  <p style={{ lineHeight: 1.65, fontSize: "0.95rem", color: "#334155" }}>
                    In Japan&apos;s demanding gastronomic landscape, Celeblé is primarily served across upscale restaurants with dinner checks exceeding JPY 5,000. It enjoys strong sommelier endorsement and high customer repeat rates.
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginTop: 16 }}>
                    <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
                      <img
                        src="/images/opportunities/celeble/celeble-foodservice-breakdown.webp"
                        alt="Celeblé Sales Breakdown by Restaurant Sector"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                      <div style={{ padding: 14, background: "#f8fafc", fontSize: "0.86rem", color: "#475569" }}>
                        <strong>Sector Distribution:</strong> French dining (38%), Italian (26%), Japanese Washoku (10%), Cafés (8%), Dining Bars (6%), Chinese (4%), Teppanyaki (3%), International &amp; Izakaya (4%).
                      </div>
                    </div>

                    <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
                      <img
                        src="/images/opportunities/celeble/celeble-market-trends.webp"
                        alt="Non-Alcoholic Beverage Market Trends Japan"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                      <div style={{ padding: 14, background: "#f8fafc", fontSize: "0.86rem", color: "#475569" }}>
                        <strong>Market Trends:</strong> Japanese non-alcoholic market has quadrupled over the last 15 years, with year-round demand peaking during spring hanami, summer dining, and year-end celebrations.
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. GLOBAL EXPORT VALIDATION */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700 }}>INTERNATIONAL EXPORT TRACK RECORD</span>
                  </div>
                  <h2>Proven Export Deliveries Across 7+ Global Territories</h2>
                  <p style={{ lineHeight: 1.65, fontSize: "0.95rem", color: "#334155" }}>
                    Balance Co., Ltd. has established ongoing export container shipments to prestigious international dining and luxury retail accounts:
                  </p>

                  <div style={{ overflowX: "auto", marginTop: 12 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                      <thead>
                        <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
                          <th style={{ padding: "10px 14px", borderBottom: "2px solid #cbd5e1" }}>Year</th>
                          <th style={{ padding: "10px 14px", borderBottom: "2px solid #cbd5e1" }}>Destinations</th>
                          <th style={{ padding: "10px 14px", borderBottom: "2px solid #cbd5e1" }}>Shipped SKUs &amp; Volumes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 700 }}>2020</td>
                          <td style={{ padding: "10px 14px" }}>Saudi Arabia</td>
                          <td style={{ padding: "10px 14px" }}>Blanc 355ml (1,000 bottles), Rosé 355ml (1,000 bottles)</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 700 }}>2021</td>
                          <td style={{ padding: "10px 14px" }}>Singapore, Taiwan, Saudi Arabia</td>
                          <td style={{ padding: "10px 14px" }}>Blanc (4,000 bottles), Rosé (4,000 bottles), Dry (200 bottles)</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 700 }}>2022</td>
                          <td style={{ padding: "10px 14px" }}>Saudi Arabia, Singapore, USA, Taiwan</td>
                          <td style={{ padding: "10px 14px" }}>Blanc (700 bottles), Rosé (1,300 bottles), Dry (400 bottles)</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 700 }}>2023</td>
                          <td style={{ padding: "10px 14px" }}>Singapore, USA, Guam, Thailand</td>
                          <td style={{ padding: "10px 14px" }}>Blanc (700 bottles), Rosé (800 bottles), Dry (200 bottles)</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 700 }}>2024</td>
                          <td style={{ padding: "10px 14px" }}>USA, Canada, Guam</td>
                          <td style={{ padding: "10px 14px" }}>Blanc (1,800 bottles), Rosé (1,200 bottles), Dry (1,400 bottles)</td>
                        </tr>
                        <tr style={{ background: "#f0fdf4" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 700, color: "#166534" }}>2025</td>
                          <td style={{ padding: "10px 14px", color: "#166534" }}>USA, Taiwan</td>
                          <td style={{ padding: "10px 14px", color: "#166534", fontWeight: 600 }}>Blanc (2,900 bottles), Rosé (3,200 bottles), Dry (500 bottles) — 6,600 bottles</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 6. B2B MARKETING & TABLETOP POP */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700 }}>RESTAURANT MERCHANDISING SUPPORT</span>
                  </div>
                  <h2>Turnkey Tabletop POP &amp; Menu Integration Materials</h2>
                  <p style={{ lineHeight: 1.65, fontSize: "0.95rem", color: "#334155" }}>
                    To ensure rapid sell-through and high product turnover in restaurant dining rooms, Balance Co., Ltd. provides comprehensive point-of-sale display materials:
                  </p>

                  <div style={{ marginTop: 14, borderRadius: 12, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                    <img
                      src="/images/opportunities/celeble/celeble-pop-displays.webp"
                      alt="Celeblé Table Tents, Posters, and Merchandising Displays"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>

                  <ul style={{ paddingLeft: 20, fontSize: "0.9rem", color: "#475569", marginTop: 16, lineHeight: 1.6 }}>
                    <li style={{ marginBottom: 6 }}><strong>Freestanding Table Tents (121mm × 138mm):</strong> Designed for table-level guest engagement, prompting pre-meal toast orders.</li>
                    <li style={{ marginBottom: 6 }}><strong>A4 Laminated Posters &amp; Menu Inserts:</strong> Highlighting 0.00% alcohol, 0 caffeine, and wine-flavor pairing credentials.</li>
                    <li style={{ marginBottom: 6 }}><strong>Staff Call &amp; Sommelier Cheat Sheets:</strong> Assisting restaurant floor staff in recommending pairings with course menus.</li>
                  </ul>
                </div>
              </>
            )}

            {/* Custom Rich Sections for Nippon Career Industry Co., Ltd. Japan */}
            {opportunity.slug === "nippon-career-ultra-thin-meat-slicing" && (
              <>
                {/* 1. TOP PROMPT BANNER */}
                <div className="nippon-prompt-banner">
                  <div>
                    <span className="nippon-prompt-text">Seeking Industrial Meat Slicing Automation or Regional Dealership Rights?</span>
                    <p style={{ margin: "6px 0 0 0", fontSize: "0.88rem", opacity: 0.9 }}>
                      Partner Market Global facilitates direct qualified introductions to Nippon Career Industry Co., Ltd. (Japan) for supermarket chains, meat processors, restaurant groups, and industrial equipment distributors.
                    </p>
                  </div>
                  <div className="nippon-prompt-actions">
                    <a href="#inquire" className="nippon-btn-primary">Request Introduction</a>
                    <a href="#downloads" className="nippon-btn-secondary">Download Catalogues</a>
                  </div>
                </div>

                {/* 2. CORE PERFORMANCE METRICS */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <div className="nippon-badge-pill" style={{ marginBottom: 12 }}>
                    <span>⚙️</span>
                    <span>ENGINEERING EXCELLENCE • MATSUYAMA, JAPAN</span>
                  </div>
                  <h2>Key Industrial Performance Metrics</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Nippon Career Industry&apos;s continuous band-blade technology delivers unprecedented precision, yield, and operational uptime:
                  </p>

                  <div className="nippon-stats-row">
                    <div className="nippon-stat-box">
                      <span className="nippon-stat-val">Down to ~1.5 mm</span>
                      <span className="nippon-stat-label">Ultra-Thin Chilled Raw Slicing (No Pre-Freezing)</span>
                    </div>
                    <div className="nippon-stat-box">
                      <span className="nippon-stat-val">Approx. 95%</span>
                      <span className="nippon-stat-label">Raw Meat Yield Efficiency</span>
                    </div>
                    <div className="nippon-stat-box">
                      <span className="nippon-stat-val">~1 Minute</span>
                      <span className="nippon-stat-label">Toolless Band Blade Replacement</span>
                    </div>
                    <div className="nippon-stat-box">
                      <span className="nippon-stat-val">Up to ~100/min</span>
                      <span className="nippon-stat-label">Continuous Slicing Throughput</span>
                    </div>
                    <div className="nippon-stat-box">
                      <span className="nippon-stat-val">1,000+ Units</span>
                      <span className="nippon-stat-label">Industrial Slicer Deployments in Japan</span>
                    </div>
                    <div className="nippon-stat-box">
                      <span className="nippon-stat-val">Est. 1970</span>
                      <span className="nippon-stat-label">50+ Years Food Machinery Specialization</span>
                    </div>
                  </div>
                </div>

                {/* 3. SIX CORE VALUE PROPOSITIONS */}
                <div className="content-card" id="value-propositions" style={{ marginTop: 24 }}>
                  <div className="nippon-badge-pill" style={{ marginBottom: 12 }}>
                    <span>✨</span>
                    <span>MANUFACTURER VALUE PROPOSITION</span>
                  </div>
                  <h2>Why Nippon Career E-Series Leads Industrial Meat Slicing</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Engineered to solve the fundamental bottlenecks of meat prep: yield loss, irregular thickness, and hours of blade-sharpening downtime:
                  </p>

                  <div className="nippon-grid-3">
                    {/* VP 1 */}
                    <div className="nippon-card">
                      <div className="nippon-card-img-wrap">
                        <img
                          src="/images/opportunities/nippon-career/nippon-career-ultra-thin-meat-cuts.webp"
                          alt="Nippon Career ultra-thin meat cuts down to 1.5mm"
                          className="nippon-card-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="nippon-card-body">
                        <h3 className="nippon-card-title">1. Fresh &amp; Chilled Ultra-Thin Slicing</h3>
                        <p className="nippon-card-text">
                          Cuts raw fresh and chilled meat down to ~1.5 mm cleanly without deep-freezing or surface crusting. Preserves cellular integrity, natural juices, tender bite, and bloom—essential for high-value Shabu-Shabu, Sukiyaki, and premium retail presentations.
                        </p>
                        <div className="nippon-card-footer">Preserves Raw Fresh Texture</div>
                      </div>
                    </div>

                    {/* VP 2 */}
                    <div className="nippon-card">
                      <div className="nippon-card-img-wrap">
                        <img
                          src="/images/opportunities/nippon-career/nippon-career-95-percent-yield.webp"
                          alt="Approx. 95% meat yield with minimal scrap"
                          className="nippon-card-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="nippon-card-body">
                        <h3 className="nippon-card-title">2. High Product Yield (Approx. 95%)</h3>
                        <p className="nippon-card-text">
                          Patented positive meat-feed mechanics and razor-sharp continuous band-blade guidance cut all the way through the meat block with virtually zero tail-end crush or scrap. Plants routinely report ~95% usable meat recovery, transforming profit margins.
                        </p>
                        <div className="nippon-card-footer">Minimal Tail Scrap &amp; Waste</div>
                      </div>
                    </div>

                    {/* VP 3 */}
                    <div className="nippon-card">
                      <div className="nippon-card-img-wrap">
                        <img
                          src="/images/opportunities/nippon-career/nippon-career-band-blade-replacement.webp"
                          alt="One minute band blade replacement mechanism"
                          className="nippon-card-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="nippon-card-body">
                        <h3 className="nippon-card-title">3. 1-Minute Band Blade Replacement</h3>
                        <p className="nippon-card-text">
                          Eliminates 30 to 45 minutes of hazardous blade-grinding and balancing downtime. A regular line operator can remove and replace the ultra-thin band blade in approximately 60 seconds with zero specialized maintenance tools required.
                        </p>
                        <div className="nippon-card-footer">Zero Grinding Downtime</div>
                      </div>
                    </div>

                    {/* VP 4 */}
                    <div className="nippon-card">
                      <div className="nippon-card-img-wrap">
                        <img
                          src="/images/opportunities/nippon-career/nippon-career-shingled-slicing.webp"
                          alt="Automated shingling and stacking of sliced meat"
                          className="nippon-card-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="nippon-card-body">
                        <h3 className="nippon-card-title">4. Precision Shingling &amp; Stacking</h3>
                        <p className="nippon-card-text">
                          Integrated multi-speed servo conveyance arranges sliced meat automatically in uniform shingled rows, counted stacks, or folded sheets (EZ1-34), discharging portions directly ready for supermarket tray packaging without human hand-touch.
                        </p>
                        <div className="nippon-card-footer">Automated Tray-Ready Output</div>
                      </div>
                    </div>

                    {/* VP 5 */}
                    <div className="nippon-card">
                      <div className="nippon-card-img-wrap">
                        <img
                          src="/images/opportunities/nippon-career/nippon-career-safety-cover-design.webp"
                          alt="Hygienic toolless washdown construction"
                          className="nippon-card-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="nippon-card-body">
                        <h3 className="nippon-card-title">5. Toolless Washdown Sanitation</h3>
                        <p className="nippon-card-text">
                          Engineered from food-grade stainless steel with IP65 washdown-rated drive modules. Belts, scraper blades, and stainless safety covers disassemble by hand in minutes for thorough daily CIP sanitation complying with stringent HACCP standards.
                        </p>
                        <div className="nippon-card-footer">Full IP65 Sanitary Washdown</div>
                      </div>
                    </div>

                    {/* VP 6 */}
                    <div className="nippon-card">
                      <div className="nippon-card-img-wrap">
                        <img
                          src="/images/opportunities/nippon-career/nippon-career-slicing-line.webp"
                          alt="High capacity continuous meat slicing line"
                          className="nippon-card-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="nippon-card-body">
                        <h3 className="nippon-card-title">6. Continuous Industrial Throughput</h3>
                        <p className="nippon-card-text">
                          Capable of continuous slicing speeds up to ~100 cuts per minute (dependent on meat temperature, firmness, and thickness). Designed for multi-shift industrial reliability in central commissaries, meatpacking lines, and supermarket prep centers.
                        </p>
                        <div className="nippon-card-footer">Continuous Industrial Duty</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. WHO WE WANT TO MEET */}
                <div className="content-card" id="target-partners" style={{ marginTop: 24 }}>
                  <div className="nippon-badge-pill" style={{ marginBottom: 12 }}>
                    <span>🎯</span>
                    <span>TARGET PARTNER PROFILES</span>
                  </div>
                  <h2>Who We Want to Meet</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Partner Market Global is screening and coordinating discussions with four primary commercial categories:
                  </p>

                  <div className="nippon-grid-4">
                    <div style={{ padding: 18, border: "1px solid #e2e8f0", borderRadius: 10, background: "#f8fafc" }}>
                      <div style={{ fontSize: "1.6rem", marginBottom: 8 }}>🛒</div>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem", color: "#0f172a" }}>Supermarket &amp; Retail Groups</h4>
                      <p style={{ margin: 0, fontSize: "0.86rem", color: "#475569", lineHeight: 1.5 }}>
                        Retailers operating central meat preparation facilities or high-volume butchery counters seeking to automate shingled beef, pork belly, and hot-pot retail trays.
                      </p>
                    </div>

                    <div style={{ padding: 18, border: "1px solid #e2e8f0", borderRadius: 10, background: "#f8fafc" }}>
                      <div style={{ fontSize: "1.6rem", marginBottom: 8 }}>🥩</div>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem", color: "#0f172a" }}>Meat Processors &amp; Wholesalers</h4>
                      <p style={{ margin: 0, fontSize: "0.86rem", color: "#475569", lineHeight: 1.5 }}>
                        Commercial packing plants and wholesale meat purveyors looking to increase chilled raw yield, eliminate blade downtime, and introduce premium thin-cut SKUs.
                      </p>
                    </div>

                    <div style={{ padding: 18, border: "1px solid #e2e8f0", borderRadius: 10, background: "#f8fafc" }}>
                      <div style={{ fontSize: "1.6rem", marginBottom: 8 }}>🥢</div>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem", color: "#0f172a" }}>Restaurant &amp; Franchise Chains</h4>
                      <p style={{ margin: 0, fontSize: "0.86rem", color: "#475569", lineHeight: 1.5 }}>
                        Multi-unit Yakiniku, Asian BBQ, Shabu-Shabu, and hot-pot restaurant operators seeking perfectly uniform portion thickness and high-speed central kitchen prep.
                      </p>
                    </div>

                    <div style={{ padding: 18, border: "1px solid #e2e8f0", borderRadius: 10, background: "#f8fafc" }}>
                      <div style={{ fontSize: "1.6rem", marginBottom: 8 }}>🏭</div>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem", color: "#0f172a" }}>Equipment Distributors &amp; Dealers</h4>
                      <p style={{ margin: 0, fontSize: "0.86rem", color: "#475569", lineHeight: 1.5 }}>
                        Established food processing machinery distributors with technical service, installation capabilities, and customer relationships in key regional markets.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. E-SERIES MODEL COMPARISON */}
                <div className="content-card" id="models" style={{ marginTop: 24 }}>
                  <div className="nippon-badge-pill" style={{ marginBottom: 12 }}>
                    <span>📐</span>
                    <span>TECHNICAL SPECIFICATIONS &amp; MODEL LINEUP</span>
                  </div>
                  <h2>Nippon Career E-Series Slicer Models</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Compare the flagship industrial slicer configurations designed for different commercial volume and layout requirements:
                  </p>

                  <div className="nippon-grid-3">
                    <div className="nippon-card">
                      <div className="nippon-card-img-wrap" style={{ background: "#f8fafc", padding: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img
                          src="/images/opportunities/nippon-career/nippon-career-ex1-32-slicer.webp"
                          alt="Nippon Career EX1-32 Industrial Meat Slicer"
                          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                          loading="lazy"
                        />
                      </div>
                      <div className="nippon-card-body">
                        <span className="nippon-badge-pill" style={{ width: "fit-content", marginBottom: 8 }}>Flagship High-Capacity</span>
                        <h3 className="nippon-card-title">Model EX1-32</h3>
                        <p className="nippon-card-text">
                          The premier high-speed automatic industrial slicer designed for large meat processors and high-capacity central kitchens. Features wide feed magazine, multi-program touch screen, and precision shingle conveyance.
                        </p>
                        <ul style={{ paddingLeft: 18, fontSize: "0.84rem", color: "#334155", margin: 0, lineHeight: 1.5 }}>
                          <li><strong>Thickness:</strong> ~1.5 mm to 20 mm</li>
                          <li><strong>Speed:</strong> Up to ~100 cuts/min</li>
                          <li><strong>Conveyor:</strong> Automatic multi-row shingling</li>
                          <li><strong>Application:</strong> Large processing plants &amp; commissaries</li>
                        </ul>
                      </div>
                    </div>

                    <div className="nippon-card">
                      <div className="nippon-card-img-wrap" style={{ background: "#f8fafc", padding: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img
                          src="/images/opportunities/nippon-career/nippon-career-ey1-30-slicer.webp"
                          alt="Nippon Career EY1-30 Compact Meat Slicer"
                          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                          loading="lazy"
                        />
                      </div>
                      <div className="nippon-card-body">
                        <span className="nippon-badge-pill" style={{ width: "fit-content", marginBottom: 8, background: "#dcfce7", color: "#15803d" }}>Compact Commercial</span>
                        <h3 className="nippon-card-title">Model EY1-30</h3>
                        <p className="nippon-card-text">
                          Optimized footprint model delivering the exact same patented band-blade cutting quality for space-conscious supermarket butcheries, specialty meat stores, and medium commissaries.
                        </p>
                        <ul style={{ paddingLeft: 18, fontSize: "0.84rem", color: "#334155", margin: 0, lineHeight: 1.5 }}>
                          <li><strong>Thickness:</strong> ~1.5 mm to 20 mm</li>
                          <li><strong>Speed:</strong> High-efficiency continuous feed</li>
                          <li><strong>Footprint:</strong> Compact layout with sanitary casters</li>
                          <li><strong>Application:</strong> Supermarkets &amp; regional prep hubs</li>
                        </ul>
                      </div>
                    </div>

                    <div className="nippon-card">
                      <div className="nippon-card-img-wrap" style={{ background: "#f8fafc", padding: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img
                          src="/images/opportunities/nippon-career/nippon-career-ez1-34-folding-slicer.webp"
                          alt="Nippon Career EZ1-34 Automatic Sheet Folding Slicer"
                          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                          loading="lazy"
                        />
                      </div>
                      <div className="nippon-card-body">
                        <span className="nippon-badge-pill" style={{ width: "fit-content", marginBottom: 8, background: "#fef3c7", color: "#b45309" }}>Automatic Sheet Folding</span>
                        <h3 className="nippon-card-title">Model EZ1-34</h3>
                        <p className="nippon-card-text">
                          Advanced folding slicer with integrated interleaving film mechanism. Automatically folds ultra-thin meat ribbons and interleaves hygienic plastic sheet liners for luxury retail packs.
                        </p>
                        <ul style={{ paddingLeft: 18, fontSize: "0.84rem", color: "#334155", margin: 0, lineHeight: 1.5 }}>
                          <li><strong>Thickness:</strong> Ultra-thin ~1.5 mm folding cuts</li>
                          <li><strong>Interleaving:</strong> Automated plastic film sheet folding</li>
                          <li><strong>Hygiene:</strong> Hands-free premium presentation</li>
                          <li><strong>Application:</strong> High-end Shabu-Shabu &amp; Sukiyaki packs</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* SPECIFICATION COMPARISON TABLE */}
                  <div className="nippon-table-wrap">
                    <table className="nippon-table">
                      <thead>
                        <tr>
                          <th>Parameter</th>
                          <th>Model EX1-32 (High Capacity)</th>
                          <th>Model EY1-30 (Compact)</th>
                          <th>Model EZ1-34 (Folding &amp; Interleaving)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Blade Technology</strong></td>
                          <td>Ultra-thin continuous band blade</td>
                          <td>Ultra-thin continuous band blade</td>
                          <td>Ultra-thin continuous band blade</td>
                        </tr>
                        <tr>
                          <td><strong>Blade Swap Time</strong></td>
                          <td>~1 minute (toolless quick-change)</td>
                          <td>~1 minute (toolless quick-change)</td>
                          <td>~1 minute (toolless quick-change)</td>
                        </tr>
                        <tr>
                          <td><strong>Slice Thickness Range</strong></td>
                          <td>Approx. 1.5 mm to 20 mm</td>
                          <td>Approx. 1.5 mm to 20 mm</td>
                          <td>Approx. 1.5 mm to 20 mm (folding modes)</td>
                        </tr>
                        <tr>
                          <td><strong>Cutting Speed</strong></td>
                          <td>Up to ~100 slices/min*</td>
                          <td>Continuous servo feed*</td>
                          <td>Synchronized folding &amp; interleaving*</td>
                        </tr>
                        <tr>
                          <td><strong>Meat Temperature Range</strong></td>
                          <td>Chilled &amp; raw: -2°C to +4°C</td>
                          <td>Chilled &amp; raw: -2°C to +4°C</td>
                          <td>Chilled &amp; raw: -2°C to +4°C</td>
                        </tr>
                        <tr>
                          <td><strong>Discharge Modes</strong></td>
                          <td>Shingling, stacking, continuous belt</td>
                          <td>Shingling, step conveyance</td>
                          <td>Automated film sheet folding &amp; stacking</td>
                        </tr>
                        <tr>
                          <td><strong>Sanitary Construction</strong></td>
                          <td>Food-grade stainless steel (IP65)</td>
                          <td>Food-grade stainless steel (IP65)</td>
                          <td>Food-grade stainless steel (IP65)</td>
                        </tr>
                        <tr>
                          <td><strong>Primary Targets</strong></td>
                          <td>Processors, packing plants, large central kitchens</td>
                          <td>Supermarket chains, butcheries, medium commissaries</td>
                          <td>Premium Wagyu, Shabu-Shabu, gourmet retail packaging</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#64748b", fontStyle: "italic", marginTop: 8 }}>
                    *Slicing speed, minimum slice thickness, and raw meat yield percentages depend on meat temperature, moisture level, cut firmness, muscle shape uniformity, and machine settings.
                  </p>
                </div>

                {/* 6. REFERENCE DISTRIBUTOR NETWORK */}
                <div className="content-card" id="network" style={{ marginTop: 24 }}>
                  <div className="nippon-badge-pill" style={{ marginBottom: 12 }}>
                    <span>🌐</span>
                    <span>PROVEN INTERNATIONAL DEPLOYMENT RECORD</span>
                  </div>
                  <h2>Global Reference Distributor &amp; Partner Network</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Nippon Career Industry machinery has been successfully deployed, serviced, and represented across 14+ international territories through qualified food machinery dealerships:
                  </p>

                  <div className="nippon-table-wrap">
                    <table className="nippon-table">
                      <thead>
                        <tr>
                          <th>Region</th>
                          <th>Country / Territory</th>
                          <th>Partner / Network Role</th>
                          <th>Technical Scope &amp; Support</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>East Asia</strong></td>
                          <td>South Korea</td>
                          <td>Authorized Machinery Distributor</td>
                          <td>Local installation, Korean user training, OEM spare blades</td>
                        </tr>
                        <tr>
                          <td><strong>East Asia</strong></td>
                          <td>China</td>
                          <td>Industrial Partner Network</td>
                          <td>High-volume central kitchen deployments, parts warehousing</td>
                        </tr>
                        <tr>
                          <td><strong>East Asia</strong></td>
                          <td>Taiwan</td>
                          <td>Specialized Food Equipment Dealer</td>
                          <td>Supermarket butchery automation, local field service</td>
                        </tr>
                        <tr>
                          <td><strong>Southeast Asia</strong></td>
                          <td>Thailand</td>
                          <td>Regional Machinery Representative</td>
                          <td>Hot-pot and meatpacking line integration</td>
                        </tr>
                        <tr>
                          <td><strong>Southeast Asia</strong></td>
                          <td>Vietnam</td>
                          <td>Food Machinery Agent</td>
                          <td>Contract packaging support, meat processor installations</td>
                        </tr>
                        <tr>
                          <td><strong>Europe</strong></td>
                          <td>Belgium &amp; Netherlands</td>
                          <td>Benelux Equipment Partner</td>
                          <td>CE compliance support, butcher &amp; deli line installations</td>
                        </tr>
                        <tr>
                          <td><strong>Europe</strong></td>
                          <td>Spain &amp; Portugal</td>
                          <td>Iberian Machinery Distributor</td>
                          <td>Ham, charcuterie, and chilled pork processing integrations</td>
                        </tr>
                        <tr>
                          <td><strong>Europe</strong></td>
                          <td>Italy</td>
                          <td>Machinery Agent Network</td>
                          <td>Specialty deli and cured meat precision slicing</td>
                        </tr>
                        <tr>
                          <td><strong>Europe</strong></td>
                          <td>France</td>
                          <td>Food Industry Equipment Partner</td>
                          <td>Industrial foodservice and central kitchen systems</td>
                        </tr>
                        <tr>
                          <td><strong>Europe</strong></td>
                          <td>United Kingdom</td>
                          <td>Machinery Sales &amp; Technical Dealer</td>
                          <td>UK supermarket meat lines, local maintenance contracts</td>
                        </tr>
                        <tr>
                          <td><strong>Europe</strong></td>
                          <td>Hungary</td>
                          <td>Central European Partner</td>
                          <td>Regional industrial meatpacking facilities</td>
                        </tr>
                        <tr>
                          <td><strong>Europe / Eurasia</strong></td>
                          <td>Greece &amp; Turkey</td>
                          <td>Regional Equipment Representatives</td>
                          <td>Foodservice distribution, commercial butchery equipment</td>
                        </tr>
                        <tr>
                          <td><strong>Americas</strong></td>
                          <td>United States &amp; Canada</td>
                          <td>North American Machinery Dealers</td>
                          <td>Supermarket chains, Asian retail commissaries, UL/NSF coordination</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "#64748b", fontStyle: "italic", marginTop: 8 }}>
                    Note: International distributor listings, partner references, and machine performance data were compiled from manufacturer documentation and remain subject to confirmation during commercial due diligence. Partner Market Global is actively expanding this network into open markets.
                  </p>
                </div>

                {/* 7. COMMERCIAL USE CASES & APPLICATIONS */}
                <div className="content-card" id="applications" style={{ marginTop: 24 }}>
                  <div className="nippon-badge-pill" style={{ marginBottom: 12 }}>
                    <span>🍽️</span>
                    <span>COMMERCIAL APPLICATIONS</span>
                  </div>
                  <h2>Core Culinary &amp; Retail Packaging Applications</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Nippon Career slicers unlock high-margin retail SKUs and streamline commercial kitchen workflows across global meat categories:
                  </p>

                  <div className="nippon-grid-3">
                    <div className="nippon-card">
                      <div className="nippon-card-img-wrap">
                        <img
                          src="/images/opportunities/nippon-career/nippon-career-shabu-shabu-presentation.webp"
                          alt="Shabu-Shabu and Sukiyaki ultra thin meat presentation"
                          className="nippon-card-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="nippon-card-body">
                        <h3 className="nippon-card-title">Shabu-Shabu &amp; Sukiyaki</h3>
                        <p className="nippon-card-text">
                          Flawless ultra-thin curls (~1.5 mm) of chilled Wagyu beef, ribeye, and pork collar that cook in seconds. Uniform thickness ensures exquisite mouthfeel without tearing.
                        </p>
                      </div>
                    </div>

                    <div className="nippon-card">
                      <div className="nippon-card-img-wrap">
                        <img
                          src="/images/opportunities/nippon-career/nippon-career-supermarket-trays.webp"
                          alt="Supermarket retail pre-pack shingled meat trays"
                          className="nippon-card-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="nippon-card-body">
                        <h3 className="nippon-card-title">Supermarket Retail Trays</h3>
                        <p className="nippon-card-text">
                          Directly shingles sliced beef and pork into visually striking overlapping arrays ready for automated tray-sealing, transforming retail shelf appeal and commanding higher price realization.
                        </p>
                      </div>
                    </div>

                    <div className="nippon-card">
                      <div className="nippon-card-img-wrap">
                        <img
                          src="/images/opportunities/nippon-career/nippon-career-meat-processing.webp"
                          alt="Industrial central kitchen meat processing"
                          className="nippon-card-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="nippon-card-body">
                        <h3 className="nippon-card-title">Central Kitchen Commissaries</h3>
                        <p className="nippon-card-text">
                          High-volume portioning for restaurant chains, Yakiniku, hot-pot buffets, and airline catering. Standardizes portions across dozens of branch locations while saving hours of manual labor.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 8. THE ECONOMIC CASE / COMMERCIAL ROI */}
                <div className="content-card" id="economic-case" style={{ marginTop: 24 }}>
                  <div className="nippon-badge-pill" style={{ marginBottom: 12 }}>
                    <span>📊</span>
                    <span>COMMERCIAL RETURN ON INVESTMENT</span>
                  </div>
                  <h2>The Economic Case for Meat Processors</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 16 }}>
                    <div style={{ padding: 18, border: "1px solid #e2e8f0", borderRadius: 10, background: "#f8fafc" }}>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1.05rem", color: "#0369a1" }}>+5% to +8% Usable Yield</h4>
                      <p style={{ margin: 0, fontSize: "0.88rem", color: "#475569", lineHeight: 1.5 }}>
                        Reaching ~95% usable cut yield on premium chilled meats recovers thousands of kilograms of saleable meat per year that would otherwise become trim or rendering waste.
                      </p>
                    </div>
                    <div style={{ padding: 18, border: "1px solid #e2e8f0", borderRadius: 10, background: "#f8fafc" }}>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1.05rem", color: "#0369a1" }}>30-45 Min Downtime Saved / Shift</h4>
                      <p style={{ margin: 0, fontSize: "0.88rem", color: "#475569", lineHeight: 1.5 }}>
                        Eliminating rotary blade sharpening procedures means production lines keep running. 60-second band-blade swaps maximize overall equipment effectiveness (OEE).
                      </p>
                    </div>
                    <div style={{ padding: 18, border: "1px solid #e2e8f0", borderRadius: 10, background: "#f8fafc" }}>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1.05rem", color: "#0369a1" }}>Replaces 3-4 Manual Slicers</h4>
                      <p style={{ margin: 0, fontSize: "0.88rem", color: "#475569", lineHeight: 1.5 }}>
                        One automated E-Series line with integrated shingling replaces multiple manual slicing stations, reducing operator fatigue, repetitive strain injuries, and labor overhead.
                      </p>
                    </div>
                    <div style={{ padding: 18, border: "1px solid #e2e8f0", borderRadius: 10, background: "#f8fafc" }}>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "1.05rem", color: "#0369a1" }}>Premium Retail Margin</h4>
                      <p style={{ margin: 0, fontSize: "0.88rem", color: "#475569", lineHeight: 1.5 }}>
                        Clean, tear-free fresh meat cuts command higher retail pricing per kilogram in supermarket chillers, unlocking higher profit margins on raw inventory.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 9. COMPANY PROFILE & HERITAGE */}
                <div className="content-card" id="company-profile" style={{ marginTop: 24 }}>
                  <div className="nippon-badge-pill" style={{ marginBottom: 12 }}>
                    <span>🏢</span>
                    <span>COMPANY PROFILE • NIPPON CAREER INDUSTRY CO., LTD.</span>
                  </div>
                  <h2>Japanese Manufacturing Heritage</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "center", marginTop: 16 }}>
                    <div>
                      <p style={{ lineHeight: 1.65, marginBottom: 12, color: "#334155" }}>
                        Founded in <strong>1970 in Matsuyama City, Ehime Prefecture, Japan</strong>, <strong>Nippon Career Industry Co., Ltd.</strong> is a pioneer in advanced food processing machinery with over five decades of engineering excellence.
                      </p>
                      <p style={{ lineHeight: 1.65, marginBottom: 12, color: "#334155" }}>
                        The company operates under an uncompromising manufacturing philosophy: <strong>&quot;十倍の価格百倍の寿命&quot; (10 Times the Price, 100 Times the Service Life)</strong>. Rather than competing in race-to-the-bottom disposable machinery, Nippon Career builds industrial equipment designed to operate flawlessly for decades under grueling factory conditions.
                      </p>
                      <p style={{ lineHeight: 1.65, margin: 0, color: "#334155" }}>
                        With over <strong>1,000 slicer installations</strong> operating across Japan&apos;s leading food processors, Nippon Career holds ISO 9001 certification and maintains strict quality control over all components from its Matsuyama headquarters.
                      </p>
                    </div>
                    <div>
                      <img
                        src="/images/opportunities/nippon-career/nippon-career-matsuyama-headquarters.webp"
                        alt="Nippon Career Industry Co., Ltd. headquarters and manufacturing facility in Matsuyama Japan"
                        style={{ width: "100%", height: "auto", borderRadius: 10, border: "1px solid #e2e8f0" }}
                        loading="lazy"
                      />
                      <p style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 6, fontStyle: "italic", textAlign: "center" }}>
                        Nippon Career Industry Co., Ltd. headquarters &amp; engineering center in Matsuyama, Ehime, Japan
                      </p>
                    </div>
                  </div>
                </div>

                {/* 10. DOWNLOADABLE MATERIALS */}
                <div className="content-card" id="downloads" style={{ marginTop: 24 }}>
                  <div className="nippon-badge-pill" style={{ marginBottom: 12 }}>
                    <span>📁</span>
                    <span>OFFICIAL MANUFACTURER DOCUMENTATION</span>
                  </div>
                  <h2>Download Manufacturer Documentation</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Access complete technical specifications, model catalogues, and international corporate presentations:
                  </p>

                  <div className="nippon-downloads-grid">
                    <div className="nippon-download-card">
                      <div>
                        <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>📄</div>
                        <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem", color: "#0f172a" }}>Nippon Career Company Profile</h4>
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
                          Corporate overview, historical milestones, patents, and manufacturing capabilities in Japanese and English (PDF).
                        </p>
                      </div>
                      <a
                        href="/downloads/nippon-career-industry-company-profile.pdf"
                        download
                        className="btn btn-primary"
                        style={{ fontSize: "0.85rem", padding: "8px 14px", textDecoration: "none", textAlign: "center" }}
                      >
                        Download Company Profile (PDF)
                      </a>
                    </div>

                    <div className="nippon-download-card">
                      <div>
                        <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>📑</div>
                        <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem", color: "#0f172a" }}>E-Series Slicers Technical Catalogue</h4>
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
                          Detailed technical diagrams, model dimensional drawings, slicing speeds, and utility specifications (PDF).
                        </p>
                      </div>
                      <a
                        href="/downloads/nippon-career-e-series-meat-slicers.pdf"
                        download
                        className="btn btn-primary"
                        style={{ fontSize: "0.85rem", padding: "8px 14px", textDecoration: "none", textAlign: "center" }}
                      >
                        Download E-Series Catalogue (PDF)
                      </a>
                    </div>

                    <div className="nippon-download-card">
                      <div>
                        <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>📊</div>
                        <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem", color: "#0f172a" }}>International Sales Expansion Proposal</h4>
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
                          Commercial proposal outlining distributor framework, target market applications, and partnership cooperation (PDF).
                        </p>
                      </div>
                      <a
                        href="/downloads/nippon-career-international-expansion.pdf"
                        download
                        className="btn btn-primary"
                        style={{ fontSize: "0.85rem", padding: "8px 14px", textDecoration: "none", textAlign: "center" }}
                      >
                        Download Expansion Proposal (PDF)
                      </a>
                    </div>
                  </div>
                </div>

                {/* 11. PARTNER MARKET GLOBAL FACILITATION BOX */}
                <div className="content-card" style={{ marginTop: 24, borderLeft: "4px solid #0284c7" }}>
                  <div className="nippon-badge-pill" style={{ marginBottom: 12 }}>
                    <span>🤝</span>
                    <span>PARTNER MARKET GLOBAL FACILITATION PROTOCOL</span>
                  </div>
                  <h2>Partner Market Global Commercial Facilitation</h2>
                  <p style={{ lineHeight: 1.6, fontSize: "0.95rem", color: "#334155" }}>
                    Partner Market Global serves as an international commercial bridge connecting qualified buyers, supermarket chains, meat processors, and regional equipment dealerships directly with Nippon Career Industry Co., Ltd. in Japan.
                  </p>
                  <ul style={{ paddingLeft: 20, fontSize: "0.9rem", color: "#475569", marginTop: 10, lineHeight: 1.6 }}>
                    <li><strong>Direct Executive Contact:</strong> Inquiries are screened and routed directly to Nippon Career&apos;s international commercial team.</li>
                    <li><strong>Technical Feasibility Review:</strong> We assist in coordinating meat trial cuts and machine configuration specifications tailored to your target protein cuts.</li>
                    <li><strong>Confidentiality &amp; Neutrality:</strong> We facilitate introductions on transparent terms without adding hidden markups to machinery equipment pricing.</li>
                    <li><strong>Sample Testing in Japan:</strong> Qualified prospective buyers and distributors can arrange physical slicing trials on Nippon Career test lines in Japan.</li>
                  </ul>
                  <p style={{ margin: "14px 0 0 0", fontSize: "0.82rem", fontStyle: "italic", color: "#64748b" }}>
                    Disclaimer: Slice thickness (down to ~1.5 mm), slicing speed (up to ~100 slices/min), and raw meat yield (~95%) are engineering performance targets dependent upon meat temperature (-2°C to +4°C), texture, moisture, bone trimming, and machine configuration. Partner Market Global facilitates verified international commercial introductions and does not manufacture machinery.
                  </p>
                </div>

                {/* 12. FREQUENTLY ASKED QUESTIONS (10 ITEMS) */}
                <div className="content-card" id="faqs" style={{ marginTop: 24 }}>
                  <div className="nippon-badge-pill" style={{ marginBottom: 12 }}>
                    <span>❓</span>
                    <span>FREQUENTLY ASKED QUESTIONS</span>
                  </div>
                  <h2>Frequently Asked Questions</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Detailed answers to common engineering, operational, and commercial questions:
                  </p>

                  <div style={{ marginTop: 16 }}>
                    {nipponCareerFaqs.map((faq, idx) => (
                      <details key={idx} className="nippon-faq-item" open={idx === 0}>
                        <summary className="nippon-faq-question">
                          <span>{idx + 1}. {faq.question}</span>
                          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>▼</span>
                        </summary>
                        <div className="nippon-faq-answer">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Custom Rich Sections for Eiwa Holdings Co., Ltd. / Eiwa Bussan Co., Ltd. */}
            {opportunity.slug === "eiwa-japanese-food-ingredients-global-distribution" && (
              <>
                {/* 1. TOP PROMPT BANNER */}
                <div style={{
                  background: "linear-gradient(135deg, #06180f 0%, #0d2e1c 55%, #05140b 100%)",
                  border: "1px solid rgba(16, 185, 129, 0.45)",
                  borderRadius: "14px",
                  padding: "24px 28px",
                  color: "#f8fafc",
                  marginBottom: "24px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "18px"
                }}>
                  <div style={{ maxWidth: "720px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.76rem", fontWeight: 700, color: "#6ee7b7", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
                      <span>🌿</span> FEATURED B2B FOOD INGREDIENTS OPPORTUNITY
                    </div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "1.35rem", fontWeight: 800, color: "#ffffff" }}>
                      Interested in Importing or Distributing Eiwa Holdings Food Ingredients?
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.55, color: "#cbd5e1" }}>
                      Partner Market Global facilitates direct qualified B2B commercial introductions between verified importers, food manufacturers, and restaurant groups with Eiwa Holdings Co., Ltd. / Eiwa Bussan Co., Ltd. in Tokyo, introduced via Japan Industrial Promotion (JIP).
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <a href="#inquire" className="btn btn-primary" style={{ background: "linear-gradient(135deg, #059669, #047857)", borderColor: "#059669" }}>
                      Request Product Terms
                    </a>
                    <a href="/downloads/eiwa-holdings-export-product-catalog.pdf" download className="btn btn-line" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.4)" }}>
                      Download Export Catalog (PDF)
                    </a>
                  </div>
                </div>

                {/* 2. COMPANY PROFILE & SOURCING HERITAGE */}
                <div className="content-card" id="eiwa-profile" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700 }}>CORPORATE PROFILE &bull; TOKYO, JAPAN</span>
                  </div>
                  <h2>Eiwa Holdings &amp; Eiwa Bussan: Tokyo Food Ingredient Specialists</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "start", marginTop: 16 }}>
                    <div>
                      <p style={{ lineHeight: 1.65, marginBottom: 14, color: "#334155" }}>
                        Headquartered in Kojimachi, Chiyoda-ku, Tokyo, <strong>Eiwa Holdings Co., Ltd.</strong> and its trading arm <strong>Eiwa Bussan Co., Ltd.</strong> (official website: <a href="https://www.eiwa-trade.co.jp/" target="_blank" rel="noopener noreferrer" style={{ color: "#059669", fontWeight: 600, textDecoration: "underline" }}>eiwa-trade.co.jp</a>) are specialized Japanese commercial operators supplying food flavorings, additives, functional ingredients, lactic acid bacteria, and international culinary solutions.
                      </p>
                      <p style={{ lineHeight: 1.65, marginBottom: 14, color: "#334155" }}>
                        In collaboration with <strong>Japan Industrial Promotion (JIP)</strong>, Eiwa Holdings is currently developing international distribution partnerships for a carefully curated export portfolio of six commercial product categories. Priority geographical regions include Southeast Asia (Indonesia, Malaysia, Singapore, Thailand, Vietnam, Philippines), with secondary consideration for Middle Eastern, North American, and European markets subject to regulatory matching.
                      </p>
                      <p style={{ lineHeight: 1.65, marginBottom: 14, color: "#334155" }}>
                        Partner Market Global conducts pre-qualification to connect serious commercial importers, industrial food processors, hospitality procurement leaders, and distributor networks with authorized commercial principals at Eiwa Holdings.
                      </p>
                    </div>
                    <div style={{ background: "var(--soft-bg, #f8fafc)", padding: 20, borderRadius: 12, border: "1px solid #e2e8f0" }}>
                      <h4 style={{ margin: "0 0 12px 0", fontSize: "1rem", color: "#0f172a" }}>Eiwa Holdings At A Glance</h4>
                      <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0, fontSize: "0.9rem", lineHeight: 1.8, color: "#334155" }}>
                        <li>🏢 <strong>Headquarters:</strong> Kojimachi, Chiyoda-ku, Tokyo 102-0083, Japan</li>
                        <li>🌐 <strong>Official Website:</strong> <a href="https://www.eiwa-trade.co.jp/" target="_blank" rel="noopener noreferrer" style={{ color: "#059669" }}>www.eiwa-trade.co.jp</a></li>
                        <li>🤝 <strong>Introduction Partner:</strong> Japan Industrial Promotion (JIP)</li>
                        <li>📦 <strong>Export Portfolio:</strong> 6 Distinct B2B Commercial Product Categories</li>
                        <li>🌏 <strong>Priority Target Regions:</strong> Southeast Asia, Middle East, Global</li>
                        <li>⚖️ <strong>Regulatory Integrity:</strong> Clear distinction between domestic Japanese &amp; imported Dutch lines</li>
                      </ul>
                    </div>
                  </div>

                  <div className="tsubame-stats-row" style={{ marginTop: 24 }}>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val" style={{ color: "#059669" }}>Tokyo HQ</span>
                      <span className="tsubame-stat-label">Kojimachi, Chiyoda-ku</span>
                    </div>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val" style={{ color: "#059669" }}>6 Lines</span>
                      <span className="tsubame-stat-label">Export Categories</span>
                    </div>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val" style={{ color: "#059669" }}>Brix 72</span>
                      <span className="tsubame-stat-label">High-Purity Concentrate</span>
                    </div>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val" style={{ color: "#059669" }}>-30&deg;C Liquid</span>
                      <span className="tsubame-stat-label">Tomin Ultra-Rapid Freezing</span>
                    </div>
                  </div>
                </div>

                {/* 3. SIX CORE PRODUCT CATEGORIES */}
                <div className="content-card" id="eiwa-products" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700 }}>EXPORT PRODUCT CATALOGUE &bull; JULY 2026</span>
                  </div>
                  <h2>The Eiwa Export Portfolio: Six Commercial Product Lines</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 20px 0" }}>
                    Each category serves distinct culinary and manufacturing sectors, backed by supplier catalogue specifications and verified trade documentation:
                  </p>

                  {/* Product 1: Japanese Citrus Oils */}
                  <div className="eiwa-product-card">
                    <div className="eiwa-product-grid">
                      <div>
                        <img
                          src="/images/opportunities/eiwa/eiwa-citrus-oils.webp"
                          alt="Authentic Japanese citrus oils Yuzu Sudachi Kabosu Naoshichi bottles and fresh fruit"
                          style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "10px", border: "1px solid #e2e8f0" }}
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                          <span className="mini-badge" style={{ color: "#047857", background: "#ecfdf5", borderColor: "#a7f3d0" }}>Japanese Citrus Line</span>
                          <span className="mini-badge" style={{ color: "#1e40af", background: "#eff6ff", borderColor: "#bfdbfe" }}>Catalog Halal / Kosher Claim</span>
                        </div>
                        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.2rem", color: "#0f172a" }}>
                          1. Japanese Citrus &amp; Ginger Essential Oils
                        </h3>
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#334155", margin: "0 0 12px 0" }}>
                          Aromatic cold-pressed and steam-distilled essential oils derived from Japan&apos;s most prized regional citrus fruits: <strong>Yuzu</strong>, <strong>Sudachi</strong>, <strong>Kabosu</strong>, and <strong>Naoshichi</strong>, alongside specialty Japanese <strong>Ginger Oil</strong>.
                        </p>
                        <div style={{ background: "#f8fafc", padding: "10px 14px", borderRadius: "8px", fontSize: "0.85rem", color: "#475569", marginBottom: "12px", border: "1px solid #e2e8f0" }}>
                          <strong>Indicative Annual Production Quantities (Supplier Catalog):</strong>
                          <ul style={{ margin: "6px 0 0 0", paddingLeft: "18px" }}>
                            <li>Yuzu Oil: ~11,200 kg</li>
                            <li>Sudachi Oil: ~400 kg | Kabosu Oil: ~300 kg</li>
                            <li>Naoshichi Oil: ~250 kg | Ginger Oil: ~150 kg</li>
                          </ul>
                          <span style={{ fontSize: "0.78rem", color: "#64748b", fontStyle: "italic", display: "block", marginTop: "4px" }}>
                            *Note: Quantities reflect supplier catalogue figures and require seasonal harvest confirmation.
                          </span>
                        </div>
                        <p style={{ fontSize: "0.88rem", lineHeight: 1.55, color: "#475569", margin: "0 0 8px 0" }}>
                          <strong>Commercial Applications:</strong> Craft beverages, luxury confectionery, dressings, sauces, high-end perfumery, cosmetics, and fragrance formulation.
                        </p>
                        <p style={{ fontSize: "0.82rem", color: "#b45309", background: "#fffbeb", padding: "6px 10px", borderRadius: "6px", border: "1px solid #fde68a", margin: 0 }}>
                          ⚠️ <em>Certification Notice:</em> The catalogue describes these oils as Halal and Kosher certified. Partner Market Global verifies specific certificates, certifying bodies, and covered SKUs during buyer qualification.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product 2: Halal Japanese Dashi */}
                  <div className="eiwa-product-card">
                    <div className="eiwa-product-grid">
                      <div>
                        <img
                          src="/images/opportunities/eiwa/eiwa-halal-dashi.webp"
                          alt="Halal Japanese Dashi umami broth seasoning with bonito shavings and kombu kelp"
                          style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "10px", border: "1px solid #e2e8f0" }}
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                          <span className="mini-badge" style={{ color: "#047857", background: "#ecfdf5", borderColor: "#a7f3d0" }}>Authentic Umami</span>
                          <span className="mini-badge" style={{ color: "#1e40af", background: "#eff6ff", borderColor: "#bfdbfe" }}>Catalog Halal Certified Claim</span>
                        </div>
                        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.2rem", color: "#0f172a" }}>
                          2. Halal Japanese Dashi Seasoning
                        </h3>
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#334155", margin: "0 0 12px 0" }}>
                          Traditional Japanese dashi seasoning engineered to deliver authentic umami depth using classic ingredients such as bonito (katsuo) and kelp (kombu). Formulated specifically to allow professional kitchens and food manufacturers to prepare genuine Japanese culinary bases in compliance with halal dietary requirements.
                        </p>
                        <p style={{ fontSize: "0.88rem", lineHeight: 1.55, color: "#475569", margin: "0 0 12px 0" }}>
                          <strong>Target Commercial Channels:</strong> Japanese restaurant chains in Southeast Asia and the Middle East, foodservice distributors, central kitchen commissaries, noodle broth manufacturing, and institutional catering.
                        </p>
                        <p style={{ fontSize: "0.82rem", color: "#b45309", background: "#fffbeb", padding: "6px 10px", borderRadius: "6px", border: "1px solid #fde68a", margin: 0 }}>
                          ⚠️ <em>Verification Note:</em> The catalogue indicates Halal certification; however, certifying bodies, packaging formats, and covered SKU formulations are confirmed directly with buyers upon formal territory inquiry.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product 3: Onion Concentrate Brix 72 */}
                  <div className="eiwa-product-card" style={{ borderLeft: "4px solid #0f766e" }}>
                    <div className="eiwa-product-grid">
                      <div>
                        <img
                          src="/images/opportunities/eiwa/eiwa-onion-concentrate.webp"
                          alt="Premium Onion Concentrate Brix 72 thick golden liquid ingredient from Netherlands"
                          style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "10px", border: "1px solid #e2e8f0" }}
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                          <span className="mini-badge" style={{ color: "#0e7490", background: "#ecfeff", borderColor: "#a5f3fc" }}>Netherlands Origin</span>
                          <span className="mini-badge" style={{ color: "#047857", background: "#ecfdf5", borderColor: "#a7f3d0" }}>Brix 72 High Concentration</span>
                          <span className="mini-badge" style={{ color: "#6b7280", background: "#f3f4f6", borderColor: "#e5e7eb" }}>Imported by Eiwa Bussan</span>
                        </div>
                        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.2rem", color: "#0f172a" }}>
                          3. Onion Concentrate Brix 72 (Netherlands Origin)
                        </h3>
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#334155", margin: "0 0 12px 0" }}>
                          A premium, viscous concentrated liquid onion ingredient produced using advanced low-temperature vacuum evaporation technology. Approximately <strong>12&ndash;14 kg of fresh onions</strong> are concentrated into <strong>1 kg of finished product</strong> at Brix 72, preserving natural sweetness, aromatic allium volatile compounds, and rich color without scorching or burnt notes.
                        </p>
                        <div style={{ background: "#f0fdfa", padding: "10px 14px", borderRadius: "8px", fontSize: "0.85rem", color: "#0f766e", marginBottom: "12px", border: "1px solid #ccfbf1" }}>
                          <strong>Important Origin &amp; Compliance Statement:</strong>
                          <div style={{ marginTop: "4px" }}>
                            This ingredient <strong>originates in the Netherlands</strong> and is imported into Japan by Eiwa Bussan Co., Ltd. It must not be marketed as Japanese domestic origin. Halal certification status is currently unconfirmed and subject to verification.
                          </div>
                        </div>
                        <p style={{ fontSize: "0.88rem", lineHeight: 1.55, color: "#475569", margin: 0 }}>
                          <strong>Industrial &amp; Culinary Applications:</strong> Curry bases, demi-glace and brown sauces, instant noodle broth pastes, commercial ramen soups, marinades, dressings, and prepared ready-meals.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product 4: Tomin Frozen Sushi (Uota) */}
                  <div className="eiwa-product-card">
                    <div className="eiwa-product-grid">
                      <div>
                        <img
                          src="/images/opportunities/eiwa/eiwa-tomin-frozen-sushi.webp"
                          alt="Tomin liquid-frozen sushi platters nigiri rolls and unagi bowls by Uota Japan"
                          style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "10px", border: "1px solid #e2e8f0" }}
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                          <span className="mini-badge" style={{ color: "#1e40af", background: "#eff6ff", borderColor: "#bfdbfe" }}>Tomin Liquid-Frozen Tech</span>
                          <span className="mini-badge" style={{ color: "#047857", background: "#ecfdf5", borderColor: "#a7f3d0" }}>Manufactured by Uota (魚太)</span>
                          <span className="mini-badge" style={{ color: "#b45309", background: "#fffbeb", borderColor: "#fde68a" }}>Strict -18&deg;C Cold Chain</span>
                        </div>
                        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.2rem", color: "#0f172a" }}>
                          4. Tomin Liquid-Frozen Sushi &amp; Seafood (Manufacturer: Uota)
                        </h3>
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#334155", margin: "0 0 12px 0" }}>
                          Manufactured by specialist Japanese seafood and sushi maker <strong>Uota (株式会社魚太)</strong> utilizing revolutionary <strong>Tomin (凍眠) liquid-freezing technology</strong>. By plunging packaged sushi into liquid coolant at approximately -30&deg;C, freezing occurs up to 20 times faster than blast freezing, preventing large ice crystals from tearing cell walls. Thawed sushi maintains identical mouthfeel, sushi rice fluffiness, and sashimi firmness to freshly rolled sushi.
                        </p>
                        <p style={{ fontSize: "0.88rem", lineHeight: 1.55, color: "#475569", margin: "0 0 12px 0" }}>
                          <strong>Product Lineup:</strong> Frozen sushi party platters, individual retail sushi packs, and premium Japanese unagi (glazed eel) bowls.
                        </p>
                        <p style={{ fontSize: "0.82rem", color: "#b45309", background: "#fffbeb", padding: "6px 10px", borderRadius: "6px", border: "1px solid #fde68a", margin: 0 }}>
                          ⚠️ <em>Cold-Chain &amp; Halal Notice:</em> Requires uninterrupted &le; -18&deg;C frozen cold-chain shipping from Japan to customer. This product line does <strong>not</strong> hold Halal certification.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product 5: Drinkable Daifuku */}
                  <div className="eiwa-product-card">
                    <div className="eiwa-product-grid">
                      <div>
                        <img
                          src="/images/opportunities/eiwa/eiwa-drinkable-daifuku.webp"
                          alt="Drinkable Daifuku ItWokashi modern Japanese melt-in-mouth mochi confection in 6 flavours"
                          style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "10px", border: "1px solid #e2e8f0" }}
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                          <span className="mini-badge" style={{ color: "#7c3aed", background: "#f5f3ff", borderColor: "#ddd6fe" }}>Modern Wagashi (ItWokashi)</span>
                          <span className="mini-badge" style={{ color: "#047857", background: "#ecfdf5", borderColor: "#a7f3d0" }}>6 Gourmet Flavours</span>
                          <span className="mini-badge" style={{ color: "#b45309", background: "#fffbeb", borderColor: "#fde68a" }}>Frozen Storage</span>
                        </div>
                        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.2rem", color: "#0f172a" }}>
                          5. Drinkable Daifuku (Brand: ItWokashi / イトヲカシ)
                        </h3>
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#334155", margin: "0 0 12px 0" }}>
                          An innovative modern reinterpretation of traditional Japanese daifuku mochi created by <strong>ItWokashi (イトヲカシ)</strong>. Featuring an extraordinarily silky, melt-in-the-mouth texture that creates a novel &quot;drinkable&quot; confectionery sensation while preserving classic Japanese confection craftsmanship.
                        </p>
                        <p style={{ fontSize: "0.88rem", lineHeight: 1.55, color: "#475569", margin: "0 0 12px 0" }}>
                          <strong>Flavour Assortment:</strong> Uji Matcha &amp; White Bean, Strawberry &amp; Cream, Yuzu, Roasted Green Tea (Hojicha), Black Sesame, and seasonal releases.
                        </p>
                        <p style={{ fontSize: "0.82rem", color: "#64748b", background: "#f8fafc", padding: "6px 10px", borderRadius: "6px", border: "1px solid #e2e8f0", margin: 0 }}>
                          ℹ️ <em>Specification Note:</em> Shipped frozen; served thawed and chilled. Does not hold Halal or Kosher certification. Suited for premium Japanese cafés, dessert bars, luxury gifting, and department store specialty food halls.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product 6: Buckwheat Groats */}
                  <div className="eiwa-product-card">
                    <div className="eiwa-product-grid">
                      <div>
                        <img
                          src="/images/opportunities/eiwa/eiwa-sobanomi-buckwheat.webp"
                          alt="Japanese buckwheat groats Sobanomi whole kernels on ceramic dish with soba noodles and plant"
                          style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "10px", border: "1px solid #e2e8f0" }}
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                          <span className="mini-badge" style={{ color: "#854d0e", background: "#fefce8", borderColor: "#fef08a" }}>100% Japanese Origin</span>
                          <span className="mini-badge" style={{ color: "#047857", background: "#ecfdf5", borderColor: "#a7f3d0" }}>Whole Buckwheat Groats</span>
                          <span className="mini-badge" style={{ color: "#0e7490", background: "#ecfeff", borderColor: "#a5f3fc" }}>High Dietary Fiber &amp; Rutin</span>
                        </div>
                        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.2rem", color: "#0f172a" }}>
                          6. Japanese Buckwheat Groats (Sobanomi / 蕎麦の実)
                        </h3>
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#334155", margin: "0 0 12px 0" }}>
                          100% Japanese domestically cultivated buckwheat groats (<em>Fagopyrum esculentum</em>). Naturally packed with dietary fiber, plant-based protein, and potent antioxidant rutin (quercetin-3-rutinoside). Celebrated in Japan as a superfood and functional whole grain.
                        </p>
                        <p style={{ fontSize: "0.88rem", lineHeight: 1.55, color: "#475569", margin: "0 0 12px 0" }}>
                          <strong>Culinary Applications:</strong> Simmered together with rice (<em>sobanomi gohan</em>), grain salad bowls, porridge, artisanal soba flour milling, craft brewing adjuncts, and health food toppings.
                        </p>
                        <p style={{ fontSize: "0.82rem", color: "#b45309", background: "#fffbeb", padding: "6px 10px", borderRadius: "6px", border: "1px solid #fde68a", margin: 0 }}>
                          ⚠️ <em>Allergen &amp; Cross-Contact Compliance:</em> While buckwheat is botanically a pseudo-cereal seed and inherently gluten-free, formal commercial gluten-free guarantees against agricultural cross-contact with wheat/barley must be verified per shipment batch. Does not hold Halal or Kosher certification.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. B2B CERTIFICATION & VERIFICATION MATRIX */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700 }}>TRADE COMPLIANCE DISCLOSURE</span>
                  </div>
                  <h2>B2B Certification &amp; Sourcing Verification Matrix</h2>
                  <p style={{ fontSize: "0.95rem", color: "#475569", margin: "4px 0 16px 0" }}>
                    Partner Market Global maintains rigorous transparency standards. The table below delineates manufacturer catalogue statements from formal verification requirements:
                  </p>

                  <div className="eiwa-cert-table-wrap">
                    <table className="eiwa-cert-table">
                      <thead>
                        <tr>
                          <th>Product Category</th>
                          <th>Geographic Origin</th>
                          <th>Supplier Catalog Claims</th>
                          <th>PMG Verification Requirement</th>
                          <th>Logistics / Cold Chain</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Japanese Citrus Oils</strong></td>
                          <td>Japan</td>
                          <td>Halal &amp; Kosher certified; annual production figures listed</td>
                          <td>Certificates, certifying bodies, and covered SKUs to be confirmed during trade match</td>
                          <td>Ambient / Cool dark storage (tamper-evident bottles/drums)</td>
                        </tr>
                        <tr>
                          <td><strong>Japanese Dashi Seasoning</strong></td>
                          <td>Japan</td>
                          <td>Halal certified traditional seasoning</td>
                          <td>Certifying authority and formulation details to be verified before supply agreement</td>
                          <td>Ambient dry storage</td>
                        </tr>
                        <tr style={{ background: "#f0fdfa" }}>
                          <td><strong>Onion Concentrate Brix 72</strong></td>
                          <td><strong>Netherlands</strong> (Imported by Eiwa Bussan)</td>
                          <td>12&ndash;14:1 low-temp concentration, Brix 72</td>
                          <td><strong>Must NOT be marketed as Japanese origin</strong>; Halal status unconfirmed</td>
                          <td>Ambient / Cool storage</td>
                        </tr>
                        <tr>
                          <td><strong>Tomin Frozen Sushi (Uota)</strong></td>
                          <td>Japan (Produced by Uota)</td>
                          <td>-30&deg;C Tomin liquid freezing; platters &amp; eel bowls</td>
                          <td>Not Halal certified</td>
                          <td>Strict unbroken &le; -18&deg;C frozen cold chain required</td>
                        </tr>
                        <tr>
                          <td><strong>Drinkable Daifuku (ItWokashi)</strong></td>
                          <td>Japan</td>
                          <td>6 gourmet flavours, silky melt-in-mouth texture</td>
                          <td>Not Halal or Kosher certified</td>
                          <td>Frozen storage (&le; -18&deg;C); thaw and serve chilled</td>
                        </tr>
                        <tr>
                          <td><strong>Sobanomi Buckwheat Groats</strong></td>
                          <td>Japan</td>
                          <td>100% domestic Japanese buckwheat; high fiber &amp; rutin</td>
                          <td>Inherently gluten-free botanic seed; batch cross-contact verification required for GF claims; Not Halal/Kosher</td>
                          <td>Ambient dry grain storage</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 5. TARGET PARTNER PROFILES */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700 }}>PARTNERSHIP CRITERIA</span>
                  </div>
                  <h2>Target Partner Profiles for Eiwa Holdings Portfolio</h2>
                  <p style={{ fontSize: "0.95rem", color: "#475569", margin: "4px 0 16px 0" }}>
                    Eiwa Holdings seeks experienced international business partners across eight core commercial profiles:
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                    <div style={{ background: "#ffffff", padding: 16, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <strong style={{ display: "block", color: "#059669", marginBottom: 6 }}>1. Specialty Food Ingredient Distributors</strong>
                      <span style={{ fontSize: "0.88rem", color: "#475569" }}>Importers supplying natural flavorings, botanical extracts, and concentrated culinary bases to local manufacturers.</span>
                    </div>
                    <div style={{ background: "#ffffff", padding: 16, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <strong style={{ display: "block", color: "#059669", marginBottom: 6 }}>2. Beverage &amp; Flavoring Manufacturers</strong>
                      <span style={{ fontSize: "0.88rem", color: "#475569" }}>Industrial producers seeking authentic Yuzu and citrus oils for craft sodas, RTD teas, and confectionery.</span>
                    </div>
                    <div style={{ background: "#ffffff", padding: 16, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <strong style={{ display: "block", color: "#059669", marginBottom: 6 }}>3. Japanese Food &amp; HORECA Importers</strong>
                      <span style={{ fontSize: "0.88rem", color: "#475569" }}>Distributors supplying authentic Japanese ingredients, dashi, and specialty seasonings to regional dining outlets.</span>
                    </div>
                    <div style={{ background: "#ffffff", padding: 16, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <strong style={{ display: "block", color: "#059669", marginBottom: 6 }}>4. Restaurant Chains &amp; Central Kitchens</strong>
                      <span style={{ fontSize: "0.88rem", color: "#475569" }}>Ramen and Japanese dining groups requiring consistent high-potency onion concentrate and dashi broth bases.</span>
                    </div>
                    <div style={{ background: "#ffffff", padding: 16, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <strong style={{ display: "block", color: "#059669", marginBottom: 6 }}>5. Luxury Hotels &amp; High-End Caterers</strong>
                      <span style={{ fontSize: "0.88rem", color: "#059669" }}>Hospitality properties seeking premium Tomin frozen sushi platters and Drinkable Daifuku for banquets and VIP lounges.</span>
                    </div>
                    <div style={{ background: "#ffffff", padding: 16, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <strong style={{ display: "block", color: "#059669", marginBottom: 6 }}>6. Airline Catering Procurement</strong>
                      <span style={{ fontSize: "0.88rem", color: "#475569" }}>In-flight dining kitchens requiring shelf-stable concentrated flavor ingredients and thaw-stable frozen meal solutions.</span>
                    </div>
                    <div style={{ background: "#ffffff", padding: 16, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <strong style={{ display: "block", color: "#059669", marginBottom: 6 }}>7. Premium Supermarkets &amp; Retailers</strong>
                      <span style={{ fontSize: "0.88rem", color: "#475569" }}>Gourmet grocery chains in Southeast Asia and Middle East seeking innovative Wagashi sweets and Japanese groats.</span>
                    </div>
                    <div style={{ background: "#ffffff", padding: 16, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <strong style={{ display: "block", color: "#059669", marginBottom: 6 }}>8. Natural Health &amp; Functional Food Brands</strong>
                      <span style={{ fontSize: "0.88rem", color: "#475569" }}>Wellness brands seeking authentic Japanese buckwheat groats rich in dietary fiber and antioxidant rutin.</span>
                    </div>
                  </div>
                </div>

                {/* 6. FIVE-STEP COMMERCIAL PROCESS */}
                <div className="content-card" style={{ marginTop: 24, borderLeft: "4px solid #059669" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700 }}>PARTNERSHIP ONBOARDING PROTOCOL</span>
                  </div>
                  <h2>Five-Step Commercial Introduction Workflow</h2>
                  <p style={{ fontSize: "0.95rem", color: "#334155", margin: "4px 0 16px 0" }}>
                    Partner Market Global and Japan Industrial Promotion (JIP) structure introductions via a secure five-step process:
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                    <div style={{ background: "#f8fafc", padding: 14, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#059669" }}>STEP 1</span>
                      <strong style={{ display: "block", fontSize: "0.95rem", margin: "4px 0" }}>B2B Inquiry Screening</strong>
                      <span style={{ fontSize: "0.82rem", color: "#64748b" }}>Buyer registers interest, specifying target product lines and distribution channel.</span>
                    </div>
                    <div style={{ background: "#f8fafc", padding: 14, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#059669" }}>STEP 2</span>
                      <strong style={{ display: "block", fontSize: "0.95rem", margin: "4px 0" }}>Technical Review</strong>
                      <span style={{ fontSize: "0.82rem", color: "#64748b" }}>Confidential technical specification sheets, Brix values, and shelf-life data provided.</span>
                    </div>
                    <div style={{ background: "#f8fafc", padding: 14, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#059669" }}>STEP 3</span>
                      <strong style={{ display: "block", fontSize: "0.95rem", margin: "4px 0" }}>Sample Evaluation</strong>
                      <span style={{ fontSize: "0.82rem", color: "#64748b" }}>Test samples coordinated for sensory tasting, formulation testing, or kitchen trials.</span>
                    </div>
                    <div style={{ background: "#f8fafc", padding: 14, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#059669" }}>STEP 4</span>
                      <strong style={{ display: "block", fontSize: "0.95rem", margin: "4px 0" }}>Compliance &amp; Certs</strong>
                      <span style={{ fontSize: "0.82rem", color: "#64748b" }}>Import documentation, Halal certificates, and country-specific food labeling aligned.</span>
                    </div>
                    <div style={{ background: "#f8fafc", padding: 14, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#059669" }}>STEP 5</span>
                      <strong style={{ display: "block", fontSize: "0.95rem", margin: "4px 0" }}>Direct Commercial Agreement</strong>
                      <span style={{ fontSize: "0.82rem", color: "#64748b" }}>Commercial contract and shipment logistics executed directly with Eiwa Holdings in Tokyo.</span>
                    </div>
                  </div>
                </div>

                {/* 7. FREQUENTLY ASKED QUESTIONS */}
                <div className="content-card" id="eiwa-faqs" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700 }}>QUESTIONS &amp; ANSWERS</span>
                  </div>
                  <h2>Frequently Asked Questions About Eiwa Holdings</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Detailed answers to common commercial, compliance, and product queries:
                  </p>

                  <div style={{ marginTop: 16 }}>
                    {eiwaFaqs.map((faq, idx) => (
                      <details key={idx} className="nippon-faq-item" open={idx === 0} style={{ borderColor: "#d1fae5" }}>
                        <summary className="nippon-faq-question" style={{ color: "#065f46" }}>
                          <span>{idx + 1}. {faq.question}</span>
                          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>▼</span>
                        </summary>
                        <div className="nippon-faq-answer">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Custom Rich Sections for Kadoya Co., Ltd. (Tai to Kome Franchise) */}
            {opportunity.slug === "kadoya-tai-to-kome-japanese-restaurant-franchise" && (
              <>
                {/* 1. TOP PROMPT BANNER */}
                <div className="kadoya-prompt-banner" style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "18px"
                }}>
                  <div style={{ maxWidth: "720px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(217, 119, 6, 0.25)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.76rem", fontWeight: 700, color: "#fde68a", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
                      <span>🐟</span> FEATURED RESTAURANT FRANCHISE OPPORTUNITY
                    </div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "1.35rem", fontWeight: 800, color: "#ffffff" }}>
                      Bring Kadoya (Tai to Kome) Japanese Restaurant Concept to Your Market
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.55, color: "#cbd5e1" }}>
                      Partner Market Global facilitates direct qualified introductions between Asian multi-unit restaurant operators, hospitality groups, and master franchise candidates with Kadoya Co., Ltd. of Ehime &amp; Tokyo, introduced via Japan Industrial Promotion (JIP).
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <a href="#inquire" className="btn btn-primary" style={{ background: "linear-gradient(135deg, #d97706, #b45309)", borderColor: "#d97706" }}>
                      Request Franchise Terms
                    </a>
                    <a href="/downloads/kadoya-tai-to-kome-franchise-presentation.pdf" download className="btn btn-line" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.4)" }}>
                      Download FC Presentation (PDF)
                    </a>
                  </div>
                </div>

                {/* 2. COMPANY PROFILE & HERITAGE (UWAJIMA, EHIME) */}
                <div className="content-card" id="kadoya-heritage" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(217, 119, 6, 0.12)", border: "1px solid rgba(217, 119, 6, 0.35)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#b45309", fontWeight: 700 }}>FOUNDED 1962 &bull; UWAJIMA, EHIME PREFECTURE</span>
                  </div>
                  <h2>Kadoya Co., Ltd.: Over 60 Years of Japanese Regional Culinary Heritage</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "start", marginTop: 16 }}>
                    <div>
                      <p style={{ lineHeight: 1.65, marginBottom: 14, color: "#334155" }}>
                        Founded in <strong>September 1962</strong> in Uwajima City, Ehime Prefecture (Shikoku), <strong>Kadoya Co., Ltd. (株式会社かどや)</strong> (official website: <a href="https://www.kadoya-taimeshi.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#d97706", fontWeight: 600, textDecoration: "underline" }}>kadoya-taimeshi.com</a>) is a revered regional culinary institution famous across Japan for mastercrafting authentic <strong>Tai-meshi (Sea Bream Rice)</strong>.
                      </p>
                      <p style={{ lineHeight: 1.65, marginBottom: 14, color: "#334155" }}>
                        From its coastal Shikoku origins, Kadoya has grown into a major hospitality enterprise generating approximately <strong>JPY 2.15 billion in company net sales</strong> with approximately <strong>390 employees</strong> across multiple full-service restaurants in Ehime and prestigious Tokyo locations—including Matsuyama Airport and prime commercial districts like Toranomon.
                      </p>
                      <p style={{ lineHeight: 1.65, marginBottom: 14, color: "#334155" }}>
                        Introduced through <strong>Japan Industrial Promotion (JIP)</strong>, Kadoya is now launching its international franchise brand <strong>&quot;Tai to Kome&quot; (鯛と米 / Sea Bream &amp; Rice)</strong>, partnering with qualified Asian restaurant groups to bring authentic Ehime sea bream rice and signature karaage to Hong Kong, Taiwan, Thailand, and neighboring markets.
                      </p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <img
                        src="/images/opportunities/kadoya/kadoya-restaurant-dining-room.webp"
                        alt="Authentic Kadoya Japanese restaurant dining room with warm timber and traditional screens"
                        style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "10px", border: "1px solid #e2e8f0" }}
                        loading="lazy"
                      />
                      <img
                        src="/images/opportunities/kadoya/kadoya-mall-storefront.webp"
                        alt="Kadoya restaurant storefront in modern shopping commercial center"
                        style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "10px", border: "1px solid #e2e8f0" }}
                        loading="lazy"
                      />
                      <div style={{ gridColumn: "1 / -1", background: "#fef3c7", padding: "10px 14px", borderRadius: "8px", fontSize: "0.82rem", color: "#92400e" }}>
                        📌 <em>Company Figures:</em> Net sales (~JPY 2.15B) and staff (~390) reflect Kadoya company-wide operating figures as reported in the July 2026 presentation, not individual store economics.
                      </div>
                    </div>
                  </div>

                  <div className="tsubame-stats-row" style={{ marginTop: 24 }}>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val" style={{ color: "#d97706" }}>Est. 1962</span>
                      <span className="tsubame-stat-label">60+ Years Heritage</span>
                    </div>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val" style={{ color: "#d97706" }}>&yen;2.15 Billion</span>
                      <span className="tsubame-stat-label">Company Net Sales</span>
                    </div>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val" style={{ color: "#d97706" }}>Tai to Kome</span>
                      <span className="tsubame-stat-label">International Concept</span>
                    </div>
                    <div className="tsubame-stat-box">
                      <span className="tsubame-stat-val" style={{ color: "#d97706" }}>2&ndash;3 Staff</span>
                      <span className="tsubame-stat-label">Lean Kitchen SOP</span>
                    </div>
                  </div>
                </div>

                {/* 3. CONCEPT ARCHITECTURE & THE KARAAGE HOOK */}
                <div className="content-card" id="kadoya-concept" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(217, 119, 6, 0.12)", border: "1px solid rgba(217, 119, 6, 0.35)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#b45309", fontWeight: 700 }}>THE MENU ARCHITECTURE</span>
                  </div>
                  <h2>The &quot;Tai to Kome&quot; Formula: Clay Pot Sea Bream + The Karaage Hook</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 20px 0" }}>
                    Kadoya solves the classic commercial challenge of international Japanese seafood restaurants through an ingenious dual-pillar culinary proposition:
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
                    <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                      <img
                        src="/images/opportunities/kadoya/kadoya-authentic-tai-meshi-pot.webp"
                        alt="Earthenware clay pot steaming sea bream rice Tai-meshi with golden dashi"
                        style={{ width: "100%", height: "220px", objectFit: "cover" }}
                        loading="lazy"
                      />
                      <div style={{ padding: 18, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                        <span className="mini-badge" style={{ color: "#b45309", background: "#fef3c7", borderColor: "#fde68a", alignSelf: "flex-start", marginBottom: 8 }}>Pillar 1: The Gourmet Anchor</span>
                        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.15rem", color: "#0f172a" }}>Authentic Clay-Pot Sea Bream Rice (Tai-meshi)</h3>
                        <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#475569", margin: "0 0 12px 0" }}>
                          Piping-hot earthenware clay pot rice infused with seasoned broth and crowned with succulent sea bream. Diners enjoy the interactive Japanese ritual: tasting the delicate fish and seasoned rice first, followed by pouring steaming golden dashi broth to create a rich *dashi-chazuke*.
                        </p>
                        <div style={{ marginTop: "auto", fontSize: "0.82rem", color: "#0f766e", fontWeight: 600 }}>
                          ✓ High perceived value &bull; Premium dinner check averages &bull; Authentic visual theatre
                        </div>
                      </div>
                    </div>

                    <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                      <img
                        src="/images/opportunities/kadoya/kadoya-signature-karaage.webp"
                        alt="Crispy golden Japanese fried chicken karaage with lemon garnish"
                        style={{ width: "100%", height: "220px", objectFit: "cover" }}
                        loading="lazy"
                      />
                      <div style={{ padding: 18, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                        <span className="mini-badge" style={{ color: "#15803d", background: "#f0fdf4", borderColor: "#bbf7d0", alignSelf: "flex-start", marginBottom: 8 }}>Pillar 2: The Karaage Hook</span>
                        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.15rem", color: "#0f172a" }}>Signature Crispy Japanese Karaage</h3>
                        <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#475569", margin: "0 0 12px 0" }}>
                          While white fish can occasionally be perceived as subtle or plain by casual international diners, Kadoya&apos;s signature ultra-crispy karaage provides an instantly craveable, high-frequency favorite. It drives strong family dining, attracts younger guests, and guarantees high weekday lunch footfall.
                        </p>
                        <div style={{ marginTop: "auto", fontSize: "0.82rem", color: "#0f766e", fontWeight: 600 }}>
                          ✓ High-frequency repeat visits &bull; Low food cost &bull; Broad multi-generational appeal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. REGIONAL TAI-MESHI CULINARY DISTINCTION */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(217, 119, 6, 0.12)", border: "1px solid rgba(217, 119, 6, 0.35)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#b45309", fontWeight: 700 }}>CULINARY TRADITION EXPLAINED</span>
                  </div>
                  <h2>The Two Styles of Ehime Tai-meshi: Uwajima vs. Matsuyama</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Ehime Prefecture is unique in Japan for boasting two distinct cultural preparations of sea bream rice. Kadoya has mastered both:
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
                    <div style={{ background: "#f8fafc", padding: 18, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <h4 style={{ margin: "0 0 8px 0", color: "#0f172a", fontSize: "1.05rem" }}>1. Uwajima-Style Tai-meshi (Raw Sashimi Style)</h4>
                      <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#334155", margin: "0 0 10px 0" }}>
                        Originating from the seafaring fishermen of Uwajima Bay. Fresh, sashimi-grade raw sea bream slices are steeped in a savory sauce whisked with raw egg yolk, soy, mirin, and dashi, then poured over a bowl of hot steamed white rice with seaweed and sesame.
                      </p>
                      <span style={{ fontSize: "0.82rem", color: "#64748b", fontStyle: "italic" }}>
                        A revered culinary delicacy, celebrated across gourmet dining circles in Tokyo and Ehime.
                      </span>
                    </div>

                    <div style={{ background: "#fef3c7", padding: 18, borderRadius: 10, border: "1px solid #fde68a" }}>
                      <h4 style={{ margin: "0 0 8px 0", color: "#92400e", fontSize: "1.05rem" }}>2. Matsuyama-Style Tai-meshi (Clay Pot Cooked Style) &bull; Asian Rollout Focus</h4>
                      <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#78350f", margin: "0 0 10px 0" }}>
                        Seasoned sea bream is cooked directly inside an earthenware clay pot with specially seasoned broth and Japanese rice. The heat seals the sweet fish juices into every grain of rice, creating fragrant golden aroma and delicious crispy rice crust (*okoge*).
                      </p>
                      <span style={{ fontSize: "0.82rem", color: "#92400e", fontWeight: 600 }}>
                        ★ Designated primary concept for international expansion due to comforting warmth, universal appeal of cooked seafood, and food safety simplicity.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5. PROPRIETARY GOLDEN DASHI & LEAN SUPPLY CHAIN */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(217, 119, 6, 0.12)", border: "1px solid rgba(217, 119, 6, 0.35)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#b45309", fontWeight: 700 }}>PROPRIETARY IP &bull; LEAN LOGISTICS</span>
                  </div>
                  <h2>Proprietary Golden Dashi &amp; Local Sourcing Model</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "start", marginTop: 16 }}>
                    <div>
                      <p style={{ lineHeight: 1.65, marginBottom: 14, color: "#334155" }}>
                        The core intellectual property of Kadoya is its <strong>Proprietary Golden Dashi</strong>—a meticulously balanced broth concentrate formulated over decades in Ehime to achieve rich umami without heavy sodium or artificial sharpness.
                      </p>
                      <h4 style={{ margin: "16px 0 8px 0", fontSize: "1rem", color: "#0f172a" }}>The Smart International Supply Formula:</h4>
                      <ul style={{ paddingLeft: 18, margin: "0 0 14px 0", fontSize: "0.9rem", lineHeight: 1.7, color: "#334155" }}>
                        <li><strong>Exported from Japan:</strong> Proprietary concentrated golden dashi bases and signature karaage seasoning powders are dispatched directly from Japan, safeguarding trade secrets and flavor consistency.</li>
                        <li><strong>Sourced Locally:</strong> Fresh sea bream/fish, rice, chicken, vegetables, and cooking oil are sourced locally in the destination Asian market.</li>
                        <li><strong>Commercial Benefit:</strong> Slashes international freight charges and seafood import tariffs, avoids complex raw meat cold-chain hurdles, and ensures local produce freshness while keeping gross margins attractive (&ge; 65&ndash;70%).</li>
                      </ul>
                      <p style={{ fontSize: "0.88rem", color: "#475569", margin: 0 }}>
                        <strong>Palate Localization:</strong> Kadoya permits measured sweetness and seasoning adjustments in collaboration with franchisees to tailor flavors to Hong Kong, Taiwan, or Thai dining preferences.
                      </p>
                    </div>
                    <div>
                      <img
                        src="/images/opportunities/kadoya/kadoya-dashi-kitchen-manual.webp"
                        alt="Kadoya standardized kitchen preparation manual and golden dashi broth testing"
                        style={{ width: "100%", height: "240px", objectFit: "cover", borderRadius: "10px", border: "1px solid #e2e8f0" }}
                        loading="lazy"
                      />
                      <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", marginTop: "8px", border: "1px solid #e2e8f0", fontSize: "0.82rem", color: "#64748b" }}>
                        Standardized kitchen SOP: Dashi dilution ratios, digital timer rice cooking, and portion control eliminate operational guesswork.
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. LEAN KITCHEN OPERATIONS & STORE FORMATS */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(217, 119, 6, 0.12)", border: "1px solid rgba(217, 119, 6, 0.35)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#b45309", fontWeight: 700 }}>UNIT ECONOMICS &bull; LEAN LABOR</span>
                  </div>
                  <h2>Lean Kitchen Operations: No Japanese Master Chef Required</h2>
                  <p style={{ color: "#334155", fontSize: "0.95rem", lineHeight: 1.6, margin: "4px 0 18px 0" }}>
                    The greatest barrier to international Japanese restaurant scalability is the dependence on expensive expatriate Japanese master chefs. Kadoya has engineered its franchise format for complete operational autonomy:
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 22 }}>
                    <div style={{ background: "#f0fdf4", padding: 14, borderRadius: 8, border: "1px solid #bbf7d0" }}>
                      <strong style={{ display: "block", color: "#15803d", marginBottom: 4 }}>2&ndash;3 Kitchen Staff Per Shift</strong>
                      <span style={{ fontSize: "0.85rem", color: "#334155" }}>Standardized clay pot heating stations and fryers allow efficient throughput with compact team.</span>
                    </div>
                    <div style={{ background: "#f0fdf4", padding: 14, borderRadius: 8, border: "1px solid #bbf7d0" }}>
                      <strong style={{ display: "block", color: "#15803d", marginBottom: 4 }}>Standardized Cooking Manuals</strong>
                      <span style={{ fontSize: "0.85rem", color: "#334155" }}>Step-by-step photographic SOPs and digital timer guidance ensure consistent dish presentation.</span>
                    </div>
                    <div style={{ background: "#f0fdf4", padding: 14, borderRadius: 8, border: "1px solid #bbf7d0" }}>
                      <strong style={{ display: "block", color: "#15803d", marginBottom: 4 }}>Rapid Order Fulfillment</strong>
                      <span style={{ fontSize: "0.85rem", color: "#334155" }}>Pre-portioned dashi concentrates and streamlined prep ensure 8&ndash;12 minute table service.</span>
                    </div>
                  </div>

                  <h3 style={{ margin: "20px 0 12px 0", fontSize: "1.15rem", color: "#0f172a" }}>Flexible Store Formats &amp; Real Estate Footprints</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                    <div style={{ background: "#ffffff", padding: 16, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <span className="kadoya-step-badge">EXPRESS / FOOD HALL</span>
                      <h4 style={{ margin: "4px 0 6px 0", fontSize: "1.05rem" }}>10&ndash;20 Tsubo (approx. 33&ndash;66 m&sup2;)</h4>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 8px 0" }}>Fast-casual mall food halls, railway transit hubs, airport dining concourses.</p>
                      <ul style={{ paddingLeft: 18, margin: 0, fontSize: "0.82rem", color: "#475569" }}>
                        <li>Counter order &bull; High seat turnover &bull; Karaage set meals &bull; Rapid lunch volume</li>
                      </ul>
                    </div>

                    <div style={{ background: "#ffffff", padding: 16, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <span className="kadoya-step-badge">CASUAL DINING</span>
                      <h4 style={{ margin: "4px 0 6px 0", fontSize: "1.05rem" }}>25&ndash;35 Tsubo (approx. 82&ndash;115 m&sup2;)</h4>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 8px 0" }}>Regional retail malls, prime high-street commercial strips, office district hubs.</p>
                      <ul style={{ paddingLeft: 18, margin: 0, fontSize: "0.82rem", color: "#475569" }}>
                        <li>40&ndash;60 seats &bull; Full table service &bull; Clay-pot dining theatre &bull; Balanced lunch/dinner</li>
                      </ul>
                    </div>

                    <div style={{ background: "#ffffff", padding: 16, borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <span className="kadoya-step-badge">FLAGSHIP RESTAURANT</span>
                      <h4 style={{ margin: "4px 0 6px 0", fontSize: "1.05rem" }}>40&ndash;50+ Tsubo (approx. 132&ndash;165+ m&sup2;)</h4>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 8px 0" }}>Luxury shopping centres, Japanese gourmet dining zones, hotel dining facilities.</p>
                      <ul style={{ paddingLeft: 18, margin: 0, fontSize: "0.82rem", color: "#475569" }}>
                        <li>Private dining rooms &bull; Sake pairing program &bull; Uwajima raw &amp; cooked styles</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 7. FOUR-PHASE INTERNATIONAL ROLLOUT ROADMAP */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(217, 119, 6, 0.12)", border: "1px solid rgba(217, 119, 6, 0.35)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#b45309", fontWeight: 700 }}>INTERNATIONAL EXPANSION STRATEGY</span>
                  </div>
                  <h2>Kadoya 4-Phase International Rollout Roadmap</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Kadoya&apos;s presentation defines a low-risk, stage-gate international growth pathway:
                  </p>

                  <div className="kadoya-roadmap-grid">
                    <div className="kadoya-roadmap-step">
                      <span className="kadoya-step-badge">PHASE 1</span>
                      <h4 style={{ margin: "4px 0 6px 0", fontSize: "1rem" }}>Pop-Up / Pilot Entry</h4>
                      <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                        Department store food fairs, pop-up events, or culinary proof-of-concept tests to gauge local consumer taste acceptance.
                      </p>
                    </div>

                    <div className="kadoya-roadmap-step">
                      <span className="kadoya-step-badge">PHASE 2</span>
                      <h4 style={{ margin: "4px 0 6px 0", fontSize: "1rem" }}>Menu Licensing</h4>
                      <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                        Supplying proprietary golden dashi to established restaurant groups to test Tai-meshi dishes on existing restaurant menus with zero capital expenditure.
                      </p>
                    </div>

                    <div className="kadoya-roadmap-step">
                      <span className="kadoya-step-badge">PHASE 3</span>
                      <h4 style={{ margin: "4px 0 6px 0", fontSize: "1rem" }}>Flagship Franchise</h4>
                      <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                        Opening the first dedicated &quot;Tai to Kome&quot; standalone restaurant in a prime retail location (Hong Kong, Taipei, or Bangkok).
                      </p>
                    </div>

                    <div className="kadoya-roadmap-step">
                      <span className="kadoya-step-badge">PHASE 4</span>
                      <h4 style={{ margin: "4px 0 6px 0", fontSize: "1rem" }}>Master Franchise</h4>
                      <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                        Territorial multi-unit licensing and sub-franchise rights granted to proven regional F&amp;B conglomerates across national territories.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 8. ILLUSTRATIVE UNIT ECONOMICS & COMPLIANCE DISCLAIMER */}
                <div className="content-card" style={{ marginTop: 24, border: "2px solid #f59e0b", background: "#fffdfa" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(217, 119, 6, 0.15)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#b45309", fontWeight: 700 }}>ILLUSTRATIVE UNIT ECONOMICS (SUPPLIER MODEL)</span>
                  </div>
                  <h2>Illustrative Restaurant Unit Economics</h2>
                  <p style={{ fontSize: "0.92rem", color: "#475569", margin: "4px 0 16px 0" }}>
                    The supplier presentation outlines the following indicative performance model for a standard Asian shopping mall restaurant:
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 16 }}>
                    <div style={{ background: "#ffffff", padding: 14, borderRadius: 8, border: "1px solid #fde68a", textAlign: "center" }}>
                      <span style={{ fontSize: "0.8rem", color: "#78350f", fontWeight: 600 }}>MONTHLY GROSS REVENUE</span>
                      <strong style={{ display: "block", fontSize: "1.25rem", color: "#b45309", marginTop: 4 }}>JPY 7M &ndash; 10M</strong>
                      <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>Approx. USD 45k&ndash;65k / month</span>
                    </div>

                    <div style={{ background: "#ffffff", padding: 14, borderRadius: 8, border: "1px solid #fde68a", textAlign: "center" }}>
                      <span style={{ fontSize: "0.8rem", color: "#78350f", fontWeight: 600 }}>OPERATING PROFIT MARGIN</span>
                      <strong style={{ display: "block", fontSize: "1.25rem", color: "#b45309", marginTop: 4 }}>~15% Target</strong>
                      <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>After local prime food &amp; labor costs</span>
                    </div>

                    <div style={{ background: "#ffffff", padding: 14, borderRadius: 8, border: "1px solid #fde68a", textAlign: "center" }}>
                      <span style={{ fontSize: "0.8rem", color: "#78350f", fontWeight: 600 }}>ESTIMATED PAYBACK PERIOD</span>
                      <strong style={{ display: "block", fontSize: "1.25rem", color: "#b45309", marginTop: 4 }}>2 &ndash; 3 Years</strong>
                      <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>Subject to fit-out capex &amp; lease terms</span>
                    </div>
                  </div>

                  <div style={{ padding: "12px 16px", background: "#fef3c7", borderRadius: "8px", borderLeft: "4px solid #d97706" }}>
                    <p style={{ margin: 0, fontSize: "0.84rem", lineHeight: 1.6, color: "#92400e" }}>
                      ⚠️ <strong>Mandatory Financial Compliance Disclaimer:</strong> Figures presented above are illustrative planning models supplied by Kadoya Co., Ltd. for conceptual discussion. They do not constitute a financial performance representation, profit guarantee, or binding contractual statement. Actual revenues, operating margins, buildout capital expenditures, and payback horizons will vary significantly depending upon host market real estate rental costs, local labor rates, import duties, exchange rates, and business execution. Complete franchise disclosure information and terms are made available exclusively to qualified candidates under Non-Disclosure Agreement (NDA) during commercial due diligence.
                    </p>
                  </div>
                </div>

                {/* 9. TARGET FRANCHISEE PROFILES & PRIORITY TERRITORIES */}
                <div className="content-card" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(217, 119, 6, 0.12)", border: "1px solid rgba(217, 119, 6, 0.35)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#b45309", fontWeight: 700 }}>TERRITORY &amp; APPLICANT QUALIFICATION</span>
                  </div>
                  <h2>Prioritized Asian Territories &amp; Ideal Franchisee Criteria</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 14 }}>
                    <div>
                      <h4 style={{ margin: "0 0 10px 0", fontSize: "1rem", color: "#0f172a" }}>Priority Expansion Markets:</h4>
                      <ul style={{ paddingLeft: 18, margin: 0, fontSize: "0.88rem", lineHeight: 1.7, color: "#334155" }}>
                        <li>🎯 <strong>Hong Kong:</strong> High-density Japanese dining appreciation, shopping mall dining hubs.</li>
                        <li>🎯 <strong>Taiwan:</strong> Deep affinity for authentic Japanese cuisine, established clay-pot and rice dining culture.</li>
                        <li>🎯 <strong>Thailand (Bangkok):</strong> Major Japanese food dining capital, booming mall restaurant scene.</li>
                        <li>🌏 <strong>Secondary Evaluation:</strong> Singapore, Indonesia, Malaysia, Philippines, and Vietnam.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 style={{ margin: "0 0 10px 0", fontSize: "1rem", color: "#0f172a" }}>Ideal Partner Profile:</h4>
                      <ul style={{ paddingLeft: 18, margin: 0, fontSize: "0.88rem", lineHeight: 1.7, color: "#334155" }}>
                        <li>✓ Established multi-unit restaurant operators with proven Asian operating track record.</li>
                        <li>✓ Retail conglomerates and department store hospitality divisions.</li>
                        <li>✓ Airport and railway transit concession operators.</li>
                        <li>✓ Financial capacity to fund store fit-out and multi-unit territory development.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 10. FREQUENTLY ASKED QUESTIONS */}
                <div className="content-card" id="kadoya-faqs" style={{ marginTop: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(217, 119, 6, 0.12)", border: "1px solid rgba(217, 119, 6, 0.35)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
                    <span style={{ fontSize: "0.8rem", color: "#b45309", fontWeight: 700 }}>QUESTIONS &amp; ANSWERS</span>
                  </div>
                  <h2>Frequently Asked Questions About Kadoya (Tai to Kome)</h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", margin: "4px 0 16px 0" }}>
                    Essential information regarding the concept, dashi supply, menu adaptation, and franchise partnership:
                  </p>

                  <div style={{ marginTop: 16 }}>
                    {kadoyaFaqs.map((faq, idx) => (
                      <details key={idx} className="nippon-faq-item" open={idx === 0} style={{ borderColor: "#fde68a" }}>
                        <summary className="nippon-faq-question" style={{ color: "#92400e" }}>
                          <span>{idx + 1}. {faq.question}</span>
                          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>▼</span>
                        </summary>
                        <div className="nippon-faq-answer">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
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
                  {opportunity.documentsAvailable.map((document) => {
                    const isCeleblePdf = opportunity.slug === "celeble-non-alcoholic-sparkling-wine-distribution" && document.includes("Product Introduction Deck");
                    const isEiwaPdf = opportunity.slug === "eiwa-japanese-food-ingredients-global-distribution" && (document.includes("Product Catalog") || document.includes("Catalog"));
                    const isKadoyaPdf = opportunity.slug === "kadoya-tai-to-kome-japanese-restaurant-franchise" && (document.includes("Franchise Presentation") || document.includes("FC presentation"));
                    return (
                      <div className="document-item" key={document}>
                        <span className="pdf-icon">▣</span>
                        {isCeleblePdf ? (
                          <a href="/downloads/celeble-product-introduction-balance-co.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit", fontWeight: 600 }}>
                            {document} (Download PDF ↗)
                          </a>
                        ) : isEiwaPdf ? (
                          <a href="/downloads/eiwa-holdings-export-product-catalog.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit", fontWeight: 600 }}>
                            {document} (Download PDF ↗)
                          </a>
                        ) : isKadoyaPdf ? (
                          <a href="/downloads/kadoya-tai-to-kome-franchise-presentation.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit", fontWeight: 600 }}>
                            {document} (Download PDF ↗)
                          </a>
                        ) : (
                          document
                        )}
                      </div>
                    );
                  })}
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

            <div id="inquire">
              <InquiryForm oppTitle={opportunity.title} oppSlug={opportunity.slug} source={isJip ? "JIP Japan" : "General"} />
            </div>
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

