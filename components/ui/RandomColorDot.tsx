"use client";

import { useState, useEffect } from "react";

const COLORS = [
  "#FF3366", // pink-red
  "#00C4B6", // teal
  "#FF9900", // orange
  "#7B61FF", // purple
  "#007AFF", // blue
  "#34C759", // green
  "#FFD60A", // yellow
  "#FF3B30", // red
];

export default function RandomColorDot() {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    // Initial random color
    setColorIndex(Math.floor(Math.random() * COLORS.length));

    const interval = setInterval(() => {
      setColorIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * COLORS.length);
        } while (next === prev);
        return next;
      });
    }, 2500); // Change color every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="transition-colors duration-1000 ease-in-out inline-block"
      style={{ color: COLORS[colorIndex] }}
    >
      .
    </span>
  );
}
