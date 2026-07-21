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

const SPY_SECTIONS = ["about", "projects", "experience", "contact"] as const;

function getHeaderHeight() {
  const header = document.querySelector(".site-header");
  return header instanceof HTMLElement ? header.offsetHeight : 76;
}

function scrollToSection(sectionId: string, smooth: boolean) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const top =
    section.getBoundingClientRect().top + window.scrollY - getHeaderHeight();

  window.scrollTo({
    top: Math.max(0, top),
    behavior: reduceMotion || !smooth ? "auto" : "smooth",
  });
  window.history.replaceState(null, "", `#${sectionId}`);
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion() ?? false;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isMyStory = pathname === "/my-story";
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

    const elements = SPY_SECTIONS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0, 0.15, 0.35],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
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
      if (link.href === "/my-story") return isMyStory;
      if (!isHome || !link.sectionId) return false;
      return activeSection === link.sectionId;
    },
    [activeSection, isHome, isMyStory],
  );

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    link: NavLink,
  ) => {
    setMenuOpen(false);

    if (link.href === "/my-story") return;

    const sectionId = link.sectionId;
    if (!sectionId) return;

    if (isHome) {
      event.preventDefault();
      scrollToSection(sectionId, true);
      return;
    }

    // From /my-story (or other routes): go home with hash; HashScroll finishes.
    event.preventDefault();
    router.push(`/#${sectionId}`);
  };

  const handleCtaClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
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
            aria-label="Atiksha — Product Manager and Software Engineer, home"
            onClick={(event) => {
              if (!isHome) return;
              event.preventDefault();
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
              <span className="nav-role">PM × SWE</span>
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
            Let&apos;s Connect
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
          <motion.div
            ref={panelRef}
            id={menuId}
            className="nav-mobile-panel"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.25, ease: "easeOut" }}
          >
            <nav className="nav-mobile-nav" aria-label="Mobile navigation">
              <div className="nav-mobile-brand">
                <span className="nav-name">Atiksha</span>
                <span className="nav-role">PM × SWE</span>
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
                Let&apos;s Connect
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
