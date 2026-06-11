import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";
import Link from "next/link";
import CaseStudyContent from "@/components/CaseStudyContent";

const NOTES = [
  { slug: "ai-experiences-trust", title: "Why AI experiences need trust." },
  { slug: "engineers-users", title: "Why engineers should talk to users." },
  { slug: "curse-of-interests", title: "The curse of too many interests." },
];

export async function generateStaticParams() {
  return NOTES.map((n) => ({
    slug: n.slug,
  }));
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const note = NOTES.find((n) => n.slug === resolvedParams.slug);

  if (!note) {
    notFound();
  }

  const filePath = path.join(process.cwd(), "content/notes", `${resolvedParams.slug}.mdx`);
  let mdxContent = "";

  try {
    mdxContent = fs.readFileSync(filePath, "utf8");
    mdxContent = mdxContent.replace(/---[\s\S]*?---/, "");
  } catch (error) {
    console.error(`MDX file not found for slug: ${resolvedParams.slug}`, error);
    mdxContent = "Essay content is being written.";
  }

  return (
    <main className="pb-32 fade-in">
      <article className="container max-w-3xl pt-48">
        <header className="mb-16 pb-16 border-b border-border">
          <Link href="/notes" className="editorial-meta hover:text-foreground transition-colors mb-12 block">
            &larr; All Notes
          </Link>
          <h1 className="editorial-heading">{note.title}</h1>
        </header>

        <CaseStudyContent>
          <MDXRemote source={mdxContent} />
        </CaseStudyContent>
      </article>
    </main>
  );
}
