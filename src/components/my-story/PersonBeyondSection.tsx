"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";
import {
  Coffee,
  Dumbbell,
  MapPin,
  NotebookPen,
  Sunset,
} from "lucide-react";
import {
  alternatePathCard,
  curiositySection,
  musicCard,
  personBeyondClosing,
  personBeyondSection,
  randomThoughtsSection,
  readingCard,
  ritualsCard,
  sketchingCard,
  twinPeaksCard,
} from "@/data/personBeyond";
import { cn } from "@/lib/utils";
import "./person-beyond.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: EASE },
  }),
};

function WaveIcon() {
  return (
    <span className="artist-wave" aria-hidden>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function RitualIcon({
  icon,
}: {
  icon: (typeof ritualsCard.rituals)[number]["icon"];
}) {
  const className = "h-4 w-4";
  const strokeWidth = 1.75;
  if (icon === "coffee")
    return <Coffee className={className} strokeWidth={strokeWidth} aria-hidden />;
  if (icon === "sunset")
    return <Sunset className={className} strokeWidth={strokeWidth} aria-hidden />;
  if (icon === "gym")
    return (
      <Dumbbell className={className} strokeWidth={strokeWidth} aria-hidden />
    );
  return (
    <NotebookPen className={className} strokeWidth={strokeWidth} aria-hidden />
  );
}

function ImageCard({
  className,
  category,
  title,
  children,
  image,
  alt,
  objectPosition,
  delay,
}: {
  className: string;
  category: string;
  title: string;
  children: ReactNode;
  image: string;
  alt: string;
  objectPosition: string;
  delay: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={cn("beyond-card beyond-image-card", className)}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.15 }}
      custom={delay}
      variants={fadeUp}
    >
      <div className="beyond-image-media">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 1000px) 100vw, 55vw"
          style={{ objectFit: "cover", objectPosition }}
        />
      </div>
      <div className="beyond-image-overlay" aria-hidden />
      <div className="beyond-image-content">
        <span className="beyond-category">{category}</span>
        <h3 className={cormorant.className}>{title}</h3>
        {children}
      </div>
    </motion.article>
  );
}

export function PersonBeyondSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="person-beyond-section"
      aria-labelledby="person-beyond-title"
    >
      <header className="person-beyond-header">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={fadeUp}
        >
          <span className="story-eyebrow">{personBeyondSection.eyebrow}</span>
          <h2 id="person-beyond-title" className={cormorant.className}>
            {personBeyondSection.title}
          </h2>
          <p>{personBeyondSection.subtitle}</p>
        </motion.div>
      </header>

      <div className="person-beyond-grid">
        {/* Reading */}
        <motion.article
          className="beyond-card reading-card"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.12 }}
          custom={0.05}
          variants={fadeUp}
        >
          <span className="beyond-category">{readingCard.category}</span>
          <h3 className={cormorant.className}>{readingCard.title}</h3>
          <p className="beyond-lead">{readingCard.copy}</p>

          <div className="book-list">
            {readingCard.books.map((book, i) => (
              <div className="book-row" key={book.title}>
                <span className="book-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="book-title">{book.title}</p>
                  <p className="book-author">{book.author}</p>
                  <p className="book-note">{book.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reading-next">
            <p className="reading-next-label">Next on my list</p>
            <div className="reading-next-list">
              {readingCard.nextUp.map((title) => (
                <span key={title}>{title}</span>
              ))}
            </div>
          </div>
        </motion.article>

        {/* Music */}
        <motion.article
          className="beyond-card music-card"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.12 }}
          custom={0.15}
          variants={fadeUp}
        >
          <span className="beyond-category">{musicCard.category}</span>
          <h3 className={cormorant.className}>{musicCard.title}</h3>
          <p className="beyond-lead">{musicCard.copy}</p>
          <span className="music-chip">{musicCard.chip}</span>

          <div className="artist-list">
            {musicCard.artists.map((artist) => (
              <div className="artist-row" key={artist.name}>
                <div className="artist-icon">
                  <WaveIcon />
                </div>
                <div>
                  <p className="artist-name">{artist.name}</p>
                  <p className="artist-detail">{artist.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="music-footer">{musicCard.footer}</p>
        </motion.article>

        {/* Sketching */}
        <ImageCard
          className="sketching-card"
          category={sketchingCard.category}
          title={sketchingCard.title}
          image={sketchingCard.image}
          alt={sketchingCard.alt}
          objectPosition={sketchingCard.objectPosition}
          delay={0.25}
        >
          {sketchingCard.copy.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="beyond-lead">
              {paragraph}
            </p>
          ))}
          <div className="beyond-takeaway">
            <span className="beyond-takeaway-label">
              {sketchingCard.takeawayLabel}
            </span>
            <p>{sketchingCard.takeaway}</p>
          </div>
        </ImageCard>

        {/* Twin Peaks */}
        <ImageCard
          className="twin-peaks-card"
          category={twinPeaksCard.category}
          title={twinPeaksCard.title}
          image={twinPeaksCard.image}
          alt={twinPeaksCard.alt}
          objectPosition={twinPeaksCard.objectPosition}
          delay={0.35}
        >
          {twinPeaksCard.copy.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="beyond-lead">
              {paragraph}
            </p>
          ))}
          <span className="beyond-location">
            <MapPin
              className="mr-1.5 inline h-3.5 w-3.5"
              strokeWidth={2}
              aria-hidden
            />
            {twinPeaksCard.location}
          </span>
        </ImageCard>

        {/* Alternate path */}
        <ImageCard
          className="alternate-path-card"
          category={alternatePathCard.category}
          title={alternatePathCard.title}
          image={alternatePathCard.image}
          alt={alternatePathCard.alt}
          objectPosition={alternatePathCard.objectPosition}
          delay={0.45}
        >
          {alternatePathCard.copy.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="beyond-lead">
              {paragraph}
            </p>
          ))}
          <div className="beyond-highlight">
            <p>{alternatePathCard.highlight}</p>
          </div>
        </ImageCard>

        {/* Rituals */}
        <motion.article
          className="beyond-card rituals-card"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.12 }}
          custom={0.55}
          variants={fadeUp}
        >
          <span className="beyond-category">{ritualsCard.category}</span>
          <h3 className={cormorant.className}>{ritualsCard.title}</h3>
          <div className="rituals-grid">
            {ritualsCard.rituals.map((ritual) => (
              <div className="ritual-item" key={ritual.id}>
                <div className="ritual-icon">
                  <RitualIcon icon={ritual.icon} />
                </div>
                <h4>{ritual.title}</h4>
                <p>{ritual.description}</p>
              </div>
            ))}
          </div>
        </motion.article>
      </div>

      {/* Curiosity */}
      <motion.section
        className="curiosity-section"
        aria-labelledby="curiosity-title"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
        custom={0.1}
        variants={fadeUp}
      >
        <span className="story-eyebrow">{curiositySection.eyebrow}</span>
        <h3 id="curiosity-title" className={cormorant.className}>
          {curiositySection.title}
        </h3>
        <div className="curiosity-cloud">
          {curiositySection.items.map((item, i) => (
            <motion.span
              key={item}
              className="curiosity-pill"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.08 + i * 0.05,
                        duration: 0.45,
                        ease: EASE,
                      },
                    }
              }
              viewport={{ once: true }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* Random thoughts */}
      <motion.section
        className="random-thoughts-section"
        aria-labelledby="thoughts-title"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.15 }}
        custom={0.15}
        variants={fadeUp}
      >
        <h3 id="thoughts-title" className={cormorant.className}>
          {randomThoughtsSection.title}
        </h3>
        <div className="thoughts-grid">
          {randomThoughtsSection.thoughts.map((thought, i) => (
            <motion.blockquote
              key={thought}
              className="thought-card"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.1 + i * 0.06,
                        duration: 0.5,
                        ease: EASE,
                      },
                    }
              }
              viewport={{ once: true }}
            >
              {thought}
            </motion.blockquote>
          ))}
        </div>
      </motion.section>

      {/* Closing */}
      <motion.div
        className="person-beyond-closing"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.3 }}
        custom={0.1}
        variants={fadeUp}
      >
        <blockquote className={cormorant.className}>
          {personBeyondClosing}
        </blockquote>
      </motion.div>
    </section>
  );
}
