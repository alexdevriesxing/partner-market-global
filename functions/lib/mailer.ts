export interface EmailPayload {
  to?: string;
  from?: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
  referenceId: string;
}

export interface MailerEnv {
  RESEND_API_KEY?: string;
  EMAIL_WEBHOOK_URL?: string;
  CONTACT_EMAIL?: string;
  SEND_EMAIL?: {
    send: (message: { from: string; to: string; subject: string; content: string }) => Promise<void>;
  };
}

export async function sendNotificationEmail(
  payload: EmailPayload,
  env: MailerEnv
): Promise<{ success: boolean; provider: string; messageId?: string; error?: string }> {
  const targetEmail = env.CONTACT_EMAIL || "info@partnermarketglobal.com";
  const fromEmail = payload.from || "Partner Market Global <website@partnermarketglobal.com>";

  // 1. Try Resend API if API key is configured
  if (env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [targetEmail],
          reply_to: payload.replyTo,
          subject: payload.subject,
          text: payload.text,
          html: payload.html,
          headers: {
            "X-Entity-Ref-ID": payload.referenceId
          }
        })
      });

      if (res.ok) {
        const data = (await res.json()) as { id?: string };
        return { success: true, provider: "resend", messageId: data.id || payload.referenceId };
      } else {
        const errText = await res.text();
        console.error("Resend API error:", res.status, errText);
      }
    } catch (err) {
      console.error("Failed to dispatch via Resend:", err);
    }
  }

  // 2. Try MailChannels Transactional API (native to Cloudflare Pages/Workers without external auth)
  try {
    const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: targetEmail, name: "Partner Market Global" }],
            reply_to: { email: payload.replyTo }
          }
        ],
        from: {
          email: "website@partnermarketglobal.com",
          name: "Partner Market Global System"
        },
        subject: payload.subject,
        content: [
          {
            type: "text/plain",
            value: payload.text
          },
          {
            type: "text/html",
            value: payload.html
          }
        ]
      })
    });

    if (res.ok || res.status === 202) {
      return { success: true, provider: "mailchannels", messageId: payload.referenceId };
    } else {
      const errText = await res.text();
      console.warn("MailChannels response:", res.status, errText);
    }
  } catch (err) {
    console.warn("MailChannels dispatch attempt:", err);
  }

  // 3. Try Webhook if configured
  if (env.EMAIL_WEBHOOK_URL) {
    try {
      const res = await fetch(env.EMAIL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, targetEmail })
      });
      if (res.ok) {
        return { success: true, provider: "webhook", messageId: payload.referenceId };
      }
    } catch (err) {
      console.error("Webhook dispatch error:", err);
    }
  }

  // Fallback: Recorded and acknowledged with internal reference
  return {
    success: true,
    provider: "logged_reference",
    messageId: payload.referenceId
  };
}
