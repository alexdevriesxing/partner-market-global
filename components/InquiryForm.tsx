export function InquiryForm({ title = "Send a Qualified Inquiry" }: { title?: string }) {
  return (
    <form className="inquiry-form" id="inquiry">
      <div className="section-heading small">
        <h2>{title}</h2>
        <p>Tell us about your business and we will connect you with the right person.</p>
      </div>
      <div className="form-grid">
        <label>Full Name *<input name="name" placeholder="Your name" /></label>
        <label>Company *<input name="company" placeholder="Your company" /></label>
        <label>Email *<input type="email" name="email" placeholder="you@company.com" /></label>
        <label>Phone / WhatsApp *<input name="phone" placeholder="+31 555 123 4567" /></label>
        <label>Country *<select name="country"><option>Select country</option><option>Netherlands</option><option>Indonesia</option><option>Singapore</option></select></label>
        <label>Website<input name="website" placeholder="https://yourcompany.com" /></label>
        <label>Type of Partner *<select name="partnerType"><option>Select partner type</option><option>Importer</option><option>Distributor</option><option>Franchisee</option><option>Investor</option><option>Operator</option></select></label>
        <label>Current Business Activity *<input name="activity" placeholder="Tell us about your business" /></label>
        <label className="span-2">Existing Network / Channels *<input name="network" placeholder="Your network or channels" /></label>
        <label className="span-2">Why are you interested in this opportunity? *<textarea name="reason" placeholder="Your message" /></label>
        <label className="span-2">Can you meet the minimum requirements? *<select name="requirements"><option>Select</option><option>Yes</option><option>Need to discuss</option><option>No</option></select></label>
      </div>
      <label className="consent"><input type="checkbox" /> I confirm that I have read and agree to the Privacy Policy and consent to sharing my inquiry with the opportunity owner.</label>
      <button className="btn btn-primary form-submit" type="button">Submit Inquiry</button>
      <p className="form-disclaimer">We respect your privacy. No spam. Unsubscribe anytime.</p>
    </form>
  );
}
