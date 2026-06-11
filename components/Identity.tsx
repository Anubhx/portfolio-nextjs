import VennDiagram from "./VennDiagram";

const chips = [
  { label: "UX Research", active: true },
  { label: "Product Thinking", active: true },
  { label: "Interface Design", active: true },
  { label: "Design Systems", active: false },
  { label: "Frontend Engineering", active: false },
  { label: "Agentic AI", active: false },
  { label: "LangGraph", active: false },
  { label: "RAG Pipelines", active: false },
];

export default function Identity() {
  return (
    <section id="identity" aria-labelledby="identity-heading">
      <div className="container">
        <div className="identity-grid">
          {/* Text column */}
          <div className="identity-text">
            <div className="section-label" aria-hidden="true">
              Identity
            </div>
            <h2 id="identity-heading">
              The intersection
              <br />
              is the product.
            </h2>
            <p style={{ marginBottom: "1.25rem" }}>
              Most builders live on one side of a boundary. Designers hand off
              to engineers. Engineers hand off to AI teams. I work at the center
              — where all three converge.
            </p>
            <p style={{ marginBottom: "1.25rem" }}>
              This means fewer lost ideas, fewer misunderstood requirements,
              fewer broken experiences. I don&apos;t just translate between
              teams. I eliminate the translation layer.
            </p>
            <p>
              When UX thinking, engineering precision, and AI capability share
              the same mind, products ship faster, feel better, and behave
              smarter.
            </p>

            <div
              className="identity-chips"
              role="list"
              aria-label="Core capabilities"
            >
              {chips.map((chip) => (
                <span
                  key={chip.label}
                  className={`chip${chip.active ? " active" : ""}`}
                  role="listitem"
                >
                  {chip.label}
                </span>
              ))}
            </div>
          </div>

          {/* Venn Diagram */}
          <VennDiagram />
        </div>
      </div>
    </section>
  );
}
