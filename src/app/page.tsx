import { CursorDot } from "@/components/effects/CursorDot";
import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { Hero } from "@/components/sections/Hero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsStrip } from "@/components/sections/ProjectsStrip";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhatPeopleSaySection } from "@/components/sections/WhatPeopleSaySection";

export default function Home() {
  return (
    <>
      <CursorDot />
      <div className="relative z-10 overflow-x-hidden bg-black">
        <Navbar />
        <main>
          <Hero />
          <ProjectsStrip />
          <AboutSection />
          <TestimonialsSection />
          <ProcessSection />
          <WhatPeopleSaySection />
          <FAQSection />
          <FooterCTA />
        </main>
      </div>
    </>
  );
}
