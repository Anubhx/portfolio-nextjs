# Environment Setup & Gotchas
## Contrast — Things that will break and how to fix them

---

## Accounts & keys checklist

| Service | Free tier limits | Where to get key | Env var name |
|---|---|---|---|
| Browserless.io | 1,000 sessions/month | browserless.io → API Keys | `BROWSERLESS_TOKEN` |
| Google AI Studio | 15 req/min, 1M tokens/day | aistudio.google.com → Get API Key | `GEMINI_API_KEY` |
| Vercel KV | 30MB storage, 30K cmds/month | Vercel Dashboard → Storage → Create KV | Auto-injected |
| Vercel (deploy) | 100GB bandwidth, 100 serverless fn hours | vercel.com | N/A |

All free tiers are sufficient for your first 500 users.

---

## `.env.local` (copy this exactly)

```bash
# Browserless — headless browser service
BROWSERLESS_TOKEN=your_token_here

# Google Gemini (free tier — 1.5 Flash model)
GEMINI_API_KEY=your_key_here

# Your deployed Vercel URL — update after first deploy
NEXT_PUBLIC_URL=https://contrast-audit.vercel.app

# Vercel KV — these get added automatically when you connect KV in dashboard
# Don't add these manually. Run: vercel env pull .env.local
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

**To pull Vercel env vars locally:**
```bash
npm i -g vercel
vercel login
vercel link        # links your local project to Vercel
vercel env pull    # writes KV vars to .env.local
```

---

## Vercel free tier: the one real problem

Vercel serverless functions on the free tier have a **10 second timeout**.

An audit can take 12–20 seconds (page load + scrape + calculation).

**Fix — use Vercel's streaming response:**

```ts
// app/api/audit/route.ts
export const maxDuration = 60  // Only works on Pro. On free tier, keep this off.

// Instead: break the audit into two steps
// Step 1: POST /api/audit → immediately returns { auditId, status: 'pending' }
//         Kicks off the audit as a background process (Vercel Edge Function or just accept the timeout risk)
// Step 2: Client polls GET /api/audit/[id] every 2s until status is 'complete'
```

**Simplest fix for free tier:** Use Browserless.io's built-in timeout of 8 seconds and return a partial result if needed. Most sites will audit in under 8 seconds.

```ts
// In browserless.ts, set aggressive timeout:
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 8000 })
// 'domcontentloaded' is faster than 'networkidle' — good enough for auditing
```

---

## Gotcha list — things you WILL hit

### 1. `rgba(0, 0, 0, 0)` backgrounds everywhere
Most elements have transparent backgrounds that inherit from a parent. If you compute contrast on these you'll get garbage results.

**Fix:** Walk up the DOM tree to find the first non-transparent background.
```ts
// In your browserless page.evaluate():
function getEffectiveBg(element) {
  let el = element
  while (el) {
    const bg = window.getComputedStyle(el).backgroundColor
    if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg
    el = el.parentElement
  }
  return 'rgb(255, 255, 255)' // assume white if nothing found
}
```

### 2. Browserless free tier: 1,000 sessions/month
At 1 session per audit, you get 1,000 audits/month. After launch, cache results aggressively in Vercel KV — if the same URL is audited twice within 24 hours, return the cached result.

```ts
// In /api/audit/route.ts, before triggering audit:
const cacheKey = `audit:url:${encodeURIComponent(url)}`
const cached = await kv.get(cacheKey)
if (cached) {
  return NextResponse.json(cached)
}
// ...run audit, then:
await kv.set(cacheKey, { id, result }, { ex: 60 * 60 * 24 }) // cache 24h
```

### 3. Vercel KV not working locally
The KV env vars don't exist until you run `vercel env pull`. Until then, use a simple in-memory Map for local dev:

```ts
// lib/storage.ts
const localCache = new Map()

export async function storeResult(id: string, result: any) {
  if (process.env.NODE_ENV === 'development') {
    localCache.set(`audit:${id}`, result)
    return
  }
  const { kv } = await import('@vercel/kv')
  await kv.set(`audit:${id}`, result, { ex: 60 * 60 * 24 * 30 })
}

export async function getResult(id: string) {
  if (process.env.NODE_ENV === 'development') {
    return localCache.get(`audit:${id}`)
  }
  const { kv } = await import('@vercel/kv')
  return kv.get(`audit:${id}`)
}
```

### 4. OG images cached forever
Once LinkedIn/Twitter scrapes your OG image, they cache it. If you redeploy with a new design, old shares still show the old image.

**Fix for launch:** Add a version suffix to your OG route: `/api/og/[id]?v=2`

Update the metadata generator when you change the OG design:
```ts
openGraph: {
  images: [`/api/og/${params.id}?v=2`],
}
```

### 5. `color.js` parsing failures
Some computed color values from the browser are unusual: `color-mix(in srgb, ...)`, custom properties that weren't resolved, etc. These will throw in color.js.

**Fix:** Always wrap color operations in try/catch and skip pairs you can't parse:
```ts
try {
  const ratio = getContrastRatio(pair.color, pair.background)
  // ...
} catch {
  continue // skip this pair, don't crash the audit
}
```

### 6. Font count inflated by CDN fonts
Google Fonts, icon fonts, and fallback stacks all get counted as separate font families. This makes the typography score misleadingly low.

**Fix:** Filter the list:
```ts
const ignoredFonts = [
  'Material Icons', 'Font Awesome', 'Remix Icon',
  'system-ui', '-apple-system', 'BlinkMacSystemFont',
  'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif',
  'Georgia', 'Times New Roman', 'serif',
  'Courier New', 'monospace'
]

const meaningfulFonts = fonts.filter(
  f => !ignoredFonts.some(ignored => f.toLowerCase().includes(ignored.toLowerCase()))
)
```

### 7. Next.js App Router + client components
The results page fetches data server-side (good for SEO) but the animated components need to be client components. You'll hit the "you cannot use hooks in a server component" error.

**Pattern to follow:**
```tsx
// app/audit/[id]/page.tsx — SERVER COMPONENT
import AuditResults from './AuditResults'  // client component

export default async function Page({ params }) {
  const result = await getResult(params.id)  // server-side fetch
  return <AuditResults result={result} />    // pass as prop
}

// app/audit/[id]/AuditResults.tsx — CLIENT COMPONENT
'use client'
import { motion } from 'framer-motion'
// all animations live here
```

### 8. Instrument Serif not loading on OG image
`@vercel/og` (satori) doesn't automatically use Google Fonts. You need to fetch and pass the font manually:

```tsx
// app/api/og/[id]/route.tsx
const fontData = await fetch(
  'https://fonts.gstatic.com/s/instrumentserif/v1/NaPPcN3hM_cm33FMuNpRZ1qUMhno.woff'
).then(r => r.arrayBuffer())

return new ImageResponse(
  <div>...</div>,
  {
    width: 1200,
    height: 630,
    fonts: [{ name: 'Instrument Serif', data: fontData, style: 'italic' }]
  }
)
```

---

## Testing locally without Browserless

When you're building the UI (Days 2–3), you don't need real audit data. Use this mock:

```ts
// lib/mockAudit.ts — only used in development
export const MOCK_RESULT = {
  id: 'mock123',
  url: 'stripe.com',
  auditedAt: new Date().toISOString(),
  scores: {
    contrast: 91,
    altText: 38,
    typography: 82,
    spacing: 88,
    overall: 74,
  },
  issues: [
    { severity: 'critical', category: 'altText', message: 'Image missing alt text', element: 'img.hero-image', value: 'missing' },
    { severity: 'critical', category: 'contrast', message: 'Low contrast text', element: '.footer p', value: '2.1:1' },
    { severity: 'warn', category: 'contrast', message: 'Low contrast text: "Learn more"', element: 'a.cta-link', value: '3.2:1' },
    { severity: 'warn', category: 'altText', message: 'Image missing alt text', element: 'img.team-photo', value: 'missing' },
    { severity: 'info', category: 'typography', message: '4 font families detected', element: 'body', value: '4' },
  ],
  screenshotUrl: null,
}
```

In your API route during development:
```ts
if (process.env.NODE_ENV === 'development') {
  await new Promise(r => setTimeout(r, 3000)) // simulate delay
  return NextResponse.json({ id: 'mock123', result: MOCK_RESULT })
}
```

---

## Pre-launch performance check

Run these commands before deploying:

```bash
# Check bundle size
npm run build
# Look for: "First Load JS" — should be under 200kB for the landing page

# Run Lighthouse on your own tool
# Open Chrome → DevTools → Lighthouse → Run on localhost:3000
# Target: Performance 90+, Accessibility 100, Best Practices 100

# Check your own audit score
# Go to your live URL, paste your own domain, aim for 90+
```

---

## Deployment commands

```bash
# First deploy
vercel

# All subsequent deploys (auto via GitHub push if you connect the repo)
git push origin main

# Preview deploy (for testing before going live)
vercel --preview

# Check function logs
vercel logs --follow
```

---

## When (not if) you hit Browserless rate limit

Sign up for a second Browserless account with a different email. Add the second token as `BROWSERLESS_TOKEN_2` and round-robin between them:

```ts
const tokens = [process.env.BROWSERLESS_TOKEN, process.env.BROWSERLESS_TOKEN_2].filter(Boolean)
const token = tokens[Math.floor(Math.random() * tokens.length)]
```

2,000 free sessions/month is enough for your first 1–2 months.
