import type { Project } from "@/types/project";
import { projects } from "./projects";
import { BIO, SOCIALS } from "./constants";

export interface StructuredDataPerson {
  "@context": string;
  "@type": string;
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  sameAs: string[];
  address: {
    "@type": string;
    addressLocality: string;
    addressCountry: string;
  };
  knowsAbout: string[];
}

export interface StructuredDataWebsite {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
  author: { "@type": string; name: string };
}

export interface StructuredDataProject {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  creator: { "@type": string; name: string };
  dateCreated: string;
  url: string;
  keywords: string[];
}

export interface StructuredDataBreadcrumb {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://anubhavraj.vercel.app";

export function personSchema(): StructuredDataPerson {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: BIO.name,
    jobTitle: BIO.title,
    description:
      `${BIO.currentRole} at ${BIO.currentCompany}. I combine UX Research, Product Thinking, Interface Design, and Agentic AI Engineering to bridge Research → Design → Code → Intelligence.`,
    url: SITE_URL,
    sameAs: [
      SOCIALS.linkedin,
      SOCIALS.github,
      SOCIALS.behance,
    ].filter((s): s is string => !!s),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressCountry: "IN",
    },
    knowsAbout: [
      "UX Research",
      "Product Design",
      "Frontend Engineering",
      "Agentic AI",
      "LangGraph",
      "RAG Pipelines",
      "Next.js",
      "TypeScript",
      "Figma",
      "Design Systems",
    ],
  };
}

export function websiteSchema(): StructuredDataWebsite {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${BIO.name} — Portfolio`,
    url: SITE_URL,
    description:
      `${BIO.title}. UX Research, Product Thinking, Frontend Engineering, and Agentic AI.`,
    author: {
      "@type": "Person",
      name: BIO.name,
    },
  };
}

export function projectSchema(project: Project): StructuredDataProject {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: {
      "@type": "Person",
      name: BIO.name,
    },
    dateCreated: project.year,
    url: `${SITE_URL}/work/${project.slug}`,
    keywords: project.stack,
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; href: string }>
): StructuredDataBreadcrumb {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
