import type { MetadataRoute } from "next";
import { opportunities, site } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Array<{ route: string; priority: number; changeFrequency: "daily" | "weekly" }> = [
    { route: "", priority: 1, changeFrequency: "daily" },
    { route: "/opportunities", priority: 0.8, changeFrequency: "weekly" },
    { route: "/list-your-opportunity", priority: 0.8, changeFrequency: "weekly" },
    { route: "/commercial-terms", priority: 0.8, changeFrequency: "weekly" },
    { route: "/curation-process", priority: 0.8, changeFrequency: "weekly" },
    { route: "/about", priority: 0.8, changeFrequency: "weekly" },
    { route: "/contact", priority: 0.8, changeFrequency: "weekly" },
    { route: "/privacy-policy", priority: 0.8, changeFrequency: "weekly" },
    { route: "/terms", priority: 0.8, changeFrequency: "weekly" }
  ];

  return [
    ...staticRoutes.map(({ route, priority, changeFrequency }) => ({
      url: `${site.url}${route}`,
      lastModified: new Date("2026-07-02"),
      changeFrequency,
      priority
    })),
    ...opportunities.map((opportunity) => ({
      url: `${site.url}/opportunities/${opportunity.slug}`,
      lastModified: new Date("2026-07-02"),
      changeFrequency: "weekly" as const,
      priority: 0.9
    }))
  ];
}
