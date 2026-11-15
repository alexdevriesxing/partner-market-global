import Link from "next/link";
import type { Opportunity } from "@/lib/data";

/**
 * Crawlable, server-rendered long-form profile for opportunities added through lib/jip-new.
 * All content is plain HTML (no accordions/JS needed to read it).
 */
export function OpportunityProfile({
  opportunity,
  locale,
  related
}: {
  opportunity: Opportunity;
  locale: string;
  related: Opportunity[];
}) {
  const p = opportunity.profile;
  if (!p) return null;
  const contactHref = `/${locale}/contact?oppTitle=${encodeURIComponent(opportunity.title)}&oppSlug=${opportunity.slug}&oppId=${opportunity.id}&source=JIP%20Japan`;
  const editorial = p.images.editorial;

  const idAlias: Record<string, string> = {
    expansion: "market",
    partner: "partner-profile",
    considerations: "commercial"
  };

  return (
    <div className="profile-body">
      <section className="content-card" id="executive-overview" aria-labelledby="exec-overview">
        <h2 id="exec-overview">Executive overview</h2>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>{p.executiveOverview}</p>
        <dl className="quick-facts" style={{ marginTop: 16 }}>
          {p.keyFacts.map((f) => (
            <div className="fact" key={f.label}>
              <dt style={{ fontSize: "0.8rem", opacity: 0.7 }}>{f.label}</dt>
              <dd style={{ margin: 0, fontWeight: 600 }}>{f.value}</dd>
            </div>
          ))}
        </dl>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
          <a className="btn btn-primary" href="#inquire">Request an Introduction</a>
          <Link className="btn btn-line" href={contactHref}>Discuss This Opportunity</Link>
        </div>
      </section>

      {p.sections.map((s, i) => (
        <section className="content-card" id={idAlias[s.id] || s.id} key={s.id} style={{ marginTop: 24 }} aria-labelledby={`h-${s.id}`}>
          <h2 id={`h-${s.id}`}>{s.heading}</h2>
          {s.paragraphs.map((para, j) => (
            <p key={j} style={{ lineHeight: 1.75 }}>{para}</p>
          ))}
          {i === 1 && editorial?.base && (
            <figure style={{ margin: "20px 0 0 0" }}>
              <picture>
                <source srcSet={`${editorial.base}.webp`} type="image/webp" />
                <img
                  src={`${editorial.base}.jpg`}
                  alt={editorial.alt}
                  width={1200}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "auto", borderRadius: 12 }}
                />
              </picture>
              <figcaption style={{ fontSize: "0.85rem", opacity: 0.75, marginTop: 8 }}>
                {editorial.caption ? `${editorial.caption} ` : ""}
                {p.imageDisclosure}
              </figcaption>
            </figure>
          )}
        </section>
      ))}

      <section className="content-card" id="faq" style={{ marginTop: 24 }} aria-labelledby="h-faq">
        <h2 id="h-faq">Frequently asked questions</h2>
        {p.faqs.map((f) => (
          <div key={f.question} style={{ marginTop: 14 }}>
            <h3 style={{ fontSize: "1.05rem", margin: "0 0 6px 0" }}>{f.question}</h3>
            <p style={{ margin: 0, lineHeight: 1.7 }}>{f.answer}</p>
          </div>
        ))}
      </section>

      <section className="content-card" id="provenance" style={{ marginTop: 24 }} aria-labelledby="h-prov">
        <h2 id="h-prov">Source and provenance</h2>
        <p style={{ lineHeight: 1.7 }}>
          This opportunity was introduced to Partner Market Global through Japan Industrial Promotion Inc. (JIP Japan). Company and product information on this page is drawn from the
          company&apos;s own publications
          {p.officialWebsites.length > 0 ? (
            <>
              {" "}(official website:{" "}
              {p.officialWebsites.map((w, i) => (
                <span key={w}>
                  {i > 0 ? ", " : ""}
                  <a href={w} rel="noopener noreferrer nofollow" target="_blank">{w.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a>
                </span>
              ))}
              )
            </>
          ) : null}
          . Commercial terms, certifications and territory availability are confirmed directly with the company during a qualified inquiry. Partner Market Global does not claim exclusivity or
          verified export credentials beyond what is stated here.
        </p>
        <p style={{ margin: 0 }}>
          Related hubs: <Link href={`/${locale}/japan`}>Japan Business &amp; Partnership Hub</Link>
          {p.directoryTags.includes("distribution") && <> · <Link href={`/${locale}/distribution-rights`}>Distribution rights</Link></>}
          {p.directoryTags.includes("export") && <> · <Link href={`/${locale}/export-opportunities`}>Export opportunities</Link></>}
          {p.directoryTags.includes("private-label-oem") && <> · <Link href={`/${locale}/private-label-oem-opportunities`}>Private-label &amp; OEM</Link></>}
          {p.directoryTags.includes("franchise") && <> · <Link href={`/${locale}/franchise-opportunities`}>Franchise opportunities</Link></>}
        </p>
      </section>

      {related.length > 0 && (
        <section className="content-card" id="related" style={{ marginTop: 24 }} aria-labelledby="h-related">
          <h2 id="h-related">Related Japanese opportunities</h2>
          <ul>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/${locale}/opportunities/${r.slug}`}>{r.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
