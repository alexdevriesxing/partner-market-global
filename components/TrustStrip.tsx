type TrustCheck = {
  title: string;
  text: string;
};

type TrustStripProps = {
  headline?: string;
  subheadline?: string;
  checks?: TrustCheck[];
  trust1?: string;
  trust2?: string;
  trust3?: string;
  trust4?: string;
  trust5?: string;
  trust1Desc?: string;
  trust2Desc?: string;
  trust3Desc?: string;
  trust4Desc?: string;
  trust5Desc?: string;
};

export function TrustStrip({
  headline = "Curated. Structured. Easier to trust.",
  subheadline = "We verify and structure every opportunity so you can evaluate it with confidence and connect with the right partner faster.",
  checks,
  trust1 = "Business Verification",
  trust1Desc = "We verify company registration, VAT/tax numbers, and operational status",
  trust2 = "Credential Review",
  trust2Desc = "We check trade references, certifications, and industry standing",
  trust3 = "Opportunity Assessment",
  trust3Desc = "We review market fit, competitive positioning, and growth potential",
  trust4 = "Document Support",
  trust4Desc = "We ensure information documents are accurate, complete, and professional",
  trust5 = "Secure Inquiries",
  trust5Desc = "We route all inquiries through our secure platform with NDA protection",
}: TrustStripProps) {
  const defaultChecks: TrustCheck[] = [
    { title: trust1, text: trust1Desc },
    { title: trust2, text: trust2Desc },
    { title: trust3, text: trust3Desc },
    { title: trust4, text: trust4Desc },
    { title: trust5, text: trust5Desc },
  ];

  const displayChecks = checks || defaultChecks;

  return (
    <section className="trust-section">
      <div>
        <h2>{headline}</h2>
        <p>{subheadline}</p>
      </div>
      <div className="trust-grid">
        {displayChecks.map((check, index) => (
          <div className="trust-card" key={check.title}>
            <div className="trust-icon">{index + 1}</div>
            <strong>{check.title}</strong>
            <span>{check.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
