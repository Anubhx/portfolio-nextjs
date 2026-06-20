# Product Requirements Document
## Design Audit Tool — "Contrast"
**Author:** Anubhav Raj  
**Version:** 1.0  
**Status:** Ready to Build  
**Last updated:** June 2025

---

## 1. Product Vision

> "Any designer should be able to paste a URL and know, in 10 seconds, whether their product is accessible — without needing to be an accessibility engineer."

**Contrast** is a free, public web tool that audits any live URL for design quality and accessibility compliance. It returns a scored, shareable report covering color contrast, typography consistency, alt text coverage, and spacing.

It is NOT a developer tool. It is NOT another Lighthouse clone. It is a designer-first instrument — the output is as carefully designed as the product it's auditing.

---

## 2. Problem Statement

### The core gap
Manual WCAG reviews are slow, require expertise, and are rarely done pre-launch. Paid tools (Siteimprove, Deque) are enterprise-priced. Free tools (axe, Lighthouse) output raw JSON or developer dashboards — unusable by most designers.

### Who suffers
- **Users with low vision or color blindness** using products with contrast ratios below 4.5:1
- **Junior designers** who don't know how to run accessibility checks
- **Startup teams** without a dedicated accessibility engineer

### Why now
AI-generated UIs are everywhere in 2025. Most of them fail basic accessibility checks. There is a real, growing need for a tool that catches this fast.

---

## 3. Target Users

| Persona | Description | Primary need |
|---|---|---|
| **Priya, Product Designer** | 2 yrs exp, works at a Series A startup | Quick pre-handoff check without slowing down her sprint |
| **Rahul, Indie Dev** | Builds tools solo, no design background | Know if his UI is embarrassing before he ships |
| **Ananya, UX Educator** | Teaches at a design bootcamp | Live demo tool that makes WCAG tangible for students |

---

## 4. Goals & Success Metrics

### Launch goals (first 30 days)
- [ ] 500 URLs audited
- [ ] 200 unique users
- [ ] 1 LinkedIn post with 10k+ impressions from the tool

### 90-day goals
- [ ] 2,000 audits/month
- [ ] Featured in at least 1 design newsletter (UX Collective, Sidebar.io)
- [ ] 50+ GitHub stars

### Anti-goals
- Not a full accessibility compliance platform
- Not a paid product (yet)
- Not a tool for developers — no raw JSON exports in V1

---

## 5. Scope

### V1 — Ship in 2 weeks

| Feature | Description | Priority |
|---|---|---|
| URL input | Single text field, validates URL format before submit | P0 |
| Page screenshot | Headless browser captures full-page screenshot | P0 |
| Color contrast audit | Checks all foreground/background text pairs against WCAG AA (4.5:1 normal, 3:1 large) | P0 |
| Alt text audit | Detects images missing alt attributes | P0 |
| Font count | Counts distinct font families loaded on the page | P0 |
| Score card | Single overall score (0–100) with 4 category subscores | P0 |
| Shareable result URL | Each audit gets a unique URL — `/audit/[id]` | P0 |
| Share card image | OG image of the score card for LinkedIn/Twitter sharing | P1 |
| PDF report download | One-page summary of findings | P1 |
| Audit history | Last 5 audits stored in localStorage | P2 |

### V2 — After first 100 users give feedback

| Feature | Description |
|---|---|
| AI fix suggestions | Gemini 1.5 Flash reads the screenshot + findings and writes plain-English fixes |
| Button tap target audit | Flags interactive elements smaller than 44×44px |
| Spacing grid check | Detects off-grid spacing values |
| Compare mode | Audit two URLs side by side |
| Email digest | Weekly re-scan of saved URLs |

### Out of scope (V1 + V2)
- Browser extension
- Figma plugin
- Authentication / accounts
- Bulk URL upload
- API access

---

## 6. User Flow

```
[Landing page]
     │
     ▼
[User pastes URL + clicks Audit]
     │
     ▼
[Loading state — animated progress steps]
"Taking a screenshot..."
"Checking contrast ratios..."
"Scanning for missing alt text..."
"Calculating your score..."
     │
     ▼
[Results page — /audit/[id]]
     │
     ├── Score header (big number, overall grade)
     ├── 4 category score cards
     ├── Issues list (sorted by severity)
     ├── Screenshot with annotations
     └── Share + Download buttons
```

---

## 7. Audit Logic

### Color contrast
- Extract all text nodes and their computed `color` and `background-color`
- Calculate contrast ratio using WCAG formula
- Flag anything below 4.5:1 (normal text) or 3:1 (large text ≥18pt / bold ≥14pt)
- Score: `(passing pairs / total pairs) × 100`

### Alt text
- Find all `<img>` elements
- Check for non-empty `alt` attribute
- Exclude decorative images where `alt=""` is correct (role="presentation")
- Score: `(images with meaningful alt / total meaningful images) × 100`

### Typography
- Extract all `font-family` values from computed styles
- Count distinct families
- Score: 100 if ≤2 families, −20 for each additional family beyond 2
- Flag if system font stack is not used as fallback

### Spacing consistency
- Sample 20 random block elements
- Check margin/padding values against 8px grid (multiples of 4 or 8)
- Score: `(on-grid values / total values) × 100`

### Overall score
```
Overall = (contrast × 0.4) + (alt_text × 0.3) + (typography × 0.15) + (spacing × 0.15)
```
Contrast weighted highest — it's the most user-impacting issue.

### Grade thresholds
| Score | Grade | Color |
|---|---|---|
| 90–100 | Excellent | #3DB87A |
| 70–89 | Good | #F5A623 |
| 50–69 | Needs work | #E8622A |
| 0–49 | Critical | #D93025 |

---

## 8. Technical Architecture

### Stack
```
Frontend        Next.js 14 (App Router) + TypeScript
Styling         Tailwind CSS v3 (utility) + CSS custom properties (design tokens)
Animation       Framer Motion (loading states, result reveal only)
AI layer        Google Gemini 1.5 Flash API (free tier) — V2 fix suggestions
Audit engine    Playwright (headless Chromium) — runs as separate service
WCAG checks     axe-core (injected into Playwright page)
Color math      color.js
OG images       @vercel/og (satori)
Database        Vercel KV (Redis) — stores audit results by ID
Deployment      Vercel (frontend + API routes) — free tier
```

### Architecture diagram
```
User Browser
     │  POST /api/audit { url }
     ▼
Next.js API Route (Vercel serverless)
     │
     ├── Validates URL
     ├── Calls Playwright service → screenshot + DOM data
     ├── Runs axe-core via Playwright
     ├── Runs color.js contrast calculations
     ├── Calculates scores
     ├── Stores result in Vercel KV
     └── Returns { auditId, scores, issues, screenshotUrl }
     │
     ▼
Results page renders from auditId
```

### Why not run Playwright on Vercel directly?
Vercel serverless functions have a 50MB limit. Playwright + Chromium is ~350MB. Options:
1. **Recommended for V1:** Use `browserless.io` free tier (1,000 sessions/month) — they host the browser, you call their API
2. **Alternative:** Railway free tier with a Playwright Docker container

### API routes
```
POST /api/audit          Trigger new audit, returns auditId
GET  /api/audit/[id]     Fetch stored audit result
GET  /api/og/[id]        Returns OG image for sharing
```

### Environment variables
```
GEMINI_API_KEY=          Google AI Studio free key
BROWSERLESS_TOKEN=       browserless.io free tier token
KV_REST_API_URL=         Vercel KV (auto-set when you add KV in Vercel dashboard)
KV_REST_API_TOKEN=       Vercel KV (auto-set)
```

---

## 9. Pages & Components

### Pages
| Route | Purpose |
|---|---|
| `/` | Landing — URL input, hero, example audit cards |
| `/audit/[id]` | Results page for a specific audit |
| `/audit/[id]/report` | Printable PDF version |
| `/about` | What it checks and why it matters |

### Core components
```
<AuditInput />           URL field with validation and submit
<LoadingSequence />      Animated steps during audit (Framer Motion)
<ScoreRing />            Circular score display (SVG, animated fill)
<CategoryCard />         Individual metric score with icon + breakdown
<IssueList />            Sorted list of findings with severity badges
<ScreenshotViewer />     Page screenshot with annotation overlays
<ShareCard />            Pre-formatted card for LinkedIn sharing
```

---

## 10. Error States

| Error | Message shown to user |
|---|---|
| Invalid URL | "That doesn't look like a valid URL. Try including https://" |
| Page not reachable | "We couldn't load that page. Is it publicly accessible?" |
| Page requires login | "This page might be behind a login wall — we can only audit public pages" |
| Audit takes too long | "This page is taking longer than usual. We'll keep trying..." (with cancel) |
| Gemini API limit hit | "AI suggestions are resting — the audit scores are still accurate" |
| Generic failure | "Something went wrong on our end. Your URL has been saved — try again in a moment." |

---

## 11. Non-functional Requirements

- **Performance:** Audit should complete in under 15 seconds for 90% of pages
- **Accessibility:** The tool itself must score 90+ on its own audit (dogfood test)
- **Mobile:** Results page fully readable on 375px viewport
- **SEO:** Each audit result page is server-rendered and shareable
- **Rate limiting:** Max 10 audits per IP per hour (prevent abuse on free tier)
- **Privacy:** URLs are stored to generate the shareable link but no user data is collected

---

## 12. Launch Checklist

- [ ] Tool audits its own homepage and gets 90+
- [ ] Share card generates correctly for LinkedIn preview
- [ ] PDF report downloads without errors
- [ ] Rate limiting is working
- [ ] Error states all handled gracefully
- [ ] Mobile view tested on real device
- [ ] OG metadata on all pages
- [ ] Google Analytics or Plausible added
- [ ] robots.txt configured
- [ ] Custom domain set up (audit.anubhxv.design or similar)

---

*This document is a living spec. Update it as V1 ships and user feedback comes in.*
