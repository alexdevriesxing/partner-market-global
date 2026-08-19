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
  const isEbara = oppSlug === "ebara-foods-indonesia-distribution-noodle-partnership";
  const isSonic = oppSlug === "sonic-friends-europe-2027";

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

  const [sonicFields, setSonicFields] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    companyType: "",
    interests: [] as string[],
    countriesCovered: "",
    storeCount: "",
    annualPurchasingVolume: "",
    licensedPortfolio: "",
    intendedChannels: "",
    requests: [] as string[],
    message: ""
  });

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

  const [ebaraFields, setEbaraFields] = useState({
    hqLocation: "",
    indonesianTerritories: "",
    baliPresence: "",
    foodserviceCustomers: "",
    ramenNetwork: "",
    distributionChannels: "",
    warehousingCapability: "",
    coldChainCapability: "",
    importLicencesBPOM: "",
    existingNoodleProduction: "",
    monthlyNoodleCapacity: "",
    productDevCapability: "",
    currentBrands: "",
    interestType: "",
    annualRevenueBand: "",
    whySuitable: "",
    proposedRtmPlan: "",
    abilityToFundInventory: "",
    ownershipValuationInterest: "",
    notMasuyaConfirmed: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [honeypot, setHoneypot] = useState("");
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

  const handleInterestToggle = (item: string) => {
    setSonicFields((prev) => {
      const exists = prev.interests.includes(item);
      return {
        ...prev,
        interests: exists ? prev.interests.filter((i) => i !== item) : [...prev.interests, item]
      };
    });
  };

  const handleRequestToggle = (item: string) => {
    setSonicFields((prev) => {
      const exists = prev.requests.includes(item);
      return {
        ...prev,
        requests: exists ? prev.requests.filter((i) => i !== item) : [...prev.requests, item]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent rejection for bot submissions
    setSubmitError("");

    if (isSonic) {
      if (!sonicFields.firstName || !sonicFields.lastName || !formData.company || !formData.email || !formData.phone || !formData.country || !formData.consent) {
        alert("Please fill in all required contact information and accept the privacy consent checkbox.");
        return;
      }
    } else {
      if (!formData.name || !formData.company || !formData.email || !formData.phone || !formData.consent) {
        alert("Please fill in all required fields and accept the consent checkbox.");
        return;
      }
    }

    if (isEbara && !ebaraFields.notMasuyaConfirmed) {
      alert("Please confirm that your company is NOT MASUYA (active Ebara partner excluded from outreach).");
      return;
    }

    setIsSubmitting(true);

    // Compute lead score & signals for Sonic
    let leadScore = 10;
    const prioritySignals: string[] = [];
    if (isSonic) {
      const cType = sonicFields.companyType || formData.partnerType;
      if (["National Retail Chain", "Toy Retailer", "Gaming Retailer", "Department Store"].includes(cType)) {
        leadScore += 20;
        prioritySignals.push(`National Retail / Major Chain (${cType})`);
      } else if (["Distributor", "Wholesaler", "Importer"].includes(cType)) {
        leadScore += 20;
        prioritySignals.push(`Wholesale / Distribution Partner (${cType})`);
      } else if (["Specialist Retailer", "Pop Culture Stores", "E-commerce", "Gift Retailer"].includes(cType)) {
        leadScore += 15;
        prioritySignals.push(`Specialist Buyer (${cType})`);
      }

      if (["26–50 stores", "50+ stores", "Wholesale distribution network"].includes(sonicFields.storeCount)) {
        leadScore += 25;
        prioritySignals.push(`High Store Count (${sonicFields.storeCount})`);
      } else if (["11–25 stores"].includes(sonicFields.storeCount)) {
        leadScore += 15;
        prioritySignals.push(`Multi-unit Retailer (${sonicFields.storeCount})`);
      }

      if (sonicFields.countriesCovered && (sonicFields.countriesCovered.includes(",") || sonicFields.countriesCovered.toLowerCase().includes("europe") || sonicFields.countriesCovered.toLowerCase().includes("uk") || sonicFields.countriesCovered.toLowerCase().includes("germany") || sonicFields.countriesCovered.toLowerCase().includes("france") || sonicFields.countriesCovered.toLowerCase().includes("spain"))) {
        leadScore += 15;
        prioritySignals.push("Multi-Country European Coverage");
      }

      if (sonicFields.licensedPortfolio.trim().length > 3) {
        leadScore += 15;
        prioritySignals.push("Existing Licensed Portfolio");
      }

      if (sonicFields.requests.includes("Arrange meeting") || sonicFields.requests.includes("Discuss distribution")) {
        leadScore += 15;
        prioritySignals.push("Meeting / Distribution Request");
      }
      if (sonicFields.requests.includes("Request samples")) {
        leadScore += 10;
        prioritySignals.push("Sample Pack Request");
      }
      if (sonicFields.interests.includes("Full Commercial Range") || sonicFields.interests.length >= 3) {
        leadScore += 10;
        prioritySignals.push("Broad Range Interest");
      }
    }

    const priorityRating = leadScore >= 45 ? "HIGH PRIORITY" : leadScore >= 25 ? "MEDIUM PRIORITY" : "STANDARD";

    const payload = {
      opportunity: oppTitle || (isSonic ? "SONIC & FRIENDS Europe 2027" : "General Opportunity"),
      oppSlug: oppSlug || "general",
      brand: isSonic ? "SONIC & FRIENDS" : opportunity?.brand || "N/A",
      principal: isSonic ? "Japan Industrial Promotion Inc. (Daiki Fukaura)" : source || "JIP Japan",
      contactName: isSonic ? `${sonicFields.firstName} ${sonicFields.lastName}`.trim() : formData.name,
      jobTitle: sonicFields.jobTitle || "Buyer / Decision Maker",
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      website: formData.website || "",
      companyType: isSonic ? sonicFields.companyType : formData.partnerType,
      activity: formData.activity,
      network: formData.network,
      reason: isSonic ? sonicFields.requests.join(", ") : formData.reason,
      requirements: formData.requirements,
      leadScore,
      priorityRating,
      prioritySignals,
      sonicDetails: isSonic ? sonicFields : undefined,
      nittohDetails: isNittoh ? nittohFields : undefined,
      ichibanDetails: isIchiban ? ichibanFields : undefined,
      ebaraDetails: isEbara ? ebaraFields : undefined,
      utmData: utms,
      referrer
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry. Please try again.");
      }

      const returnedRef = data.referenceId || `PMG-INQ-${Date.now()}`;
      setReferenceId(returnedRef);

      // Local storage cache for admin overview
      if (typeof window !== "undefined") {
        try {
          const storedLeads = JSON.parse(localStorage.getItem("pmg_opportunity_leads") || "[]");
          storedLeads.unshift({
            id: returnedRef,
            timestamp: new Date().toISOString(),
            source: "PartnerMarketGlobal website",
            industry: isSonic ? "licensed merchandise / toys" : category || "General",
            ...payload
          });
          localStorage.setItem("pmg_opportunity_leads", JSON.stringify(storedLeads));
        } catch (err) {
          console.warn("Storage warning:", err);
        }
      }

      if (isSonic) {
        setFormData((prev) => ({ ...prev, name: `${sonicFields.firstName} ${sonicFields.lastName}`.trim() }));
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Inquiry submission error:", err);
      setSubmitError(err.message || "An unexpected error occurred. Please try again or contact info@partnermarketglobal.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="inquiry-success-card" style={{ maxWidth: 700, margin: "40px auto", textAlign: "center", padding: "40px 24px", background: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#ecfdf5", color: "#059669", fontSize: "32px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>✓</div>
        <h2 style={{ fontSize: "1.75rem", color: "#0f172a", marginBottom: "12px" }}>Inquiry Submitted Successfully</h2>
        <div style={{ display: "inline-block", background: "#f1f5f9", padding: "6px 16px", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "600", color: "#334155", marginBottom: "20px" }}>
          Reference: <span style={{ fontFamily: "monospace", color: "#0f766e" }}>{referenceId}</span>
        </div>
        <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: "1.6", maxWidth: "560px", margin: "0 auto 24px" }}>
          Thank you, <strong>{isSonic ? `${sonicFields.firstName} ${sonicFields.lastName}` : formData.name}</strong>. Your commercial inquiry has been registered server-side and routed to Partner Market Global (<strong>info@partnermarketglobal.com</strong>) and the opportunity principal.
        </p>
        {oppTitle && (
          <div className="success-opp-box" style={{ background: "#f8fafc", padding: "16px 20px", borderRadius: "8px", border: "1px solid #e2e8f0", textAlign: "left", margin: "0 auto 24px", maxWidth: "560px" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", display: "block", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600" }}>Opportunity</span>
            <strong style={{ fontSize: "1.05rem", color: "#0f172a" }}>{oppTitle}</strong>
            {source && <span className="source-tag" style={{ display: "inline-block", marginLeft: "10px", fontSize: "0.75rem", background: "#e0f2fe", color: "#0369a1", padding: "2px 8px", borderRadius: "4px" }}>{source}</span>}
          </div>
        )}
        <p style={{ fontSize: "0.9rem", color: "#64748b", borderTop: "1px solid #e2e8f0", paddingTop: "18px", maxWidth: "560px", margin: "0 auto" }}>
          Our team is reviewing your profile and qualifications. A representative will contact you at <strong>{formData.email}</strong> within 1–2 business days.
        </p>
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
        {!isSonic && (
          <>
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
                ) : isEbara ? (
                  <>
                    <option value="Foodservice Distributor">Foodservice Distributor</option>
                    <option value="Ramen Ingredient Wholesaler">Ramen Ingredient Wholesaler</option>
                    <option value="Noodle Manufacturer">Noodle Manufacturer</option>
                    <option value="Local Trading Company">Local Trading Company</option>
                    <option value="Strategic Investment or M&A">Strategic Investment or M&A</option>
                    <option value="B2B Wholesaler">B2B Wholesaler</option>
                    <option value="Other Strategic Partner">Other Strategic Partner</option>
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
          </>
        )}

        {isSonic && (
          <div className="custom-qualifying-fields span-2" style={{ gridColumn: "span 2", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px", borderTop: "2px solid #0056b3", paddingTop: "24px" }}>
            <div className="span-2" style={{ gridColumn: "span 2", background: "#f0f7ff", border: "1px solid #bfdbfe", padding: "16px", borderRadius: "8px" }}>
              <h3 style={{ margin: "0 0 6px 0", fontSize: "1.15rem", fontWeight: "700", color: "#1e3a8a" }}>
                SONIC &amp; FRIENDS European Buyer Qualification &amp; Commercial Request
              </h3>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "#1e40af" }}>
                Direct qualification for European retailers, distributors, wholesalers and specialty buyers. Gated commercial terms and wholesale line sheets will be provided upon verified submission.
              </p>
            </div>

            {/* Contact Details */}
            <label>
              First Name *
              <input
                type="text"
                required
                value={sonicFields.firstName}
                onChange={(e) => setSonicFields({ ...sonicFields, firstName: e.target.value })}
                placeholder="First name"
                style={{ width: "100%", marginTop: "6px" }}
              />
            </label>

            <label>
              Last Name *
              <input
                type="text"
                required
                value={sonicFields.lastName}
                onChange={(e) => setSonicFields({ ...sonicFields, lastName: e.target.value })}
                placeholder="Last name"
                style={{ width: "100%", marginTop: "6px" }}
              />
            </label>

            <label>
              Job Title / Role *
              <input
                type="text"
                required
                value={sonicFields.jobTitle}
                onChange={(e) => setSonicFields({ ...sonicFields, jobTitle: e.target.value })}
                placeholder="e.g. Senior Buyer / Head of Merchandising / Commercial Director"
                style={{ width: "100%", marginTop: "6px" }}
              />
            </label>

            <label>
              Company Type / Business Model *
              <select
                required
                value={sonicFields.companyType}
                onChange={(e) => setSonicFields({ ...sonicFields, companyType: e.target.value })}
                style={{ width: "100%", marginTop: "6px" }}
              >
                <option value="">Select company type</option>
                <option value="National Retail Chain">National Retail Chain</option>
                <option value="Toy Retailer">Toy Retailer / Superstore</option>
                <option value="Gaming Retailer">Gaming / Entertainment Retailer</option>
                <option value="Specialist Retailer">Specialist / Pop Culture Retailer</option>
                <option value="Gift Retailer">Gift / Lifestyle Retailer</option>
                <option value="Department Store">Department Store</option>
                <option value="Distributor">Distributor / Master Importer</option>
                <option value="Wholesaler">Wholesaler / B2B Trader</option>
                <option value="E-commerce">E-commerce / Marketplace Operator</option>
                <option value="Other">Other Sales Channel</option>
              </select>
            </label>

            {/* Product Interest Multiselect */}
            <div className="span-2" style={{ gridColumn: "span 2", background: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <strong style={{ display: "block", marginBottom: "8px", fontSize: "0.95rem" }}>
                Product Lines of Commercial Interest (Select all that apply):
              </strong>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "8px" }}>
                {[
                  "SONIC & FRIENDS Mascots (140-160 mm)",
                  "SONIC & FRIENDS Plush — Medium (240 mm)",
                  "SONIC & FRIENDS Cushion — Sonic",
                  "SONIC & FRIENDS Plush — Large Sonic (400 mm)",
                  "SONIC & FRIENDS Sleeping Sonic (350 mm)",
                  "SONIC & FRIENDS × Sanrio characters",
                  "Full Commercial Assortment",
                  "Territory Distribution Rights / Market Representation",
                  "National Retail Listing",
                  "Sample Evaluation Pack",
                  "Wholesale Price & Margin Schedules"
                ].map((item) => (
                  <label key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", cursor: "pointer", margin: 0 }}>
                    <input
                      type="checkbox"
                      checked={sonicFields.interests.includes(item)}
                      onChange={() => handleInterestToggle(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Market Scope */}
            <label>
              European Territories / Countries Covered *
              <input
                type="text"
                required
                value={sonicFields.countriesCovered}
                onChange={(e) => setSonicFields({ ...sonicFields, countriesCovered: e.target.value })}
                placeholder="e.g. UK, Germany, France, Benelux, Spain, Pan-European"
                style={{ width: "100%", marginTop: "6px" }}
              />
            </label>

            <label>
              Number of Retail Stores / Outlets
              <select
                value={sonicFields.storeCount}
                onChange={(e) => setSonicFields({ ...sonicFields, storeCount: e.target.value })}
                style={{ width: "100%", marginTop: "6px" }}
              >
                <option value="">Select store count</option>
                <option value="Single flagship / 1 store">Single store / Boutique</option>
                <option value="2–10 stores">2–10 stores</option>
                <option value="11–25 stores">11–25 stores</option>
                <option value="26–50 stores">26–50 stores</option>
                <option value="50+ stores">50+ national / regional stores</option>
                <option value="Pure online / E-commerce">Pure online / E-commerce</option>
                <option value="Wholesale distribution network">Wholesale distribution network</option>
              </select>
            </label>

            <label>
              Approximate Annual Purchasing Volume (Licensed / Toys)
              <input
                type="text"
                value={sonicFields.annualPurchasingVolume}
                onChange={(e) => setSonicFields({ ...sonicFields, annualPurchasingVolume: e.target.value })}
                placeholder="e.g. €100k–€500k / €500k–€2M / 10,000+ units"
                style={{ width: "100%", marginTop: "6px" }}
              />
            </label>

            <label>
              Existing Licensed Character / Toy Portfolio
              <input
                type="text"
                value={sonicFields.licensedPortfolio}
                onChange={(e) => setSonicFields({ ...sonicFields, licensedPortfolio: e.target.value })}
                placeholder="e.g. Gaming plush, anime merchandise, Japanese collectibles"
                style={{ width: "100%", marginTop: "6px" }}
              />
            </label>

            <label className="span-2" style={{ gridColumn: "span 2" }}>
              Intended Retail &amp; Sales Channels
              <input
                type="text"
                value={sonicFields.intendedChannels}
                onChange={(e) => setSonicFields({ ...sonicFields, intendedChannels: e.target.value })}
                placeholder="e.g. Physical high-street stores, shopping mall flagships, direct webshop, B2B wholesale"
                style={{ width: "100%", marginTop: "6px" }}
              />
            </label>

            {/* Request Checkboxes */}
            <div className="span-2" style={{ gridColumn: "span 2", background: "#f0fdf4", padding: "16px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
              <strong style={{ display: "block", marginBottom: "8px", fontSize: "0.95rem", color: "#166534" }}>
                What information would you like to receive?
              </strong>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "8px" }}>
                {[
                  "Request wholesale catalogue & specs",
                  "Request pricing & MOQ schedules",
                  "Request product samples",
                  "Discuss distribution agreement",
                  "Arrange discovery meeting",
                  "Request logistics & carton packaging data"
                ].map((item) => (
                  <label key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", cursor: "pointer", margin: 0, color: "#14532d" }}>
                    <input
                      type="checkbox"
                      checked={sonicFields.requests.includes(item)}
                      onChange={() => handleRequestToggle(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="span-2" style={{ gridColumn: "span 2" }}>
              Additional Commercial Notes or Specific Inquiries
              <textarea
                value={sonicFields.message}
                onChange={(e) => setSonicFields({ ...sonicFields, message: e.target.value })}
                placeholder="Please include any specific timing constraints, target launch dates, or commercial queries..."
                style={{ width: "100%", marginTop: "6px", minHeight: "80px" }}
              />
            </label>
          </div>
        )}

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

        {isEbara && (
          <div className="custom-qualifying-fields span-2" style={{ gridColumn: "span 2", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
            <h3 className="span-2" style={{ gridColumn: "span 2", fontSize: "1.1rem", fontWeight: "600", color: "var(--foreground)", marginBottom: "4px" }}>Ebara Foods Partner Qualification Questions</h3>

            {/* MASUYA exclusion confirmation */}
            <label className="span-2" style={{ gridColumn: "span 2", backgroundColor: "#fff8f8", border: "1px solid #fecaca", padding: "12px", borderRadius: "6px", display: "flex", gap: "10px", alignItems: "center", cursor: "pointer" }}>
              <input
                type="checkbox"
                required
                checked={ebaraFields.notMasuyaConfirmed}
                onChange={(e) => setEbaraFields({ ...ebaraFields, notMasuyaConfirmed: e.target.checked })}
              />
              <span style={{ fontSize: "0.9rem", color: "#991b1b", fontWeight: "600" }}>
                I confirm that my company is NOT MASUYA (MASUYA is an active Ebara partner and is excluded from outreach). *
              </span>
            </label>

            <label>
              Headquarters Location *
              <input type="text" required value={ebaraFields.hqLocation} onChange={(e) => setEbaraFields({...ebaraFields, hqLocation: e.target.value})} placeholder="e.g. Jakarta, Denpasar, Surabaya, Singapore" style={{ width: "100%", marginTop: "6px" }} />
            </label>

            <label>
              Indonesian Territories Covered *
              <input type="text" required value={ebaraFields.indonesianTerritories} onChange={(e) => setEbaraFields({...ebaraFields, indonesianTerritories: e.target.value})} placeholder="e.g. Bali, Greater Jakarta, East Java" style={{ width: "100%", marginTop: "6px" }} />
            </label>

            <label>
              Bali Presence / Operational Coverage *
              <input type="text" required value={ebaraFields.baliPresence} onChange={(e) => setEbaraFields({...ebaraFields, baliPresence: e.target.value})} placeholder="e.g. Direct warehouse in Denpasar / Active sales rep in Bali" style={{ width: "100%", marginTop: "6px" }} />
            </label>

            <label>
              Primary Interest / Cooperation Type *
              <select required value={ebaraFields.interestType} onChange={(e) => setEbaraFields({...ebaraFields, interestType: e.target.value})} style={{ width: "100%", marginTop: "6px" }}>
                <option value="">Select primary interest</option>
                <option value="Foodservice Distribution">Foodservice Distribution</option>
                <option value="Ramen Ingredient Wholesaling">Ramen Ingredient Wholesaling</option>
                <option value="Noodle Manufacturing Partnership">Noodle Manufacturing Partnership</option>
                <option value="Trading Company Representation">Trading Company Representation</option>
                <option value="Strategic Alliance">Strategic Alliance</option>
                <option value="Strategic Investment or M&A">Strategic Investment or M&A</option>
              </select>
            </label>

            <label className="span-2">
              Number & Type of Active Foodservice Customers *
              <input type="text" required value={ebaraFields.foodserviceCustomers} onChange={(e) => setEbaraFields({...ebaraFields, foodserviceCustomers: e.target.value})} placeholder="e.g. 150 accounts including hotels, izakayas and independent restaurants" style={{ width: "100%", marginTop: "6px" }} />
            </label>

            <label className="span-2">
              Japanese Restaurant & Ramen Customer Network *
              <input type="text" required value={ebaraFields.ramenNetwork} onChange={(e) => setEbaraFields({...ebaraFields, ramenNetwork: e.target.value})} placeholder="e.g. 40 ramen shops and 25 izakayas currently supplied" style={{ width: "100%", marginTop: "6px" }} />
            </label>

            <label>
              Warehousing Capabilities *
              <select required value={ebaraFields.warehousingCapability} onChange={(e) => setEbaraFields({...ebaraFields, warehousingCapability: e.target.value})} style={{ width: "100%", marginTop: "6px" }}>
                <option value="">Select option</option>
                <option value="Ambient, Refrigerated & Frozen">Ambient, Refrigerated & Frozen</option>
                <option value="Ambient & Refrigerated">Ambient & Refrigerated</option>
                <option value="Ambient only">Ambient only</option>
                <option value="Third-party logistics (3PL)">Third-party logistics (3PL)</option>
              </select>
            </label>

            <label>
              Cold-Chain Capability *
              <select required value={ebaraFields.coldChainCapability} onChange={(e) => setEbaraFields({...ebaraFields, coldChainCapability: e.target.value})} style={{ width: "100%", marginTop: "6px" }}>
                <option value="">Select option</option>
                <option value="Yes - Refrigerated and Frozen Fleet">Yes - Refrigerated and Frozen Fleet</option>
                <option value="Yes - Refrigerated Only">Yes - Refrigerated Only</option>
                <option value="Outsourced Cold-Chain Partner">Outsourced Cold-Chain Partner</option>
                <option value="No Cold-Chain (Ambient Only)">No Cold-Chain (Ambient Only)</option>
              </select>
            </label>

            <label className="span-2">
              Food Import Licences & BPOM Regulatory Experience *
              <input type="text" required value={ebaraFields.importLicencesBPOM} onChange={(e) => setEbaraFields({...ebaraFields, importLicencesBPOM: e.target.value})} placeholder="e.g. Active API-U / BPOM registration experience for Japanese food products" style={{ width: "100%", marginTop: "6px" }} />
            </label>

            <label>
              Do you currently produce or manufacture noodles? *
              <select required value={ebaraFields.existingNoodleProduction} onChange={(e) => setEbaraFields({...ebaraFields, existingNoodleProduction: e.target.value})} style={{ width: "100%", marginTop: "6px" }}>
                <option value="">Select option</option>
                <option value="Yes - Active Noodle Manufacturer">Yes - Active Noodle Manufacturer</option>
                <option value="No - But interested in noodle partnership">No - But interested in noodle partnership</option>
                <option value="No - Foodservice Distributor / Wholesaler only">No - Foodservice Distributor / Wholesaler only</option>
              </select>
            </label>

            {/* Conditional field for Noodle Capacity */}
            {(formData.partnerType === "Noodle Manufacturer" || ebaraFields.existingNoodleProduction.includes("Yes") || ebaraFields.interestType === "Noodle Manufacturing Partnership") && (
              <label className="span-2" style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "12px", borderRadius: "6px" }}>
                Monthly Noodle Production Capacity & Specifications *
                <input type="text" required value={ebaraFields.monthlyNoodleCapacity} onChange={(e) => setEbaraFields({...ebaraFields, monthlyNoodleCapacity: e.target.value})} placeholder="e.g. 50,000 portions/month (fresh, chilled, or frozen ramen noodles)" style={{ width: "100%", marginTop: "6px" }} />
              </label>
            )}

            {/* Conditional field for M&A / Investment */}
            {(formData.partnerType === "Strategic Investment or M&A" || ebaraFields.interestType === "Strategic Investment or M&A") && (
              <label className="span-2" style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", padding: "12px", borderRadius: "6px" }}>
                Strategic Investment / M&A Interest Details *
                <textarea required value={ebaraFields.ownershipValuationInterest} onChange={(e) => setEbaraFields({...ebaraFields, ownershipValuationInterest: e.target.value})} placeholder="Specify your business scope, ownership structure, infrastructure (warehousing, sales, production), and key parameters for investment/acquisition discussions..." style={{ width: "100%", marginTop: "6px", minHeight: "80px" }} />
              </label>
            )}

            <label>
              Approximate Annual Revenue Band *
              <select required value={ebaraFields.annualRevenueBand} onChange={(e) => setEbaraFields({...ebaraFields, annualRevenueBand: e.target.value})} style={{ width: "100%", marginTop: "6px" }}>
                <option value="">Select revenue band</option>
                <option value="Under USD 500k">Under USD 500k</option>
                <option value="USD 500k - 2 Million">USD 500k - 2 Million</option>
                <option value="USD 2 Million - 5 Million">USD 2 Million - 5 Million</option>
                <option value="USD 5 Million - 15 Million">USD 5 Million - 15 Million</option>
                <option value="Above USD 15 Million">Above USD 15 Million</option>
              </select>
            </label>

            <label>
              Ability to Fund Inventory & Market Development *
              <select required value={ebaraFields.abilityToFundInventory} onChange={(e) => setEbaraFields({...ebaraFields, abilityToFundInventory: e.target.value})} style={{ width: "100%", marginTop: "6px" }}>
                <option value="">Select option</option>
                <option value="Yes - Fully funded for inventory and sales team">Yes - Fully funded for inventory and sales team</option>
                <option value="Moderate - Phased working capital commitment">Moderate - Phased working capital commitment</option>
                <option value="Requires discussion on credit terms">Requires discussion on credit terms</option>
              </select>
            </label>

            <label className="span-2">
              Why is your company suitable for Ebara Foods? *
              <textarea required value={ebaraFields.whySuitable} onChange={(e) => setEbaraFields({...ebaraFields, whySuitable: e.target.value})} placeholder="Explain your alignment, market access, culinary support, or manufacturing synergy..." style={{ width: "100%", marginTop: "6px", minHeight: "80px" }} />
            </label>

            <label className="span-2">
              Proposed Route-to-Market & Commercial Plan *
              <textarea required value={ebaraFields.proposedRtmPlan} onChange={(e) => setEbaraFields({...ebaraFields, proposedRtmPlan: e.target.value})} placeholder="Outline your proposed timeline, target restaurant accounts in Bali/Indonesia, and commercial launch plan..." style={{ width: "100%", marginTop: "6px", minHeight: "80px" }} />
            </label>
          </div>
        )}
      </div>
      {/* Anti-spam honeypot */}
      <input
        type="text"
        name="hp_website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: "none", position: "absolute", left: "-9999px" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {submitError && (
        <div style={{ backgroundColor: "#fef2f2", border: "1px solid #f87171", borderRadius: "8px", padding: "12px 16px", color: "#991b1b", fontSize: "0.9rem", marginBottom: "16px" }}>
          ⚠️ {submitError}
        </div>
      )}

      <label className="consent">
        <input
          type="checkbox"
          required
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
        />
        {" "}{consentText}
      </label>
      <button className="btn btn-primary form-submit" type="submit" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}>
        {isSubmitting ? "Submitting Inquiry..." : (isSonic ? "Request Buyer Information" : submitLabel)}
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
