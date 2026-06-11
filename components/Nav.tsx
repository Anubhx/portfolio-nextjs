"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BIO } from "@/lib/constants";

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm py-8"
    >
      <div className="container flex justify-between items-center">
        <Link href="/" className="font-display text-xl tracking-tight hover:opacity-70 transition-opacity">
          {BIO.initials}
        </Link>
        <nav className="flex gap-8 md:gap-16">
          <Link href="/#work" className="nav-link">Work</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/notes" className="nav-link">Notes</Link>
          <Link href="/resume.pdf" target="_blank" className="nav-link">Resume</Link>
        </nav>
      </div>
    </motion.header>
  );
}
