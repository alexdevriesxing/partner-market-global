import type { MetadataRoute } from "next";
import { site } from "@/lib/data";
import { locales } from "@/i18n";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const disallowAdmin = locales.map((locale) => `/${locale}/admin`);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowAdmin
      }
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url
  };
}
