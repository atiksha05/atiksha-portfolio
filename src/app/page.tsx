import { CursorDot } from "@/components/effects/CursorDot";
import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { Hero } from "@/components/sections/Hero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsStrip } from "@/components/sections/ProjectsStrip";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <CursorDot />
      <div className="relative z-10 bg-black">
        <Navbar />
        <main>
          <Hero />
          <ProjectsStrip />
          <AboutSection />
          <ProcessSection />
          <ServicesSection />
          <TestimonialsSection />
          <FAQSection />
          <FooterCTA />
        </main>
      </div>
    </>
  );
}
