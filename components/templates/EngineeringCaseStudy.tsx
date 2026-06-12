"use client";

import { ReactNode } from "react";
import Link from "next/link";
import ProjectActions from "@/components/ProjectActions";
import { ProjectActionType, ProjectAction } from "@/lib/constants";

type Project = {
  slug: string;
  title: string;
  type: string;
  description: string;
  image: string | null;
  role: string;
  timeline: string;
  stack: readonly string[];
  category: string;
  actions: Record<ProjectActionType, ProjectAction>;
};

type Props = {
  project: Project;
  children: ReactNode;
};

export default function EngineeringCaseStudy({ project, children }: Props) {
  return (
    <main className="pb-32 fade-in">
      <article>
        {/* ── Hero Image ─────────────────────────────────────────────────── */}
        <div className="w-full h-[50vh] md:h-[65vh] relative bg-gray-100">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-secondary font-sans text-sm">
              [ Cover Image Placeholder ]
            </div>
          )}
        </div>

        {/* ── Header — builder's notebook style ──────────────────────────── */}
        <header className="container max-w-4xl mt-20 mb-16">
          <div className="flex flex-col gap-4">
            <span className="editorial-meta">{project.type}</span>
            <h1 className="editorial-heading">{project.title}</h1>
            <p className="editorial-body text-xl">{project.description}</p>
          </div>

          {/* Stack + links upfront */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-sans text-xs uppercase tracking-widest border border-border px-3 py-1.5 text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Brief */}
          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-8 max-w-md">
            <div>
              <p className="editorial-meta mb-1">Built by</p>
              <p className="font-sans text-sm text-foreground">{project.role}</p>
            </div>
            <div>
              <p className="editorial-meta mb-1">Year</p>
              <p className="font-sans text-sm text-foreground">{project.timeline}</p>
            </div>
          </div>

          <div className="mt-10">
            <ProjectActions slug={project.slug} actions={project.actions} />
          </div>
        </header>

        {/* ── Sticky Action Bar ───────────────────────────────────────────── */}
        <ProjectActions
          slug={project.slug}
          actions={project.actions}
          variant="compact"
          isSticky={true}
        />

        {/* ── MDX Body ────────────────────────────────────────────────────── */}
        <div className="container max-w-3xl">
          <div className="case-study-body">{children}</div>

          <div className="mt-32 pt-16 border-t border-border flex justify-between items-center">
            <Link href="/#work" className="nav-link">
              &larr; Back to index
            </Link>
            {project.actions.github?.enabled && project.actions.github.href && (
              <a
                href={project.actions.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                View on GitHub &rarr;
              </a>
            )}
            {!project.actions.github?.enabled &&
              project.actions.live?.enabled &&
              project.actions.live.href && (
                <a
                  href={project.actions.live.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  View Live &rarr;
                </a>
              )}
          </div>
        </div>
      </article>
    </main>
  );
}
