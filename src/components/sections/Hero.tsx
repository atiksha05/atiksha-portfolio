import { HeroPhotoFlip } from "@/components/sections/HeroPhotoFlip";
import { hero, marqueeItems } from "@/lib/data";
import { Marquee } from "@/components/ui/Marquee";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-x-hidden bg-black lg:max-h-[100svh]">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
        aria-hidden
      >
        <div className="absolute bottom-8 left-[10%] h-40 w-80 max-w-[90vw] rounded-full bg-pink-500/12 blur-[90px]" />
        <div className="absolute bottom-4 left-[45%] h-32 w-64 max-w-[70vw] rounded-full bg-fuchsia-400/10 blur-[80px]" />
        <div className="absolute bottom-10 right-[8%] h-36 w-72 max-w-[80vw] rounded-full bg-pink-400/10 blur-[85px]" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col pt-16">
        <div className="section-container flex w-full flex-1 min-h-0 flex-col items-center justify-center gap-3 py-4 pb-8 sm:gap-5 sm:py-6 sm:pb-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8 lg:py-3 lg:pb-12">
          {/* Left — name + Product Manager */}
          <div className="flex w-full shrink-0 flex-col items-center lg:items-end lg:justify-center lg:text-right">
            <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-white/70 sm:mb-3 sm:text-xs sm:tracking-[0.35em] md:text-sm">
              {hero.name}
            </p>
            {hero.titleLeft.map((word) => (
              <h1
                key={word}
                className="font-sans text-3xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {word}
              </h1>
            ))}
            <p className="mt-3 max-w-[240px] text-center text-xs font-medium leading-snug text-pink-200/80 sm:mt-4 sm:text-sm sm:max-w-[220px] lg:text-left lg:text-base">
              {hero.pmSubtitle}
            </p>
          </div>

          {/* Center — flip photo + waving hand */}
          <div className="relative flex w-full max-w-full shrink-0 justify-center overflow-hidden px-1 sm:overflow-visible sm:px-0">
            <div className="overflow-hidden rounded-[1.75rem] bg-white p-2.5 shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:overflow-visible sm:rounded-[2rem] sm:p-3 md:rounded-[2.5rem] md:p-3.5">
              <HeroPhotoFlip
                frontSrc={hero.image}
                backSrc={hero.imageAlt}
                alt={hero.name}
              />
            </div>

            <div className="animate-wave absolute -bottom-2 -left-2 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-pink-300 shadow-lg sm:-bottom-3 sm:-left-3 sm:h-16 sm:w-16 md:-bottom-4 md:-left-4 md:h-20 md:w-20">
              <span
                className="text-2xl sm:text-3xl md:text-4xl"
                role="img"
                aria-label="Waving hand"
              >
                👋
              </span>
            </div>

            <span className="absolute -right-2 top-1/4 hidden h-4 w-4 rounded-full bg-pink-300/80 lg:block" />
          </div>

          {/* Right — Software Engineer */}
          <div className="flex w-full shrink-0 flex-col items-center lg:items-start lg:justify-center lg:text-left">
            <span className="mb-0.5 font-sans text-2xl font-black text-pink-300 sm:text-3xl md:text-4xl">
              &
            </span>
            {hero.titleRight.map((word) => (
              <h1
                key={word}
                className="font-sans text-3xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {word}
              </h1>
            ))}
            <p className="mt-3 max-w-[240px] text-center text-xs font-medium leading-snug text-pink-200/80 sm:mt-4 sm:text-sm sm:max-w-[220px] lg:text-left lg:text-base">
              {hero.sweSubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full shrink-0 bg-black">
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}
