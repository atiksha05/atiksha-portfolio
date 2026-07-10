"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { hero, navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

function resolveNavHref(href: string, pathname: string) {
  if (href.startsWith("#")) {
    return pathname === "/" ? href : `/${href}`;
  }
  return href;
}

function handleHashNav(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string,
) {
  if (!href.startsWith("#") || pathname !== "/") return;

  event.preventDefault();
  const id = href.slice(1);
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  window.history.replaceState(null, "", href);
}

const allNavLinks = [
  ...navLinks,
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-pink-500/10 bg-black/50 backdrop-blur-xl">
      <div className="section-container flex h-16 items-center justify-between">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="shrink-0 rounded-full border-2 border-pink-400 p-[2px] shadow-[0_0_12px_rgba(244,114,182,0.4)]">
            <Image
              src={hero.image}
              alt={hero.name}
              width={32}
              height={32}
              className="h-7 w-7 rounded-full object-cover object-[center_15%] sm:h-8 sm:w-8"
            />
          </div>
          <span className="logo-text-pink truncate text-sm font-semibold tracking-wide">
            portfolio
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {allNavLinks.map((link) => (
              <Link
                key={link.href}
                href={resolveNavHref(link.href, pathname)}
                onClick={(e) => handleHashNav(e, link.href, pathname)}
                className="text-sm text-pink-300/80 transition-colors hover:text-pink-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href={resolveNavHref("#contact", pathname)}
            className="glow-button-pink hidden items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-2 text-sm text-pink-200 transition-all hover:border-pink-400/60 hover:bg-pink-500/15 sm:inline-flex"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-pink-300" />
            <span className="hidden sm:inline">Get in Touch</span>
            <span className="sm:hidden">Contact</span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-400/25 text-pink-200 transition-colors hover:border-pink-400/45 hover:text-pink-50 md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-pink-500/10 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <nav className="section-container flex flex-col gap-1 py-4">
              {allNavLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={resolveNavHref(link.href, pathname)}
                    onClick={(e) => {
                      handleHashNav(e, link.href, pathname);
                      setMenuOpen(false);
                    }}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base text-pink-100/80 transition-colors",
                      "hover:bg-pink-500/[0.06] hover:text-pink-50",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href={resolveNavHref("#contact", pathname)}
                onClick={() => setMenuOpen(false)}
                className="glow-button-pink mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-5 py-3 text-sm text-pink-200"
              >
                <Sparkles className="h-3.5 w-3.5 text-pink-300" />
                Get in Touch
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
