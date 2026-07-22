"use client";

import { useState } from "react";

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

type AdminDashboardClientProps = {
  opportunities: Array<{
    id: string;
    title: string;
    type: string;
    sector: string;
    originCountry: string;
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
  const [activeTab, setActiveTab] = useState<"listings" | "applications">("listings");
  const [submissions] = useState<SubmittedApp[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("pmg_opportunity_submissions");
        if (stored) return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    return [];
  });

  return (
    <section className="admin-shell" style={{ display: "flex", minHeight: "75vh" }}>
      <aside className="admin-sidebar" style={{ width: 220, padding: 20, borderRight: "1px solid var(--border, #e2e8f0)", background: "#f8fafc" }}>
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
                cursor: "pointer"
              }}
            >
              📌 {tListings} ({opportunities.length})
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
                cursor: "pointer"
              }}
            >
              📥 {tApplications} ({submissions.length})
            </button>
          </li>
        </ul>
      </aside>

      <div className="admin-main" style={{ flex: 1, padding: 24 }}>
        {activeTab === "listings" ? (
          <>
            <div className="section-top" style={{ margin: 0, marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h1 style={{ fontSize: "1.5rem" }}>{tListings}</h1>
              <button className="btn btn-primary">{tNewListing}</button>
            </div>
            <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
                  <th style={{ padding: "10px 12px" }}>{tTitleHeader}</th>
                  <th style={{ padding: "10px 12px" }}>{tTypeHeader}</th>
                  <th style={{ padding: "10px 12px" }}>{tSectorHeader}</th>
                  <th style={{ padding: "10px 12px" }}>{tStatusHeader}</th>
                  <th style={{ padding: "10px 12px" }}>{tInquiriesHeader}</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map((opportunity, index) => (
                  <tr key={opportunity.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "10px 12px" }}><strong>{opportunity.title}</strong></td>
                    <td style={{ padding: "10px 12px" }}>{opportunity.type}</td>
                    <td style={{ padding: "10px 12px" }}>{opportunity.sector}</td>
                    <td style={{ padding: "10px 12px" }}><span className="status" style={{ background: "#dcfce7", color: "#15803d", padding: "2px 8px", borderRadius: 12, fontSize: "0.8rem", fontWeight: 600 }}>{tStatusOpen}</span></td>
                    <td style={{ padding: "10px 12px" }}>{12 + index * 3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="section-top" style={{ margin: 0, marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h1 style={{ fontSize: "1.5rem" }}>Intake Submissions ({submissions.length})</h1>
              <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Submissions require manual review before publication</span>
            </div>

            {submissions.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", background: "#f8fafc", borderRadius: 8, border: "1px dashed #cbd5e1" }}>
                <p style={{ color: "#64748b" }}>No new submissions received in local session yet.</p>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Test the submission form at <code>/submit-opportunity</code></p>
              </div>
            ) : (
              <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
                    <th style={{ padding: "10px 12px" }}>Reference</th>
                    <th style={{ padding: "10px 12px" }}>Title & Company</th>
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
