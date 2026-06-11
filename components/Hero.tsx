"use client";

import { motion } from "framer-motion";
import { fadeUpVariants, staggerContainer } from "@/lib/tokens";
import { HERO, BIO, IMAGES } from "@/lib/constants";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="container">
        <div className={`hero-layout ${IMAGES.hero ? "has-image" : ""}`}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hero-content"
          >
          {/* Availability badge */}
          {BIO.availability && (
            <motion.div
              variants={fadeUpVariants}
              className="hero-available"
              role="status"
              aria-label="Availability status"
            >
              <span className="hero-dot" aria-hidden="true" />
              {BIO.availability}
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            className="hero-headline"
            variants={fadeUpVariants}
          >
            {HERO.heroHeadlineRaw ? (
              <span dangerouslySetInnerHTML={{ __html: HERO.heroHeadlineRaw }} />
            ) : (
              <>
                {HERO.headline[0]}{" "}
                <span className="accent-word">{HERO.headline[1]}</span>{" "}
                {HERO.headline[2]}
                <br />
                {HERO.headline[3]}
                <br />
                {HERO.headline[4]}
                <br />
                {HERO.headline[5]}
              </>
            )}
          </motion.h1>

          {/* Sub */}
          <motion.p className="hero-sub" variants={fadeUpVariants}>
            {HERO.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero-actions" variants={fadeUpVariants}>
            <a href={HERO.cta1Href} className="btn btn-primary">
              {HERO.cta1Label}
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
                style={{ width: 14, height: 14 }}
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
            <a href={HERO.cta2Href} className="btn btn-secondary">
              {HERO.cta2Label}
            </a>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            className="hero-trust"
            variants={fadeUpVariants}
            aria-label="Key stats"
          >
            {HERO.stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4 sm:gap-5">
                {i > 0 && (
                  <div className="trust-divider" aria-hidden="true" />
                )}
                <div className="trust-item">
                  <span className="trust-val">{stat.value}</span>
                  <span className="trust-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {IMAGES.hero && (
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="hero-image-wrapper"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={IMAGES.hero} 
              alt={`${BIO.name} — Profile`} 
              className="hero-img" 
            />
          </motion.div>
        )}
        </div>
      </div>
    </section>
  );
}
