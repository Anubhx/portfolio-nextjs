import { testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <div>
          <div className="section-label" aria-hidden="true">
            Social Proof
          </div>
          <h2 id="testimonials-heading">
            What people say
            <br />
            when the project ships.
          </h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="testimonial-card">
              {testimonial.isPlaceholder && (
                <span
                  className="testimonial-placeholder-badge"
                  aria-label="Placeholder testimonial — to be replaced with real quote"
                >
                  Placeholder
                </span>
              )}
              <p className="testimonial-quote-mark" aria-hidden="true">
                &ldquo;
              </p>
              <p className="testimonial-text">{testimonial.quote}</p>
              <div className="testimonial-author">
                <div
                  className="testimonial-avatar"
                  aria-hidden="true"
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="testimonial-name">{testimonial.name}</p>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
