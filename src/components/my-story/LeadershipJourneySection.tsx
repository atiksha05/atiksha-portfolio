"use client";

import { Cormorant_Garamond } from "next/font/google";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { useCardTilt } from "@/hooks/useCardTilt";
import {
  leadershipJourney,
  type LeadershipMilestone,
} from "@/data/leadershipJourney";
import { cn } from "@/lib/utils";
import "./leadership-journey.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const EASE = [0.22, 1, 0.36, 1] as const;

function MilestoneDetail({ milestone }: { milestone: LeadershipMilestone }) {
  const { onPointerMove, onPointerLeave } = useCardTilt();

  return (
    <article
      className="lj-detail story-card"
      role="region"
      aria-labelledby={`lj-detail-${milestone.id}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <header className="lj-detail-header">
        <span className="lj-detail-emoji" aria-hidden>
          {milestone.emoji}
        </span>
        <div>
          <p className="lj-detail-org">{milestone.organization}</p>
          <h3
            id={`lj-detail-${milestone.id}`}
            className={cn(cormorant.className, "lj-detail-role")}
          >
            {milestone.role}
          </h3>
          <p className="lj-detail-headline">{milestone.headline}</p>
          <p className="lj-detail-duration">{milestone.duration}</p>
        </div>
      </header>

      <p className="lj-detail-summary">{milestone.summary}</p>

      <div className="lj-detail-grid">
        <div className="lj-detail-block">
          <h4>Biggest lesson</h4>
          <p>{milestone.lesson}</p>
        </div>
        <div className="lj-detail-block">
          <h4>Memorable impact</h4>
          <p>{milestone.impact}</p>
        </div>
      </div>

      <div className="lj-skills">
        <h4>Skills gained</h4>
        <ul>
          {milestone.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>

      <blockquote className="lj-quote">
        <span className="lj-quote-label">{milestone.quoteLabel}</span>
        <p>&ldquo;{milestone.quote}&rdquo;</p>
      </blockquote>
    </article>
  );
}

export function LeadershipJourneySection() {
  const reduceMotion = useReducedMotion();
  const milestones = leadershipJourney.milestones;
  const [activeId, setActiveId] = useState<string>(milestones[0].id);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.9", "center 0.55"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineProgress = useSpring(lineScale, { stiffness: 90, damping: 28 });

  const active = milestones.find((m) => m.id === activeId) ?? milestones[0];

  return (
    <section
      className="lj-section"
      aria-labelledby="lj-title"
      id="leadership-journey"
    >
      <div className="lj-container">
        <header className="lj-header">
          <h2 id="lj-title" className={cn(cormorant.className, "lj-title")}>
            Leadership <span>Journey</span>
          </h2>
          <p className="lj-subtitle">{leadershipJourney.subtitle}</p>
        </header>

        <div className="lj-timeline" ref={trackRef}>
          <div className="lj-track" aria-hidden>
            <div className="lj-track-base" />
            <motion.div
              className="lj-track-glow"
              style={
                reduceMotion
                  ? { scaleX: 1 }
                  : { scaleX: lineProgress, transformOrigin: "left center" }
              }
            />
          </div>

          <ol className="lj-nodes" role="list">
            {milestones.map((m, i) => {
              const isActive = m.id === activeId;
              return (
                <li key={m.id} className="lj-node-wrap">
                  <motion.button
                    type="button"
                    className={cn(
                      "lj-node story-button",
                      isActive && "is-active",
                      m.isCurrent && "is-current",
                    )}
                    onClick={() => setActiveId(m.id)}
                    aria-pressed={isActive}
                    aria-controls="lj-detail-panel"
                    aria-label={`${m.role}, ${m.organization}, ${m.duration}`}
                    initial={
                      reduceMotion ? false : { opacity: 0, scale: 0.82, y: 10 }
                    }
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            delay: 0.08 + i * 0.1,
                            duration: 0.55,
                            ease: EASE,
                          }
                    }
                    whileHover={reduceMotion ? undefined : { scale: 1.12 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  >
                    <span className="lj-node-dot" aria-hidden />
                    {m.isCurrent ? (
                      <span className="lj-node-pulse" aria-hidden />
                    ) : null}
                    <span className="lj-node-year">{m.year}</span>
                    <span className="lj-node-label">
                      <span className="lj-node-emoji" aria-hidden>
                        {m.emoji}
                      </span>
                      {m.role}
                    </span>
                  </motion.button>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          className="lj-mobile-stepper"
          role="tablist"
          aria-label="Leadership milestones"
        >
          {milestones.map((m) => {
            const isActive = m.id === activeId;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={cn(
                  "lj-mobile-step",
                  isActive && "is-active",
                  m.isCurrent && "is-current",
                )}
                onClick={() => setActiveId(m.id)}
              >
                <span className="lj-mobile-dot" aria-hidden />
                <span className="lj-mobile-emoji" aria-hidden>
                  {m.emoji}
                </span>
                <span className="lj-mobile-text">
                  <strong>{m.role}</strong>
                  <span>{m.duration}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div id="lj-detail-panel" className="lj-detail-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.35, ease: EASE }
              }
            >
              <MilestoneDetail milestone={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
