import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { site } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('eyebrow'),
    description: t('headline'),
    alternates: { canonical: `${site.url}/${locale}/about` }
  };
};

export default async function AboutPage() {
  const t = await getTranslations('about');

  return (
    <>
      <section className="content-section">
        <div className="eyebrow">{t('eyebrow')}</div>
        <h1>{t('headline')}</h1>
        <p>{t('body1')}</p>
        <p>{t('body2')}</p>
        <h2>{t('focusTitle')}</h2>
        <ul>
          {t.raw('focusList').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="about-operator-section" aria-labelledby="operator-title">
        <div className="about-operator-copy">
          <img
            className="about-operator-logo"
            src="/assets/devries-sales-consultancy-logo.jpg"
            alt="De Vries Sales Consultancy"
          />
          <div className="eyebrow">Operated by De Vries Sales Consultancy</div>
          <h2 id="operator-title">A focused stage for client projects and products</h2>
          <p>
            Partner Market Global is operated by Alex de Vries of De Vries Sales Consultancy
            to showcase selected projects, products, brands and partnership opportunities
            from his clients.
          </p>
          <p>
            The platform gives each opportunity a structured international presentation:
            what is being offered, which partner profile is needed, what territories are
            available and which next step a serious buyer, distributor, franchisee or
            commercial partner should take.
          </p>
          <a
            className="btn btn-primary"
            href="https://www.devriessalesconsultancy.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit De Vries Sales Consultancy
          </a>
        </div>
        <div className="about-operator-media">
          <img src="/assets/alex-devries.jpg" alt="Alex de Vries of De Vries Sales Consultancy" />
        </div>
      </section>
    </>
  );
}
