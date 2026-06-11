import { experiences } from "@/lib/content";

export default function ExperienceTimeline() {
  return (
    <section id="experience" aria-labelledby="experience-heading">
      <div className="container">
        <div className="experience-grid">
          <div className="experience-intro">
            <div className="section-label" aria-hidden="true">
              Experience
            </div>
            <h2 id="experience-heading">
              Where I&apos;ve
              <br />
              done this.
            </h2>
            <p style={{ marginTop: "1rem", fontSize: "0.9375rem" }}>
              Each role expanded what I could own. Each company sharpened a
              different edge.
            </p>
          </div>

          <div
            className="timeline"
            role="list"
            aria-label="Professional experience timeline"
          >
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`timeline-item${exp.isCurrent ? " current" : ""}`}
                role="listitem"
              >
                <div className="timeline-dot" aria-hidden="true" />
                <p className="timeline-period">{exp.period}</p>
                <p className="timeline-company">{exp.company}</p>
                <p className="timeline-role">{exp.role}</p>
                <p className="timeline-desc">{exp.description}</p>
                <div
                  className="timeline-tags"
                  aria-label="Technologies and responsibilities"
                >
                  {exp.tags.map((tag) => (
                    <span key={tag} className="timeline-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
