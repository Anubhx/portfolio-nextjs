"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      id="scroll-progress"
      role="presentation"
      aria-hidden="true"
      style={{ width: `${progress}%` }}
    />
  );
}
