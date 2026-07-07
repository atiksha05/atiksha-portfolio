import { HeroPhotoFlip } from "@/components/sections/HeroPhotoFlip";
import { hero, marqueeItems } from "@/lib/data";
import { Marquee } from "@/components/ui/Marquee";

export function Hero() {
  return (
    <section className="relative flex min-h-screen max-h-screen flex-col overflow-x-hidden bg-black">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
        aria-hidden
      >
        <div className="absolute bottom-8 left-[10%] h-40 w-80 rounded-full bg-pink-500/12 blur-[90px]" />
        <div className="absolute bottom-4 left-[45%] h-32 w-64 rounded-full bg-fuchsia-400/10 blur-[80px]" />
        <div className="absolute bottom-10 right-[8%] h-36 w-72 rounded-full bg-pink-400/10 blur-[85px]" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col pt-16">
        <div className="mx-auto flex w-full max-w-7xl flex-1 min-h-0 flex-col items-center justify-center gap-4 px-6 py-2 pb-10 sm:gap-5 sm:pb-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8 lg:px-10 lg:py-3 lg:pb-12">
          {/* Left — name + Product Manager */}
          <div className="flex shrink-0 flex-col items-center lg:items-end lg:justify-center lg:text-right">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-white/70 sm:text-sm">
            {hero.name}
          </p>
          {hero.titleLeft.map((word) => (
            <h1
              key={word}
              className="font-sans text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {word}
            </h1>
          ))}
          <p className="mt-4 max-w-[220px] text-sm font-medium leading-snug text-pink-200/80 sm:text-base">
            {hero.pmSubtitle}
          </p>
        </div>

        {/* Center — flip photo + waving hand */}
        <div className="relative flex shrink-0 justify-center overflow-visible">
          <div className="overflow-visible rounded-[2rem] bg-white p-3 shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:rounded-[2.5rem] sm:p-3.5">
            <HeroPhotoFlip
              frontSrc={hero.image}
              backSrc={hero.imageAlt}
              alt={hero.name}
            />
          </div>

          <div className="animate-wave absolute -bottom-3 -left-3 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-pink-300 shadow-lg sm:-bottom-4 sm:-left-4 sm:h-20 sm:w-20">
            <span
              className="text-3xl sm:text-4xl"
              role="img"
              aria-label="Waving hand"
            >
              👋
            </span>
          </div>

          <span className="absolute -right-3 top-1/4 hidden h-4 w-4 rounded-full bg-pink-300/80 lg:block" />
        </div>

        {/* Right — Software Engineer */}
        <div className="flex shrink-0 flex-col items-center lg:items-start lg:justify-center lg:text-left">
          <span className="mb-0.5 font-sans text-3xl font-black text-pink-300 sm:text-4xl">
            &
          </span>
          {hero.titleRight.map((word) => (
            <h1
              key={word}
              className="font-sans text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {word}
            </h1>
          ))}
          <p className="mt-4 max-w-[220px] text-sm font-medium leading-snug text-pink-200/80 sm:text-base">
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
