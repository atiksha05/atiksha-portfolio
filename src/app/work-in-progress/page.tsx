import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { WipBackground } from "@/components/wip/WipBackground";
import { WipProjectCard } from "@/components/wip/WipProjectCard";
import { wipProjects } from "@/data/wipProjects";

export const metadata: Metadata = {
  title: "Recent Work in Progress — Atiksha Antil",
  description:
    "Projects currently in development — full-stack platforms, AI tools, and research dashboards by Atiksha Antil.",
};

export default function WorkInProgressPage() {
  const [featured, ...rest] = wipProjects;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      <Navbar />
      <WipBackground />

      <main className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-10 lg:pt-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/35 bg-pink-500/10 px-4 py-1.5 text-xs text-pink-200 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-pink-300" />
            Building now
          </span>
          <h1 className="font-serif-display mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
            Recent Work in Progress
          </h1>
          <p className="mt-5 text-base leading-relaxed text-pink-100/55 sm:text-lg">
            A living snapshot of what I&apos;m shipping, refining, and
            experimenting with — from AI-powered tools to campus platforms and
            research systems.
          </p>
        </div>

        <div className="mt-14 space-y-8 sm:mt-16">
          <div id={featured.id}>
            <WipProjectCard project={featured} featured index={0} />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {rest.map((project, i) => (
              <div key={project.id} id={project.id}>
                <WipProjectCard project={project} index={i + 1} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-pink-400/25 bg-pink-500/[0.06] px-8 py-3.5 text-sm font-medium text-pink-100/90 transition-all hover:border-pink-400/45 hover:bg-pink-500/10 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-pink-400/25 bg-pink-500/[0.06] px-8 py-3.5 text-sm font-medium text-pink-100/90 transition-all hover:border-pink-400/45 hover:bg-pink-500/10 sm:w-auto"
          >
            All Projects
          </Link>
        </div>
      </main>
    </div>
  );
}
