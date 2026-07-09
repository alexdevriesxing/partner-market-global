import type { Metadata } from "next";
import { OpportunitySearchFilter } from "@/components/OpportunitySearchFilter";
import { CTA } from "@/components/CTA";
import { StructuredData } from "@/components/StructuredData";
import { getTranslations } from "next-intl/server";
import { opportunities } from "@/lib/data";
import { pageMetadata, canonicalUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/japan",
    title: "Japan Investment & Partnership Opportunities | PMG",
    description: "Explore curated distribution, franchise, licensing, and investment opportunities from premium Japanese brands seeking international partners.",
    image: "/images/opportunities/air-twokyo-anime-licensed-apparel.jpg"
  });
}

const getJapanLandingTranslations = (locale: string) => {
  const trans: Record<string, Record<string, string>> = {
    en: {
      eyebrow: "JIP Japan Alliance",
      title: "Japan Business & Partnership Hub",
      subtitle: "Connecting international investors, distributors, and franchisees with curated opportunities from established Japanese brands.",
      introHeadline: "Curated Japanese Commercial Projects",
      introBody1: "Welcome to the Japan Investment & Partnership (JIP) showcase on Partner Market Global. We represent a selected portfolio of Japanese brands in sectors ranging from premium food & beverages and beauty products to consumer goods and advanced manufacturing.",
      introBody2: "Every opportunity is pre-screened for international viability, trade readiness, and clear commercial terms. We work closely with company owners to ensure that your inquiries are routed directly to decision-makers.",
      keyPoint1Title: "Vetted Listings",
      keyPoint1Desc: "Each listing is verified for legal registration, operational history, and capacity to export or support franchise rollouts.",
      keyPoint2Title: "Direct Communication",
      keyPoint2Desc: "No middlemen. Qualified inquiries are routed directly to the brand's international business development teams.",
      keyPoint3Title: "Structured Terms",
      keyPoint3Desc: "Exclusivity rights, MOQs, certification compliance, and commercial models are structured upfront for clear evaluation.",
      faqTitle: "Frequently Asked Questions",
      faqSectionSubtitle: "Learn more about the JIP Japan partnership and evaluation process.",
      faqQ1: "What is JIP Japan?",
      faqA1: "JIP Japan (Japan Investment & Partnership) is a specialized B2B opportunity package on Partner Market Global. It showcases high-potential business opportunities from Japanese brands seeking international distributors, retail buyers, master franchisees, or joint-venture partners.",
      faqQ2: "Are the opportunities on this page pre-qualified?",
      faqA2: "Yes. All listings under JIP Japan are verified. We check the business registration, operational history, domestic market success, and readiness to support international expansion (including language support and product compliance).",
      faqQ3: "How do I submit an inquiry for a Japanese opportunity?",
      faqA3: "Click the 'Send Inquiry' button on any opportunity page. This will take you to our secure contact flow. Please fill in the details of your company, your active market channels, and your experience. Hidden fields will tag your inquiry with the opportunity details and route it directly to the owner.",
      faqQ4: "Is there any cost to browse or submit inquiries?",
      faqA4: "No. Browsing opportunities and submitting inquiries is completely free for prospective international partners. Commercial commission agreements are established directly with the listing companies before they are published.",
      ctaTitle: "Ready to partner with Japanese innovators?",
      activeListingsTitle: "Active Japan Opportunity Listings",
      activeListingsSubtitle: "Filter, search, and sort the active pre-screened Japanese business listings."
    },
    ja: {
      eyebrow: "JIP Japan アライアンス",
      title: "日本ビジネス・パートナーシップ提携ハブ",
      subtitle: "実績ある日本ブランド of 厳選された提携案件と、国際的な投資家、販売代理店、フランチャイジーをつなぐ。",
      introHeadline: "厳選された日本の商業プロジェクト",
      introBody1: "パートナーマーケットグローバル上のJIP Japan（日本投資・提携）展示場へようこそ。私たちは、プレミアム食品・飲料、化粧品・美容、消費財、高度製造業に至るまで、選りすぐりの日本ブランドを代表しています。",
      introBody2: "すべての案件は、海外進出の可能性、貿易の準備状況、明確な取引条件について事前に審査されています。企業オーナーと緊密に連携し、お客様からのお問い合わせが決定権を持つ担当者に直接届くようにしています。",
      keyPoint1Title: "検証済みの案件リスト",
      keyPoint1Desc: "各案件は、法人登記、操業履歴、輸出またはフランチャイズ展開の対応能力について検証されています。",
      keyPoint2Title: "直接コミュニケーション",
      keyPoint2Desc: "中間業者なし。資格要件を満たしたお問い合わせは、ブランドの海外事業開発チームに直接ルーティングされます。",
      keyPoint3Title: "構造化された条件",
      keyPoint3Desc: "独占権、最小注文数量（MOQ）、各種認証への適合、商業モデルなど、事前に構造化された情報でスムーズに評価できます。",
      faqTitle: "よくある質問",
      faqSectionSubtitle: "JIP Japanパートナーシップと審査プロセスについての詳細はこちら。",
      faqQ1: "JIP Japanとは何ですか？",
      faqA1: "JIP Japan（日本投資パートナーシップ）は、パートナーマーケットグローバル内の特別なB2B機会パッケージです。海外のディストリビューター、小売バイヤー、マスターフランチャイジー、またはジョイントベンチャーパートナーを求める日本企業の可能性の高いビジネス案件を紹介しています。",
      faqQ2: "掲載されている案件は事前審査されていますか？",
      faqA2: "はい。JIP Japanに掲載されているすべての企業情報は検証済みです。商業登記、事業履歴、日本国内での成功、および海外展開の準備能力（対応言語や各国の製品規制適合など）を確認しています。",
      faqQ3: "日本の案件への問い合わせはどのように行いますか？",
      faqA3: "各案件詳細ページの「問い合わせを送信」ボタンをクリックしてください。これにより、安全な問い合わせフォームへ移動します。貴社情報、主な販売チャネル、および実績をご記入ください。非表示フィールドが自動的に案件詳細をタグ付けし、オーナーへルーティングします。",
      faqQ4: "閲覧や問い合わせに費用はかかりますか？",
      faqA4: "いいえ。潜在的な海外パートナー様による案件の閲覧やお問い合わせの送信は、すべて無料です。商業的な手数料等の契約は、掲載前に企業側との間で直接結ばれています。",
      ctaTitle: "日本のイノベーターと提携する準備はできましたか？",
      activeListingsTitle: "稼働中の日本ビジネス機会案件一覧",
      activeListingsSubtitle: "事前審査済みの日本の提携案件をフィルタ、検索、並べ替えで絞り込めます。"
    }
  };
  return trans[locale] || trans.en;
};

export default async function JapanLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getJapanLandingTranslations(locale);
  const tCta = await getTranslations('cta');

  // Filter only Japanese opportunities
  const japanOpportunities = opportunities.filter((o) => o.originCountry === "Japan");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t.faqQ1,
        acceptedAnswer: { "@type": "Answer", text: t.faqA1 }
      },
      {
        "@type": "Question",
        name: t.faqQ2,
        acceptedAnswer: { "@type": "Answer", text: t.faqA2 }
      },
      {
        "@type": "Question",
        name: t.faqQ3,
        acceptedAnswer: { "@type": "Answer", text: t.faqA3 }
      },
      {
        "@type": "Question",
        name: t.faqQ4,
        acceptedAnswer: { "@type": "Answer", text: t.faqA4 }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl(locale)
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Japan Opportunities",
        item: canonicalUrl(locale, "/japan")
      }
    ]
  };

  return (
    <>
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      {/* Hero Section */}
      <section className="page-hero japan-hero">
        <div className="hero-overlay">
          <div className="eyebrow">{t.eyebrow}</div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
      </section>

      {/* Alliance Intro */}
      <section className="japan-intro-section">
        <div className="content-grid-2">
          <div className="intro-copy">
            <h2>{t.introHeadline}</h2>
            <p className="lead">{t.introBody1}</p>
            <p>{t.introBody2}</p>
          </div>
          <div className="intro-checklist">
            <div className="check-card">
              <h3>⚡ {t.keyPoint1Title}</h3>
              <p>{t.keyPoint1Desc}</p>
            </div>
            <div className="check-card">
              <h3>📬 {t.keyPoint2Title}</h3>
              <p>{t.keyPoint2Desc}</p>
            </div>
            <div className="check-card">
              <h3>⚖ {t.keyPoint3Title}</h3>
              <p>{t.keyPoint3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-filtered Interactive Search & Grid */}
      <section className="japan-grid-section">
        <div className="section-top text-center">
          <h2>{t.activeListingsTitle}</h2>
          <p>{t.activeListingsSubtitle}</p>
        </div>
        <OpportunitySearchFilter initialOpportunities={japanOpportunities} locale={locale} />
      </section>

      {/* FAQ Section */}
      <section className="faq-section bg-soft">
        <div className="section-heading">
          <h2>{t.faqTitle}</h2>
          <p>{t.faqSectionSubtitle}</p>
        </div>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>{t.faqQ1}</h3>
            <p>{t.faqA1}</p>
          </div>
          <div className="faq-item">
            <h3>{t.faqQ2}</h3>
            <p>{t.faqA2}</p>
          </div>
          <div className="faq-item">
            <h3>{t.faqQ3}</h3>
            <p>{t.faqA3}</p>
          </div>
          <div className="faq-item">
            <h3>{t.faqQ4}</h3>
            <p>{t.faqA4}</p>
          </div>
        </div>
      </section>

      <CTA
        compact
        locale={locale}
        headline={t.ctaTitle}
        subheadline={tCta('subheadline')}
        feature1={tCta('features.global')}
        feature2={tCta('features.structured')}
        feature3={tCta('features.qualified')}
        feature4={tCta('features.grow')}
        ctaList={tCta('ctaList')}
        ctaTerms={tCta('ctaTerms')}
      />
    </>
  );
}
