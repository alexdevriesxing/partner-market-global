import { sendNotificationEmail, MailerEnv } from "../lib/mailer";

interface EventContext {
  request: Request;
  env: MailerEnv & {
    TURNSTILE_SECRET_KEY?: string;
  };
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  const { request, env } = context;

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

  // Honeypot check
  if (body.hp_website || body.honeypot) {
    return new Response(JSON.stringify({ success: true, referenceId: "PMG-SUB-FILTERED" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Turnstile check
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
      console.warn("Turnstile check error:", err);
    }
  }

  // Validation
  const title = (body.title || "").trim();
  const company = (body.company || "").trim();
  const originCountry = (body.originCountry || "").trim();
  const description = (body.description || "").trim();
  const contactName = (body.contactName || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const contactCompany = (body.contactCompany || company).trim();

  if (!title) {
    return new Response(JSON.stringify({ error: "Opportunity title is required." }), { status: 400 });
  }
  if (!company) {
    return new Response(JSON.stringify({ error: "Company or brand name is required." }), { status: 400 });
  }
  if (!originCountry) {
    return new Response(JSON.stringify({ error: "Country of origin is required." }), { status: 400 });
  }
  if (!description || description.length < 30) {
    return new Response(JSON.stringify({ error: "Detailed opportunity description is required." }), { status: 400 });
  }
  if (!contactName) {
    return new Response(JSON.stringify({ error: "Contact name is required." }), { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Valid contact email is required." }), { status: 400 });
  }

  // Generate reference ID
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
  const referenceId = `PMG-SUB-${dateStr}-${randomHex}`;

  const emailSubject = `[PMG New Opportunity Submission] ${title} — ${company} [${referenceId}]`;

  const targetCountries = Array.isArray(body.targetCountries) ? body.targetCountries.join(", ") : (body.targetCountries || "Worldwide");
  const lookingFor = Array.isArray(body.lookingFor) ? body.lookingFor.join(", ") : (body.lookingFor || "Distributors / Partners");

  let textBody = `NEW OPPORTUNITY LISTING SUBMISSION — PARTNER MARKET GLOBAL\n`;
  textBody += `===========================================================\n\n`;
  textBody += `Reference ID: ${referenceId}\n`;
  textBody += `Timestamp: ${new Date().toUTCString()}\n\n`;
  textBody += `OPPORTUNITY SPECIFICATION:\n`;
  textBody += `- Title: ${title}\n`;
  textBody += `- Company / Brand: ${company}\n`;
  textBody += `- Website: ${body.website || "Not provided"}\n`;
  textBody += `- Origin Country: ${originCountry}\n`;
  textBody += `- Opportunity Type: ${body.opportunityType || "Distribution / Commercial"}\n`;
  textBody += `- Looking For: ${lookingFor}\n`;
  textBody += `- Target Markets: ${targetCountries}\n`;
  textBody += `- Current Track Record / Markets: ${body.trackRecord || "Not provided"}\n\n`;
  textBody += `FULL DESCRIPTION:\n${description}\n\n`;
  if (body.additionalInfo) {
    textBody += `ADDITIONAL COMMERCIAL INFORMATION:\n${body.additionalInfo}\n\n`;
  }
  textBody += `CONTACT DETAILS:\n`;
  textBody += `- Name: ${contactName}\n`;
  textBody += `- Job Title: ${body.jobTitle || "Not provided"}\n`;
  textBody += `- Company: ${contactCompany}\n`;
  textBody += `- Email: ${email}\n`;
  textBody += `- Phone / WhatsApp: ${phone || "Not provided"}\n`;
  textBody += `- Contact Country: ${body.contactCountry || originCountry}\n`;
  textBody += `- Preferred Contact Method: ${body.preferredContact || "Email"}\n`;
  textBody += `- Referring Organisation: ${body.referringOrg || "None"}\n`;

  if (Array.isArray(body.images) && body.images.length > 0) {
    textBody += `\nATTACHED IMAGES (${body.images.length}):\n`;
    body.images.forEach((img: any) => {
      textBody += `- ${typeof img === "string" ? img : img.name || "Image"}\n`;
    });
  }

  if (Array.isArray(body.documents) && body.documents.length > 0) {
    textBody += `\nATTACHED DOCUMENTS (${body.documents.length}):\n`;
    body.documents.forEach((doc: any) => {
      textBody += `- ${typeof doc === "string" ? doc : doc.name || "Document"}\n`;
    });
  }

  const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 20px; background: #f8fafc; }
  .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; }
  .header { background: #0f766e; color: #ffffff; padding: 24px; }
  .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
  .header p { margin: 0; font-size: 13px; color: #ccfbf1; }
  .content { padding: 24px; }
  .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
  th { text-align: left; padding: 8px 12px; background: #f1f5f9; font-size: 12px; color: #475569; width: 35%; border-bottom: 1px solid #e2e8f0; }
  td { padding: 8px 12px; font-size: 13px; color: #0f172a; border-bottom: 1px solid #e2e8f0; }
  .box { padding: 14px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 13px; white-space: pre-wrap; }
  .footer { padding: 16px 24px; background: #f8fafc; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Opportunity Submission</h1>
      <p>Partner Market Global Listing Application • Ref: <strong>${referenceId}</strong></p>
    </div>
    <div class="content">
      <div class="section-title">Opportunity Overview</div>
      <table>
        <tr><th>Opportunity Title</th><td><strong>${title}</strong></td></tr>
        <tr><th>Company / Brand</th><td><strong>${company}</strong></td></tr>
        <tr><th>Origin Country</th><td>${originCountry}</td></tr>
        <tr><th>Opportunity Type</th><td>${body.opportunityType || "Distribution"}</td></tr>
        <tr><th>Looking For</th><td><strong>${lookingFor}</strong></td></tr>
        <tr><th>Target Markets</th><td>${targetCountries}</td></tr>
        <tr><th>Company Website</th><td>${body.website ? `<a href="${body.website}" target="_blank">${body.website}</a>` : "Not provided"}</td></tr>
        <tr><th>Track Record</th><td>${body.trackRecord || "Not provided"}</td></tr>
      </table>

      <div class="section-title">Description</div>
      <div class="box">${description}</div>

      ${body.additionalInfo ? `
      <div class="section-title">Additional Information</div>
      <div class="box">${body.additionalInfo}</div>
      ` : ""}

      <div class="section-title">Principal Contact</div>
      <table>
        <tr><th>Contact Name</th><td><strong>${contactName}</strong></td></tr>
        <tr><th>Job Title</th><td>${body.jobTitle || "Not provided"}</td></tr>
        <tr><th>Company</th><td>${contactCompany}</td></tr>
        <tr><th>Email</th><td><a href="mailto:${email}">${email}</a></td></tr>
        <tr><th>Phone / WhatsApp</th><td>${phone || "Not provided"}</td></tr>
        <tr><th>Country</th><td>${body.contactCountry || originCountry}</td></tr>
        <tr><th>Preferred Contact</th><td>${body.preferredContact || "Email"}</td></tr>
        <tr><th>Referring Org</th><td>${body.referringOrg || "None"}</td></tr>
      </table>

      ${Array.isArray(body.documents) && body.documents.length > 0 ? `
      <div class="section-title">Declared Documents / Assets</div>
      <table>
        <tr><th>Documents (${body.documents.length})</th><td>${body.documents.map((d: any) => typeof d === "string" ? d : d.name).join(", ")}</td></tr>
      </table>
      ` : ""}
    </div>
    <div class="footer">
      Partner Market Global Curation & Review System.<br>
      To respond directly to the applicant, reply to this email (Reply-To: ${email}).
    </div>
  </div>
</body>
</html>
  `.trim();

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
      message: "Opportunity application submitted successfully.",
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
