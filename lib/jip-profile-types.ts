export type DirectoryTag =
  | "import"
  | "export"
  | "distribution"
  | "franchise"
  | "licensing"
  | "private-label-oem";

export interface JipProfileImage {
  base?: string;
  src?: string;
  alt: string;
  caption?: string;
}

export interface JipProfile {
  key: string;
  id: string;
  slug: string;
  /** Only "published" records are exposed on the site; "draft" records stay in the repo but are excluded from routes, sitemap and listings. */
  status: "published" | "draft";
  draftReason: string | null;
  /** ISO date the listing was added on this site (used for "latest" ordering; never reassigned to old listings). */
  addedOn?: string;
  legalName: string;
  legalNameVerified: boolean;
  brand: string;
  officialWebsites: string[];
  headquarters: string | null;
  title: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  type: string;
  directoryTags: DirectoryTag[];
  sector: string;
  targetMarkets: string[];
  targetPartners: string[];
  executiveOverview: string;
  keyFacts: { label: string; value: string }[];
  credentials: string[];
  verificationBadges: string[];
  sections: { id: string; heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  documentsAvailable: string[];
  risks: string;
  territoryAvailability: string;
  commercialModel: string;
  keywords: string[];
  sources: { url: string; note: string }[];
  images: {
    hero: JipProfileImage | null;
    card: JipProfileImage | null;
    editorial: JipProfileImage | null;
  };
  imageDisclosure: string;
  verificationNotes: string[];
}
