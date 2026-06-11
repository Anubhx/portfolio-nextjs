// Design tokens mirroring CSS custom properties from the HTML blueprint
// These are used in Framer Motion variants and TypeScript logic

export const tokens = {
  colors: {
    bg: "#F8F7F4",
    text: "#161616",
    secondary: "#5C5C5C",
    accent: "#274C77",
    surface: "#FFFFFF",
    border: "#E7E4DF",
    hover: "#EAE6DF",
    accentLt: "#E8EFF7",
    accentMd: "#C2D4E8",
    accentDark: "#1e3d62",
  },
  fonts: {
    display: "var(--font-sora)",
    body: "var(--font-inter)",
  },
  radii: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "20px",
  },
  shadows: {
    sm: "0 1px 3px rgba(22,22,22,0.06), 0 1px 2px rgba(22,22,22,0.04)",
    md: "0 4px 12px rgba(22,22,22,0.08), 0 2px 4px rgba(22,22,22,0.04)",
    lg: "0 12px 32px rgba(22,22,22,0.10), 0 4px 8px rgba(22,22,22,0.04)",
  },
  maxWidth: "1100px",
} as const;

// Framer Motion variants for scroll-triggered animations
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut" as const,
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const cardHoverVariants = {
  rest: { y: 0, boxShadow: tokens.shadows.sm },
  hover: {
    y: -2,
    boxShadow: tokens.shadows.lg,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};
