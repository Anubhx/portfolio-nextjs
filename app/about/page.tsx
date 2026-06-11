import { Metadata } from "next";
import { BIO } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About — ${BIO.name}`,
  description: "An honest portrait of how I think, work, and build.",
};

export default function AboutPage() {
  return (
    <main className="container pt-48 pb-32 fade-in">
      <div className="max-w-4xl">
        <h1 className="editorial-heading mb-16">An honest portrait.</h1>
        
        <div className="about-layout border-t border-border pt-16">
          <div className="about-text">
            <h2 className="editorial-meta mb-4">Contradictions</h2>
            <p className="editorial-body text-2xl font-serif text-foreground leading-relaxed">
              I am an engineer who spends more time sketching than coding. I am a designer who cares more about the database schema than the hex codes. 
            </p>
            <p className="editorial-body">
              I learned early on that the best products aren't built by specialists passing requirements over a wall. They are built by people who are willing to exist in the uncomfortable, messy middle between disciplines.
            </p>
            
            <h2 className="editorial-meta mb-4 mt-12">How I Work</h2>
            <p className="editorial-body">
              I don't start with solutions. I start by obsessing over the problem until the solution becomes obvious. This means a lot of whiteboarding, a lot of deleted code, and a lot of asking "why?" until people get slightly annoyed. 
            </p>
            <p className="editorial-body">
              When I finally open a code editor or Figma file, the architecture is already mapped out in my head. Execution is just translation. 
            </p>

            <h2 className="editorial-meta mb-4 mt-12">Small Obsessions</h2>
            <p className="editorial-body">
              The precise timing of a fade animation (1.2s cubic-bezier is usually right). Typography that reads like a book, even on a screen. Removing features until it hurts. Coffee, brewed meticulously. Notebooks filled with diagrams that only make sense to me.
            </p>

            <h2 className="editorial-meta mb-4 mt-12">Curiosities</h2>
            <p className="editorial-body">
              Right now, I am endlessly fascinated by Agentic AI. Not as a parlor trick, but as a new primitive for software. I am exploring how we design interfaces that don't just respond to commands, but actively reason alongside the user.
            </p>
          </div>

          <div className="md:col-span-1"></div>

          <div className="about-image flex flex-col gap-8">
            {/* The user can drop a candid photo or artifact here */}
            <div className="w-full h-full min-h-[400px] bg-gray-100 flex items-center justify-center p-8 text-center text-secondary font-sans text-sm border border-border">
              [ Drop a candid portrait, desk photograph, or sketchbook scan here ]
            </div>
            
            <div className="editorial-body text-sm border-l-2 border-border pl-4">
              <p>Current Title: {BIO.currentRole} at {BIO.currentCompany}</p>
              <p>Location: {BIO.location}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
