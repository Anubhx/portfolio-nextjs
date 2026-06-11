import { BIO, SOCIALS } from "@/lib/constants";

const contactLinks = [
  {
    href: `mailto:${BIO.email}`,
    label: `Send email to ${BIO.name}`,
    text: "Email",
    icon: (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
        style={{ width: 16, height: 16 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  ...(SOCIALS.linkedin
    ? [
        {
          href: SOCIALS.linkedin,
          label: "LinkedIn profile (opens in new tab)",
          text: "LinkedIn",
          external: true,
          icon: (
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              style={{ width: 16, height: 16 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>
          ),
        },
      ]
    : []),
  ...(SOCIALS.github
    ? [
        {
          href: SOCIALS.github,
          label: "GitHub profile (opens in new tab)",
          text: "GitHub",
          external: true,
          icon: (
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              style={{ width: 16, height: 16 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
              />
            </svg>
          ),
        },
      ]
    : []),
  ...(SOCIALS.behance
    ? [
        {
          href: SOCIALS.behance,
          label: "Behance portfolio (opens in new tab)",
          text: "Behance",
          external: true,
          icon: (
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              style={{ width: 16, height: 16 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          ),
        },
      ]
    : []),
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <span className="contact-eyebrow">Let&apos;s build something</span>

        <h2 className="contact-headline" id="contact-heading">
          Have an idea that deserves to be built well?
        </h2>

        <p className="contact-sub">
          I&apos;m most useful when the problem is still ambiguous — before the
          spec is written and after the idea is more than a pitch deck. That&apos;s
          where I work best.
        </p>

        <div
          className="contact-links"
          role="list"
          aria-label="Contact links"
        >
          {contactLinks.map((link) => (
            <a
              key={link.text}
              href={link.href}
              className="contact-link"
              aria-label={link.label}
              role="listitem"
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.icon}
              {link.text}
            </a>
          ))}
        </div>

        <p className="contact-location">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
            style={{ width: 14, height: 14 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          Based in {BIO.location} {BIO.locationNote ? `— ${BIO.locationNote}` : ""}
        </p>
      </div>
    </section>
  );
}
