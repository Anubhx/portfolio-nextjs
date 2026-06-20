# Component Architecture & Folder Structure
## Contrast — Design Audit Tool

---

## Full folder structure

```
contrast/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, theme provider
│   ├── page.tsx                    # Landing page
│   ├── globals.css                 # CSS tokens, Tailwind base
│   │
│   ├── audit/
│   │   └── [id]/
│   │       ├── page.tsx            # Results page (server component)
│   │       ├── AuditResults.tsx    # Results UI (client component)
│   │       └── report/
│   │           └── page.tsx        # Print-only PDF version
│   │
│   └── api/
│       ├── audit/
│       │   ├── route.ts            # POST — trigger audit
│       │   └── [id]/
│       │       └── route.ts        # GET — fetch stored result
│       └── og/
│           └── [id]/
│               └── route.tsx       # GET — OG share image
│
├── components/
│   ├── ui/                         # Pure display, no logic
│   │   ├── ScoreRing.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── IssueRow.tsx
│   │   ├── SeverityBadge.tsx
│   │   ├── ProgressBar.tsx
│   │   └── GradeLabel.tsx
│   │
│   ├── audit/                      # Audit-specific composed components
│   │   ├── AuditInput.tsx          # URL input + submit
│   │   ├── LoadingSequence.tsx     # Animated steps during audit
│   │   ├── ScoreHeader.tsx         # Big score + domain name
│   │   ├── CategoryGrid.tsx        # 4 category cards in a grid
│   │   ├── IssueList.tsx           # Full findings list
│   │   ├── ScreenshotViewer.tsx    # Page screenshot display
│   │   └── ShareCard.tsx           # Share/download button group
│   │
│   └── layout/
│       ├── Nav.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── types.ts                    # All TypeScript types
│   ├── audit.ts                    # Main audit orchestrator
│   ├── scoring.ts                  # Score calculation helpers
│   ├── browserless.ts              # Browserless.io API call
│   ├── gemini.ts                   # Gemini API (V2)
│   │
│   └── checks/
│       ├── contrast.ts             # Color contrast audit
│       ├── altText.ts              # Alt text audit
│       ├── typography.ts           # Font count audit
│       └── spacing.ts              # Spacing grid audit
│
├── hooks/
│   ├── useAudit.ts                 # Trigger audit + poll for result
│   └── useCountUp.ts               # Score number count-up animation
│
├── constants/
│   └── index.ts                    # Thresholds, weights, copy strings
│
└── public/
    └── og-fallback.png             # Fallback OG image for landing page
```

---

## Component contracts (props for every component)

### `<ScoreRing />`
```tsx
interface ScoreRingProps {
  score: number           // 0–100
  size?: 'sm' | 'lg'     // sm: 120px (mobile), lg: 160px (desktop). Default: lg
  animated?: boolean      // Default: true
  label?: string          // Text below score e.g. "stripe.com". Optional.
}
```

### `<CategoryCard />`
```tsx
interface CategoryCardProps {
  label: string           // e.g. "CONTRAST RATIO"
  score: number           // 0–100
  issueCount: number      // Number of issues in this category
  icon?: React.ReactNode  // Optional. Keep it simple — a single SVG path
}
```

### `<IssueRow />`
```tsx
interface IssueRowProps {
  severity: 'critical' | 'warn' | 'info'
  message: string         // Human-readable e.g. "Low contrast text"
  element?: string        // CSS selector e.g. ".hero p"
  value?: string          // Measured value e.g. "2.8:1"
}
```

### `<SeverityBadge />`
```tsx
interface SeverityBadgeProps {
  severity: 'critical' | 'warn' | 'info'
}
// Renders: [CRITICAL] [WARN] [INFO]
// Style: transparent fill, colored border + text
```

### `<ProgressBar />`
```tsx
interface ProgressBarProps {
  value: number           // 0–100
  animated?: boolean      // Default: true (Framer Motion width animate)
}
// Color derived internally from value using getGradeColor()
```

### `<AuditInput />`
```tsx
interface AuditInputProps {
  onSubmit: (url: string) => void
  loading?: boolean
  error?: string          // Shows below input if present
}
```

### `<LoadingSequence />`
```tsx
interface LoadingSequenceProps {
  currentStep: 0 | 1 | 2 | 3   // -1 = not started, 4 = done
}
// Steps are hardcoded inside this component:
// 0: "Taking a screenshot"
// 1: "Checking contrast ratios"
// 2: "Scanning for missing alt text"
// 3: "Calculating your score"
```

### `<IssueList />`
```tsx
interface IssueListProps {
  issues: AuditIssue[]
  filter?: 'all' | 'critical' | 'warn' | 'info'   // Default: 'all'
}
// Renders issues sorted: critical → warn → info
// Includes filter tabs if issues > 5
```

### `<ScreenshotViewer />`
```tsx
interface ScreenshotViewerProps {
  screenshotUrl: string
  url: string             // Shown as caption below
}
// Simple: img tag with object-fit: contain, max-height: 400px
// No annotations in V1
```

### `<ShareCard />`
```tsx
interface ShareCardProps {
  auditId: string
  url: string
  score: number
}
// Renders two buttons: Share (copies link) + Download (window.print())
// Share button: copies /audit/[id] URL to clipboard, shows "Copied!" feedback
```

---

## Data flow diagram

```
User types URL
      │
      ▼
AuditInput.onSubmit(url)
      │
      ▼
useAudit hook
  ├── POST /api/audit { url }
  ├── setStep(0) → "Taking screenshot"     (immediately)
  ├── setStep(1) → "Checking contrast"     (after 2s)
  ├── setStep(2) → "Scanning alt text"     (after 5s)
  ├── setStep(3) → "Calculating score"     (after 9s)
  └── on response: router.push(/audit/[id])
      │
      ▼
/audit/[id] (server component)
  └── fetch /api/audit/[id] → AuditResult
        │
        ▼
  AuditResults (client component)
  ├── <ScoreHeader score={74} url="stripe.com" />
  │     └── <ScoreRing score={74} animated />
  ├── <CategoryGrid scores={scores} />
  │     └── <CategoryCard /> × 4
  ├── <IssueList issues={issues} />
  │     └── <IssueRow /> × N
  ├── <ScreenshotViewer />
  └── <ShareCard auditId={id} />
```

---

## The `useAudit` hook

```ts
// hooks/useAudit.ts
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuditResult } from '@/lib/types'

type AuditState = 'idle' | 'loading' | 'error'

export function useAudit() {
  const [state, setState] = useState<AuditState>('idle')
  const [step, setStep] = useState(-1)
  const [error, setError] = useState<string>()
  const router = useRouter()

  async function triggerAudit(url: string) {
    setState('loading')
    setError(undefined)
    
    // Simulate step progression (real API doesn't emit progress)
    setStep(0)
    const t1 = setTimeout(() => setStep(1), 2000)
    const t2 = setTimeout(() => setStep(2), 5000)
    const t3 = setTimeout(() => setStep(3), 9000)
    
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      
      const data = await res.json()
      
      if (!res.ok) {
        setError(data.error || 'Audit failed')
        setState('error')
        setStep(-1)
        return
      }
      
      router.push(`/audit/${data.id}`)
    } catch {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      setError('Network error. Check your connection.')
      setState('error')
      setStep(-1)
    }
  }

  return { triggerAudit, state, step, error }
}
```

## The `useCountUp` hook

```ts
// hooks/useCountUp.ts
import { useEffect, useState } from 'react'

export function useCountUp(target: number, duration = 1000, delay = 0) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start: number
      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        // easeOutQuart
        const eased = 1 - Math.pow(1 - progress, 4)
        setCount(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(timeout)
  }, [target, duration, delay])
  
  return count
}
```

---

## Constants file

```ts
// constants/index.ts

export const AUDIT_WEIGHTS = {
  contrast:   0.40,
  altText:    0.30,
  typography: 0.15,
  spacing:    0.15,
} as const

export const GRADE_THRESHOLDS = {
  excellent: 90,
  good:      70,
  warn:      50,
} as const

export const CONTRAST_THRESHOLDS = {
  normal: 4.5,   // WCAG AA normal text
  large:  3.0,   // WCAG AA large text (≥18pt or bold ≥14pt)
  aaa:    7.0,   // WCAG AAA (not checked in V1, info only)
} as const

export const LOADING_STEPS = [
  'Taking a screenshot',
  'Checking contrast ratios',
  'Scanning for missing alt text',
  'Calculating your score',
] as const

export const RATE_LIMIT = {
  maxRequests: 10,
  windowMs: 60 * 60 * 1000,  // 1 hour
} as const

export const ERROR_MESSAGES = {
  invalidUrl:    "That doesn't look like a valid URL. Try including https://",
  unreachable:   "We couldn't load that page. Is it publicly accessible?",
  loginWall:     "This page might be behind a login — we can only audit public pages",
  rateLimit:     "You've run 10 audits this hour. Try again later.",
  timeout:       "This page is taking longer than usual.",
  generic:       "Something went wrong on our end. Try again in a moment.",
  geminiLimit:   "AI suggestions are resting — your audit scores are still accurate.",
} as const
```
