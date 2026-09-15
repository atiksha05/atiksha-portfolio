"use client";

import Image from "next/image";
import { about, hero, site } from "@/lib/data";
import { cn } from "@/lib/utils";
import "./person-behind-product.css";

const PERSONALITY_LABELS = [
  { emoji: "🚀", label: "Builder", className: "label-builder" },
  { emoji: "📈", label: "Product Strategist", className: "label-leader" },
  { emoji: "❤️", label: "User Advocate", className: "label-curious" },
  { emoji: "🧩", label: "Systems Thinker", className: "label-problem" },
  { emoji: "🤝", label: "Community Leader", className: "label-community" },
  { emoji: "⚡", label: "Problem Solver", className: "label-product" },
] as const;

export function PersonBehindProduct() {
  return (
    <section id="about" className="person-section relative">
      <div className="person-main">
        <div className="person-visual">
          <div className="avatar-orbit">
            <span className="orbit orbit-outer" aria-hidden />
            <span className="orbit orbit-middle" aria-hidden />
            <span className="orbit orbit-inner" aria-hidden />

            <Image
              src={about.avatar3d}
              alt="Illustration of Atiksha"
              width={1536}
              height={1024}
              unoptimized
              className="person-avatar"
              sizes="(max-width: 900px) 280px, 345px"
              priority
            />

            {PERSONALITY_LABELS.map((item) => (
              <div
                key={item.label}
                className={cn("person-label", item.className)}
              >
                <span aria-hidden>{item.emoji}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="person-content">
          <h2 className="person-title">
            The <span>Person</span> Behind the Product
          </h2>

          <p className="person-tagline">
            Product-focused. Technically grounded. Built through leadership.
          </p>

          <div className="person-intro">
            <p>
              I&apos;m Atiksha, a Computer Science senior at San Francisco State
              University focused on building products at the intersection of{" "}
              <span>technology</span>, <span>AI</span>, and{" "}
              <span>user experience</span>.
            </p>
            <p>
              My engineering background taught me how products get built.
              Product management is where I enjoy connecting{" "}
              <span>user needs</span>, <span>technical constraints</span>, and{" "}
              <span>business priorities</span> to decide what should be built —
              and why.
            </p>
            <p>
              Outside the classroom, I&apos;ve taken on roles across product,
              teaching, and student leadership that have strengthened how I
              communicate, collaborate, and lead across different groups.
            </p>
          </div>

          <div className="person-actions">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="person-action-link"
            >
              LinkedIn
            </a>
            <span className="person-action-sep" aria-hidden>
              ·
            </span>
            <a href={hero.secondaryCta.href} className="person-action-link">
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
