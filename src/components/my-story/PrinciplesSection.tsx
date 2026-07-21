"use client";

import { Cormorant_Garamond } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Ear, RefreshCw, Users } from "lucide-react";
import { storyPrinciples, type StoryPrinciple } from "@/data/storyFinale";
import { StoryReveal } from "@/components/my-story/StoryReveal";
import { cn } from "@/lib/utils";
import "./story-finale.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const EASE = [0.22, 1, 0.36, 1] as const;

const icons = {
  ear: Ear,
  compass: Compass,
  users: Users,
  refresh: RefreshCw,
} as const;

function PrincipleCard({
  card,
  index,
}: {
  card: StoryPrinciple;
  index: number;
}) {
  const Icon = icons[card.icon];
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="principle-card"
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.08 + index * 0.1,
                duration: 0.55,
                ease: EASE,
              },
            }
      }
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="principle-icon" aria-hidden>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className={cormorant.className}>{card.title}</h3>
      <p>{card.description}</p>
      <span className="principle-source">{card.source}</span>
    </motion.article>
  );
}

export function PrinciplesSection() {
  return (
    <section className="story-principles" aria-labelledby="principles-title">
      <StoryReveal>
        <header className="story-finale-header">
          <span className="story-eyebrow">{storyPrinciples.eyebrow}</span>
          <h2 id="principles-title" className={cormorant.className}>
            {storyPrinciples.title}
          </h2>
          <p>{storyPrinciples.subtitle}</p>
        </header>
      </StoryReveal>

      <div className="principles-grid">
        {storyPrinciples.cards.map((card, i) => (
          <PrincipleCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
