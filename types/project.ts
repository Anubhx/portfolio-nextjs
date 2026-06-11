export interface Project {
  slug: string;
  title: string;
  type: string;
  description: string;
  stack: string[];
  highlights: string[];
  role: string;
  accentColor: string;
  year: string;
  featured?: boolean;
}

export interface ProjectMeta extends Project {
  content?: string;
}

export interface CaseStudyFrontmatter {
  title: string;
  type: string;
  description: string;
  stack: string[];
  role: string;
  accentColor: string;
  year: string;
  outcome: string;
  duration?: string;
  teamSize?: string;
}
