import Hero from "@/components/Hero";
import Identity from "@/components/Identity";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillsEcosystem from "@/components/SkillsEcosystem";
import Philosophy from "@/components/Philosophy";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Identity />
      <SelectedWork />
      <Process />
      <ExperienceTimeline />
      <SkillsEcosystem />
      <Philosophy />
      <Testimonials />
      <Contact />
    </>
  );
}
