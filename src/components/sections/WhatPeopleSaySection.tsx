"use client";

import { Cormorant_Garamond, Inter } from "next/font/google";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ExternalLink, Plus, Star, X } from "lucide-react";
import {
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  constellationConnections,
  constellationReviews as seedReviews,
  constellationSection,
  leaveReviewOrb,
  type ConstellationReview,
} from "@/data/constellationReviews";
import { toConstellationReview, type StoredReview } from "@/lib/reviews/types";
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
});

const ease = [0.22, 1, 0.36, 1] as const;
const SMOOTH = { duration: 0.45, ease };
const FADE = { duration: 0.35, ease: "easeOut" as const };
const NEW_STAR = { duration: 0.85, ease };

type Breakpoint = "mobile" | "tablet" | "desktop";
type Pos = { x: number; y: number };
type NetworkReview = ConstellationReview & {
  rating?: number;
  isLive?: boolean;
  isNew?: boolean;
};

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}

function getPos(review: ConstellationReview, bp: Breakpoint): Pos {
  return bp === "tablet" ? review.tablet : review.desktop;
}

function initialsGlow(glow: ConstellationReview["glow"]) {
  if (glow === "purple")
    return "from-purple-400/40 via-fuchsia-400/20 to-pink-500/10";
  if (glow === "white")
    return "from-white/30 via-pink-200/15 to-purple-400/10";
  return "from-pink-400/45 via-fuchsia-400/20 to-purple-500/10";
}

function mergeReviews(live: NetworkReview[]): NetworkReview[] {
  const byId = new Map<string, NetworkReview>();
  for (const r of seedReviews) byId.set(r.id, r);
  for (const r of live) byId.set(r.id, { ...r, isLive: true });
  return Array.from(byId.values());
}

function buildConnections(reviews: NetworkReview[]): [string, string][] {
  const ids = new Set(reviews.map((r) => r.id));
  const base = constellationConnections.filter(
    ([a, b]) => ids.has(a) && ids.has(b),
  );
  const live = reviews.filter((r) => r.isLive);
  const extras: [string, string][] = [];

  for (const review of live) {
    let nearest: NetworkReview | null = null;
    let best = Infinity;
    for (const other of reviews) {
      if (other.id === review.id) continue;
      const dx = other.desktop.x - review.desktop.x;
      const dy = other.desktop.y - review.desktop.y;
      const d = dx * dx + dy * dy;
      if (d < best) {
        best = d;
        nearest = other;
      }
    }
    if (nearest) extras.push([review.id, nearest.id]);
  }

  return [...base, ...extras];
}

function BackgroundStars({
  count = 36,
  paused,
}: {
  count?: number;
  paused?: boolean;
}) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 1 + (i % 3),
        delay: (i % 8) * 0.35,
        duration: 4 + (i % 5),
      })),
    [count],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-pink-100/60"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 6px rgba(244,114,182,0.35)",
          }}
          animate={paused ? { opacity: 0.25 } : { opacity: [0.12, 0.55, 0.12] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: paused ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function nodeRadiusPx(
  size: ConstellationReview["size"],
  width: number,
): number {
  const base = Math.min(39, Math.max(27, width * 0.028));
  if (size === "lg") return base * 1.08;
  if (size === "sm") return base * 0.9;
  return base;
}

function shortenedCurve(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  r1: number,
  r2: number,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.hypot(dx, dy);
  if (distance < 1) {
    return { d: `M ${x1} ${y1}`, mid: { x: x1, y: y1 } };
  }

  const ux = dx / distance;
  const uy = dy / distance;
  const startX = x1 + ux * r1;
  const startY = y1 + uy * r1;
  const endX = x2 - ux * r2;
  const endY = y2 - uy * r2;

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const curve = Math.min(18, distance * 0.08);
  const controlX = midX - uy * curve;
  const controlY = midY + ux * curve;

  return {
    d: `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`,
    mid: { x: midX, y: midY },
  };
}

function ConnectionLines({
  reviews,
  connections,
  bp,
  hoveredId,
  activeId,
  reducedMotion,
}: {
  reviews: NetworkReview[];
  connections: [string, string][];
  bp: Breakpoint;
  hoveredId: string | null;
  activeId: string | null;
  reducedMotion: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const parent = svgRef.current?.parentElement;
    if (!parent) return;

    const update = () => {
      const rect = parent.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const byId = useMemo(
    () => Object.fromEntries(reviews.map((r) => [r.id, r])),
    [reviews],
  );

  const visible =
    bp === "tablet"
      ? connections.slice(0, Math.min(8, connections.length))
      : connections;

  return (
    <svg
      ref={svgRef}
      className="testimonial-connections"
      viewBox={size.w > 0 ? `0 0 ${size.w} ${size.h}` : undefined}
      preserveAspectRatio="none"
      aria-hidden
    >
      {size.w > 0 &&
        visible.map(([a, b]) => {
          const ra = byId[a];
          const rb = byId[b];
          if (!ra || !rb) return null;
          const pa = getPos(ra, bp);
          const pb = getPos(rb, bp);
          const x1 = (pa.x / 100) * size.w;
          const y1 = (pa.y / 100) * size.h;
          const x2 = (pb.x / 100) * size.w;
          const y2 = (pb.y / 100) * size.h;
          const { d } = shortenedCurve(
            x1,
            y1,
            x2,
            y2,
            nodeRadiusPx(ra.size, size.w),
            nodeRadiusPx(rb.size, size.w),
          );
          const related =
            hoveredId === a ||
            hoveredId === b ||
            activeId === a ||
            activeId === b;

          return (
            <motion.path
              key={`${a}-${b}`}
              d={d}
              fill="none"
              stroke="url(#constellation-line)"
              strokeWidth={related ? 1.35 : 0.75}
              strokeLinecap="round"
              initial={false}
              animate={{ opacity: related ? 0.65 : 0.22 }}
              transition={
                reducedMotion ? { duration: 0.01 } : { duration: 0.4, ease }
              }
            />
          );
        })}
      <defs>
        <linearGradient
          id="constellation-line"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="rgba(244,114,182,0.15)" />
          <stop offset="50%" stopColor="rgba(216,180,254,0.5)" />
          <stop offset="100%" stopColor="rgba(244,114,182,0.15)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ReviewOrb({
  review,
  bp,
  isHovered,
  isActive,
  isDimmed,
  pauseDecor,
  reducedMotion,
  onHover,
  onLeave,
  onSelect,
  onIntroComplete,
}: {
  review: NetworkReview;
  bp: Breakpoint;
  isHovered: boolean;
  isActive: boolean;
  isDimmed: boolean;
  pauseDecor: boolean;
  reducedMotion: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
  onIntroComplete?: () => void;
}) {
  const pos = getPos(review, bp);
  const floatDuration = 5.5 + (review.id.length % 3) * 0.7;
  const isNew = Boolean(review.isNew);

  return (
    <motion.button
      type="button"
      aria-label={`Open review from ${review.name}, ${review.role}`}
      aria-expanded={isActive}
      className={cn(
        "testimonial-node absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full outline-none",
        "focus-visible:ring-2 focus-visible:ring-pink-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
      )}
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onClick={onSelect}
      initial={
        isNew
          ? { opacity: 0, scale: 0.4, filter: "blur(10px)" }
          : { opacity: 0, scale: 0.92, filter: "blur(0px)" }
      }
      animate={{
        opacity: isDimmed ? 0.4 : 1,
        scale: isActive ? 1.08 : 1,
        filter: "blur(0px)",
      }}
      transition={
        reducedMotion
          ? { duration: 0.01 }
          : isNew
            ? NEW_STAR
            : SMOOTH
      }
      onAnimationComplete={() => {
        if (isNew) onIntroComplete?.();
      }}
    >
      <motion.div
        className="relative"
        animate={
          reducedMotion || pauseDecor || isNew ? { y: 0 } : { y: [0, -5, 0] }
        }
        transition={
          reducedMotion || pauseDecor || isNew
            ? { duration: 0.35 }
            : {
                duration: floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        <motion.span
          className={cn(
            "absolute -inset-2.5 rounded-full bg-gradient-to-br blur-md",
            initialsGlow(review.glow),
          )}
          animate={
            isNew
              ? { opacity: [0.2, 0.9, 0.55], scale: [0.7, 1.2, 1] }
              : reducedMotion || pauseDecor
                ? { opacity: isHovered || isActive ? 0.65 : 0.4 }
                : {
                    opacity:
                      isHovered || isActive
                        ? [0.5, 0.75, 0.5]
                        : [0.3, 0.5, 0.3],
                  }
          }
          transition={
            reducedMotion
              ? { duration: 0.01 }
              : isNew
                ? NEW_STAR
                : {
                    duration: 3.2,
                    repeat: pauseDecor ? 0 : Infinity,
                    ease: "easeInOut",
                  }
          }
          aria-hidden
        />

        <span
          className={cn(
            "testimonial-node-orb relative flex items-center justify-center rounded-full border border-pink-300/30 bg-gradient-to-br text-sm font-medium text-pink-50 shadow-[0_0_24px_rgba(244,114,182,0.28)]",
            initialsGlow(review.glow),
            inter.className,
            isActive &&
              "border-pink-300/55 shadow-[0_0_36px_rgba(244,114,182,0.45)]",
            isHovered &&
              !isActive &&
              "border-pink-300/45 shadow-[0_0_32px_rgba(244,114,182,0.38)]",
            isNew && "shadow-[0_0_48px_rgba(244,114,182,0.55)]",
          )}
        >
          {review.initials}
        </span>

        <AnimatePresence>
          {(isHovered || isActive) && (
            <motion.span
              className={cn(
                inter.className,
                "absolute left-1/2 top-[calc(100%+8px)] z-20 w-max max-w-[150px] -translate-x-1/2 rounded-full border border-pink-400/25 bg-black/85 px-2.5 py-1 text-center text-[10px] text-pink-100/80 backdrop-blur-md",
              )}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={FADE}
            >
              <span className="block font-medium text-pink-50">
                {review.name}
              </span>
              <span className="block text-pink-300/55">{review.role}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}

function LeaveReviewOrb({
  bp,
  isActive,
  isDimmed,
  pauseDecor,
  reducedMotion,
  onSelect,
}: {
  bp: Breakpoint;
  isActive: boolean;
  isDimmed: boolean;
  pauseDecor: boolean;
  reducedMotion: boolean;
  onSelect: () => void;
}) {
  const pos = bp === "tablet" ? leaveReviewOrb.tablet : leaveReviewOrb.desktop;

  return (
    <motion.button
      type="button"
      aria-label="Leave a review"
      aria-expanded={isActive}
      className={cn(
        "add-review-button absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full outline-none",
        "focus-visible:ring-2 focus-visible:ring-pink-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
      )}
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      onClick={onSelect}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: isDimmed ? 0.4 : 1,
        scale: isActive ? 1.06 : 1,
      }}
      transition={reducedMotion ? { duration: 0.01 } : SMOOTH}
    >
      <span className="relative flex h-[clamp(60px,5vw,78px)] w-[clamp(60px,5vw,78px)] items-center justify-center">
        {!reducedMotion && !pauseDecor && (
          <motion.span
            className="absolute inset-0 rounded-full border border-pink-400/35"
            animate={{ scale: [1, 1.4], opacity: [0.45, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
            aria-hidden
          />
        )}
        <span className="absolute inset-0 rounded-full bg-pink-500/20 blur-md" aria-hidden />
        <span className="relative flex h-[85%] w-[85%] items-center justify-center rounded-full border border-pink-300/50 bg-gradient-to-br from-pink-400/40 via-fuchsia-500/25 to-purple-500/20 text-pink-50 shadow-[0_0_32px_rgba(244,114,182,0.45)]">
          <Plus className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} aria-hidden />
        </span>
      </span>
      <span
        className={cn(
          inter.className,
          "pointer-events-none absolute left-1/2 top-[calc(100%+8px)] z-10 w-max -translate-x-1/2 text-center text-[11px] font-medium tracking-[0.08em] text-pink-200/85 sm:text-xs",
        )}
      >
        Leave a Review
      </span>
    </motion.button>
  );
}

function TestimonialCard({
  review,
  bp,
  onClose,
}: {
  review: NetworkReview;
  bp: Breakpoint;
  onClose: () => void;
}) {
  const pos = getPos(review, bp);
  const titleId = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={cn(
        "review-card absolute z-40 w-[min(90%,340px)] rounded-3xl border border-pink-400/30 bg-gradient-to-br from-zinc-950/95 via-black/95 to-purple-950/40 p-5 shadow-[0_0_48px_rgba(244,114,182,0.22)] backdrop-blur-xl",
        "-translate-x-1/2 -translate-y-[108%]",
      )}
      style={{
        left: `${Math.min(86, Math.max(14, pos.x))}%`,
        top: `${Math.max(22, Math.min(70, pos.y))}%`,
      }}
      initial={{ opacity: 0, scale: 0.94, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 8 }}
      transition={SMOOTH}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close review"
        className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-pink-400/20 text-pink-200/70 transition-[border-color,color] duration-350 hover:border-pink-400/40 hover:text-pink-50"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>

      <div className="flex items-center gap-3 pr-8">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-pink-400/30 bg-gradient-to-br text-sm font-medium text-pink-50",
            initialsGlow(review.glow),
            inter.className,
          )}
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <p
            id={titleId}
            className={cn(cormorant.className, "text-xl font-semibold text-white")}
          >
            {review.name}
          </p>
          <p className={cn(inter.className, "text-xs text-pink-300/55")}>
            {review.role}
          </p>
          {typeof review.rating === "number" && (
            <div className="mt-1 flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < review.rating!
                      ? "fill-pink-400 text-pink-400"
                      : "text-pink-400/25",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <p
        className={cn(
          inter.className,
          "mt-4 text-sm leading-relaxed text-pink-100/70",
        )}
      >
        &ldquo;{review.quote}&rdquo;
      </p>

      {review.linkedInUrl && (
        <a
          href={review.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-pink-300/70 transition-colors hover:text-pink-200"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          LinkedIn
        </a>
      )}
    </motion.div>
  );
}

function LeaveReviewModal({
  onClose,
  onSubmitted,
}: {
  onClose: () => void;
  onSubmitted: (review: NetworkReview) => void;
}) {
  const titleId = useId();
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, submitting]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      role: String(form.get("role") || ""),
      company: String(form.get("company") || ""),
      rating,
      quote: String(form.get("quote") || ""),
      linkedInUrl: String(form.get("linkedin") || ""),
    };

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        review?: StoredReview;
        error?: string;
      };

      if (!res.ok || !data.review) {
        throw new Error(data.error || "Failed to save review.");
      }

      setSuccess(true);
      const networkReview: NetworkReview = {
        ...toConstellationReview(data.review),
        isNew: true,
      };

      window.setTimeout(() => {
        onSubmitted(networkReview);
        onClose();
      }, 2400);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="review-modal fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={FADE}
      onClick={() => {
        if (!submitting && !success) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg rounded-3xl border border-pink-400/30 bg-gradient-to-br from-zinc-950 via-black to-purple-950/40 p-6 shadow-[0_0_60px_rgba(244,114,182,0.2)] sm:p-8"
        initial={{ opacity: 0, scale: 0.94, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 8 }}
        transition={SMOOTH}
        onClick={(e) => e.stopPropagation()}
      >
        {!success && (
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close leave a review form"
            className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-pink-400/20 text-pink-200/70 transition-[border-color,color] duration-350 hover:border-pink-400/40 hover:text-pink-50 disabled:opacity-40"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              className="py-10 text-center"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={SMOOTH}
            >
              <motion.span
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-pink-400/40 bg-pink-500/15 text-pink-200 shadow-[0_0_36px_rgba(244,114,182,0.35)]"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={NEW_STAR}
                aria-hidden
              >
                <Star className="h-6 w-6 fill-pink-300 text-pink-300" />
              </motion.span>
              <p
                className={cn(
                  cormorant.className,
                  "text-2xl font-semibold text-white",
                )}
              >
                Thank you for sharing your experience!
              </p>
              <p className={cn(inter.className, "mt-2 text-sm text-pink-100/55")}>
                Your review is joining the constellation…
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3
                id={titleId}
                className={cn(
                  cormorant.className,
                  "pr-8 text-2xl font-semibold text-white sm:text-3xl",
                )}
              >
                Leave a Review
              </h3>
              <p className={cn(inter.className, "mt-2 text-sm text-pink-100/50")}>
                Share a note about working with Atiksha. It will appear in the
                network right away.
              </p>

              <form
                className={cn(inter.className, "mt-6 space-y-4")}
                onSubmit={handleSubmit}
              >
                <label className="block text-xs text-pink-300/60">
                  Name
                  <input
                    required
                    name="name"
                    disabled={submitting}
                    className="mt-1.5 w-full rounded-xl border border-pink-400/20 bg-black/50 px-3 py-2.5 text-sm text-pink-50 outline-none placeholder:text-pink-300/30 focus:border-pink-400/45 disabled:opacity-60"
                    placeholder="Your name"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs text-pink-300/60">
                    Position (optional)
                    <input
                      name="role"
                      disabled={submitting}
                      className="mt-1.5 w-full rounded-xl border border-pink-400/20 bg-black/50 px-3 py-2.5 text-sm text-pink-50 outline-none placeholder:text-pink-300/30 focus:border-pink-400/45 disabled:opacity-60"
                      placeholder="Product Lead"
                    />
                  </label>
                  <label className="block text-xs text-pink-300/60">
                    Company (optional)
                    <input
                      name="company"
                      disabled={submitting}
                      className="mt-1.5 w-full rounded-xl border border-pink-400/20 bg-black/50 px-3 py-2.5 text-sm text-pink-50 outline-none placeholder:text-pink-300/30 focus:border-pink-400/45 disabled:opacity-60"
                      placeholder="Acme"
                    />
                  </label>
                </div>

                <fieldset className="block text-xs text-pink-300/60">
                  <legend className="mb-1.5">Rating</legend>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 5 }, (_, i) => {
                      const value = i + 1;
                      return (
                        <button
                          key={value}
                          type="button"
                          disabled={submitting}
                          aria-label={`${value} star${value === 1 ? "" : "s"}`}
                          aria-pressed={rating === value}
                          onClick={() => setRating(value)}
                          className="cursor-pointer rounded-md p-1 transition-transform duration-300 hover:scale-110 disabled:opacity-60"
                        >
                          <Star
                            className={cn(
                              "h-6 w-6 transition-colors duration-300",
                              value <= rating
                                ? "fill-pink-400 text-pink-400"
                                : "text-pink-400/25",
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <label className="block text-xs text-pink-300/60">
                  Review
                  <textarea
                    required
                    name="quote"
                    rows={4}
                    disabled={submitting}
                    className="mt-1.5 w-full resize-none rounded-xl border border-pink-400/20 bg-black/50 px-3 py-2.5 text-sm text-pink-50 outline-none placeholder:text-pink-300/30 focus:border-pink-400/45 disabled:opacity-60"
                    placeholder="Write your review…"
                  />
                </label>

                <label className="block text-xs text-pink-300/60">
                  LinkedIn (optional)
                  <input
                    type="url"
                    name="linkedin"
                    disabled={submitting}
                    className="mt-1.5 w-full rounded-xl border border-pink-400/20 bg-black/50 px-3 py-2.5 text-sm text-pink-50 outline-none placeholder:text-pink-300/30 focus:border-pink-400/45 disabled:opacity-60"
                    placeholder="https://linkedin.com/in/…"
                  />
                </label>

                {error && (
                  <p className="text-xs text-rose-300/90" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="glow-button-pink mt-2 inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-pink-400/35 px-5 py-2.5 text-sm text-pink-50 disabled:cursor-wait disabled:opacity-60"
                >
                  {submitting ? "Sharing…" : "Submit"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function MobileReviewStack({
  reviews,
  onLeave,
}: {
  reviews: NetworkReview[];
  onLeave: () => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className="testimonials-network">
      {reviews.map((review, index) => {
        const isOpen = openId === review.id;
        return (
          <motion.button
            key={review.id}
            type="button"
            aria-expanded={isOpen}
            aria-label={`Review from ${review.name}`}
            onClick={() => setOpenId(isOpen ? null : review.id)}
            className={cn(
              "w-full cursor-pointer rounded-2xl border p-4 text-left transition-[border-color,box-shadow,background-color] duration-350",
              isOpen
                ? "border-pink-400/40 bg-gradient-to-br from-pink-500/12 via-fuchsia-500/8 to-purple-900/20 shadow-[0_0_28px_rgba(244,114,182,0.16)]"
                : "border-pink-400/15 bg-pink-500/[0.04]",
            )}
            initial={
              review.isNew
                ? { opacity: 0, scale: 0.4, filter: "blur(10px)" }
                : { opacity: 0, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            transition={
              reducedMotion
                ? { duration: 0.01 }
                : review.isNew
                  ? NEW_STAR
                  : { ...SMOOTH, delay: index * 0.05 }
            }
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-pink-400/30 bg-gradient-to-br text-xs font-medium text-pink-50",
                  initialsGlow(review.glow),
                  inter.className,
                )}
              >
                {review.initials}
              </span>
              <div className="min-w-0">
                <p className={cn(inter.className, "text-sm font-medium text-pink-50")}>
                  {review.name}
                </p>
                <p className={cn(inter.className, "text-xs text-pink-300/50")}>
                  {review.role}
                </p>
              </div>
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.p
                  className={cn(
                    inter.className,
                    "mt-3 text-sm leading-relaxed text-pink-100/65",
                  )}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={SMOOTH}
                >
                  &ldquo;{review.quote}&rdquo;
                </motion.p>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}

      <button
        type="button"
        onClick={onLeave}
        className="add-review-button flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-pink-400/30 bg-pink-500/[0.08] px-4 py-3.5 text-sm text-pink-100 transition-[border-color,box-shadow,background-color] duration-350 hover:border-pink-400/45 hover:shadow-[0_0_24px_rgba(244,114,182,0.2)]"
      >
        <Plus className="h-4 w-4" aria-hidden />
        {leaveReviewOrb.label}
      </button>
    </div>
  );
}

function DesktopNetwork({
  bp,
  reducedMotion,
  reviews,
  onOpenLeave,
  leaveOpen,
  onCloseLeave,
  onReviewSubmitted,
  clearNewFlag,
}: {
  bp: "tablet" | "desktop";
  reducedMotion: boolean;
  reviews: NetworkReview[];
  onOpenLeave: () => void;
  leaveOpen: boolean;
  onCloseLeave: () => void;
  onReviewSubmitted: (review: NetworkReview) => void;
  clearNewFlag: (id: string) => void;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 22 });
  const parallaxX = useTransform(springX, [0, 1], [-6, 6]);
  const parallaxY = useTransform(springY, [0, 1], [-4, 4]);
  const glowX = useTransform(springX, (v) => `${v * 100}%`);
  const glowY = useTransform(springY, (v) => `${v * 100}%`);

  const enableParallax = bp === "desktop" && !reducedMotion;
  const pauseDecor = activeId !== null || leaveOpen;
  const activeReview = reviews.find((r) => r.id === activeId) ?? null;
  const connections = useMemo(() => buildConnections(reviews), [reviews]);

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!enableParallax || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [enableParallax, mouseX, mouseY],
  );

  return (
    <>
      <div
        ref={canvasRef}
        className="testimonials-network"
        onPointerMove={handlePointerMove}
      >
        <BackgroundStars count={bp === "tablet" ? 24 : 36} paused={pauseDecor} />

        {enableParallax && (
          <motion.div
            className="pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/[0.06] blur-[70px]"
            style={{ left: glowX, top: glowY }}
            aria-hidden
          />
        )}

        <motion.div
          className="absolute inset-0"
          style={enableParallax ? { x: parallaxX, y: parallaxY } : undefined}
        >
          <ConnectionLines
            reviews={reviews}
            connections={connections}
            bp={bp}
            hoveredId={hoveredId}
            activeId={activeId}
            reducedMotion={reducedMotion}
          />

          {reviews.map((review) => (
            <ReviewOrb
              key={review.id}
              review={review}
              bp={bp}
              isHovered={hoveredId === review.id}
              isActive={activeId === review.id}
              isDimmed={
                (activeId !== null && activeId !== review.id) || leaveOpen
              }
              pauseDecor={pauseDecor}
              reducedMotion={reducedMotion}
              onHover={() => setHoveredId(review.id)}
              onLeave={() => setHoveredId(null)}
              onSelect={() => {
                setActiveId((prev) => (prev === review.id ? null : review.id));
              }}
              onIntroComplete={() => clearNewFlag(review.id)}
            />
          ))}

          <LeaveReviewOrb
            bp={bp}
            isActive={leaveOpen}
            isDimmed={activeId !== null}
            pauseDecor={pauseDecor}
            reducedMotion={reducedMotion}
            onSelect={() => {
              setActiveId(null);
              onOpenLeave();
            }}
          />

          <AnimatePresence>
            {activeReview && (
              <TestimonialCard
                key={activeReview.id}
                review={activeReview}
                bp={bp}
                onClose={() => setActiveId(null)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {leaveOpen && (
          <LeaveReviewModal
            onClose={onCloseLeave}
            onSubmitted={onReviewSubmitted}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export function WhatPeopleSaySection() {
  const bp = useBreakpoint();
  const reducedMotion = useReducedMotion() ?? false;
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [reviews, setReviews] = useState<NetworkReview[]>(seedReviews);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/reviews", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { reviews?: StoredReview[] };
        if (cancelled || !data.reviews?.length) return;
        setReviews(
          mergeReviews(data.reviews.map((r) => toConstellationReview(r))),
        );
      } catch {
        // Keep seed reviews if the API is unavailable.
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmitted = useCallback((review: NetworkReview) => {
    setReviews((prev) => {
      if (prev.some((r) => r.id === review.id)) return prev;
      return [...prev, review];
    });
  }, []);

  const clearNewFlag = useCallback((id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isNew: false } : r)),
    );
  }, []);

  return (
    <section
      id="testimonials"
      className="testimonials-section relative scroll-mt-[var(--navbar-height,64px)] border-t border-pink-500/[0.08] bg-black"
    >
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-56 w-56 rounded-full bg-pink-500/[0.05] blur-[90px]"
        aria-hidden
      />

      <div className="testimonials-container relative">
        <div className="testimonials-card border border-pink-500/[0.1] bg-black/50">
          <header className="testimonials-header">
            <h2
              className={cn(
                cormorant.className,
                "text-[28px] font-medium uppercase tracking-wide text-white sm:text-[34px] md:text-[40px] lg:text-[48px]",
              )}
            >
              {constellationSection.title}
            </h2>
            <p
              className={cn(
                inter.className,
                "text-sm text-pink-100/55 sm:text-base",
              )}
            >
              {constellationSection.subtitle}
            </p>
          </header>

          {bp === "mobile" ? (
            <>
              <MobileReviewStack
                reviews={reviews}
                onLeave={() => setLeaveOpen(true)}
              />
              <AnimatePresence>
                {leaveOpen && (
                  <LeaveReviewModal
                    onClose={() => setLeaveOpen(false)}
                    onSubmitted={(review) => {
                      handleSubmitted(review);
                      window.setTimeout(
                        () => clearNewFlag(review.id),
                        reducedMotion ? 50 : 900,
                      );
                    }}
                  />
                )}
              </AnimatePresence>
            </>
          ) : (
            <DesktopNetwork
              bp={bp}
              reducedMotion={reducedMotion}
              reviews={reviews}
              leaveOpen={leaveOpen}
              onOpenLeave={() => setLeaveOpen(true)}
              onCloseLeave={() => setLeaveOpen(false)}
              onReviewSubmitted={handleSubmitted}
              clearNewFlag={clearNewFlag}
            />
          )}
        </div>
      </div>
    </section>
  );
}
