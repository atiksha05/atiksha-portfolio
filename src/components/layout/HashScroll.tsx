"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getHeaderHeight() {
  const header = document.querySelector(".site-header");
  return header instanceof HTMLElement ? header.offsetHeight : 76;
}

function getScrollOffset(sectionId: string) {
  if (sectionId === "about" || sectionId === "home") return 0;
  return Math.max(getHeaderHeight(), 120);
}

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    // Guard against malformed hashes like #about#about
    const id = hash.replace(/^#/, "").split("#")[0];
    if (!id) return;

    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (!target) return false;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        getScrollOffset(id);

      const behavior =
        reduceMotion || id === "contact" ? "auto" : "smooth";

      window.scrollTo({ top: Math.max(0, top), behavior });

      const cleanUrl = `${window.location.pathname}#${id}`;
      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(null, "", cleanUrl);
      }
      return true;
    };

    requestAnimationFrame(() => {
      if (scrollToTarget()) return;

      if (pathname === "/my-story") {
        window.setTimeout(() => {
          scrollToTarget();
        }, 80);
      }
    });
  }, [pathname]);

  return null;
}
