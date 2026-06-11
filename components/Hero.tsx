"use client";

import { motion } from "framer-motion";
import { fadeUpVariants, staggerContainer } from "@/lib/tokens";

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="container fade-in flex items-center justify-start min-h-[95vh] pt-32 pb-48">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-8 max-w-5xl"
      >
        {/* Headline */}
        <motion.h1
          id="hero-heading"
          className="hero-headline"
          variants={fadeUpVariants}
        >
          <span className="block mb-6">Anubhav Raj</span>
          <span className="block text-secondary">I build products for the messy space between people and systems.</span>
        </motion.h1>
      </motion.div>
    </section>
  );
}
