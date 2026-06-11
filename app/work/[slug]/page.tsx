import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudyBySlug, getAllCaseStudySlugs } from "@/lib/mdx";
import { getProjectBySlug } from "@/lib/projects";
import { breadcrumbSchema, projectSchema } from "@/lib/structured-data";
import JsonLd from "@/components/JsonLd";
import CaseStudyContent from "@/components/CaseStudyContent";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://anubhavraj.vercel.app";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  const { frontmatter } = caseStudy;

  return {
    title: `${frontmatter.title} Case Study`,
    description: frontmatter.description,
    openGraph: {
      title: `${frontmatter.title} — Case Study | Anubhav Raj`,
      description: frontmatter.description,
      url: `${SITE_URL}/work/${slug}`,
      images: [
        {
          url: `${SITE_URL}/work/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${frontmatter.title} case study by Anubhav Raj`,
        },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/work/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const project = getProjectBySlug(slug);
  const { frontmatter, content } = caseStudy;

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/#work" },
    { name: frontmatter.title, href: `/work/${slug}` },
  ];

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      {project && <JsonLd data={projectSchema(project)} />}

      {/* Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <ol
            role="list"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              listStyle: "none",
              fontSize: "0.8125rem",
              color: "var(--secondary)",
              paddingTop: "5rem",
            }}
          >
            {breadcrumbs.map((item, index) => (
              <li
                key={item.href}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                {index > 0 && (
                  <span aria-hidden="true" style={{ color: "var(--border)" }}>
                    /
                  </span>
                )}
                {index < breadcrumbs.length - 1 ? (
                  <Link
                    href={item.href}
                    style={{ color: "var(--secondary)" }}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span
                    aria-current="page"
                    style={{ color: "var(--text)", fontWeight: 500 }}
                  >
                    {item.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Case Study Hero */}
      <section className="case-study-hero">
        <div className="container">
          {/* Back link */}
          <Link href="/#work" className="case-study-back">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
              style={{ width: 14, height: 14 }}
            >
              <path d="M13 8H3M7 4L3 8l4 4" />
            </svg>
            Back to work
          </Link>

          {/* Accent bar */}
          <div
            className="case-study-accent-bar"
            style={{ background: frontmatter.accentColor }}
            aria-hidden="true"
          />

          {/* Type label */}
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: frontmatter.accentColor,
              marginBottom: "1rem",
            }}
          >
            {frontmatter.type}
          </p>

          {/* Title */}
          <h1 style={{ marginBottom: "1.25rem" }}>{frontmatter.title}</h1>

          {/* Description */}
          <p
            className="lead"
            style={{ maxWidth: "620px", marginBottom: "2rem" }}
          >
            {frontmatter.description}
          </p>

          {/* Meta grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "2rem",
              maxWidth: "620px",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--secondary)",
                  marginBottom: "0.375rem",
                }}
              >
                Role
              </p>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--text)",
                  fontWeight: 500,
                }}
              >
                {frontmatter.role}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--secondary)",
                  marginBottom: "0.375rem",
                }}
              >
                Year
              </p>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--text)",
                  fontWeight: 500,
                }}
              >
                {frontmatter.year}
              </p>
            </div>
            {frontmatter.duration && (
              <div>
                <p
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--secondary)",
                    marginBottom: "0.375rem",
                  }}
                >
                  Duration
                </p>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--text)",
                    fontWeight: 500,
                  }}
                >
                  {frontmatter.duration}
                </p>
              </div>
            )}
            <div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--secondary)",
                  marginBottom: "0.375rem",
                }}
              >
                Outcome
              </p>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--text)",
                  fontWeight: 500,
                }}
              >
                {frontmatter.outcome}
              </p>
            </div>
          </div>

          {/* Stack */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.375rem",
              marginTop: "1.5rem",
            }}
            aria-label="Tech stack"
          >
            {frontmatter.stack.map((tech) => (
              <span key={tech} className="stack-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Body */}
      <section className="case-study-body">
        <div className="container">
          <div style={{ maxWidth: "720px" }}>
            <CaseStudyContent content={content} />
          </div>
        </div>
      </section>

      {/* Back to work CTA */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--secondary)",
              marginBottom: "1.5rem",
            }}
          >
            More work
          </p>
          <Link href="/#work" className="btn btn-secondary">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
              style={{ width: 14, height: 14 }}
            >
              <path d="M13 8H3M7 4L3 8l4 4" />
            </svg>
            Back to all projects
          </Link>
        </div>
      </div>
    </>
  );
}
