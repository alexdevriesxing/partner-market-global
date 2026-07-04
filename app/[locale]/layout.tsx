import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import { site } from "@/lib/data";
import { siteStructuredData } from "@/lib/seo";
import "../globals.css";
import { Navigation } from "@/components/Navigation";
import { FooterWrapper } from "@/components/FooterWrapper";
import { StructuredData } from "@/components/StructuredData";

export const dynamic = "force-static";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`
  },
  description: site.description,
  keywords: [
    "B2B marketplace",
    "import opportunities",
    "export opportunities",
    "distribution rights",
    "franchise opportunities",
    "licensing partnerships",
    "private label OEM",
    "international business partners"
  ],
  authors: [{ name: site.operator.name, url: site.operator.url }],
  creator: `${site.operator.name}, ${site.operator.company}`,
  publisher: site.name,
  category: "business",
  alternates: { canonical: site.url },
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/assets/partner-market-global-logo.svg"
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
    images: [{ url: site.defaultOgImage, width: 1200, height: 630, alt: site.name }]
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [site.defaultOgImage]
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
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#115be7",
  colorScheme: "light"
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <StructuredData data={siteStructuredData(locale)} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navigation />
          <main className="page-shell">{children}</main>
          <div className="page-shell">
            <FooterWrapper locale={locale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
