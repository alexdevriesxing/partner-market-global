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

const sonicOpp = mappedJipOpportunities.find((o) => o.slug === "sonic-friends-europe-2027");
const otherMappedJip = mappedJipOpportunities.filter((o) => o.slug !== "sonic-friends-europe-2027");

export const opportunities: Opportunity[] = [
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
