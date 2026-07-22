"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const ALL_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Cambodia",
  "Cameroon", "Canada", "Chile", "China", "Colombia", "Costa Rica", "Croatia", "Cyprus",
  "Czech Republic", "Denmark", "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia",
  "Fiji", "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Honduras",
  "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Israel", "Italy",
  "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Laos",
  "Latvia", "Lebanon", "Liechtenstein", "Lithuania", "Luxembourg", "Malaysia", "Malta",
  "Mexico", "Monaco", "Mongolia", "Morocco", "Mozambique", "Myanmar", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan",
  "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Saudi Arabia", "Senegal", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa",
  "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Tanzania", "Thailand",
  "Tunisia", "Turkey", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Zambia", "Zimbabwe"
];

const QUICK_TARGET_REGIONS = [
  "Worldwide",
  "European Union",
  "Europe",
  "United Kingdom",
  "North America",
  "Latin America",
  "Middle East",
  "Africa",
  "Southeast Asia",
  "East Asia",
  "South Asia",
  "Australia and New Zealand"
];

const LOOKING_FOR_OPTIONS = [
  "Importers",
  "Distributors",
  "Wholesalers",
  "Retailers",
  "E-commerce partners",
  "HORECA or foodservice partners",
  "Sales agents",
  "Licensees",
  "Franchise partners",
  "Manufacturers",
  "Suppliers",
  "Strategic partners",
  "Investors",
  "Buyers or customers",
  "Other"
];

const OPPORTUNITY_TYPES = [
  "Product distribution",
  "Service partnership",
  "Export opportunity",
  "Import opportunity",
  "Licensing",
  "Franchise",
  "Private label or OEM",
  "Investment",
  "Joint venture",
  "Sourcing",
  "Market entry",
  "Other"
];

type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  dataUrl?: string;
};

export function SubmitOpportunityForm({ locale = "en" }: { locale?: string }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [originCountry, setOriginCountry] = useState("Japan");
  const [originSearch, setOriginSearch] = useState("");
  const [description, setDescription] = useState("");
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [otherLookingFor, setOtherLookingFor] = useState("");
  const [targetCountries, setTargetCountries] = useState<string[]>([]);
  const [targetSearch, setTargetSearch] = useState("");
  const [opportunityType, setOpportunityType] = useState("");
  const [trackRecord, setTrackRecord] = useState("");

  // Step 2 State
  const [images, setImages] = useState<UploadedFile[]>([]);
  const [documents, setDocuments] = useState<UploadedFile[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [permission, setPermission] = useState(false);

  // Step 3 State
  const [contactName, setContactName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactCountry, setContactCountry] = useState("Japan");
  const [preferredContact, setPreferredContact] = useState("Email");
  const [referringOrg, setReferringOrg] = useState("");

  // Honeypot (bot prevention)
  const [honeypot, setHoneypot] = useState("");

  // Error State
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Search filtered countries
  const filteredOriginCountries = useMemo(() => {
    if (!originSearch) return ALL_COUNTRIES;
    return ALL_COUNTRIES.filter(c => c.toLowerCase().includes(originSearch.toLowerCase()));
  }, [originSearch]);

  const filteredTargetCountries = useMemo(() => {
    if (!targetSearch) return ALL_COUNTRIES;
    return ALL_COUNTRIES.filter(c => c.toLowerCase().includes(targetSearch.toLowerCase()));
  }, [targetSearch]);

  const toggleLookingFor = (option: string) => {
    setLookingFor(prev => 
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const toggleTargetCountry = (country: string) => {
    setTargetCountries(prev => {
      if (country === "Worldwide") return ["Worldwide"];
      const newTargets = prev.filter(t => t !== "Worldwide");
      return newTargets.includes(country) 
        ? newTargets.filter(c => c !== country) 
        : [...newTargets, country];
    });
  };

  // Image Upload Handler
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const validFiles: UploadedFile[] = [];
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    Array.from(files).forEach((file) => {
      if (!allowed.includes(file.type)) {
        alert(`File ${file.name} is not a supported image format (JPG, PNG, WebP only).`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} exceeds the 10 MB limit.`);
        return;
      }
      if (images.length + validFiles.length >= 10) {
        alert("Maximum 10 images allowed.");
        return;
      }

      const fileObj: UploadedFile = {
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: URL.createObjectURL(file)
      };

      const reader = new FileReader();
      reader.onload = (e) => {
        fileObj.dataUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      validFiles.push(fileObj);
    });

    setImages(prev => [...prev, ...validFiles]);
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  // Document Upload Handler
  const handleDocumentUpload = (files: FileList | null) => {
    if (!files) return;
    const validDocs: UploadedFile[] = [];
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ];

    Array.from(files).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      const isAllowedExt = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext || '');

      if (!allowed.includes(file.type) && !isAllowedExt) {
        alert(`File ${file.name} is not a supported document format (PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX).`);
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        alert(`Document ${file.name} exceeds the 20 MB limit.`);
        return;
      }
      if (documents.length + validDocs.length >= 10) {
        alert("Maximum 10 documents allowed.");
        return;
      }

      const fileObj: UploadedFile = {
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type
      };

      const reader = new FileReader();
      reader.onload = (e) => {
        fileObj.dataUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      validDocs.push(fileObj);
    });

    setDocuments(prev => [...prev, ...validDocs]);
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  // Validation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Opportunity title is required.";
    if (!company.trim()) errs.company = "Company or brand name is required.";
    if (!originCountry) errs.originCountry = "Country of origin is required.";
    if (!description.trim()) errs.description = "Opportunity description is required.";
    else if (description.trim().length < 50) errs.description = "Description should be at least 50 characters.";
    if (lookingFor.length === 0) errs.lookingFor = "Please select at least one partner type.";
    if (website.trim() && !/^https?:\/\/.+/i.test(website.trim())) {
      errs.website = "Please enter a valid URL starting with http:// or https://";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!permission) errs.permission = "You must confirm authorization and permission to submit.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!contactName.trim()) errs.contactName = "Contact name is required.";
    if (!contactCompany.trim()) errs.contactCompany = "Company name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "A valid email address is required.";
    }
    if (!contactCountry) errs.contactCountry = "Contact country is required.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      if (!contactCompany) setContactCompany(company);
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as 1 | 2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Final Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent rejection for bot submissions

    if (!validateStep3()) return;

    setIsSubmitting(true);

    // Generate unique reference number: PMG-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const refCode = `PMG-${dateStr}-${randomHex}`;

    // Target markets rule: if empty, default to "Worldwide"
    const finalTargetMarkets = targetCountries.length > 0 ? targetCountries : ["Worldwide"];
    const finalLookingFor = lookingFor.map(o => (o === "Other" && otherLookingFor ? `Other (${otherLookingFor})` : o));

    const emailTo = "alex@devriessalesconsultancy.com";
    const emailSubject = `New Partner Market Global Opportunity: ${title} [${refCode}]`;

    let body = `NEW PARTNER MARKET GLOBAL OPPORTUNITY\n\n`;
    body += `Submission reference: ${refCode}\n`;
    body += `Submitted: ${new Date().toUTCString()}\n\n`;
    body += `OPPORTUNITY\n`;
    body += `Opportunity title: ${title}\n`;
    body += `Company or brand: ${company}\n`;
    body += `Company website: ${website || "Not provided"}\n`;
    body += `Country of origin: ${originCountry}\n`;
    body += `Opportunity type: ${opportunityType || "Not specified"}\n`;
    body += `Looking for: ${finalLookingFor.join(", ")}\n`;
    body += `Target countries: ${finalTargetMarkets.join(", ")}\n`;
    body += `Description:\n${description}\n\n`;
    body += `Current markets or track record: ${trackRecord || "Not provided"}\n`;
    body += `Additional information: ${additionalInfo || "Not provided"}\n\n`;
    body += `CONTACT\n`;
    body += `Name: ${contactName}\n`;
    body += `Job title: ${jobTitle || "Not provided"}\n`;
    body += `Company: ${contactCompany}\n`;
    body += `Email: ${email}\n`;
    body += `Telephone or WhatsApp: ${phone || "Not provided"}\n`;
    body += `Country: ${contactCountry}\n`;
    body += `Preferred contact method: ${preferredContact || "Not specified"}\n`;
    body += `Referring organisation: ${referringOrg || "Not provided"}\n\n`;
    body += `FILES\n`;
    body += `Images: ${images.length > 0 ? images.map(i => i.name).join(", ") : "None"}\n`;
    body += `Documents: ${documents.length > 0 ? documents.map(d => d.name).join(", ") : "None"}\n\n`;
    body += `PERMISSION\n`;
    body += `Submission permission accepted: Yes\n`;

    // Persist submission securely in localStorage architecture
    try {
      const existing = JSON.parse(localStorage.getItem("pmg_opportunity_submissions") || "[]");
      const record = {
        refCode,
        date: new Date().toISOString(),
        title,
        company,
        website,
        originCountry,
        description,
        lookingFor: finalLookingFor,
        targetCountries: finalTargetMarkets,
        opportunityType,
        trackRecord,
        additionalInfo,
        contactName,
        jobTitle,
        contactCompany,
        email,
        phone,
        contactCountry,
        preferredContact,
        referringOrg,
        images: images.map(i => i.name),
        documents: documents.map(d => d.name),
        status: "New"
      };
      existing.unshift(record);
      localStorage.setItem("pmg_opportunity_submissions", JSON.stringify(existing));
    } catch {
      // Local storage fallback
    }

    // Trigger mailto fallback for alex@devriessalesconsultancy.com
    const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setSubmittedRef(refCode);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  if (submittedRef) {
    return (
      <div className="inquiry-success-card" style={{ maxWidth: 700, margin: "40px auto", textAlign: "center" }}>
        <span className="success-icon" style={{ fontSize: "3rem", color: "var(--primary, #0f766e)" }}>✓</span>
        <h2 style={{ fontSize: "1.8rem", marginTop: 16 }}>Thank You for Your Submission</h2>
        <p style={{ color: "#475569", fontSize: "1.05rem", margin: "12px 0 24px 0" }}>
          Your opportunity has been sent to Partner Market Global for review. We will contact you if we require additional information.
        </p>

        <div style={{ background: "var(--soft-bg, #f8fafc)", padding: "20px", borderRadius: 10, border: "1px dashed var(--border, #cbd5e1)", display: "inline-block", margin: "0 auto 24px auto" }}>
          <span style={{ fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
            Your submission reference is:
          </span>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--primary, #0f766e)", marginTop: 6 }}>
            {submittedRef}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
          <Link href={`/${locale}`} className="btn btn-primary">
            Return to Homepage
          </Link>
          <Link href={`/${locale}/opportunities`} className="btn btn-line">
            Browse Opportunities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="submit-opportunity-form-wrap" style={{ maxWidth: 840, margin: "0 auto" }}>
      {/* Step Indicator */}
      <div className="step-progress-bar" style={{ display: "flex", justifyContent: "space-between", marginBottom: 32, position: "relative" }}>
        <div style={{
          position: "absolute",
          top: "16px",
          left: "15%",
          right: "15%",
          height: "2px",
          background: "var(--border, #e2e8f0)",
          zIndex: 1
        }} />
        {[
          { num: 1, label: "The Opportunity" },
          { num: 2, label: "Pictures & Docs" },
          { num: 3, label: "Contact Details" }
        ].map(s => (
          <div key={s.num} style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: step >= s.num ? "var(--primary, #0f766e)" : "#f1f5f9",
              color: step >= s.num ? "#ffffff" : "#64748b",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 8px auto",
              border: step === s.num ? "3px solid #99f6e4" : "none"
            }}>
              {s.num}
            </div>
            <span style={{ fontSize: "0.85rem", fontWeight: step === s.num ? 600 : 400, color: step === s.num ? "#0f172a" : "#64748b" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="inquiry-form" style={{ background: "var(--card-bg, #ffffff)", padding: 32, borderRadius: 12, border: "1px solid var(--border, #e2e8f0)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
        
        {/* Honeypot */}
        <input type="text" name="website_hp" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

        {/* STEP 1: THE OPPORTUNITY */}
        {step === 1 && (
          <div className="step-content">
            <h2 style={{ fontSize: "1.3rem", marginBottom: 20, borderBottom: "1px solid #f1f5f9", paddingBottom: 10 }}>
              Step 1: The Opportunity
            </h2>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Opportunity title <span style={{ color: "#e11d48" }}>*</span>
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Japanese food manufacturer seeking European distributors"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: errors.title ? "1px solid #e11d48" : "1px solid #cbd5e1" }}
              />
              <span style={{ fontSize: "0.8rem", color: "#64748b", marginTop: 4, display: "block" }}>Give the opportunity a clear, short title.</span>
              {errors.title && <span style={{ color: "#e11d48", fontSize: "0.8rem" }}>{errors.title}</span>}
            </div>

            <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                  Company or brand name <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Company / Brand name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: errors.company ? "1px solid #e11d48" : "1px solid #cbd5e1" }}
                />
                {errors.company && <span style={{ color: "#e11d48", fontSize: "0.8rem" }}>{errors.company}</span>}
              </div>

              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                  Company website
                </label>
                <input
                  type="url"
                  className="input-field"
                  placeholder="https://company.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: errors.website ? "1px solid #e11d48" : "1px solid #cbd5e1" }}
                />
                {errors.website && <span style={{ color: "#e11d48", fontSize: "0.8rem" }}>{errors.website}</span>}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Where is the company based? <span style={{ color: "#e11d48" }}>*</span>
              </label>
              <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <input
                  type="text"
                  placeholder="Search country..."
                  value={originSearch}
                  onChange={(e) => setOriginSearch(e.target.value)}
                  style={{ padding: "6px 12px", fontSize: "0.85rem", borderRadius: 6, border: "1px solid #cbd5e1", width: 180 }}
                />
              </div>
              <select
                className="input-field"
                value={originCountry}
                onChange={(e) => setOriginCountry(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: errors.originCountry ? "1px solid #e11d48" : "1px solid #cbd5e1" }}
              >
                {filteredOriginCountries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.originCountry && <span style={{ color: "#e11d48", fontSize: "0.8rem" }}>{errors.originCountry}</span>}
            </div>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Describe the opportunity <span style={{ color: "#e11d48" }}>*</span>
              </label>
              <textarea
                rows={5}
                className="input-field"
                placeholder="Tell us about the company, product or service, what makes it distinctive and why it may be interesting to potential partners."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: errors.description ? "1px solid #e11d48" : "1px solid #cbd5e1" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#64748b", marginTop: 4 }}>
                <span>Recommended minimum: 100 characters</span>
                <span>{description.length} characters</span>
              </div>
              {errors.description && <span style={{ color: "#e11d48", fontSize: "0.8rem" }}>{errors.description}</span>}
            </div>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                What are you looking for? <span style={{ color: "#e11d48" }}>*</span>
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8, marginTop: 8 }}>
                {LOOKING_FOR_OPTIONS.map(opt => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem", cursor: "pointer", background: lookingFor.includes(opt) ? "var(--soft-bg, #f0fdf4)" : "transparent", padding: "6px 10px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                    <input
                      type="checkbox"
                      checked={lookingFor.includes(opt)}
                      onChange={() => toggleLookingFor(opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {lookingFor.includes("Other") && (
                <input
                  type="text"
                  placeholder="Please specify other partner type..."
                  value={otherLookingFor}
                  onChange={(e) => setOtherLookingFor(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", marginTop: 10, borderRadius: 6, border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                />
              )}
              {errors.lookingFor && <span style={{ color: "#e11d48", fontSize: "0.8rem" }}>{errors.lookingFor}</span>}
            </div>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Which countries or regions are you targeting?
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                {QUICK_TARGET_REGIONS.map(reg => (
                  <button
                    key={reg}
                    type="button"
                    onClick={() => toggleTargetCountry(reg)}
                    style={{
                      padding: "4px 10px",
                      fontSize: "0.8rem",
                      borderRadius: 16,
                      border: "1px solid #cbd5e1",
                      background: targetCountries.includes(reg) ? "var(--primary, #0f766e)" : "#ffffff",
                      color: targetCountries.includes(reg) ? "#ffffff" : "#334155",
                      cursor: "pointer"
                    }}
                  >
                    {reg}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                <input
                  type="text"
                  placeholder="Filter country list..."
                  value={targetSearch}
                  onChange={(e) => setTargetSearch(e.target.value)}
                  style={{ padding: "6px 12px", fontSize: "0.85rem", borderRadius: 6, border: "1px solid #cbd5e1", width: 180 }}
                />
              </div>
              <select
                multiple
                size={4}
                className="input-field"
                value={targetCountries}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map(o => o.value);
                  setTargetCountries(selected);
                }}
                style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #cbd5e1" }}
              >
                {filteredTargetCountries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <span style={{ fontSize: "0.8rem", color: "#64748b", marginTop: 4, display: "block" }}>
                Leave blank if the opportunity is open worldwide. (Default: Worldwide)
              </span>
            </div>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Opportunity type
              </label>
              <select
                className="input-field"
                value={opportunityType}
                onChange={(e) => setOpportunityType(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid #cbd5e1" }}
              >
                <option value="">Select opportunity type</option>
                {OPPORTUNITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Current markets, customers or track record
              </label>
              <textarea
                rows={3}
                className="input-field"
                placeholder="For example: currently exporting to France and Spain, supplying major retailers, running pilot projects or already operating in selected markets."
                value={trackRecord}
                onChange={(e) => setTrackRecord(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid #cbd5e1" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Next Step →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PICTURES & DOCUMENTS */}
        {step === 2 && (
          <div className="step-content">
            <h2 style={{ fontSize: "1.3rem", marginBottom: 20, borderBottom: "1px solid #f1f5f9", paddingBottom: 10 }}>
              Step 2: Pictures & Information
            </h2>

            {/* Picture Upload */}
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Upload pictures (Optional)
              </label>
              <span style={{ fontSize: "0.85rem", color: "#64748b", display: "block", marginBottom: 8 }}>
                Upload product, service, packaging, facility or application images (JPG, JPEG, PNG, WebP — max 10MB per image).
              </span>
              <div style={{ border: "2px dashed #cbd5e1", borderRadius: 8, padding: 20, textAlign: "center", background: "#f8fafc", cursor: "pointer" }}>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  id="image-upload"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  style={{ display: "none" }}
                />
                <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                  <span style={{ fontSize: "1.8rem", display: "block", marginBottom: 4 }}>📷</span>
                  <strong style={{ color: "var(--primary, #0f766e)" }}>Click to browse</strong> or drag and drop image files here
                </label>
              </div>

              {images.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 12, marginTop: 12 }}>
                  {images.map(img => (
                    <div key={img.id} style={{ position: "relative", border: "1px solid #cbd5e1", borderRadius: 6, overflow: "hidden", height: 90 }}>
                      <img src={img.previewUrl || img.dataUrl} alt={img.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        style={{ position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer", fontSize: "0.75rem", lineHeight: "1" }}
                      >
                        ✕
                      </button>
                      <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "0.65rem", padding: "2px 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {img.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Document Upload */}
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Upload supporting documents (Optional)
              </label>
              <span style={{ fontSize: "0.85rem", color: "#64748b", display: "block", marginBottom: 8 }}>
                Upload catalogue, product sheet, presentation, or certification (PDF, DOC, DOCX, XLS, PPTX — max 20MB per file).
              </span>
              <div style={{ border: "2px dashed #cbd5e1", borderRadius: 8, padding: 20, textAlign: "center", background: "#f8fafc", cursor: "pointer" }}>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  id="doc-upload"
                  onChange={(e) => handleDocumentUpload(e.target.files)}
                  style={{ display: "none" }}
                />
                <label htmlFor="doc-upload" style={{ cursor: "pointer" }}>
                  <span style={{ fontSize: "1.8rem", display: "block", marginBottom: 4 }}>📄</span>
                  <strong style={{ color: "var(--primary, #0f766e)" }}>Click to browse</strong> or drag and drop document files here
                </label>
              </div>

              {documents.length > 0 && (
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                  {documents.map(doc => (
                    <div key={doc.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f1f5f9", padding: "6px 12px", borderRadius: 6, fontSize: "0.85rem" }}>
                      <span>📄 <strong>{doc.name}</strong> ({(doc.size / (1024 * 1024)).toFixed(2)} MB)</span>
                      <button
                        type="button"
                        onClick={() => removeDocument(doc.id)}
                        style={{ background: "none", border: "none", color: "#e11d48", cursor: "pointer", fontWeight: 600 }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Anything else we should know?
              </label>
              <textarea
                rows={3}
                className="input-field"
                placeholder="Add any relevant commercial information, certifications, minimum order quantities, pricing guidance, exclusivity options, timelines or other useful details."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid #cbd5e1" }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 24 }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.9rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={permission}
                  onChange={(e) => setPermission(e.target.checked)}
                  style={{ marginTop: 3 }}
                />
                <span>
                  I confirm that I am authorised to submit this information and that Partner Market Global may review and use the supplied text and images for evaluating and presenting this opportunity. See our <Link href={`/${locale}/privacy-policy`} style={{ textDecoration: "underline", color: "var(--primary)" }}>Privacy Policy</Link>. <span style={{ color: "#e11d48" }}>*</span>
                </span>
              </label>
              {errors.permission && <span style={{ color: "#e11d48", fontSize: "0.8rem", display: "block", marginTop: 4 }}>{errors.permission}</span>}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
              <button type="button" className="btn btn-line" onClick={handleBack}>
                ← Previous Step
              </button>
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Next Step →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT DETAILS */}
        {step === 3 && (
          <div className="step-content">
            <h2 style={{ fontSize: "1.3rem", marginBottom: 20, borderBottom: "1px solid #f1f5f9", paddingBottom: 10 }}>
              Step 3: Contact Details
            </h2>

            <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                  Contact name <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Your full name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: errors.contactName ? "1px solid #e11d48" : "1px solid #cbd5e1" }}
                />
                {errors.contactName && <span style={{ color: "#e11d48", fontSize: "0.8rem" }}>{errors.contactName}</span>}
              </div>

              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                  Job title
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Sales Director, Managing Director"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                />
              </div>
            </div>

            <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                  Company <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Your company name"
                  value={contactCompany}
                  onChange={(e) => setContactCompany(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: errors.contactCompany ? "1px solid #e11d48" : "1px solid #cbd5e1" }}
                />
                {errors.contactCompany && <span style={{ color: "#e11d48", fontSize: "0.8rem" }}>{errors.contactCompany}</span>}
              </div>

              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                  Email address <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: errors.email ? "1px solid #e11d48" : "1px solid #cbd5e1" }}
                />
                {errors.email && <span style={{ color: "#e11d48", fontSize: "0.8rem" }}>{errors.email}</span>}
              </div>
            </div>

            <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                  Telephone or WhatsApp number
                </label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="+31 555 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                  Contact country <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <select
                  className="input-field"
                  value={contactCountry}
                  onChange={(e) => setContactCountry(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: errors.contactCountry ? "1px solid #e11d48" : "1px solid #cbd5e1" }}
                >
                  {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.contactCountry && <span style={{ color: "#e11d48", fontSize: "0.8rem" }}>{errors.contactCountry}</span>}
              </div>
            </div>

            <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                  Preferred contact method
                </label>
                <select
                  className="input-field"
                  value={preferredContact}
                  onChange={(e) => setPreferredContact(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                >
                  <option value="Email">Email</option>
                  <option value="Telephone">Telephone</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                  Were you referred by a partner or organisation?
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. JIP Japan, trade association, consultant"
                  value={referringOrg}
                  onChange={(e) => setReferringOrg(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                />
              </div>
            </div>

            <div style={{ background: "var(--soft-bg, #f8fafc)", padding: 14, borderRadius: 8, fontSize: "0.85rem", color: "#64748b", marginBottom: 24, borderLeft: "3px solid var(--primary, #0f766e)" }}>
              By submitting this form, you agree that Partner Market Global may use the supplied information to review your opportunity and contact you about the submission. Please see our <Link href={`/${locale}/privacy-policy`} style={{ textDecoration: "underline", color: "var(--primary)" }}>Privacy Policy</Link> for details.
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
              <button type="button" className="btn btn-line" onClick={handleBack} disabled={isSubmitting}>
                ← Previous Step
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Opportunity"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
