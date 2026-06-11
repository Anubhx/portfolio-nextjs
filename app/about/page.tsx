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
        <h1 className="editorial-heading mb-16">The space between.</h1>
        
        <div className="about-layout border-t border-border pt-16">
          <div className="about-text">
            <h2 className="editorial-meta mb-4">The Invisible Work</h2>
            <p className="editorial-body text-2xl font-display text-foreground leading-relaxed">
              I didn't become interested in products because of interfaces.
            </p>
            <p className="editorial-body">
              I became interested because I noticed how much invisible work people do every day just to make systems function. The spreadsheets they build to track group lunch orders. The ten different tools they stitch together just to write a due diligence report.
            </p>
            <p className="editorial-body">
              That curiosity eventually became my way of working. 
            </p>

            <h2 className="editorial-meta mb-4 mt-12">The Curse of Curiosity</h2>
            <p className="editorial-body">
              For a long time, being a "jack of all trades" felt like a curse. I would stop halfway through learning something because another discipline pulled me away. I moved from UX design to software engineering, and then into the messy world of Agentic AI.
            </p>
            <p className="editorial-body">
              Then I started working on real products, and I realized where software usually breaks: the translation layer.
            </p>
            <p className="editorial-body">
              Designers sketch things that are technically impossible. Engineers build things that make perfect sense to a compiler, but absolutely no sense to a human. And AI researchers build brilliant models that lack any intuition for user trust.
            </p>
            <p className="editorial-body">
              That's when the curse became the superpower. Because I had spent time in all of those rooms, I didn't need to translate between them. I could just remove the translation layer entirely.
            </p>

            <h2 className="editorial-meta mb-4 mt-12">How I Build</h2>
            <p className="editorial-body">
              I don't start with solutions. I start by obsessing over the tension in the problem. The awkward workarounds are where the real opportunities hide. I sketch before I code. I write schemas before I push pixels. When I finally open a code editor, the architecture is already mapped out in my head. Execution is just translation of my own intent.
            </p>
          </div>

          <div className="md:col-span-1"></div>

          <div className="about-image flex flex-col gap-8">
            {/* The user can drop a candid photo or artifact here */}
            <div className="w-full h-full min-h-[400px] bg-gray-100 flex items-center justify-center p-8 text-center text-secondary font-sans text-sm">
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
