import Link from "next/link";
import { site } from "@/lib/data";

const columns = [
  {
    title: "Explore",
    links: [
      ["All Opportunities", "/opportunities"],
      ["Import Opportunities", "/opportunities?type=import"],
      ["Export Opportunities", "/opportunities?type=export"],
      ["Franchise Opportunities", "/opportunities?type=franchise"],
      ["Distribution Rights", "/opportunities?type=distribution"],
      ["Licensing & Partnerships", "/opportunities?type=licensing"]
    ]
  },
  {
    title: "For Companies",
    links: [
      ["List Your Opportunity", "/list-your-opportunity"],
      ["Commercial Terms", "/commercial-terms"],
      ["Curation Process", "/curation-process"],
      ["How It Works", "/list-your-opportunity#how-it-works"],
      ["FAQ", "/list-your-opportunity#faq"]
    ]
  },
  {
    title: "Resources",
    links: [
      ["Blog & Insights", "/curation-process"],
      ["Guides", "/curation-process"],
      ["Webinars", "/curation-process"],
      ["Market Reports", "/curation-process"],
      ["Success Stories", "/curation-process"]
    ]
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Contact Us", "/contact"],
      ["Careers", "/contact"],
      ["Newsroom", "/contact"]
    ]
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/privacy-policy"],
      ["Terms of Use", "/terms"],
      ["Disclaimer", "/terms#disclaimer"]
    ]
  }
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src="/assets/partner-market-global-logo.svg" alt="Partner Market Global" />
        <p>Connecting brands, businesses and opportunities with the right partners around the world.</p>
        <div className="socials" aria-label="Social links">
          <span>in</span><span>𝕏</span><span>f</span><span>◎</span>
        </div>
      </div>
      {columns.map((column) => (
        <div className="footer-column" key={column.title}>
          <h3>{column.title}</h3>
          {column.links.map(([label, href]) => (
            <Link key={label} href={href}>{label}</Link>
          ))}
        </div>
      ))}
      <div className="footer-bottom">© 2026 {site.name}. All rights reserved. A De Vries Sales Consultancy brand. <a href="https://www.devriessalesconsultancy.com" target="_blank" rel="noopener noreferrer">www.devriessalesconsultancy.com</a></div>
    </footer>
  );
}
