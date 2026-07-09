"use client";

import { useState, useMemo } from "react";
import { OpportunityCard } from "./OpportunityCard";
import type { Opportunity } from "@/lib/data";

type Props = {
  initialOpportunities: Opportunity[];
  locale: string;
};

const getTranslations = (locale: string) => {
  const trans: Record<string, Record<string, string>> = {
    en: {
      searchPlaceholder: "Search opportunities by title, sector, brand, keyword or country...",
      sortBy: "Sort by:",
      sortFeatured: "Featured / Priority",
      sortNameAsc: "Name (A-Z)",
      sortNameDesc: "Name (Z-A)",
      filterSector: "All Sectors",
      filterCountry: "All Countries",
      filterType: "All Partnership Types",
      noResults: "No opportunities found matching your criteria.",
      resetFilters: "Reset Filters",
      foundSingular: "1 opportunity found",
      foundPlural: "{count} opportunities found",
      quickAll: "All",
      quickImport: "Import",
      quickExport: "Export",
      quickFranchise: "Franchise",
      quickDistribution: "Distribution",
      quickLicensing: "Licensing",
      quickPrivateLabel: "Private Label / OEM",
      quickCountryPartner: "Country Partner"
    },
    ja: {
      searchPlaceholder: "タイトル、セクター、ブランド、キーワード、国で案件を検索...",
      sortBy: "並べ替え:",
      sortFeatured: "おすすめ / 優先度順",
      sortNameAsc: "名前順 (A-Z)",
      sortNameDesc: "名前順 (Z-A)",
      filterSector: "すべてのセクター",
      filterCountry: "すべての国",
      filterType: "すべての提携タイプ",
      noResults: "条件に一致するビジネス機会が見つかりませんでした。",
      resetFilters: "フィルターをリセット",
      foundSingular: "1 件の機会が見つかりました",
      foundPlural: "{count} 件の機会が見つかりました",
      quickAll: "すべて",
      quickImport: "輸入",
      quickExport: "輸出",
      quickFranchise: "フランチャイズ",
      quickDistribution: "流通",
      quickLicensing: "ライセンス",
      quickPrivateLabel: "プライベートブランド / OEM",
      quickCountryPartner: "カントリーパートナー"
    },
    es: {
      searchPlaceholder: "Buscar oportunidades por título, sector, marca o país...",
      sortBy: "Ordenar por:",
      sortFeatured: "Destacados / Prioridad",
      sortNameAsc: "Nombre (A-Z)",
      sortNameDesc: "Nombre (Z-A)",
      filterSector: "Todos los sectores",
      filterCountry: "Todos los países",
      filterType: "Todos los tipos de asociación",
      noResults: "No se encontraron oportunidades que coincidan con sus criterios.",
      resetFilters: "Restablecer filtros",
      foundSingular: "1 oportunidad encontrada",
      foundPlural: "{count} oportunidades encontradas",
      quickAll: "Todos",
      quickImport: "Importación",
      quickExport: "Exportación",
      quickFranchise: "Franquicia",
      quickDistribution: "Distribución",
      quickLicensing: "Licencia",
      quickPrivateLabel: "Marca propia / OEM",
      quickCountryPartner: "Socio de país"
    },
    de: {
      searchPlaceholder: "Suche nach Titel, Sektor, Marke, Stichwort oder Land...",
      sortBy: "Sortieren nach:",
      sortFeatured: "Hervorgehoben / Priorität",
      sortNameAsc: "Name (A-Z)",
      sortNameDesc: "Name (Z-A)",
      filterSector: "Alle Sektoren",
      filterCountry: "Alle Länder",
      filterType: "Alle Partnerschaftsarten",
      noResults: "Keine Möglichkeiten gefunden, die Ihren Kriterien entsprechen.",
      resetFilters: "Filter zurücksetzen",
      foundSingular: "1 Möglichkeit gefunden",
      foundPlural: "{count} Möglichkeiten gefunden",
      quickAll: "Alle",
      quickImport: "Import",
      quickExport: "Export",
      quickFranchise: "Franchise",
      quickDistribution: "Vertrieb",
      quickLicensing: "Lizenzierung",
      quickPrivateLabel: "Eigenmarke / OEM",
      quickCountryPartner: "Länderpartner"
    },
    fr: {
      searchPlaceholder: "Rechercher des opportunités par titre, secteur, marque ou pays...",
      sortBy: "Trier par :",
      sortFeatured: "En vedette / Priorité",
      sortNameAsc: "Nom (A-Z)",
      sortNameDesc: "Nom (Z-A)",
      filterSector: "Tous les secteurs",
      filterCountry: "Tous les pays",
      filterType: "Tous les types de partenariat",
      noResults: "Aucune opportunité ne correspond à vos critères.",
      resetFilters: "Réinitialiser les filtres",
      foundSingular: "1 opportunité trouvée",
      foundPlural: "{count} opportunités trouvées",
      quickAll: "Tous",
      quickImport: "Importation",
      quickExport: "Exportation",
      quickFranchise: "Franchise",
      quickDistribution: "Distribution",
      quickLicensing: "Licence",
      quickPrivateLabel: "Marque de distributeur / OEM",
      quickCountryPartner: "Partenaire national"
    },
    nl: {
      searchPlaceholder: "Zoeken op titel, sector, merk, trefwoord of land...",
      sortBy: "Sorteren op:",
      sortFeatured: "Aanbevolen / Prioriteit",
      sortNameAsc: "Naam (A-Z)",
      sortNameDesc: "Naam (Z-A)",
      filterSector: "Alle sectoren",
      filterCountry: "Alle landen",
      filterType: "Alle soorten samenwerking",
      noResults: "Geen mogelijkheden gevonden die aan uw criteria voldoen.",
      resetFilters: "Filters wissen",
      foundSingular: "1 mogelijkheid gevonden",
      foundPlural: "{count} mogelijkheden gevonden",
      quickAll: "Alle",
      quickImport: "Import",
      quickExport: "Export",
      quickFranchise: "Franchise",
      quickDistribution: "Distributie",
      quickLicensing: "Licenties",
      quickPrivateLabel: "Private Label / OEM",
      quickCountryPartner: "Landpartner"
    }
  };
  return trans[locale] || trans.en;
};

export function OpportunitySearchFilter({ initialOpportunities, locale }: Props) {
  const t = getTranslations(locale);

  // Filter and Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [quickFilter, setQuickFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  // Dynamic filter values extracted from data
  const sectors = useMemo(() => {
    const set = new Set<string>();
    initialOpportunities.forEach((o) => {
      if (o.sector) {
        // Grab the root sector before " / "
        const root = o.sector.split(" / ")[0].trim();
        set.add(root);
      }
    });
    return Array.from(set).sort();
  }, [initialOpportunities]);

  const countries = useMemo(() => {
    const set = new Set<string>();
    initialOpportunities.forEach((o) => {
      if (o.originCountry) {
        set.add(o.originCountry);
      }
    });
    return Array.from(set).sort();
  }, [initialOpportunities]);

  const types = useMemo(() => {
    const set = new Set<string>();
    initialOpportunities.forEach((o) => {
      if (o.type) {
        o.type.split(" / ").forEach((t) => {
          set.add(t.trim());
        });
      }
    });
    return Array.from(set).sort();
  }, [initialOpportunities]);

  // Handle Quick filter lists
  const quickFiltersList = [
    { id: "all", label: t.quickAll },
    { id: "import", label: t.quickImport },
    { id: "export", label: t.quickExport },
    { id: "franchise", label: t.quickFranchise },
    { id: "distribution", label: t.quickDistribution },
    { id: "licensing", label: t.quickLicensing },
    { id: "privateLabel", label: t.quickPrivateLabel },
    { id: "countryPartner", label: t.quickCountryPartner }
  ];

  // Filtering & Sorting logic
  const filteredAndSortedOpportunities = useMemo(() => {
    let result = [...initialOpportunities];

    // Search query matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.title?.toLowerCase().includes(q) ||
          o.summary?.toLowerCase().includes(q) ||
          o.description?.toLowerCase().includes(q) ||
          o.originCountry?.toLowerCase().includes(q) ||
          o.sector?.toLowerCase().includes(q) ||
          o.type?.toLowerCase().includes(q) ||
          o.companyBackground?.toLowerCase().includes(q)
      );
    }

    // Dropdown filters
    if (selectedSector) {
      result = result.filter((o) => o.sector?.startsWith(selectedSector));
    }
    if (selectedCountry) {
      result = result.filter((o) => o.originCountry === selectedCountry);
    }
    if (selectedType) {
      result = result.filter((o) => o.type?.includes(selectedType));
    }

    // Quick filter chips matching
    if (quickFilter !== "all") {
      result = result.filter((o) => {
        const typeLower = o.type?.toLowerCase() || "";
        if (quickFilter === "import") return typeLower.includes("import");
        if (quickFilter === "export") return typeLower.includes("export");
        if (quickFilter === "franchise") return typeLower.includes("franchise");
        if (quickFilter === "distribution") return typeLower.includes("distribution");
        if (quickFilter === "licensing") return typeLower.includes("licensing");
        if (quickFilter === "privateLabel") return typeLower.includes("private label") || typeLower.includes("oem") || typeLower.includes("private-label");
        if (quickFilter === "countryPartner") return typeLower.includes("country partner") || typeLower.includes("country-partner");
        return true;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "name_asc") {
        return (a.title || "").localeCompare(b.title || "");
      }
      if (sortBy === "name_desc") {
        return (b.title || "").localeCompare(a.title || "");
      }
      // default: featured first, then fallback to id
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (a.id || "").localeCompare(b.id || "");
    });

    return result;
  }, [initialOpportunities, searchQuery, selectedSector, selectedCountry, selectedType, quickFilter, sortBy]);

  const resultsCountText = useMemo(() => {
    const count = filteredAndSortedOpportunities.length;
    if (count === 1) return t.foundSingular;
    return t.foundPlural.replace("{count}", count.toString());
  }, [filteredAndSortedOpportunities, t]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedSector("");
    setSelectedCountry("");
    setSelectedType("");
    setQuickFilter("all");
    setSortBy("featured");
  };

  const isFiltered = searchQuery || selectedSector || selectedCountry || selectedType || quickFilter !== "all";

  return (
    <div className="search-filter-layout">
      {/* 1. Search Bar & Sorting */}
      <div className="filter-controls-row">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search opportunities"
          />
        </div>
        <div className="sort-wrap">
          <label htmlFor="sort-select" className="sort-label">
            {t.sortBy}
          </label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">{t.sortFeatured}</option>
            <option value="name_asc">{t.sortNameAsc}</option>
            <option value="name_desc">{t.sortNameDesc}</option>
          </select>
        </div>
      </div>

      {/* 2. Quick Filter Chips */}
      <div className="filter-bar">
        {quickFiltersList.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={`filter-chip ${quickFilter === filter.id ? "active" : ""}`}
            onClick={() => setQuickFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* 3. Advanced Dropdown Filters */}
      <div className="advanced-filters-row">
        <div className="select-dropdown-wrap">
          <select
            className="filter-select"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            aria-label="Filter by Sector"
          >
            <option value="">{t.filterSector}</option>
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        <div className="select-dropdown-wrap">
          <select
            className="filter-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            aria-label="Filter by Country"
          >
            <option value="">{t.filterCountry}</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="select-dropdown-wrap">
          <select
            className="filter-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            aria-label="Filter by Partnership Type"
          >
            <option value="">{t.filterType}</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {isFiltered && (
          <button type="button" className="btn-reset-filters" onClick={handleReset}>
            ✕ {t.resetFilters}
          </button>
        )}
      </div>

      {/* 4. Results Info */}
      <div className="results-info-row">
        <span className="results-count">{resultsCountText}</span>
      </div>

      {/* 5. Card Grid */}
      <section className="featured-section">
        {filteredAndSortedOpportunities.length > 0 ? (
          <div className="opportunity-grid">
            {filteredAndSortedOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="no-results-card">
            <span className="no-results-icon">📂</span>
            <h3>{t.noResults}</h3>
            {isFiltered && (
              <button type="button" className="btn btn-line" onClick={handleReset}>
                {t.resetFilters}
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
