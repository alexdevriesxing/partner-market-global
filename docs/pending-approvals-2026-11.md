# Pending Approvals & Blocked Assets — November 2026

Audit & build date: 15 November 2026.

## 1. Drafts in `lib/jip-new/` (Excluded from Production Build)

These 6 profiles are written, researched, and type-checked in `lib/jip-new/*.json`, but remain `status: "draft"` and are excluded from routes, sitemaps, and directories until their blockers are resolved:

| Key | Company | Blocker(s) |
|---|---|---|
| `nishiki-konjac` | Nishiki Agricultural Processing Co., Ltd. | Image generation quota exhausted (`gemini-3.1-flash-image` 429). Profile & certifications (FSSC 22000, ISO 22000, HACCP) verified. |
| `goldy-jewelry` | GOLDY Co., Ltd. | Image generation quota exhausted (`gemini-3.1-flash-image` 429). Company profile verified. |
| `ginza-natsuno-chopsticks` | Ginza Natsuno Co., Ltd. (`株式会社銀座夏野`) | Image generation quota exhausted (`gemini-3.1-flash-image` 429); registered English legal name and representative require direct confirmation from `会社概要`. |
| `masumura-doll-crafts` | Masumura Doll Co., Ltd. (`株式会社増村人形店`) | Image generation quota exhausted (`gemini-3.1-flash-image` 429). Company profile verified. |
| `sc-meat-wagyu` | SC MEAT Co., Ltd. | (1) Image generation quota exhausted; (2) Specific EU/Indonesia export establishment approvals and named Halal certifying body (e.g., JHA/NAHA/BPJPH recognition) unconfirmed from public sources. |
| `thai-nichi-ingredients` | Thai-Nichi Enterprise Co., Ltd. | (1) Image generation quota exhausted; (2) Specific Thai FDA / manufacturing certifications and permitted non-clinical claims for baby-food/supplement applications unconfirmed from public sources. |

## 2. Conditional Candidate — Excluded from Production

| Candidate | Source | Blocker |
|---|---|---|
| **Sanrio Licensed Merchandise** | JIP / Daiki Fukaura (14 Oct 2026) | Original offer had a short deadline; mandate validity, commercial authorization, IP permissions, and official approved imagery (no imitation Sanrio designs permitted) are unconfirmed. Excluded from production. |
