"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/constants";
import { fadeUpVariants, staggerContainer } from "@/lib/tokens";
import Link from "next/link";
import Image from "next/image";

export default function SelectedWork() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="work" className="container pb-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="work-grid"
      >
        {featured.map((project, i) => (
          <motion.div key={project.slug} variants={fadeUpVariants} className="work-item">
            <div className="work-image-wrapper group">
              <Link href={`/work/${project.slug}`}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </Link>
            </div>
            
            <div className="work-content">
              <span className="editorial-meta">{project.type} &mdash; {project.year}</span>
              <h3 className="work-title">
                <Link href={`/work/${project.slug}`} className="hover:opacity-70 transition-opacity">
                  {project.title}
                </Link>
              </h3>
              <p className="work-desc">{project.description}</p>
              <Link href={`/work/${project.slug}`} className="btn-secondary mt-4 w-fit">
                Read the story
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
