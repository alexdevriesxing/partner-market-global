import type { Metadata } from "next";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Partner Market Global inquiry and listing forms.",
  alternates: { canonical: `${site.url}/privacy-policy` }
};

export default function PrivacyPolicyPage() {
  return (
    <section className="content-section">
      <h1>Privacy Policy</h1>
      <p>Last updated: 2 July 2026</p>
      <p>
        Partner Market Global collects information submitted through inquiry, contact and listing forms so we can review opportunities,
        respond to inquiries and, where consent is given, share qualified inquiries with the relevant opportunity owner.
      </p>
      <h2>Information We Collect</h2>
      <ul>
        <li>Name, company, email, phone or WhatsApp number and country</li>
        <li>Company website, business activity and partner profile</li>
        <li>Opportunity details and documents submitted for review</li>
        <li>Technical analytics data such as pages viewed and approximate region</li>
      </ul>
      <h2>How We Use Information</h2>
      <p>
        We use information to operate the platform, evaluate listing applications, qualify inquiries, prevent spam, improve the website and communicate with users.
      </p>
      <h2>Sharing</h2>
      <p>
        We only share qualified inquiry details with the relevant opportunity owner when the user has consented or when necessary to provide the requested service.
      </p>
      <h2>Contact</h2>
      <p>For privacy questions, contact {site.email}.</p>
    </section>
  );
}
