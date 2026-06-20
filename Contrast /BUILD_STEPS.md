# Build Steps — Contrast (Design Audit Tool)
## From zero to live URL in 14 days
**Stack:** Next.js 14 · TypeScript · Tailwind · Browserless.io · Vercel KV · Gemini API (free) · Vercel

---

## Before you start — accounts to create (all free)

| Service | Why | URL |
|---|---|---|
| Vercel | Deploy frontend + API routes | vercel.com |
| Browserless.io | Headless browser (Playwright in the cloud) | browserless.io — free tier: 1,000 sessions/month |
| Google AI Studio | Gemini API key (free) | aistudio.google.com |
| Vercel KV | Store audit results (Redis) | In your Vercel dashboard |

---

## Day 1 — Project setup

### 1.1 Create Next.js project

```bash
npx create-next-app@latest contrast --typescript --tailwind --app --no-src-dir
cd contrast
```

When prompted:
- App Router: **Yes**
- Import alias: **Yes, keep @/**

### 1.2 Install dependencies

```bash
npm install framer-motion color @vercel/kv @vercel/og
npm install -D @types/color
```

### 1.3 Add Google Fonts to layout

In `app/layout.tsx`:

```tsx
import { Inter } from 'next/font/google'

// Add these as regular <link> tags in your metadata or head
// Google Fonts: Instrument Serif + Inter + JetBrains Mono
```

Add to `app/layout.tsx` inside `<head>` via metadata or directly:

```tsx
export const metadata = {
  // ...
}

// In the layout JSX, add:
// <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

### 1.4 Set up design tokens

Create `app/globals.css` — replace Tailwind defaults with your token system from the design system doc. Paste in all CSS custom properties (dark + light mode).

### 1.5 Set up environment variables

Create `.env.local`:

```
BROWSERLESS_TOKEN=your_token_from_browserless_io
GEMINI_API_KEY=your_key_from_aistudio_google_com
KV_REST_API_URL=       # Added automatically when you connect Vercel KV
KV_REST_API_TOKEN=     # Added automatically when you connect Vercel KV
```

---

## Day 2 — Landing page UI

Build the page with NO backend logic yet. Use hardcoded data.

### 2.1 Create the landing page (`app/page.tsx`)

Build these sections in order:

**Nav:**
```tsx
// Logo: "Contrast" in Instrument Serif italic
// Right: GitHub link (plain text, no icon library needed)
// No hamburger, no dropdown, no mobile menu
```

**Hero:**
```tsx
// H1: "Audit any website's design in 10 seconds. Free."
// Left-aligned, NOT centered — this makes it feel like a tool, not a marketing page
// Below: single line "Checks contrast · alt text · typography · spacing"
```

**Audit input:**
```tsx
// Controlled input component
// Validate: must start with http:// or https://
// On submit: navigate to /audit/loading?url=... for now (you'll wire it up Day 4)
// The Audit button goes INSIDE the input field on the right
```

**Example cards:**
```tsx
// Hardcode 4 example audits: stripe.com (91), linear.app (87), zomato.com (63), swiggy.com (71)
// These link to /audit/[id] pages you'll build Day 3
// They exist so the page is not empty on launch
```

### 2.2 Tailwind config

In `tailwind.config.ts`, extend theme to map your CSS variables:

```js
extend: {
  fontFamily: {
    display: ['Instrument Serif', 'Georgia', 'serif'],
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },
  colors: {
    accent: 'var(--color-accent)',
    'grade-excellent': 'var(--color-grade-excellent)',
    'grade-good': 'var(--color-grade-good)',
    'grade-warn': 'var(--color-grade-warn)',
    'grade-critical': 'var(--color-grade-critical)',
  }
}
```

---

## Day 3 — Results page UI

Still no backend. Build with hardcoded mock data.

### 3.1 Create results page (`app/audit/[id]/page.tsx`)

```tsx
// Mock data for now:
const mockResult = {
  url: "stripe.com",
  auditedAt: new Date(),
  overallScore: 74,
  scores: {
    contrast: 91,
    altText: 38,
    typography: 82,
    spacing: 88,
  },
  issues: [
    { severity: 'critical', message: '.hero p contrast ratio 2.8:1', value: '2.8:1' },
    { severity: 'warn', message: '3 images missing alt text', value: '3' },
    { severity: 'info', message: '4 font families detected', value: '4' },
  ]
}
```

**Score Ring component (`components/ScoreRing.tsx`):**
```tsx
// SVG-based circular progress
// Animated with Framer Motion (stroke-dashoffset)
// Center: score number counts up from 0 (use useEffect + requestAnimationFrame)
// Color: derive from score using a helper function
```

Score color helper:
```ts
export function getGradeColor(score: number): string {
  if (score >= 90) return 'var(--color-grade-excellent)'
  if (score >= 70) return 'var(--color-grade-good)'
  if (score >= 50) return 'var(--color-grade-warn)'
  return 'var(--color-grade-critical)'
}
```

**CategoryCard component (`components/CategoryCard.tsx`):**
```tsx
// Props: label, score, issueCount
// Progress bar fill animated with Framer Motion
// Color derived from score
```

**IssueRow component (`components/IssueRow.tsx`):**
```tsx
// Props: severity ('critical' | 'warn' | 'info'), message, value
// Severity badge: border-only style (no fill), color maps to severity
// Value displayed in JetBrains Mono
```

**Loading sequence (`components/LoadingSequence.tsx`):**
```tsx
// 4 steps, staggered 300ms each appearing
// Uses Framer Motion AnimatePresence for step transitions
// Props: currentStep (0-3)
```

### 3.2 Check your work
At the end of Day 3 you should have:
- [ ] Landing page looks correct with no console errors
- [ ] Results page renders mock data correctly  
- [ ] Score ring animates when you visit the page
- [ ] Category cards stagger in on load
- [ ] No purple gradients, no emoji, no glow effects anywhere

---

## Day 4 — Audit API (the core engine)

This is the hardest day. Break it into small pieces.

### 4.1 Create the types file (`lib/types.ts`)

```ts
export type Severity = 'critical' | 'warn' | 'info'

export interface AuditIssue {
  severity: Severity
  category: 'contrast' | 'altText' | 'typography' | 'spacing'
  message: string
  element?: string  // CSS selector
  value?: string    // The actual measured value e.g. "2.8:1"
}

export interface AuditScores {
  contrast: number
  altText: number
  typography: number
  spacing: number
  overall: number
}

export interface AuditResult {
  id: string
  url: string
  auditedAt: string
  scores: AuditScores
  issues: AuditIssue[]
  screenshotUrl?: string
}
```

### 4.2 Create the audit engine (`lib/audit.ts`)

This file handles the logic of calling browserless.io and processing results.

```ts
// lib/audit.ts

export async function runAudit(url: string): Promise<AuditResult> {
  // Step 1: Call browserless.io to get page data
  const pageData = await scrapeWithBrowserless(url)
  
  // Step 2: Run each audit check
  const contrastResult = auditContrast(pageData.colorPairs)
  const altTextResult = auditAltText(pageData.images)
  const typographyResult = auditTypography(pageData.fonts)
  const spacingResult = auditSpacing(pageData.spacingValues)
  
  // Step 3: Calculate overall score
  const overall = Math.round(
    contrastResult.score * 0.4 +
    altTextResult.score * 0.3 +
    typographyResult.score * 0.15 +
    spacingResult.score * 0.15
  )
  
  return {
    id: generateId(),
    url,
    auditedAt: new Date().toISOString(),
    scores: {
      contrast: contrastResult.score,
      altText: altTextResult.score,
      typography: typographyResult.score,
      spacing: spacingResult.score,
      overall,
    },
    issues: [
      ...contrastResult.issues,
      ...altTextResult.issues,
      ...typographyResult.issues,
      ...spacingResult.issues,
    ].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
  }
}

const severityOrder = { critical: 0, warn: 1, info: 2 }
```

### 4.3 Browserless.io integration (`lib/browserless.ts`)

Sign up at browserless.io, get your token. Their API lets you send a Playwright script as a string:

```ts
export async function scrapeWithBrowserless(url: string) {
  const response = await fetch(
    `https://chrome.browserless.io/chromium/playwright?token=${process.env.BROWSERLESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: `
          // This code runs IN the browser at browserless.io
          export default async function({ page }) {
            await page.goto('${url}', { waitUntil: 'networkidle', timeout: 15000 });
            
            // Extract color pairs for contrast checking
            const colorPairs = await page.evaluate(() => {
              const pairs = []
              const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, span, li, button, label')
              elements.forEach(el => {
                const style = window.getComputedStyle(el)
                const bgStyle = window.getComputedStyle(el.parentElement || el)
                pairs.push({
                  selector: el.tagName.toLowerCase(),
                  color: style.color,
                  background: style.backgroundColor || bgStyle.backgroundColor,
                  fontSize: parseFloat(style.fontSize),
                  fontWeight: style.fontWeight,
                  text: el.textContent?.trim().slice(0, 50)
                })
              })
              return pairs.filter(p => p.color && p.background)
            })
            
            // Extract images
            const images = await page.evaluate(() => {
              return Array.from(document.querySelectorAll('img')).map(img => ({
                src: img.src,
                alt: img.alt,
                role: img.getAttribute('role'),
                hasAlt: img.hasAttribute('alt'),
                altIsEmpty: img.alt === '',
              }))
            })
            
            // Extract fonts
            const fonts = await page.evaluate(() => {
              const fontSet = new Set()
              document.querySelectorAll('*').forEach(el => {
                const ff = window.getComputedStyle(el).fontFamily
                if (ff) fontSet.add(ff.split(',')[0].trim().replace(/['"]/g, ''))
              })
              return Array.from(fontSet)
            })
            
            // Take screenshot
            const screenshot = await page.screenshot({ fullPage: false, type: 'jpeg', quality: 80 })
            
            return { colorPairs, images, fonts, screenshot: screenshot.toString('base64') }
          }
        `
      })
    }
  )
  
  if (!response.ok) throw new Error(`Browserless error: ${response.statusText}`)
  return response.json()
}
```

### 4.4 Contrast calculation (`lib/checks/contrast.ts`)

```ts
// Install: npm install color
import Color from 'color'

function getContrastRatio(color1: string, color2: string): number {
  try {
    const c1 = Color(color1).luminosity()
    const c2 = Color(color2).luminosity()
    const lighter = Math.max(c1, c2)
    const darker = Math.min(c1, c2)
    return (lighter + 0.05) / (darker + 0.05)
  } catch {
    return 21 // If we can't parse, assume it passes
  }
}

function isLargeText(fontSize: number, fontWeight: string): boolean {
  const weight = parseInt(fontWeight)
  return fontSize >= 18 || (fontSize >= 14 && weight >= 700)
}

export function auditContrast(colorPairs: any[]) {
  const issues = []
  let passing = 0
  let total = 0
  
  for (const pair of colorPairs) {
    if (!pair.color || !pair.background) continue
    if (pair.background === 'rgba(0, 0, 0, 0)') continue // transparent bg, skip
    
    const ratio = getContrastRatio(pair.color, pair.background)
    const required = isLargeText(pair.fontSize, pair.fontWeight) ? 3 : 4.5
    total++
    
    if (ratio >= required) {
      passing++
    } else {
      issues.push({
        severity: ratio < 2 ? 'critical' : 'warn' as const,
        category: 'contrast' as const,
        message: `Low contrast text${pair.text ? `: "${pair.text}"` : ''}`,
        element: pair.selector,
        value: `${ratio.toFixed(1)}:1`
      })
    }
  }
  
  const score = total > 0 ? Math.round((passing / total) * 100) : 100
  return { score, issues }
}
```

### 4.5 Alt text check (`lib/checks/altText.ts`)

```ts
export function auditAltText(images: any[]) {
  const issues = []
  let passing = 0
  let total = 0
  
  for (const img of images) {
    // Skip decorative images (role=presentation or alt="" is intentional)
    if (img.role === 'presentation' || img.role === 'none') continue
    
    total++
    
    if (img.hasAlt && !img.altIsEmpty) {
      passing++
    } else {
      issues.push({
        severity: 'warn' as const,
        category: 'altText' as const,
        message: 'Image missing alt text',
        element: `img[src="${img.src?.slice(-30)}"]`,
        value: 'missing'
      })
    }
  }
  
  const score = total > 0 ? Math.round((passing / total) * 100) : 100
  return { score, issues }
}
```

### 4.6 Typography check (`lib/checks/typography.ts`)

```ts
export function auditTypography(fonts: string[]) {
  // Filter out system UI strings
  const systemFonts = ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Arial', 'Helvetica']
  const uniqueFonts = fonts.filter(f => !systemFonts.some(sf => f.includes(sf)))
  
  const count = uniqueFonts.length
  const issues = []
  
  if (count > 3) {
    issues.push({
      severity: 'warn' as const,
      category: 'typography' as const,
      message: `${count} font families detected — consider reducing to 2`,
      value: `${count}`
    })
  }
  
  const score = Math.max(0, 100 - Math.max(0, count - 2) * 20)
  return { score, issues }
}
```

### 4.7 API route (`app/api/audit/route.ts`)

```ts
import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { runAudit } from '@/lib/audit'
import { nanoid } from 'nanoid'

// Rate limiting: simple in-memory for now (Vercel KV for production)
const rateLimitMap = new Map<string, number[]>()

export async function POST(req: NextRequest) {
  const { url } = await req.json()
  
  // Validate URL
  try {
    const parsed = new URL(url)
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error()
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }
  
  // Basic rate limit: 10 audits per IP per hour
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  const now = Date.now()
  const calls = rateLimitMap.get(ip)?.filter(t => now - t < 3600000) || []
  if (calls.length >= 10) {
    return NextResponse.json({ error: 'Rate limit reached. Try again in an hour.' }, { status: 429 })
  }
  rateLimitMap.set(ip, [...calls, now])
  
  try {
    const result = await runAudit(url)
    const id = nanoid(10)
    
    // Store in Vercel KV (expires after 30 days)
    await kv.set(`audit:${id}`, result, { ex: 60 * 60 * 24 * 30 })
    
    return NextResponse.json({ id, result })
  } catch (err) {
    console.error('Audit failed:', err)
    return NextResponse.json({ error: 'Audit failed. The page might not be publicly accessible.' }, { status: 500 })
  }
}
```

Install nanoid: `npm install nanoid`

### 4.8 Results fetch route (`app/api/audit/[id]/route.ts`)

```ts
import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const result = await kv.get(`audit:${params.id}`)
  if (!result) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(result)
}
```

---

## Day 5 — Wire up the flow

Connect the UI to the API.

### 5.1 Update landing page submit handler

```tsx
// In your AuditInput component
async function handleSubmit(url: string) {
  setLoading(true)
  const res = await fetch('/api/audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  })
  const data = await res.json()
  if (data.id) {
    router.push(`/audit/${data.id}`)
  } else {
    setError(data.error || 'Something went wrong')
    setLoading(false)
  }
}
```

### 5.2 Show loading sequence during audit

When `loading = true`, show your `<LoadingSequence />` component over the page (or navigate to a `/loading` route that polls for the result).

Simplest approach: keep the user on the landing page, show the loading sequence inline where the input was, and redirect when the API returns.

### 5.3 Update results page to fetch real data

```tsx
// app/audit/[id]/page.tsx (server component)
async function getAuditResult(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/audit/${id}`, { cache: 'force-cache' })
  if (!res.ok) return null
  return res.json()
}

export default async function AuditPage({ params }: { params: { id: string } }) {
  const result = await getAuditResult(params.id)
  if (!result) return <NotFound />
  return <AuditResults result={result} />
}
```

---

## Day 6 — Share card (OG image)

### 6.1 Create OG image route (`app/api/og/[id]/route.tsx`)

```tsx
import { ImageResponse } from '@vercel/og'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  // Fetch the audit result
  const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/audit/${params.id}`).then(r => r.json())
  
  return new ImageResponse(
    (
      <div style={{
        width: '1200px', height: '630px',
        background: '#0C0C0D',
        display: 'flex', flexDirection: 'column',
        padding: '60px',
        fontFamily: 'Inter',
      }}>
        <div style={{ color: '#52525C', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          CONTRAST — Design Audit
        </div>
        <div style={{ color: '#8A8A96', fontSize: '14px', marginTop: '32px' }}>
          Audit for
        </div>
        <div style={{ color: '#F0EFE9', fontSize: '48px', fontWeight: '600', marginTop: '8px' }}>
          {result.url}
        </div>
        <div style={{ color: '#C8F04D', fontSize: '120px', fontWeight: '400', marginTop: '16px', lineHeight: '1' }}>
          {result.scores.overall}
        </div>
        <div style={{ color: '#52525C', fontSize: '13px', marginTop: 'auto', letterSpacing: '0.06em' }}>
          audit.anubhxv.design
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

### 6.2 Add metadata to results page

```tsx
// In app/audit/[id]/page.tsx
export async function generateMetadata({ params }: { params: { id: string } }) {
  const result = await getAuditResult(params.id)
  return {
    title: `${result?.url} scored ${result?.scores.overall}/100 — Contrast`,
    openGraph: {
      images: [`/api/og/${params.id}`],
    },
  }
}
```

---

## Day 7 — PDF report + polish

### 7.1 Simple PDF approach

Don't use a PDF library. Use the browser's print:

```tsx
// In results page, add a "Download Report" button
// Route: /audit/[id]/report — a print-optimised version of the results

// app/audit/[id]/report/page.tsx
// Same data, but with @media print CSS that removes buttons and backgrounds
// User clicks Download → window.print() → Save as PDF
```

```css
@media print {
  nav, .share-btn, .download-btn { display: none; }
  body { background: white; color: black; }
  .score-ring { /* SVG prints fine */ }
}
```

### 7.2 Audit your own site

Go to your live URL, paste your own portfolio URL. Fix anything below 70 before you post about it.

### 7.3 Test on these sites before launch
- stripe.com
- linear.app  
- swiggy.com
- zomato.com
- your own portfolio

Run each one and check that the scores make intuitive sense. If Stripe scores below 80, something is wrong with your calculation.

---

## Day 8-9 — Vercel deploy

### 8.1 Push to GitHub

```bash
git init
git add .
git commit -m "initial: Contrast design audit tool"
# Create repo on GitHub, then:
git remote add origin https://github.com/Anubhx/contrast-audit
git push -u origin main
```

### 8.2 Deploy to Vercel

1. Go to vercel.com → New Project → Import your repo
2. Framework: Next.js (auto-detected)
3. Add environment variables:
   - `BROWSERLESS_TOKEN` — from browserless.io dashboard
   - `GEMINI_API_KEY` — from aistudio.google.com (for V2)
   - `NEXT_PUBLIC_URL` — your Vercel URL (add after first deploy)

### 8.3 Add Vercel KV

In Vercel dashboard:
1. Go to Storage tab → Create KV Database
2. Connect it to your project
3. Environment variables auto-populate

### 8.4 Test the live URL

Run 5 real audits on the live site. Check:
- [ ] Results page renders correctly from the stored KV result
- [ ] OG image shows when you paste the URL in a LinkedIn post (use LinkedIn's post debugger)
- [ ] Loading sequence shows during audit
- [ ] Error states work (try a URL that doesn't exist)

---

## Day 10-11 — Custom domain + final checks

### 10.1 Custom domain

In Vercel → Settings → Domains:
- Add `audit.anubhxv.design` or `contrast.anubhxv.design`
- Follow DNS instructions (usually a CNAME record)

### 10.2 Final QA checklist

**Functionality**
- [ ] URL with and without https:// both work
- [ ] Error shown for login-gated URLs
- [ ] Rate limiting works (try 11 audits quickly)
- [ ] Share URL loads result correctly
- [ ] OG image appears in LinkedIn preview

**Design**
- [ ] No purple gradients anywhere
- [ ] Score ring animates correctly
- [ ] Category cards stagger in
- [ ] Typography: Instrument Serif only on score number
- [ ] Mobile view tested at 375px width
- [ ] Dark mode looks correct
- [ ] Light mode looks correct

**Accessibility (dogfood test)**
- [ ] Tool's own homepage scores 90+
- [ ] Keyboard navigation works on input + button
- [ ] Focus state visible on all interactive elements

---

## Day 12-14 — LinkedIn content launch

See the content strategy in the main project brief. Order of posts:

**Day 12:** Post 1 (build in public announcement) — include the live URL as "here's where I'll share the result"

**Day 13:** Run live audits of top Indian startup sites. Screenshot the results.

**Day 14:** Post 3 (the big launch post — "I audited the top 10 Indian startup websites")

**One week later:** Post 5 (data insights after N audits)

---

## Gemini API integration (V2, after you have users)

When you're ready to add AI fix suggestions:

```ts
// lib/gemini.ts
const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function generateFixSuggestions(issues: AuditIssue[], screenshotBase64: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }) // free tier
  
  const prompt = `
You are a UX accessibility expert reviewing an automated design audit.

Here are the issues found:
${issues.map(i => `- ${i.severity.toUpperCase()}: ${i.message} (${i.value})`).join('\n')}

For each issue, write a single plain-English sentence telling the designer exactly how to fix it.
Do not explain what WCAG is. Do not use jargon. Just say what to change.
Format: "Fix: [plain instruction]"
`
  
  const result = await model.generateContent([
    { text: prompt },
    { inlineData: { mimeType: 'image/jpeg', data: screenshotBase64 } }
  ])
  
  return result.response.text()
}
```

Install: `npm install @google/generative-ai`

Free tier limits: 15 requests/minute, 1 million tokens/day. More than enough for V1 traffic.

---

## Common problems and fixes

| Problem | Fix |
|---|---|
| Browserless timeout | Add `timeout: 15000` to page.goto, return partial results if timeout |
| `rgba(0, 0, 0, 0)` background | Skip transparent backgrounds in contrast check — they inherit from parent |
| Vercel function timeout | Default is 10s on free tier. Set `export const maxDuration = 30` in the API route (requires Vercel Pro) or use Vercel's background functions |
| KV not working locally | Use `npm install @vercel/kv` and run `vercel env pull` to get local env vars |
| OG image not updating | OG images are cached aggressively. Add a query param: `/api/og/${id}?v=1` |
| Score feels wrong | Console.log the raw colorPairs from browserless. Check if `background: rgba(0,0,0,0)` is inflating the failing count |

---

*Built by Anubhav Raj — ship the 80% version first, polish after users arrive.*
