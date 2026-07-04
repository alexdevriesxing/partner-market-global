import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

const policySections = [
  {
    title: "Controller and operator",
    body:
      "Partner Market Global is operated by Alex de Vries of De Vries Sales Consultancy. The website showcases selected client projects, products and partnership opportunities, and processes personal data only for platform, inquiry, listing and business communication purposes."
  },
  {
    title: "Inquiry sharing and consent",
    body:
      "When you submit an inquiry, listing application or contact request, we may share the information you provide with the relevant opportunity owner or client when this is needed to respond to your request, qualify the inquiry or make the requested business introduction. We do not sell personal data."
  },
  {
    title: "Hosting, security and analytics data",
    body:
      "The website may process technical data such as IP address, browser, device, approximate region, pages viewed, timestamps, referral source and security logs through hosting, security and analytics tools. This information is used to keep the site secure, understand performance and improve the platform."
  },
  {
    title: "Retention",
    body:
      "We keep personal data only for as long as needed for the purpose it was provided, for reasonable business records, to handle follow-up inquiries, to meet legal obligations or to resolve disputes. Information that is no longer needed is deleted or anonymized where practical."
  },
  {
    title: "Your choices and rights",
    body:
      "Depending on where you live, you may have rights to request access, correction, deletion, restriction, portability or objection to processing of your personal data. You may also withdraw consent where processing is based on consent. To make a request, contact us using the email address below."
  },
  {
    title: "International business context",
    body:
      "Because the platform is designed for international business opportunities, inquiries may involve companies or recipients in other countries. We only share relevant inquiry information for the business purpose requested and expect receiving parties to handle it responsibly."
  },
  {
    title: "Cookies",
    body:
      "The site may use essential cookies, browser storage or similar technologies for functionality, security and analytics. You can control cookies through your browser settings, but disabling some technologies may affect site functionality."
  }
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return pageMetadata({
    locale,
    path: "/privacy-policy",
    title: t('title'),
    description: t('intro')
  });
};

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('privacy');
  const tSite = await getTranslations('site');

  return (
    <section className="content-section">
      <h1>{t('title')}</h1>
      <p>{t('lastUpdated')}</p>
      <p>{t('intro')}</p>
      <h2>{t('infoTitle')}</h2>
      <ul>
        {t.raw('infoList').map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h2>{t('howTitle')}</h2>
      <p>{t('howText')}</p>
      <h2>{t('sharingTitle')}</h2>
      <p>{t('sharingText')}</p>
      {policySections.map((section) => (
        <div key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </div>
      ))}
      <h2>{t('contactTitle')}</h2>
      <p>{t('contactText')} {tSite('email')}.</p>
    </section>
  );
}
