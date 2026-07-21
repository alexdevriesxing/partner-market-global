import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  const tSite = await getTranslations({ locale, namespace: 'site' });
  return pageMetadata({
    locale,
    path: "/contact",
    title: t('hero.eyebrow'),
    description: `${t('hero.headline')} - ${tSite('email')}`,
    image: "/assets/companies-hero-collage.png"
  });
};

export default async function ContactPage() {
  const tContact = await getTranslations('contact');
  const tInquiry = await getTranslations('inquiry');
  const tSite = await getTranslations('site');

  return (
    <>
      <section className="page-hero">
        <div>
          <div className="eyebrow">{tContact('hero.eyebrow')}</div>
          <h1>{tContact('hero.headline')}</h1>
          <p>{tContact('hero.subheadline')} {tSite('email')}</p>
        </div>
        <img src="/assets/companies-hero-collage.png" alt="Business meeting and trade visuals" />
      </section>
      <section className="content-section">
        <InquiryForm title={tInquiry('title')} />
      </section>
    </>
  );
}
