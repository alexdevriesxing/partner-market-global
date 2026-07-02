import type { Metadata } from "next";
import { curationSteps, trustChecks, site } from "@/lib/data";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Curation & Vetting Process",
  description: "How Partner Market Global reviews, structures and showcases business opportunities for importers, distributors, franchisees and partners.",
  alternates: { canonical: `${site.url}/curation-process` }
};

export default function CurationProcessPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <div className="eyebrow">Curation Process</div>
          <h1>Structured opportunity profiles that are <span>easier to evaluate</span></h1>
          <p>We combine business review, document organization and clear partner requirements so serious inquiries can move faster.</p>
        </div>
        <img src="/assets/curation-process-strip.webp" alt="Five-step curation process" />
      </section>

      <section className="content-section">
        <div className="process-row">
          {curationSteps.map(([num, title, text]) => (
            <div className="process-step" key={num}>
              <div className="process-num">{num}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2>What We Check</h2>
        <div className="trust-grid">
          {trustChecks.map(([title, text], index) => (
            <div className="trust-card" key={title}>
              <div className="trust-icon">{index + 1}</div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2>Disclaimer</h2>
        <p>
          Our review improves presentation quality and helps filter obvious spam or incomplete opportunities. It is not a guarantee of
          performance, profitability, legal compliance or commercial success. Interested parties must complete their own due diligence.
        </p>
      </section>

      <CTA compact />
    </>
  );
}
