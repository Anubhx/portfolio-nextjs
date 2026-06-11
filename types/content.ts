export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  isCurrent?: boolean;
}

export interface ProcessStep {
  number: string;
  label: string;
  description: string;
}

export interface SkillCluster {
  name: string;
  iconPath: string;
  skills: string[];
}

export interface PhilosophyCard {
  number: string;
  title: string;
  body: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  isPlaceholder?: boolean;
}
