import { philosophyCards } from "@/lib/content";

export default function Philosophy() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-heading">
      <div className="container">
        <div style={{ marginBottom: "3rem" }}>
          <div className="section-label" aria-hidden="true">
            Thinking
          </div>
          <h2
            id="philosophy-heading"
            style={{ maxWidth: "600px" }}
          >
            A few things I keep coming back to.
          </h2>
        </div>

        <div className="philosophy-grid">
          {philosophyCards.map((card) => (
            <div key={card.number} className="philosophy-card">
              <p className="philosophy-num">{card.number}</p>
              <p className="philosophy-title">{card.title}</p>
              <p className="philosophy-body">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
