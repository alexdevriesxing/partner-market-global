import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Partner Market Global | Curated Import, Export & Franchise Opportunities",
    template: "%s | Partner Market Global"
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "partner market global",
    "import opportunities",
    "export opportunities",
    "franchise opportunities",
    "distribution rights",
    "international business partners",
    "master franchise",
    "licensing opportunities",
    "private label manufacturing",
    "B2B marketplace"
  ],
  alternates: {
    canonical: site.url
  },
  openGraph: {
    title: "Partner Market Global",
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: "/assets/reference-mockup.webp",
        width: 1536,
        height: 1024,
        alt: "Partner Market Global website showcase"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner Market Global",
    description: site.description,
    images: ["/assets/reference-mockup.webp"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/assets/partner-market-global-logo.svg`,
  description: site.description,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: site.email,
    availableLanguage: ["English"]
  },
  sameAs: []
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.description,
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.url}/opportunities?search={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StructuredData data={[organizationSchema, websiteSchema]} />
        <Header />
        <main className="page-shell">{children}</main>
        <div className="page-shell">
          <Footer />
        </div>
      </body>
    </html>
  );
}
