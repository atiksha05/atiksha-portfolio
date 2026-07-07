"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { hero, navLinks } from "@/lib/data";

function resolveNavHref(href: string, pathname: string) {
  if (href.startsWith("#")) {
    return pathname === "/" ? href : `/${href}`;
  }
  return href;
}

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-pink-500/10 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo — photo + name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-full border-2 border-pink-400 p-[2px] shadow-[0_0_12px_rgba(244,114,182,0.4)]">
            <Image
              src={hero.image}
              alt={hero.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover object-[center_15%]"
            />
          </div>
          <span className="logo-text-pink text-sm font-semibold tracking-wide">
            portfolio
          </span>
        </Link>

        {/* Nav + CTA */}
        <div className="flex items-center gap-6 md:gap-10">
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={resolveNavHref(link.href, pathname)}
                className="text-sm text-pink-300/80 transition-colors hover:text-pink-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={resolveNavHref("#contact", pathname)}
              className="text-sm text-pink-300/80 transition-colors hover:text-pink-200"
            >
              Contact
            </Link>
          </nav>

          <Link
            href={resolveNavHref("#contact", pathname)}
            className="glow-button-pink flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-2 text-sm text-pink-200 transition-all hover:border-pink-400/60 hover:bg-pink-500/15"
          >
            <Sparkles className="h-3.5 w-3.5 text-pink-300" />
            Get in Touch
          </Link>
        </div>
      </div>
    </header>
  );
}
