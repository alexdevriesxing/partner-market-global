type InquiryFormProps = {
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

export function InquiryForm({
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
  return (
    <form className="inquiry-form" id="inquiry">
      <div className="section-heading small">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="form-grid">
        <label>{nameLabel}<input name="name" placeholder={namePlaceholder} /></label>
        <label>{companyLabel}<input name="company" placeholder={companyPlaceholder} /></label>
        <label>{emailLabel}<input type="email" name="email" placeholder={emailPlaceholder} /></label>
        <label>{phoneLabel}<input name="phone" placeholder={phonePlaceholder} /></label>
        <label>{countryLabel} *
          <select name="country">
            <option>{countryDefault}</option>
            <option>Netherlands</option>
            <option>Indonesia</option>
            <option>Singapore</option>
          </select>
        </label>
        <label>{websiteLabel}<input name="website" placeholder={websitePlaceholder} /></label>
        <label>{partnerTypeLabel}
          <select name="partnerType">
            <option>{partnerTypeDefault}</option>
            <option>Importer</option>
            <option>Distributor</option>
            <option>Franchisee</option>
            <option>Investor</option>
            <option>Operator</option>
          </select>
        </label>
        <label>{activityLabel}<input name="activity" placeholder={activityPlaceholder} /></label>
        <label className="span-2">{networkLabel}<input name="network" placeholder={networkPlaceholder} /></label>
        <label className="span-2">{reasonLabel}<textarea name="reason" placeholder={reasonPlaceholder} /></label>
        <label className="span-2">{requirementsLabel}
          <select name="requirements">
            <option>{requirementsDefault}</option>
            <option>{yesOption}</option>
            <option>{discussOption}</option>
            <option>{noOption}</option>
          </select>
        </label>
      </div>
      <label className="consent"><input type="checkbox" /> {consentText}</label>
      <button className="btn btn-primary form-submit" type="button">{submitLabel}</button>
      <p className="form-disclaimer">{disclaimer}</p>
    </form>
  );
}
