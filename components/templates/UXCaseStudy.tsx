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
  children: ReactNode; // MDX content
};

export default function UXCaseStudy({ project, children }: Props) {
  return (
    <main className="pb-32 fade-in">
      <article>
        {/* ── Hero Image ─────────────────────────────────────────────────── */}
        <div className="w-full h-[60vh] md:h-[80vh] relative bg-gray-100">
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

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="container max-w-4xl mt-24 mb-16">
          <div className="flex flex-col gap-6">
            <span className="editorial-meta">{project.type}</span>
            <h1 className="editorial-heading">{project.title}</h1>
            <p className="editorial-body text-xl">{project.description}</p>
          </div>

          {/* Project brief sidebar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-8">
            <div>
              <p className="editorial-meta mb-1">Role</p>
              <p className="font-sans text-sm text-foreground">{project.role}</p>
            </div>
            <div>
              <p className="editorial-meta mb-1">Timeline</p>
              <p className="font-sans text-sm text-foreground">{project.timeline}</p>
            </div>
            <div>
              <p className="editorial-meta mb-1">Discipline</p>
              <p className="font-sans text-sm text-foreground">{project.category}</p>
            </div>
            <div>
              <p className="editorial-meta mb-1">Tools</p>
              <p className="font-sans text-sm text-foreground">{project.stack.join(", ")}</p>
            </div>
          </div>

          {/* Actions row */}
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

          {/* Footer nav */}
          <div className="mt-32 pt-16 border-t border-border flex justify-between items-center">
            <Link href="/#work" className="nav-link">
              &larr; Back to index
            </Link>
            {project.actions.live?.enabled && project.actions.live.href && (
              <a
                href={project.actions.live.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                View Live Prototype &rarr;
              </a>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
