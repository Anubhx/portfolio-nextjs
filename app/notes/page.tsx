import { Metadata } from "next";
import Link from "next/link";
import { fadeUpVariants, staggerContainer } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Notes — Anubhav Raj",
  description: "Tiny essays and thoughts.",
};

const NOTES = [
  { slug: "ai-experiences-trust", title: "Why AI experiences need trust." },
  { slug: "engineers-users", title: "Why engineers should talk to users." },
  { slug: "curse-of-interests", title: "The curse of too many interests." },
];

export default function NotesIndex() {
  return (
    <main className="container pt-48 pb-32 fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="editorial-heading mb-32">Notes</h1>
        
        <div className="flex flex-col gap-12">
          {NOTES.map((note) => (
            <div key={note.slug}>
              <Link href={`/notes/${note.slug}`} className="group flex flex-col gap-2 border-b border-border pb-12">
                <h2 className="font-display text-3xl md:text-4xl text-foreground group-hover:opacity-60 transition-opacity">
                  {note.title}
                </h2>
                <span className="editorial-meta mt-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                  Read essay &rarr;
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
