import { opportunities, Opportunity } from "./data";

export interface CategoryPageData {
  slug: string;
  typeKey: string;
  title: string;
  eyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  directAnswer: string;
  definition: string;
  whoIsItFor: { title: string; desc: string }[];
  qualificationCriteria: string[];
  commercialStructure: {
    model: string;
    terms: string;
    exclusivity: string;
    logistics: string;
  };
  faqs: { question: string; answer: string }[];
  seoKeywords: string[];
}

export const categoryDefinitions: Record<string, CategoryPageData> = {
  "import-opportunities": {
    slug: "import-opportunities",
    typeKey: "import",
    title: "Import Opportunities & International Product Sourcing",
    eyebrow: "B2B Commercial Sourcing",
    heroHeadline: "Verified International Import Opportunities",
    heroSubheadline: "Connect directly with pre-screened Japanese, European, and Asian manufacturers seeking qualified national importers, wholesalers, and retail buyers.",
    directAnswer: "An import opportunity on Partner Market Global connects qualified domestic distributors, wholesalers, and retail chains with vetted international brand owners. Importers secure commercial access to market-ready products with established domestic track records, certified specifications (CE, JAS, ISO, Halal), and structured FOB/CIF logistics terms.",
    definition: "Import opportunities enable local businesses to introduce differentiated international products into their domestic market. Partner Market Global verifies product authenticity, production capacity, compliance documentation, and export readiness before listing, ensuring that prospective importers deal directly with authorized principals.",
    whoIsItFor: [
      { title: "National Importers & Wholesalers", desc: "Companies with active customs clearing, warehousing, and logistics infrastructure seeking high-margin branded product lines." },
      { title: "Retail Chains & Department Stores", desc: "Retail buying groups seeking direct factory-gate pricing, exclusive territory SKUs, and unique international merchandise." },
      { title: "Specialist & Category Distributors", desc: "Established B2B suppliers in food & beverage, licensed character goods, cosmetics, and industrial hardware." },
      { title: "E-Commerce Operators", desc: "Digital retailers with strong localized fulfillment capabilities looking to import verified international brands." }
    ],
    qualificationCriteria: [
      "Active corporate registration and import/customs licensing in target territory",
      "Demonstrated sales channels, warehousing capacity, and cold-chain/dry storage infrastructure",
      "Ability to meet manufacturer Minimum Order Quantities (MOQs) and working-capital requirements",
      "Compliance with domestic product labeling, safety certifications, and regulatory standards"
    ],
    commercialStructure: {
      model: "Direct manufacturer supply on FOB or CIF commercial terms with commission-based agency representation.",
      terms: "Wholesale tier pricing schedules, product catalogues, and lab certifications provided upon qualified buyer inquiry.",
      exclusivity: "Territory and channel exclusivity negotiable based on initial order volume commitments and annual targets.",
      logistics: "Standard shipping terms from origin ports (Shenzhen, Kobe, Yokohama, Jakarta) with comprehensive export documentation."
    },
    faqs: [
      {
        question: "What is an import opportunity on Partner Market Global?",
        answer: "An import opportunity is a verified commercial proposition from an overseas manufacturer or brand owner seeking qualified local businesses to import, clear customs, distribute, and sell their products in a designated country or region."
      },
      {
        question: "How are import opportunities pre-vetted?",
        answer: "Every listing is vetted by Partner Market Global or alliance partners like JIP Japan for business registration, manufacturing capacity, regulatory compliance, ingredient/safety standards, and genuine export readiness."
      },
      {
        question: "How do I request wholesale pricing and samples for import?",
        answer: "Submit an inquiry on the specific opportunity profile. Your company credentials and channel details will be qualified, after which confidential price lists, MOQ terms, and sample arrangements will be provided directly."
      },
      {
        question: "Is territory exclusivity available for importers?",
        answer: "Yes. Many of our principal brands offer national or regional exclusivity to qualified importers who can commit to agreed launch volumes and annual market development targets."
      }
    ],
    seoKeywords: [
      "import opportunities",
      "international product sourcing",
      "import distributor wanted",
      "Japanese products import Europe",
      "B2B import marketplace",
      "wholesale product import",
      "certified manufacturer importer"
    ]
  },
  "export-opportunities": {
    slug: "export-opportunities",
    typeKey: "export",
    title: "Export Opportunities & Global Channel Development",
    eyebrow: "International Trade",
    heroHeadline: "Export-Ready Brands Seeking Global Partners",
    heroSubheadline: "Discover verified manufacturers and brand owners actively expanding into European, Asian, North American, and Middle Eastern markets.",
    directAnswer: "An export opportunity connects established producers with international trade partners capable of driving multi-country distribution. Brand owners provide proven product portfolios, marketing assets, and certified export compliance, while overseas partners manage localized marketing, distribution networks, and retail listings.",
    definition: "Export opportunities on Partner Market Global focus on scaling proven domestic market leaders into international territories. We facilitate structured B2B introductions on a 100% commission-aligned commercial basis, eliminating upfront listing fees for expanding manufacturers.",
    whoIsItFor: [
      { title: "International Trading Companies", desc: "Experienced trading houses with established cross-border distribution networks and multi-country logistics." },
      { title: "Regional Master Distributors", desc: "Distributors holding multi-territory reach across Western Europe, ASEAN, GCC, or the Americas." },
      { title: "Retail Consortiums", desc: "Multi-market retail buying groups looking to secure direct factory export allocations." },
      { title: "Commercial Trade Agents", desc: "Commission-based sales agents connecting verified overseas brands with major retail chains." }
    ],
    qualificationCriteria: [
      "Proven distribution footprint in one or more international target markets",
      "Financial capacity to fund initial inventory orders and market launch activities",
      "Clear route-to-market plan and existing retail/HORECA buyer relationships",
      "Understanding of local customs, import tariffs, and compliance requirements"
    ],
    commercialStructure: {
      model: "International distributor contracts, agency representation, and long-term supply agreements.",
      terms: "Clear export pricing, tiered volume discounts, and co-op marketing support discussed upon partner qualification.",
      exclusivity: "Multi-country or single-market exclusivity granted upon achievement of mutually agreed performance milestones.",
      logistics: "Standard international Incoterms (FOB, FCA, CIF) with origin certificates and compliance documentation."
    },
    faqs: [
      {
        question: "How do export partnerships work on Partner Market Global?",
        answer: "We connect export-ready brand owners with verified international buyers and distributors. Qualified partners negotiate directly with principals under structured commercial terms."
      },
      {
        question: "What support do export brand owners provide?",
        answer: "Brand owners typically provide high-resolution marketing assets, technical product specifications, regulatory documentation, packaging adaptation guidance, and dedicated export account management."
      },
      {
        question: "Are there upfront fees for international buyers to explore export listings?",
        answer: "No. Partner Market Global is completely free for prospective buyers and distributors. Commercial fees are success-based commission arrangements established with brand owners."
      }
    ],
    seoKeywords: [
      "export opportunities",
      "export ready brands",
      "international trade opportunities",
      "overseas distribution partners",
      "global channel development",
      "export products wholesale"
    ]
  },
  "distribution-rights": {
    slug: "distribution-rights",
    typeKey: "distribution",
    title: "Distribution Rights & Commercial Territory Agreements",
    eyebrow: "Territory Partnerships",
    heroHeadline: "Exclusive & Territory Distribution Rights",
    heroSubheadline: "Secure exclusive national or regional distribution rights for market-leading Japanese character merchandise, food & beverage brands, and consumer goods.",
    directAnswer: "Distribution rights grant a qualified distributor the authorized commercial right to market, sell, and supply a brand's products within a defined geographic territory or market channel. On Partner Market Global, distribution opportunities include established Japanese character brands (like SONIC & FRIENDS), organic food producers, and precision hardware manufacturers.",
    definition: "Securing distribution rights through Partner Market Global gives commercial distributors direct access to verified principals without unnecessary intermediaries. We ensure clear agreement structures covering territory protection, MOQ schedules, marketing support, and renewal terms.",
    whoIsItFor: [
      { title: "National & Regional Distributors", desc: "Distributors with dedicated sales teams, warehousing, and existing account relationships with major retail chains." },
      { title: "HORECA & Foodservice Wholesalers", desc: "Specialist food distributors supplying restaurants, hotels, catering groups, and central kitchens." },
      { title: "Toy & Licensed Goods Distributors", desc: "Pop-culture, entertainment, and specialty toy distributors with retail chain connections." },
      { title: "Industrial & Hardware Suppliers", desc: "Commercial B2B distributors serving logistics, hospitality, and manufacturing sectors." }
    ],
    qualificationCriteria: [
      "Established sales and distribution network in the requested territory",
      "Warehousing, logistics, and inventory management capabilities",
      "Ability to commit to initial commercial order quantities and annual growth targets",
      "Commitment to brand standards and active market development"
    ],
    commercialStructure: {
      model: "Exclusive or non-exclusive territory distribution agreements with direct manufacturer contracting.",
      terms: "Confidential wholesale price lists, landed cost models, and promotional support schedules provided post-qualification.",
      exclusivity: "Territory exclusivity protected by written contract, subject to milestone order commitments.",
      logistics: "Container-load (FCL) or pallet-load (LCL) shipments direct from manufacturer facilities."
    },
    faqs: [
      {
        question: "How do I secure exclusive distribution rights for a brand?",
        answer: "Submit a qualified inquiry detailing your company's coverage, store network, and purchasing capacity. Following qualification, discussions with the brand owner will determine territory scope and volume commitments."
      },
      {
        question: "What is the typical duration of a distribution agreement?",
        answer: "Standard initial terms range from 1 to 3 years, with automatic extension clauses upon meeting agreed sales volume milestones."
      },
      {
        question: "Are marketing materials provided to distributors?",
        answer: "Yes. Brand owners provide comprehensive digital assets, brand guidelines, product catalogues, and in many cases co-marketing launch support."
      }
    ],
    seoKeywords: [
      "distribution rights",
      "exclusive distribution agreement",
      "territory distribution rights",
      "distributor wanted Europe",
      "licensed character distributor",
      "wholesale distribution rights"
    ]
  },
  "franchise-opportunities": {
    slug: "franchise-opportunities",
    typeKey: "franchise",
    title: "Franchise Opportunities & Restaurant Concepts",
    eyebrow: "Franchise Expansion",
    heroHeadline: "Proven International Franchise Concepts",
    heroSubheadline: "Explore verified restaurant, cafe, and retail franchise opportunities from established Japanese and international operating groups.",
    directAnswer: "A franchise opportunity allows qualified operators and retail entrepreneurs to license a proven commercial business concept, brand identity, operating manual, recipes, and supply chain. Franchisees benefit from established consumer recognition, standardized training, and ongoing operational support.",
    definition: "Partner Market Global features pre-screened franchise concepts with verified unit economics, multi-store operating track records, and structured international expansion models.",
    whoIsItFor: [
      { title: "Multi-Unit Restaurant Operators", desc: "Experienced F&B groups looking to diversify their brand portfolio with authentic Japanese and Asian concepts." },
      { title: "Retail & Hospitality Groups", desc: "Corporate operators with prime real estate access in shopping malls, high streets, and transport hubs." },
      { title: "Private Equity & Family Offices", desc: "Investors seeking scalable consumer brand rollouts with strong cash-flow fundamentals." },
      { title: "Experienced F&B Entrepreneurs", desc: "Operators with proven track records in restaurant management and local team leadership." }
    ],
    qualificationCriteria: [
      "Demonstrated F&B or retail operational experience and local management team",
      "Access to prime retail or restaurant real estate locations",
      "Sufficient working capital and investment capability for unit fit-out and initial operations",
      "Commitment to brand operational standards and quality control"
    ],
    commercialStructure: {
      model: "Standard franchise license agreement with initial franchise fee and ongoing royalty structure.",
      terms: "Detailed Financial Disclosure, unit economics, kitchen layout specs, and training curricula provided post-qualification.",
      exclusivity: "Single-unit, multi-unit area development, or territory rights available based on operator capacity.",
      logistics: "Proprietary sauces, soup bases, and core ingredients supplied via certified group supply chains."
    },
    faqs: [
      {
        question: "What franchise concepts are currently available?",
        answer: "Current opportunities include authentic Japanese ramen brands (Ichiban-ken), specialty unagi concepts (u technologies), and cafe/beverage concepts."
      },
      {
        question: "What training and setup support is included?",
        answer: "Franchisors provide full operational manuals, kitchen equipment specifications, staff training programs, recipe documentation, and on-site launch support."
      },
      {
        question: "What is the typical investment requirement for a franchise?",
        answer: "Investment requirements vary by concept and format (kiosk vs full-service restaurant), typically ranging from USD 150,000 to USD 500,000+ per location including fit-out and initial franchise fees."
      }
    ],
    seoKeywords: [
      "franchise opportunities",
      "restaurant franchise",
      "Japanese ramen franchise",
      "F&B franchise opportunities",
      "international franchise expansion",
      "multi-unit franchise"
    ]
  },
  "master-franchise-opportunities": {
    slug: "master-franchise-opportunities",
    typeKey: "master-franchise",
    title: "Master Franchise Rights & Country Developer Licenses",
    eyebrow: "Master Franchising",
    heroHeadline: "Country Master Franchise Rights",
    heroSubheadline: "Acquire exclusive country-level master franchise and area development rights for high-growth international restaurant and retail brands.",
    directAnswer: "A master franchise grants an experienced corporate operator exclusive rights to develop, own, and sub-franchise a brand across an entire country or multi-country region. Master franchisees receive full brand IP rights, supply chain exclusivity, and recurring sub-franchise revenue sharing.",
    definition: "Master franchise opportunities on Partner Market Global are designed for well-capitalized corporate groups capable of executing multi-store rollouts and establishing regional central kitchen or supply chain infrastructure.",
    whoIsItFor: [
      { title: "National F&B Conglomerates", desc: "Major hospitality groups with existing supply chain, commissary, and real estate networks." },
      { title: "Country Master Developers", desc: "Corporate developers with successful track records of scaling international franchise systems." },
      { title: "Institutional F&B Investors", desc: "Investment funds seeking platform investments with high-volume multi-unit expansion potential." },
      { title: "Regional Retail Operators", desc: "Retailers looking to add high-traffic restaurant and cafe brands to their proprietary commercial properties." }
    ],
    qualificationCriteria: [
      "Substantial capital reserves to fund multi-unit development schedules and master franchise fees",
      "Established corporate infrastructure (real estate acquisition, HR, central kitchen/logistics)",
      "Proven executive track record in hospitality or retail brand development",
      "Detailed 3–5 year country rollout and sub-franchising business plan"
    ],
    commercialStructure: {
      model: "Country Master Franchise Agreement granting exclusive national development and sub-franchising authorization.",
      terms: "Master fee, development milestone schedule, royalty split, and proprietary ingredient supply terms.",
      exclusivity: "Comprehensive nationwide exclusivity for the entire territory.",
      logistics: "Direct technical transfer, recipe standardization, and centralized raw material importation."
    },
    faqs: [
      {
        question: "What is the difference between a standard franchise and a master franchise?",
        answer: "A standard franchise grants rights to operate individual units. A master franchise grants exclusive rights to an entire country or region, allowing the master franchisee to open corporately owned units and sell sub-franchises to other operators."
      },
      {
        question: "How are master franchise territories protected?",
        answer: "Master franchise agreements provide absolute geographic exclusivity within the designated country, preventing the franchisor or other third parties from opening units in that territory."
      },
      {
        question: "What return-on-investment timeline should master franchisees expect?",
        answer: "Master franchise models generate multiple revenue streams (corporate store profits, sub-franchise upfront fees, recurring royalty shares, and supply chain margins), typically achieving full platform scale over 3 to 5 years."
      }
    ],
    seoKeywords: [
      "master franchise opportunities",
      "country master franchise",
      "area development rights",
      "master franchisee wanted",
      "restaurant master franchise",
      "exclusive country franchise"
    ]
  },
  "licensing-opportunities": {
    slug: "licensing-opportunities",
    typeKey: "licensing",
    title: "Licensing Opportunities & Character IP Brand Partnerships",
    eyebrow: "IP & Brand Licensing",
    heroHeadline: "Official Character IP & Brand Licensing",
    heroSubheadline: "Partner with global entertainment giants like SEGA and Japanese creative studios for official character merchandise, apparel, and lifestyle products.",
    directAnswer: "A licensing opportunity allows manufacturers, retail chains, and publishers to apply world-renowned character IP, gaming franchises, and designer trademarks to their commercial merchandise. On Partner Market Global, this includes major initiatives like the 2027 SONIC & FRIENDS European retail and distribution program.",
    definition: "Licensing and IP partnerships connect creative brand owners with manufacturers and retailers to expand brand reach while generating substantial consumer demand. All IP opportunities listed on Partner Market Global are verified for legitimate copyright ownership and official authorization.",
    whoIsItFor: [
      { title: "Consumer Goods Manufacturers", desc: "Producers of toys, plush, apparel, stationery, confectionery, and homeware seeking high-demand licensed IP." },
      { title: "National Retail Chains", desc: "Department stores and specialty chains looking for direct-to-retail licensed collections and exclusive SKUs." },
      { title: "Promotional & Event Partners", desc: "Agencies and operators organizing themed pop-ups, entertainment events, and licensed live experiences." },
      { title: "Pop-Culture & Gaming Wholesalers", desc: "Distributors supplying comic shops, hobby retailers, gaming stores, and anime conventions." }
    ],
    qualificationCriteria: [
      "Demonstrated manufacturing quality standards, safety certifications (CE, UKCA), and ethical audit compliance",
      "Established retail distribution network and marketing capability in target markets",
      "Financial standing to meet guaranteed minimum royalty (MG) and production commitments",
      "Strict adherence to brand style guides, character integrity, and legal copyright attribution"
    ],
    commercialStructure: {
      model: "Standard merchandise licensing agreements, direct retail listings, or master distributor appointments.",
      terms: "Royalty rates, advance payments, minimum guarantees, and territory windows defined by category.",
      exclusivity: "Category-exclusive or channel-exclusive product rights subject to negotiation.",
      logistics: "Factory direct supply (e.g. Shenzhen FOB) or domestic localized contract manufacturing."
    },
    faqs: [
      {
        question: "How do character licensing partnerships work?",
        answer: "Licensees receive official 3D models, vector asset packs, and packaging guidelines from the brand owner (e.g. SEGA). The licensee manufactures and distributes approved merchandise within specified territories under agreed royalty terms."
      },
      {
        question: "What character IP opportunities are currently active?",
        answer: "Current highlights include the SONIC & FRIENDS European retail range for the 2027 theatrical release window, as well as AIR TWOKYO anime-licensed apparel collections."
      },
      {
        question: "How do retailers get access to pre-manufactured licensed merchandise?",
        answer: "Retailers can buy pre-approved, manufactured licensed lines on an FOB or wholesale basis without paying separate licensing royalties, as all IP royalties are already embedded in the product agreement."
      }
    ],
    seoKeywords: [
      "licensing opportunities",
      "character licensing Europe",
      "Sonic merchandise license",
      "anime apparel licensing",
      "brand partnership opportunities",
      "entertainment IP licensing"
    ]
  },
  "private-label-oem-opportunities": {
    slug: "private-label-oem-opportunities",
    typeKey: "oem",
    title: "Private Label & OEM Contract Manufacturing",
    eyebrow: "Contract Manufacturing",
    heroHeadline: "Audited Private Label & OEM Producers",
    heroSubheadline: "Source certified contract manufacturing for ambient retort foods, specialty beverages, cosmetics, and industrial plastics under your own brand.",
    directAnswer: "A private label or OEM (Original Equipment Manufacturer) opportunity connects brand owners, supermarket chains, and wholesalers with audited manufacturing plants to produce custom formulations, packaging, and products branded entirely with the client's own label.",
    definition: "Partner Market Global showcases vetted manufacturing facilities with established quality management certifications (ISO 22000, HACCP, GMP, Halal, Organic JAS). We enable international buyers to negotiate contract manufacturing agreements with complete transparency regarding capacity and MOQ.",
    whoIsItFor: [
      { title: "Supermarket & Retail Brands", desc: "Retail chains expanding their proprietary store-brand food, beverage, and household product lines." },
      { title: "Brand Owners & DTC Companies", desc: "Consumer brands seeking reliable third-party contract manufacturers with scalable production." },
      { title: "Foodservice Chains & Caterers", desc: "Restaurant groups looking for custom-formulated sauces, ready-to-eat retort meal pouches, and ingredients." },
      { title: "Import Wholesalers", desc: "Wholesalers creating exclusive white-label product portfolios for their regional distribution channels." }
    ],
    qualificationCriteria: [
      "Clear product specifications, recipe requirements, and packaging design assets",
      "Capacity to meet commercial batch production runs and production lead times",
      "Agreement on quality control parameters, sample testing protocols, and compliance verifications",
      "Standard international trade credit and commercial payment terms"
    ],
    commercialStructure: {
      model: "OEM/ODM contract manufacturing agreements with client-owned brand and packaging specifications.",
      terms: "Unit cost based on volume tiers, recipe complexity, and packaging materials. Quotes provided upon technical brief.",
      exclusivity: "Custom recipe and formulation exclusivity protected by non-disclosure and supply agreements.",
      logistics: "Export container shipments direct from factory with full phytosanitary, lab analysis, and export documentation."
    },
    faqs: [
      {
        question: "What is the difference between OEM and Private Label?",
        answer: "Private label typically involves applying your brand packaging to an existing proven manufacturer formulation. OEM involves custom manufacturing according to your exact formulation, design, and engineering specifications."
      },
      {
        question: "What certifications do our contract manufacturers hold?",
        answer: "Our manufacturing partners hold international certifications including ISO 22000, HACCP, GMP, Organic JAS, and Halal certification."
      },
      {
        question: "Can manufacturers produce custom packaging in our local language?",
        answer: "Yes. Contract manufacturers support multi-language packaging, barcode application, and regulatory nutritional panels tailored to your destination market."
      }
    ],
    seoKeywords: [
      "private label opportunities",
      "OEM contract manufacturing",
      "retort food manufacturer OEM",
      "custom formulation manufacturer",
      "white label food products",
      "contract packaging partner"
    ]
  },
  "country-partner-opportunities": {
    slug: "country-partner-opportunities",
    typeKey: "country-partner",
    title: "Country Partner Opportunities & Strategic Alliances",
    eyebrow: "Strategic Market Entry",
    heroHeadline: "National Country Partner & Joint Venture Opportunities",
    heroSubheadline: "Form high-level strategic partnerships, joint ventures, or country-level commercial alliances with innovative global enterprises.",
    directAnswer: "A country partner opportunity establishes a comprehensive commercial alliance where an international brand collaborates with an established domestic corporate partner for full market entry, regulatory oversight, local infrastructure, and long-term commercial execution.",
    definition: "Country partnerships go beyond standard transactional wholesale by establishing shared commercial interests, localized operational leadership, and potential joint venture or equity collaboration.",
    whoIsItFor: [
      { title: "Corporate Groups & Conglomerates", desc: "Well-established local business groups with diversified holdings in retail, distribution, and real estate." },
      { title: "Strategic Industry Leaders", desc: "Companies operating in complementary sectors capable of integrating new product lines into existing operations." },
      { title: "Joint Venture Candidates", desc: "Partners seeking shared-equity or strategic co-investment market development structures." },
      { title: "Market Entry Specialists", desc: "Firms specialized in navigating complex local regulations, import licenses (e.g. BPOM, FDA), and channel setup." }
    ],
    qualificationCriteria: [
      "Strong corporate reputation, financial stability, and local governance compliance",
      "Demonstrated ability to provide localized executive leadership and market development resources",
      "Existing relationships with regulatory bodies, trade associations, and major commercial buyers",
      "Strategic alignment with the principal's long-term brand equity and expansion vision"
    ],
    commercialStructure: {
      model: "Strategic alliance, country partnership agreement, or joint venture structure.",
      terms: "Custom terms defining revenue sharing, operational milestones, governance, and capital contribution.",
      exclusivity: "Sole strategic country representation.",
      logistics: "Integrated supply chain and localized fulfillment planning."
    },
    faqs: [
      {
        question: "What does a country partner relationship entail?",
        answer: "A country partner acts as the primary representative and operating partner for the brand within their nation, handling channel rollouts, marketing, key accounts, and strategic execution."
      },
      {
        question: "Are M&A or equity investment discussions possible?",
        answer: "Yes. Select opportunities on Partner Market Global (such as the Ebara Foods Southeast Asia initiative) are open to exploratory strategic investment and M&A discussions with qualified entities."
      },
      {
        question: "How do we initiate country partner discussions?",
        answer: "Submit an inquiry detailing your group's infrastructure, annual revenue band, and strategic rationale. Qualified candidates will be invited to executive introductory discussions."
      }
    ],
    seoKeywords: [
      "country partner opportunities",
      "strategic business alliance",
      "joint venture partner",
      "market entry partner",
      "national commercial alliance",
      "international business partner wanted"
    ]
  }
};

export function getMatchingOpportunities(typeKey: string): Opportunity[] {
  const tk = typeKey.toLowerCase();
  if (tk === "import") {
    return opportunities.filter(o => 
      o.type.toLowerCase().includes("import") || 
      o.type.toLowerCase().includes("distribution") || 
      o.type.toLowerCase().includes("wholesale")
    );
  }
  if (tk === "export") {
    return opportunities.filter(o => 
      o.type.toLowerCase().includes("distribution") || 
      o.type.toLowerCase().includes("wholesale") || 
      o.type.toLowerCase().includes("export")
    );
  }
  if (tk === "distribution") {
    return opportunities.filter(o => 
      o.type.toLowerCase().includes("distribution") || 
      o.type.toLowerCase().includes("retail") ||
      o.type.toLowerCase().includes("wholesale")
    );
  }
  if (tk === "franchise") {
    return opportunities.filter(o => 
      o.type.toLowerCase().includes("franchise") ||
      o.sector.toLowerCase().includes("restaurant") ||
      o.sector.toLowerCase().includes("food & beverage")
    );
  }
  if (tk === "master-franchise") {
    return opportunities.filter(o => 
      o.type.toLowerCase().includes("master franchise") ||
      o.type.toLowerCase().includes("franchise")
    );
  }
  if (tk === "licensing") {
    return opportunities.filter(o => 
      o.type.toLowerCase().includes("licensing") ||
      o.sector.toLowerCase().includes("licensed") ||
      o.sector.toLowerCase().includes("character")
    );
  }
  if (tk === "oem") {
    return opportunities.filter(o => 
      o.type.toLowerCase().includes("private label") ||
      o.type.toLowerCase().includes("oem") ||
      o.type.toLowerCase().includes("manufacturing")
    );
  }
  if (tk === "country-partner") {
    return opportunities.filter(o => 
      o.type.toLowerCase().includes("country partner") ||
      o.type.toLowerCase().includes("strategic") ||
      o.type.toLowerCase().includes("master")
    );
  }
  return opportunities.filter(o => o.featured);
}
