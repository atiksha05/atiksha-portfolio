export type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  period: string;
  category: string;
  bullets: string[];
  tags?: string[];
  /** Higher priority roles get slightly stronger visual emphasis. */
  priority?: "primary" | "secondary";
};

/**
 * Homepage Experience — concise LinkedIn-aligned wording.
 * LinkedIn remains the source of truth; do not invent metrics or titles.
 *
 * Kraftful dates are not stored in this repo. Period left blank until
 * confirmed from LinkedIn so we do not invent dates.
 */
export const experienceSection = {
  label: "Experience",
  title: "Leadership & product operations",
  subtitle:
    "A concise view of roles where I practiced ownership, collaboration, and clear communication.",
};

export const experienceItems: ExperienceItem[] = [
  {
    id: "kraftful",
    role: "Product Management Intern",
    organization: "Kraftful",
    period: "",
    category: "Product Management",
    priority: "primary",
    tags: ["Product Discovery", "PRDs", "Prioritization"],
    bullets: [
      "Synthesized customer feedback and supported product discovery to clarify user problems and opportunity areas.",
      "Wrote PRDs and user stories, defined acceptance criteria, and collaborated with product, design, and engineering on handoff.",
      "Contributed to roadmap and prioritization work across AI-powered feedback workflows.",
    ],
  },
  {
    id: "orsp",
    role: "Student Assistant",
    organization: "Office of Research & Sponsored Programs · San Francisco State University",
    period: "Jan 2025 – Present",
    category: "Operations & Systems",
    priority: "primary",
    tags: ["Requirements", "Workflow Analysis", "Stakeholder Communication"],
    bullets: [
      "Gather stakeholder and user requirements, map research administration workflows, and identify root causes in operational processes.",
      "Improve internal processes, interfaces, and tools based on user feedback — including GMS- and IT Compliance-related support work.",
      "Build Python automation that reduced onboarding effort by 30%, while documenting requirements for clearer stakeholder alignment.",
    ],
  },
  {
    id: "acm-chair",
    role: "Outreach Chair",
    organization: "ACM @ SFSU",
    period: "2025 – Present",
    category: "Leadership",
    priority: "primary",
    tags: ["Partnership Strategy", "Team Leadership", "Stakeholder Management"],
    bullets: [
      "Define and execute ACM’s partnership strategy, building relationships with companies, faculty, recruiters, engineering leaders, and campus organizations.",
      "Lead the outreach team by prioritizing initiatives, assigning ownership, and driving partnership execution.",
      "Translate student feedback and partner objectives into industry panels, technical workshops, recruiting events, and mentorship opportunities.",
    ],
  },
  {
    id: "csc-256-ta",
    role: "Teaching Assistant — CSC 256",
    organization: "San Francisco State University",
    period: "Fall 2026 – Present",
    category: "Technical Mentorship",
    priority: "primary",
    tags: ["Technical Communication", "Mentorship", "Evaluation"],
    bullets: [
      "Support CSC 256 students by clarifying technical concepts and reviewing coursework.",
      "Evaluate assignments and provide structured, actionable feedback aligned with course requirements.",
    ],
  },
  {
    id: "isa-vp",
    role: "Vice President",
    organization: "Indian Student Association · San Francisco State University",
    period: "2025 – Present",
    category: "Leadership",
    priority: "secondary",
    tags: ["Leadership", "Collaboration", "Event Coordination"],
    bullets: [
      "Support the executive board and mentor newer officers across organization operations.",
      "Help organize events and fundraising while strengthening community collaboration.",
    ],
  },
  {
    id: "csme-teacher-fellow",
    role: "Teacher Fellow",
    organization: "CSME — San Francisco State University",
    period: "August 2024 – May 2025",
    category: "Teaching & Mentorship",
    priority: "secondary",
    tags: ["Mentorship", "Technical Communication", "Leadership", "Adaptability"],
    bullets: [
      "Supported students in developing foundational STEM and technical problem-solving skills through hands-on instruction and mentorship.",
      "Explained complex concepts in an approachable way, adapting instruction based on students’ understanding and learning needs.",
      "Collaborated with educators and fellow mentors to support engaging and inclusive learning experiences.",
    ],
  },
  {
    id: "orientation-leader",
    role: "Orientation Leader",
    organization: "San Francisco State University",
    period: "June 2024 – July 2024",
    category: "Student Leadership",
    priority: "secondary",
    tags: ["Communication", "Collaboration", "Student Support"],
    bullets: [
      "Support incoming students during orientation by communicating campus resources, academic services, and university processes.",
      "Collaborate with university staff and fellow orientation leaders to deliver an organized, welcoming onboarding experience.",
    ],
  },
];
