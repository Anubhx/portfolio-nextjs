import { getProjectBySlug, projects } from "@/lib/constants";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";
import { Metadata } from "next";
import CaseStudyContent from "@/components/CaseStudyContent";
import UXCaseStudy from "@/components/templates/UXCaseStudy";
import AgenticCaseStudy from "@/components/templates/AgenticCaseStudy";
import EngineeringCaseStudy from "@/components/templates/EngineeringCaseStudy";

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return { title: "Not Found" };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Load MDX content
  const filePath = path.join(
    process.cwd(),
    "content/work",
    `${resolvedParams.slug}.mdx`
  );
  let mdxContent = "";

  try {
    mdxContent = fs.readFileSync(filePath, "utf8");
    // Strip frontmatter
    mdxContent = mdxContent.replace(/---[\s\S]*?---/, "");
  } catch (error) {
    console.error(
      `MDX file not found for slug: ${resolvedParams.slug}`,
      error
    );
    mdxContent = "Case study content is being written.";
  }

  // Rendered MDX wrapped in the editorial styles
  const mdxBody = (
    <CaseStudyContent>
      <MDXRemote source={mdxContent} />
    </CaseStudyContent>
  );

  // ── Template routing switch ──────────────────────────────────────────────
  switch (project.template) {
    case "ux-product":
      return <UXCaseStudy project={project}>{mdxBody}</UXCaseStudy>;

    case "agentic-ai":
      return <AgenticCaseStudy project={project}>{mdxBody}</AgenticCaseStudy>;

    case "engineering":
      return (
        <EngineeringCaseStudy project={project}>{mdxBody}</EngineeringCaseStudy>
      );

    default:
      // Fallback — should never hit given strict typing
      return <UXCaseStudy project={project}>{mdxBody}</UXCaseStudy>;
  }
}
