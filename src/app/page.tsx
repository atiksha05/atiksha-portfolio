import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWorkSection";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { Hero } from "@/components/sections/Hero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProductToolkitSection } from "@/components/sections/ProductToolkitSection";
import { Marquee } from "@/components/ui/Marquee";
import { marqueeItems } from "@/lib/data";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden bg-black">
      <Navbar />
      <main>
        <Hero />
        <FeaturedWorkSection />
        <Marquee items={marqueeItems} />
        <ProductToolkitSection />
        <ExperienceSection />
        <ProcessSection />
        <AboutSection />
        <FooterCTA />
      </main>
    </div>
  );
}
