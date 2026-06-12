import { Metadata } from "next";
import { BIO } from "@/lib/constants";
import MaskReveal from "@/components/ui/MaskReveal";
import RandomColorDot from "@/components/ui/RandomColorDot";

export const metadata: Metadata = {
  title: `About — ${BIO.name}`,
  description: "An honest portrait of how I think, work, and build.",
};

export default function AboutPage() {
  return (
    <main className="pt-48 pb-32 fade-in overflow-hidden">
      <div className="container max-w-4xl mx-auto">
        
        {/* ── 1. Editorial Hero ───────────────────────────────────────────── */}
        <div className="mb-24">
          <h1 className="editorial-heading mb-12">
            I never meant to become a generalist.<br />
            <span className="text-secondary">Curiosity just kept pulling me sideways<RandomColorDot /></span>
          </h1>
          
          <div className="flex flex-col gap-6 max-w-2xl">
            <p className="editorial-body text-2xl font-display text-foreground leading-relaxed">
              I started in UX, obsessing over how people felt using software. But sketching solutions wasn&apos;t enough; I wanted to build them. So I learned frontend engineering.
            </p>
            <p className="editorial-body">
              Then, as I started building, I realized the systems themselves were rigid. That led me to Agentic AI—building software that reasons.
            </p>
            <p className="editorial-body">
              For years, this felt like a liability. Too technical for the design room. Too design-focused for the engineering standup. 
            </p>
          </div>
        </div>
      </div>

      {/* ── 2. The Truth Reveal (Mask Interaction) ──────────────────────── */}
      <MaskReveal 
        visibleText="I spent years trying to pick a single lane. Trying to decide if I was a designer, an engineer, or a researcher."
        hiddenText="Then I realized the most interesting problems don't respect job titles. They live in the space between them."
      />

      <div className="container max-w-4xl mx-auto">
        {/* ── 3. How I Think ──────────────────────────────────────────────── */}
        <div className="my-32 flex flex-col gap-16 max-w-2xl">
          <div>
            <h2 className="editorial-meta mb-4">How I Think</h2>
            <p className="editorial-body font-display text-2xl text-foreground leading-relaxed mb-8">
              Complexity is a tax. Building a complex system is easy. Doing the hard work to make it feel simple to the user is the actual job.
            </p>
          </div>
          
          <div className="flex flex-col gap-8">
            <p className="editorial-body">
              <strong>Curiosity needs a destination.</strong> It&apos;s fun to explore new frameworks, but if it doesn&apos;t solve a human problem, it&apos;s just academic exercise.
            </p>
            <p className="editorial-body">
              <strong>Trust is the real AI bottleneck.</strong> Models will get faster and smarter. But if the interface doesn&apos;t make the user feel safe, the intelligence doesn&apos;t matter.
            </p>
            <p className="editorial-body">
              <strong>Engineers must talk to users.</strong> An architecture diagram is useless if it&apos;s optimizing for the wrong human behavior.
            </p>
            <p className="editorial-body">
              <strong>Design decisions are technical decisions.</strong> A UX mockup that ignores the backend reality isn&apos;t a design; it&apos;s a painting.
            </p>
          </div>
        </div>

        {/* ── 4. Things I've Changed My Mind About ────────────────────────── */}
        <div className="my-32 border-t border-border pt-16">
          <h2 className="editorial-meta mb-12">Things I&apos;ve changed my mind about</h2>
          <div className="flex flex-col gap-12 max-w-2xl">
            <p className="editorial-body">
              I used to think specialization was the only path to credibility. Now I know that the ability to translate across domains is much rarer and often more valuable.
            </p>
            <p className="editorial-body">
              I used to think shipping fast meant sacrificing thoughtfulness. Now I realize that shipping fast is the only way to know if your thoughtfulness was actually correct.
            </p>
            <p className="editorial-body">
              I used to think a great UI could save a bad product. Now I know that if the underlying system is broken, the most beautiful interface just becomes a prettier apology.
            </p>
            <p className="editorial-body">
              I used to think AI would replace builders. Now I see it as a multiplier for people who know what questions to ask.
            </p>
          </div>
        </div>

        {/* ── 5. Small Obsessions & 6. What I'm Learning ──────────────────── */}
        <div className="my-32 grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-border pt-16">
          <div>
            <h2 className="editorial-meta mb-8">What I&apos;m learning</h2>
            <ul className="editorial-body space-y-4">
              <li>Multi-agent orchestration and local-first AI architectures.</li>
              <li>The typography of dynamic, streaming interfaces.</li>
              <li>Evaluating non-deterministic LLM outputs in production.</li>
            </ul>
          </div>

          <div>
            <h2 className="editorial-meta mb-8">Small obsessions</h2>
            <ul className="editorial-body space-y-4">
              <li>Noticing the awkward, manual workflows people accept as normal.</li>
              <li>How tiny latency changes affect human behavior.</li>
              <li>Reading the documentation of tools I don&apos;t use.</li>
            </ul>
          </div>
        </div>

        {/* ── 7. Now ──────────────────────────────────────────────────────── */}
        <div className="mt-32 pt-16 border-t border-border flex flex-col gap-8 max-w-2xl">
          <h2 className="editorial-meta">Now</h2>
          <p className="editorial-body text-xl">
            Right now, I&apos;m building open-source tools for agentic reasoning and looking for my next full-time role. I&apos;m playing far too much chess, trying to make the perfect pour-over coffee, and looking for teams that want to solve hard problems without letting the organizational chart get in the way.
          </p>
          <div className="mt-8">
            <a href="mailto:anubhavraj@example.com" className="btn-secondary">
              Say Hello
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
