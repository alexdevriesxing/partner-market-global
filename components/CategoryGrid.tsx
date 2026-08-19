import Link from "next/link";
import { categories } from "@/lib/data";

const categoryTitles: Record<string, Record<string, string>> = {
  "/import-opportunities": {
    en: "Import Opportunities",
    es: "Oportunidades de importación",
    fr: "Opportunités d'importation",
    de: "Importmöglichkeiten",
    nl: "Importkansen",
    it: "Opportunità di importazione",
    pt: "Oportunidades de importação",
    zh: "进口商机",
    ja: "輸入ビジネス機会",
    ko: "수입 비즈니스 기회",
    ar: "فرص الاستيراد",
    hi: "आयात अवसर",
    ru: "Возможности импорта"
  },
  "/export-opportunities": {
    en: "Export Opportunities",
    es: "Oportunidades de exportación",
    fr: "Opportunités d'exportation",
    de: "Exportmöglichkeiten",
    nl: "Exportkansen",
    it: "Opportunità di esportazione",
    pt: "Oportunidades de exportação",
    zh: "出口商机",
    ja: "輸出ビジネス機会",
    ko: "수출 비즈니스 기회",
    ar: "فرص التصدير",
    hi: "निर्यात अवसर",
    ru: "Возможности экспорта"
  },
  "/franchise-opportunities": {
    en: "Franchise Opportunities",
    es: "Oportunidades de franquicia",
    fr: "Opportunités de franchise",
    de: "Franchise-Möglichkeiten",
    nl: "Franchisekansen",
    it: "Opportunità di franchising",
    pt: "Oportunidades de franquia",
    zh: "特许加盟机会",
    ja: "フランチャイズ案件",
    ko: "프랜차이즈 기회",
    ar: "فرص الامتياز التجاري",
    hi: "फ़्रैंचाइज़ अवसर",
    ru: "Франчайзинговые возможности"
  },
  "/distribution-rights": {
    en: "Distribution Rights",
    es: "Derechos de distribución",
    fr: "Droits de distribution",
    de: "Vertriebsrechte",
    nl: "Distributierechten",
    it: "Diritti di distribuzione",
    pt: "Direitos de distribuição",
    zh: "分销代理权",
    ja: "総代理店・販売権",
    ko: "유통 및 판권",
    ar: "حقوق التوزيع",
    hi: "वितरण अधिकार",
    ru: "Дистрибьюторские права"
  },
  "/licensing-opportunities": {
    en: "Licensing & Brand Partnerships",
    es: "Licencias y asociaciones de marca",
    fr: "Licences et partenariats de marque",
    de: "Lizenzierung & Markenpartnerschaften",
    nl: "Licenties & merkpartnerschappen",
    it: "Licenze e partnership di marca",
    pt: "Licenciamento e parcerias de marca",
    zh: "IP授权与品牌合作",
    ja: "ライセンス・ブランド提携",
    ko: "라이선스 및 브랜드 제휴",
    ar: "الترخيص وشراكات العلامات التجارية",
    hi: "लाइसेंसिंग और ब्रांड साझेदारी",
    ru: "Лицензирование и бренд-партнерство"
  },
  "/master-franchise-opportunities": {
    en: "Master Franchise Rights",
    es: "Derechos de franquicia maestra",
    fr: "Droits de master franchise",
    de: "Master-Franchise-Rechte",
    nl: "Masterfranchiserechten",
    it: "Diritti di master franchising",
    pt: "Direitos de master franquia",
    zh: "主特许经营权 (Master Franchise)",
    ja: "マスターフランチャイズ権",
    ko: "마스터 프랜차이즈 권한",
    ar: "حقوق الامتياز الرئيسية",
    hi: "मास्टर फ़्रैंचाइज़ अधिकार",
    ru: "Мастер-франшиза"
  },
  "/country-partner-opportunities": {
    en: "Country Partner Opportunities",
    es: "Oportunidades de socio de país",
    fr: "Opportunités de partenaire pays",
    de: "Länderpartner-Möglichkeiten",
    nl: "Landpartner-kansen",
    it: "Opportunità per partner nazionali",
    pt: "Oportunidades de parceiro de país",
    zh: "国家级战略合作伙伴",
    ja: "国別パートナー案件",
    ko: "국가 파트너 기회",
    ar: "فرص الشركاء المحليين",
    hi: "कंट्री पार्टनर अवसर",
    ru: "Национальное партнерство"
  },
  "/private-label-oem-opportunities": {
    en: "Private Label / OEM Opportunities",
    es: "Marca privada / OEM",
    fr: "Marque blanche / OEM",
    de: "Private Label / OEM-Möglichkeiten",
    nl: "Private Label / OEM-kansen",
    it: "Private Label / OEM",
    pt: "Marca própria / OEM",
    zh: "自有品牌 / OEM代工机会",
    ja: "プライベートブランド / OEM受託製造",
    ko: "PB 자체 브랜드 / OEM 생산 기회",
    ar: "العلامات التجارية الخاصة / تصنيع OEM",
    hi: "प्राइवेट लेबल / OEM अवसर",
    ru: "Собственная торговая марка / OEM"
  }
};

const sectionHeadings: Record<string, string> = {
  en: "Browse by Opportunity Type",
  es: "Explorar por tipo de oportunidad",
  fr: "Parcourir par type d'opportunité",
  de: "Nach Art der Geschäftsmöglichkeit durchsuchen",
  nl: "Bladeren op type zakelijke kans",
  it: "Sfoglia per tipo di opportunità",
  pt: "Navegar por tipo de oportunidade",
  zh: "按商机类型浏览",
  ja: "案件種別から探す",
  ko: "비즈니스 유형별 탐색",
  ar: "تصفح حسب نوع الفرصة التجارية",
  hi: "व्यावसायिक अवसर प्रकार के अनुसार ब्राउज़ करें",
  ru: "Поиск по типу коммерческой возможности"
};

export function CategoryGrid({ locale = "en" }: { locale?: string }) {
  const heading = sectionHeadings[locale] || sectionHeadings.en;

  return (
    <section className="category-section" id="categories">
      <h2>{heading}</h2>
      <div className="category-grid">
        {categories.map((category) => {
          const localizedTitle = categoryTitles[category.href]?.[locale] || category.title;
          return (
            <Link href={`/${locale}${category.href}`} className="category-tile" key={category.href}>
              <img src={category.image} alt="" aria-hidden="true" width="40" height="40" />
              <span>{localizedTitle}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
