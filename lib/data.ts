export const site = {
  name: "Partner Market Global",
  domain: "www.partnermarketglobal.com",
  url: "https://www.partnermarketglobal.com",
  tagline: "Curated. Verified. Global.",
  description:
    "Partner Market Global is a curated B2B showcase for import, export, distribution, licensing, private label and franchise opportunities from ambitious companies looking for qualified international partners.",
  email: "info@partnermarketglobal.com",
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
  isPinned?: boolean;
  featuredOrder?: number;
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

  if (jip.slug === "sonic-friends-europe-2027") {
    return {
      id: jip.id,
      slug: jip.slug,
      sourcePartner: jip.sourcePartner || "Japan Industrial Promotion Inc.",
      title: "SONIC & FRIENDS — European Retail & Distribution Opportunity",
      type: "Distribution / Retail / Wholesale / Import",
      sector: "Toys & Licensed Merchandise / Character Goods & Gaming Pop Culture",
      originCountry: "Japan",
      targetMarkets: ["Europe", "United Kingdom", "France", "Germany", "Spain", "Belgium", "Italy", "Portugal"],
      heroImage: "/images/opportunities/sonic-friends-europe-2027-hero.webp",
      cardImage: "/images/opportunities/sonic-friends-europe-2027.webp",
      summary: "SEGA introduces a new character merchandise collection bringing Sonic and his friends to life in an exceptionally cute, approachable visual style. PartnerMarketGlobal is working with Japan Industrial Promotion to identify qualified European retail and distribution partners for the 2027 launch.",
      description: "SONIC & FRIENDS is a character series created by SEGA that reimagines Sonic and his companions through a softer, highly stylized and exceptionally cute design. The collection expands the merchandising potential of Sonic beyond the franchise's traditional audience, appealing to existing Sonic fans, gamers, collectors, children, families, female consumers, kawaii/character-goods consumers, gift buyers, and lifestyle shoppers.\n\nStrategically timed for the March–April 2027 European consumer attention window surrounding the major Sonic movie theatrical launch and Sonic 35th Anniversary live tour, product availability from Shenzhen warehouse is scheduled for January 2027 based on production orders placed around early September 2026.",
      companyBackground: "Principal Representative: Japan Industrial Promotion Inc. (Daiki Fukaura)\nBrand Owner: SEGA Corporation\nCategory: Official Licensed Character Merchandise\nFacilitated by: PartnerMarketGlobal European Market Development",
      productDetails: "The SONIC & FRIENDS Core Range includes:\n- SONIC & FRIENDS Mascot (140–160 mm): Sonic, Tails, Knuckles, Amy, Shadow, Rouge, Silver, Chao, Dr. Eggman (48 pcs/carton)\n- SONIC & FRIENDS Plush (Medium, 240 mm): Sonic, Tails, Amy, Shadow (12 pcs/carton)\n- SONIC & FRIENDS Cushion — Sonic (W300×H250×D150 mm, 24 pcs/carton)\n- SONIC & FRIENDS Plush — Large Sonic (W280×H400×D200 mm, 6 pcs/carton)\n- SONIC & FRIENDS Sleeping Sonic (W350×H200×D150 mm, 12 pcs/carton)\n\nAdditional Collaborative Line: SONIC & FRIENDS × Sanrio characters (strap figures, Fuwa Fuwa figures, mascot plush, and medium plush featuring Hello Kitty, Cinnamoroll, Kuromi, My Melody, Hangyodon, and Pompompurin).",
      marketOpportunity: "European demand for licensed entertainment merchandise and Japanese character goods is at an all-time high. With the Sonic movie franchise surpassing $1 Billion+ in global box office revenue (UK $26.3M, Germany $22.8M, France $13.6M, Spain $6.4M), the March 2027 European theatrical premiere across Belgium, Germany, Italy, Portugal, Spain, UK, and France creates a massive consumer demand wave for retailers and distributors.",
      partnerProfile: "Best suited to European national retail chains, toy buyers, gaming merchandise buyers, licensed merchandise buyers, character-goods buyers, gift buyers, distributors, wholesalers, importers, specialist retailers, entertainment retailers, pop-culture stores, department stores, and online retailers across the UK, France, Germany, Spain, Benelux, Italy, and Portugal.",
      commercialModel: "Wholesale distribution, national retail listings, and importer agreements on a Shenzhen FOB commercial basis. Standard MOQs are approximately 3,000 pieces per SKU for core lines. Gated access to confidential wholesale price lists, carton specs, and SRP data upon qualified inquiry.",
      territoryAvailability: "Europe (Priority outreach: United Kingdom, France, Germany, Spain, Belgium, Italy, Portugal; open for pan-European distribution discussions).",
      investmentRequirement: "Shenzhen FOB basis; core line MOQs typically ~3,000 pcs per SKU. Detailed wholesale pricing, volume discount structures, carton dimensions, and logistics terms available upon partner qualification.",
      credentials: [
        "Official SEGA Character IP with 30+ Years Global Legacy",
        "$1 Billion+ Worldwide Sonic Theatrical Box Office Validation",
        "2027 European Movie Release Window Alignment (March 17–24, 2027)",
        "Approachable Kawaii Aesthetic Expanding Beyond Hardcore Gamers",
        "Shenzhen FOB Commercial Logistics with January 2027 Warehouse Availability",
        "Sonic 35th Anniversary European Live Concert Tour (Brussels & Paris)",
        "Complete Assortment: Mascots, Medium Plush, Large Plush, Cushions & Sleeping Plush",
        "Complementary SONIC & FRIENDS × Sanrio Collaboration Range",
        "Facilitated Directly via Japan Industrial Promotion Inc."
      ],
      verificationBadges: [
        "Client Opportunity",
        "JIP Japan Vetted",
        "SEGA Licensed IP",
        "2027 Movie Window",
        "Retail Chains",
        "Distribution",
        "Wholesale",
        "Time Sensitive"
      ],
      documentsAvailable: [
        "Brand Presentation & Concept Deck",
        "Core Line Product Catalogue & Specifications",
        "Sanrio Collaboration Line Overview",
        "Shenzhen FOB Logistics & Packaging Specifications",
        "Gated Wholesale Pricing & MOQ Schedule (On Qualified Inquiry)",
        "Movie & Tour Activation Calendar"
      ],
      risks: "Third-party intellectual property is owned by SEGA and respective partners. Wholesale pricing and internal line sheets are confidential and provided only to qualified buyers. Commercial orders require timely placement to meet January 2027 Shenzhen FOB production schedules in advance of the March 2027 European theatrical release. Standard European toy safety (CE / UKCA compliance), import duties, and customs clearances apply.",
      status: "Active Opportunity — 2027 Retail Window",
      featured: true,
      featuredOrder: 6,
      brand: "SONIC & FRIENDS / SEGA",
      company: "Japan Industrial Promotion Inc.",
      seoKeywords: [
        "Sonic merchandise distributor Europe",
        "Sonic plush wholesale",
        "SONIC & FRIENDS wholesale",
        "Sonic toys Europe",
        "SEGA merchandise Europe",
        "licensed character merchandise distributor",
        "Sonic retail opportunity",
        "Japanese character merchandise",
        "Sonic plush distributor",
        "Sonic wholesale Europe",
        "Sonic movie merchandise 2027",
        "SEGA Sonic retailer Europe"
      ],
      imageAlt: "SONIC & FRIENDS European Retail & Distribution Opportunity 2027 official SEGA merchandise",
      exclusivity: "Territory or channel distribution agreements discussed on qualified inquiry"
    };
  }

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
      cardImage: `/images/opportunities/${jip.heroImageFile || jip.imageFile}`,
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
      cardImage: `/images/opportunities/${jip.heroImageFile || jip.imageFile}`,
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

  if (jip.slug === "ebara-foods-indonesia-distribution-noodle-partnership") {
    return {
      id: jip.id,
      slug: jip.slug,
      sourcePartner: jip.sourcePartner || "JIP Japan",
      title: jip.title,
      type: formattedType,
      sector: jip.category + (jip.subCategory ? ` / ${jip.subCategory}` : ""),
      originCountry: "Japan",
      targetMarkets: ["Indonesia", "Bali", "Jakarta", "Surabaya"],
      heroImage: `/images/opportunities/${jip.heroImageFile || jip.imageFile}`,
      cardImage: `/images/opportunities/${jip.imageFile}`,
      summary: "EBARA SINGAPORE PTE. LTD., part of Japan’s Ebara Foods Group, is seeking Indonesian foodservice distributors, ramen-ingredient wholesalers, trading companies and noodle manufacturers, with Bali as the initial priority market.",
      description: "EBARA SINGAPORE PTE. LTD., part of the established Japanese seasoning manufacturer Ebara Foods Group, is seeking qualified partners to expand its professional foodservice ingredient business in Indonesia.\n\nThe opportunity is aimed at locally connected B2B distributors, specialist wholesalers, trading companies and noodle manufacturers capable of developing Ebara products as an important core line rather than placing them passively within a large general catalogue.\n\nBali is the initial priority market, followed by selected opportunities elsewhere in Indonesia. Ebara is also open to discussing broader strategic alliances and potential acquisition or M&A opportunities with suitable local businesses.",
      companyBackground: "Ebara Foods Industry, Inc. is a Japanese food manufacturer established in 1958. The group produces and sells seasonings and has a long operating history in sauces, soup products and professional foodservice solutions.\n\nEBARA SINGAPORE PTE. LTD. was established to provide products and services suited to local Southeast Asian markets, promote Japanese sauce and seasoning culture and support the continued expansion of the Ebara brand within the region.\n\nThe group also operates EBARA FOODS MALAYSIA SDN. BHD., supporting its broader presence in Southeast Asia.",
      productDetails: "Proposed Combined Professional Ramen & Noodle-Production Solution:\n\nRamen Soup Solutions:\n- Tori Paitan-style soup\n- Miso ramen soup\n- Tonkotsu-style soup\n- Vegetable or plant-forward ramen soup\n- Other professional Japanese soup bases subject to availability\n\nNoodle-Production Ingredients:\n- Kansui or alkaline noodle agents\n- Ingredients supporting ramen-noodle texture and consistency\n- Soup thickeners and texture-management ingredients\n\nComplementary Professional Foodservice Seasonings:\n\n(Final product availability, formulations, pack sizes, ingredients, certifications, halal status, pricing and minimum order quantities will be confirmed during partner qualification.)",
      marketOpportunity: "Outside Indonesia’s largest distribution centres, reliable access to fresh or frozen specialist ramen noodles can be limited. As a result, some ramen operators produce noodles themselves or source them through smaller local manufacturers.\n\nThis creates an opportunity to connect professional noodle production with compatible soup bases and supporting ingredients. The proposition can help a local distributor or manufacturer offer restaurant customers a more coherent ramen solution instead of selling individual ingredients in isolation.\n\nBali is especially relevant because it has a concentrated hospitality and restaurant sector, a substantial Japanese and international dining presence, independent restaurants that value specialist technical support, local operators supplying several restaurant customers, and a practical environment for testing a focused B2B route to market.",
      partnerProfile: "Priority target partners include:\n1. Specialist B2B & Foodservice Distributors with strong HORECA relationships, active sales coverage, and market-development resources. (MASUYA is explicitly excluded as an active partner).\n2. Ramen-Ingredient Wholesalers supplying ramen outlets, izakayas, hotels, and central kitchens.\n3. Noodle Manufacturers seeking to expand SKU ranges and bundle noodles with soup bases.\n4. Local Trading Companies with Japanese-Indonesian networks and regulatory/import knowledge.\n5. Strategic Investment or M&A Candidates interested in evaluating exploratory partnership, investment, or acquisition.",
      commercialModel: "Potential structures include non-exclusive distribution, territory-based distribution, specialist foodservice wholesaling, trading-company representation, noodle-manufacturing partnerships, co-developed ramen solutions, product bundling, strategic alliances, minority/majority investment, or acquisition subject to evaluation.\n\nTerritory rights, exclusivity, pricing, minimum orders, product selection, and performance expectations will be discussed with qualified candidates.",
      territoryAvailability: "Indonesia (Priority territory: Bali. Secondary territories: Jakarta, Surabaya, and other commercially relevant Indonesian cities).",
      investmentRequirement: "Working capital, local sales capability, warehousing and market-development resources may be required depending on partnership type. Terms agreed during qualification.",
      credentials: jip.keyStrengths || [
        "Established Japanese food-seasoning group",
        "Southeast Asian operating presence through Ebara Singapore",
        "Malaysian group entity also in operation",
        "Dedicated professional foodservice opportunity",
        "Priority launch focus on Bali",
        "Combination of soup bases and noodle-production ingredients",
        "Opportunity to create a specialist ramen-supply proposition",
        "Suitable for distributors that can provide active technical and commercial selling",
        "Potential partnerships with local noodle manufacturers",
        "Potential strategic investment, acquisition or M&A discussions",
        "Opportunity to expand into additional Indonesian territories after market validation"
      ],
      verificationBadges: [
        "Client Opportunity",
        "JIP Japan Vetted",
        "Indonesia",
        "Foodservice Distribution",
        "Noodle Manufacturing",
        "Strategic Partnership",
        "M&A Potential"
      ],
      documentsAvailable: [
        "Company profile",
        "Product portfolio",
        "Professional foodservice catalogue",
        "Product specifications",
        "Ingredient and allergen information",
        "Certification information",
        "Sample and trial information",
        "Commercial opportunity brief",
        "Territory discussion document",
        "Strategic partnership or M&A discussion materials, where applicable",
        "Regulatory information on inquiry"
      ],
      risks: "Product registration and import requirements may apply. Halal status must be assessed SKU by SKU. Non-halal products may require separate handling and communication. Cold-chain capability may be needed for certain partner-developed noodle products. Restaurant trials may be required before commercial rollout. Final product range depends on local compliance and availability. Commercial rights are subject to negotiation. M&A discussions are exploratory and require full due diligence. No commercial success, volume or profitability is guaranteed. Interested parties must perform their own legal, financial and commercial assessment.",
      status: "Active outreach",
      featured: true,
      brand: jip.brand,
      company: jip.company,
      seoKeywords: jip.seoKeywords,
      imageAlt: jip.imageAlt,
      exclusivity: "Subject to territory, partner capability and commercial negotiation"
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

export const izutsuYatsuhashiOpportunity: Opportunity = {
  id: "jip-izutsu-yatsuhashi",
  slug: "izutsu-yatsuhashi-kyoto",
  title: "Izutsu Yatsuhashi — 220 Years of Kyoto Confectionery Tradition",
  type: "Export / Distribution / Luxury Hospitality Supply / Gifting / Retail",
  sector: "Food & Beverage / Traditional Confectionery / Japanese Specialty",
  originCountry: "Japan",
  targetMarkets: ["United States", "Middle East", "Europe", "Asia-Pacific", "Global Hospitality"],
  heroImage: "/images/opportunities/izutsu-yatsuhashi/izutsu-opp-hero.webp",
  cardImage: "/images/opportunities/izutsu-yatsuhashi/izutsu-card.webp",
  summary: "Founded in Kyoto in 1805, Izutsu Yatsuhashi Honpo brings one of Kyoto's traditional confectionery specialties to international hospitality, premium dining, gifting and distribution channels. Its hard-baked Yatsuhashi combines an authentic Kyoto story with an export-friendly 180+ day shelf life.",
  description: "Izutsu Yatsuhashi Honpo Co., Ltd. is presenting an exclusive commercial opportunity for international food importers, specialty distributors, luxury hotel groups, Michelin-starred restaurants, premium cafes, corporate gifting agencies, and retail buyers in the United States, Middle East, Europe, and Asia-Pacific.\n\nFounded in 1805 (Bunka 2) in Gion, Kyoto, Izutsu Yatsuhashi is one of Japan's most historic confectionery houses. While soft raw sweets (nama-yatsuhashi) are restricted by short shelf life, Izutsu's signature hard-baked Yatsuhashi delivers an extraordinary commercial advantage: a guaranteed 180+ day shelf life at room temperature without any artificial preservatives or chemical additives. This makes the product exceptionally well-suited for international maritime container freight, temperature-controlled distribution, luxury hotel turndown amenities, upscale airline service, and premium confectionery retail shelves worldwide.\n\nShaped in the elegant curve of a traditional Japanese koto (harp), Izutsu Yatsuhashi pairs the warming, aromatic spice of natural cinnamon (nikki) with a crisp, light, satisfying crunch. Complemented by an authentic collaboration line with prestigious Uji Matcha producers and dual packaging formats (traditional Kyoto Kabuki gift boxes and contemporary resealable stand-up pouches), Izutsu Yatsuhashi bridges 220 years of Kyoto cultural heritage with modern global gastronomy.",
  companyBackground: "Company: Izutsu Yatsuhashi Co., Ltd. (Izutsu Yatsuhashi Honpo)\nEstablished: 1805 (Bunka 2, Edo Period — 220 Years of Continuous Heritage)\nHeadquarters: Gion, Higashiyama-ku, Kyoto, Japan\nEmployees: Approximately 340\nFlagship Premises: Gion Main Store & Historic Kitaza Cultural Building\nFounding Philosophy: '利益より永続' (Continuity and Trust Over Short-Term Profit)\nFacilitated by: Japan Industrial Promotion Inc. (JIP Japan) & PartnerMarketGlobal International Market Development.",
  productDetails: "The commercial product portfolio features two flagship lines and versatile export packaging formats:\n- Kyoto Specialty Izutsu Yatsuhashi (Traditional Cinnamon Baked): The classic hard-baked confectionery shaped like a Japanese koto harp. Made without additives, offering a delicately curved, crisp texture and aromatic nikki (cinnamon) profile with a 180+ day shelf life.\n- Uji Matcha Yatsuhashi: Layers of rich, velvety Uji matcha green tea dusted over traditional baked Yatsuhashi. Developed in collaboration with premier Uji matcha producers, balancing subtle cinnamon sweetness with refined green tea bitterness.\n- Traditional Kabuki Gift Box Format: Elegant presentation box featuring authentic Edo-period koto artwork, containing individually wrapped sealed twin-packs for freshness, luxury hotel turndown amenities, and premium corporate gifting.\n- Modern Resealable Stand-Up Pouch: Sophisticated foil-lined zip pouch designed for contemporary retail display, high-end cafe counters, specialty grocers, and grab-and-go premium snacking.",
  marketOpportunity: "Western & Middle Eastern Taste Resonance: Natural cinnamon (nikki) is universally celebrated across Western, Middle Eastern, and Asian palate traditions. In Japanese consumer surveys ('Foreigners\' Souvenir Election'), baked Yatsuhashi ranked #1 among international visitors, praised for its crisp crunch and natural pairing with morning coffee and tea.\n\nExport-Ready Economics: A minimum 180-day room-temperature shelf life eliminates the high spoilage risks of fresh sweets, allowing efficient sea freight and extended retail sales windows.\n\nLuxury Hospitality & VIP Amenities: The historic Gion flagship and Kitaza luxury bar offer an exclusive venue for VIP buyer experiences and cultural engagement. Izutsu Yatsuhashi provides five-star hotels and luxury airlines with an authentic, conversation-starting Japanese amenity.\n\nRegulatory & Export Readiness: Fully compliant with international pesticide and food safety regulations, backed by official Japanese MAFF (Ministry of Agriculture, Forestry and Fisheries) export documentation support.",
  partnerProfile: "Best suited to national specialty food importers, Japanese/Asian gourmet distributors, luxury hotel procurement teams, fine dining and Michelin-starred restaurant groups, specialty coffee and tea house chains, corporate gifting specialists, duty-free airport concessionaires, and premium department store food halls.",
  commercialModel: "Exclusive and semi-exclusive territorial distribution, foodservice/hospitality amenity supply, retail distribution, corporate gifting contracts, and bespoke hospitality packaging. Sample assortments, master carton specifications, FOB/CIF pricing, and MAFF export documentation available upon qualified inquiry.",
  territoryAvailability: "United States, Middle East (UAE, Saudi Arabia, Qatar, Kuwait), European Union, United Kingdom, and Asia-Pacific. Territory agreements subject to partner qualification.",
  investmentRequirement: "Master carton packaging, pallet configurations, export shipping schedules, minimum order quantities (MOQs), and landed cost models provided upon qualified commercial inquiry.",
  credentials: [
    "Founded 1805 in Kyoto (220 Years of Artisan Heritage)",
    "Ranked #1 in Japanese Souvenirs Chosen by Foreign Visitors",
    "180+ Day Shelf Life Guaranteed Without Additives",
    "Traditional Koto-Shaped Cinnamon-Baked Formulation",
    "Prestigious Uji Matcha Collaboration Line",
    "Dual Packaging: Luxury Gift Boxes & Modern Stand-Up Pouches",
    "Gion Flagship Store & Historic Kitaza Cultural Center",
    "Compliant with Global Pesticide Standards & Supported by MAFF"
  ],
  verificationBadges: [
    "Featured Opportunity",
    "Client Opportunity",
    "JIP Japan Vetted",
    "Est. 1805 Kyoto",
    "180+ Day Shelf Life",
    "Retail & Hospitality",
    "B2B Distribution"
  ],
  documentsAvailable: [
    "Izutsu Yatsuhashi Company Profile & 1805 Heritage Deck (PDF)",
    "Key Product Lineup & Master Carton Specifications",
    "Uji Matcha Collaboration Overview & Flavor Sheets",
    "180-Day Shelf Life & Temperature Stability Data",
    "Export Compliance, Ingredients & MAFF Documentation",
    "Commercial Wholesale Pricing & MOQ Schedule (On Qualified Inquiry)"
  ],
  risks: "National food-import regulations, labeling compliance, language translations, and customs classifications must be reviewed for each destination country. Product must be stored in cool, dry conditions away from direct sunlight and high humidity to maintain optimal crispness. Commercial exclusivity terms are subject to formal qualification and contract.",
  status: "Active Opportunity — Worldwide Partner Outreach",
  featured: true,
  featuredOrder: 4,
  brand: "Izutsu Yatsuhashi Honpo (井筒八ッ橋本舗)",
  company: "Izutsu Yatsuhashi Co., Ltd.",
  sourcePartner: "JIP Japan",
  seoKeywords: [
    "Izutsu Yatsuhashi distributor",
    "Kyoto confectionery wholesale",
    "Japanese baked confectionery export",
    "Yatsuhashi distributor USA",
    "Yatsuhashi distributor Middle East",
    "Uji matcha confectionery wholesale",
    "Japanese luxury food distributor",
    "Japanese tea sweets wholesale",
    "Kyoto traditional sweets importer",
    "Japanese corporate gifting confectionery",
    "long shelf life Japanese sweets",
    "cinnamon baked Yatsuhashi",
    "Japanese hotel amenities food",
    "Izutsu Yatsuhashi Honpo"
  ],
  imageAlt: "Authentic Izutsu Yatsuhashi traditional Kyoto baked confectionery and Uji Matcha sweets",
  exclusivity: "Territory or channel distribution agreements discussed on qualified inquiry"
};

export const tsubameDrinkwareOpportunity: Opportunity = {
  id: "jip-tsubame-drinkware",
  slug: "premium-japanese-tsubame-drinkware",
  title: "Premium Japanese Tsubame Drinkware",
  type: "Distribution / Import / Retail / HORECA / Corporate Gifting / OEM",
  sector: "Consumer Products / Drinkware / Giftware",
  originCountry: "Japan",
  targetMarkets: ["International", "Europe", "North America", "Asia-Pacific", "Middle East"],
  heroImage: "/images/opportunities/tsubame/tsubame-hero.webp",
  cardImage: "/images/opportunities/tsubame/tsubame-card.webp",
  summary: "Japanese-made premium stainless-steel drinkware combining Tsubame craftsmanship with distinctive blue, gold, copper and Mt. Fuji-inspired collections. International distribution, retail, hospitality, gifting and OEM partners sought.",
  description: "PartnerMarketGlobal is presenting an opportunity for international distributors, importers, retailers, hospitality suppliers, gifting companies and specialist partners interested in premium Japanese drinkware produced in Tsubame, Niigata — one of Japan's renowned metalworking centres.\n\nThe collection combines centuries of Japanese metalworking craftsmanship with highly distinctive premium finishes and presentation, creating potential across consumer retail, hospitality, gifting, design-led stores and premium online channels.\n\nFrom high-grade 18-8 stainless steel tumblers and luxurious 24K gold-plated interior vessels to the striking antique silver blue Ginkobi Ao range, iconic Mt. Fuji sake cups, pure copper beer tumblers, and custom OEM personalization, this portfolio represents authentic Japanese manufacturing excellence.",
  companyBackground: "Manufacturer: Tamahashi Corporation (Tamahashi Co., Ltd.)\nLocation: 4549-6 Kodaka, Tsubame-shi, Niigata 959-1241, Japan\nHeritage: Tsubame City trace its origins to wakugi (traditional hand-forged nails) of the Edo Period (approx. 400 years ago). Expanding from hammered copperware to files and modern precision metal tableware, Tsubame is Japan's No. 1 center for metal tableware manufacturing.\nCertified Origin: Products carry the official 'Made in TSUBAME' certification mark.\nFacilitated by: PartnerMarketGlobal International Market Development.",
  productDetails: "The portfolio comprises six distinctive product collections:\n- Tsubame Artisan Tumblers: 18-8 stainless steel double-walled and single-walled tumblers and lock glasses featuring traditional finishing techniques, including Yamanaka Urushi lacquer collaboration.\n- Ginkobi Ao Collection: 18-8 stainless steel with an antique silver-plated metallic blue finish, including guisake cups (100ml), small tumblers (300ml), large tumblers (440ml), cheers tumblers (380ml), and double-walled ice pails.\n- The Luxury of Gold: 18-8 stainless steel vessels featuring 24K gold plated interior surfaces (guinomi sake cups, 300ml and 440ml tumblers, tears tumblers, and ice pails).\n- Mt. Fuji Cold Sake Cups: Mirror-finished stainless steel cups with sandblasted snowy summits, available in inner 24K gold-plated (FM-102) and stainless steel (FM-100) editions.\n- Kagayaki Copper & Sakura Collection: Pure copper beer tumblers and sake ware with tin-plated interiors, silver plating, gold plating, and antique silver finishes in paulownia gift boxes (kiribako), alongside satin Sakura-patterned tumblers.\n- OEM & Personalization: Commemorative items and original branded goods with name engraving (laser engraving on metal and silkscreen printing for lacquered finishes).",
  marketOpportunity: "International retail buyers, high-end department stores, hospitality procurement teams, corporate gifting specialists, and luxury e-commerce platforms increasingly demand authentic Japanese craft products that merge centuries of heritage with modern usability.\n\nTsubame-made metalware commands strong international prestige for its material purity, thermal efficiency, and refined aesthetics. This opportunity provides commercial partners with direct access to an established Japanese manufacturer offering high-margin gifting propositions and customizable OEM projects.",
  partnerProfile: "Best suited to national distributors, premium consumer goods importers, luxury department stores, lifestyle retailers, Japanese specialty stores, hotel and hospitality suppliers, sake and beverage specialists, corporate gifting agencies, duty-free operators, museum design stores, and private-label / OEM buyers.",
  commercialModel: "International distribution, wholesale supply, retail purchasing, hospitality procurement, corporate gifting contracts, and OEM / private-label manufacturing. Contact PartnerMarketGlobal for commercial terms and market availability.",
  territoryAvailability: "International markets (Selected territories and regional exclusive channels open for qualified commercial partners).",
  investmentRequirement: "Export packaging, carton quantities (typically 12–48 pieces per carton), minimum order quantities (MOQs), landed cost calculations, and sample availability provided upon qualified inquiry.",
  credentials: [
    "Manufactured in Tsubame City, Niigata Prefecture, Japan",
    "400 Years of Regional Metalworking Heritage",
    "Certified 'Made in TSUBAME' Quality Mark",
    "18-8 High-Grade Stainless Steel & Pure Copper Construction",
    "Inner 24K Gold Plated Luxury Drinkware Ranges",
    "Signature Antique Silver Plated Blue Finish (Ginkobi Ao)",
    "Mount Fuji Guinomi Cold Sake Cup Series",
    "Paulownia Wooden Presentation Gift Boxes (Kiribako)",
    "OEM & Custom Name Engraving / Personalization Available"
  ],
  verificationBadges: [
    "Featured Opportunity",
    "Client Opportunity",
    "Made in Tsubame",
    "OEM & Personalization",
    "B2B Distribution",
    "Retail & HORECA"
  ],
  documentsAvailable: [
    "Tsubame Tumbler Collection Catalogue (PDF)",
    "Ginkobi Ao Blue Collection Catalogue (PDF)",
    "The Luxury of Gold Catalogue (PDF)",
    "Mt. Fuji Sake Cup Catalogue (PDF)",
    "OEM & Personalization Guidelines",
    "Packaging & Master Carton Specifications",
    "Commercial Export Terms (On Qualified Inquiry)"
  ],
  risks: "Laser engraving suitability depends on the specific base material and finish (silkscreen printing required for lacquered finishes). Import duties, customs classification, freight economics, and regional food-contact compliance must be reviewed per destination market. Territory terms and production lead times require formal agreement with the manufacturer.",
  status: "Active Opportunity — Worldwide Partner Outreach",
  featured: true,
  featuredOrder: 5,
  brand: "Tsubame Drinkware / Tamahashi",
  company: "Tamahashi Corporation",
  sourcePartner: "JIP Japan",
  seoKeywords: [
    "Japanese drinkware distributor",
    "Japanese drinkware wholesale",
    "Tsubame stainless steel",
    "Tsubame tumbler",
    "Japanese sake cups wholesale",
    "Japanese giftware distributor",
    "premium Japanese giftware",
    "Japanese corporate gifts",
    "Japanese stainless steel tumblers",
    "Japanese homeware distributor",
    "Japanese products importer",
    "Japanese hospitality products",
    "Japanese OEM gifts",
    "Made in Japan drinkware",
    "Niigata metalware",
    "Tsubame Japan metalwork"
  ],
  imageAlt: "Premium Japanese Tsubame stainless steel, gold-finished and blue artisan drinkware",
  exclusivity: "Territory or channel distribution agreements discussed on qualified inquiry"
};

export const nipponCareerOpportunity: Opportunity = {
  id: "jip-nippon-career-slicers",
  slug: "nippon-career-ultra-thin-meat-slicing",
  title: "Japanese Ultra-Thin Fresh Meat Slicer Manufacturer Seeking International Partners",
  type: "International Sales / Distributor / End-User Introduction",
  sector: "Food Processing Machinery / Industrial Meat Slicing",
  originCountry: "Japan",
  targetMarkets: [
    "ASEAN",
    "Greater China",
    "Europe",
    "North America",
    "Middle East",
    "Global"
  ],
  heroImage: "/images/opportunities/nippon-career-ultra-thin-meat-slicing-hero.webp",
  cardImage: "/images/opportunities/nippon-career-ultra-thin-meat-slicing.webp",
  summary: "NIPPON CAREER INDUSTRY CO., LTD. of Japan develops proprietary industrial meat-processing machinery capable of slicing fresh, unfrozen meat down to approximately 1.5 mm. Partner Market Global is facilitating qualified introductions to international distributors, supermarket groups, meat processors and restaurant chains.",
  description: "NIPPON CAREER INDUSTRY CO., LTD. is a specialised Japanese manufacturer of high-performance food-processing machinery based in Matsuyama, Ehime Prefecture. The international commercial opportunity focuses on its patented industrial slicer technology engineered for slicing fresh, unfrozen meat down to approximately 1.5–2.5 mm.\n\nWhile conventional slicing equipment typically requires partially frozen meat or struggles to achieve consistent ultra-thin portioning without tearing, Nippon Career's E-Series platform delivers exceptional cut uniformity, orderly shingling or folding, and target yields of approximately 95% under suitable operating conditions.\n\nFeaturing an on-site disposable band blade replacement system that takes approximately one minute, the technology eliminates lengthy external blade sharpening stops and dramatically reduces operational downtime.",
  companyBackground: "Company: NIPPON CAREER INDUSTRY CO., LTD. (株式会社日本キャリア工業)\nFounded: October 1970 | Incorporated: May 1975\nHeadquarters: Matsuyama City, Ehime Prefecture, Japan\nPresident: Suguru Mitani\nCapital: JPY 40 million | Employees: 127\nBusiness Activities: Development, design, manufacture, sales and maintenance of specialised food-processing machinery.\nBranch Offices: Tokyo, Osaka, Chubu (Ichinomiya), Kyushu (Kumamoto)\nAccreditation: ISO9001 Certified, Monodzukuri Nippon Grand Award, Minister of Science & Technology Commendation\nOfficial Website: https://www.nippon-career.co.jp/\nFacilitated by: Partner Market Global International Business Development",
  productDetails: "Nippon Career E-Series Platform Lineup:\n- EX1-32: Slicing thickness approx. 1–20 mm, continuous meat feeding, automatic blade sharpening, approx. 840 kg machine weight. Tailored for small pieces, bacon, and trimming applications.\n- EY1-30: Slicing thickness approx. 1–25 mm, high-capacity processing (up to 100 slices/min for cuts ≤3 mm; 40–70 slices/min for cuts ≥3 mm), continuous feed, approx. 860 kg machine weight. Ideal for grilled meat and pork belly.\n- EZ1-34: Folding slicer with center-fold mechanism, folding speed 40–50 slices/min (30–60 slices/min without folding), approx. 910 kg machine weight. Designed specifically for shabu-shabu, hot pot presentation, and neat shingling.\n\nPlatform Innovations: Continuous band knife cutting, water-air mixed blade spray cleaning with scraper, two-stage 45°/90° safety covers, approx. 30% reduction in disassembly parts for sanitation.",
  marketOpportunity: "Global demand for ultra-thin sliced fresh meat is accelerating across modern retail supermarkets, hot pot and shabu-shabu restaurant chains, and central meat processing facilities. By enabling processors to convert bulk block meat into premium portioned retail packs and restaurant trays with up to 95% yield and 1-minute blade maintenance, Nippon Career technology delivers direct gross margin expansion.",
  partnerProfile: "Qualified regional and national food processing equipment distributors, supermarket and hypermarket procurement groups, commercial meat processors and importers, and high-volume Asian restaurant chains (shabu-shabu, hot pot, yakiniku, Korean BBQ) across ASEAN, Europe, North America, Greater China, and the Middle East.",
  commercialModel: "Direct manufacturer supply and technical integration agreements facilitated through Partner Market Global. Commercial terms, local distribution rights, equipment purchasing, and demonstration unit availability are evaluated and agreed on a territory-by-territory basis upon qualified inquiry.",
  territoryAvailability: "Worldwide outreach (Priority evaluation for ASEAN, Greater China, Europe, North America, Middle East; market availability and territory rights discussed on a country-by-country basis).",
  investmentRequirement: "Equipment purchase or distributor stocking arrangements. Technical specifications, FOB/CIF shipping details, spare band blade kits, and warranty terms provided upon partner qualification.",
  credentials: [
    "Over 50 Years of Proprietary Japanese Engineering Experience (Est. 1970)",
    "Ultra-Thin Fresh Meat Slicing Down to Approx. 1.5 mm Without Freezing",
    "Target Yield Performance of Approx. 95% Under Suitable Conditions",
    "Rapid 1-Minute On-Site Band Blade Replacement Concept",
    "Over 1,000 Slicer Systems Installed Across Japanese Meat Facilities",
    "Adopted by Major Supermarket Groups and Leading Food Processors",
    "Patented Slicing, Shingling and Centre-Folding Mechanisms",
    "Redesigned Frame with 45°/90° Safety Cover and ~30% Fewer Disassembly Parts",
    "High Throughput Capacity Up to 100 Slices Per Minute (Model Dependent)",
    "ISO 9001 Certified Quality Management System & Japanese Monodzukuri Award Winner",
    "Facilitated Internationally by Partner Market Global"
  ],
  verificationBadges: [
    "Client Opportunity",
    "JIP Japan Vetted",
    "Industrial Machinery",
    "Food Processing",
    "Distributor Opportunity",
    "1.5mm Ultra-Thin",
    "Approx. 95% Yield",
    "Japan Engineered"
  ],
  documentsAvailable: [
    "Nippon Career Industry — Corporate Profile (Bilingual PDF)",
    "Nippon Career — E-Series Slicer Technical Catalogue (PDF)",
    "Nippon Career Industry — International Sales Expansion Proposal (PDF)",
    "Model Dimension Schematics & Utility Requirement Sheets",
    "Reference Distributor Network Summary",
    "Custom Machine Integration & Line Sizing Guidelines"
  ],
  risks: "Actual slicing performance (including achievable slice thickness, yield percentage, and throughput) depends on meat temperature, firmness, cut shape, fat content, and machine configuration. Commercial distribution rights and country territory availability are subject to contract and manufacturer clearance. Standard international freight, voltage/frequency compatibility (AC200V standard, transformer/inverter configurations available), and local import compliance apply.",
  status: "Active Opportunity — Worldwide Partner Outreach",
  featured: true,
  featuredOrder: 3,
  brand: "Nippon Career Slicer Platform",
  company: "NIPPON CAREER INDUSTRY CO., LTD.",
  sourcePartner: "JIP Japan",
  seoKeywords: [
    "industrial meat slicer",
    "fresh meat slicer",
    "ultra thin meat slicer",
    "1.5mm meat slicing machine",
    "shabu shabu meat slicer",
    "hot pot meat slicer",
    "Japanese meat processing machinery",
    "meat processing equipment Japan",
    "industrial food slicer",
    "supermarket meat processing equipment",
    "meat processing machinery distributor",
    "food processing machinery distributor",
    "Nippon Career Industry",
    "Nippon Career slicer",
    "E-Series meat slicer",
    "EX1-32",
    "EY1-30",
    "EZ1-34"
  ],
  imageAlt: "Nippon Career Industry Japanese ultra-thin fresh meat slicing technology in commercial food processing facility",
  exclusivity: "Market availability and potential introductions discussed on a country-by-country basis"
};

export const celebleOpportunity: Opportunity = {
  id: "jip-celeble-sparkling",
  slug: "celeble-non-alcoholic-sparkling-wine-distribution",
  title: "Japanese Premium 0.00% Sparkling Beverage Seeking Global Distribution Partners",
  type: "Import / Distribution / HORECA & Retail Supply / Foodservice Partnership",
  sector: "Food & Beverage / Premium Non-Alcoholic Beverages / 0.00% Sparkling Wine",
  originCountry: "Japan",
  targetMarkets: [
    "Global",
    "Europe",
    "North America",
    "Middle East",
    "Asia-Pacific",
    "ASEAN"
  ],
  heroImage: "/images/opportunities/celeble/celeble-hero.webp",
  cardImage: "/images/opportunities/celeble/celeble-card.webp",
  summary: "Balance Co., Ltd. of Toyama, Japan is seeking qualified international importers, distributors and market-development partners for Celeblé, its premium 0.00% sparkling beverage range.",
  description: "Balance Co., Ltd. is presenting an exclusive international commercial opportunity for qualified food and beverage importers, distributors, upscale HORECA partners and retail groups to introduce Celeblé (セレブレ), Japan's premier culinary 0.00% non-alcoholic sparkling beverage range.\n\nUnlike conventional dealcoholized wines that suffer from stripped aromas, altered taste profiles and residual alcohol traces (often failing absolute zero-alcohol standards), and unlike unfermented grape juice drinks that are excessively sweet and cloying, Celeblé is produced through a proprietary fermentation method using wine-grape varieties. The process reduces natural sugars and creates genuine wine acidity, complex polyphenols and delicate effervescence without generating any alcohol.\n\nFormulated with zero animal-derived ingredients and certified zero caffeine, Celeblé is 100% vegan-compatible and respects diverse cultural, religious, and lifestyle values. Widely adopted across Japan's top fine-dining categories—including French (38%), Italian (26%), and traditional Japanese Washoku (10%) restaurants—Celeblé significantly elevates average guest check spend (JPY 600–1,800 menu pricing) and pairs seamlessly with multi-course gastronomy.",
  companyBackground: "Company: Balance Co., Ltd. (株式会社バランス)\nMain Office: 1-6-34 Shimoakaemachi, Toyama City, Toyama Prefecture 930-0816, Japan\nEstablished: April 2000 | Capital: JPY 10 Million\nPresident & CEO: Keigo Misuta\nCorporate Mission: 'Health and Smile' — Operating as a dedicated life-support enterprise producing specialized hydration, clinical nutritional care, and premium sparkling beverages.\nDevelopment Philosophy: Driven directly by customer and sommelier feedback, formulated with precision and backed by scientific data.\nOfficial Representation: Japan Industrial Promotion Inc. (JIP Japan) & Partner Market Global International Market Development.",
  productDetails: "Celeblé Commercial Lineup & Formats:\n- Celeblé Blanc (355ml Glass Bottle): Flagship white sparkling beverage recreating the crisp, elegant profile of dry Champagne. Notes of crisp green apple, citrus, white floral accents, and persistent fine bubbles. Yields 2–3 flutes per bottle.\n- Celeblé Rosé (355ml Glass Bottle): Distinctive salmon-pink sparkling beverage with subtle red berry and floral aromatics. Crisp acidity balanced with rounded body; ideal for aperitifs, seafood, poultry, and celebratory dining. Yields 2–3 flutes per bottle.\n- Celeblé Dry (355ml Glass Bottle): Crisp, extra-dry sparkling formulation engineered specifically for savory meal pairings with minimal residual sweetness, highlighting minerality and sharp, refreshing effervescence.\n- Celeblé Blanc Mini (200ml Glass Bottle): Single-serve personal flute format (1–2 glasses) created for solo diners, business lunches, room service, airlines, and bar service without opening full 355ml bottles.\n\nCore Product Formulations & Certifications:\n- Guaranteed 0.00% Alcohol (Safe for drivers, pregnant or nursing mothers, and zero-alcohol lifestyles).\n- Zero Caffeine (Safe for evening dining and sensitive patrons; specialty black tea extract is caffeine-free).\n- Zero Animal-Derived Ingredients (Vegan and compliant with multicultural dietary considerations).\n- Comprehensive B2B Merchandising Support: Turnkey A4 tabletop posters, table tents, and sommelier pairing materials available.",
  marketOpportunity: "Accelerating Global Mindful-Drinking Demand: Demand for culinary-grade non-alcoholic alternatives is expanding exponentially across Europe, North America, the Middle East, and Asia. High-end restaurants and luxury hotels require sophisticated zero-proof options that command premium pricing without compromising dignity.\n\nProven Japan Restaurant Economics: In Japan, Celeblé is established in premium establishments with dinner checks exceeding JPY 5,000, commanding menu prices of JPY 600–800 for 200ml bottles and JPY 1,000–1,800 for 355ml bottles. Proven adoption spans French (38%), Italian (26%), Japanese dining (10%), cafes (8%), and dining bars (6%).\n\nEstablished Export Deliveries: Balance Co., Ltd. has established ongoing export deliveries across Saudi Arabia (since 2020), Singapore, Taiwan, the United States (since 2022), Canada, Guam, and Thailand, delivering over 6,600 bottles in recent single-year export shipments to North America and Asia.\n\nYear-Round Sales Resilience: Strong baseline sales year-round with high repeat order rates, peaking during spring cherry blossom (hanami) events, summer terrace dining, and year-end/New Year holiday celebrations.",
  partnerProfile: "Qualified beverage importers, specialty wine & spirits distributors seeking a lead 0.00% ABV brand, upscale HORECA distributors (hotels, Michelin-starred and fine-dining restaurants, wedding venues), luxury airline and cruise concessionaires, gourmet grocery and department store buyers, and corporate gifting specialists.",
  commercialModel: "Direct manufacturer supply on standard FOB Japan export terms. Flexible commercial arrangements including territory-exclusive distribution rights, national retail listings, and dedicated HORECA supply contracts. Wholesale pricing tiers, master carton specifications (355ml and 200ml cartons), sample bottles, and export documentation available upon partner qualification.",
  territoryAvailability: "Global (Priority evaluation for Europe, North America, Middle East, Asia-Pacific, ASEAN; open for country and regional master distribution agreements).",
  investmentRequirement: "Standard pallet and master carton ordering schedules. Minimum order quantities (MOQs), landed cost models, sample availability, and market launch support discussed upon qualified commercial inquiry.",
  credentials: [
    "Proprietary 0.00% Alcohol Fermentation Method (Not Dealcoholized)",
    "Guaranteed 0.00% Alcohol & Zero Caffeine Formulation",
    "Zero Animal-Derived Ingredients (Vegan & Diverse Culture Friendly)",
    "Established Domestic Market Share in French (38%), Italian (26%) & Washoku (10%) Fine Dining",
    "Proven Export Deliveries: USA, Saudi Arabia, Singapore, Taiwan, Canada, Guam, Thailand",
    "Full Assortment: Blanc (355ml), Rosé (355ml), Dry (355ml), Blanc Mini (200ml)",
    "High Average Check Size Uplift for Restaurants (JPY 600–1,800 Menu Pricing)",
    "Turnkey B2B Tabletop POP Displays, Posters & Table Tents Provided",
    "Manufactured in Toyama Prefecture by Balance Co., Ltd. (Est. 2000)",
    "Facilitated Internationally by JIP Japan & Partner Market Global"
  ],
  verificationBadges: [
    "Featured Opportunity",
    "Lead Opportunity",
    "Client Opportunity",
    "JIP Japan Vetted",
    "0.00% Non-Alcoholic",
    "Zero Caffeine",
    "Vegan Compatible",
    "HORECA & Dining",
    "Global Distribution"
  ],
  documentsAvailable: [
    "Balance Co., Ltd. — Celeblé Corporate Product Introduction Deck (PDF)",
    "Complete Product Specifications & Ingredient Breakdown (Blanc, Rosé, Dry, Blanc Mini)",
    "Comparative Fermentation Process Sheet & Technical Validation",
    "Japan Foodservice Adoption & Cuisine Breakdown Statistics",
    "Turnkey Tabletop POP & Marketing Collateral Guide",
    "Export Packaging & Master Carton Dimension Sheets",
    "Confidential Wholesale Price List & MOQ Schedule (On Qualified Inquiry)"
  ],
  risks: "National food and beverage import regulations, customs classifications, and labeling compliance (ingredient language, nutritional facts, storage instructions) must be confirmed for each target territory. While 0.00% alcohol and vegan-formulated, regional regulatory or religious certifications (such as formal Halal registration) should be evaluated per market. Temperature-controlled dry container shipping is recommended to protect effervescence and product integrity.",
  status: "Active Lead Opportunity — Worldwide Partner Search",
  featured: true,
  isPinned: false,
  featuredOrder: 3,
  brand: "Celeblé (セレブレ)",
  company: "Balance Co., Ltd.",
  sourcePartner: "JIP Japan",
  seoKeywords: [
    "Celeble non-alcoholic sparkling",
    "Celeble distributor",
    "Balance Co Ltd Toyama",
    "Japanese 0.00 sparkling wine",
    "non alcoholic sparkling wine distributor",
    "premium non alcoholic beverage wholesale",
    "halal friendly sparkling wine",
    "vegan sparkling wine Japan",
    "Celeble Blanc",
    "Celeble Rose",
    "Celeble Dry",
    "Celeble Blanc Mini",
    "restaurant non alcoholic wine distributor",
    "luxury non alcoholic beverage importer",
    "Japanese beverage export opportunity"
  ],
  imageAlt: "Celeblé Japanese premium 0.00% non-alcoholic sparkling beverage bottle and champagne flute with gourmet dining pairings",
  exclusivity: "Territorial and channel exclusivity negotiable based on qualification and commercial commitments"
};

export const eiwaHoldingsOpportunity: Opportunity = {
  id: "jip-eiwa-holdings-ingredients",
  slug: "eiwa-japanese-food-ingredients-global-distribution",
  title: "Premium Japanese Food Ingredients & Specialty Foods — Global Distribution Partners Wanted",
  type: "Export / Distribution / Import / Food Manufacturing & HORECA Supply / Wholesale Partnership",
  sector: "Food & Beverage / Specialty Food Ingredients & Flavorings / Japanese Culinary Products",
  originCountry: "Japan",
  targetMarkets: [
    "Southeast Asia",
    "Indonesia",
    "Malaysia",
    "Singapore",
    "Thailand",
    "Philippines",
    "Middle East & Gulf",
    "North America",
    "Global"
  ],
  heroImage: "/images/opportunities/eiwa/eiwa-hero-desktop.webp",
  cardImage: "/images/opportunities/eiwa/eiwa-card.webp",
  summary: "Eiwa Holdings and Eiwa Bussan are Tokyo-based specialists in food flavorings, additives and ingredients, exploring international distribution and strategic commercial partnerships for a carefully selected portfolio of distinctive culinary products.",
  description: "Eiwa Holdings and Eiwa Bussan are Tokyo-based specialists in food flavorings, additives and ingredients, exploring international distribution and strategic commercial partnerships for a carefully selected portfolio of distinctive culinary products. From aromatic Japanese citrus oils and specialist dashi to frozen sushi, premium confectionery, Japanese buckwheat groats and concentrated onion ingredients, the product range creates opportunities for experienced importers, food manufacturers, restaurant groups, hospitality operators and premium retailers. Partner Market Global invites qualified businesses to register interest in relevant products and territories.\n\nCommencing full-scale international expansion in July 2026, Eiwa Holdings adapts and repositions Japan's unique ingredient craft and culinary technologies to meet specific international market demands. In partnership with Japan Industrial Promotion (JIP), the company provides prospective overseas partners with structured commercial access, verified manufacturing credentials, and tailored product formats suited for Southeast Asia, the Gulf region, North America, and qualified global markets.",
  companyBackground: "Company: Eiwa Holdings Co., Ltd. / Eiwa Bussan Co., Ltd. (永和ホールディングス / 永和物産株式会社)\nHeadquarters: Kojimachi, Chiyoda-ku, Tokyo, Japan\nOfficial Website: https://www.eiwa-trade.co.jp/\nProfile: Specialized trading company supplying food flavorings, food additives, functional ingredients, lactic acid bacteria, and international culinary components.\nCommercial Facilitation: Introduced through Japan Industrial Promotion (JIP) and represented internationally via Partner Market Global.\nInternational Strategy: Commenced July 2026 international expansion program targeting Southeast Asia (Indonesia, Malaysia, Singapore, Thailand, Philippines), selected Gulf countries, and North America.",
  productDetails: "Comprehensive Six-Category Commercial Portfolio:\n\n1. Japanese Citrus Oils (Supplier Catalogue Halal & Kosher — Subject to Certificate Verification):\n- Pure cold-pressed and distilled essence oils from authentic Japanese citrus varieties.\n- Core Lineup & Indicative Annual Catalogue Capacities: Yuzu (11,200 kg/year), Sudachi (400 kg/year), Kabosu (300 kg/year), Naoshichi (250 kg/year - rare Kochi Prefecture variety), and Ginger Oil (150 kg/year). Note: Quantities represent supplier catalogue indicative capacities requiring current confirmation.\n- Distilled Lineup: Extended distilled citrus essences including Hyuganatsu, Ponkan, and Lemon.\n- Applications: Premium RTD beverages, soft drinks, ponzu sauces, dressing manufacture, ramen broth finishing, cosmetics and skincare (brightening, collagen support, shampoos/serums), and aromatherapy (hotel/spa ambient fragrance, fine fragrances).\n- Certifications: Supplier catalogue lists Halal and Kosher certifications; specific certificates, certifying bodies, validity periods, and covered SKUs require confirmation before commercial commitments.\n\n2. Halal Japanese Dashi (Umami Broth Seasoning):\n- Authentic Japanese umami seasoning crafted from dried bonito (katsuobushi) and kelp (kombu), capturing synergistic glutamic and inosinic acids for refined umami.\n- Applications: Japanese restaurant chains, ramen and hot pot broth bases, noodle soup stocks, professional foodservice kitchens, food manufacturing.\n- Formats: Liquid, sachet, and powder formats to be confirmed based on territory and volume requirements.\n- Certifications: The catalogue describes this category as Halal certified; certifying body, product range, packaging, and exact formulations require confirmation prior to commercial commitments.\n\n3. Onion Concentrate Brix 72 (Netherlands Origin — Eiwa Bussan Import):\n- High-concentration liquid onion ingredient produced using advanced low-temperature concentration technology.\n- Concentration Factor: Approximately 12–14 kg of fresh onions are concentrated into 1 kg of finished liquid product (Brix 72).\n- Origin Note: Produced in the Netherlands and imported by Eiwa Bussan. Not Japanese-origin.\n- Applications: Curry production, yakiniku/BBQ sauces, salad dressings, prepared foods, soups, ramen, retort foods, snack seasonings.\n- Certification: The catalogue specifically states Halal certification is UNCONFIRMED (despite the introduction mentioning Halal onion concentrate). Displayed as subject to verification, not certified.\n\n4. Tomin Frozen Sushi (Cold-Sleep Liquid Freezing Technology):\n- Premium Japanese sushi produced using proprietary Tomin (\"凍眠\") liquid freezing technology by manufacturer Uota (株式会社魚太 / 日本料理 うお太).\n- Technology: Sub-zero liquid brine freezing preserves cellular wall integrity without ice crystal puncture, allowing thawed sushi to retain chef-prepared texture, moisture, and aroma.\n- Lineup: Assorted sushi platters, individually packaged portions, and unagi rice bowls.\n- Target Channels: Japanese restaurants, premium supermarkets, luxury hotels, airline catering, frozen food importers.\n- Regulatory & Certification: Cold-chain (-18°C), import regulations, shelf life, and product specifications must be confirmed. Frozen sushi is not presented as Halal certified.\n\n5. Drinkable Daifuku (Modern Wagashi Confectionery):\n- Contemporary reinterpretation of traditional Japanese mochi confectionery (ItWokashi series) combining traditional wagashi craft with social-media appeal.\n- Flavors: Strawberry & Pink Pepper, Oolong Tea & Almond Tofu, Chunky Red Bean Paste & Cream, Sesame & Mango, Grape & Wine, Matcha & Lemon.\n- Target Channels: Specialty food distributors, dessert chains, high-end cafes, Japanese confectionery importers, premium grocery, hospitality.\n- Specifications: Halal and Kosher certifications have not been obtained according to the catalogue. Storage conditions (frozen/refrigerated/ambient), detailed ingredient specifications, and shelf life await confirmation.\n\n6. Japanese Buckwheat Groats / Sobanomi (Raw Whole Grain Superfood):\n- Premium whole-grain buckwheat sourced directly from Japanese regional producers (brand: 'Sobanomi nomi nomise' / sobanominomi.official.ec).\n- Whole-grain form enjoyed prior to milling into soba flour; rich in rutin, plant protein, and dietary fiber.\n- Applications: Healthy meals, whole-grain porridge, salads, risotto-style dishes, bakery inclusions, specialist health-food retail.\n- Target Channels: Premium supermarkets, health-food distributors, wellness foodservice operators.\n- Allergen & Certification Note: Avoid unsupported certification claims, especially regarding gluten-free guarantees and facility cross-contact controls.",
  marketOpportunity: "Strategic International Market Opportunities:\n\n- Southeast Asia Growth Dynamics: Over 280 million Muslim consumers reside across Southeast Asia, with Indonesia and Malaysia accounting for ~95%. The demand for authentic Japanese cuisine, Halal-compliant seasonings, and high-quality Japanese culinary ingredients is growing rapidly. Furthermore, the combined population of Indonesia, Malaysia, Thailand, and the Philippines exceeds 500 million, creating vast consumer reach for innovative Japanese F&B products.\n\n- Citrus Essential Oil Global Expansion: The global yuzu essential oil market reached USD 178 million in 2024 and is projected to expand to USD 323 million by 2033 at a 6.7% CAGR, with Southeast Asian aroma and flavor markets growing at +22% annually. Yuzu adoption in beauty and skincare has reached 12% in leading Asian cosmetic hubs.\n\n- Food Manufacturing & Foodservice Efficiency: Products such as 12–14x concentrated onion extract (Brix 72) and authentic bonito/kombu dashi allow commercial sauce manufacturers and restaurant chains to enhance flavor depth, reduce kitchen preparation labor, and maintain consistent quality across multi-unit operations.\n\n- Turnkey Cold-Chain & Gourmet Retail: Tomin frozen sushi and Drinkable Daifuku allow high-end retailers, luxury hotels, and international airline catering operators to offer authentic Japanese chef craftsmanship without relying on on-site master sushi chefs.",
  partnerProfile: "Eiwa Holdings is seeking established B2B commercial partners across multiple specialized categories:\n- Specialist Food Ingredient Distributors: Companies supplying food manufacturers, bakeries, beverage companies, and seasoning producers.\n- Japanese & Asian Food Importers: Established trading houses supplying restaurants, Asian grocers, and HORECA clients.\n- Japanese Restaurant Chains & Foodservice Operators: Multi-unit dining groups seeking authentic dashi, citrus oils, or Tomin sushi solutions.\n- Luxury Hotels & Airline Catering Concessionaires: Procurement teams looking for premium sushi platters, dessert confections, or ambient food amenities.\n- Premium Supermarket & High-End Grocery Buyers: Retail buyers seeking differentiated Japanese specialty foods and ancient grain superfoods.\n- Beverage & Functional Drink Manufacturers: RTD beverage companies seeking authentic yuzu, sudachi, kabosu, and ginger essence oils.\n- Cosmetics & Personal Care Formulators: Beauty brands seeking natural Japanese citrus oils with proven antioxidant, vitamin C, and aromatherapy credentials.\n- Frozen Food & Cold-Chain Specialists: Importers with verified unbroken -18°C cold-chain infrastructure for sushi logistics.",
  commercialModel: "Direct trading house supply on standard FOB Japan (or CIF target port) commercial terms. Wholesale distribution, HORECA procurement, manufacturing bulk supply, and retail channel partnerships. Minimum order quantities (MOQs), landed cost models, sample availability, packaging options (e.g. bulk drums, food-grade containers, consumer retail packs), and export documentation provided upon partner qualification.",
  territoryAvailability: "Priority evaluation for Southeast Asia (Indonesia, Malaysia, Singapore, Thailand, Philippines), selected Gulf countries, and North America. Open for qualified country and regional distribution discussions globally. Potential territorial agreements evaluated based on partner market track record and commercial commitments.",
  investmentRequirement: "Commercial container, pallet, or MOQ schedules determined by product category (e.g., drum/bottle packaging for citrus oils vs. frozen container freight for Tomin sushi). Landed cost models and MOQ details provided upon qualified commercial inquiry.",
  credentials: [
    "Established Tokyo Trading Company in Kojimachi, Chiyoda-ku",
    "Specialists in Flavorings, Food Additives & Functional Ingredients",
    "International Expansion Initiative in Partnership with JIP Japan",
    "6 Distinct High-Value Product Categories",
    "High-Value Japanese Citrus Oils (Yuzu, Sudachi, Kabosu, Naoshichi)",
    "Traditional Bonito & Kelp Halal Dashi for Muslim Foodservice Markets",
    "Dutch-Origin 12–14x Onion Concentrate (Brix 72) for Industrial Umami",
    "Tomin Liquid Cold-Sleep Frozen Sushi Technology (Chef Quality Thawed)",
    "Contemporary 'Drinkable Daifuku' Modern Confectionery Lineup",
    "Locally Sourced Whole-Grain Japanese Buckwheat Groats (Sobanomi)"
  ],
  verificationBadges: [
    "Lead Featured Opportunity",
    "Client Opportunity",
    "JIP Japan Vetted",
    "Tokyo Headquarters",
    "Food Ingredients",
    "Halal Dashi",
    "Citrus Oils",
    "Tomin Frozen Sushi",
    "Global Distribution"
  ],
  documentsAvailable: [
    "Eiwa Holdings — Export Product Catalog (July 2026 Presentation PDF)",
    "Japanese Citrus Oil Specifications & Indicative Production Schedule",
    "Dutch Onion Concentrate Brix 72 Technical Data Sheet",
    "Tomin Liquid Freezing Frozen Sushi Overview & Lineup Sheet",
    "Drinkable Daifuku Confectionery Presentation",
    "Buckwheat Groats (Sobanomi) Sourcing & Nutrition Sheet",
    "Confidential Wholesale Pricing & MOQ Schedule (On Qualified Inquiry)"
  ],
  risks: "Import regulations, customs tariff classifications, cold-chain logistics, and food safety standards vary by target market and product category. Certification status must be independently validated per SKU: citrus oils and dashi are catalogued with Halal credentials requiring certificate verification; Dutch onion concentrate Halal status is unconfirmed; frozen sushi and drinkable daifuku do not carry Halal certification. Dutch onion concentrate originates from the Netherlands. Frozen sushi requires unbroken -18°C cold-chain logistics and local veterinary/health clearance. Buckwheat groats are whole grains but cannot guarantee zero allergen cross-contact in shared facilities. Commercial volumes, MOQs, and landed costs are subject to contract.",
  status: "Active Lead Opportunity — Global Partner Search",
  featured: true,
  isPinned: true,
  featuredOrder: 1,
  brand: "Eiwa Holdings / Eiwa Bussan",
  company: "Eiwa Holdings Co., Ltd. / Eiwa Bussan Co., Ltd.",
  sourcePartner: "JIP Japan",
  seoKeywords: [
    "Eiwa Holdings distributor",
    "Eiwa Bussan Tokyo",
    "Japanese food ingredient distribution",
    "Japanese yuzu oil wholesale",
    "Halal Japanese dashi supplier",
    "Japanese citrus oils exporter",
    "sudachi oil kabosu oil naoshichi",
    "onion concentrate brix 72",
    "Tomin frozen sushi distributor",
    "Drinkable Daifuku export",
    "Japanese buckwheat groats wholesale",
    "sobanomi distributor",
    "Japan Industrial Promotion food trade",
    "Japanese food export opportunities",
    "premium Japanese food wholesale",
    "frozen sushi distribution",
    "international food ingredient partnerships"
  ],
  imageAlt: "Eiwa Holdings Japanese food ingredients and specialty foods showcase featuring citrus oils, dashi, sushi, daifuku, and buckwheat groats",
  exclusivity: "Territorial and channel distribution agreements considered on qualified inquiry based on partner capability"
};

export const kadoyaOpportunity: Opportunity = {
  id: "jip-kadoya-tai-to-kome",
  slug: "kadoya-tai-to-kome-japanese-restaurant-franchise",
  title: "Bring Authentic Japanese Tai-meshi & Karaage to Asia — Kadoya Franchise & Licensing Partners Wanted",
  type: "Franchise / Restaurant Licensing / Master Franchise / Concept Development",
  sector: "Food & Beverage / Japanese Restaurant Dining / Casual Dining & Hospitality",
  originCountry: "Japan",
  targetMarkets: [
    "Hong Kong",
    "Taiwan",
    "Thailand",
    "Singapore",
    "Indonesia",
    "Malaysia",
    "Philippines",
    "Vietnam",
    "Asia-Pacific"
  ],
  heroImage: "/images/opportunities/kadoya/kadoya-hero-desktop.webp",
  cardImage: "/images/opportunities/kadoya/kadoya-card.webp",
  summary: "Partner with Kadoya Co., Ltd., an established Ehime restaurant group founded in 1962, to introduce authentic clay-pot sea bream rice (Tai-meshi), rich golden dashi, and signature crispy karaage to premier Asian dining markets.",
  description: "From the coastal culinary traditions of Uwajima, Ehime Prefecture comes a distinctive Japanese dining concept built around premium rice, fresh sea bream, and authentic golden dashi. Kadoya Co., Ltd. combines regional Japanese gastronomic heritage with the universal appeal of juicy karaage fried chicken, creating a dining experience crafted to captivate families, business diners, and discerning food enthusiasts seeking genuine regional specialties beyond sushi and ramen.\n\nWith over 60 years of operating heritage, proven commercial success across high-turnover transit hubs like Matsuyama Airport and prime business districts in Tokyo (Toranomon), Kadoya is introducing its international brand concept — 'Tai to Kome' (Sea Bream and Rice) — to Asia. Partner Market Global, in collaboration with Japan Industrial Promotion (JIP), invites qualified multi-unit restaurant operators, hospitality groups, and master franchise candidates in Hong Kong, Taiwan, Thailand, and across Asia to explore localized restaurant licensing, flagship franchise development, and regional expansion.",
  companyBackground: "Company: Kadoya Co., Ltd. (株式会社かどや)\nHeadquarters: Uwajima City, Ehime Prefecture, Japan\nOfficial Website: https://www.kadoya-taimeshi.com/\nFounded: September 1962 (over 60 years of restaurant operating history)\nDomestic Scale: Approximately JPY 2.15 billion in net sales, ~390 employees across multi-format regional dining locations.\nKey Locations: Matsuyama Airport (high-volume passenger hub), Central Tokyo (Toranomon and upscale commercial centers), and Ehime flagship kappo dining establishments.\nBrand Concept for Asia: 'Tai to Kome' (Sea Bream and Rice), combining Ehime sea bream clay pot rice, secret golden dashi, and accessible signature karaage.\nCommercial Representation: Facilitated through Japan Industrial Promotion (JIP) and represented internationally by Partner Market Global.",
  productDetails: "Core Concept & Dual-Pillar Culinary Model:\n\n1. Experiential 'Tai to Kome' (Sea Bream & Rice):\n- Authentic Ehime regional culinary heritage centered on sea bream (tai) and perfectly cooked Japanese rice.\n- Two Recognized Preparations: Uwajima-style Tai-meshi (sashimi-grade raw sea bream seasoned with secret dashi and egg sauce over warm rice) and Matsuyama-style Tai-meshi (seasoned sea bream cooked together with rice in an earthenware pot).\n- The International Signature: Sizzling earthenware clay pot rice with tender, savory cooked sea bream, finished at the table with an aromatic pour of piping-hot golden dashi broth.\n\n2. The 'Karaage Hook Strategy':\n- Overcomes the perceived simplicity or subtle flavor of plain white fish by pairing clay pot rice with signature Japanese karaage (crispy, juicy fried chicken).\n- Wide demographic magnet: captures children, younger diners, and families seeking familiar, craveable comfort food while introducing them to authentic clay pot rice.\n\n3. High-Efficiency Flavor Supply & Local Sourcing:\n- Essential flavor foundation — Kadoya's proprietary concentrated 'Special Golden Dashi' — is produced in Japan and exported directly to partner outlets.\n- Bulky core ingredients (sea bream/fish, rice, vegetables, chicken) are sourced locally to optimize food costs and supply chain resilience.\n- Flavor localization: flexible adjustments to sweet and savory sauce profiles to suit local dining palates in Hong Kong, Taiwan, and Southeast Asia.\n\n4. Lean Kitchen Operations (No Master Chef Required):\n- Standardized operating manuals and pre-concentrated dashi allow high culinary consistency without recruiting expensive Japanese master sushi chefs.\n- Efficient kitchen workflow operable with 2–3 trained local kitchen staff per station.",
  marketOpportunity: "Strategic Asian Restaurant Market Opportunity:\n\n- Overcoming the 'Raw Fish Barrier': While sushi relies entirely on cold raw seafood, Southeast Asian and greater Asian dining cultures have deep affinities for warm meals, steamed fish, aromatic broths, and flavorful dashi-cooked rice (akin to claypot rice, Hainanese chicken rice, and congee).\n\n- Affordable Luxury Dining Positioning: Target check spend of JPY 3,500–5,000 per guest (~USD 23–33), sitting comfortably between casual mass-market sushi conveyor belts (JPY 1,000–2,000) and expensive traditional kappo/omakase dining.\n\n- Priority Markets: Hong Kong, Taiwan, and Thailand have deep consumer familiarity with Japanese regional tourism, premium dining, and viral food experiences, providing ideal launchpads for pop-ups and flagship openings.\n\n- High Turnover & Strong Unit Economics: Proven model in Japan at Matsuyama Airport and Tokyo business centers demonstrates steady all-day traffic from lunch, dinner, business entertaining, and weekend families.",
  partnerProfile: "Kadoya and JIP are seeking qualified international restaurant partners:\n- Multi-Unit Restaurant Operators: Proven operators with existing F&B brand portfolios, central kitchens, and local real estate access.\n- Japanese Restaurant Groups: Established operators of ramen, sushi, yakiniku, or izakaya looking to diversify into regional Washoku.\n- Hospitality & Hotel F&B Groups: Operators seeking distinctive, high-margin Japanese dining concepts for hotel properties.\n- Airport & Transit Concessionaires: Operators capable of deploying high-turnover airport concepts mirroring Matsuyama Airport success.\n- Shopping Mall Developers & Prime Retailers: Commercial landlords looking to anchor Japanese specialty dining in prime Asian retail hubs.\n- Master Franchise Groups: Experienced investors capable of acquiring country or regional rights for multi-store rollout.",
  commercialModel: "Flexible International Partnership Framework:\n- Single-Market Restaurant Licensing\n- Flagship Franchise Restaurant (Pilot 1st store)\n- Multi-Unit Franchise Development Agreement\n- Master Franchise Agreement (territory/country rights)\n- Menu Licensing & Dashi Supply (agile entry for existing Japanese restaurants)\n- B2B Concentrated Golden Dashi Distribution to retail and foodservice.",
  territoryAvailability: "Priority focus on Hong Kong, Taiwan, and Thailand. Secondary evaluation for Singapore, Indonesia, Malaysia, Philippines, and Vietnam. Territory exclusivity and master franchise agreements available subject to operator qualification and development schedule.",
  investmentRequirement: "Illustrative commercial model from supplier presentation: JPY 7M–10M monthly restaurant sales, ~15% profit margin, 2–3 year payback. Capital expenditure depends on format (10 to 50+ tsubo / 33–165+ m²). Detailed financial models provided to qualified applicants under NDA.",
  credentials: [
    "Founded September 1962 in Uwajima, Ehime (Over 60 Years of Heritage)",
    "Pioneer of Ehime Regional Sea Bream Cuisine (Tai-meshi)",
    "Approx. JPY 2.15 Billion Net Sales & ~390 Employees in Japan",
    "Top-Performing Operations at Matsuyama Airport & Tokyo (Toranomon)",
    "Proprietary 'Special Golden Dashi' Exported Direct from Japan",
    "Dual-Pillar Strategy: Authentic Tai-meshi + High-Appeal Karaage",
    "Lean Operational Model: Operable with 2–3 Local Staff (No Master Chef Needed)",
    "Versatile Store Footprints from 10 to 50+ Tsubo (33–165+ m²)",
    "Four-Phase Asian Expansion Roadmap (Pop-Up → Menu License → Flagship → Master FC)",
    "Introduced by Japan Industrial Promotion (JIP) via Partner Market Global"
  ],
  verificationBadges: [
    "Featured Franchise Opportunity",
    "Client Opportunity",
    "JIP Japan Vetted",
    "Ehime Heritage",
    "Tai-meshi & Karaage",
    "Golden Dashi",
    "Asia Expansion",
    "Master Franchise Available"
  ],
  documentsAvailable: [
    "Kadoya Tai to Kome Franchise Presentation Deck (PDF)",
    "Store Format & Layout Schematics (10–50+ Tsubo)",
    "Golden Dashi Supply Specification & Kitchen SOP Overview",
    "Illustrative Unit Economics & ROI Guidance (Under NDA)",
    "Franchise & Licensing Agreement Framework"
  ],
  risks: "Illustrative commercial figures (JPY 7M–10M monthly sales, ~15% margin, 2–3 year payback) are supplier presentation estimates and do not represent audited performance guarantees or contractual promises. Operating results vary by location, consumer demographics, rental costs, and local execution. International seafood import regulations, local health inspection standards, staff training, and commercial leases must be independently verified by the prospective franchisee. Kadoya's international concept 'Tai to Kome' is a planned expansion model; trademark registration, menu localization, and supply chain logistics are finalized during commercial negotiations. Not certified Halal.",
  status: "Active Lead Opportunity — Asian Franchise Partner Search",
  featured: true,
  isPinned: true,
  featuredOrder: 2,
  brand: "Kadoya — Tai to Kome (かどや / 鯛と米)",
  company: "Kadoya Co., Ltd. (株式会社かどや)",
  sourcePartner: "JIP Japan",
  seoKeywords: [
    "Kadoya franchise",
    "Tai to Kome restaurant franchise",
    "Japanese restaurant franchise Asia",
    "Tai-meshi restaurant licensing",
    "sea bream rice franchise",
    "Japanese food franchise Hong Kong",
    "Japanese restaurant franchise Taiwan",
    "Japanese restaurant expansion Thailand",
    "Japanese dining franchise investors",
    "Japanese restaurant master franchise",
    "Uwajima Tai-meshi restaurant",
    "Japanese karaage franchise opportunity",
    "Ehime Japanese cuisine licensing",
    "Kadoya Matsuyama airport",
    "Japan Industrial Promotion restaurant franchise",
    "Asian F&B master franchise opportunity"
  ],
  imageAlt: "Kadoya Tai to Kome Japanese earthenware clay pot sea bream rice Tai-meshi with golden dashi and crispy karaage fried chicken",
  exclusivity: "Territory and master franchise development rights negotiable based on operator qualifications and multi-unit commitments"
};

const sonicOpp = mappedJipOpportunities.find((o) => o.slug === "sonic-friends-europe-2027");
const otherMappedJip = mappedJipOpportunities.filter((o) => o.slug !== "sonic-friends-europe-2027");

export const opportunities: Opportunity[] = [
  eiwaHoldingsOpportunity,
  kadoyaOpportunity,
  celebleOpportunity,
  nipponCareerOpportunity,
  izutsuYatsuhashiOpportunity,
  tsubameDrinkwareOpportunity,
  ...(sonicOpp
    ? [sonicOpp, ...staticOpportunities, ...otherMappedJip]
    : [...staticOpportunities, ...mappedJipOpportunities])
];

export const categories = [
  { title: "Import Opportunities", image: "/assets/import-opportunities.svg", href: "/import-opportunities" },
  { title: "Export Opportunities", image: "/assets/export-opportunities.svg", href: "/export-opportunities" },
  { title: "Franchise Opportunities", image: "/assets/franchise-opportunities.svg", href: "/franchise-opportunities" },
  { title: "Distribution Rights", image: "/assets/distribution-rights.svg", href: "/distribution-rights" },
  { title: "Licensing & Brand Partnerships", image: "/assets/licensing-partnerships.svg", href: "/licensing-opportunities" },
  { title: "Master Franchise Rights", image: "/assets/master-franchise.svg", href: "/master-franchise-opportunities" },
  { title: "Country Partner Opportunities", image: "/assets/country-partner.svg", href: "/country-partner-opportunities" },
  { title: "Private Label / OEM Opportunities", image: "/assets/private-label-oem.svg", href: "/private-label-oem-opportunities" }
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
