import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CaseStudyFrontmatter } from "@/types/project";

const contentDir = path.join(process.cwd(), "content/work");

export interface CaseStudyData {
  frontmatter: CaseStudyFrontmatter;
  content: string;
  slug: string;
}

export function getCaseStudyBySlug(slug: string): CaseStudyData | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data as CaseStudyFrontmatter,
    content,
    slug,
  };
}

export function getAllCaseStudySlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
}
