interface EventContext {
  request: Request;
  next: () => Promise<Response>;
}

export async function onRequest(context: EventContext): Promise<Response> {
  const { request, next } = context;
  const url = new URL(request.url);

  // 1. Permanent 301 Redirect for Cloudflare Pages preview/staging hostname
  if (url.hostname.includes("partner-market-global2.pages.dev") || url.hostname === "partnermarketglobal.com") {
    url.hostname = "www.partnermarketglobal.com";
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }

  // 2. Redirect root / to /en/
  if (url.pathname === "/") {
    url.pathname = "/en/";
    return Response.redirect(url.toString(), 301);
  }

  const response = await next();

  // 3. Ensure essential security headers on all responses
  const headers = new Headers(response.headers);
  if (!headers.has("X-Content-Type-Options")) {
    headers.set("X-Content-Type-Options", "nosniff");
  }
  if (!headers.has("X-Frame-Options")) {
    headers.set("X-Frame-Options", "SAMEORIGIN");
  }
  if (!headers.has("Referrer-Policy")) {
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  }
  if (!headers.has("Permissions-Policy")) {
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
