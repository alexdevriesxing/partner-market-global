export const site = {
  name: "Partner Market Global",
  domain: "partner-market-global2.pages.dev",
  url: "https://partner-market-global2.pages.dev",
  tagline: "Curated. Verified. Global.",
  description:
    "Partner Market Global is a curated B2B showcase for import, export, distribution, licensing, private label and franchise opportunities from ambitious companies looking for qualified international partners.",
  email: "listings@partnermarketglobal.com",
  logo: "/assets/partner-market-global-logo.svg",
  defaultOgImage: "/assets/homepage-hero.webp",
  operator: {
    name: "Alex de Vries",
    company: "De Vries Sales Consultancy",
    url: "https://www.devriessalesconsultancy.com"
  }
};

export type Opportunity = {
  id: string;
  slug: string;
  title: string;
  type: string;
  sector: string;
  originCountry: string;
  targetMarkets: string[];
  heroImage: string;
  cardImage: string;
  summary: string;
  description: string;
  companyBackground: string;
  productDetails: string;
  marketOpportunity: string;
  partnerProfile: string;
  commercialModel: string;
  territoryAvailability: string;
  investmentRequirement: string;
  credentials: string[];
  verificationBadges: string[];
  documentsAvailable: string[];
  risks: string;
  status: string;
  featured: boolean;
  brand?: string;
  company?: string;
  seoKeywords?: string[];
  imageAlt?: string;
  exclusivity?: string;
  sourcePartner?: string;
};

import jipOpportunitiesRaw from "./jip-opportunities.json";

interface JipRaw {
  id: string;
  slug: string;
  sourcePartner: string;
  company: string;
  brand: string;
  title: string;
  category: string;
  subCategory?: string;
  opportunityType: string[];
  marketRegions: string[];
  targetPartners: string[];
  publicSummary: string;
  partnerProfile?: string;
  keyStrengths: string[];
  statusPublic?: string;
  priority?: string;
  privateProgressNote?: string;
  seoKeywords?: string[];
  imageFile: string;
  heroImageFile?: string;
  imageAlt: string;
  imagePath: string;
  imageSourcePage?: string;
  imageSourceLocalOriginal?: string;
  isRegulated?: boolean;
  regulatoryNote?: string;
  ipRiskNote?: string;
  exclusivity?: string;
}

const mappedJipOpportunities: Opportunity[] = (jipOpportunitiesRaw as unknown as JipRaw[]).map((jip) => {
  const originCountry = jip.company === "Chinese Manufacturer Products" ? "China" : "Japan";
  const formattedType = Array.isArray(jip.opportunityType) ? jip.opportunityType.join(" / ") : jip.opportunityType;

  if (jip.slug === "yachiyo-mengyo-handa-somen-eu-distribution") {
    return {
      id: jip.id,
      slug: jip.slug,
      sourcePartner: jip.sourcePartner || "JIP Japan",
      title: "Yachiyo Mengyo Organic Handa Somen & Thin Udon EU Distribution Opportunity",
      type: formattedType,
      sector: jip.category + (jip.subCategory ? ` / ${jip.subCategory}` : ""),
      originCountry: "Japan",
      targetMarkets: jip.marketRegions || ["European Union", "France", "Spain", "Other qualified EU markets"],
      heroImage: "/images/opportunities/yachiyo/yachiyo-hero-noodles.webp",
      cardImage: "/images/opportunities/yachiyo/yachiyo-hero-noodles.webp",
      summary: "Japanese noodle manufacturer Yachiyo Mengyo is seeking EU importers, distributors, retail buyers and foodservice partners for its hand-stretched Handa Somen and thin udon made with carefully selected Japanese ingredients, including Organic and Halal-certified products.",
      description: "Yachiyo Mengyo Co., Ltd. is seeking qualified European importers, distributors, retailers and foodservice partners to expand the EU presence of its traditional hand-stretched Handa Somen and thin udon noodles. Its portfolio combines regional Japanese noodle-making heritage with carefully selected domestic ingredients and certification-led international positioning.\n\nHaving established initial export and commercial exposure in France and Spain, Yachiyo Mengyo is now focused on developing sustainable, long-term sales channels across the European Union.",
      companyBackground: "Company: Yachiyo Mengyo Co., Ltd. (Soraniwa Group)\nEstablished: 2014\nHeadquarters: Tokushima Prefecture, Japan\nBusiness: Noodle manufacturing\nOfficial website: https://tenobemen.com\nIntroduced through: Japan Industrial Promotion Inc. / JIP Japan",
      productDetails: "Handa Somen & Thin Udon Lineup:\n- Handa Soumen Yachiyo: Traditional hand-stretched Handa Somen using Hokkaido wheat, Naruto Tokushima sea salt, and domestic rice bran oil.\n- Organic Yachiyo: Organic Handa Somen made with 100% organic Hokkaido wheat and additive-free formulation.\n- Handa Hosoudon (Thin Udon): Thin udon format combining udon-like bite with versatile preparation options.\n- Frozen Handa Somen Noodles Yachiyo: Frozen format designed for convenient foodservice and restaurant applications.\n\nCertifications & Standards: Organic JAS, ISO 22000, Halal Certification, and Vegan-compatible recipes.",
      marketOpportunity: "European demand for authentic Japanese cuisine, organic specialty items, Halal products, and high-quality plant-based noodles creates strong growth opportunities across retail, HORECA, and e-commerce.\n\nWith existing commercial testing in France and Spain, Yachiyo Mengyo provides EU distributors with a unique, high-margin Japanese food line with clear certification differentiation.",
      partnerProfile: "Best suited to EU food importers, national and regional distributors, Japanese and Asian food wholesalers, organic-food distributors, Halal-product distributors, premium supermarket buyers, Japanese specialty retailers, foodservice and HORECA distributors, restaurant supply companies, e-commerce importers, and confirmed private-label buyers.",
      commercialModel: "Importer, distributor, wholesale, retail, HORECA, and e-commerce partnership models.\n\nMOQ, wholesale pricing, lead times, territory availability, exclusivity rights, logistics, and promotional support will be discussed after partner qualification.",
      territoryAvailability: "European Union (France and Spain currently served as test markets; open for broader EU territory development). Exclusivity potentially available by territory subject to qualification.",
      investmentRequirement: "Minimum order quantities (MOQs), landed cost calculations, and initial inventory requirements will be discussed upon qualified inquiry. Available upon qualified inquiry.",
      credentials: [
        "Traditional hand-stretched Handa Somen",
        "Approximately 300 years of regional noodle heritage",
        "Distinctive thickness and firm, chewy texture",
        "Smooth \"nodogoshi\" eating experience",
        "Japanese ingredient positioning",
        "Organic JAS certification",
        "ISO 22000 certification as supplied in the project brief",
        "Halal certification",
        "Vegan-compatible recipes",
        "Existing France and Spain export experience",
        "Retail, HORECA and e-commerce applications"
      ],
      verificationBadges: [
        "Client Opportunity",
        "JIP Japan Vetted",
        "EU Distribution",
        "Organic",
        "Halal",
        "Vegan Compatible",
        "Retail",
        "HORECA",
        "E-commerce"
      ],
      documentsAvailable: [
        "Company presentation",
        "Product catalogue",
        "Product specifications",
        "Ingredient information",
        "Certification documentation",
        "Export and regulatory documentation",
        "Packaging information",
        "Wholesale and MOQ details"
      ],
      risks: "EU and national food-import requirements apply. Product labels, allergens, nutritional declarations and language requirements must be verified per market. Organic and Halal claims must match the exact certified SKU and certification scope. Importers must verify duties, customs classification and food-safety documentation. Exclusivity and territory rights are subject to contract.",
      status: "Active opportunity / EU channel expansion",
      featured: true,
      brand: "Handa Somen / Thin Udon Yachiyo",
      company: "Yachiyo Mengyo Co., Ltd.",
      seoKeywords: [
        "Japanese noodle distributor Europe",
        "Handa Somen EU distributor",
        "Japanese thin udon importer",
        "Organic Japanese noodles wholesale",
        "Halal Japanese noodles Europe",
        "Yachiyo Mengyo distributor",
        "Tokushima noodle manufacturer",
        "Japanese food import opportunity"
      ],
      imageAlt: "Yachiyo Mengyo Organic Handa Somen noodle dish with traditional Japanese chopsticks and dipping sauce",
      exclusivity: "Potentially available by territory, subject to qualification and commercial agreement"
    };
  }

  if (jip.slug === "nittoh-japanese-dollies-utility-carts-distribution") {
    return {
      id: jip.id,
      slug: jip.slug,
      title: jip.title,
      type: formattedType,
      sector: jip.category + (jip.subCategory ? ` / ${jip.subCategory}` : ""),
      originCountry,
      targetMarkets: jip.marketRegions || [],
      heroImage: `/images/opportunities/${jip.heroImageFile || jip.imageFile}`,
      cardImage: `/images/opportunities/${jip.imageFile}`,
      summary: jip.publicSummary || "",
      description: "Nittoh Co., Ltd. is an established Japanese manufacturer seeking qualified international partners for its range of commercial and household dollies, utility carts and interlocking flat platforms.\n\nThe company is particularly interested in developing international business in the retail, home-improvement, tool-distribution, e-commerce and hotel sectors.\n\nIts proposed product range includes plastic interlocking flat dollies that can be connected and stacked for efficient transport and storage, together with premium carts suitable for professional, commercial and luxury-hotel environments.\n\nNittoh combines product planning, research and development, engineering, plastic moulding, manufacturing, quality control and shipping within an integrated production system. This enables the company to develop functional products while maintaining control over design, cost, quality and production consistency.",
      companyBackground: "Company: Nittoh Co., Ltd. / NITTO Co., Ltd.\nEstablished: 1953\nHeadquarters: Kasugai City, Aichi Prefecture, Japan\nPartner-provided annual revenue: Approximately JPY 7 billion\nBusiness activities: Industrial machinery components, amusement-machine component assembly, plastic product planning and manufacturing, household products, dollies and utility carts.\n\nOfficial website: https://www.nittoh.com\n\n(Annual revenue figure was provided by the opportunity owner.)",
      productDetails: "Plastic interlocking flat dollies:\n- Modular platforms that can be connected for larger loads.\n- Stackable or nestable storage potential depending on the model.\n- Suitable for retail stock movement, offices, workshops, warehouses and household use.\n- Designed around practical mobility, handling and space efficiency.\n\nCommercial and hotel carts:\n- Professional carts for hotel, retail and commercial environments.\n- Potential use as operational equipment or premium store fixtures.\n- Suitable for hospitality procurement discussions.\n- Product configuration and design options subject to model availability.",
      marketOpportunity: "International retailers, hotels, offices, warehouses and e-commerce buyers increasingly require mobility products that combine compact storage, reliable handling, practical design and professional presentation.\n\nNittoh offers potential partners access to an established Japanese manufacturer with experience serving demanding domestic retail and commercial channels.\n\nThe opportunity is particularly relevant to partners that can:\n- Import and warehouse commercial products.\n- Sell into retail or professional channels.\n- Present technical and commercial product information locally.\n- Manage product compliance and labelling.\n- Develop B2B sales to hospitality or institutional buyers.\n- Support e-commerce fulfilment and after-sales communication.\n- Build a sustainable territory development plan.",
      partnerProfile: jip.partnerProfile || "",
      commercialModel: "Potential structures may include:\n- National or regional distribution.\n- Wholesale supply.\n- Retail purchasing.\n- E-commerce distribution.\n- Hotel or hospitality procurement.\n- Commercial project supply.\n- Non-exclusive market testing followed by broader territory discussions.\n\nPricing, samples, minimum orders, product availability, delivery arrangements, branding, support and possible exclusivity will be discussed after partner qualification.",
      territoryAvailability: "Selected international markets",
      investmentRequirement: "Initial samples, order volumes, landed-cost calculations, product selection and market-launch requirements will be discussed with qualified partners. No minimum order or investment amount is published until confirmed.",
      credentials: jip.keyStrengths || [],
      verificationBadges: ["Client Opportunity", "JIP Japan Vetted", "Distribution Opportunity", "Retail & HORECA"],
      documentsAvailable: [
        "Company profile",
        "Product catalogue",
        "Product specifications",
        "Opportunity brief",
        "Approved product photography",
        "Export and packaging information",
        "Commercial terms on request",
        "Customer references subject to approval",
        "Samples subject to discussion"
      ],
      risks: "Product specifications and load ratings must be confirmed by model. Local product standards, safety requirements and labelling must be assessed. Freight economics may vary significantly by product dimensions and order quantity. Import duties, product liability and warranty arrangements differ by market. Customer references and shipment figures require confirmation. Territory rights and exclusivity are not guaranteed. Prospective partners should validate landed costs before committing to a launch. Approved image and trademark usage must be agreed.",
      status: jip.statusPublic || "Active outreach",
      featured: true,
      brand: jip.brand,
      company: jip.company,
      seoKeywords: jip.seoKeywords,
      imageAlt: jip.imageAlt,
      exclusivity: "Subject to discussion by territory",
      sourcePartner: jip.sourcePartner || "JIP Japan"
    };
  }

  if (jip.slug === "ichiban-ken-indonesia-master-franchise") {
    return {
      id: jip.id,
      slug: jip.slug,
      sourcePartner: jip.sourcePartner || "JIP Japan",
      title: jip.title,
      type: formattedType,
      sector: jip.category + (jip.subCategory ? ` / ${jip.subCategory}` : ""),
      originCountry,
      targetMarkets: jip.marketRegions || [],
      heroImage: `/images/opportunities/${jip.heroImageFile || jip.imageFile}`,
      cardImage: `/images/opportunities/${jip.imageFile}`,
      summary: jip.publicSummary || "",
      description: "Best More Co., Ltd., operator of the Japanese ramen brand Ichiban-ken, is seeking a qualified Indonesian franchise partner to introduce and develop the concept in Indonesia.\n\nIchiban-ken specializes in matured tonkotsu ramen built around a rich, creamy pork-bone soup with a comparatively smooth finish and limited strong odour. This positioning can give the concept broader appeal than tonkotsu formats that rely primarily on an extremely heavy or intensely aromatic broth.\n\nThe brand’s offer extends beyond ramen. Popular complementary dishes such as yakimeshi fried rice and champon-style noodles can support a broader dining occasion, higher menu variety and stronger differentiation within the Japanese casual-dining category.\n\nThe opportunity is intended for an experienced Indonesian F&B operator capable of launching, localizing and scaling a Japanese restaurant concept while preserving core brand and food-quality standards.",
      companyBackground: "Company: Best More Co., Ltd.\nBrand: Ichiban-ken\nBusiness: Operation and development of Japanese ramen restaurants\nOrigin: Japan\nTarget territory: Indonesia\n\nOfficial website: https://ichibanken.jp/\n\n(Information and store counts were supplied by the brand owner.)",
      productDetails: "Core ramen proposition:\n- Matured tonkotsu ramen made from pork-bone broth, specialist noodles and a carefully developed flavour profile.\n- Richness and creaminess with a smoother finish and reduced overpowering odour.\n- Broad customer accessibility and authentic Japanese restaurant presentation.\n\nBroader menu proposition:\n- Tonkotsu ramen, yakimeshi Japanese fried rice, champon-style mixed noodles, and side dishes.\n- Potential for menu variety across different dining occasions.\n\n(Note: The concept is pork-based and is not halal.)",
      marketOpportunity: "Indonesia has a large and sophisticated urban foodservice market with established consumer interest in Japanese cuisine. The opportunity is presented as a targeted non-halal Japanese restaurant proposition rather than a mass-market halal concept.\n\nPotential location formats may include:\n- Premium and upper-mid-market shopping malls.\n- Lifestyle centres.\n- High-footfall urban restaurant districts.\n- Mixed-use developments.\n- Standalone locations in major cities.\n- Food-and-beverage clusters with established Japanese concepts.",
      partnerProfile: jip.partnerProfile || "",
      commercialModel: "The anticipated structure is a master-franchise, area-development or comparable country-partner agreement for Indonesia.\n\nCommercial discussions may cover territory rights, initial franchise fees, per-store fees, royalties, marketing contributions, opening and design standards, required development schedules, training support, approved ingredients supply, local sourcing permissions, quality control, and menu localization.",
      territoryAvailability: "Indonesia",
      investmentRequirement: "Franchise, restaurant-development and multi-unit rollout investment will be required. Franchise fees, royalties, opening budgets, development commitments and territory terms will be disclosed to qualified candidates. No estimated figures are published until confirmed.",
      credentials: jip.keyStrengths || [],
      verificationBadges: ["Client Opportunity", "JIP Japan Vetted", "Master Franchise", "Indonesia Opportunity", "Restaurant Rollout"],
      documentsAvailable: [
        "Company and brand profile",
        "Franchise opportunity brief",
        "Restaurant concept presentation",
        "Menu overview",
        "Existing-market information",
        "Store-format guidance",
        "Franchise requirements",
        "Commercial terms after qualification",
        "Training and operational support information",
        "Supply-chain requirements",
        "Approved brand and restaurant imagery"
      ],
      risks: "The core concept is based on pork-bone tonkotsu broth and must not be marketed as halal or pork-free. Target-customer segmentation is critical in Indonesia. Local foodservice, import, employment, tax and franchise regulations require professional review. Ingredient sourcing and recipe consistency must be confirmed. Store investment and rollout commitments have not yet been published. Regional store-count claims require confirmation. Territory rights depend on franchisor approval and contract negotiation. Site economics must be tested before committing to multi-unit rollout.",
      status: jip.statusPublic || "Active outreach",
      featured: true,
      brand: jip.brand,
      company: jip.company,
      seoKeywords: jip.seoKeywords,
      imageAlt: jip.imageAlt,
      exclusivity: "Potential master-franchise or territory rights are subject to qualification and contract negotiation."
    };
  }

  return {
    id: jip.id,
    slug: jip.slug,
    sourcePartner: jip.sourcePartner || "JIP Japan",
    title: jip.title,
    type: formattedType,
    sector: jip.category + (jip.subCategory ? ` / ${jip.subCategory}` : ""),
    originCountry,
    targetMarkets: jip.marketRegions || [],
    heroImage: `/images/opportunities/${jip.heroImageFile || jip.imageFile}`,
    cardImage: `/images/opportunities/${jip.heroImageFile || jip.imageFile}`,
    summary: jip.publicSummary || "",
    description: jip.publicSummary || "",
    companyBackground: `Company: ${jip.company}\nBrand: ${jip.brand}\n\n${jip.company} is an established company in the ${jip.category} sector, operating under the brand ${jip.brand}. Through the JIP Japan opportunity network, they are seeking qualified international partners to expand their reach.`,
    productDetails: `The ${jip.brand} portfolio focuses on ${jip.subCategory || jip.category}. Product specifications, MOQs, certification documents, and wholesale pricing details are available upon qualification.`,
    marketOpportunity: `${jip.brand} is targeting expansion in ${(jip.marketRegions || []).join(", ")}. This opportunity presents a strong commercial potential for partners capable of handling local distribution, retail, or operations.`,
    partnerProfile: jip.partnerProfile || "Best fit for established partners with active networks, regulatory capabilities, and market access in the target regions.",
    commercialModel: `Partnership Type: ${formattedType}. The specific commercial agreement, territory rights, and commission structure will be discussed upon qualified inquiry.`,
    territoryAvailability: (jip.marketRegions || []).join(", "),
    investmentRequirement: jip.opportunityType.includes("Master Franchise") || jip.opportunityType.includes("Franchise")
      ? "Franchise investment and development requirements apply. Terms will be discussed during qualification."
      : "Minimum order quantities (MOQs) or working capital requirements apply depending on the target territory. Details provided on inquiry.",
    credentials: jip.keyStrengths || [],
    verificationBadges: ["Client Opportunity", "JIP Japan Vetted"].concat(jip.opportunityType || []),
    documentsAvailable: ["Company Profile", "Opportunity Brief", "Regulatory Details on Inquiry"],
    risks: jip.regulatoryNote || jip.ipRiskNote || "Standard import duties, labeling compliance, and market-specific regulations apply. Partners should verify local compliance.",
    status: jip.statusPublic || "Open for inquiries",
    featured: jip.priority === "High" || jip.priority === "Medium",
    brand: jip.brand,
    company: jip.company,
    seoKeywords: jip.seoKeywords,
    imageAlt: jip.imageAlt,
    exclusivity: jip.exclusivity || "Possible by territory"
  };
});

const staticOpportunities: Opportunity[] = [
  {
    id: "opp-ralalifood-retort",
    slug: "ralalifood-indonesia-retort-food-distributors-private-label-oem",
    title: "Ralalifood Retort Food Manufacturer Seeking International Distributors and Private Label / OEM Clients",
    type: "Distribution / Private Label / OEM",
    sector: "Food & Beverage / Retort Foods",
    originCountry: "Indonesia",
    targetMarkets: ["Global", "Middle East", "Europe", "ASEAN"],
    heroImage: "/assets/detail-hero-food.webp",
    cardImage: "/assets/opportunity-card-food.webp",
    summary:
      "Indonesian retort food manufacturer looking for international distributors and private label / OEM clients.",
    description:
      "Ralalifood is an Indonesia-based retort food manufacturer seeking qualified international distributors and private label / OEM clients for market expansion.",
    companyBackground:
      "The opportunity is presented for a food manufacturer in Indonesia with a focus on retort food products and international partner development.",
    productDetails:
      "The opportunity can include distributor-ready food products as well as private label or OEM production discussions. Product range, packaging, shelf-life information, certifications and minimum order details are available after qualification.",
    marketOpportunity:
      "Retort food can support convenient, shelf-stable food distribution across retail, foodservice and import channels where local compliance, packaging and partner execution are handled correctly.",
    partnerProfile:
      "Ideal partners are food importers, distributors, retail suppliers, foodservice distributors, private label buyers, brand owners and OEM clients with a clear route to market.",
    commercialModel:
      "Distribution, private label and OEM models are available on inquiry. Territory, exclusivity, pricing, minimum orders and commission terms are agreed case by case.",
    territoryAvailability:
      "Open for selected international territories after qualification.",
    investmentRequirement:
      "Minimum order quantities, launch stock and private label or OEM scope are discussed after inquiry.",
    credentials: ["Client opportunity submitted", "Manufacturer profile available on request", "Distributor inquiries welcome", "Private label / OEM inquiries welcome"],
    verificationBadges: ["Client Opportunity", "Distributor Search", "Private Label / OEM"],
    documentsAvailable: ["Company profile", "Product range overview", "Private label / OEM briefing", "Commercial terms on inquiry"],
    risks:
      "Food import regulations, labelling, certification, shelf-life validation, local registration and distributor compliance must be reviewed per target market.",
    status: "Open for inquiries",
    featured: true,
    exclusivity: "Possible by territory"
  },
  {
    id: "opp-moja-coffee-bali",
    slug: "moja-coffee-bali-indonesian-coffee-brand-international-distributors",
    title: "Moja Coffee Bali Indonesian Coffee Brand Seeking International Distributors",
    type: "Export / Distribution",
    sector: "Coffee / Food & Beverage",
    originCountry: "Indonesia",
    targetMarkets: ["Global", "Europe", "Middle East", "Asia"],
    heroImage: "/assets/opportunity-card-cafe.webp",
    cardImage: "/assets/opportunity-card-cafe.webp",
    summary:
      "Indonesian coffee brand from Bali looking for qualified international distributors.",
    description:
      "Moja Coffee Bali is an Indonesian coffee brand seeking international distributors that can introduce the brand into suitable retail, horeca, specialty food and online channels.",
    companyBackground:
      "The opportunity is presented for an Indonesian coffee brand with Bali positioning and international distribution ambitions.",
    productDetails:
      "Product assortment, packaging formats, wholesale terms, brand materials and sample options are available after distributor qualification.",
    marketOpportunity:
      "International demand for origin-led coffee brands creates room for distributors that can position Indonesian coffee through retail, horeca, specialty, gifting and e-commerce channels.",
    partnerProfile:
      "Ideal partners are coffee importers, food and beverage distributors, specialty retail suppliers, horeca distributors, marketplace operators and regional brand builders.",
    commercialModel:
      "Importer or distributor model with territory terms, launch plan, order volumes and commission terms agreed on inquiry.",
    territoryAvailability:
      "Open for selected international markets after distributor qualification.",
    investmentRequirement:
      "Initial order volume, sample process, wholesale pricing and launch support are discussed after inquiry.",
    credentials: ["Client opportunity submitted", "Brand information available on request", "Distributor inquiries welcome"],
    verificationBadges: ["Client Opportunity", "Coffee Brand", "Distributor Search"],
    documentsAvailable: ["Brand profile", "Product overview", "Distributor terms on inquiry", "Marketing materials on request"],
    risks:
      "Food import rules, coffee labelling, shelf-life, customs requirements and local channel economics must be reviewed by each distributor.",
    status: "Open for inquiries",
    featured: true,
    exclusivity: "Possible by territory"
  },
];

export const opportunities: Opportunity[] = [...staticOpportunities, ...mappedJipOpportunities];

export const categories = [
  { title: "Import Opportunities", image: "/assets/import-opportunities.svg", href: "/opportunities?type=import" },
  { title: "Export Opportunities", image: "/assets/export-opportunities.svg", href: "/opportunities?type=export" },
  { title: "Franchise Opportunities", image: "/assets/franchise-opportunities.svg", href: "/opportunities?type=franchise" },
  { title: "Distribution Rights", image: "/assets/distribution-rights.svg", href: "/opportunities?type=distribution" },
  { title: "Licensing & Brand Partnerships", image: "/assets/licensing-partnerships.svg", href: "/opportunities?type=licensing" },
  { title: "Master Franchise Rights", image: "/assets/master-franchise.svg", href: "/opportunities?type=master-franchise" },
  { title: "Country Partner Opportunities", image: "/assets/country-partner.svg", href: "/opportunities?type=country-partner" },
  { title: "Private Label / OEM Opportunities", image: "/assets/private-label-oem.svg", href: "/opportunities?type=oem" }
];

export const trustChecks = [
  ["Business Verification", "Company and registration checked"],
  ["Credential Review", "Licenses, certificates and credentials reviewed"],
  ["Opportunity Assessment", "Market potential and partner profile assessed"],
  ["Document Support", "Key information available on request"],
  ["Secure Inquiries", "Qualified inquiries only via secure platform"]
];

export const commercialPackages = [
  {
    name: "Commission-Based Listing",
    price: "On inquiry",
    recurring: "100% commission based",
    cta: "Discuss Commission Terms",
    features: ["No public fixed listing package", "Commercial scope agreed before launch", "Curated opportunity profile", "Qualified inquiry handling"]
  },
  {
    name: "Qualified Introduction",
    price: "Commission only",
    recurring: "Based on agreed outcomes",
    popular: true,
    cta: "Inquire About Terms",
    features: ["Introductions only after qualification", "Commission trigger defined in writing", "Relevant decision-maker matching", "Transparent follow-up process"]
  },
  {
    name: "Partner Search Support",
    price: "On inquiry",
    recurring: "Commission agreement required",
    cta: "Discuss Commission Terms",
    features: ["Targeted partner search when suitable", "Territory and opportunity scope defined", "No generic upfront package pricing", "Only where legally appropriate"]
  }
];

export const curationSteps = [
  ["1", "Submit Application", "Tell us about your opportunity."],
  ["2", "Review & Verification", "We review and verify your business and documents."],
  ["3", "Profile Creation", "We build your premium opportunity profile."],
  ["4", "Go Live", "Your opportunity goes live on our platform."],
  ["5", "Receive Inquiries", "Connect with qualified international partners."]
];
