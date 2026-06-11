"use client";

import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/tokens";
import { useInView } from "@/hooks/useInView";

export default function VennDiagram() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="venn-container"
      aria-label="Venn diagram: UX, Engineering, and Agentic AI intersection — representing AI-native product building"
      role="img"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUpVariants}
    >
      <div className="venn">
        <div className="venn-circle venn-ux">
          <div className="venn-label">
            UX / UI
            <span>Research · Design</span>
          </div>
        </div>
        <div className="venn-circle venn-eng">
          <div className="venn-label">
            Engineering
            <span>Frontend · Systems</span>
          </div>
        </div>
        <div className="venn-circle venn-ai">
          <div className="venn-label">
            Agentic AI
            <span>LLMs · Pipelines</span>
          </div>
        </div>
        <div className="venn-center" aria-label="AI-native Product Builder">
          AI-native Product Builder
        </div>
      </div>
    </motion.div>
  );
}
