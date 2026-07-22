import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { opportunities } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

import { AdminDashboardClient } from "./AdminDashboardClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });
  return pageMetadata({
    locale,
    path: "/admin",
    title: t('title'),
    description: "Internal Partner Market Global admin dashboard.",
    noIndex: true
  });
};

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin');

  return (
    <AdminDashboardClient
      opportunities={opportunities.map(o => ({
        id: o.id,
        title: o.title,
        type: o.type,
        sector: o.sector,
        originCountry: o.originCountry
      }))}
      tListings={t('listings')}
      tNewListing={t('newListing')}
      tInquiries={t('inquiries')}
      tApplications={t('applications')}
      tTitleHeader={t('tableHeaders.title')}
      tTypeHeader={t('tableHeaders.type')}
      tSectorHeader={t('tableHeaders.sector')}
      tStatusHeader={t('tableHeaders.status')}
      tInquiriesHeader={t('tableHeaders.inquiries')}
      tStatusOpen={t('statusOpen')}
    />
  );
}
