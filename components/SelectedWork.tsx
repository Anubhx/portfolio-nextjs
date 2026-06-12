"use client";

import { motion } from "framer-motion";
import { projects, ProjectCategory } from "@/lib/constants";
import { fadeUpVariants, staggerContainer } from "@/lib/tokens";
import Link from "next/link";
import ProjectActions from "./ProjectActions";
import { ArrowRight } from "lucide-react";

// Ordered discipline buckets
const DISCIPLINE_ORDER: ProjectCategory[] = [
  "UX / Product",
  "Intelligent Systems",
  "Engineering Builds",
];

const DISCIPLINE_INTRO: Record<ProjectCategory, string> = {
  "UX / Product": "Research-driven experiences. Designing for ambiguity, trust, and human behaviour.",
  "Intelligent Systems": "Products powered by reasoning and retrieval. Where architecture becomes product.",
  "Engineering Builds": "Turning ideas into shipped products. Speed, craft, and clean decisions.",
};

export default function SelectedWork() {
  const featured = projects.filter((p) => p.featured);
  const all = projects;

  return (
    <section id="work" className="border-t border-border">

      {/* ── SECTION A: Featured Work ───────────────────────────────────────── */}
      <div className="container pt-32 pb-48">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="flex flex-col gap-48"
        >
          {featured.map((project) => (
            <motion.div
              key={project.slug}
              variants={fadeUpVariants}
              className="flex flex-col gap-8 group"
            >
              {/* Image */}
              <Link
                href={`/work/${project.slug}`}
                className="block w-full overflow-hidden bg-gray-100 aspect-[16/9] md:aspect-[21/9]"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-secondary text-sm font-sans">
                    [ Image Placeholder ]
                  </div>
                )}
              </Link>

              {/* Meta row */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="editorial-meta">
                    {project.category}
                  </span>
                  <h3 className="font-display text-4xl md:text-5xl text-foreground">
                    <Link
                      href={`/work/${project.slug}`}
                      className="hover:opacity-70 transition-opacity"
                    >
                      {project.title}
                    </Link>
                  </h3>
                </div>
                <p className="font-sans text-secondary text-xl md:text-2xl max-w-2xl leading-relaxed text-left md:text-right">
                  {project.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex md:justify-end">
                <ProjectActions slug={project.slug} actions={project.actions} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── SECTION B: Explore by Discipline ──────────────────────────────── */}
      <div className="border-t border-border">
        <div className="container pt-24 pb-32">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 max-w-2xl"
          >
            <span className="editorial-meta mb-4 block">Explore by Discipline</span>
            <p className="font-sans text-secondary text-lg leading-relaxed">
              I don&apos;t believe every problem should be solved the same way.
              Sometimes the answer begins with talking to users. Sometimes it starts with
              an architecture diagram. Sometimes it&apos;s both. These projects reflect that tension.
            </p>
          </motion.div>

          {/* Discipline buckets */}
          <div className="flex flex-col gap-20">
            {DISCIPLINE_ORDER.map((discipline) => {
              const disciplineProjects = all.filter(
                (p) => p.category === discipline
              );
              if (disciplineProjects.length === 0) return null;

              return (
                <motion.div
                  key={discipline}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Discipline header */}
                  <div className="border-t border-border pt-8 mb-8">
                    <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                      {discipline}
                    </h3>
                    <p className="editorial-meta text-secondary">
                      {DISCIPLINE_INTRO[discipline]}
                    </p>
                  </div>

                  {/* Project rows */}
                  <div className="flex flex-col">
                    {disciplineProjects.map((project, i) => (
                      <Link
                        key={project.slug}
                        href={`/work/${project.slug}`}
                        className={`group flex items-center justify-between py-5 gap-4 transition-colors hover:bg-gray-50 -mx-4 px-4 ${
                          i < disciplineProjects.length - 1 ? "border-b border-border" : ""
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-display text-xl md:text-2xl text-foreground group-hover:opacity-70 transition-opacity">
                            {project.title}
                          </span>
                          <span className="font-sans text-sm text-secondary">
                            {project.description}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                          <span className="font-sans text-xs text-secondary hidden md:block">
                            {project.role}
                          </span>
                          <ArrowRight
                            size={16}
                            className="text-secondary group-hover:text-foreground group-hover:translate-x-1 transition-all"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
