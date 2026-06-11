import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Identity from "@/components/Identity";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Identity />
      <SelectedWork />
    </main>
  );
}
