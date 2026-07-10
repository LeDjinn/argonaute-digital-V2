# Handoff: Argonaute Digital — Consulting Website

## Overview
Premium, dark-themed consulting/marketing website for a senior full-stack engineering consultancy ("Argonaute Digital") targeting agencies, founders, and product teams internationally. Goal: communicate senior technical authority and drive discovery-call bookings. Visual direction inspired by Linear/Vercel/Stripe-style premium SaaS sites.

## About the Design Files
The `.dc.html` files in this bundle are **design references** — interactive HTML/CSS prototypes showing the intended look, copy, and behavior. They are NOT production code to copy verbatim. Your task is to **recreate these designs in the target codebase's actual environment** (e.g. Next.js/React, since the copy references a Next.js/TypeScript stack) using its existing component patterns, styling approach (Tailwind, CSS modules, styled-components, etc.), and conventions. If no framework exists yet, Next.js + TypeScript is the natural fit given the site's own positioning.

Each file is self-contained inline-styled HTML (no external CSS files, no JS framework) — treat all inline styles as the source of truth for exact values, then translate them into your codebase's styling system.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy, and layout are final/intentional. Recreate pixel-accurately using your codebase's own styling primitives — don't reinterpret the visual design, just re-implement it in your stack.

## Files
- `Homepage.dc.html` — full homepage (hero → audience cards → stats → problems → mid-CTA → offers/pricing → case studies preview → why-us → process → fit checklist → final CTA → footer)
- `Case Studies.dc.html` — case studies index (grid of 4 case cards)
- `Case Study Detail.dc.html` — single case study detail template (challenge/solution/outcome structure)
- `Contact.dc.html` — contact page with working form UI (client-side only; needs real submit handler)

## Screens / Views

### 1. Homepage (`Homepage.dc.html`)
Sticky nav → sections in this order:
1. **Hero** — availability badge, H1, subhead, byline ("Led by Timour Spiridonov…"), primary + secondary CTA buttons, a code-editor-style visual card (mocked `system-status.ts` file with syntax-highlighted colors), and a 3-column grid of "audience cards" (For Agencies / For Founders / For Product Teams).
2. **Stats bar** — 4-column stat grid (8+ years / 600+ pages / 3 continents / Direct delivery), bordered top+bottom.
3. **Problems I solve** — section label + H2, 3-column bordered grid of 6 problem statements (dot bullet + text).
4. **Mid CTA** — subtle bordered card, "Recognize your situation?" headline + copy + ghost button "Book a technical diagnosis".
5. **Offers / pricing** — section id="offers", 3 pricing cards (Production Readiness Audit €950 / Prototype to Production €3,000 / Agency Technical Partner €1,500/mo), each with title, price, description, bullet list of inclusions, CTA button.
6. **Case studies preview** — 2x2 grid of case cards (title, summary, tech tag chips), on a slightly different background (`#0c0c0e`) band.
7. **Why Argonaute** — 3-column bordered grid: "Systems over scripts", "AI-native, not AI-bolted-on", "Senior judgment, senior speed".
8. **Process** — id="process", 4-column numbered steps (Discovery/Architecture/Build/Ship & Support), on `#0c0c0e` band.
9. **Fit** — 2-column "This is for" (green checks) vs "This is not for" (gray x's) lists.
10. **Final CTA** — large bordered/gradient card, headline + copy + two buttons (primary "Book a discovery call", ghost "View case studies").
11. **Footer** — 4-column (brand blurb / nav links / services list / contact info), bottom bar with copyright + availability note.

### 2. Case Studies index (`Case Studies.dc.html`)
Nav (same as homepage) → header (label + H1 + subhead) → 2-column grid of case cards, each with tag label, impact metric, title, summary, tech stack chips. Footer with back-link.

### 3. Case Study Detail (`Case Study Detail.dc.html`)
Nav → back link → tag label, H1, subhead, 3-column meta row (Client/Role/Timeline) → Challenge / Solution (with tech chips) / Outcome (3 stat cards + closing paragraph) sections → closing CTA card → footer.

### 4. Contact (`Contact.dc.html`)
Nav → 2-column layout: left = heading, copy, contact info list (email/location/response time); right = form (Name, Work email, Company, Engagement type select, Project details textarea, Submit button) with a client-side "submitted" success state swap. **The submit handler currently only sets local state — wire it to your real backend/email service (e.g. a serverless function, Resend, or a form service).**

## Design Tokens

**Colors**
- Background (base): `#0a0a0b`
- Background (elevated/alt band): `#0c0c0e`
- Card background: `#111113` (hover: `#151517`)
- Card background (subtle/inset): `#0e0e10`
- Border (default): `rgba(255,255,255,0.09)` – `rgba(255,255,255,0.12)`
- Border (hover): `rgba(255,255,255,0.16)` – `rgba(255,255,255,0.28)`
- Text primary: `#f2f2f1`
- Text secondary: `#9a9a9a`
- Text tertiary/muted: `#6c6c70` / `#7d7d82`
- Text body (paragraph, slightly brighter than secondary): `#d4d4d3` / `#c8c8c7`
- Accent (indigo, links/labels/icons): `#6366f1`
- Accent (success/green, status dot, good-fit checks, impact metrics): `#6ee7a7`
- Code syntax colors (hero visual only): keyword `#c586c0`, variable `#9cdcfe`, string `#ce9178`, comment `#6c6c70`

**Typography**
- UI/body font: **Inter** (400/500/600/700/800), Google Fonts
- Mono/label font: **IBM Plex Mono** (400/500), Google Fonts — used for eyebrow labels, badges, code visual, tag chips, stat captions
- H1 (hero): 54–56px / weight 700 / letter-spacing -0.02em / line-height ~1.08
- H2 (section): 36px / weight 700 / letter-spacing -0.015em
- Body: 14–17.5px / color secondary, line-height 1.6–1.75
- Eyebrow/section label: 12px, IBM Plex Mono, letter-spacing 0.08em, accent color, uppercase

**Spacing / Layout**
- Max content width: 1160px, centered, 48px side padding
- Section vertical padding: typically 120px top/bottom (96–140px on some pages)
- Card padding: 28–32px (offer cards 32px, small cards 20–22px)
- Grid gaps: 16–24px typical; 1px "hairline grid" pattern for bordered card grids (background color forms the divider lines)

**Radius**
- Buttons: 8–9px
- Cards: 12–16px
- Pills/badges: 100px (full pill)

**Shadows**
- Hero visual card: `0 40px 80px -30px rgba(0,0,0,0.6)`

**Buttons**
- Primary: solid `#f2f2f1` bg, `#0a0a0b` text, weight 600, hover bg `#e5e5e4`
- Ghost/secondary: transparent bg, 1px border `rgba(255,255,255,0.14)`, hover border `rgba(255,255,255,0.28)` + faint bg tint

## Interactions & Behavior
- Nav links to `#offers`, `#process` are same-page anchor scrolls; `Case Studies.dc.html` / `Contact.dc.html` are page navigations — map to real routes (e.g. `/case-studies`, `/contact`) in your app.
- Card/link hover: border-color brightens (see tokens above); ghost buttons get a subtle background tint on hover.
- Hero status dot uses a 2s pulse opacity animation (`@keyframes pulse`).
- Contact form: controlled inputs, single `submitted` boolean state that swaps the form for a success message on submit (currently no real network call — needs backend wiring).
- No page-load or scroll animations elsewhere — deliberately minimal motion per the brand's "no unnecessary animation" direction.

## Assets
No images/icons/logos used — the "logo" is a plain 26×26px rounded square with "A/" text (IBM Plex Mono) as a wordmark placeholder. All visual interest comes from typography, borders, and the one code-editor mockup card (built from styled divs, not a screenshot). If a real brand mark exists, swap it in place of the "A/" mark.

## Copy Notes
- Brand name used throughout: "Argonaute Digital". Founder name used in hero byline: "Timour Spiridonov" — confirm/replace with real name if different.
- Case study content (titles, summaries, tags, the one detailed case study) is **anonymized/placeholder** pending real client project write-ups — flag this to the site owner before shipping live.
- Testimonial section referenced in earlier iterations was a placeholder block and may not be in the final homepage cut — check `Homepage.dc.html` directly for the current section list (see Screens above, which reflects the latest version).
- Pricing (€950 / €3,000 / €1,500 per month) is live copy, not placeholder — confirm before launch if these are still accurate.
