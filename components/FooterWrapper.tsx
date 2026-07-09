import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/Footer";

type FooterLink = [string, string];
type FooterColumn = { title: string; links: FooterLink[] };

export async function FooterWrapper({ locale }: { locale: string }) {
  const t = await getTranslations("footer");

  const columns: FooterColumn[] = [
    {
      title: t("columns.explore"),
      links: [
        [t("columns.exploreLinks.all"), "/opportunities"],
        [t("columns.exploreLinks.import"), "/opportunities?type=import"],
        [t("columns.exploreLinks.export"), "/opportunities?type=export"],
        [t("columns.exploreLinks.franchise"), "/opportunities?type=franchise"],
        [t("columns.exploreLinks.distribution"), "/opportunities?type=distribution"],
        [t("columns.exploreLinks.licensing"), "/opportunities?type=licensing"]
      ]
    },
    {
      title: t("columns.forCompanies"),
      links: [
        [t("columns.forCompaniesLinks.list"), "/list-your-opportunity"],
        [t("columns.forCompaniesLinks.terms"), "/commercial-terms"],
        [t("columns.forCompaniesLinks.curation"), "/curation-process"],
        [t("columns.forCompaniesLinks.howItWorks"), "/list-your-opportunity#how-it-works"],
        [t("columns.forCompaniesLinks.faq"), "/list-your-opportunity#faq"]
      ]
    },
    {
      title: t("columns.resources"),
      links: [
        [t("columns.resourcesLinks.japan"), "/japan"],
        [t("columns.forCompaniesLinks.curation"), "/curation-process"],
        [t("columns.forCompaniesLinks.terms"), "/commercial-terms"],
        [t("columns.forCompaniesLinks.faq"), "/#faq"]
      ]
    },
    {
      title: t("columns.company"),
      links: [
        [t("columns.companyLinks.about"), "/about"],
        [t("columns.companyLinks.contact"), "/contact"]
      ]
    },
    {
      title: t("columns.legal"),
      links: [
        [t("columns.legalLinks.privacy"), "/privacy-policy"],
        [t("columns.legalLinks.terms"), "/terms"],
        [t("columns.legalLinks.disclaimer"), "/terms#disclaimer"]
      ]
    }
  ];

  return (
    <Footer
      tagline={t("tagline")}
      columns={columns}
      copyright={t("copyright")}
      brandBy={t("brandBy")}
      devriesUrl={t("devriesUrl")}
      locale={locale}
    />
  );
}
