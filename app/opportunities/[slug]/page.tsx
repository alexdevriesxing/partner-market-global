import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/InquiryForm";
import { StructuredData } from "@/components/StructuredData";
import { opportunities, site } from "@/lib/data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return opportunities.map((opportunity) => ({ slug: opportunity.slug }));
}

async function getOpportunity(slug: string) {
  return opportunities.find((opportunity) => opportunity.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const opportunity = await getOpportunity(slug);
  if (!opportunity) return {};
  return {
    title: opportunity.title,
    description: opportunity.summary,
    alternates: { canonical: `${site.url}/opportunities/${opportunity.slug}` },
    openGraph: {
      title: opportunity.title,
      description: opportunity.summary,
      url: `${site.url}/opportunities/${opportunity.slug}`,
      images: [{ url: opportunity.heroImage, width: 1200, height: 630, alt: opportunity.title }]
    }
  };
}

export default async function OpportunityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const opportunity = await getOpportunity(slug);
  if (!opportunity) return notFound();

  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: opportunity.title,
    description: opportunity.summary,
    category: opportunity.type,
    areaServed: opportunity.targetMarkets.join(", "),
    availability: "https://schema.org/InStock",
    url: `${site.url}/opportunities/${opportunity.slug}`,
    seller: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    }
  };

  const facts = [
    ["Origin Country", opportunity.originCountry],
    ["Target Markets", opportunity.targetMarkets.join(", ")],
    ["Partner Type", "Importer, Distributor, Franchisee, Operator"],
    ["Exclusivity", "Possible by territory"],
    ["Investment Req.", opportunity.investmentRequirement],
    ["Status", opportunity.status]
  ];

  return (
    <>
      <StructuredData data={offerSchema} />
      <Link href="/opportunities" className="breadcrumb">← Back to opportunities</Link>
      <section className="detail-shell">
        <article className="detail-main">
          <img className="detail-hero-img" src={opportunity.heroImage} alt={opportunity.title} />
          <div className="detail-content">
            <div className="detail-title-row">
              <div>
                <div className="badge-stack">
                  {opportunity.verificationBadges.map((badge) => <span className="top-badge" key={badge}>✓ {badge}</span>)}
                </div>
                <h1>{opportunity.title}</h1>
                <p>{opportunity.summary}</p>
              </div>
              <div className="quick-panel">
                <strong>Interested in this opportunity?</strong>
                <p>Send a qualified inquiry to receive more information.</p>
                <a className="btn btn-primary full" href="#inquiry">Send Qualified Inquiry</a>
                <a className="btn btn-line full" href="#documents" style={{ marginTop: 8 }}>Save Opportunity</a>
              </div>
            </div>

            <div className="quick-facts">
              {facts.map(([label, value]) => (
                <div className="fact" key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>
          </div>

          <div className="tabs">
            {["Overview", "Company", "Products", "Market", "Partner Profile", "Commercial", "Territories", "More"].map((tab) => <a href={`#${tab.toLowerCase().replaceAll(" ", "-")}`} key={tab}>{tab}</a>)}
          </div>

          <div className="detail-content">
            <div className="content-grid-2">
              <div className="content-card" id="overview">
                <h2>Overview</h2>
                <p>{opportunity.description}</p>
                <h3>Key Highlights</h3>
                <ul>
                  {opportunity.credentials.map((item) => <li key={item}>✓ {item}</li>)}
                </ul>
              </div>
              <div className="content-card product-shot">
                <img src="/assets/detail-product-shot.webp" alt="Product showcase" />
              </div>
            </div>

            <div className="content-grid-2">
              <div className="content-card" id="company">
                <h2>Company Background</h2>
                <p>{opportunity.companyBackground}</p>
              </div>
              <div className="content-card" id="products">
                <h2>Product / Service / Franchise Details</h2>
                <p>{opportunity.productDetails}</p>
              </div>
            </div>

            <div className="content-grid-2">
              <div className="content-card" id="market">
                <h2>Market Opportunity</h2>
                <p>{opportunity.marketOpportunity}</p>
              </div>
              <div className="content-card" id="partner-profile">
                <h2>Ideal Partner Profile</h2>
                <p>{opportunity.partnerProfile}</p>
              </div>
            </div>

            <div className="content-grid-2">
              <div className="content-card" id="commercial">
                <h2>Commercial Model</h2>
                <p>{opportunity.commercialModel}</p>
                <h3>Territory Availability</h3>
                <p>{opportunity.territoryAvailability}</p>
              </div>
              <div className="content-card" id="documents">
                <h2>Documents Available</h2>
                <div className="document-grid">
                  {opportunity.documentsAvailable.map((document) => (
                    <div className="document-item" key={document}><span className="pdf-icon">▣</span>{document}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="content-grid-2">
              <div className="content-card">
                <h2>Why Partner With Us</h2>
                <ul>
                  <li>Proven products with strong consumer demand</li>
                  <li>Competitive pricing and margins</li>
                  <li>Comprehensive partner support</li>
                  <li>Flexible partnership models</li>
                  <li>Long-term growth oriented</li>
                </ul>
              </div>
              <div className="content-card">
                <h2>Risks & Notes</h2>
                <p>{opportunity.risks}</p>
              </div>
            </div>

            <InquiryForm />
          </div>
        </article>

        <aside className="side-panel">
          <h3>Interested in this opportunity?</h3>
          <p>Send us a qualified inquiry to receive more information.</p>
          <a href="#inquiry" className="btn btn-primary full">Send Qualified Inquiry</a>
          <a href="/contact" className="btn btn-line full" style={{ marginTop: 10 }}>Ask a Question</a>
          <div className="secure-box">♡ 100% Secure & Confidential<br />We respect your privacy.</div>
        </aside>
      </section>
    </>
  );
}
