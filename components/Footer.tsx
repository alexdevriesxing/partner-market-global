import Link from "next/link";

type FooterLink = [string, string];

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type FooterProps = {
  tagline: string;
  columns: FooterColumn[];
  copyright: string;
  brandBy: string;
  devriesUrl: string;
  locale: string;
};

export function Footer({ tagline, columns, copyright, brandBy, devriesUrl, locale }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src="/assets/partner-market-global-logo.svg" alt="Partner Market Global" />
        <p>{tagline}</p>
        <div className="socials" aria-label="Social links">
          <span>in</span><span>𝕏</span><span>f</span><span>◎</span>
        </div>
      </div>
      {columns.map((column) => (
        <div className="footer-column" key={column.title}>
          <h3>{column.title}</h3>
          {column.links.map(([label, href]) => (
            <Link key={label} href={`/${locale}${href}`}>{label}</Link>
          ))}
        </div>
      ))}
      <div className="footer-bottom">© 2026 Partner Market Global. {copyright} {brandBy} <a href={`https://${devriesUrl}`} target="_blank" rel="noopener noreferrer">{devriesUrl}</a></div>
    </footer>
  );
}
