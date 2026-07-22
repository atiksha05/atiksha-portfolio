"use client";

import { useEffect, useRef } from "react";

/** Smooth but tightly attached — Apple/Linear-like follow. */
const LERP = 0.22;
const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, .cursor-pointer';

function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

export function CursorDot() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const visible = useRef(false);
  const rafId = useRef(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!finePointer && !canHover) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    document.body.classList.add("custom-cursor");
    outer.dataset.active = "true";

    const render = () => {
      if (hasMoved.current) {
        pos.current.x = lerp(pos.current.x, mouse.current.x, LERP);
        pos.current.y = lerp(pos.current.y, mouse.current.y, LERP);

        const dx = mouse.current.x - pos.current.x;
        const dy = mouse.current.y - pos.current.y;
        if (dx * dx + dy * dy < 0.04) {
          pos.current.x = mouse.current.x;
          pos.current.y = mouse.current.y;
        }

        outer.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      outer.style.opacity = visible.current ? "1" : "0";
      rafId.current = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      visible.current = true;

      if (!hasMoved.current) {
        hasMoved.current = true;
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        outer.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target;
      const isHover =
        target instanceof Element && Boolean(target.closest(HOVER_SELECTOR));
      inner.classList.toggle("is-hover", isHover);
    };

    const onLeave = () => {
      visible.current = false;
      inner.classList.remove("is-hover");
    };

    const onEnter = () => {
      visible.current = true;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    rafId.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.body.classList.remove("custom-cursor");
      outer.dataset.active = "false";
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div ref={outerRef} aria-hidden className="site-cursor">
      <div ref={innerRef} className="site-cursor-dot" />
    </div>
  );
}
