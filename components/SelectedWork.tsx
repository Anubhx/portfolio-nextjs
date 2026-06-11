"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/constants";
import { fadeUpVariants, staggerContainer } from "@/lib/tokens";
import Link from "next/link";
import ProjectActions from "./ProjectActions";

export default function SelectedWork() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="work" className="container pb-48 border-t border-border pt-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="flex flex-col gap-48"
      >
        {featured.map((project) => (
          <motion.div key={project.slug} variants={fadeUpVariants} className="flex flex-col gap-8 group">
            <Link href={`/work/${project.slug}`} className="block w-full overflow-hidden bg-gray-100 aspect-[16/9] md:aspect-[21/9]">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-secondary text-sm">
                  [ Image Placeholder ]
                </div>
              )}
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <h3 className="font-display text-4xl md:text-5xl text-foreground">
                <Link href={`/work/${project.slug}`} className="hover:opacity-70 transition-opacity">
                  {project.title}
                </Link>
              </h3>
              <p className="font-sans text-secondary text-xl md:text-2xl max-w-2xl leading-relaxed text-left md:text-right">
                {project.description}
              </p>
            </div>
            
            <div className="flex md:justify-end">
              <ProjectActions slug={project.slug} actions={project.actions} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
