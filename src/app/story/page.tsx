import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { myStory } from "@/lib/data";

export default function StoryPage() {
  const chapters = [myStory.past, myStory.present, myStory.future];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      <div
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-pink-500/10 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-fuchsia-500/8 blur-[100px]"
        aria-hidden
      />

      <div className="section-container relative py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
        <Link
          href="/#about"
          className="inline-flex items-center gap-2 text-sm text-pink-300/70 transition-colors hover:text-pink-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to About
        </Link>

        <div className="mt-10">
          <span className="inline-flex rounded-full border border-pink-400/45 bg-pink-500/[0.08] px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.42em] text-pink-300 shadow-[0_0_28px_rgba(244,114,182,0.15)]">
            My Story
          </span>
        </div>

        <h1 className="mt-8 font-serif-display text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {myStory.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-pink-100/55">
          {myStory.intro}
        </p>

        <div className="mt-14 space-y-12">
          {chapters.map((chapter, i) => (
            <article
              key={chapter.heading}
              className="rounded-2xl border border-pink-400/15 bg-pink-500/[0.03] p-6 sm:p-8 md:p-10"
            >
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-pink-400/60">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-serif-display text-2xl text-white sm:text-3xl">
                {chapter.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-pink-100/55 sm:text-lg">
                {chapter.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="relative h-48 w-48 sm:h-56 sm:w-56">
            <Image
              src="/images/atiksha-avatar-3d-cutout.png"
              alt="Atiksha — 3D avatar"
              fill
              className="object-contain drop-shadow-[0_20px_40px_rgba(244,114,182,0.25)]"
              sizes="224px"
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
