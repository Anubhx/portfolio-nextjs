"use client";

import { motion } from "framer-motion";
import { fadeUpVariants, staggerContainer } from "@/lib/tokens";

interface CaseStudyContentProps {
  children: React.ReactNode;
}

export default function CaseStudyContent({ children }: CaseStudyContentProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mdx-editorial-content"
    >
      <style jsx global>{`
        .mdx-editorial-content {
          font-family: var(--font-inter);
          color: var(--secondary);
          line-height: 1.8;
          font-size: 1.125rem;
          max-w: 65ch;
          margin: 0 auto;
        }
        
        .mdx-editorial-content h1, 
        .mdx-editorial-content h2, 
        .mdx-editorial-content h3 {
          font-family: var(--font-serif);
          color: var(--text);
          font-weight: normal;
          margin-top: 4rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .mdx-editorial-content h2 {
          font-size: 2.5rem;
          border-top: 1px solid var(--border);
          padding-top: 2rem;
        }

        .mdx-editorial-content p {
          margin-bottom: 2rem;
        }

        /* Drop cap for first paragraph */
        .mdx-editorial-content > p:first-of-type::first-letter {
          font-family: var(--font-serif);
          float: left;
          font-size: 5rem;
          line-height: 0.8;
          padding-top: 0.15em;
          padding-right: 0.1em;
          padding-left: 0.05em;
          color: var(--text);
        }

        .mdx-editorial-content ul {
          margin-bottom: 2rem;
          list-style-type: none;
          padding-left: 0;
        }

        .mdx-editorial-content li {
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.5rem;
        }

        .mdx-editorial-content li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: var(--text);
        }

        .mdx-editorial-content blockquote {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          line-height: 1.4;
          color: var(--text);
          margin: 4rem -2rem;
          padding: 0 2rem;
          border-left: 2px solid var(--text);
        }

        .mdx-editorial-content img {
          width: 100%;
          height: auto;
          margin: 4rem 0;
          background: #f4f4f4;
        }

        @media (max-width: 768px) {
          .mdx-editorial-content blockquote {
            margin: 3rem 0;
            padding: 0 1rem;
          }
        }
      `}</style>
      <motion.div variants={fadeUpVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
}
