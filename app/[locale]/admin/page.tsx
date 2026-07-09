import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { opportunities } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

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

export default async function AdminPage() {
  const t = await getTranslations('admin');

  return (
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <a>{t('listings')}</a>
        <a>{t('inquiries')}</a>
        <a>{t('applications')}</a>
        <a>{t('packages')}</a>
        <a>{t('documents')}</a>
        <a>{t('settings')}</a>
      </aside>
      <div className="admin-main">
        <div className="section-top" style={{ margin: 0, marginBottom: 20 }}>
          <h1>{t('listings')}</h1>
          <button className="btn btn-primary">{t('newListing')}</button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t('tableHeaders.title')}</th>
              <th>{t('tableHeaders.type')}</th>
              <th>{t('tableHeaders.sector')}</th>
              <th>{t('tableHeaders.status')}</th>
              <th>{t('tableHeaders.inquiries')}</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opportunity, index) => (
              <tr key={opportunity.id}>
                <td>{opportunity.title}</td>
                <td>{opportunity.type}</td>
                <td>{opportunity.sector}</td>
                <td><span className="status">{t('statusOpen')}</span></td>
                <td>{12 + index * 3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
