"use client";

import { Cormorant_Garamond } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useCardTilt } from "@/hooks/useCardTilt";
import {
  engineeringLessons,
  leadershipLessons,
  lessonPairings,
  pmConnectionTags,
  pmProcessSteps,
  type PmLesson,
} from "@/data/pmLessons";
import { cn } from "@/lib/utils";
import "./pm-lessons.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const EASE = [0.22, 1, 0.36, 1] as const;
const STAGGER = 0.12;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

function LessonCard({
  lesson,
  hoveredId,
  onHover,
  onLeave,
}: {
  lesson: PmLesson;
  hoveredId: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  const pairedId = hoveredId ? lessonPairings[hoveredId] : undefined;
  const isHovered = hoveredId === lesson.id;
  const isPaired = pairedId === lesson.id;
  const isDimmed = hoveredId !== null && !isHovered && !isPaired;
  const { onPointerMove, onPointerLeave } = useCardTilt();

  return (
    <article
      className={cn(
        "lesson-card story-card",
        isHovered || isPaired ? "is-paired" : null,
        isDimmed ? "is-dimmed" : null,
      )}
      onMouseEnter={() => onHover(lesson.id)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(lesson.id)}
      onBlur={onLeave}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      tabIndex={0}
    >
      <span className="lesson-number story-card-icon">{lesson.number}</span>
      <div className="lesson-content">
        <h4 className="story-card-title">{lesson.title}</h4>
        <p className="story-card-copy">{lesson.copy}</p>
      </div>
    </article>
  );
}

function LessonColumn({
  title,
  intro,
  lessons,
  side,
  hoveredId,
  onHover,
  onLeave,
}: {
  title: string;
  intro: string;
  lessons: PmLesson[];
  side: "leadership" | "engineering";
  hoveredId: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  const variant = side === "leadership" ? slideLeft : slideRight;

  return (
    <motion.article
      variants={variant}
      className={cn(
        "lesson-column",
        side === "leadership" ? "leadership-lessons" : "engineering-lessons",
      )}
    >
      <header className="lesson-column-header">
        <h3 className={cormorant.className}>{title}</h3>
        <p>{intro}</p>
      </header>

      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          hoveredId={hoveredId}
          onHover={onHover}
          onLeave={onLeave}
        />
      ))}
    </motion.article>
  );
}

export function PmLessonsSection() {
  const reduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const nodeActive = hoveredId !== null;

  return (
    <section className="pm-lessons-section" aria-labelledby="pm-lessons-heading">
      <div className="pm-lessons-container">
        <motion.header
          className="pm-lessons-header"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 id="pm-lessons-heading" className={cormorant.className}>
            Lessons I Carry Into{" "}
            <span className="accent">Product Management</span>
          </h2>
          <p>
            My leadership experiences taught me how to align people, communicate
            clearly, and take ownership. Software engineering taught me how
            systems work, how constraints shape decisions, and how ideas become
            real products.
          </p>
          <p>
            <span className="accent">Product Management</span> is where those
            lessons come together.
          </p>
        </motion.header>

        <motion.div
          className="pm-lessons-path"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduceMotion ? 0 : STAGGER,
                delayChildren: reduceMotion ? 0 : 0.08,
              },
            },
          }}
        >
          <LessonColumn
            title="Leadership taught me"
            intro="Leading teams and communities taught me that progress depends on clarity, trust, and shared ownership."
            lessons={leadershipLessons}
            side="leadership"
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
          />

          <motion.div variants={fadeUp} className="pm-connection">
            <div className="connection-line connection-line-top" aria-hidden />
            <div className={cn("pm-node", nodeActive && "is-active")}>
              <span className="pm-node-label">Product Management</span>
              <span className="pm-node-tag">Connecting:</span>
              {pmConnectionTags.map((tag) => (
                <span key={tag} className="pm-node-tag">
                  {tag}
                </span>
              ))}
            </div>
            <div
              className="connection-line connection-line-bottom"
              aria-hidden
            />
          </motion.div>

          <LessonColumn
            title="Software engineering taught me"
            intro="Building software taught me how ideas move from abstract problems to reliable, usable systems."
            lessons={engineeringLessons}
            side="engineering"
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
          />
        </motion.div>

        <motion.div
          className="pm-outcome-card"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="pm-outcome-copy">
            <span className="eyebrow">MY PRODUCT APPROACH</span>
            <h3 className={cormorant.className}>
              How I approach Product Management
            </h3>
            <p>
              I begin by understanding the user and the problem before
              discussing solutions. I create clarity around goals, constraints,
              stakeholders, and priorities. Then I work collaboratively with
              design and engineering to move from idea to execution, learn from
              feedback, and improve the product.
            </p>
          </div>

          <div className="pm-process" role="list" aria-label="Product approach">
            {pmProcessSteps.map((step) => (
              <div
                key={step}
                role="listitem"
                className={cn(
                  "pm-process-step",
                  step === "Build" && "is-highlight",
                )}
              >
                {step}
              </div>
            ))}
          </div>

          <p className="pm-closing">
            I want to build products that are technically thoughtful, genuinely
            useful, and designed with empathy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
