/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║              PORTFOLIO MASTER CONSTANTS FILE                     ║
 * ║  Change ANYTHING here → it updates everywhere on the site.      ║
 * ║                                                                  ║
 * ║  Sections:                                                       ║
 * ║    1.  THEME COLORS                                              ║
 * ║    2.  BIO & PERSONAL INFO                                       ║
 * ║    3.  SOCIALS & CONTACT LINKS                                   ║
 * ║    4.  HERO SECTION                                              ║
 * ║    5.  IMAGES  (local /public/images/ or external URLs)         ║
 * ║    6.  PROJECTS (case studies shown on homepage)                 ║
 * ║    7.  EXPERIENCE (timeline)                                     ║
 * ║    8.  EDUCATION                                                 ║
 * ║    9.  SKILLS ECOSYSTEM                                          ║
 * ║   10.  PROCESS STEPS                                             ║
 * ║   11.  PHILOSOPHY / THINKING CARDS                               ║
 * ║   12.  TESTIMONIALS                                              ║
 * ║   13.  FOOTER                                                    ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. THEME COLORS
//    Change these to restyle the entire site instantly.
//    bg         → page background
//    text       → main body text
//    secondary  → muted/subtitle text
//    accent     → brand blue (buttons, links, labels, dots)
//    surface    → card/panel backgrounds
//    border     → dividers and card borders
//    hover      → hover background on interactive elements
//    accentLt   → light tint of accent (chip backgrounds)
//    accentMd   → medium tint of accent (borders, dots in lists)
//    accentDark → darker shade of accent (button hover)
// ─────────────────────────────────────────────────────────────────────────────
export const THEME = {
  bg: "#FAFAFA",         // warm editorial off-white
  text: "#111111",       // ink black
  secondary: "#666666",
  accent: "#111111",     // monotone, elegant accent
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
  availability: null, // Removed for an editorial feel
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 3. SOCIALS & CONTACT LINKS
//    Set any to null to hide that link in the Contact section.
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
//    headline → big text (wrap with \n for line breaks)
//    sub      → paragraph below headline
//    stats    → the 3-4 trust numbers shown below the CTAs
// ─────────────────────────────────────────────────────────────────────────────
export const HERO = {
  headline: [
    "I build products",
    "for the messy space",
    "between people",
    "and systems."
  ],
  heroHeadlineRaw: null as string | null, 

  sub: "Somewhere between wireframes, APIs, and LLMs, I found my work. I exist in the tension of disciplines, removing the translation layer so teams can ship what matters.",

  cta1Label: "Read the story",
  cta1Href: "/about",
  cta2Label: "View work",
  cta2Href: "#work",

  stats: [], // Removed for editorial feel
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 5. IMAGES
//    How to use:
//      - Local: drop file in /public/images/ → use path "/images/filename.png"
//      - External: paste a full https:// URL
//      - Not ready yet: use null → shows a gradient placeholder automatically
//
//    See /public/images/README.md for the full naming guide.
// ─────────────────────────────────────────────────────────────────────────────
export const IMAGES = {
  // ── Your profile / hero photo ──────────────────────────────────────────────
  // hero: null as string | null,
  hero: "/images/hero.jpg",
  // hero: "https://github.com/Anubhx/Portfolio/blob/0f942aaf194f46e97b58e83eeedcb567bc24fac0/portfolio/public/HeroImage.jpg",

  // ── College / school logos ─────────────────────────────────────────────────
  uem: null as string | null,
  // uem: "/images/uem_logo.png",

  school1: null as string | null,
  // school1: "/images/school1.png",

  school2: null as string | null,
  // school2: "/images/school2.png",

  // ── Company logos (used in Experience section) ─────────────────────────────
  ltimindtree: "https://images.seeklogo.com/logo-png/61/1/ltimindtree-logo-png_seeklogo-613672.png",
  vedantu: "https://yt3.ggpht.com/a/AATXAJyMa1Do0gFwcjdCWGAOMekO0n6n6tcxO1EvDQ=s900-c-k-c0xffffffff-no-rj-mo",
  ecstasia: null as string | null,
  // ecstasia: "/images/ecstasia.png",

  // ── Project screenshots ────────────────────────────────────────────────────
  // Drop your screenshots in /public/images/ and update the paths below.
  companylens: null as string | null,
  // companylens: "/images/project-companylens.png",

  lexai: null as string | null,
  // lexai: "/images/project-lexai.png",

  flowwise: null as string | null,
  // flowwise: "/images/project-flowwise.png",

  languagetalk: "https://mir-s3-cdn-cf.behance.net/projects/404/language_talk.jpg" as string | null,
  // languagetalk: "/images/project-languagetalk.png",

  smartAts: "https://github.com/Anubhx/Smart-ATS-Analyzer/raw/main/image01.png?raw=true" as string | null,

  airbnbClone: "https://github.com/Anubhx/AirBnB-Clone-using-React-Native-and-Expo-/blob/main/screenshots/PIC01.png?raw=true" as string | null,

  employeePro: null as string | null,
  // employeePro: "/images/project-employee.png",

  virtuStore: "https://mir-s3-cdn-cf.behance.net/projects/404/68fabb168030969.Y3JvcCw0MzIwLDMzNzksMCww.png" as string | null,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 6. PROJECTS (Case Studies shown on homepage)
//    slug       → URL: /work/[slug]  (also maps to content/work/[slug].mdx)
//    title      → Project name
//    type       → Small label above title (e.g. "AI Tool · Legal Tech")
//    description → One-liner
//    image      → Use IMAGES.xxx or a URL string, or null for gradient
//    stack      → Tech / discipline tags
//    highlights → Bullet points on the card (max 4 recommended)
//    role       → Your role on this project
//    accentColor → Top border accent line color per card
//    year       → Year string
//    featured   → Show on homepage (set false to hide)
//    behanceUrl → Optional Behance link (for design projects)
//    githubUrl  → Optional GitHub link
//    liveUrl    → Optional live demo link
// ─────────────────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    slug: "companylens",
    title: "CompanyLens",
    type: "Agentic AI · B2B Platform",
    description:
      "Multi-agent due diligence automation that turns hours of analyst work into minutes. A three-agent architecture orchestrates retrieval, reasoning, and synthesis.",
    image: IMAGES.companylens,
    stack: ["LangGraph", "FastAPI", "Gemini", "ChromaDB", "Next.js"],
    highlights: [
      "Three-agent orchestration: Research Agent, Analysis Agent, Report Agent",
      "PDF intelligence with semantic chunking and real-time vector retrieval",
      "Due diligence reports generated in under 90 seconds vs. 3+ hours manually",
      "Production deployment with streaming responses and persistent memory",
    ],
    role: "Product Designer + AI Engineer + Full-stack",
    accentColor: THEME.accent,
    year: "2024",
    featured: true,
    githubUrl: null,
    liveUrl: null,
    behanceUrl: null,
  },
  {
    slug: "lexai",
    title: "LexAI",
    type: "AI Tool · Legal Tech",
    description:
      "Contract analyzer that reads what lawyers dread. Upload a contract; get risk scores, flagged clauses, and semantic answers — without reading a single page.",
    image: IMAGES.lexai,
    stack: ["Next.js", "Gemini", "RAG", "Supabase", "pgvector"],
    highlights: [
      "AI risk scoring across 14 contract clause categories",
      "Semantic search over full contract text — ask questions, get grounded answers",
      "Reduced average contract review time by 70%+ in user testing",
      "Designed end-to-end UX: upload flow, risk dashboard, clause navigator",
    ],
    role: "Product Designer + AI Engineer",
    accentColor: "#2d6a4f",
    year: "2024",
    featured: true,
    githubUrl: null,
    liveUrl: null,
    behanceUrl: null,
  },
  {
    slug: "flowwise",
    title: "FlowWise",
    type: "Mobile App · FinTech",
    description:
      "AI personal finance companion. Tracks spending, learns patterns, and nudges towards better decisions — before you make a bad one.",
    image: IMAGES.flowwise,
    stack: ["React Native", "Expo", "Figma", "SQLite", "Gemini"],
    highlights: [
      "Full design system: 40+ components, 3 themes, motion specs",
      "Mobile-first UX: gesture navigation, native transitions, offline-first",
      "AI spending nudges personalized to user behavior patterns",
      "End-to-end ownership: research → Figma → code → App Store",
    ],
    role: "Product Designer + Mobile Engineer",
    accentColor: "#7b5ea7",
    year: "2023",
    featured: true,
    githubUrl: null,
    liveUrl: null,
    behanceUrl: null,
  },
  {
    slug: "languagetalk",
    title: "LanguageTalk",
    type: "UX Design · EdTech",
    description:
      "Learning a language shouldn't feel like studying. A conversational AI experience designed around the psychology of habit and natural recall.",
    image: IMAGES.languagetalk,
    stack: ["UX Research", "IA", "Figma", "Prototyping"],
    highlights: [
      "12-person user research: interviews, diary studies, competitive analysis",
      "Learning loop design: spaced repetition + conversational AI + social",
      "Full information architecture and navigation redesign",
      "High-fidelity Figma prototype: 60+ screens, micro-interaction specs",
    ],
    role: "Lead UX Designer + Researcher",
    accentColor: "#c97c2b",
    year: "2023",
    featured: true,
    githubUrl: "https://www.behance.net/gallery/167171313/Language-Talk-(-Language-learning-App-)-Case-Study",
    liveUrl: null,
    behanceUrl: "https://www.behance.net/gallery/167171313/Language-Talk-(-Language-learning-App-)-Case-Study",
  },
  // ── Extra projects (NOT on homepage — set featured: false) ─────────────────
  // Add more here; they won't show unless you set featured: true
  {
    slug: "smart-ats",
    title: "Smart ATS Analyzer",
    type: "AI Tool · Python",
    description:
      "Automated resume evaluation tool using Google Gemini Pro — analyses keywords, scores match, generates detailed evaluation reports.",
    image: IMAGES.smartAts,
    stack: ["Python", "Streamlit", "Gemini Pro", "PyPDF2"],
    highlights: [
      "Resume keyword match scoring against any job description",
      "AI-generated evaluation report with improvement suggestions",
      "PDF upload and text extraction pipeline",
      "Deployed on Streamlit Cloud — publicly accessible",
    ],
    role: "AI Engineer",
    accentColor: "#e76f51",
    year: "2024",
    featured: false,   // ← set true to show on homepage
    githubUrl: "https://github.com/Anubhx/Smart-ATS-Analyzer",
    liveUrl: "https://smart-ats-analyzer-by-anubhav.streamlit.app/",
    behanceUrl: null,
  },
  {
    slug: "airbnb-clone",
    title: "AirBnB Clone",
    type: "Mobile App · React Native",
    description:
      "Full AirBnB clone with Clerk auth, OAuth, mapping, and advanced UI components built in React Native + Expo.",
    image: IMAGES.airbnbClone,
    stack: ["React Native", "Expo", "TypeScript", "Clerk"],
    highlights: [
      "Clerk authentication with OAuth (Google, Apple)",
      "Map integration with property markers and clustering",
      "Bottom sheet modals and gesture-driven navigation",
      "Faithful AirBnB UI replica down to micro-interactions",
    ],
    role: "Mobile Engineer",
    accentColor: "#e63946",
    year: "2024",
    featured: false,
    githubUrl: "https://github.com/Anubhx/AirBnB-Clone-using-React-Native-and-Expo-",
    liveUrl: null,
    behanceUrl: null,
  },
  {
    slug: "virtustore",
    title: "VirtuStore",
    type: "UX Design · AR Shopping",
    description:
      "Mobile AR shopping app — users can view products in their space and virtually walk through an entire store without visiting physically.",
    image: IMAGES.virtuStore,
    stack: ["Figma", "Miro", "UI/UX Design", "Wireframing"],
    highlights: [
      "AR product visualization enabling informed purchase decisions",
      "In-store AR navigation letting users explore the full store virtually",
      "End-to-end UX case study: research, IA, wireframes, prototype",
      "Published on Behance",
    ],
    role: "Lead UX Designer",
    accentColor: "#457b9d",
    year: "2023",
    featured: true,
    githubUrl: null,
    liveUrl: null,
    behanceUrl: "https://www.behance.net/gallery/168030969/VirtuStore-AR-Shopping-App",
  },
  {
    slug: "employeepro",
    title: "EmployeePro",
    type: "Desktop App · Java",
    description:
      "Workforce management system — dynamic employee ID generation, MySQL backend, intuitive Swing UI for organisational efficiency.",
    image: IMAGES.employeePro,
    stack: ["Java", "MySQL", "Swing"],
    highlights: [
      "Dynamic employee ID auto-generation",
      "MySQL database with full CRUD operations",
      "Swing UI designed for non-technical HR staff",
      "Robust error handling and connection pooling",
    ],
    role: "Full-stack Engineer",
    accentColor: "#6b705c",
    year: "2023",
    featured: false,
    githubUrl: "https://github.com/Anubhx/-EmployeeManagementSystem/tree/master",
    liveUrl: null,
    behanceUrl: null,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 7. EXPERIENCE (timeline — shown in Experience section)
//    isCurrent → fills the dot solid blue and is listed first
//    logo      → use IMAGES.xxx for company logo (shown as avatar if set)
// ─────────────────────────────────────────────────────────────────────────────
export const EXPERIENCES = [
  {
    company: "LTIMindtree",
    role: "Graduate Engineer Trainee",
    period: "June 2025 — Present",
    description:
      "Working as a Graduate Engineer Trainee, focusing on software development, real-time project training, and mastering technologies such as PostgreSQL, Java, and cloud platforms like Azure. Contributing to collaborative projects and enhancing problem-solving, adaptability, and technical proficiency.",
    tags: ["Python", "PostgreSQL", "Azure", "Java", "Team Collaboration"],
    isCurrent: true,
    logo: IMAGES.ltimindtree,
  },
  {
    company: "Ecstasia",
    role: "UX Designer",
    period: "2022",
    description:
      "Led product design for a consumer entertainment platform. Took the experience from zero research to a live product — discovery, design, testing, and iteration. Designed core engagement loops and onboarding experiences.",
    tags: ["User Research", "Product Design", "Figma", "Prototyping"],
    isCurrent: false,
    logo: IMAGES.ecstasia,
  },
  {
    company: "Vedantu",
    role: "Web Developer Intern",
    period: "Jan 2023 — June 2023",
    description:
      "Enhanced website functionality and UI/UX using JavaScript, CSS, and modern frameworks, creating engaging animations and optimising team collaboration and adaptability to current web development trends.",
    tags: ["UX/UI Design", "JavaScript", "CSS"],
    isCurrent: false,
    logo: IMAGES.vedantu,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 8. EDUCATION
//    logo → use IMAGES.xxx or a URL string
// ─────────────────────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    id: 0,
    school: "University of Engineering & Management (UEM), Kolkata",
    degree: "B.Tech — Computer Science and Engineering",
    date: "Oct 2021 – Sep 2025",
    grade: "8.1 CGPA",
    description:
      "Coursework: Data Structures, Algorithms, OOP, DBMS, Operating Systems, Computer Networks, and more.",
    logo: IMAGES.uem,
  },
  {
    id: 1,
    school: "S.S. Govt. School, Muzaffarpur",
    degree: "BSEB (XII) — Science",
    date: "Apr 2019 – Apr 2021",
    grade: "70.2%",
    description: "Studied Science with Physics, Chemistry, and Mathematics.",
    logo: IMAGES.school1,
  },
  {
    id: 2,
    school: "Asian School, Muzaffarpur",
    degree: "CBSE (X) — Science with Computer",
    date: "Apr 2017 – Apr 2019",
    grade: "75.3%",
    description: "Studied Science with Computer Science.",
    logo: IMAGES.school2,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 9. SKILLS ECOSYSTEM
//    iconPath → SVG path for the cluster icon (Heroicons stroke paths)
//    skills   → list of skill strings shown in the cluster card
// ─────────────────────────────────────────────────────────────────────────────
export const SKILL_CLUSTERS = [
  {
    name: "UX Design",
    iconPath:
      "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
    skills: ["User Research", "Information Architecture", "Interaction Design", "Usability Testing", "Figma"],
  },
  {
    name: "Frontend",
    iconPath:
      "M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3",
    skills: ["React / Next.js", "TypeScript", "React Native", "Tailwind CSS", "Design Systems"],
  },
  {
    name: "Agentic AI",
    iconPath:
      "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z",
    skills: ["LangGraph", "RAG Pipelines", "Gemini / GPT APIs", "ChromaDB / pgvector", "Prompt Engineering"],
  },
  {
    name: "Research",
    iconPath:
      "M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
    skills: ["User Interviews", "Diary Studies", "Journey Mapping", "Jobs to be Done", "Competitive Analysis"],
  },
  {
    name: "Product",
    iconPath:
      "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5",
    skills: ["Product Strategy", "Roadmapping", "Metrics & Analytics", "Stakeholder Comms", "Agile / Scrum"],
  },
  {
    name: "Tools",
    iconPath:
      "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z",
    skills: ["Figma", "Adobe XD", "Miro", "Android Studio", "VS Code"],
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 10. PROCESS STEPS
// ─────────────────────────────────────────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    number: "01",
    label: "Discover",
    description:
      "User research, stakeholder interviews, and competitive intelligence to understand the real problem.",
  },
  {
    number: "02",
    label: "Define",
    description:
      "Synthesize findings into a clear problem statement. Align on success metrics before touching a pixel.",
  },
  {
    number: "03",
    label: "Design",
    description:
      "IA, flows, wireframes, visual design, and a component system built for engineers, not just Figma.",
  },
  {
    number: "04",
    label: "Build",
    description:
      "Frontend implementation with the design system. No handoff translation loss — I wrote the spec.",
  },
  {
    number: "05",
    label: "Intelligence",
    description:
      "Layer AI where it earns its place. Agentic pipelines, RAG, model routing — always justified by real user value.",
  },
  {
    number: "06",
    label: "Ship",
    description:
      "Deploy with confidence. Instrument, observe, and iterate. A product is never done — only better.",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 11. PHILOSOPHY / THINKING CARDS
// ─────────────────────────────────────────────────────────────────────────────
export const PHILOSOPHY_CARDS = [
  {
    number: "Principle 01",
    title: "Complexity is a design failure, not a product requirement.",
    body: "Every workflow that confuses users once existed as someone's logical decision. Good design isn't adding features — it's removing the need to explain them. When a product requires a manual, the designer hasn't finished their job. I measure success by how little users have to think.",
  },
  {
    number: "Principle 02",
    title: "AI experiences need to earn trust before they spend it.",
    body: "Generative AI is powerful and unreliable in the same breath. Users know this. The worst AI products assume competence and skip explanation. The best ones show their work, acknowledge their limits, and give users a way back. Trust is the only infrastructure that matters in AI UX.",
  },
  {
    number: "Principle 03",
    title: "Engineers who understand users build better systems.",
    body: "The gap between what a system does and what a user experiences is where most products break. Engineers who have sat in user interviews write different code. They make different tradeoffs. They catch the edge cases that matter. Technical literacy and human empathy are not a tradeoff — they're the stack.",
  },
  {
    number: "Principle 04",
    title: "Products should feel human — even when built by machines.",
    body: "The question isn't whether to use AI. The question is whether users can forget that you did. The best AI integrations disappear. They make the hard thing easy without announcing it. Invisible intelligence is the hardest design problem — and the only one worth solving well.",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 12. TESTIMONIALS
//    isPlaceholder → shows a "Placeholder" badge. Remove when using real quotes.
//    avatarUrl     → optional photo URL for the person (null = shows initials)
// ─────────────────────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    quote:
      "Anubhav's rare ability to think in both UX and engineering layers meant we shipped in half the time with none of the back-and-forth that usually kills momentum.",
    name: "Ravi Kumar",
    role: "Engineering Lead · Placeholder Company",
    initials: "RK",
    avatarUrl: null as string | null,
    isPlaceholder: true, // ← remove this line when you have a real quote
  },
  {
    quote:
      "He doesn't just design a feature — he asks why the feature needs to exist. That question alone saved us three months of building the wrong thing.",
    name: "Priya Mehta",
    role: "Product Manager · Placeholder Company",
    initials: "PM",
    avatarUrl: null as string | null,
    isPlaceholder: true,
  },
  {
    quote:
      "The AI pipeline he built was sophisticated. The UX that sat on top of it made it feel simple. That combination is genuinely uncommon.",
    name: "Aditya Sharma",
    role: "CTO · Placeholder Company",
    initials: "AS",
    avatarUrl: null as string | null,
    isPlaceholder: true,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 13. FOOTER
// ─────────────────────────────────────────────────────────────────────────────
export const FOOTER = {
  tagline: "Designed and built with intention.",
  location: BIO.location,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// DERIVED EXPORTS
// These are re-exported in the same shape that the components expect,
// so all existing component imports still work — just sourced from here.
// ─────────────────────────────────────────────────────────────────────────────

// For backwards compatibility with components that import from @/lib/projects
export const projects = PROJECTS.map((p) => ({
  slug: p.slug,
  title: p.title,
  type: p.type,
  description: p.description,
  image: "image" in p ? p.image : null,
  stack: [...p.stack],
  highlights: [...p.highlights],
  role: p.role,
  accentColor: p.accentColor,
  year: p.year,
  featured: p.featured,
  liveUrl: p.liveUrl,
  githubUrl: p.githubUrl,
  behanceUrl: p.behanceUrl,
}));

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

// For backwards compatibility with components that import from @/lib/content
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
