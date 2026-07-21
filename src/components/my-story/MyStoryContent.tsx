"use client";

import { Cormorant_Garamond, Inter } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, Code2, Lightbulb, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { LeadershipJourneySection } from "@/components/my-story/LeadershipJourneySection";
import { PersonBeyondSection } from "@/components/my-story/PersonBeyondSection";
import { PmLessonsSection } from "@/components/my-story/PmLessonsSection";
import { PrinciplesSection } from "@/components/my-story/PrinciplesSection";
import { StoryBackground } from "@/components/my-story/StoryBackground";
import { StoryCard } from "@/components/my-story/StoryCard";
import { StoryClosingSection } from "@/components/my-story/StoryClosingSection";
import { StoryReveal } from "@/components/my-story/StoryReveal";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { myStoryPage } from "@/data/myStoryPage";
import { cn } from "@/lib/utils";
import "./my-story-depth.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

const ease = [0.22, 1, 0.36, 1] as const;

const identityIcons = [Code2, Users, Lightbulb] as const;

function HeroDecoration() {
  return (
    <>
      <span
        className="story-floating-panel story-floating-panel--hero-a"
        aria-hidden
      />
      <span
        className="story-floating-panel story-floating-panel--hero-b"
        aria-hidden
      />
      <svg
        className="story-hero-line story-hero-decoration"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 120 Q100 80 200 110 T400 90"
          fill="none"
          stroke="url(#story-line)"
          strokeWidth="1"
        />
        <defs>
          <linearGradient id="story-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(236,72,153,0)" />
            <stop offset="50%" stopColor="rgba(236,72,153,0.5)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0)" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}

export function MyStoryContent() {
  const pageRef = useRef<HTMLDivElement>(null);
  useScrollDepth(pageRef);

  return (
    <div ref={pageRef} className="story-page relative min-h-screen bg-black">
      <StoryBackground />

      <Navbar />

      <main
        className={cn(
          inter.className,
          "story-scene section-container relative z-[1] pb-20 pt-[120px] sm:pb-24",
        )}
      >
        <Link
          href="/#about"
          className="story-button inline-flex items-center gap-2 text-sm text-pink-300/70 transition-colors hover:text-pink-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to About
        </Link>

        <header className="story-hero relative mt-10 min-h-[200px] sm:min-h-[240px]">
          <HeroDecoration />
          <motion.div
            className="relative z-10 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <h1
              className={cn(
                cormorant.className,
                "story-hero-title text-5xl text-white sm:text-6xl md:text-7xl",
              )}
            >
              {myStoryPage.title}
            </h1>
            <p className="story-hero-subtitle mt-4 max-w-xl text-lg text-neutral-400 sm:text-xl">
              {myStoryPage.tagline}
            </p>
          </motion.div>
        </header>

        <StoryReveal className="story-section mt-14 sm:mt-16">
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {myStoryPage.identities.map((item, i) => {
              const Icon = identityIcons[i];
              return (
                <StoryReveal key={item.title} delay={i * 0.08}>
                  <StoryCard>
                    <div className="story-card-icon flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/25 to-purple-500/10">
                      <Icon className="h-5 w-5 text-pink-300" />
                    </div>
                    <h2
                      className={cn(
                        cormorant.className,
                        "story-card-title mt-4 text-2xl text-white",
                      )}
                    >
                      {item.title}
                    </h2>
                    <p className="story-card-copy mt-2 text-sm leading-relaxed text-neutral-500">
                      {item.line}
                    </p>
                  </StoryCard>
                </StoryReveal>
              );
            })}
          </div>
        </StoryReveal>

        <span
          className="story-floating-panel story-floating-panel--mid"
          aria-hidden
        />

        <StoryReveal>
          <LeadershipJourneySection />
        </StoryReveal>

        <PrinciplesSection />

        <StoryReveal>
          <PmLessonsSection />
        </StoryReveal>

        <PersonBeyondSection />

        <StoryClosingSection />
      </main>
    </div>
  );
}
