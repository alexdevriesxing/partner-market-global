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
};

export const opportunities: Opportunity[] = [
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
    featured: true
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
    featured: true
  },
  {
    id: "opp-twokyo-air",
    slug: "twokyo-air-japanese-anime-apparel-brand-international-distributors-retailers",
    title: "Twokyo Air Japanese Anime Apparel Brand Seeking International Distributors and Retailers",
    type: "Distribution / Retail",
    sector: "Fashion / Anime Apparel",
    originCountry: "Japan",
    targetMarkets: ["Global", "Europe", "North America", "Asia"],
    heroImage: "/assets/opportunity-card-beauty.webp",
    cardImage: "/assets/opportunity-card-beauty.webp",
    summary:
      "Japanese anime apparel brand looking for international distributors and retailers.",
    description:
      "Twokyo Air is a Japanese anime apparel brand seeking international distributors and retailers that can introduce the brand to suitable fashion, anime, streetwear and pop-culture channels.",
    companyBackground:
      "The opportunity is presented for a Japanese anime apparel brand with international retail and distribution ambitions.",
    productDetails:
      "The opportunity can include anime-inspired apparel and brand merchandise. Line sheets, product details, lookbooks, sizing, wholesale terms and brand materials are available after qualification.",
    marketOpportunity:
      "Anime, Japanese pop culture and streetwear audiences create opportunities for retailers and distributors that understand fandom-led apparel and online community-driven merchandising.",
    partnerProfile:
      "Ideal partners are fashion distributors, streetwear retailers, anime and comic retailers, pop-culture stores, e-commerce operators and regional retail groups.",
    commercialModel:
      "Wholesale distribution and retail partnership models are available on inquiry. Territory, exclusivity, order volumes and commission terms are agreed case by case.",
    territoryAvailability:
      "Open for selected international territories and retail channels after qualification.",
    investmentRequirement:
      "Minimum order quantity, wholesale pricing, launch stock and retail support are discussed after inquiry.",
    credentials: ["Client opportunity submitted", "Brand materials available on request", "Distributor and retailer inquiries welcome"],
    verificationBadges: ["Client Opportunity", "Anime Apparel", "Retail Ready"],
    documentsAvailable: ["Brand profile", "Product line overview", "Wholesale terms on inquiry", "Retail materials on request"],
    risks:
      "Retail partners must review import duties, sizing, product compliance, IP and licensing considerations, channel fit and local consumer demand.",
    status: "Open for inquiries",
    featured: true
  }
];

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
