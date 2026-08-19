import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { categoryDefinitions } from "@/lib/category-pages";
import { CategoryPageTemplate } from "@/components/CategoryPageTemplate";
import { pageMetadata } from "@/lib/seo";

const data = categoryDefinitions["private-label-oem-opportunities"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return pageMetadata({
    locale,
    path: `/${data.slug}`,
    title: `${data.title} | Partner Market Global`,
    description: data.directAnswer
  });
}

export default async function PrivateLabelOEMOpportunitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CategoryPageTemplate locale={locale} data={data} />;
}
