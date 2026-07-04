# Partner Market Global — Full Website Code Package

This is a complete, SEO/GAIO-optimized website starter for:

**https://partner-market-global2.pages.dev**

It is built to match the supplied mockup style closely while providing a real scalable codebase.

## Included

- Next.js app router project
- TypeScript
- Tailwind configuration
- Custom CSS design system
- Mockup-matched homepage, opportunity detail page and company listing page
- Opportunity listing page
- Commercial terms page
- Curation process page
- About, contact, privacy policy and terms pages
- Admin dashboard mockup
- Local logo, PNG, SVG and WebP visual assets
- Extracted visual elements from the supplied mockup
- SEO metadata, canonicals and Open Graph setup
- Organization, WebSite, FAQ and Offer structured data
- Sitemap and robots routes
- Static `robots.txt`
- `llms.txt` for AI/answer-engine context
- Documentation in `/docs`

## Run locally

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Build

```bash
npm run build
```

The production build is exported to `out/` for Cloudflare Pages.

## Important files

- `app/page.tsx` — homepage
- `app/opportunities/page.tsx` — listing page
- `app/opportunities/[slug]/page.tsx` — opportunity detail page
- `app/list-your-opportunity/page.tsx` — lister landing page
- `lib/data.ts` — editable opportunity data
- `app/globals.css` — visual design system and micro animations
- `public/assets` — logo, mockup images and optimized assets
- `public/llms.txt` — AI/GAIO context file
- `docs/SEO_GAIO_STRATEGY.md` — SEO/GAIO plan

## Deployment

Cloudflare Pages:

1. Push to GitHub
2. Connect repository `alexdevriesxing/partner-market-global` to Cloudflare Pages project `partner-market-global2`
3. Set production branch to `master`
4. Set build command to `npm run build`
5. Set build output directory to `out`
6. Set Node version to `22.14.0` or let Cloudflare read `.nvmrc`
7. Verify `https://partner-market-global2.pages.dev/`, `/en/`, `/sitemap.xml` and `/robots.txt`

Direct deploy from this machine:

```bash
npm run deploy
```

Optional custom domain:

1. Set custom domain to `www.partnermarketglobal.com`
2. Redirect root domain `partnermarketglobal.com` to `www.partnermarketglobal.com`
3. Update `site.url` in `lib/data.ts` back to `https://www.partnermarketglobal.com`
4. Verify canonical URLs, sitemap and robots.txt after deployment

## Notes

The visual assets in `public/assets` include optimized crops from the supplied mockup and a clean SVG logo. The code uses local assets only, so there are no external image dependencies.
