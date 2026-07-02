import { trustChecks } from "@/lib/data";

export function TrustStrip() {
  return (
    <section className="trust-section">
      <div>
        <h2>Curated. Structured. Easier to trust.</h2>
        <p>We verify and structure every opportunity so you can evaluate it with confidence and connect with the right partner faster.</p>
      </div>
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
  );
}
