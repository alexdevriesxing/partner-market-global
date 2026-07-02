# Partner Market Global — Full Website Code Package

This is a complete, SEO/GAIO-optimized website starter for:

**https://www.partnermarketglobal.com**

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
npm run start
```

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

Recommended:

1. Push to GitHub
2. Connect repository to Cloudflare Pages or Vercel
3. Set custom domain to `www.partnermarketglobal.com`
4. Redirect root domain `partnermarketglobal.com` to `www.partnermarketglobal.com`
5. Verify canonical URLs and sitemap after deployment

## Notes

The visual assets in `public/assets` include optimized crops from the supplied mockup and a clean SVG logo. The code uses local assets only, so there are no external image dependencies.
