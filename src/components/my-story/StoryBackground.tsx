"use client";

import type { CSSProperties } from "react";

export function StoryBackground() {
  return (
    <div className="story-background" aria-hidden>
      <div className="story-glow story-glow-one" />
      <div className="story-glow story-glow-two" />
      <div className="story-depth-grid" />
      <div className="story-particles">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="story-particle"
            style={
              {
                "--particle-i": i,
                left: `${8 + i * 11}%`,
                top: `${14 + (i % 4) * 18}%`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
