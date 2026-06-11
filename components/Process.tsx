import { processSteps } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-heading">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 5rem" }}>
          <div className="section-label" aria-hidden="true" style={{ justifyContent: "center" }}>
            How I work
          </div>
          <h2 id="process-heading">
            A process for building
            <br />
            things that last.
          </h2>
          <p style={{ color: "var(--secondary)", fontSize: "0.9375rem", marginTop: "0.75rem" }}>
            Not a waterfall. Not chaos. A deliberate loop that tightens with
            each iteration.
          </p>
        </div>

        <div
          className="process-steps"
          role="list"
          aria-label="6-phase design and engineering process"
        >
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="process-step"
              role="listitem"
            >
              <div className="process-num" aria-hidden="true">
                {step.number}
              </div>
              <p className="process-step-label">{step.label}</p>
              <p className="process-step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
