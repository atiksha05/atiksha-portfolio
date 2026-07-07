"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BookOpen,
  Camera,
  Globe,
  MapPin,
  Music2,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Interest = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const interests: Interest[] = [
  {
    title: "Dancing",
    description: "Movement, rhythm, and expression off the screen.",
    icon: Music2,
  },
  {
    title: "Painting",
    description: "Color, texture, and quiet creative focus.",
    icon: Palette,
  },
  {
    title: "Photography",
    description: "Framing moments and noticing small details.",
    icon: Camera,
  },
  {
    title: "Reading",
    description: "Stories, ideas, and perspectives that widen my lens.",
    icon: BookOpen,
  },
  {
    title: "Exploring San Francisco",
    description: "Neighborhood walks, views, and city energy.",
    icon: MapPin,
  },
  {
    title: "Travel & Culture",
    description: "New places, people, and ways of seeing the world.",
    icon: Globe,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function InterestCard({ title, description, icon: Icon }: Interest) {
  return (
    <motion.article
      variants={staggerItem}
      className={cn(
        "group flex h-full min-h-0 flex-col rounded-2xl border border-pink-400/15 bg-pink-500/[0.03] p-3.5 transition-all duration-500 sm:p-4",
        "hover:border-pink-400/35 hover:bg-pink-500/[0.05] hover:shadow-[0_0_32px_rgba(244,114,182,0.18)]",
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-pink-400/20 bg-pink-500/[0.08] text-pink-300/80 transition-colors group-hover:border-pink-400/35 group-hover:text-pink-200">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="mt-2.5 text-sm font-medium text-pink-50">{title}</h3>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-pink-100/45">
        {description}
      </p>
    </motion.article>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative overflow-x-hidden border-t border-pink-500/[0.08] bg-black lg:h-screen">
      <div
        className="pointer-events-none absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-pink-500/[0.05] blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-fuchsia-500/[0.04] blur-[110px]"
        aria-hidden
      />

      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 py-10 sm:py-12 lg:px-10 lg:py-8">
        <motion.header
          className="shrink-0 max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-pink-400/70">
            Life Outside Work
          </span>
          <h2 className="font-serif-display mt-2 text-[clamp(1.65rem,2.4vw+0.65rem,2.5rem)] leading-[1.12] text-white">
            The parts of me that keep me creative
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-pink-100/55">
            Outside of software and product work, I find inspiration through
            movement, art, stories, and the city around me.
          </p>
        </motion.header>

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-1 gap-3 sm:mt-6 md:grid-cols-2 md:gap-4 lg:mt-6 lg:max-h-[min(560px,calc(100vh-220px))] lg:items-stretch lg:gap-5">
          <motion.div
            className="group relative min-h-[240px] overflow-hidden rounded-2xl border border-pink-400/15 transition-all duration-500 hover:border-pink-400/35 hover:shadow-[0_0_40px_rgba(244,114,182,0.2)] sm:min-h-[260px] md:min-h-0 md:h-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={0.06}
            variants={fadeUp}
          >
            <Image
              src="https://images.unsplash.com/photo-1460661419345-08d8b2a8089e?w=900&q=80"
              alt="Creative life outside work"
              fill
              className="grayscale-image object-cover transition-all duration-700 group-hover:grayscale-0 group-hover:saturate-110"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-pink-300/60 sm:text-xs">
                Featured
              </p>
              <blockquote className="font-serif-display mt-2 text-xl leading-snug text-white sm:text-2xl lg:text-[1.65rem] lg:leading-tight">
                &ldquo;Creativity makes me a better builder.&rdquo;
              </blockquote>
            </div>
          </motion.div>

          <motion.div
            className="grid min-h-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:h-full md:grid-rows-3 md:gap-3 lg:gap-3.5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {interests.map((interest) => (
              <InterestCard key={interest.title} {...interest} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
