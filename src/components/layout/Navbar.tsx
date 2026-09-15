"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  availabilityBadge,
  hero,
  navLinks,
  type NavLink,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import "./navbar.css";

const SPY_SECTIONS = ["work", "experience", "about", "contact"] as const;

function getHeaderHeight() {
  const header = document.querySelector(".site-header");
  return header instanceof HTMLElement ? header.offsetHeight : 76;
}

function getScrollOffset(sectionId?: string) {
  const header = getHeaderHeight();
  // Home scrolls to top; about already pads for the fixed navbar.
  if (sectionId === "home") return 0;
  if (sectionId === "about") return header;
  return Math.max(header, 88);
}

function scrollToSection(
  sectionId: string,
  smooth: boolean,
  pathPrefix?: string,
) {
  if (sectionId === "home") {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: reduceMotion || !smooth ? "auto" : "smooth",
    });
    const path = pathPrefix ?? window.location.pathname;
    window.history.replaceState(null, "", path);
    return;
  }

  const section = document.getElementById(sectionId);
  if (!section) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const top =
    section.getBoundingClientRect().top +
    window.scrollY -
    getScrollOffset(sectionId);

  window.scrollTo({
    top: Math.max(0, top),
    behavior: reduceMotion || !smooth ? "auto" : "smooth",
  });

  const path = pathPrefix ?? window.location.pathname;
  window.history.replaceState(null, "", `${path}#${sectionId}`);
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion() ?? false;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Hero/top defaults to About — not Work.
  const [activeSection, setActiveSection] = useState<string | null>("about");
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/";

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }

    const updateActiveFromScroll = () => {
      const header = getHeaderHeight();
      const probe = window.scrollY + header + 72;
      const workEl = document.getElementById("work");

      // Still in the hero / above Featured Work → About
      if (workEl) {
        const workTop =
          workEl.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY < workTop - header - 24) {
          setActiveSection("about");
          return;
        }
      }

      // Last section whose top has crossed the probe line
      let current = "about";
      for (const id of SPY_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= probe) current = id;
      }
      setActiveSection(current);
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", updateActiveFromScroll, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveFromScroll);
    return () => {
      window.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
    };
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isLinkActive = useCallback(
    (link: NavLink) => {
      if (link.href.startsWith("mailto:")) return false;
      if (!isHome || !link.sectionId) return false;
      return activeSection === link.sectionId;
    },
    [activeSection, isHome],
  );

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    link: NavLink,
  ) => {
    setMenuOpen(false);

    if (link.href.startsWith("mailto:")) {
      return;
    }

    const sectionId = link.sectionId;
    if (!sectionId) return;

    setActiveSection(sectionId);

    if (isHome) {
      event.preventDefault();
      scrollToSection(sectionId, true);
      return;
    }

    event.preventDefault();
    router.push(`/#${sectionId}`);
  };

  const handleCtaClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    setActiveSection("contact");
    if (isHome) {
      event.preventDefault();
      scrollToSection("contact", true);
      return;
    }
    event.preventDefault();
    router.push("/#contact");
  };

  return (
    <header className={cn("site-header", scrolled && "is-scrolled")}>
      <div className="site-navbar">
        <div className="nav-left">
          <Link
            href="/#home"
            className="nav-brand"
            aria-label="Atiksha — Product Manager, home"
            onClick={(event) => {
              if (!isHome) return;
              event.preventDefault();
              setActiveSection("about");
              scrollToSection("home", true);
            }}
          >
            <span className="nav-logo">
              <Image
                src={hero.image}
                alt=""
                width={44}
                height={44}
                priority
              />
            </span>
            <span className="nav-brand-copy">
              <span className="nav-name">Atiksha</span>
              <span className="nav-role">Product Manager</span>
            </span>
          </Link>

          <div
            className="open-to-work-badge nav-desktop-badge"
            aria-label={availabilityBadge.full}
          >
            <span className="open-to-work-dot" aria-hidden="true" />
            <span>Open to Work</span>
          </div>
        </div>

        <div className="nav-actions">
          <nav className="nav-links" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn("nav-link", active && "is-active")}
                  aria-current={active ? "page" : undefined}
                  onClick={(event) => handleNavClick(event, link)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/#contact"
            className="nav-cta nav-desktop-cta"
            onClick={handleCtaClick}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Let&apos;s Talk
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="nav-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              key="nav-backdrop"
              type="button"
              className="nav-mobile-backdrop"
              aria-label="Close menu"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
              onClick={() => {
                setMenuOpen(false);
                toggleRef.current?.focus();
              }}
            />
            <motion.div
              key="nav-panel"
              ref={panelRef}
              id={menuId}
              className="nav-mobile-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: "easeOut" }}
            >
              <nav className="nav-mobile-nav" aria-label="Mobile navigation">
                <div className="nav-mobile-brand">
                  <span className="nav-name">Atiksha</span>
                  <span className="nav-role">Product Manager</span>
                </div>

                <div
                  className="open-to-work-badge nav-mobile-badge"
                  aria-label={availabilityBadge.full}
                >
                  <span className="open-to-work-dot" aria-hidden="true" />
                  <span>Open to Work</span>
                </div>

                {navLinks.map((link) => {
                  const active = isLinkActive(link);
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cn("nav-mobile-link", active && "is-active")}
                      aria-current={active ? "page" : undefined}
                      onClick={(event) => handleNavClick(event, link)}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <Link
                  href="/#contact"
                  className="nav-cta nav-mobile-cta"
                  onClick={handleCtaClick}
                >
                  <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Let&apos;s Talk
                </Link>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
