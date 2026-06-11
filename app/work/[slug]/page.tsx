import { getProjectBySlug, projects } from "@/lib/constants";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { Metadata } from "next";
import ProjectActions from "@/components/ProjectActions";
import CaseStudyContent from "@/components/CaseStudyContent";

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const filePath = path.join(process.cwd(), "content/work", `${resolvedParams.slug}.mdx`);
  let mdxContent = "";

  try {
    mdxContent = fs.readFileSync(filePath, "utf8");
    mdxContent = mdxContent.replace(/---[\s\S]*?---/, "");
  } catch (error) {
    console.error(`MDX file not found for slug: ${resolvedParams.slug}`, error);
    mdxContent = "Case study content is being written.";
  }

  return (
    <main className="pb-32 fade-in">
      <article>
        {/* Cover Image */}
        <div className="w-full h-[60vh] md:h-[80vh] relative bg-gray-100">
          {project.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
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

        {/* Header Block */}
        <header className="container max-w-4xl mt-24 mb-16 flex flex-col items-center">
          <div className="flex flex-col gap-6 text-center w-full">
            <span className="editorial-meta">{project.type}</span>
            <h1 className="editorial-heading">{project.title}</h1>
            <p className="editorial-body mx-auto text-xl">{project.description}</p>
          </div>
          
          <div className="mt-12 w-full flex justify-center">
            <ProjectActions slug={project.slug} actions={project.actions} />
          </div>
        </header>

        {/* Sticky Action Bar */}
        <ProjectActions slug={project.slug} actions={project.actions} variant="compact" isSticky={true} />

        {/* MDX Body */}
        <div className="container max-w-3xl">
          <CaseStudyContent>
            <MDXRemote source={mdxContent} />
          </CaseStudyContent>
          
          <div className="mt-32 pt-16 border-t border-border flex justify-between items-center">
            <Link href="/#work" className="nav-link">
              &larr; Back to index
            </Link>
            {project.actions.live?.enabled && project.actions.live.href && (
              <a href={project.actions.live.href} target="_blank" rel="noopener noreferrer" className="nav-link">
                View Live Prototype &rarr;
              </a>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
