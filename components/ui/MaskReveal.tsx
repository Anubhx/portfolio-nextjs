"use client";

import { motion, useReducedMotion } from "framer-motion";
import useMousePosition from "@/hooks/useMousePosition";
import { useState, useRef, useEffect } from "react";

interface MaskRevealProps {
  visibleText: React.ReactNode;
  hiddenText: React.ReactNode;
}

export default function MaskReveal({ visibleText, hiddenText }: MaskRevealProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const updateRect = () => {
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect());
      }
    };
    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="flex flex-col gap-12 py-24 border-y border-border my-24">
        <div>
          <p className="editorial-meta mb-4">The Assumption</p>
          <div className="text-secondary font-display text-3xl md:text-5xl leading-[1.3]">{visibleText}</div>
        </div>
        <div>
          <p className="editorial-meta mb-4">The Reality</p>
          <div className="text-foreground font-display text-3xl md:text-5xl leading-[1.3]">{hiddenText}</div>
        </div>
      </div>
    );
  }

  // Local pointer coordinates relative to the container
  const localX = containerRect ? x - containerRect.left : 0;
  const localY = containerRect ? y - containerRect.top : 0;
  
  // Expand the mask when hovered
  const maskSize = isHovered ? 250 : 40;

  return (
    <div 
      ref={containerRef}
      className="relative w-full py-32 md:py-48 cursor-default group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      {/* Base Layer: Visible text */}
      <div className="container max-w-4xl mx-auto text-secondary font-display text-3xl md:text-5xl lg:text-6xl leading-[1.3] tracking-tight pointer-events-none">
        {visibleText}
      </div>

      {/* Hidden Layer: Masked truth text (Dark Mode) */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full flex items-center text-background font-display text-3xl md:text-5xl lg:text-6xl leading-[1.3] tracking-tight bg-foreground pointer-events-none"
        animate={{
          WebkitMaskImage: `radial-gradient(${maskSize}px circle at ${localX}px ${localY}px, black 80%, transparent 100%)`,
          maskImage: `radial-gradient(${maskSize}px circle at ${localX}px ${localY}px, black 80%, transparent 100%)`,
        } as any}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <div className="container max-w-4xl mx-auto">
          {hiddenText}
        </div>
      </motion.div>
      
      {/* Screen Reader Only */}
      <div className="sr-only">
        <p>Public statement: {visibleText}</p>
        <p>Hidden truth: {hiddenText}</p>
      </div>
    </div>
  );
}
