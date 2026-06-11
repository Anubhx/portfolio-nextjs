"use client";

import { motion } from "framer-motion";
import { fadeUpVariants, staggerContainer } from "@/lib/tokens";
import { HERO } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="container fade-in">
      <div className="hero-layout">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {/* Headline */}
          <motion.h1
            id="hero-heading"
            className="hero-headline"
            variants={fadeUpVariants}
          >
            {HERO.headline.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          {/* Sub */}
          <motion.p className="hero-sub" variants={fadeUpVariants}>
            {HERO.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero-actions" variants={fadeUpVariants}>
            <a href={HERO.cta1Href} className="btn-primary">
              {HERO.cta1Label}
            </a>
            <a href={HERO.cta2Href} className="btn-secondary">
              {HERO.cta2Label}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
