import type { Metadata } from "next";
import { locales } from "@/i18n";
import { site } from "@/lib/data";

const withLeadingSlash = (path = "") => {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
};

export function absoluteUrl(path = "") {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${site.url}${withLeadingSlash(path)}`;
}

export function canonicalUrl(locale: string, path = "") {
  const url = absoluteUrl(`/${locale}${withLeadingSlash(path)}`);
  return url.endsWith("/") ? url : `${url}/`;
}

export function localizedLanguages(path = "") {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, canonicalUrl(locale, path)])),
    "x-default": canonicalUrl("en", path)
  };
}

export function localizedAlternates(locale: string, path = ""): Metadata["alternates"] {
  return {
    canonical: canonicalUrl(locale, path),
    languages: localizedLanguages(path)
  };
}

export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  image = site.defaultOgImage,
  noIndex = false
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = canonicalUrl(locale, path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
            nocache: true
          }
        }
      : {})
  };
}

export function siteStructuredData(locale: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: absoluteUrl(site.logo),
      image: absoluteUrl(site.logo),
      description: site.description,
      slogan: site.tagline,
      email: site.email,
      sameAs: [site.operator.url],
      areaServed: "Worldwide",
      knowsAbout: [
        "import opportunities",
        "export opportunities",
        "international distribution rights",
        "master franchise opportunities",
        "brand licensing partnerships",
        "private label and OEM sourcing",
        "Japanese market entry and JIP Japan opportunities",
        "international B2B partner search"
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: site.email,
          contactType: "business inquiries",
          availableLanguage: ["English"]
        }
      ],
      founder: {
        "@type": "Person",
        name: site.operator.name,
        url: site.operator.url,
        affiliation: {
          "@type": "Organization",
          name: site.operator.company,
          url: site.operator.url
        }
      },
      publishingPrinciples: canonicalUrl(locale, "/terms")
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      inLanguage: locale,
      publisher: {
        "@id": `${site.url}/#organization`
      },
      description: site.description
    }
  ];
}
