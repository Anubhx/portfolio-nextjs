import { projects } from "@/lib/projects";
import CaseStudyCard from "./CaseStudyCard";

export default function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-heading">
      <div className="container">
        <div className="work-header">
          <div className="work-header-left">
            <div className="section-label" aria-hidden="true">
              Selected Work
            </div>
            <h2 id="work-heading">
              Products I&apos;ve built,
              <br />
              end to end.
            </h2>
          </div>
          <p
            style={{
              maxWidth: "320px",
              fontSize: "0.9375rem",
              textAlign: "right",
              color: "var(--secondary)",
            }}
          >
            Each project represents full ownership — from research and design to
            deployment.
          </p>
        </div>

        <div className="case-studies" role="list" aria-label="Case studies">
          {projects.map((project) => (
            <div key={project.slug} role="listitem">
              <CaseStudyCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
