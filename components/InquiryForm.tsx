"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { opportunities } from "@/lib/data";

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

  const isNittoh = oppSlug === "nittoh-japanese-dollies-utility-carts-distribution";
  const isIchiban = oppSlug === "ichiban-ken-indonesia-master-franchise";

  const opportunity = opportunities.find(o => o.slug === oppSlug);
  const originCountry = opportunity?.originCountry || "";
  const targetMarkets = opportunity?.targetMarkets?.join(", ") || "";
  const category = opportunity?.sector || "";

  const [referrer, setReferrer] = useState("");
  const [utms, setUtms] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ref = document.referrer || "Direct";
      const params = new URLSearchParams(window.location.search);
      const utmObj: Record<string, string> = {};
      params.forEach((val, key) => {
        if (key.toLowerCase().startsWith("utm_")) {
          utmObj[key] = val;
        }
      });
      setTimeout(() => {
        setReferrer(ref);
        setUtms(utmObj);
      }, 0);
    }
  }, []);

  const [nittohFields, setNittohFields] = useState({
    coveredTerritory: "",
    servedChannels: "",
    comparableProducts: "",
    approachableCustomers: "",
    hasWarehousing: "",
    interestAreas: "",
    initialLaunchScope: ""
  });

  const [ichibanFields, setIchibanFields] = useState({
    operatingCities: "",
    restaurantCount: "",
    portfolioBrands: "",
    porkExperience: "",
    locationsAccess: "",
    rolloutScope: "",
    demonstratedFunding: "",
    whySuitable: ""
  });

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

    if (isNittoh) {
      body += `Nittoh Specific Answers:\n`;
      body += `- Which country/territory do you cover?: ${nittohFields.coveredTerritory}\n`;
      body += `- Which sales channels do you currently serve?: ${nittohFields.servedChannels}\n`;
      body += `- Do you import or distribute comparable products?: ${nittohFields.comparableProducts}\n`;
      body += `- Which customer groups could you approach?: ${nittohFields.approachableCustomers}\n`;
      body += `- Do you have warehousing and fulfilment capability?: ${nittohFields.hasWarehousing}\n`;
      body += `- Are you interested in retail, distribution, e-commerce or hotel procurement?: ${nittohFields.interestAreas}\n`;
      body += `- What initial launch scope are you considering?: ${nittohFields.initialLaunchScope}\n\n`;
    } else if (isIchiban) {
      body += `Ichiban-ken Specific Answers:\n`;
      body += `- Which Indonesian cities do you currently operate in?: ${ichibanFields.operatingCities}\n`;
      body += `- How many restaurants do you operate?: ${ichibanFields.restaurantCount}\n`;
      body += `- Which cuisines and brands are in your portfolio?: ${ichibanFields.portfolioBrands}\n`;
      body += `- Do you have experience operating pork-based or non-halal concepts?: ${ichibanFields.porkExperience}\n`;
      body += `- What type of locations can you access?: ${ichibanFields.locationsAccess}\n`;
      body += `- What rollout scope are you considering?: ${ichibanFields.rolloutScope}\n`;
      body += `- Can you demonstrate funding and an operating team?: ${ichibanFields.demonstratedFunding}\n`;
      body += `- Why is Ichiban-ken suitable for your portfolio?: ${ichibanFields.whySuitable}\n\n`;
    }

    body += `Opportunity & Inquiry Context:\n`;
    body += `- Opportunity ID: ${opportunity?.id || "N/A"}\n`;
    body += `- Slug: ${oppSlug || "N/A"}\n`;
    body += `- Category: ${category || "N/A"}\n`;
    body += `- Origin Country: ${originCountry || "N/A"}\n`;
    body += `- Target Market: ${targetMarkets || "N/A"}\n`;
    body += `- Source Partner: ${source || "JIP Japan"}\n`;
    body += `- Referring Page: ${referrer}\n`;
    if (Object.keys(utms).length > 0) {
      body += `- UTM Parameters: ${JSON.stringify(utms)}\n`;
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
            {isNittoh ? (
              <>
                <option value="Importer">Importer</option>
                <option value="Distributor">Distributor</option>
                <option value="Wholesaler">Wholesaler</option>
                <option value="Retailer / Buyer">Retailer / Buyer</option>
                <option value="E-commerce Partner">E-commerce Partner</option>
                <option value="Tool Distributor">Tool Distributor</option>
                <option value="Hotel Procurement / HORECA Buyer">Hotel Procurement / HORECA Buyer</option>
                <option value="Commercial Equipment Supplier">Commercial Equipment Supplier</option>
                <option value="Other Strategic Partner">Other Strategic Partner</option>
              </>
            ) : isIchiban ? (
              <>
                <option value="Master Franchisee">Master Franchisee</option>
                <option value="Multi-unit F&B Operator">Multi-unit F&B Operator</option>
                <option value="Restaurant Group">Restaurant Group</option>
                <option value="Investor-Operator">Investor-Operator</option>
                <option value="Hospitality Group">Hospitality Group</option>
                <option value="Property and Restaurant Partner">Property and Restaurant Partner</option>
                <option value="Strategic Joint-Venture Partner">Strategic Joint-Venture Partner</option>
              </>
            ) : (
              <>
                <option value="Importer">Importer</option>
                <option value="Distributor">Distributor</option>
                <option value="Franchisee">Franchisee</option>
                <option value="Investor">Investor</option>
                <option value="Operator">Operator</option>
                <option value="Retailer">Retailer / Buyer</option>
              </>
            )}
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

        {isNittoh && (
          <div className="custom-qualifying-fields span-2" style={{ gridColumn: "span 2", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
            <h3 className="span-2" style={{ gridColumn: "span 2", fontSize: "1.1rem", fontWeight: "600", color: "var(--foreground)", marginBottom: "4px" }}>Nittoh Partner Qualification Questions</h3>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              Which country or territory do you cover? *
              <input type="text" required value={nittohFields.coveredTerritory} onChange={(e) => setNittohFields({...nittohFields, coveredTerritory: e.target.value})} placeholder="e.g. Germany, United Kingdom, USA" style={{ width: "100%", marginTop: "6px" }} />
            </label>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              Which sales channels do you currently serve? *
              <input type="text" required value={nittohFields.servedChannels} onChange={(e) => setNittohFields({...nittohFields, servedChannels: e.target.value})} placeholder="e.g. DIY, tools retail, e-commerce, hotel supply" style={{ width: "100%", marginTop: "6px" }} />
            </label>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              Do you import or distribute comparable products? *
              <input type="text" required value={nittohFields.comparableProducts} onChange={(e) => setNittohFields({...nittohFields, comparableProducts: e.target.value})} placeholder="e.g. Yes, we distribute plastic moving crates and carts" style={{ width: "100%", marginTop: "6px" }} />
            </label>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              Which customer groups could you approach? *
              <input type="text" required value={nittohFields.approachableCustomers} onChange={(e) => setNittohFields({...nittohFields, approachableCustomers: e.target.value})} placeholder="e.g. major retail chains, luxury hotel operators" style={{ width: "100%", marginTop: "6px" }} />
            </label>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              Do you have warehousing and fulfilment capability? *
              <select required value={nittohFields.hasWarehousing} onChange={(e) => setNittohFields({...nittohFields, hasWarehousing: e.target.value})} style={{ width: "100%", marginTop: "6px" }}>
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              Are you interested in retail, distribution, e-commerce or hotel procurement? *
              <input type="text" required value={nittohFields.interestAreas} onChange={(e) => setNittohFields({...nittohFields, interestAreas: e.target.value})} placeholder="e.g. Retail distribution and HORECA procurement" style={{ width: "100%", marginTop: "6px" }} />
            </label>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              What initial launch scope are you considering? *
              <input type="text" required value={nittohFields.initialLaunchScope} onChange={(e) => setNittohFields({...nittohFields, initialLaunchScope: e.target.value})} placeholder="e.g. Nationwide wholesale distribution" style={{ width: "100%", marginTop: "6px" }} />
            </label>
          </div>
        )}

        {isIchiban && (
          <div className="custom-qualifying-fields span-2" style={{ gridColumn: "span 2", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
            <h3 className="span-2" style={{ gridColumn: "span 2", fontSize: "1.1rem", fontWeight: "600", color: "var(--foreground)", marginBottom: "4px" }}>Ichiban-ken Franchise Qualification Questions</h3>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              Which Indonesian cities do you currently operate in? *
              <input type="text" required value={ichibanFields.operatingCities} onChange={(e) => setIchibanFields({...ichibanFields, operatingCities: e.target.value})} placeholder="e.g. Jakarta, Surabaya, Bali" style={{ width: "100%", marginTop: "6px" }} />
            </label>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              How many restaurants do you operate? *
              <input type="text" required value={ichibanFields.restaurantCount} onChange={(e) => setIchibanFields({...ichibanFields, restaurantCount: e.target.value})} placeholder="e.g. 10 outlets across 3 brands" style={{ width: "100%", marginTop: "6px" }} />
            </label>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              Which cuisines and brands are in your portfolio? *
              <input type="text" required value={ichibanFields.portfolioBrands} onChange={(e) => setIchibanFields({...ichibanFields, portfolioBrands: e.target.value})} placeholder="e.g. Japanese ramen, Western cafes" style={{ width: "100%", marginTop: "6px" }} />
            </label>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              Do you have experience operating pork-based or non-halal concepts? *
              <select required value={ichibanFields.porkExperience} onChange={(e) => setIchibanFields({...ichibanFields, porkExperience: e.target.value})} style={{ width: "100%", marginTop: "6px" }}>
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              What type of locations can you access? *
              <input type="text" required value={ichibanFields.locationsAccess} onChange={(e) => setIchibanFields({...ichibanFields, locationsAccess: e.target.value})} placeholder="e.g. Premium shopping malls, lifestyle hubs" style={{ width: "100%", marginTop: "6px" }} />
            </label>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              What rollout scope are you considering? *
              <input type="text" required value={ichibanFields.rolloutScope} onChange={(e) => setIchibanFields({...ichibanFields, rolloutScope: e.target.value})} placeholder="e.g. 5 stores in the first 3 years" style={{ width: "100%", marginTop: "6px" }} />
            </label>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              Can you demonstrate funding and an operating team? *
              <select required value={ichibanFields.demonstratedFunding} onChange={(e) => setIchibanFields({...ichibanFields, demonstratedFunding: e.target.value})} style={{ width: "100%", marginTop: "6px" }}>
                <option value="">Select option</option>
                <option value="Yes, both">Yes, both funding and active team</option>
                <option value="Funding only">Funding only (need operations partner)</option>
                <option value="Operating team only">Operating team only (need financing)</option>
              </select>
            </label>
            <label className="span-2" style={{ gridColumn: "span 2" }}>
              Why is Ichiban-ken suitable for your portfolio? *
              <textarea required value={ichibanFields.whySuitable} onChange={(e) => setIchibanFields({...ichibanFields, whySuitable: e.target.value})} placeholder="Explain your alignment and strategic fit..." style={{ width: "100%", marginTop: "6px", minHeight: "80px" }} />
            </label>
          </div>
        )}
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
