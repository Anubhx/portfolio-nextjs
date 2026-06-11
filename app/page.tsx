import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Identity from "@/components/Identity";
import NotesPreview from "@/components/NotesPreview";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <SelectedWork />
      <Identity />
      <NotesPreview />
    </main>
  );
}
