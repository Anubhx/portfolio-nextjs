# Anubhav Raj — Portfolio

Production-grade portfolio built with Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion, and MDX.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + Custom CSS tokens |
| Components | shadcn/ui (Radix UI) |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | next/font (Sora + Inter) |
| Content | MDX (gray-matter) |
| Deployment | Vercel |

## Architecture Decisions

### Server Components First
All sections are Server Components by default. Only interactive elements (Nav, ScrollProgress, VennDiagram, Hero) use `"use client"`. This maximizes static generation and minimizes JavaScript shipped to the browser.

### Design Token System
All design tokens from the HTML blueprint are preserved as CSS custom properties in `app/globals.css` and mirrored as TypeScript constants in `lib/tokens.ts` for use in Framer Motion variants. This creates a single source of truth for the entire design system.

### MDX for Case Studies
Case study content lives in `content/work/*.mdx` files with YAML frontmatter. The `lib/mdx.ts` utility reads these at build time using `gray-matter`. This means:
- Content is version-controlled
- Case studies can be authored in markdown
- No CMS required for content updates

### Static Generation
All pages including case study routes are statically generated via `generateStaticParams`. The site deploys as pure static HTML with no server-side rendering required at runtime.

### SEO Architecture
- Metadata API for all pages (title templates, descriptions, OG, Twitter)
- Dynamic OG images via `next/og` (homepage + per-project)
- JSON-LD structured data: Person, WebSite, CreativeWork, BreadcrumbList
- `robots.ts` and `sitemap.ts` auto-generation
- Canonical URLs on all pages

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, JSON-LD
│   ├── page.tsx            # Homepage
│   ├── globals.css         # All design tokens + component styles
│   ├── robots.ts           # robots.txt generation
│   ├── sitemap.ts          # XML sitemap
│   ├── og/route.tsx        # Homepage OG image
│   └── work/[slug]/
│       ├── page.tsx        # Dynamic case study page
│       └── opengraph-image.tsx  # Per-project OG image
├── components/
│   ├── Nav.tsx             # Sticky nav (Client)
│   ├── Hero.tsx            # Hero section (Client - Framer Motion)
│   ├── Identity.tsx        # Identity section (Server)
│   ├── VennDiagram.tsx     # CSS Venn diagram (Client - scroll animation)
│   ├── SelectedWork.tsx    # Work section (Server)
│   ├── CaseStudyCard.tsx   # Project card (Server)
│   ├── Process.tsx         # Process steps (Server)
│   ├── ExperienceTimeline.tsx  # Timeline (Server)
│   ├── SkillsEcosystem.tsx # Skills grid (Server)
│   ├── Philosophy.tsx      # Philosophy cards (Server)
│   ├── Testimonials.tsx    # Testimonials (Server)
│   ├── Contact.tsx         # Contact section (Server)
│   ├── Footer.tsx          # Footer (Server)
│   ├── ScrollProgress.tsx  # Progress bar (Client)
│   ├── CaseStudyContent.tsx # MDX renderer (Client)
│   └── JsonLd.tsx          # JSON-LD injector (Server)
├── content/work/           # MDX case studies
│   ├── companylens.mdx
│   ├── lexai.mdx
│   ├── flowwise.mdx
│   └── languagetalk.mdx
├── lib/
│   ├── projects.ts         # Project data
│   ├── content.ts          # Experience, skills, philosophy, testimonials
│   ├── tokens.ts           # Design tokens + Framer Motion variants
│   ├── mdx.ts              # MDX loader utility
│   └── structured-data.ts  # JSON-LD schema builders
├── hooks/
│   ├── useScrollProgress.ts
│   └── useInView.ts
└── types/
    ├── project.ts
    └── content.ts
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Option 1: GitHub Integration (Recommended)
1. Push this repository to GitHub
2. Connect to Vercel at [vercel.com](https://vercel.com)
3. Import the repository
4. Set environment variable: `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
5. Deploy

### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Environment Variables
| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production URL for canonical links and OG images | `https://anubhavraj.com` |

## Customization

### Adding Real Testimonials
Edit `lib/content.ts` → `testimonials` array. Remove `isPlaceholder: true` when replacing with real quotes.

### Updating Contact Links
Edit `components/Contact.tsx` → update `href` values in `contactLinks` array.

### Adding a New Case Study
1. Create `content/work/your-project.mdx` with frontmatter
2. Add entry to `lib/projects.ts`
3. Deploy — the sitemap and static paths update automatically

### Updating Personal Info
- Hero: `components/Hero.tsx`
- Identity: `components/Identity.tsx`
- Experience: `lib/content.ts` → `experiences`
- Skills: `lib/content.ts` → `skillClusters`
- Contact: `components/Contact.tsx`

## Performance Notes

- All fonts loaded via `next/font` (zero layout shift)
- Images use `next/image` with AVIF/WebP formats
- CSS custom properties enable zero-JS theming
- Framer Motion uses `useInView` hook with `prefers-reduced-motion` support
- No external CSS frameworks at runtime — Tailwind purges unused styles

## License

MIT — feel free to use this as a reference for your own portfolio.
