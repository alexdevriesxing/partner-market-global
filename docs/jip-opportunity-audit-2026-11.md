# JIP Opportunity Audit — November 2026

Audit date: 15 November 2026. Scope: repository `alexdevriesxing/partner-market-global` (HEAD `4023fc8`) and live page `https://www.partnermarketglobal.com/en/japan/`.

## 1. Baseline

- Live Japan hub: 20 active opportunity links (matches brief). Live slugs found: air-twokyo, celeble, do-best, ebara-foods, ebisu-shiryo, eiwa, field-club, fujichiku-fujiaya-beef, ichiban-ken, imai, izutsu-yatsuhashi, kadoya, nippon-career, nittoh, nose-shuzo, okayama-tenobe-somen, sonic-friends, tsubame, u-technologies-unagi, yachiyo.
- Repo sources: `lib/jip-opportunities.json` (15 records), plus hand-built records in `lib/data.ts` (Eiwa, Kadoya, Celeblé, Izutsu, Tsubame, Nippon Career, etc.). No hidden/archived/draft flag exists in the data model today.
- Stack: Next.js static export (`output: "export"`), next-intl (13 locales: ar, de, en, es, fr, hi, it, ja, ko, nl, pt, ru, zh), Cloudflare Pages deploy (`npm run deploy`), inquiry via `functions/api/inquiry.ts` and `components/InquiryForm.tsx`. No `.github` workflows present.

## 2. Candidate comparison

Searched repo (code, data, i18n messages, llms.txt) and live slugs for company, brand, product and Japanese/alternate spellings (STAYGOLD, BRAND REVALUE, BRING, Nishiki, konjac/konnyaku, SC MEAT, Asahi Seika, karinto, Awayuki, Nitto Shokuhin, TAMAYA, Heartdance, GOLDY, Ginza Natsuno, Thai-Nichi, natto, Masumura, Sanrio).

| # | Candidate | Match found | Classification |
|---|-----------|-------------|----------------|
| A | STAYGOLD | None | New — draft awaiting authorization |
| B | Nishiki Agricultural Processing | None | New — draft awaiting authorization |
| C | SC MEAT | None. Fujichiku is a separate legal entity; "Wagyu" appears only in Nippon Career slicer copy | New — blocked: export approvals/Halal certificates unverified |
| D | Asahi Seika | None | New — draft awaiting authorization |
| E | Awayuki / Nitto Shokuhin Kogyo | None | New — blocked: exact legal name unverified |
| F | TAMAYA / Heartdance | None | New — draft awaiting authorization |
| G | GOLDY | None | New — draft awaiting authorization |
| H | Ginza Natsuno | None | New — draft awaiting authorization |
| I | Thai-Nichi Enterprise | None | New — blocked: certifications/claims unverified |
| J | Masumura Doll | None | New — draft awaiting authorization |
| K | Sanrio licensed merchandise | Only as SONIC & FRIENDS × Sanrio collab content inside an existing listing; no standalone listing | Blocked: mandate validity and IP permission unconfirmed; excluded from production |
| — | Ebara Foods (existing) | `jip-ebara-foods-indonesia` | Existing entry to update (see §3) |

Result: 0 duplicates; 11 candidates not present on the site. None have been published, because the brief makes publication subject to source verification and authorization, and none has been confirmed.

## 3. Ebara Foods update — scope

Existing slug `ebara-foods-indonesia-distribution-noodle-partnership` is to be kept (the slug names Indonesia; a redirect would be needed to rename it). Places that still describe Indonesia/Bali as the active focus:

- `lib/jip-opportunities.json` (title, summary, marketRegions, keywords, image alt)
- `lib/data.ts` (Ebara record, target markets, SEO)
- `app/[locale]/opportunities/[slug]/page.tsx` (Ebara key-information box, "Market Rationale & Bali Launch Priority", "Illustrative Bali Partner Model", partner sections)
- `app/[locale]/japan/page.tsx` (EN and JA hub copy)
- `components/InquiryForm.tsx` (territory routing), `lib/category-pages.ts`
- `public/llms.txt`, `public/llms-full.txt`
- Locale message files where Ebara is referenced

Missing input: the JIP 29 Sep 2026 note only states that Indonesia sales are suspended and focus is Thailand, Malaysia and the Philippines. Partner profile, channels and any territory terms for those markets are not supplied, so they cannot be written without inventing them.

## 4. Open requirements before publishing any candidate

1. Written confirmation that commission agreements are in place (site policy) and publication is authorized, per candidate.
2. Source material beyond the email summaries (company profiles, product facts, legal names).
3. Verification items: SC MEAT export approvals and Halal certificates; exact legal name for Awayuki; Thai-Nichi certifications and permitted claims; Sanrio mandate status and IP permissions.
4. Image decisions: official supplier images vs. clearly-illustrative AI images for each listing.
