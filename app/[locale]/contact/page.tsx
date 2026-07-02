import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { getTranslations } from "next-intl/server";
import { site } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const tSite = await getTranslations({ locale, namespace: 'site' });
  return {
    title: t('hero.eyebrow'),
    description: `${t('hero.headline')} - ${tSite('email')}`,
    alternates: { canonical: `${site.url}/${locale}/contact` }
  };
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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
        <img src="/assets/companies-hero-collage.webp" alt="Business meeting and trade visuals" />
      </section>
      <section className="content-section">
        <InquiryForm title={tInquiry('title')} />
      </section>
    </>
  );
}
