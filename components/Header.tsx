"use client";
import Link from "next/link";
import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n";

type NavItem = { label: string; href: string };

export function Header({ nav }: { nav: NavItem[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const locale = (params.locale as Locale) || "en";

  function getLocalizedPath(targetLocale: Locale) {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/") || `/${targetLocale}`;
  }

  const currentLocaleName = localeNames[locale] || "English";

  return (
    <header className="site-header">
      <Link href={`/${locale}`} className="brand" aria-label="Partner Market Global home">
        <img src="/assets/partner-market-global-logo.svg" alt="Partner Market Global" />
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        {nav.map((item) => (
          <Link key={item.href} href={`/${locale}${item.href}`}>
            {item.label}
            <span className="nav-caret">⌄</span>
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <div className="lang-picker-wrap">
          <button
            className="lang-trigger"
            onClick={() => setLangOpen(!langOpen)}
            aria-expanded={langOpen}
            aria-label="Select language"
          >
            <span className="lang-current">{currentLocaleName}</span>
            <span className="lang-arrow">▼</span>
          </button>
          {langOpen && (
            <div className="lang-dropdown" role="listbox">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={getLocalizedPath(loc)}
                  className={`lang-option ${loc === locale ? "active" : ""}`}
                  onClick={() => setLangOpen(false)}
                  role="option"
                  aria-selected={loc === locale}
                >
                  {localeNames[loc]}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link href={`/${locale}/admin`} className="btn btn-ghost">Log In</Link>
        <Link href={`/${locale}/list-your-opportunity`} className="btn btn-primary">List Your Opportunity</Link>
      </div>

      <button
        className={`mobile-menu-btn ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        <span /><span /><span />
      </button>

      {mobileOpen && (
        <div className="mobile-nav" role="dialog" aria-label="Mobile navigation">
          <nav>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="mobile-nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href={`/${locale}/admin`} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Log In</Link>
            <Link href={`/${locale}/list-your-opportunity`} className="btn btn-primary full mobile-cta" onClick={() => setMobileOpen(false)}>
              List Your Opportunity
            </Link>
          </nav>
          <div className="mobile-lang-section">
            <p className="mobile-lang-label">Language</p>
            <div className="mobile-lang-grid">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={getLocalizedPath(loc)}
                  className={`mobile-lang-btn ${loc === locale ? "active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {localeNames[loc]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
