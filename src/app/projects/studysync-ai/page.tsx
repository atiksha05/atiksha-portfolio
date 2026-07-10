import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { StudySyncCaseStudy } from "@/components/studysync/StudySyncCaseStudy";
import { studySyncAi } from "@/data/studySyncAi";

export const metadata: Metadata = {
  title: `${studySyncAi.title} — Case Study · Atiksha Antil`,
  description: studySyncAi.subtitle,
};

export default function StudySyncAiPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-pink-500/[0.07] blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-purple-500/[0.05] blur-[120px]"
        aria-hidden
      />

      <Navbar />

      <main className="section-container relative pb-24 pt-[120px] sm:pb-32">
        <StudySyncCaseStudy />
      </main>
    </div>
  );
}
