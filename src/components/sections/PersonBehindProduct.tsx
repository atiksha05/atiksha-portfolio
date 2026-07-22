"use client";

import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { Building2, Heart, Rocket, Users } from "lucide-react";
import { about } from "@/lib/data";
import { cn } from "@/lib/utils";
import "./person-behind-product.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

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
    <section
      id="about"
      className="person-section relative"
    >
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
          <h2 className={cn(cormorant.className, "person-title")}>
            The <span>Person</span> Behind the Product
          </h2>

          <p className="person-tagline">
            I build with purpose. I lead with empathy. I create with impact.
          </p>

          <div className="person-intro">
            <p>
              I&apos;m Atiksha—a Computer Science student at San Francisco State
              University, <span>software engineer</span>, aspiring
              <span> product manager</span>, and
              <span> community leader</span>.
            </p>
            <p>
              I enjoy thinking like a product manager and building like a
              software engineer—turning ideas into{" "}
              <span>organized plans</span>, meaningful
              <span> digital experiences</span>, and systems that help people
              <span> collaborate</span> and <span>solve real problems</span>.
            </p>
          </div>

          <div className="role-grid">
            <article className="role-card">
              <div className="role-card-header">
                <div className="role-icon" aria-hidden>
                  <Building2 className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div className="role-heading-group">
                  <h3 className={cormorant.className}>Student Assistant</h3>
                  <p>ORSP · SFSU</p>
                </div>
                <span className="role-duration">2 YEARS</span>
              </div>

              <span className="role-category">
                Product Operations & Project Coordination
              </span>

              <p className="role-description">
                I coordinate workflows, facilitate meetings, organize
                documentation, track progress, and help improve internal
                university processes and training resources.
              </p>

              <div className="role-skills">
                <span>Project Coordination</span>
                <span>Stakeholder Communication</span>
                <span>Process Improvement</span>
              </div>

              <Link href="/my-story" className="role-story-link">
                Read the full story →
              </Link>
            </article>

            <article className="role-card">
              <div className="role-card-header">
                <div className="role-icon" aria-hidden>
                  <Users className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div className="role-heading-group">
                  <h3 className={cormorant.className}>Outreach Chair</h3>
                  <p>ACM at SFSU</p>
                </div>
                <span className="role-duration">CHAIR · 2 MONTHS</span>
              </div>

              <p className="role-previous">
                Previously Outreach Officer · 1 Year
              </p>

              <span className="role-category">
                Leadership & Technical Community
              </span>

              <p className="role-description">
                I lead outreach strategy, partnerships, technical events, and
                the systems our team uses to manage communication,
                collaboration, and student opportunities.
              </p>

              <div className="role-skills">
                <span>Leadership</span>
                <span>Partnerships</span>
                <span>Community Building</span>
              </div>

              <Link href="/my-story" className="role-story-link">
                Read the full story →
              </Link>
            </article>
          </div>
        </div>
      </div>

      <div className="person-footer">
        <div className="drives-section">
          <span className="drives-label">What drives me:</span>

          <div className="drive-item">
            <Rocket className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            <span>Turning ideas into products</span>
          </div>

          <div className="drive-item">
            <Users className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            <span>Building communities</span>
          </div>

          <div className="drive-item">
            <Heart className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            <span>Creating meaningful experiences</span>
          </div>
        </div>

        <p className="story-copy">
          Explore the experiences, leadership roles, and lessons that shaped how
          I work.
        </p>

        <Link href="/my-story" className="main-story-button">
          Read My Story
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
