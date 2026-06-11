import { skillClusters } from "@/lib/content";

export default function SkillsEcosystem() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <div
          className="skills-header"
          style={{ textAlign: "center", maxWidth: "580px", margin: "0 auto 4rem" }}
        >
          <div
            className="section-label"
            aria-hidden="true"
            style={{ justifyContent: "center" }}
          >
            Skills
          </div>
          <h2 id="skills-heading">
            Not a list of buzzwords.
            <br />
            An ecosystem.
          </h2>
          <p style={{ fontSize: "0.9375rem", marginTop: "0.75rem" }}>
            Every capability connects to the others. That&apos;s the point.
          </p>
        </div>

        <div
          className="skills-grid"
          role="list"
          aria-label="Skills grouped by category"
        >
          {skillClusters.map((cluster) => (
            <div key={cluster.name} className="skills-cluster" role="listitem">
              <div className="skills-cluster-icon" aria-hidden="true">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="var(--accent)"
                  style={{ width: 18, height: 18 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={cluster.iconPath}
                  />
                </svg>
              </div>
              <p className="skills-cluster-name">{cluster.name}</p>
              <div className="skills-list">
                {cluster.skills.map((skill) => (
                  <p key={skill} className="skill-item">
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
