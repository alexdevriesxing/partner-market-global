import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";

export async function Navigation({ locale }: { locale: string }) {
  const t = await getTranslations("nav");

  const nav = [
    { label: t("opportunities"), href: `/${locale}/opportunities` },
    { label: t("categories"), href: `/${locale}/opportunities#categories` },
    { label: t("forCompanies"), href: `/${locale}/list-your-opportunity` },
    { label: t("resources"), href: `/${locale}/curation-process` },
    { label: t("aboutUs"), href: `/${locale}/about` }
  ];

  return <Header nav={nav} />;
}
