import type { MetadataRoute } from "next";
import { opportunities } from "@/lib/data";
import { locales } from "@/i18n";
import { canonicalUrl, localizedLanguages } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-04");
  const staticRoutes = [
    { route: "", priority: 1, changeFrequency: "daily" as const },
    { route: "/opportunities", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/list-your-opportunity", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/commercial-terms", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/curation-process", priority: 0.7, changeFrequency: "weekly" as const },
    { route: "/about", priority: 0.7, changeFrequency: "weekly" as const },
    { route: "/contact", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/privacy-policy", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/terms", priority: 0.5, changeFrequency: "monthly" as const }
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const { route, priority, changeFrequency } of staticRoutes) {
      entries.push({
        url: canonicalUrl(locale, route),
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: localizedLanguages(route)
        }
      });
    }

    for (const opportunity of opportunities) {
      entries.push({
        url: canonicalUrl(locale, `/opportunities/${opportunity.slug}`),
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.9,
        alternates: {
          languages: localizedLanguages(`/opportunities/${opportunity.slug}`)
        }
      });
    }
  }

  return entries;
}
