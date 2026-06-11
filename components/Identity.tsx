"use client";

import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/tokens";

export default function Identity() {
  return (
    <section className="container py-48">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeUpVariants}
        className="max-w-4xl mx-auto"
      >
        <div className="flex flex-col gap-12 font-display text-3xl md:text-5xl text-foreground leading-tight">
          <p>UX designer.</p>
          <p>Software engineer.</p>
          <p>AI builder.</p>
          <p className="text-secondary mt-12">None of those titles ever felt complete.</p>
          <p className="font-sans text-xl md:text-2xl text-secondary leading-relaxed mt-12">
            Most teams move ideas through layers of translation. <br className="hidden md:block"/>
            I spent years trying to remove them.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
