# Contrast MVP — Session Handoff & Continuation Guide
## What was built, what's working, what to do next

---

## Current State (as of this audit)

The backend pipeline is **fully functional**. Here's what runs when a user submits a URL:

```
URL submitted
    │
    ▼
/api/audit POST route (Next.js)
    │
    ├── Playwright (headless Chromium) visits the URL
    ├── Custom DOM evaluation script extracts:
    │     typography nodes, spacing values, colors, buttons
    ├── axe-core injected → WCAG violations returned
    ├── lib/detectors/ run on raw DOM data:
    │     typographyDrift.ts, spacingDrift.ts, colorDrift.ts, buttonDrift.ts
    ├── lib/gemini.ts → Top Fixes + Quick Wins via Gemini 1.5 Flash
    ├── lib/scoring.ts → weighted score 0–100
    └── Result stored in Vercel KV → returns { id, result }
```

Everything compiles. `npm run build`, `tsc --noEmit`, `npm run lint` all pass.

---

## Exact File Structure (current)

```
contrast/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                          ← Landing page
│   ├── globals.css                       ← Design tokens (DO NOT TOUCH)
│   │
│   ├── audit/
│   │   └── [id]/
│   │       ├── page.tsx                  ← Server component, fetches result
│   │       └── report/
│   │           └── page.tsx              ← Print/PDF view
│   │
│   └── api/
│       ├── audit/
│       │   ├── route.ts                  ← MAIN PIPELINE (Playwright + axe + Gemini)
│       │   └── [id]/
│       │       └── route.ts              ← GET stored result
│       └── og/
│           └── [id]/
│               └── route.tsx             ← OG image generation
│
├── components/
│   ├── landing/
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorks.tsx
│   │   └── RecentAudits.tsx
│   │
│   └── results/
│       ├── ResultsLayout.tsx             ← Main results wrapper
│       ├── ScoreHeader.tsx
│       ├── TopFixes.tsx                  ← Gemini AI output
│       ├── IssueList.tsx                 ← Paginated (10/page)
│       └── DesignSmells.tsx
│
├── lib/
│   ├── types.ts                          ← AuditResult, AuditIssue, AuditScores, DesignSmell
│   ├── audit.ts                          ← Orchestrator
│   ├── scoring.ts                        ← Weighted score engine
│   ├── gemini.ts                         ← Gemini 1.5 Flash integration
│   ├── storage.ts                        ← Vercel KV wrapper
│   │
│   └── detectors/
│       ├── typographyDrift.ts
│       ├── spacingDrift.ts
│       ├── colorDrift.ts
│       └── buttonDrift.ts
│
├── hooks/
│   ├── useAudit.ts
│   └── useCountUp.ts
│
├── constants/
│   └── index.ts
│
├── postcss.config.js                     ← Fixed (was .mjs — DO NOT change back)
└── tailwind.config.ts
```

---

## What MUST NOT be changed

| File | Why |
|---|---|
| `postcss.config.js` | HMR fix — changing back to .mjs breaks Tailwind in dev |
| `app/globals.css` | All design tokens live here — changing breaks the entire visual system |
| `lib/types.ts` | All components depend on these strict types — any change cascades |
| `app/api/audit/route.ts` | Core pipeline — only edit if you're adding a new check |

---

## Environment variables required

```bash
# .env.local
BROWSERLESS_TOKEN=          # browserless.io free tier (1,000 sessions/month)
GEMINI_API_KEY=             # Google AI Studio — Gemini 1.5 Flash (free)
NEXT_PUBLIC_URL=            # Your Vercel URL after first deploy
KV_REST_API_URL=            # Auto-added when you connect Vercel KV
KV_REST_API_TOKEN=          # Auto-added when you connect Vercel KV
```

To pull these locally after connecting Vercel KV:
```bash
vercel env pull .env.local
```

---

## Known working commands

```bash
npm run dev          # Local dev server
npm run build        # Production build (passes cleanly)
npm run lint         # ESLint (passes cleanly)
npx tsc --noEmit     # Type check (passes cleanly)
```

---

## What's NOT done yet (next priorities)

### Priority 1 — OG image (`app/api/og/[id]/route.tsx`)
The route exists but may not be rendering the Instrument Serif font correctly.
Fix needed:
```tsx
// Fetch the font binary and pass it to ImageResponse
const fontData = await fetch(
  'https://fonts.gstatic.com/s/instrumentserif/v1/NaPPcN3hM_cm33FMuNpRZ1qUMhno.woff'
).then(r => r.arrayBuffer())

return new ImageResponse(<YourOGComponent />, {
  width: 1200, height: 630,
  fonts: [{ name: 'Instrument Serif', data: fontData, style: 'italic' }]
})
```

### Priority 2 — Share button (copy to clipboard)
In `ScoreHeader.tsx`, the Share button likely has no handler yet.
```tsx
async function handleShare() {
  const url = `${process.env.NEXT_PUBLIC_URL}/audit/${auditId}`
  await navigator.clipboard.writeText(url)
  setCopied(true)
  setTimeout(() => setCopied(false), 2000)
}
// Button label: copied ? 'Copied!' : 'Share'
```

### Priority 3 — PDF download (print route)
`/audit/[id]/report` exists. Add a window.print() trigger:
```tsx
// In the report page, add:
<button onClick={() => window.print()} className="print:hidden">
  Download PDF
</button>
```
And add print CSS in globals.css:
```css
@media print {
  .print\:hidden { display: none !important; }
  nav, footer, .score-actions { display: none; }
  body { background: white; color: black; }
}
```

### Priority 4 — Rate limiting
Currently done in-memory (resets on cold start). For production:
```ts
// In app/api/audit/route.ts, replace in-memory Map with:
const key = `rate:${ip}`
const calls = await kv.incr(key)
if (calls === 1) await kv.expire(key, 3600) // 1 hour window
if (calls > 10) return NextResponse.json({ error: '...' }, { status: 429 })
```

### Priority 5 — URL result caching
Prevent burning Browserless sessions on the same URL:
```ts
// Before running audit:
const urlKey = `url:${Buffer.from(url).toString('base64').slice(0,40)}`
const cached = await kv.get(urlKey)
if (cached) return NextResponse.json(cached)

// After audit completes:
await kv.set(urlKey, { id, result }, { ex: 86400 }) // 24h cache
```

### Priority 6 — Recent audits on landing page
`RecentAudits.tsx` is likely still hardcoded. Replace with:
```ts
// New route: app/api/recent/route.ts
// Stores last 10 audit IDs in KV as a list
// Landing page fetches this on server render
```

---

## Gemini prompt (current — in lib/gemini.ts)
Make sure your prompt ends with a strict JSON-only instruction:
```ts
const prompt = `
You are a senior UX accessibility expert.

Given these audit findings:
${JSON.stringify(issues, null, 2)}

Return ONLY a valid JSON object, no markdown, no explanation:
{
  "topFixes": [
    { "title": "string", "description": "string", "effort": "low|medium|high" }
  ],
  "quickWins": [
    { "title": "string", "description": "string" }
  ]
}
`
```
If Gemini returns markdown-fenced JSON, strip it before parsing:
```ts
const text = result.response.text()
const clean = text.replace(/```json|```/g, '').trim()
const parsed = JSON.parse(clean)
```

---

## Scoring weights (lib/scoring.ts)

Make sure these match what the UI shows:

```ts
export const WEIGHTS = {
  contrast:   0.40,   // WCAG contrast violations (axe-core)
  altText:    0.30,   // Missing alt attributes (axe-core)
  typography: 0.15,   // Font family count (typographyDrift)
  spacing:    0.15,   // Off-grid spacing (spacingDrift)
}
```

Grade thresholds:
```ts
export function getGrade(score: number) {
  if (score >= 90) return { label: 'Excellent', color: '#1A7A42' }
  if (score >= 70) return { label: 'Good',      color: '#8A5E00' }
  if (score >= 50) return { label: 'Needs work', color: '#CC4400' }
  return              { label: 'Critical',   color: '#B31B1B' }
}
```

---

## Deploy checklist (first deploy)

```bash
# 1. Push to GitHub
git add .
git commit -m "feat: functional MVP — Playwright + axe + Gemini pipeline"
git push origin main

# 2. Import to Vercel
# vercel.com → New Project → Import from GitHub

# 3. Add environment variables in Vercel dashboard:
#    BROWSERLESS_TOKEN, GEMINI_API_KEY, NEXT_PUBLIC_URL (add after first deploy)

# 4. Add Vercel KV:
#    Vercel Dashboard → Storage → Create KV Database → Connect to project
#    KV vars auto-inject into production

# 5. Run vercel env pull to sync locally
vercel env pull .env.local

# 6. Set NEXT_PUBLIC_URL to your live Vercel URL
# 7. Redeploy

# 8. Test these URLs manually:
#    / → landing page loads
#    POST /api/audit { url: "https://stripe.com" } → returns { id, result }
#    /audit/[returned-id] → results page renders with real data
#    /api/og/[id] → OG image renders
```

---

## What to tell the next Claude session

Paste this entire document at the start of the next session, then describe exactly what you want to fix or build. The most useful things to say:

- "The OG image route isn't rendering the font — fix it"
- "The Share button doesn't work — add clipboard copy"
- "Recent audits on the landing page are hardcoded — make them real"
- "Rate limiting resets on cold start — move it to Vercel KV"
- "Add a custom domain to Vercel"
- "Write the 5 LinkedIn posts for launch"

Do NOT say: "fix the whole thing" — be specific about one feature at a time.

---

## Browserless free tier — when you run out

Signs: audits return 500 errors, Browserless dashboard shows session count near 1,000.

Fix: Create a second Browserless account, add `BROWSERLESS_TOKEN_2` to Vercel env, then in `app/api/audit/route.ts`:
```ts
const tokens = [process.env.BROWSERLESS_TOKEN, process.env.BROWSERLESS_TOKEN_2].filter(Boolean) as string[]
const token = tokens[Date.now() % tokens.length]
```

---

*Last updated: Jun 2025 — Contrast v1 MVP*
