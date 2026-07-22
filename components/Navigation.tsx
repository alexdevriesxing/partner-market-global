import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";

export async function Navigation() {
  const t = await getTranslations("nav");

  const nav = [
    { label: t("opportunities"), href: "/opportunities" },
    { label: t("submitOpportunity"), href: "/submit-opportunity" },
    { label: t("forCompanies"), href: "/list-your-opportunity" },
    { label: t("resources"), href: "/curation-process" },
    { label: t("aboutUs"), href: "/about" }
  ];

  return <Header nav={nav} />;
}
