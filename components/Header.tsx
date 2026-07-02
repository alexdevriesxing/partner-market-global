import Link from "next/link";

const nav = [
  { label: "Opportunities", href: "/opportunities" },
  { label: "Categories", href: "/opportunities#categories" },
  { label: "For Companies", href: "/list-your-opportunity" },
  { label: "Resources", href: "/curation-process" },
  { label: "About Us", href: "/about" }
];

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Partner Market Global home">
        <img src="/assets/partner-market-global-logo.svg" alt="Partner Market Global" />
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
            <span className="nav-caret">⌄</span>
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link href="/admin" className="btn btn-ghost">Log In</Link>
        <Link href="/list-your-opportunity" className="btn btn-primary">List Your Opportunity</Link>
      </div>
    </header>
  );
}
