import Link from "next/link";
import type { Project } from "@/types/project";

interface CaseStudyCardProps {
  project: Project;
}

export default function CaseStudyCard({ project }: CaseStudyCardProps) {
  return (
    <article
      className={`case-card case-card-${project.slug}`}
      style={{ "--card-accent": project.accentColor } as React.CSSProperties}
      aria-labelledby={`project-${project.slug}-title`}
    >
      {/* Top accent line via inline style for per-project colors */}
      <style>{`
        .case-card-${project.slug}::before { background: ${project.accentColor}; opacity: 1; }
        .case-card-${project.slug}:hover { box-shadow: 0 12px 32px rgba(22,22,22,0.10), 0 4px 8px rgba(22,22,22,0.04); transform: translateY(-2px); }
      `}</style>

      <Link
        href={`/work/${project.slug}`}
        className="block"
        style={{ textDecoration: "none", color: "inherit" }}
        aria-label={`View ${project.title} case study`}
      >
        <div className="case-card-inner">
          {/* Meta column */}
          <div className="case-card-meta">
            <div>
              <p className="case-card-type">{project.type}</p>
              <h3
                className="case-card-title"
                id={`project-${project.slug}-title`}
              >
                {project.title}
              </h3>
              <p className="case-card-desc">{project.description}</p>
            </div>
            <div className="case-stack" aria-label="Tech stack">
              {project.stack.map((tech) => (
                <span key={tech} className="stack-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Content column */}
          <div className="case-card-content">
            <ul className="case-highlights" aria-label="Project highlights">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <div className="case-footer">
              <p className="case-role">
                <strong>Role:</strong> {project.role}
              </p>
              <span
                className="case-link"
                aria-hidden="true"
              >
                View case study
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                  style={{ width: 14, height: 14 }}
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
