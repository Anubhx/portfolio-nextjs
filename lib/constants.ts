/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║              PORTFOLIO MASTER CONSTANTS FILE                     ║
 * ║  Change ANYTHING here → it updates everywhere on the site.      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

export type ProjectActionType =
  | "caseStudy"
  | "live"
  | "github"
  | "behance"
  | "figma"
  | "docs"
  | "video";

export type ProjectAction = {
  enabled: boolean;
  href: string;
};

/**
 * Category controls which discipline bucket a project appears in
 * on the "Explore by Discipline" section of the homepage.
 */
export type ProjectCategory =
  | "UX / Product"
  | "Intelligent Systems"
  | "Engineering Builds";

/**
 * Template controls which case study layout is rendered at /work/[slug].
 * category ≠ template — a UX project could theoretically use the engineering template.
 */
export type ProjectTemplate = "ux-product" | "agentic-ai" | "engineering";

// ─────────────────────────────────────────────────────────────────────────────
// 1. THEME COLORS
// ─────────────────────────────────────────────────────────────────────────────
export const THEME = {
  bg: "#FAFAFA",
  text: "#111111",
  secondary: "#666666",
  accent: "#111111",
  surface: "transparent",
  border: "#EAEAEA",
  hover: "#F2F2F2",
  accentLt: "#F5F5F5",
  accentMd: "#DDDDDD",
  accentDark: "#000000",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 2. BIO & PERSONAL INFO
// ─────────────────────────────────────────────────────────────────────────────
export const BIO = {
  name: "Anubhav Raj",
  firstName: "Anubhav",
  initials: "AR",
  title: "Builder",
  currentRole: "Software Engineer",
  currentCompany: "LTIMindtree",
  location: "Bengaluru, India",
  locationNote: "open to remote and hybrid opportunities",
  email: "anubhavraj@example.com",
  resumeUrl:
    "https://drive.google.com/file/d/1J47dTPjIljQP8FI9GnqwGgtPRLZBjl86/view?usp=sharing",
  availability: null,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 3. SOCIALS & CONTACT LINKS
// ─────────────────────────────────────────────────────────────────────────────
export const SOCIALS = {
  linkedin: "https://www.linkedin.com/in/anubhax/",
  github: "https://github.com/Anubhx",
  behance: "https://www.behance.net/anubhavraj",
  twitter: "https://twitter.com/anubhavRaj0",
  instagram: "https://www.instagram.com/anubhax.27/",
  medium: "https://medium.com/@anubhxv",
  facebook: "https://www.facebook.com/anubhax/",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 4. HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────
export const HERO = {
  headline: [
    "I build products",
    "for the messy space",
    "between people",
    "and systems.",
  ],
  heroHeadlineRaw: null as string | null,
  sub: "Somewhere between wireframes, APIs, and LLMs, I found my work. I exist in the tension of disciplines, removing the translation layer so teams can ship what matters.",
  cta1Label: "Read the story",
  cta1Href: "/about",
  cta2Label: "View work",
  cta2Href: "#work",
  stats: [],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 5. IMAGES
// ─────────────────────────────────────────────────────────────────────────────
export const IMAGES = {
  hero: "/images/hero.jpg",
  uem: null as string | null,
  school1: null as string | null,
  school2: null as string | null,
  ltimindtree:
    "https://images.seeklogo.com/logo-png/61/1/ltimindtree-logo-png_seeklogo-613672.png",
  vedantu:
    "https://yt3.ggpht.com/a/AATXAJyMa1Do0gFwcjdCWGAOMekO0n6n6tcxO1EvDQ=s900-c-k-c0xffffffff-no-rj-mo",
  ecstasia: null as string | null,
  zomato:
    "https://raw.githubusercontent.com/Anubhx/portfolio-nextjs/master/public/images/zomato.jpg" as string | null,
  companylens:
    "https://raw.githubusercontent.com/Anubhx/portfolio-nextjs/master/public/images/companylens.jpg" as string | null,
  clarity:
    "https://raw.githubusercontent.com/Anubhx/portfolio-nextjs/master/public/images/clarity.jpg" as string | null,
  lexai:
    "https://raw.githubusercontent.com/Anubhx/portfolio-nextjs/master/public/images/lexAI.jpg" as string | null,
  flowwise: "https://raw.githubusercontent.com/Anubhx/portfolio-nextjs/master/public/images/FlowWise.png" as string | null,
  orbitResume:
    "https://raw.githubusercontent.com/Anubhx/portfolio-nextjs/master/public/images/OrbitResume.jpg" as string | null,
  kuberAi:
    "https://raw.githubusercontent.com/Anubhx/portfolio-nextjs/master/public/images/KuberAI.jpg" as string | null,
  languagetalk:
    "https://raw.githubusercontent.com/Anubhx/portfolio-nextjs/master/public/images/languageTalk.jpg" as string | null,
  virtuStore:
    "https://mir-s3-cdn-cf.behance.net/projects/404/68fabb168030969.Y3JvcCw0MzIwLDMzNzksMCww.png" as string | null,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 6. PROJECTS
//
// featured: true  → appears in the "Featured Work" editorial section (top)
// category        → which discipline bucket on the homepage Explore section
// template        → which case study layout to render at /work/[slug]
// ─────────────────────────────────────────────────────────────────────────────
export const PROJECTS = [
  // ── FEATURED TRIO ──────────────────────────────────────────────────────────
  {
    slug: "zomato",
    title: "Zomato Group Order",
    category: "UX / Product" as ProjectCategory,
    template: "ux-product" as ProjectTemplate,
    type: "Research-led Product Design",
    description:
      "The hardest part of lunch wasn't choosing what to eat. It was everything people had to do before they could.",
    image: IMAGES.zomato,
    stack: ["Research", "Facilitation", "Journey Mapping", "Usability Testing", "Interaction Design"],
    highlights: [] as string[],
    role: "UX/UI Designer",
    timeline: "3 Weeks · June 2026",
    accentColor: THEME.accent,
    year: "2026",
    featured: true,
    actions: {
      caseStudy: { enabled: true, href: "/work/zomato" },
      live: { enabled: false, href: "" },
      github: { enabled: false, href: "" },
      behance: { enabled: true, href: "https://www.behance.net/gallery/250727725/Zomato-Group-Order" },
      figma: { enabled: true, href: "https://www.figma.com/community/file/1645766255262568144/zomato-group-order-feature-multi-restaurant-group-ordering-feature-design" },
      docs: { enabled: false, href: "" },
      video: { enabled: false, href: "" },
    } as Record<ProjectActionType, ProjectAction>,
  },
  {
    slug: "companylens",
    title: "CompanyLens",
    category: "Intelligent Systems" as ProjectCategory,
    template: "agentic-ai" as ProjectTemplate,
    type: "Multi-Agent Due Diligence Platform",
    description:
      "Investigating companies shouldn't require stitching together ten tools and a hundred PDFs.",
    image: IMAGES.companylens,
    stack: ["LangGraph", "RAG", "Next.js", "Gemini", "Vector DB"],
    highlights: [] as string[],
    role: "Product Designer + AI Engineer + Full-stack",
    timeline: "2024",
    accentColor: THEME.accent,
    year: "2024",
    featured: false,
    actions: {
      caseStudy: { enabled: true, href: "/work/companylens" },
      live: { enabled: true, href: "https://companylensbyanubhav.vercel.app" },
      github: { enabled: true, href: "https://github.com/Anubhx/CompanyLens" },
      behance: { enabled: true, href: "https://www.behance.net/gallery/246636993/CompanyLens" },
      figma: { enabled: false, href: "" },
      docs: { enabled: false, href: "" },
      video: { enabled: false, href: "" },
    } as Record<ProjectActionType, ProjectAction>,
  },
  {
    slug: "flowwise",
    title: "FlowWise",
    category: "UX / Product" as ProjectCategory,
    template: "ux-product" as ProjectTemplate,
    type: "AI Personal Finance Experience",
    description:
      "A personal finance companion that nudges you before you make a bad decision, instead of judging you after.",
    image: IMAGES.flowwise,
    stack: ["Mobile UX", "React Native", "Design Systems", "Expo"],
    highlights: [] as string[],
    role: "Product Designer + Mobile Engineer",
    timeline: "2023",
    accentColor: "#7b5ea7",
    year: "2023",
    featured: true,
    actions: {
      caseStudy: { enabled: true, href: "/work/flowwise" },
      live: { enabled: false, href: "" },
      github: { enabled: true, href: "https://github.com/Anubhx/flow-wise" },
      behance: { enabled: true, href: "https://www.behance.net/gallery/247562999/Flow-Wise-Case-Study" },
      figma: { enabled: false, href: "" },
      docs: { enabled: false, href: "" },
      video: { enabled: false, href: "" },
    } as Record<ProjectActionType, ProjectAction>,
  },

  // ── UX / PRODUCT ───────────────────────────────────────────────────────────
  {
    slug: "languagetalk",
    title: "LanguageTalk",
    category: "UX / Product" as ProjectCategory,
    template: "ux-product" as ProjectTemplate,
    type: "UX Design · EdTech",
    description: "Learning a language shouldn't feel like studying.",
    image: IMAGES.languagetalk,
    stack: ["UX Research", "IA", "Figma", "Prototyping"],
    highlights: [] as string[],
    role: "Lead UX Designer",
    timeline: "2023",
    accentColor: "#c97c2b",
    year: "2023",
    featured: true,
    actions: {
      caseStudy: { enabled: false, href: "" },
      live: { enabled: false, href: "" },
      github: { enabled: false, href: "" },
      behance: { enabled: true, href: "https://www.behance.net/gallery/167171313/Language-Talk-(-Language-learning-App-)-Case-Study" },
      figma: { enabled: false, href: "" },
      docs: { enabled: false, href: "" },
      video: { enabled: false, href: "" },
    } as Record<ProjectActionType, ProjectAction>,
  },

  // ── INTELLIGENT SYSTEMS ────────────────────────────────────────────────────
  {
    slug: "clarity",
    title: "Clarity",
    category: "Intelligent Systems" as ProjectCategory,
    template: "agentic-ai" as ProjectTemplate,
    type: "AI Research Assistant",
    description:
      "Because spending two hours searching for a citation is not a good use of human intellect.",
    image: IMAGES.clarity,
    stack: ["RAG", "Embeddings", "Next.js", "OpenAI"],
    highlights: [] as string[],
    role: "Product Designer + Engineer",
    timeline: "2024",
    accentColor: THEME.accent,
    year: "2024",
    featured: false,
    actions: {
      caseStudy: { enabled: true, href: "/work/clarity" },
      live: { enabled: true, href: "https://withclarity.vercel.app" },
      github: { enabled: false, href: "" },
      behance: { enabled: false, href: "" },
      figma: { enabled: false, href: "" },
      docs: { enabled: false, href: "" },
      video: { enabled: false, href: "" },
    } as Record<ProjectActionType, ProjectAction>,
  },
  {
    slug: "lexai",
    title: "LexAI",
    category: "Intelligent Systems" as ProjectCategory,
    template: "agentic-ai" as ProjectTemplate,
    type: "AI Contract Intelligence",
    description:
      "Lawyers think in implications. This contract analyzer translates 40 pages of legalese into a single risk score.",
    image: IMAGES.lexai,
    stack: ["Semantic Search", "LLM", "Risk Analysis", "Next.js"],
    highlights: [] as string[],
    role: "Product Designer + AI Engineer",
    timeline: "2024",
    accentColor: "#2d6a4f",
    year: "2024",
    featured: false,
    actions: {
      caseStudy: { enabled: true, href: "/work/lexai" },
      live: { enabled: true, href: "https://lexaiapp.vercel.app" },
      github: { enabled: true, href: "https://github.com/Anubhx/Lex-AI" },
      behance: { enabled: true, href: "https://www.behance.net/gallery/246651851/Lex-AI" },
      figma: { enabled: false, href: "" },
      docs: { enabled: false, href: "" },
      video: { enabled: false, href: "" },
    } as Record<ProjectActionType, ProjectAction>,
  },
  {
    slug: "kuberai",
    title: "Kuber AI",
    category: "Intelligent Systems" as ProjectCategory,
    template: "agentic-ai" as ProjectTemplate,
    type: "Agentic Finance Platform",
    description:
      "An AI system that doesn't just read your portfolio; it actively reasons about it.",
    image: IMAGES.kuberAi,
    stack: ["Multi-Agent", "LangGraph", "Memory", "Python"],
    highlights: [] as string[],
    role: "Backend Engineer",
    timeline: "2025",
    accentColor: THEME.accent,
    year: "2025",
    featured: false,
    actions: {
      caseStudy: { enabled: true, href: "/work/kuberai" },
      live: { enabled: true, href: "https://kuberai.vercel.app" },
      github: { enabled: true, href: "https://github.com/Anubhx/FinanceAgent" },
      behance: { enabled: false, href: "" },
      figma: { enabled: false, href: "" },
      docs: { enabled: false, href: "" },
      video: { enabled: false, href: "" },
    } as Record<ProjectActionType, ProjectAction>,
  },

  // ── ENGINEERING BUILDS ─────────────────────────────────────────────────────
  {
    slug: "orbitresume",
    title: "OrbitResume",
    category: "Engineering Builds" as ProjectCategory,
    template: "engineering" as ProjectTemplate,
    type: "AI Resume Builder",
    description:
      "Automated resume evaluation that actually understands context instead of just counting keywords.",
    image: IMAGES.orbitResume,
    stack: ["Python", "Prompt Engineering", "Next.js", "Vercel AI SDK"],
    highlights: [] as string[],
    role: "AI Engineer",
    timeline: "2024",
    accentColor: THEME.accent,
    year: "2024",
    featured: false,
    actions: {
      caseStudy: { enabled: true, href: "/work/orbitresume" },
      live: { enabled: true, href: "https://orbitresume.vercel.app" },
      github: { enabled: false, href: "" },
      behance: { enabled: false, href: "" },
      figma: { enabled: false, href: "" },
      docs: { enabled: false, href: "" },
      video: { enabled: false, href: "" },
    } as Record<ProjectActionType, ProjectAction>,
  },
  {
    slug: "querion",
    title: "Querion",
    category: "Engineering Builds" as ProjectCategory,
    template: "engineering" as ProjectTemplate,
    type: "Full Stack Application",
    description: "A dynamic query system built for speed.",
    image: null,
    stack: ["Next.js", "React", "TypeScript"],
    highlights: [] as string[],
    role: "Full Stack Engineer",
    timeline: "2024",
    accentColor: THEME.accent,
    year: "2024",
    featured: false,
    actions: {
      caseStudy: { enabled: false, href: "" },
      live: { enabled: true, href: "https://querion-by-anubhav.vercel.app" },
      github: { enabled: true, href: "https://github.com/Anubhx/Querion" },
      behance: { enabled: false, href: "" },
      figma: { enabled: false, href: "" },
      docs: { enabled: false, href: "" },
      video: { enabled: false, href: "" },
    } as Record<ProjectActionType, ProjectAction>,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 7. EXPERIENCE
// ─────────────────────────────────────────────────────────────────────────────
export const EXPERIENCES = [
  {
    company: "LTIMindtree",
    role: "Graduate Engineer Trainee",
    period: "June 2025 — Present",
    description:
      "Working as a Graduate Engineer Trainee, focusing on software development, real-time project training, and mastering technologies such as PostgreSQL, Java, and cloud platforms like Azure.",
    tags: ["Python", "PostgreSQL", "Azure", "Java", "Team Collaboration"],
    isCurrent: true,
    logo: IMAGES.ltimindtree,
  },
  {
    company: "Ecstasia",
    role: "UX Designer",
    period: "2022",
    description:
      "Led product design for a consumer entertainment platform. Took the experience from zero research to a live product — discovery, design, testing, and iteration.",
    tags: ["User Research", "Product Design", "Figma", "Prototyping"],
    isCurrent: false,
    logo: IMAGES.ecstasia,
  },
  {
    company: "Vedantu",
    role: "Web Developer Intern",
    period: "Jan 2023 — June 2023",
    description:
      "Enhanced website functionality and UI/UX using JavaScript, CSS, and modern frameworks, creating engaging animations.",
    tags: ["UX/UI Design", "JavaScript", "CSS"],
    isCurrent: false,
    logo: IMAGES.vedantu,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 8. EDUCATION
// ─────────────────────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    id: 0,
    school: "University of Engineering & Management (UEM), Kolkata",
    degree: "B.Tech — Computer Science and Engineering",
    date: "Oct 2021 – Sep 2025",
    grade: "8.1 CGPA",
    description:
      "Coursework: Data Structures, Algorithms, OOP, DBMS, Operating Systems, Computer Networks.",
    logo: IMAGES.uem,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 9–12. EMPTY PLACEHOLDERS (populated as needed)
// ─────────────────────────────────────────────────────────────────────────────
export const SKILL_CLUSTERS: Array<{ name: string; iconPath: string; skills: string[] }> = [];
export const PROCESS_STEPS: Array<{ number: string; label: string; description: string }> = [];
export const PHILOSOPHY_CARDS: Array<{ number: string; title: string; body: string }> = [];
export const TESTIMONIALS: Array<{
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatarUrl: string | null;
  isPlaceholder?: boolean;
}> = [];

// ─────────────────────────────────────────────────────────────────────────────
// 13. FOOTER
// ─────────────────────────────────────────────────────────────────────────────
export const FOOTER = {
  tagline: "Designed and built with intention.",
  location: BIO.location,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// DERIVED EXPORTS
// ─────────────────────────────────────────────────────────────────────────────
export const projects = PROJECTS.map((p) => ({
  slug: p.slug,
  title: p.title,
  category: p.category,
  template: p.template,
  type: p.type,
  description: p.description,
  image: "image" in p ? p.image : null,
  stack: [...p.stack],
  highlights: [...p.highlights],
  role: p.role,
  timeline: p.timeline,
  accentColor: p.accentColor,
  year: p.year,
  featured: p.featured,
  actions: p.actions,
}));

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const experiences = EXPERIENCES.map((e) => ({
  company: e.company,
  role: e.role,
  period: e.period,
  description: e.description,
  tags: [...e.tags],
  isCurrent: e.isCurrent,
  logo: e.logo,
}));

export const processSteps = PROCESS_STEPS.map((s) => ({ ...s }));
export const skillClusters = SKILL_CLUSTERS.map((c) => ({ ...c }));
export const philosophyCards = PHILOSOPHY_CARDS.map((c) => ({ ...c }));
export const testimonials = TESTIMONIALS.map((t) => ({ ...t }));
