"use client";

import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { storyClosing } from "@/data/storyFinale";
import { StoryReveal } from "@/components/my-story/StoryReveal";
import { cn } from "@/lib/utils";
import "./story-finale.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export function StoryClosingSection() {
  return (
    <StoryReveal>
      <section className="story-closing" aria-labelledby="story-closing-title">
        <span className="story-eyebrow">{storyClosing.eyebrow}</span>
        <h2 id="story-closing-title" className={cormorant.className}>
          {storyClosing.titleLines[0]}
          <br />
          {storyClosing.titleLines[1]}
        </h2>
        <p>{storyClosing.copy}</p>
        <div className="story-closing-actions">
          <Link
            href={storyClosing.primary.href}
            className={cn("story-primary-cta", "story-button")}
          >
            {storyClosing.primary.label}
            <span aria-hidden>→</span>
          </Link>
          <Link
            href={storyClosing.secondary.href}
            className="story-secondary-link"
          >
            {storyClosing.secondary.label}
          </Link>
        </div>
      </section>
    </StoryReveal>
  );
}
