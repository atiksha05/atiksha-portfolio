import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { ProjectMasonryCard } from "@/components/projects/ProjectMasonryCard";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { allProjects } from "@/data/projects";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "My Work — Atiksha Antil",
  description:
    "A collection of products, experiments, and ideas from Atiksha Antil — software engineering and product management.",
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <Navbar />

      <main className="section-container relative pb-20 pt-[120px] sm:pb-24">
        <ProjectsHero />

        <div className="mt-16 columns-1 gap-6 md:columns-2 lg:columns-3">
          {allProjects.map((project) => (
            <ProjectMasonryCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-5">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-white/80 transition-all hover:border-white/35 hover:bg-white/[0.08] hover:text-white sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>
          <Link
            href="/work-in-progress"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-pink-400/25 bg-pink-500/[0.06] px-8 py-3.5 text-sm font-medium text-pink-100/90 transition-all hover:border-pink-400/45 hover:bg-pink-500/10 sm:w-auto"
          >
            Work in Progress
          </Link>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-white/80 transition-all hover:border-white/35 hover:bg-white/[0.08] hover:text-white sm:w-auto"
          >
            <ArrowUpRight className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
