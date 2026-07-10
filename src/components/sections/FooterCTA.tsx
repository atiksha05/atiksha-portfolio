"use client";

import { FormEvent, useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  FileText,
  Mail,
  Send,
} from "lucide-react";
import { ContactCinematicVideo } from "@/components/effects/ContactCinematicVideo";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.062 2.062 0 01-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};

const contactLinks: {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  external: boolean;
}[] = [
  {
    label: "Email",
    href: `mailto:${site.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    href: site.linkedin,
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "GitHub",
    href: site.github,
    icon: GitHubIcon,
    external: true,
  },
];

export function FooterCTA() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <footer
      id="contact"
      className="contact-section relative border-t border-pink-500/[0.08] bg-black scroll-mt-[var(--navbar-height,64px)]"
    >
      <div className="contact-image-panel">
        <ContactCinematicVideo />
        <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-7 lg:p-8">
          <motion.p
            className="font-serif-display max-w-md text-xl leading-snug text-white/90 sm:text-2xl lg:text-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            Every great product starts with a conversation.
          </motion.p>
          <motion.p
            className="mt-2 max-w-sm text-sm text-pink-100/50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.08}
            variants={fadeUp}
          >
            San Francisco · Open to meaningful collaborations
          </motion.p>
        </div>
      </div>

      <div className="contact-content-panel relative">
        <div
          className="pointer-events-none absolute right-0 top-1/4 h-48 w-48 rounded-full bg-pink-500/[0.06] blur-[90px]"
          aria-hidden
        />

        <motion.div
          className="relative min-h-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          custom={0}
          variants={fadeUp}
        >
          <span className="contact-label text-xs font-medium uppercase tracking-[0.28em] text-pink-400/70">
            Contact
          </span>
          <h2 className="contact-heading font-serif-display text-white">
            Let&apos;s Build Something Meaningful.
          </h2>
          <p className="contact-description max-w-lg text-pink-100/55">
            Whether it&apos;s software engineering, product management,
            research, or simply exchanging ideas—I&apos;d love to hear from
            you.
          </p>

          <div className="contact-links">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/[0.05] px-3.5 py-1.5 text-sm text-pink-100/75 backdrop-blur-sm transition-all duration-300",
                  "hover:border-pink-400/40 hover:bg-pink-500/[0.08] hover:text-pink-50 hover:shadow-[0_0_24px_rgba(244,114,182,0.15)]",
                )}
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
                {link.external && (
                  <ArrowUpRight className="h-3 w-3 opacity-50" />
                )}
              </a>
            ))}
            <a
              href={`mailto:${site.email}?subject=Resume%20Request`}
              className="glow-button-pink inline-flex items-center gap-2 rounded-full border border-pink-400/35 bg-pink-500/10 px-3.5 py-1.5 text-sm text-pink-50 backdrop-blur-sm transition-all hover:bg-pink-500/15"
            >
              <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
              Resume
            </a>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="contact-form-card rounded-[26px] border border-pink-400/20 bg-pink-500/[0.04] shadow-[0_8px_40px_rgba(0,0,0,0.35),0_0_60px_rgba(244,114,182,0.06)] backdrop-blur-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            variants={fadeUp}
          >
            <div className="contact-form">
              <div className="contact-form-row">
                <label className="block min-w-0">
                  <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-pink-300/55">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="contact-input w-full rounded-2xl border border-pink-400/15 bg-black/40 text-sm text-pink-50 placeholder:text-pink-200/25 outline-none transition-all focus:border-pink-400/40 focus:shadow-[0_0_20px_rgba(244,114,182,0.12)]"
                  />
                </label>
                <label className="block min-w-0">
                  <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-pink-300/55">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@email.com"
                    className="contact-input w-full rounded-2xl border border-pink-400/15 bg-black/40 text-sm text-pink-50 placeholder:text-pink-200/25 outline-none transition-all focus:border-pink-400/40 focus:shadow-[0_0_20px_rgba(244,114,182,0.12)]"
                  />
                </label>
              </div>

              <label className="block min-w-0">
                <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-pink-300/55">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  placeholder="Tell me about your idea, role, or question..."
                  className="contact-textarea w-full rounded-2xl border border-pink-400/15 bg-black/40 text-sm leading-relaxed text-pink-50 placeholder:text-pink-200/25 outline-none transition-all focus:border-pink-400/40 focus:shadow-[0_0_20px_rgba(244,114,182,0.12)]"
                />
              </label>

              <button
                type="submit"
                className="contact-submit glow-button-pink inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-pink-400/35 bg-pink-500/10 text-sm font-medium text-pink-50 backdrop-blur-sm transition-all hover:bg-pink-500/15"
              >
                <Send className="h-4 w-4" strokeWidth={1.75} />
                {submitted ? "Opening your email client…" : "Send Message"}
              </button>
            </div>
          </motion.form>
        </motion.div>

        <motion.div
          className="contact-footer relative mt-4 border-t border-pink-400/10 pt-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.14}
          variants={fadeUp}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5 text-[11px] leading-relaxed text-pink-300/40">
              <p>© 2026 {site.name}</p>
              <p>Built with Next.js · Made with ❤️ in San Francisco</p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-pink-400/20 bg-pink-500/[0.05] text-pink-200/60 transition-all hover:border-pink-400/40 hover:text-pink-100 hover:shadow-[0_0_20px_rgba(244,114,182,0.15)]"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-pink-400/20 bg-pink-500/[0.05] text-pink-200/60 transition-all hover:border-pink-400/40 hover:text-pink-100 hover:shadow-[0_0_20px_rgba(244,114,182,0.15)]"
              >
                <LinkedInIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-pink-400/20 bg-pink-500/[0.05] text-pink-200/60 transition-all hover:border-pink-400/40 hover:text-pink-100 hover:shadow-[0_0_20px_rgba(244,114,182,0.15)]"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
