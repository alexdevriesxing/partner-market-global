import { sendNotificationEmail, MailerEnv } from "../lib/mailer";

interface EventContext {
  request: Request;
  env: MailerEnv & {
    TURNSTILE_SECRET_KEY?: string;
  };
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  const { request, env } = context;

  // 1. CORS & Method validation
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", Allow: "POST" }
    });
  }

  let body: Record<string, any>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 2. Honeypot anti-spam check
  if (body.hp_website || body.honeypot) {
    return new Response(JSON.stringify({ success: true, referenceId: "PMG-INQ-FILTERED" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 3. Optional Turnstile validation
  if (body.turnstileToken && env.TURNSTILE_SECRET_KEY) {
    try {
      const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: body.turnstileToken,
          remoteip: request.headers.get("CF-Connecting-IP") || undefined
        })
      });
      const turnstileData = (await turnstileRes.json()) as { success: boolean };
      if (!turnstileData.success) {
        return new Response(JSON.stringify({ error: "Turnstile verification failed" }), {
          status: 403,
          headers: { "Content-Type": "application/json" }
        });
      }
    } catch (err) {
      console.warn("Turnstile verification error:", err);
    }
  }

  // 4. Input validation
  const email = (body.email || "").trim();
  const company = (body.company || "").trim();
  const contactName = (body.contactName || body.name || "").trim();
  const phone = (body.phone || "").trim();
  const country = (body.country || "").trim();
  const oppTitle = (body.opportunity || body.oppTitle || "General Inquiry").trim();
  const oppSlug = (body.oppSlug || "general").trim();
  const leadScore = typeof body.leadScore === "number" ? body.leadScore : 10;
  const priorityRating = body.priorityRating || (leadScore >= 45 ? "HIGH PRIORITY" : leadScore >= 25 ? "MEDIUM PRIORITY" : "STANDARD");

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Valid business email is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (!company) {
    return new Response(JSON.stringify({ error: "Company name is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (!contactName) {
    return new Response(JSON.stringify({ error: "Contact name is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 5. Generate Reference ID
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
  const referenceId = `PMG-INQ-${dateStr}-${randomHex}`;

  // 6. Format Subject & Body
  const isSonic = oppSlug === "sonic-friends-europe-2027" || oppTitle.includes("SONIC");
  const subjectPrefix = isSonic ? `[SONIC & FRIENDS 2027 ${priorityRating}]` : `[PMG Inquiry] [${priorityRating}]`;
  const emailSubject = `${subjectPrefix} ${company} — ${country} [${referenceId}]`;

  const prioritySignals = Array.isArray(body.prioritySignals) ? body.prioritySignals.join(" | ") : (body.prioritySignals || "N/A");

  let textBody = `NEW COMMERCIAL INQUIRY RECEIVED — PARTNER MARKET GLOBAL\n`;
  textBody += `=======================================================\n\n`;
  textBody += `Reference ID: ${referenceId}\n`;
  textBody += `Timestamp: ${new Date().toUTCString()}\n`;
  textBody += `Opportunity: ${oppTitle} (${oppSlug})\n`;
  textBody += `Lead Score: ${leadScore}/100 (${priorityRating})\n`;
  if (prioritySignals && prioritySignals !== "N/A") {
    textBody += `Priority Signals: ${prioritySignals}\n`;
  }
  textBody += `\nBUYER / APPLICANT CONTACT:\n`;
  textBody += `- Name: ${contactName}\n`;
  textBody += `- Job Title: ${body.jobTitle || "N/A"}\n`;
  textBody += `- Company: ${company}\n`;
  textBody += `- Email: ${email}\n`;
  textBody += `- Phone / WhatsApp: ${phone || "N/A"}\n`;
  textBody += `- Country: ${country}\n`;
  textBody += `- Website: ${body.website || "N/A"}\n`;
  textBody += `- Company Type: ${body.companyType || body.partnerType || "N/A"}\n`;

  if (body.activity) textBody += `- Current Business Activity: ${body.activity}\n`;
  if (body.network) textBody += `- Existing Channels / Network: ${body.network}\n`;
  if (body.reason) textBody += `- Reason for Interest: ${body.reason}\n`;
  if (body.requirements) textBody += `- Can Meet Minimum Requirements: ${body.requirements}\n`;

  if (body.sonicDetails) {
    const sd = body.sonicDetails;
    textBody += `\nSONIC & FRIENDS SPECIFIC QUALIFICATION:\n`;
    textBody += `- Product Lines: ${(sd.interests || []).join(", ") || "Full Assortment"}\n`;
    textBody += `- Countries Covered: ${sd.countriesCovered || country}\n`;
    textBody += `- Store Count: ${sd.storeCount || "N/A"}\n`;
    textBody += `- Annual Purchasing Volume: ${sd.annualPurchasingVolume || "N/A"}\n`;
    textBody += `- Existing Licensed Portfolio: ${sd.licensedPortfolio || "N/A"}\n`;
    textBody += `- Intended Retail Channels: ${sd.intendedChannels || "N/A"}\n`;
    textBody += `- Requested Actions: ${(sd.requests || []).join(", ") || "Line list & pricing"}\n`;
    if (sd.message) textBody += `- Buyer Message: ${sd.message}\n`;
  }

  textBody += `\nROUTING CONTEXT:\n`;
  textBody += `- Referring URL: ${body.referrer || "Direct"}\n`;
  textBody += `- IP Country: ${request.headers.get("CF-IPCountry") || "Unknown"}\n`;
  if (body.utmData && Object.keys(body.utmData).length > 0) {
    textBody += `- UTM Parameters: ${JSON.stringify(body.utmData)}\n`;
  }

  const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 20px; background: #f8fafc; }
  .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; }
  .header { background: #0f172a; color: #ffffff; padding: 24px; }
  .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
  .header p { margin: 0; font-size: 13px; color: #94a3b8; }
  .badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-top: 10px; background: ${leadScore >= 45 ? "#dc2626" : leadScore >= 25 ? "#d97706" : "#2563eb"}; color: #ffffff; }
  .content { padding: 24px; }
  .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
  th { text-align: left; padding: 8px 12px; background: #f1f5f9; font-size: 12px; color: #475569; width: 35%; border-bottom: 1px solid #e2e8f0; }
  td { padding: 8px 12px; font-size: 13px; color: #0f172a; border-bottom: 1px solid #e2e8f0; }
  .footer { padding: 16px 24px; background: #f8fafc; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Qualified Inquiry</h1>
      <p>Partner Market Global B2B Platform • Ref: <strong>${referenceId}</strong></p>
      <div class="badge">${priorityRating} (${leadScore}/100)</div>
    </div>
    <div class="content">
      <div class="section-title">Opportunity Details</div>
      <table>
        <tr><th>Opportunity</th><td><strong>${oppTitle}</strong></td></tr>
        <tr><th>Slug / ID</th><td>${oppSlug}</td></tr>
        <tr><th>Priority Signals</th><td>${prioritySignals}</td></tr>
      </table>

      <div class="section-title">Buyer / Inquirer Contact</div>
      <table>
        <tr><th>Full Name</th><td><strong>${contactName}</strong></td></tr>
        <tr><th>Job Title</th><td>${body.jobTitle || "N/A"}</td></tr>
        <tr><th>Company</th><td><strong>${company}</strong></td></tr>
        <tr><th>Business Email</th><td><a href="mailto:${email}">${email}</a></td></tr>
        <tr><th>Phone / WhatsApp</th><td>${phone || "N/A"}</td></tr>
        <tr><th>Country</th><td>${country}</td></tr>
        <tr><th>Website</th><td>${body.website ? `<a href="${body.website}" target="_blank">${body.website}</a>` : "N/A"}</td></tr>
        <tr><th>Partner Type</th><td>${body.companyType || body.partnerType || "N/A"}</td></tr>
      </table>

      ${body.sonicDetails ? `
      <div class="section-title">SONIC & FRIENDS 2027 Qualification</div>
      <table>
        <tr><th>Selected Lines</th><td><strong>${(body.sonicDetails.interests || []).join(", ") || "Full Assortment"}</strong></td></tr>
        <tr><th>Countries Covered</th><td>${body.sonicDetails.countriesCovered || country}</td></tr>
        <tr><th>Store Count</th><td>${body.sonicDetails.storeCount || "N/A"}</td></tr>
        <tr><th>Purchasing Volume</th><td>${body.sonicDetails.annualPurchasingVolume || "N/A"}</td></tr>
        <tr><th>Licensed Portfolio</th><td>${body.sonicDetails.licensedPortfolio || "N/A"}</td></tr>
        <tr><th>Target Channels</th><td>${body.sonicDetails.intendedChannels || "N/A"}</td></tr>
        <tr><th>Specific Requests</th><td><strong>${(body.sonicDetails.requests || []).join(", ") || "Pricing & Specs"}</strong></td></tr>
        ${body.sonicDetails.message ? `<tr><th>Buyer Note</th><td>${body.sonicDetails.message}</td></tr>` : ""}
      </table>
      ` : ""}

      ${body.reason ? `
      <div class="section-title">Message / Inquiry Details</div>
      <p style="padding: 12px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 13px;">${body.reason}</p>
      ` : ""}

      <div class="section-title">Audit & Traffic Metadata</div>
      <table>
        <tr><th>Referring Page</th><td>${body.referrer || "Direct"}</td></tr>
        <tr><th>IP Country</th><td>${request.headers.get("CF-IPCountry") || "Unknown"}</td></tr>
        <tr><th>User Agent</th><td>${request.headers.get("User-Agent") || "Unknown"}</td></tr>
      </table>
    </div>
    <div class="footer">
      This notification was generated automatically by the Partner Market Global serverless edge runtime.<br>
      To reply directly to the buyer, reply to this email (Reply-To: ${email}).
    </div>
  </div>
</body>
</html>
  `.trim();

  // 7. Dispatch Email
  const emailResult = await sendNotificationEmail(
    {
      replyTo: email,
      subject: emailSubject,
      text: textBody,
      html: htmlBody,
      referenceId
    },
    env
  );

  return new Response(
    JSON.stringify({
      success: true,
      referenceId,
      message: "Inquiry received successfully. Our team will review your application.",
      provider: emailResult.provider
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0"
      }
    }
  );
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}
