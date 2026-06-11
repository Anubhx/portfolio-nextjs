import { BIO, FOOTER } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-text">
            © {year} {BIO.name}. {FOOTER.tagline}
          </p>
          <p className="footer-text">{FOOTER.location}</p>
        </div>
      </div>
    </footer>
  );
}
