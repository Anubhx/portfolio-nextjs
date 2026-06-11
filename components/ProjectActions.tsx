"use client";

import { ProjectAction, ProjectActionType } from "@/lib/constants";
import { trackProjectAction } from "@/lib/analytics";
import { 
  FileText, 
  ExternalLink, 
  Github, 
  Palette, 
  Figma, 
  BookOpen, 
  PlayCircle,
  LucideIcon
} from "lucide-react";

import { useState, useEffect } from "react";

type ProjectActionsProps = {
  slug: string;
  actions: Record<ProjectActionType, ProjectAction>;
  variant?: "default" | "compact";
  isSticky?: boolean;
  className?: string;
};

// Define the strict ordering priority
const ACTION_ORDER: ProjectActionType[] = [
  "caseStudy",
  "live",
  "github",
  "behance",
  "figma",
  "docs",
  "video"
];

// Mapping for UI labels and Icons
const ACTION_CONFIG: Record<ProjectActionType, { label: string; icon: LucideIcon }> = {
  caseStudy: { label: "View Case Study", icon: FileText },
  live: { label: "Live Demo", icon: ExternalLink },
  github: { label: "GitHub", icon: Github },
  behance: { label: "Behance", icon: Palette },
  figma: { label: "Figma", icon: Figma },
  docs: { label: "Documentation", icon: BookOpen },
  video: { label: "Video Demo", icon: PlayCircle },
};

export default function ProjectActions({ slug, actions, variant = "default", isSticky = false, className = "" }: ProjectActionsProps) {
  const [isVisible, setIsVisible] = useState(!isSticky);

  useEffect(() => {
    if (!isSticky) return;
    
    const handleScroll = () => {
      // Show sticky bar after scrolling past 500px (roughly the hero section)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  // Sort and filter only enabled actions
  const activeActions = ACTION_ORDER
    .filter((actionType) => actions[actionType]?.enabled && actions[actionType]?.href)
    .map((actionType) => ({
      type: actionType,
      href: actions[actionType].href,
      ...ACTION_CONFIG[actionType]
    }));

  if (activeActions.length === 0 || !isVisible) return null;

  const handleActionClick = (type: string, href: string) => {
    trackProjectAction(slug, type, href);
  };

  if (variant === "compact") {
    const stickyClasses = isSticky ? "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] px-4 py-3 rounded-full border border-border/50 animate-in fade-in slide-in-from-bottom-8 duration-500" : "";
    return (
      <div className={`flex flex-wrap items-center gap-3 ${stickyClasses} ${className}`}>
        {activeActions.map((action) => {
          const Icon = action.icon;
          return (
            <a
              key={action.type}
              href={action.href}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={() => handleActionClick(action.type, action.href)}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-white text-secondary hover:text-foreground hover:border-secondary transition-all text-sm font-sans"
            >
              <Icon size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
              <span>{action.label}</span>
            </a>
          );
        })}
      </div>
    );
  }

  // Default Editorial Variant (text + subtle underline/separators)
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-secondary text-sm md:text-base ${className}`}>
      {activeActions.map((action, index) => {
        const Icon = action.icon;
        const isLast = index === activeActions.length - 1;
        
        return (
          <div key={action.type} className="flex items-center gap-4">
            <a
              href={action.href}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={() => handleActionClick(action.type, action.href)}
              className="group flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Icon size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="border-b border-transparent group-hover:border-foreground transition-colors pb-0.5">
                {action.label}
              </span>
            </a>
            {!isLast && <span className="text-border select-none">&middot;</span>}
          </div>
        );
      })}
    </div>
  );
}
