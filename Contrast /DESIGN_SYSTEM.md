# Design System — Contrast
## Design Audit Tool by Anubhav Raj

---

## Design Direction

**The concept:** A precision diagnostic instrument. Not a SaaS dashboard. Think of a well-designed medical report or a structured engineering spec — clean, confident, data-forward. The UI should feel like it was built by someone who cares about design so much that they made the audit result itself beautiful.

**The anti-pattern to avoid:** Generic "AI tool" look — purple gradients, glowing cards, hero sections with 3 floating feature cards and an email input. If it looks like it was made with a Framer template, start over.

**Aesthetic reference:** Vercel's dashboard meets a high-end typographic publication. Monospace for data, humanist sans for prose. Dark mode as primary.

---

## Color Tokens

### Dark mode (primary)

```css
:root[data-theme="dark"] {
  /* Background layers */
  --color-bg-base:         #0C0C0D;   /* page background — near black, slightly warm */
  --color-bg-elevated:     #141416;   /* cards, panels */
  --color-bg-overlay:      #1C1C1F;   /* modals, popovers */
  --color-bg-subtle:       #232327;   /* hover states, dividers */

  /* Text */
  --color-text-primary:    #F0EFE9;   /* off-white — warm, not pure white */
  --color-text-secondary:  #8A8A96;   /* labels, metadata */
  --color-text-tertiary:   #52525C;   /* placeholders, disabled */

  /* Brand accent — a single deliberate choice */
  --color-accent:          #C8F04D;   /* acid chartreuse — precise, diagnostic */
  --color-accent-dim:      #1E2B0A;   /* accent background tint */
  --color-accent-hover:    #D8FF55;

  /* Semantic — score grades */
  --color-grade-excellent: #3DB87A;   /* 90–100 */
  --color-grade-good:      #F5A623;   /* 70–89 */
  --color-grade-warn:      #E8622A;   /* 50–69 */
  --color-grade-critical:  #D93025;   /* 0–49  */

  /* Borders */
  --color-border:          #242428;
  --color-border-subtle:   #1A1A1E;

  /* Score ring backgrounds */
  --color-ring-track:      #232327;
}
```

### Light mode

```css
:root[data-theme="light"] {
  --color-bg-base:         #F6F5F0;   /* warm off-white, not pure white */
  --color-bg-elevated:     #FFFFFF;
  --color-bg-overlay:      #FFFFFF;
  --color-bg-subtle:       #EEEDE8;

  --color-text-primary:    #18181B;
  --color-text-secondary:  #6B6B76;
  --color-text-tertiary:   #A0A0AB;

  --color-accent:          #5C6E00;   /* dark olive — same accent family, readable on light */
  --color-accent-dim:      #EDF5C0;
  --color-accent-hover:    #4A5800;

  --color-grade-excellent: #1F7A4A;
  --color-grade-good:      #B07800;
  --color-grade-warn:      #C04A10;
  --color-grade-critical:  #A51C14;

  --color-border:          #E2E1DC;
  --color-border-subtle:   #EEEDE8;
  --color-ring-track:      #E2E1DC;
}
```

**Why chartreuse as accent?**  
It is the color engineers associate with "passing" in CI systems and monitoring dashboards. It avoids the generic blue/purple of SaaS and the green of "success" toasts. It looks precise and intentional — a tool colour, not a brand colour. It also has excellent contrast against the dark backgrounds (ratio ~8:1 on `#0C0C0D`).

---

## Typography

### Typefaces

```css
/* Display / headlines — used sparingly, with restraint */
--font-display: 'Instrument Serif', Georgia, serif;
/* Use only for the score number and the page H1. Nowhere else. */

/* Interface / body — the workhorse */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
/* Everything: labels, body copy, buttons, navigation */

/* Data / mono — scores, ratios, code, technical values */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
/* Contrast ratios (e.g. "2.8:1"), score numbers in cards, issue IDs */
```

Load from Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Type scale

```css
/* Display — the hero score number */
--text-display:   font-size: 80px; font-family: var(--font-display); font-weight: 400; line-height: 1;

/* H1 — page title */
--text-h1:        font-size: 32px; font-family: var(--font-sans); font-weight: 600; line-height: 1.2;

/* H2 — section headers */
--text-h2:        font-size: 20px; font-family: var(--font-sans); font-weight: 600; line-height: 1.3;

/* Body */
--text-body:      font-size: 15px; font-family: var(--font-sans); font-weight: 400; line-height: 1.6;

/* Label / caption */
--text-label:     font-size: 12px; font-family: var(--font-sans); font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase;

/* Mono data */
--text-mono:      font-size: 13px; font-family: var(--font-mono); font-weight: 400;

/* Mono large (contrast ratios in issue list) */
--text-mono-lg:   font-size: 18px; font-family: var(--font-mono); font-weight: 500;
```

**The rule:** Instrument Serif appears exactly twice on the entire site — the overall score number on the results page, and the word "Contrast" in the logo. That restraint is what makes it memorable.

---

## Spacing Scale

8px base grid. No exceptions.

```css
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
--space-20:  80px
--space-24:  96px
```

---

## Border Radius

The tool should feel precise, not bubbly. Keep radius tight.

```css
--radius-sm:   4px    /* badges, tags */
--radius-md:   8px    /* cards, inputs */
--radius-lg:   12px   /* main panels */
--radius-full: 9999px /* pills only */
```

Do not use `rounded-xl` or `rounded-2xl` anywhere except the score ring SVG.

---

## Component Specifications

### Score Ring

The signature element of the entire product. Everything else should feel quiet next to this.

```
- SVG circle, 160px diameter on desktop / 120px mobile
- Track ring: 6px stroke, var(--color-ring-track)
- Fill ring: 6px stroke, animated arc — color maps to grade
- Center: score number in Instrument Serif, 80px, animated count-up from 0
- Below number: domain name in --text-label, --color-text-secondary
- Animation: 1.2s ease-out, starts when element enters viewport
```

```jsx
// Tailwind classes to avoid — don't use these on the ring container:
// shadow-lg, backdrop-blur, bg-gradient-to-*, ring-*, border-*
// The ring IS the visual. Keep the container completely bare.
```

### Audit Input (Landing hero)

```
- Full-width input, max-width 560px, centered
- Height: 52px
- Border: 1px solid var(--color-border), radius: var(--radius-md)
- Background: var(--color-bg-elevated)
- Placeholder: "https://yourproduct.com" — no icon, no emoji
- Submit button: INSIDE the input field on the right
  - Label: "Audit" — one word, not "Run Audit" or "Check Now"
  - Background: var(--color-accent), color: #0C0C0D (near black text for contrast)
  - Width: 72px, full height of input minus 4px padding each side
- Focus state: border-color changes to var(--color-accent), no glow/shadow
- Error state: border turns --color-grade-critical, error message below in --text-label
```

### Category Score Card

```
- Background: var(--color-bg-elevated)
- Border: 1px solid var(--color-border)
- Padding: 20px
- Radius: var(--radius-md)

Contents (top to bottom):
  1. Category label — --text-label, --color-text-secondary ("CONTRAST RATIO")
  2. Score — --text-mono-lg, color matches grade
  3. Progress bar — 4px height, border-radius: 2px, fill color matches grade
  4. Issue count — --text-body ("14 issues found") or ("All clear")
```

### Issue Row

```
Each issue in the findings list:

- Left: Severity badge
    CRITICAL  → background: transparent, border: 1px solid --color-grade-critical, color: --color-grade-critical
    WARN      → same pattern with --color-grade-good
    INFO      → same pattern with --color-text-tertiary

- Center: Issue description in --text-body
    Sub-line: element selector in --text-mono, --color-text-secondary
    e.g.  ".hero-text > p:first-child"

- Right: The actual value in --text-mono-lg
    e.g.  "2.8:1" (failing) → --color-grade-critical
    e.g.  "6.2:1" (passing) → --color-grade-excellent

- Divider between rows: 1px var(--color-border-subtle)
- No hover background change — this is a report, not interactive
```

### Loading Sequence

```
4 steps, each appearing one at a time with 300ms stagger:

Step 1: "Taking a screenshot"
Step 2: "Checking contrast ratios"
Step 3: "Scanning for missing alt text"
Step 4: "Calculating your score"

Each step:
  - Left: small circle indicator
    - Pending: border only, --color-border
    - Active: filled --color-accent, with gentle pulse animation
    - Done: filled --color-grade-excellent, static
  - Right: step label in --text-body

No spinner. No progress bar. No percentage.
The step list itself IS the progress indicator.
```

### Share Card (OG image)

Generated server-side via `@vercel/og`. NOT a screenshot of the UI.

```
Dimensions: 1200 × 630px (standard OG)
Background: var(--color-bg-base) — the dark one, regardless of user theme
Layout:
  - Left 60%: 
      Logo "Contrast" — top left, small
      "Design audit for" label in --text-label
      Domain name in H1
      Score in Instrument Serif, 120px, grade color
  - Right 40%:
      4 mini score bars, one per category
      Each: label + score + colored bar
  - Bottom strip:
      "audit.anubhxv.design" — --text-label, --color-text-tertiary

No decorative elements. No abstract shapes. No gradients.
```

---

## Motion

Use Framer Motion. Apply these principles:

```js
// Page transitions — none. Page loads instantly.
// Don't animate page-in. It makes the tool feel slow.

// Result reveal — stagger the category cards
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } } }

// Score ring — animate the arc fill
// SVG stroke-dashoffset from 0 to calculated value
// duration: 1.2s, ease: [0.25, 0.46, 0.45, 0.94] (easeOutQuart)

// Score number — count up from 0
// duration: 1.0s, ease: easeOut
// Use a simple requestAnimationFrame counter, not a library

// Loading step state — opacity 0 → 1, y: 8 → 0
// duration: 0.25s per step
```

**What NOT to animate:**
- Page backgrounds
- Header/nav
- Buttons (no hover animations beyond color change)
- The screenshot thumbnail
- Error messages (they should appear instantly)

---

## Logo

The wordmark: **Contrast**

```
Font: Instrument Serif, italic
Weight: Regular (400)
Color: var(--color-text-primary)
Size: 18px in nav, 24px on landing

No icon. No logomark. No abstract symbol.
The word "Contrast" in italic serif, set against a stark interface, IS the brand.
```

---

## What "AI slop" looks like — and how to avoid it

| AI slop pattern | What to do instead |
|---|---|
| Purple/blue gradient hero background | Flat dark background. Let the score be the colour. |
| "Powered by AI ✨" everywhere | Never mention the AI. The result is what matters. |
| 3 feature cards with emoji icons | Describe what the tool actually checks, in plain sentences |
| "Try it free" as the CTA | The CTA is just "Audit". One word. |
| Glassmorphism cards | Solid background, thin border, no blur |
| Generic sans-serif for everything | Instrument Serif for the score only. That contrast IS the design. |
| Hero illustration or blob shape | No illustrations. The screenshot from the audit IS the visual. |
| Dark purple + neon teal | Near-black + chartreuse — a tool colour, not a brand colour |
| Footer with 6 columns | Footer: logo left, "by Anubhav Raj" right. That's it. |

---

## Page Layouts

### Landing (`/`)

```
┌─────────────────────────────────────────┐
│  Contrast                    [GitHub ↗] │  ← Nav: minimal, no menu
├─────────────────────────────────────────┤
│                                         │
│  Audit any website's design             │  ← H1, left-aligned, not centered
│  in 10 seconds. Free.                   │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ https://...              [Audit]  │  │  ← Input + CTA
│  └───────────────────────────────────┘  │
│                                         │
│  Checks contrast · alt text ·           │  ← 1 line of plain text, not icons
│  typography · spacing                   │
│                                         │
├─────────────────────────────────────────┤
│  Recent audits                          │  ← Example cards (hardcoded for launch)
│  [stripe.com · 91]  [linear.app · 87]  │
│  [zomato.com · 63]  [swiggy.com · 71]  │
└─────────────────────────────────────────┘
```

### Results (`/audit/[id]`)

```
┌─────────────────────────────────────────┐
│  Contrast            [Share] [Download] │
├─────────────────────────────────────────┤
│                                         │
│  stripe.com                             │  ← Domain as H1
│  Audited June 14, 2025 · 0.8s          │
│                                         │
│              74                         │  ← Score ring, centered
│           ●●●●●●○○                      │    Instrument Serif
│                                         │
├───────────┬───────────┬────────┬────────┤
│ CONTRAST  │ ALT TEXT  │  TYPE  │SPACING │  ← 4 category cards
│   91      │    38     │   82   │   88   │
└───────────┴───────────┴────────┴────────┘
│                                         │
│  14 issues found                        │  ← Issue list
│  ──────────────────────────────────     │
│  CRITICAL  .hero p — ratio 2.8:1        │
│  WARN      3 images missing alt text    │
│  INFO      4 font families detected     │
│                                         │
│  [Screenshot of audited page]           │
└─────────────────────────────────────────┘
```

---

*Design system v1.0 — Anubhav Raj — June 2025*
*Review after 50 users. Don't change the accent color until you have data.*
