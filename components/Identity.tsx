"use client";

import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/tokens";

export default function Identity() {
  return (
    <section className="container py-32 border-t border-border">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeUpVariants}
        className="grid grid-cols-1 md:grid-cols-12 gap-12"
      >
        <div className="md:col-span-4">
          <h2 className="editorial-meta">The Space Between</h2>
        </div>
        <div className="md:col-span-8 flex flex-col gap-8 max-w-2xl">
          <p className="editorial-body text-2xl md:text-3xl text-foreground font-serif leading-snug">
            Most people specialize. I connect disciplines. I have spent years existing between categories.
          </p>
          <div className="flex flex-col gap-4 editorial-body">
            <p>Too technical for designers.</p>
            <p>Too design-focused for engineers.</p>
            <p>Too product-minded for AI specialists.</p>
          </div>
          <p className="editorial-body">
            That tension became my strength. I don't translate between teams. I remove the translation layer entirely.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
