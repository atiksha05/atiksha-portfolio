"use client";

import Image from "next/image";
import { useState } from "react";

type HeroPhotoFlipProps = {
  frontSrc: string;
  backSrc: string;
  alt: string;
};

const photoClass =
  "object-cover max-w-full h-[clamp(190px,34vh,340px)] w-[clamp(142px,26vw,255px)] sm:max-h-[calc(100svh-15rem)] sm:h-[clamp(230px,38vh,380px)] sm:w-[clamp(172px,28vw,285px)] lg:max-h-[calc(100svh-14.5rem)] lg:h-[clamp(400px,59vh,620px)] lg:w-[clamp(300px,44.25vh,465px)]";

const frameClass =
  "overflow-hidden rounded-[1.5rem] border-[5px] border-pink-400 shadow-[0_0_0_4px_rgba(244,114,182,0.3),0_0_40px_rgba(244,114,182,0.2)] sm:rounded-[2rem]";

export function HeroPhotoFlip({ frontSrc, backSrc, alt }: HeroPhotoFlipProps) {
  const [flipped, setFlipped] = useState(false);
  const [backImage, setBackImage] = useState(backSrc);

  return (
    <div
      className="cursor-pointer [perspective:1200px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Flip photo"
    >
      <div
        className="relative transition-transform duration-700 ease-in-out [transform-style:preserve-3d]"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className={`${frameClass} [backface-visibility:hidden]`}>
          <Image
            src={frontSrc}
            alt={alt}
            width={400}
            height={520}
            quality={95}
            className={`${photoClass} object-[center_20%]`}
            priority
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
          />
        </div>

        <div
          className={`absolute inset-0 ${frameClass} [backface-visibility:hidden]`}
          style={{ transform: "rotateY(180deg)" }}
        >
          <Image
            src={backImage}
            alt={`${alt} — alternate`}
            width={400}
            height={520}
            quality={95}
            className={`${photoClass} object-[center_30%]`}
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
            onError={() => setBackImage(frontSrc)}
          />
        </div>
      </div>
    </div>
  );
}
