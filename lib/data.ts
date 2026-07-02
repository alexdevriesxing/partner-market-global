export const site = {
  name: "Partner Market Global",
  domain: "www.partnermarketglobal.com",
  url: "https://www.partnermarketglobal.com",
  tagline: "Curated. Verified. Global.",
  description:
    "Partner Market Global is a curated B2B showcase for import, export, distribution, licensing, private label and franchise opportunities from ambitious companies looking for qualified international partners.",
  email: "listings@partnermarketglobal.com"
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
    id: "opp-japan-food",
    slug: "premium-japanese-food-brand-european-import-distribution",
    title: "Premium Japanese Food Brand Seeking European Import & Distribution Partners",
    type: "Export / Distribution",
    sector: "Food & Beverage",
    originCountry: "Japan",
    targetMarkets: ["Europe", "Netherlands", "Nordics", "Indonesia"],
    heroImage: "/assets/detail-hero-food.webp",
    cardImage: "/assets/opportunity-card-food.webp",
    summary:
      "Authentic Japanese noodles, sauces and gourmet pantry products seeking qualified importers and foodservice distributors.",
    description:
      "A leading Japanese food producer is looking for experienced European and Asian market partners to introduce premium pantry products, sauces and noodle ranges into retail, horeca and specialty food channels.",
    companyBackground:
      "The company has established domestic retail distribution in Japan and exports selected lines to nearby Asian markets. The brand focuses on premium ingredients, modern packaging and authentic food culture.",
    productDetails:
      "The opportunity includes ambient food products, sauces, noodles, gift boxes and foodservice packs. Samples and catalogues are available after qualification.",
    marketOpportunity:
      "Demand for authentic Japanese food continues to grow in supermarkets, delicatessen, specialty Asian retail and foodservice channels. Partners can position the range as premium, reliable and culturally authentic.",
    partnerProfile:
      "Ideal partners are importers, distributors or foodservice operators with access to specialty retail, horeca, Asian grocery, gourmet shops or online food channels.",
    commercialModel:
      "Importer/distributor model with margin structure agreed by territory. Exclusive distribution may be available after pilot performance.",
    territoryAvailability:
      "Open for selected European countries, Indonesia and selected Middle East markets.",
    investmentRequirement:
      "Expected initial order range: €10K–€30K depending on market, certification and launch scope.",
    credentials: ["Company profile reviewed", "Product catalogue available", "Export documents on request", "Sample request possible"],
    verificationBadges: ["Verified Company", "Export Ready", "Samples Available", "Documents on Request"],
    documentsAvailable: ["Company profile PDF", "Product catalogue PDF", "Certifications PDF", "Export documents PDF"],
    risks:
      "Food regulations, market registration, importer compliance and local labelling requirements must be reviewed by the partner before launch.",
    status: "Open for inquiries",
    featured: true
  },
  {
    id: "opp-beauty-korea",
    slug: "natural-skincare-brand-seeking-gcc-eu-partners",
    title: "Natural Skincare Brand Seeking Partners",
    type: "Distribution",
    sector: "Beauty & Wellness",
    originCountry: "South Korea",
    targetMarkets: ["UAE", "KSA", "Qatar", "Europe"],
    heroImage: "/assets/opportunity-card-beauty.webp",
    cardImage: "/assets/opportunity-card-beauty.webp",
    summary:
      "Clean skincare and personal care range looking for qualified beauty distributors and retail partners.",
    description:
      "An emerging natural skincare brand is seeking partners with access to beauty retail, pharmacies, marketplaces and social commerce channels.",
    companyBackground:
      "The brand combines clean formulations with premium packaging and affordable positioning for mid-to-premium retail.",
    productDetails:
      "Skincare, serums, cleansers, moisturisers, gift sets and trial kits.",
    marketOpportunity:
      "Natural beauty remains attractive for cross-border retail and influencer-driven market entry.",
    partnerProfile:
      "Beauty distributors, pharmacy suppliers, marketplace operators and retail importers.",
    commercialModel:
      "Distribution partnership with territory-based targets and optional exclusive rights.",
    territoryAvailability:
      "GCC, Europe and selected ASEAN territories available.",
    investmentRequirement:
      "Initial launch stock and marketing budget to be agreed by channel plan.",
    credentials: ["Brand deck reviewed", "Product specifications available", "Samples available"],
    verificationBadges: ["Verified", "Samples Available", "Clean Beauty"],
    documentsAvailable: ["Brand deck PDF", "Product specs PDF", "Marketing assets"],
    risks:
      "Cosmetic notification, claims review and ingredient compliance must be validated per market.",
    status: "Open for inquiries",
    featured: true
  },
  {
    id: "opp-hydraulic-europe",
    slug: "hydraulic-components-distributor-wanted-europe",
    title: "Hydraulic Components Distributor Wanted",
    type: "Distribution",
    sector: "Industrial / Hydraulics",
    originCountry: "Germany",
    targetMarkets: ["Europe"],
    heroImage: "/assets/opportunity-card-hydraulic.webp",
    cardImage: "/assets/opportunity-card-hydraulic.webp",
    summary:
      "Industrial hydraulic components supplier seeking service-driven distributors across Europe.",
    description:
      "A technical components supplier is looking for regional distributors with workshop, repair, OEM or industrial sales access.",
    companyBackground:
      "The company supplies industrial-grade hydraulic components to machine builders, agriculture, logistics and service workshops.",
    productDetails:
      "Pumps, valves, fittings, couplings, filtration components and maintenance-related hydraulic parts.",
    marketOpportunity:
      "Industrial maintenance and replacement parts demand remains resilient when supported by local stock and technical knowledge.",
    partnerProfile:
      "Hydraulic repair shops, technical distributors, OEM suppliers and industrial service companies.",
    commercialModel:
      "Distributor margin model with optional technical onboarding and preferred partner status.",
    territoryAvailability:
      "Selected European regions available.",
    investmentRequirement:
      "Starter stock package recommended; exact level depends on market and customer base.",
    credentials: ["Product range reviewed", "Technical datasheets available", "Distributor onboarding possible"],
    verificationBadges: ["Verified", "B2B Industrial", "OEM Confirmed"],
    documentsAvailable: ["Catalogue PDF", "Technical datasheets", "Partner terms"],
    risks:
      "Partners need technical capability, product liability review and suitable aftersales processes.",
    status: "Open for inquiries",
    featured: true
  },
  {
    id: "opp-cafe-franchise",
    slug: "specialty-coffee-shop-franchise-asean",
    title: "Specialty Coffee Shop Franchise",
    type: "Franchise",
    sector: "Foodservice",
    originCountry: "Australia",
    targetMarkets: ["ASEAN", "Middle East"],
    heroImage: "/assets/opportunity-card-cafe.webp",
    cardImage: "/assets/opportunity-card-cafe.webp",
    summary:
      "Modern coffee franchise concept looking for master franchise and operator partners.",
    description:
      "A specialty coffee and casual dining concept is looking for experienced foodservice operators to open franchise locations in selected territories.",
    companyBackground:
      "The concept operates a proven café format with brand standards, training, interior guidelines and menu playbook.",
    productDetails:
      "Franchise package includes brand usage, menu engineering, store layout, operational playbook and training support.",
    marketOpportunity:
      "Coffee, breakfast, dessert and casual work-friendly café concepts remain attractive in urban malls, mixed-use areas and high-street locations.",
    partnerProfile:
      "Foodservice groups, franchise operators, mall operators and master franchise investors.",
    commercialModel:
      "Franchise fee, royalty and launch package. Master franchise rights may be available.",
    territoryAvailability:
      "ASEAN and Middle East markets available by approval.",
    investmentRequirement:
      "Store investment depends on format, real estate, fit-out and country-specific franchise package.",
    credentials: ["Brand guide available", "Franchise deck reviewed", "Operating model available"],
    verificationBadges: ["Verified", "Franchise Package", "OpCo Outfits"],
    documentsAvailable: ["Franchise deck", "Store model", "Training overview"],
    risks:
      "Local franchise regulations, lease economics, staffing and operating costs must be reviewed carefully.",
    status: "Open for inquiries",
    featured: true
  },
  {
    id: "opp-private-label-oem",
    slug: "private-label-oem-manufacturing-ergonomic-furniture",
    title: "Private Label / OEM Manufacturing Opportunity",
    type: "Private Label / OEM",
    sector: "Manufacturing / Furniture",
    originCountry: "Netherlands",
    targetMarkets: ["Europe", "UK", "Scandinavia"],
    heroImage: "/assets/detail-hero-food.webp",
    cardImage: "/assets/opportunity-card-food.webp",
    summary:
      "Dutch ergonomic furniture manufacturer offering private label and OEM partnerships for international retailers and brands.",
    description:
      "A Dutch manufacturer of ergonomic office chairs, standing desks and workspace furniture is looking for private label and OEM partners to produce complete collections under the partner brand.",
    companyBackground:
      "The manufacturer operates a 4,000 m² production facility in the Netherlands with BIFMA and EN1335 certification and over 15 years of experience supplying major European retailers.",
    productDetails:
      "Product range includes ergonomic task chairs, executive chairs, sit-stand desks, monitor arms and accessories. Tooling, custom colours and branded packaging available.",
    marketOpportunity:
      "The global ergonomic furniture market continues to grow as remote and hybrid work normalises. Private label enables retailers to差异化 their offering without investing in R&D.",
    partnerProfile:
      "Office furniture retailers, e-commerce operators, contract furniture companies and workspace solution providers seeking custom-branded products.",
    commercialModel:
      "Private label MOQ of 50 units per SKU. OEM pricing based on volume and customisation. Tooling investment may apply for new designs.",
    territoryAvailability:
      "Open for Europe, UK and selected global markets.",
    investmentRequirement:
      "Initial tooling deposit and first order investment required. Exact level based on product scope.",
    credentials: ["BIFMA certified", "EN1335 compliant", "ISO9001 manufacturer", "Custom branding available"],
    verificationBadges: ["Verified", "Manufacturing", "BIFMA Certified", "Custom Branding"],
    documentsAvailable: ["Product catalogue PDF", "Certification documents PDF", "Private label terms PDF", "MOQ guide PDF"],
    risks:
      "Partners must verify import duties, furniture safety standards and any required local testing for their market.",
    status: "Open for inquiries",
    featured: false
  },
  {
    id: "opp-country-partner",
    slug: "country-partner-healthy-snack-brand-middle-east",
    title: "Country Partner Opportunity",
    type: "Country Partner",
    sector: "Food & Beverage",
    originCountry: "Netherlands",
    targetMarkets: ["UAE", "KSA", "Qatar", "Kuwait", "Bahrain", "Oman"],
    heroImage: "/assets/opportunity-card-food.webp",
    cardImage: "/assets/opportunity-card-food.webp",
    summary:
      "Dutch healthy snack brand seeking exclusive country or regional partners in the GCC.",
    description:
      "A Dutch producer of premium healthy snacks — including nut butter packs, protein bars and seed crackers — is looking for an exclusive country partner or regional master distributor to launch across the GCC.",
    companyBackground:
      "Founded in Amsterdam in 2019, the brand has established retail presence in the Netherlands, Belgium and the UK through health food stores, supermarkets and online channels.",
    productDetails:
      "Ambient shelf-stable snacks with clean labels, suitable for retail, convenience and e-commerce. Halal certified and free-from formulations available.",
    marketOpportunity:
      "The GCC health food market is growing at 12–15% CAGR. Consumer demand for clean-label, international brands with strong social media presence is strong across UAE, KSA and Qatar.",
    partnerProfile:
      "Established food importers and distributors with access to modern retail, health food chains, hotel groups and e-commerce platforms in the GCC.",
    commercialModel:
      "Exclusive country distribution with agreed minimum annual volumes, marketing investment commitments and distributor margin structure.",
    territoryAvailability:
      "UAE exclusive, with potential for broader GCC regional rights based on performance.",
    investmentRequirement:
      "Initial stock investment of approximately €15,000–€40,000 depending on territory scope and launch plan.",
    credentials: ["Halal certified", "Clean label", "EU food safety standards", "Award-winning brand"],
    verificationBadges: ["Verified", "Halal Certified", "Exclusive Territory", "Marketing Support"],
    documentsAvailable: ["Company profile PDF", "Product range PDF", "Halal certificates PDF", "Launch plan guide PDF"],
    risks:
      "Partners must ensure GCC food import regulations, labelling requirements in Arabic and any required COOL compliance are met.",
    status: "Open for inquiries",
    featured: false
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
    name: "Basic Curated Listing",
    price: "€149",
    recurring: "+ €49 / month",
    cta: "Get Started",
    features: ["Standard profile page", "Inquiry form & lead capture", "Standard placement", "Basic support"]
  },
  {
    name: "Premium Showcase",
    price: "€399",
    recurring: "+ €149 / month",
    popular: true,
    cta: "Get Started",
    features: ["Everything in Basic", "Featured placement", "Enhanced profile & visuals", "Priority support"]
  },
  {
    name: "Partner Search Campaign",
    price: "€950+",
    recurring: "One-time",
    cta: "Get Started",
    features: ["Everything in Premium", "Targeted outreach", "Curated prospect list", "Campaign report"]
  },
  {
    name: "Success / Introduction Fee",
    price: "Custom",
    recurring: "By agreement",
    cta: "Contact Us",
    features: ["Only where legally appropriate", "Based on value & scope", "Transparent terms"]
  }
];

export const curationSteps = [
  ["1", "Submit Application", "Tell us about your opportunity."],
  ["2", "Review & Verification", "We review and verify your business and documents."],
  ["3", "Profile Creation", "We build your premium opportunity profile."],
  ["4", "Go Live", "Your opportunity goes live on our platform."],
  ["5", "Receive Inquiries", "Connect with qualified international partners."]
];
