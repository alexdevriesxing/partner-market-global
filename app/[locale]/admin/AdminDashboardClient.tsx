"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type SubmittedApp = {
  refCode: string;
  date: string;
  title: string;
  company: string;
  originCountry: string;
  lookingFor: string[];
  targetCountries: string[];
  contactName: string;
  email: string;
  status: string;
  images?: string[];
  documents?: string[];
};

type Lead = {
  id: string;
  timestamp: string;
  source: string;
  opportunity: string;
  oppSlug: string;
  brand: string;
  principal: string;
  industry: string;
  contactName: string;
  jobTitle?: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  website?: string;
  companyType?: string;
  leadScore: number;
  priorityRating: string;
  prioritySignals: string[];
  sonicDetails?: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    companyType: string;
    interests: string[];
    countriesCovered: string;
    storeCount: string;
    annualPurchasingVolume: string;
    licensedPortfolio: string;
    intendedChannels: string;
    requests: string[];
    message: string;
  };
  requestedInfo?: string;
  utmData?: Record<string, string>;
  referrer?: string;
};

type ProspectTarget = {
  id: string;
  country: string;
  flag: string;
  name: string;
  type: string;
  status: "Prospect / Not Yet Contacted" | "Initial Outreach Sent" | "Buyer Presentation Delivered" | "Sample Sent" | "Meeting Scheduled" | "Under Commercial Review";
  assignedTo: string;
  notes?: string;
};

const initialProspects: ProspectTarget[] = [
  // United Kingdom
  { id: "uk-1", country: "United Kingdom", flag: "🇬🇧", name: "HMV", type: "Entertainment & Pop-Culture Retailer", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "uk-2", country: "United Kingdom", flag: "🇬🇧", name: "Forbidden Planet", type: "Specialist Comic & Collectibles Chain", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "uk-3", country: "United Kingdom", flag: "🇬🇧", name: "MINISO UK", type: "Lifestyle & Character Goods Chain", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "uk-4", country: "United Kingdom", flag: "🇬🇧", name: "Smyths Toys Superstores", type: "National Toy Superstore Chain", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "uk-5", country: "United Kingdom", flag: "🇬🇧", name: "GAME", type: "Specialist Gaming Retailer", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  // France
  { id: "fr-1", country: "France", flag: "🇫🇷", name: "Fnac", type: "Major Cultural & Electronics Retail Chain", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "fr-2", country: "France", flag: "🇫🇷", name: "Micromania / Zing", type: "Gaming & Pop-Culture Specialist", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "fr-3", country: "France", flag: "🇫🇷", name: "Cultura", type: "Cultural, Book & Entertainment Superstores", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "fr-4", country: "France", flag: "🇫🇷", name: "JouéClub", type: "Specialist Toy Retail Group", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "fr-5", country: "France", flag: "🇫🇷", name: "MINISO France", type: "Lifestyle & Character Goods Chain", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  // Germany
  { id: "de-1", country: "Germany", flag: "🇩🇪", name: "Müller", type: "Major Retail & Toy Department Chain", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "de-2", country: "Germany", flag: "🇩🇪", name: "MediaMarkt", type: "Consumer Electronics & Entertainment Chain", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "de-3", country: "Germany", flag: "🇩🇪", name: "Smyths Toys Deutschland", type: "National Toy Chain", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "de-4", country: "Germany", flag: "🇩🇪", name: "Elbenwald", type: "Pop Culture & Merchandise Specialist", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "de-5", country: "Germany", flag: "🇩🇪", name: "Thalia", type: "Books, Gifts & Entertainment Retailer", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "de-6", country: "Germany", flag: "🇩🇪", name: "Hugendubel", type: "Book, Gift & Character Retailer", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "de-7", country: "Germany", flag: "🇩🇪", name: "MINISO Germany", type: "Lifestyle & Character Goods Chain", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  // Spain
  { id: "es-1", country: "Spain", flag: "🇪🇸", name: "GAME Spain", type: "National Gaming & Merchandise Retailer", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "es-2", country: "Spain", flag: "🇪🇸", name: "Fnac España", type: "Major Cultural & Tech Retail Chain", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "es-3", country: "Spain", flag: "🇪🇸", name: "Juguettos", type: "Specialist Toy Store Network", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "es-4", country: "Spain", flag: "🇪🇸", name: "MINISO Spain", type: "Lifestyle & Character Goods Chain", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" },
  { id: "es-5", country: "Spain", flag: "🇪🇸", name: "Toys \"R\" Us Iberia", type: "Toy & Family Entertainment Retailer", status: "Prospect / Not Yet Contacted", assignedTo: "PMG Europe" }
];

type AdminDashboardClientProps = {
  opportunities: Array<{
    id: string;
    slug: string;
    title: string;
    type: string;
    sector: string;
    originCountry: string;
    targetMarkets?: string[];
    status?: string;
    brand?: string;
    company?: string;
    investmentRequirement?: string;
    documentsAvailable?: string[];
    sourcePartner?: string;
    featured?: boolean;
  }>;
  tListings: string;
  tNewListing: string;
  tInquiries: string;
  tApplications: string;
  tTitleHeader: string;
  tTypeHeader: string;
  tSectorHeader: string;
  tStatusHeader: string;
  tInquiriesHeader: string;
  tStatusOpen: string;
};

export function AdminDashboardClient({
  opportunities,
  tListings,
  tNewListing,
  tApplications,
  tTitleHeader,
  tTypeHeader,
  tSectorHeader,
  tStatusHeader,
  tInquiriesHeader,
  tStatusOpen
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"listings" | "prospects" | "leads" | "applications">("listings");
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [prospects, setProspects] = useState<ProspectTarget[]>(initialProspects);
  const [prospectCountryFilter, setProspectCountryFilter] = useState<string>("All");

  const [oppStatuses, setOppStatuses] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    opportunities.forEach((o) => {
      initial[o.id] = o.slug === "sonic-friends-europe-2027" ? "Active Opportunity" : (o.status || tStatusOpen);
    });
    return initial;
  });

  const [leads, setLeads] = useState<Lead[]>([]);
  const [submissions, setSubmissions] = useState<SubmittedApp[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedLeads = localStorage.getItem("pmg_opportunity_leads");
        if (storedLeads) setLeads(JSON.parse(storedLeads));
      } catch (e) {
        console.error("Failed to load leads", e);
      }

      try {
        const storedApps = localStorage.getItem("pmg_opportunity_submissions");
        if (storedApps) setSubmissions(JSON.parse(storedApps));
      } catch (e) {
        console.error("Failed to load applications", e);
      }
    }
  }, []);

  const handleStatusChange = (id: string, newStatus: string) => {
    setOppStatuses((prev) => ({ ...prev, [id]: newStatus }));
  };

  const handleProspectStatusChange = (id: string, newStatus: ProspectTarget["status"]) => {
    setProspects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const filteredProspects = prospectCountryFilter === "All"
    ? prospects
    : prospects.filter((p) => p.country === prospectCountryFilter);

  return (
    <section className="admin-shell" style={{ display: "flex", minHeight: "75vh", background: "#f8fafc" }}>
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ width: 260, padding: 20, borderRight: "1px solid var(--border, #e2e8f0)", background: "#ffffff" }}>
        <div style={{ marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid #e2e8f0" }}>
          <strong style={{ fontSize: "1.05rem", color: "#0f172a" }}>PMG Command Center</strong>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>Internal B2B Opportunity CRM</p>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          <li>
            <button
              onClick={() => setActiveTab("listings")}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px 14px",
                borderRadius: 6,
                border: "none",
                background: activeTab === "listings" ? "var(--primary, #0f766e)" : "transparent",
                color: activeTab === "listings" ? "#ffffff" : "#334155",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span>📌 {tListings}</span>
              <span style={{ fontSize: "0.8rem", opacity: 0.85 }}>({opportunities.length})</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("prospects")}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px 14px",
                borderRadius: 6,
                border: "none",
                background: activeTab === "prospects" ? "var(--primary, #0f766e)" : "transparent",
                color: activeTab === "prospects" ? "#ffffff" : "#334155",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span>🎯 Sonic Retail Targets</span>
              <span style={{ fontSize: "0.8rem", background: activeTab === "prospects" ? "rgba(255,255,255,0.2)" : "#e0f2fe", color: activeTab === "prospects" ? "#fff" : "#0369a1", padding: "2px 6px", borderRadius: 10 }}>
                {prospects.length}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("leads")}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px 14px",
                borderRadius: 6,
                border: "none",
                background: activeTab === "leads" ? "var(--primary, #0f766e)" : "transparent",
                color: activeTab === "leads" ? "#ffffff" : "#334155",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span>📥 Inbound Buyer Leads</span>
              <span style={{ fontSize: "0.8rem", background: activeTab === "leads" ? "rgba(255,255,255,0.2)" : "#dcfce7", color: activeTab === "leads" ? "#fff" : "#15803d", padding: "2px 6px", borderRadius: 10 }}>
                {leads.length}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("applications")}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px 14px",
                borderRadius: 6,
                border: "none",
                background: activeTab === "applications" ? "var(--primary, #0f766e)" : "transparent",
                color: activeTab === "applications" ? "#ffffff" : "#334155",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span>📑 {tApplications}</span>
              <span style={{ fontSize: "0.8rem", opacity: 0.85 }}>({submissions.length})</span>
            </button>
          </li>
        </ul>

        <div style={{ marginTop: 30, padding: 12, background: "#f1f5f9", borderRadius: 8, fontSize: "0.8rem", color: "#64748b" }}>
          <strong>Principal Network:</strong>
          <div style={{ marginTop: 4 }}>Japan Industrial Promotion Inc. (Daiki Fukaura)</div>
          <div style={{ marginTop: 2 }}>De Vries Sales Consultancy (Alex de Vries)</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main" style={{ flex: 1, padding: 24, overflowX: "auto" }}>
        {/* TAB 1: LISTINGS */}
        {activeTab === "listings" && (
          <>
            <div className="section-top" style={{ margin: 0, marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h1 style={{ fontSize: "1.5rem", margin: "0 0 4px 0" }}>{tListings}</h1>
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Live commercial opportunities indexed on PartnerMarketGlobal</span>
              </div>
              <button className="btn btn-primary">{tNewListing}</button>
            </div>

            <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse", background: "#ffffff", borderRadius: 8, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <thead>
                <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
                  <th style={{ padding: "10px 12px" }}>{tTitleHeader}</th>
                  <th style={{ padding: "10px 12px" }}>{tTypeHeader}</th>
                  <th style={{ padding: "10px 12px" }}>{tSectorHeader}</th>
                  <th style={{ padding: "10px 12px" }}>Origin</th>
                  <th style={{ padding: "10px 12px" }}>{tStatusHeader}</th>
                  <th style={{ padding: "10px 12px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map((opportunity) => {
                  const isSonic = opportunity.slug === "sonic-friends-europe-2027";
                  return (
                    <tr key={opportunity.id} style={{ borderBottom: "1px solid #e2e8f0", background: isSonic ? "#f0f7ff" : "transparent" }}>
                      <td style={{ padding: "10px 12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {isSonic && <span style={{ background: "#ffcc00", color: "#000", fontSize: "0.7rem", fontWeight: 800, padding: "2px 6px", borderRadius: 4 }}>NEW</span>}
                          <strong>{opportunity.title}</strong>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                          Slug: <code>{opportunity.slug}</code> | Principal: {opportunity.sourcePartner || "JIP Japan"}
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px", fontSize: "0.9rem" }}>{opportunity.type}</td>
                      <td style={{ padding: "10px 12px", fontSize: "0.9rem" }}>{opportunity.sector}</td>
                      <td style={{ padding: "10px 12px", fontSize: "0.9rem" }}>📍 {opportunity.originCountry}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <select
                          value={oppStatuses[opportunity.id] || "Active"}
                          onChange={(e) => handleStatusChange(opportunity.id, e.target.value)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: 6,
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            border: "1px solid #cbd5e1",
                            background:
                              oppStatuses[opportunity.id] === "Active Opportunity" || oppStatuses[opportunity.id] === "Active"
                                ? "#dcfce7"
                                : oppStatuses[opportunity.id] === "Closing Soon"
                                ? "#fef3c7"
                                : oppStatuses[opportunity.id] === "Paused"
                                ? "#f1f5f9"
                                : "#fee2e2",
                            color:
                              oppStatuses[opportunity.id] === "Active Opportunity" || oppStatuses[opportunity.id] === "Active"
                                ? "#15803d"
                                : oppStatuses[opportunity.id] === "Closing Soon"
                                ? "#b45309"
                                : oppStatuses[opportunity.id] === "Paused"
                                ? "#475569"
                                : "#991b1b"
                          }}
                        >
                          <option value="Active">Active</option>
                          <option value="Active Opportunity">Active Opportunity</option>
                          <option value="Closing Soon">Closing Soon</option>
                          <option value="Paused">Paused</option>
                          <option value="Closed">Closed</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <Link href={`/en/opportunities/${opportunity.slug}`} target="_blank" style={{ fontSize: "0.8rem", color: "#0f766e", fontWeight: 600 }}>
                            View ↗
                          </Link>
                          <button
                            onClick={() => setSelectedOpportunity(selectedOpportunity === opportunity.id ? null : opportunity.id)}
                            style={{ fontSize: "0.8rem", color: "#0284c7", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Opportunity Drawer */}
            {selectedOpportunity && (
              <div style={{ marginTop: 20, padding: 20, background: "#ffffff", borderRadius: 8, border: "1px solid #cbd5e1" }}>
                {(() => {
                  const opp = opportunities.find((o) => o.id === selectedOpportunity);
                  if (!opp) return null;
                  return (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <h3 style={{ margin: 0, fontSize: "1.2rem" }}>CMS Details: {opp.title}</h3>
                        <button onClick={() => setSelectedOpportunity(null)} style={{ background: "#e2e8f0", border: "none", padding: "4px 10px", borderRadius: 4, cursor: "pointer" }}>✕ Close</button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontSize: "0.88rem" }}>
                        <div><strong>Slug:</strong> {opp.slug}</div>
                        <div><strong>Principal:</strong> {opp.sourcePartner || "JIP Japan"}</div>
                        <div><strong>Brand:</strong> {opp.brand || "N/A"}</div>
                        <div><strong>Origin:</strong> {opp.originCountry}</div>
                        <div><strong>Target Markets:</strong> {opp.targetMarkets?.join(", ") || "Global"}</div>
                        <div><strong>Commercial Terms:</strong> {opp.investmentRequirement || "Standard"}</div>
                        <div style={{ gridColumn: "span 2" }}>
                          <strong>Documents Available:</strong> {opp.documentsAvailable?.join(" · ") || "None"}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </>
        )}

        {/* TAB 2: PROSPECT TARGETS (SONIC) */}
        {activeTab === "prospects" && (
          <>
            <div className="section-top" style={{ margin: 0, marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h1 style={{ fontSize: "1.5rem", margin: "0 0 4px 0" }}>SONIC &amp; FRIENDS European Retailer Prospect Targets</h1>
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  Internal prospecting CRM records for UK, France, Germany, and Spain. Not public stockists.
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Filter Country:</span>
                {["All", "United Kingdom", "France", "Germany", "Spain"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setProspectCountryFilter(c)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 6,
                      border: "1px solid #cbd5e1",
                      background: prospectCountryFilter === c ? "#0f766e" : "#ffffff",
                      color: prospectCountryFilter === c ? "#ffffff" : "#334155",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse", background: "#ffffff", borderRadius: 8, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <thead>
                <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
                  <th style={{ padding: "10px 12px" }}>Country</th>
                  <th style={{ padding: "10px 12px" }}>Retail Target Account</th>
                  <th style={{ padding: "10px 12px" }}>Channel Category</th>
                  <th style={{ padding: "10px 12px" }}>Outreach Status</th>
                  <th style={{ padding: "10px 12px" }}>Assigned Lead</th>
                </tr>
              </thead>
              <tbody>
                {filteredProspects.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "1.1rem", marginRight: 6 }}>{p.flag}</span>
                      <strong>{p.country}</strong>
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <strong style={{ fontSize: "0.95rem" }}>{p.name}</strong>
                    </td>
                    <td style={{ padding: "10px 12px", fontSize: "0.85rem", color: "#475569" }}>
                      {p.type}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <select
                        value={p.status}
                        onChange={(e) => handleProspectStatusChange(p.id, e.target.value as ProspectTarget["status"])}
                        style={{
                          padding: "4px 8px",
                          borderRadius: 6,
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          border: "1px solid #cbd5e1",
                          background:
                            p.status === "Prospect / Not Yet Contacted"
                              ? "#f1f5f9"
                              : p.status === "Initial Outreach Sent"
                              ? "#e0f2fe"
                              : p.status === "Buyer Presentation Delivered"
                              ? "#fef3c7"
                              : p.status === "Meeting Scheduled" || p.status === "Under Commercial Review"
                              ? "#dcfce7"
                              : "#f3e8ff",
                          color:
                            p.status === "Prospect / Not Yet Contacted"
                              ? "#475569"
                              : p.status === "Initial Outreach Sent"
                              ? "#0369a1"
                              : p.status === "Buyer Presentation Delivered"
                              ? "#b45309"
                              : p.status === "Meeting Scheduled" || p.status === "Under Commercial Review"
                              ? "#15803d"
                              : "#6b21a8"
                        }}
                      >
                        <option value="Prospect / Not Yet Contacted">Prospect / Not Yet Contacted</option>
                        <option value="Initial Outreach Sent">Initial Outreach Sent</option>
                        <option value="Buyer Presentation Delivered">Buyer Presentation Delivered</option>
                        <option value="Sample Sent">Sample Sent</option>
                        <option value="Meeting Scheduled">Meeting Scheduled</option>
                        <option value="Under Commercial Review">Under Commercial Review</option>
                      </select>
                    </td>
                    <td style={{ padding: "10px 12px", fontSize: "0.85rem", color: "#64748b" }}>
                      {p.assignedTo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* TAB 3: INBOUND BUYER LEADS */}
        {activeTab === "leads" && (
          <>
            <div className="section-top" style={{ margin: 0, marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h1 style={{ fontSize: "1.5rem", margin: "0 0 4px 0" }}>Inbound Qualified Buyer Leads ({leads.length})</h1>
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  Structured buyer inquiries with computed lead scoring and priority ranking
                </span>
              </div>
            </div>

            {leads.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", background: "#ffffff", borderRadius: 8, border: "1px dashed #cbd5e1" }}>
                <p style={{ color: "#64748b", margin: 0 }}>No inbound leads captured yet in this browser session.</p>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: 4 }}>
                  Submit a test inquiry via the SONIC &amp; FRIENDS opportunity form to see structured CRM scoring.
                </p>
              </div>
            ) : (
              <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse", background: "#ffffff", borderRadius: 8, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
                    <th style={{ padding: "10px 12px" }}>Priority / Score</th>
                    <th style={{ padding: "10px 12px" }}>Company &amp; Contact</th>
                    <th style={{ padding: "10px 12px" }}>Opportunity</th>
                    <th style={{ padding: "10px 12px" }}>Type &amp; Country</th>
                    <th style={{ padding: "10px 12px" }}>Signals / Requests</th>
                    <th style={{ padding: "10px 12px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                        <span
                          style={{
                            padding: "3px 8px",
                            borderRadius: 12,
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            background: lead.priorityRating === "HIGH PRIORITY" ? "#dcfce7" : lead.priorityRating === "MEDIUM PRIORITY" ? "#fef3c7" : "#f1f5f9",
                            color: lead.priorityRating === "HIGH PRIORITY" ? "#15803d" : lead.priorityRating === "MEDIUM PRIORITY" ? "#b45309" : "#475569"
                          }}
                        >
                          {lead.priorityRating} ({lead.leadScore}/100)
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <strong>{lead.company}</strong>
                        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                          {lead.contactName} {lead.jobTitle ? `(${lead.jobTitle})` : ""} · {lead.email}
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px", fontSize: "0.85rem" }}>
                        <strong>{lead.opportunity}</strong>
                      </td>
                      <td style={{ padding: "10px 12px", fontSize: "0.85rem" }}>
                        <div>{lead.companyType || "Retailer"}</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>📍 {lead.country}</div>
                      </td>
                      <td style={{ padding: "10px 12px", fontSize: "0.8rem", color: "#475569" }}>
                        {lead.prioritySignals?.length > 0 ? (
                          lead.prioritySignals.join(", ")
                        ) : (
                          lead.requestedInfo || "Catalogue requested"
                        )}
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <button
                          onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                          style={{ fontSize: "0.8rem", color: "#0284c7", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}
                        >
                          View Full Lead
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Lead Modal */}
            {selectedLead && (
              <div style={{ marginTop: 20, padding: 20, background: "#ffffff", borderRadius: 8, border: "1px solid #cbd5e1" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <h3 style={{ margin: 0, fontSize: "1.2rem" }}>
                    Structured Lead Profile: {selectedLead.company}
                  </h3>
                  <button onClick={() => setSelectedLead(null)} style={{ background: "#e2e8f0", border: "none", padding: "4px 10px", borderRadius: 4, cursor: "pointer" }}>✕ Close</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: "0.88rem" }}>
                  <div><strong>Contact:</strong> {selectedLead.contactName} ({selectedLead.jobTitle})</div>
                  <div><strong>Email / Phone:</strong> {selectedLead.email} / {selectedLead.phone}</div>
                  <div><strong>Company Type:</strong> {selectedLead.companyType}</div>
                  <div><strong>Country / Website:</strong> {selectedLead.country} / {selectedLead.website || "N/A"}</div>
                  <div><strong>Lead Score:</strong> {selectedLead.leadScore}/100 ({selectedLead.priorityRating})</div>
                  <div><strong>Opportunity:</strong> {selectedLead.opportunity}</div>
                  {selectedLead.sonicDetails && (
                    <>
                      <div style={{ gridColumn: "span 2" }}><strong>Interests:</strong> {selectedLead.sonicDetails.interests?.join(", ") || "Full Assortment"}</div>
                      <div><strong>Stores:</strong> {selectedLead.sonicDetails.storeCount || "N/A"}</div>
                      <div><strong>Annual Volume:</strong> {selectedLead.sonicDetails.annualPurchasingVolume || "N/A"}</div>
                      <div><strong>Licensed Portfolio:</strong> {selectedLead.sonicDetails.licensedPortfolio || "N/A"}</div>
                      <div><strong>Channels:</strong> {selectedLead.sonicDetails.intendedChannels || "N/A"}</div>
                      <div style={{ gridColumn: "span 2" }}><strong>Requests:</strong> {selectedLead.sonicDetails.requests?.join(", ")}</div>
                      {selectedLead.sonicDetails.message && (
                        <div style={{ gridColumn: "span 2" }}><strong>Message:</strong> {selectedLead.sonicDetails.message}</div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* TAB 4: INTAKE APPLICATIONS */}
        {activeTab === "applications" && (
          <>
            <div className="section-top" style={{ margin: 0, marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h1 style={{ fontSize: "1.5rem" }}>Intake Submissions ({submissions.length})</h1>
              <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Submissions require manual review before publication</span>
            </div>

            {submissions.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", background: "#ffffff", borderRadius: 8, border: "1px dashed #cbd5e1" }}>
                <p style={{ color: "#64748b", margin: 0 }}>No new submissions received in local session yet.</p>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: 4 }}>
                  Test the submission form at <code>/submit-opportunity</code>
                </p>
              </div>
            ) : (
              <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse", background: "#ffffff", borderRadius: 8, overflow: "hidden" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
                    <th style={{ padding: "10px 12px" }}>Reference</th>
                    <th style={{ padding: "10px 12px" }}>Title &amp; Company</th>
                    <th style={{ padding: "10px 12px" }}>Origin</th>
                    <th style={{ padding: "10px 12px" }}>Target Markets</th>
                    <th style={{ padding: "10px 12px" }}>Contact</th>
                    <th style={{ padding: "10px 12px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => (
                    <tr key={sub.refCode} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "10px 12px" }}><code style={{ fontWeight: 600 }}>{sub.refCode}</code></td>
                      <td style={{ padding: "10px 12px" }}>
                        <div><strong>{sub.title}</strong></div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>{sub.company}</div>
                      </td>
                      <td style={{ padding: "10px 12px" }}>{sub.originCountry}</td>
                      <td style={{ padding: "10px 12px" }}>{sub.targetCountries.join(", ")}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <div>{sub.contactName}</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{sub.email}</div>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ background: "#fef3c7", color: "#b45309", padding: "2px 8px", borderRadius: 12, fontSize: "0.8rem", fontWeight: 600 }}>
                          {sub.status || "New"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </section>
  );
}
