"use client";

import { motion } from "framer-motion";
import { fadeUpVariants, staggerContainer } from "@/lib/tokens";
import Link from "next/link";

const RECENT_NOTES = [
  { slug: "ai-experiences-trust", title: "Why AI experiences need trust." },
  { slug: "engineers-users", title: "Why engineers should talk to users." },
  { slug: "curse-of-interests", title: "The curse of too many interests." },
];

export default function NotesPreview() {
  return (
    <section className="container py-32 border-t border-border">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="editorial-meta mb-16">Notes &mdash; Tiny Essays</h2>
        
        <div className="flex flex-col gap-8">
          {RECENT_NOTES.map((note) => (
            <motion.div key={note.slug} variants={fadeUpVariants}>
              <Link href={`/notes/${note.slug}`} className="group flex items-center justify-between border-b border-border pb-8">
                <h3 className="font-display text-2xl md:text-3xl text-foreground group-hover:opacity-60 transition-opacity">
                  {note.title}
                </h3>
                <span className="font-sans text-secondary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                  &rarr;
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div variants={fadeUpVariants} className="mt-16">
          <Link href="/notes" className="btn-secondary">
            View all notes
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
