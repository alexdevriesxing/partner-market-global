"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

type InquiryFormProps = {
  oppTitle?: string;
  oppSlug?: string;
  source?: string;
  title?: string;
  subtitle?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  companyLabel?: string;
  companyPlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  countryLabel?: string;
  countryDefault?: string;
  websiteLabel?: string;
  websitePlaceholder?: string;
  partnerTypeLabel?: string;
  partnerTypeDefault?: string;
  activityLabel?: string;
  activityPlaceholder?: string;
  networkLabel?: string;
  networkPlaceholder?: string;
  reasonLabel?: string;
  reasonPlaceholder?: string;
  requirementsLabel?: string;
  requirementsDefault?: string;
  yesOption?: string;
  discussOption?: string;
  noOption?: string;
  consentText?: string;
  submitLabel?: string;
  disclaimer?: string;
};

function InquiryFormClient({
  oppTitle: propsOppTitle = "",
  oppSlug: propsOppSlug = "",
  source: propsSource = "",
  title = "Send a Qualified Inquiry",
  subtitle = "Tell us about your business and we will connect you with the right person.",
  nameLabel = "Full Name *",
  namePlaceholder = "Your name",
  companyLabel = "Company *",
  companyPlaceholder = "Your company",
  emailLabel = "Email *",
  emailPlaceholder = "you@company.com",
  phoneLabel = "Phone / WhatsApp *",
  phonePlaceholder = "+31 555 123 4567",
  countryLabel = "Country *",
  countryDefault = "Select country",
  websiteLabel = "Website",
  websitePlaceholder = "https://yourcompany.com",
  partnerTypeLabel = "Type of Partner *",
  partnerTypeDefault = "Select partner type",
  activityLabel = "Current Business Activity *",
  activityPlaceholder = "Tell us about your business",
  networkLabel = "Existing Network / Channels *",
  networkPlaceholder = "Your network or channels",
  reasonLabel = "Why are you interested in this opportunity? *",
  reasonPlaceholder = "Your message",
  requirementsLabel = "Can you meet the minimum requirements? *",
  requirementsDefault = "Select",
  yesOption = "Yes",
  discussOption = "Need to discuss",
  noOption = "No",
  consentText = "I confirm that I have read and agree to the Privacy Policy and consent to sharing my inquiry with the opportunity owner.",
  submitLabel = "Submit Inquiry",
  disclaimer = "We respect your privacy. No spam. Unsubscribe anytime.",
}: InquiryFormProps) {
  const searchParams = useSearchParams();
  const oppTitle = searchParams.get("oppTitle") || propsOppTitle || "";
  const oppSlug = searchParams.get("oppSlug") || propsOppSlug || "";
  const source = searchParams.get("source") || propsSource || "";

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    website: "",
    partnerType: "",
    activity: "",
    network: "",
    reason: "",
    requirements: "",
    consent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email || !formData.phone || !formData.consent) {
      alert("Please fill in all required fields and accept the consent checkbox.");
      return;
    }

    const emailTo = "alex@devriessalesconsultancy.com";
    const subject = oppTitle 
      ? `Inquiry: ${oppTitle}` 
      : "General Inquiry - Partner Market Global";
    
    let body = `Hello Alex,\n\nI am writing to inquire about the opportunity: ${oppTitle || "General Inquiry"}.\n\n`;
    body += `My details:\n`;
    body += `- Name: ${formData.name}\n`;
    body += `- Company: ${formData.company}\n`;
    body += `- Email: ${formData.email}\n`;
    body += `- Phone: ${formData.phone}\n`;
    body += `- Country: ${formData.country}\n`;
    body += `- Website: ${formData.website || "N/A"}\n`;
    body += `- Partner Type: ${formData.partnerType}\n`;
    body += `- Current Business Activity: ${formData.activity}\n`;
    body += `- Existing Network: ${formData.network}\n`;
    body += `- Reason for Interest: ${formData.reason}\n`;
    body += `- Meet Minimum Requirements: ${formData.requirements}\n\n`;
    if (oppSlug) {
      body += `Opportunity Slug: ${oppSlug}\n`;
    }
    if (source) {
      body += `Source: ${source}\n`;
    }
    body += `\nRegards,\n${formData.name}`;

    const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="inquiry-success-card">
        <span className="success-icon">✓</span>
        <h2>Inquiry Submitted Successfully</h2>
        <p>Thank you, <strong>{formData.name}</strong>. Your inquiry has been routed to the opportunity owner.</p>
        {oppTitle && (
          <div className="success-opp-box">
            <span>Opportunity:</span>
            <strong>{oppTitle}</strong>
            {source && <span className="source-tag">{source}</span>}
          </div>
        )}
        <p className="success-footer">Our team will review your qualifications and contact you within 1-2 business days.</p>
      </div>
    );
  }

  return (
    <form className="inquiry-form" id="inquiry" onSubmit={handleSubmit}>
      <div className="section-heading small">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      {oppTitle && (
        <div className="inquiry-context-banner">
          <div className="banner-label">INQUIRY CONTEXT</div>
          <div className="banner-details">
            <span className="opp-label">Opportunity:</span>
            <strong>{oppTitle}</strong>
          </div>
          {source && (
            <div className="banner-source">
              <span className="source-label">Source:</span>
              <span className="source-tag">{source}</span>
            </div>
          )}
          {/* Hidden inputs to pass opportunity slug, title, and source */}
          <input type="hidden" name="opportunity_title" value={oppTitle} />
          <input type="hidden" name="opportunity_slug" value={oppSlug} />
          <input type="hidden" name="source" value={source} />
        </div>
      )}

      <div className="form-grid">
        <label>
          {nameLabel}
          <input
            name="name"
            required
            placeholder={namePlaceholder}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label>
          {companyLabel}
          <input
            name="company"
            required
            placeholder={companyPlaceholder}
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </label>
        <label>
          {emailLabel}
          <input
            type="email"
            name="email"
            required
            placeholder={emailPlaceholder}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </label>
        <label>
          {phoneLabel}
          <input
            name="phone"
            required
            placeholder={phonePlaceholder}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </label>
        <label>
          {countryLabel} *
          <select
            name="country"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          >
            <option value="">{countryDefault}</option>
            <option value="Japan">Japan</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Singapore">Singapore</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Spain">Spain</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Thailand">Thailand</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Philippines">Philippines</option>
          </select>
        </label>
        <label>
          {websiteLabel}
          <input
            name="website"
            placeholder={websitePlaceholder}
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </label>
        <label>
          {partnerTypeLabel}
          <select
            name="partnerType"
            required
            value={formData.partnerType}
            onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
          >
            <option value="">{partnerTypeDefault}</option>
            <option value="Importer">Importer</option>
            <option value="Distributor">Distributor</option>
            <option value="Franchisee">Franchisee</option>
            <option value="Investor">Investor</option>
            <option value="Operator">Operator</option>
            <option value="Retailer">Retailer / Buyer</option>
          </select>
        </label>
        <label>
          {activityLabel}
          <input
            name="activity"
            required
            placeholder={activityPlaceholder}
            value={formData.activity}
            onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
          />
        </label>
        <label className="span-2">
          {networkLabel}
          <input
            name="network"
            required
            placeholder={networkPlaceholder}
            value={formData.network}
            onChange={(e) => setFormData({ ...formData, network: e.target.value })}
          />
        </label>
        <label className="span-2">
          {reasonLabel}
          <textarea
            name="reason"
            required
            placeholder={reasonPlaceholder}
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          />
        </label>
        <label className="span-2">
          {requirementsLabel}
          <select
            name="requirements"
            required
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          >
            <option value="">{requirementsDefault}</option>
            <option value="Yes">{yesOption}</option>
            <option value="Need to discuss">{discussOption}</option>
            <option value="No">{noOption}</option>
          </select>
        </label>
      </div>
      <label className="consent">
        <input
          type="checkbox"
          required
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
        />
        {" "}{consentText}
      </label>
      <button className="btn btn-primary form-submit" type="submit">
        {submitLabel}
      </button>
      <p className="form-disclaimer">{disclaimer}</p>
    </form>
  );
}

export function InquiryForm(props: InquiryFormProps) {
  return (
    <Suspense fallback={<div className="inquiry-form-loading">Loading form context...</div>}>
      <InquiryFormClient {...props} />
    </Suspense>
  );
}
