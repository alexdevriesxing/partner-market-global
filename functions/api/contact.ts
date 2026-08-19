import { sendNotificationEmail, MailerEnv } from "../lib/mailer";

interface EventContext {
  request: Request;
  env: MailerEnv;
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

  if (body.hp_website || body.honeypot) {
    return new Response(JSON.stringify({ success: true, referenceId: "PMG-CNT-FILTERED" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const company = (body.company || "").trim();
  const message = (body.message || body.reason || "").trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Valid email address is required." }), { status: 400 });
  }
  if (!name) {
    return new Response(JSON.stringify({ error: "Name is required." }), { status: 400 });
  }

  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
  const referenceId = `PMG-CNT-${dateStr}-${randomHex}`;

  const emailSubject = `[PMG Contact Inquiry] ${name} ${company ? `(${company})` : ""} [${referenceId}]`;

  const textBody = `NEW GENERAL CONTACT INQUIRY — PARTNER MARKET GLOBAL\n\nReference: ${referenceId}\nName: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nMessage:\n${message}\n\nIP Country: ${request.headers.get("CF-IPCountry") || "Unknown"}`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; color: #1e293b; padding: 20px; background: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 24px;">
    <h2 style="margin-top: 0; color: #0f172a;">New Contact Message (${referenceId})</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Company:</strong> ${company || "N/A"}</p>
    <p><strong>Message:</strong></p>
    <div style="padding: 12px; background: #f1f5f9; border-radius: 6px;">${message || "No message provided."}</div>
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
      message: "Message sent successfully.",
      provider: emailResult.provider
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
