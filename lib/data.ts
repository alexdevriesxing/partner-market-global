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
  imageAlt: string;
  imagePath: string;
  imageSourcePage?: string;
  imageSourceLocalOriginal?: string;
  isRegulated?: boolean;
  regulatoryNote?: string;
  ipRiskNote?: string;
}

const mappedJipOpportunities: Opportunity[] = (jipOpportunitiesRaw as unknown as JipRaw[]).map((jip) => {
  const originCountry = jip.company === "Chinese Manufacturer Products" ? "China" : "Japan";
  const formattedType = Array.isArray(jip.opportunityType) ? jip.opportunityType.join(" / ") : jip.opportunityType;
  
  return {
    id: jip.id,
    slug: jip.slug,
    title: jip.title,
    type: formattedType,
    sector: jip.category + (jip.subCategory ? ` / ${jip.subCategory}` : ""),
    originCountry,
    targetMarkets: jip.marketRegions || [],
    heroImage: `/images/opportunities/${jip.imageFile}`,
    cardImage: `/images/opportunities/${jip.imageFile}`,
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
    imageAlt: jip.imageAlt
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
