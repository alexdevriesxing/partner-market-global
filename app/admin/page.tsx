import type { Metadata } from "next";
import { opportunities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin Dashboard Mockup",
  robots: { index: false, follow: false }
};

export default function AdminPage() {
  return (
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <a>Listings</a>
        <a>Inquiries</a>
        <a>Applications</a>
        <a>Packages</a>
        <a>Documents</a>
        <a>Settings</a>
      </aside>
      <div className="admin-main">
        <div className="section-top" style={{ margin: 0, marginBottom: 20 }}>
          <h1>Opportunity Listings</h1>
          <button className="btn btn-primary">New Listing</button>
        </div>
        <table className="admin-table">
          <thead>
            <tr><th>Title</th><th>Type</th><th>Sector</th><th>Status</th><th>Inquiries</th></tr>
          </thead>
          <tbody>
            {opportunities.map((opportunity, index) => (
              <tr key={opportunity.id}>
                <td>{opportunity.title}</td>
                <td>{opportunity.type}</td>
                <td>{opportunity.sector}</td>
                <td><span className="status">{opportunity.status}</span></td>
                <td>{12 + index * 3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
