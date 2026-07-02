import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Partner Market Global about listing an opportunity, partnership inquiries or platform questions.",
  alternates: { canonical: `${site.url}/contact` }
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <div className="eyebrow">Contact</div>
          <h1>Talk to us about your <span>international opportunity</span></h1>
          <p>Email us at {site.email} or use the inquiry form below.</p>
        </div>
        <img src="/assets/companies-hero-collage.webp" alt="Business meeting and trade visuals" />
      </section>
      <section className="content-section">
        <InquiryForm title="Contact Partner Market Global" />
      </section>
    </>
  );
}
