"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BIO } from "@/lib/constants";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 48);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const isHome = pathname === "/";
  const linkPrefix = isHome ? "" : "/";

  function handleNavLinkClick() {
    setMobileOpen(false);
  }

  return (
    <nav id="nav" className={scrolled ? "scrolled" : ""} role="navigation" aria-label="Primary navigation">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" aria-label={`${BIO.name} — home`}>
          {BIO.initials}
        </Link>

        <ul className="nav-links" role="list">
          <li>
            <a href={isHome ? "#work" : "/#work"} onClick={handleNavLinkClick}>
              Work
            </a>
          </li>
          <li>
            <a href={isHome ? "#process" : "/#process"} onClick={handleNavLinkClick}>
              Process
            </a>
          </li>
          <li>
            <a href={isHome ? "#experience" : "/#experience"} onClick={handleNavLinkClick}>
              Experience
            </a>
          </li>
          <li>
            <a href={isHome ? "#philosophy" : "/#philosophy"} onClick={handleNavLinkClick}>
              Thinking
            </a>
          </li>
        </ul>

        <div className="nav-cta-wrap">
          <a
            href={isHome ? "#contact" : "/#contact"}
            className="nav-cta"
            onClick={handleNavLinkClick}
          >
            Let&apos;s talk
          </a>
        </div>

        <button
          className="nav-hamburger"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span
            style={{
              transform: mobileOpen
                ? "translateY(6.5px) rotate(45deg)"
                : undefined,
            }}
          />
          <span style={{ opacity: mobileOpen ? 0 : 1 }} />
          <span
            style={{
              transform: mobileOpen
                ? "translateY(-6.5px) rotate(-45deg)"
                : undefined,
            }}
          />
        </button>
      </div>

      <nav
        id="mobile-menu"
        className={`nav-mobile${mobileOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
      >
        <a href={isHome ? "#work" : "/#work"} onClick={handleNavLinkClick}>
          Work
        </a>
        <a href={isHome ? "#process" : "/#process"} onClick={handleNavLinkClick}>
          Process
        </a>
        <a href={isHome ? "#experience" : "/#experience"} onClick={handleNavLinkClick}>
          Experience
        </a>
        <a href={isHome ? "#philosophy" : "/#philosophy"} onClick={handleNavLinkClick}>
          Thinking
        </a>
        <a href={isHome ? "#contact" : "/#contact"} onClick={handleNavLinkClick}>
          Let&apos;s talk →
        </a>
      </nav>
    </nav>
  );
}
