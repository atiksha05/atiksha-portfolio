"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getHeaderHeight() {
  const header = document.querySelector(".site-header");
  return header instanceof HTMLElement ? header.offsetHeight : 76;
}

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const top =
      target.getBoundingClientRect().top + window.scrollY - getHeaderHeight();

    // Contact uses instant scroll so content is usable immediately.
    const behavior =
      reduceMotion || id === "contact" ? "auto" : "smooth";

    requestAnimationFrame(() => {
      window.scrollTo({ top: Math.max(0, top), behavior });
    });
  }, [pathname]);

  return null;
}
