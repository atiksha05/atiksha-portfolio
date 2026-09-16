import type { ProjectCategory } from "@/data/recentWork";

export type ProjectHeight = "sm" | "md" | "lg" | "xl";

export type ProjectCover = {
  /** Tailwind gradient classes for the cover plane */
  gradientClass: string;
  /** Optional decorative motif for CSS-only covers */
  motif?: "evaluation" | "experiment";
};

export type Project = {
  id: string;
  title: string;
  description: string;
  /** Remote or local image URL. Optional when `cover` is provided. */
  image?: string;
  /** CSS gradient cover when no dedicated asset exists */
  cover?: ProjectCover;
  category: ProjectCategory;
  /** Internal page — takes priority over githubUrl for card clicks */
  href?: string;
  githubUrl?: string;
  isPrivate?: boolean;
  tags?: string[];
  height: ProjectHeight;
};

const GITHUB = "https://github.com/atiksha05";

/** All projects — masonry grid on /projects */
export const allProjects: Project[] = [
  {
    id: "agentbench",
    title: "AgentBench",
    description:
      "Evaluate and compare AI models across quality, reliability, hallucination risk, latency, and cost.",
    cover: {
      gradientClass:
        "bg-gradient-to-br from-zinc-950 via-violet-950/90 to-fuchsia-950/70",
      motif: "evaluation",
    },
    category: "AI",
    githubUrl: `${GITHUB}/AgentBench`,
    tags: ["React", "TypeScript", "LLM Evaluation", "AI"],
    height: "lg",
  },
  {
    id: "experimentos",
    title: "ExperimentOS",
    description:
      "Turn product hypotheses into measurable A/B experiments and evidence-backed decisions.",
    cover: {
      gradientClass:
        "bg-gradient-to-br from-zinc-950 via-rose-950/85 to-pink-950/65",
      motif: "experiment",
    },
    category: "Full Stack",
    githubUrl: `${GITHUB}/ExperimentOS`,
    tags: ["React", "TypeScript", "A/B Testing", "Product Analytics"],
    height: "xl",
  },
  {
    id: "studysync-ai",
    title: "StudySync-AI",
    description:
      "AI study companion that turns notes into personalized review plans.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
    category: "AI",
    href: "/projects/studysync-ai",
    githubUrl: `${GITHUB}/StudySync-AI`,
    tags: ["Python", "OpenAI", "React", "FastAPI"],
    height: "lg",
  },
  {
    id: "learn-loop",
    title: "LearnLoop",
    description:
      "Mentorship platform matching learners with skill-sharing sessions.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80",
    category: "Full Stack",
    githubUrl: `${GITHUB}/Learn-Loop`,
    tags: ["Node.js", "PostgreSQL", "React", "JWT"],
    height: "xl",
  },
  {
    id: "atiksha-portfolio",
    title: "Atiksha Portfolio",
    description:
      "Product-led portfolio showcasing PM thinking and engineering craft.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
    category: "Full Stack",
    githubUrl: `${GITHUB}/atiksha-portfolio`,
    tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind"],
    height: "xl",
  },
  {
    id: "personal-finance-tracker",
    title: "Personal Finance Tracker",
    description:
      "Smart budgeting tool connecting spending habits to savings goals.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    category: "PM",
    isPrivate: true,
    tags: ["Next.js", "Plaid", "OpenAI", "PostgreSQL"],
    height: "lg",
  },
  {
    id: "campus-event-planner",
    title: "Campus Event Auto Planner",
    description:
      "Event ops platform forecasting attendance to optimize campus resources.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
    category: "PM",
    isPrivate: true,
    tags: ["React", "MongoDB", "Express", "Python"],
    height: "md",
  },
  {
    id: "simple-shell",
    title: "Simple Shell",
    description:
      "Unix-style shell handling pipes, redirection, and process control.",
    image:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=900&q=80",
    category: "Systems",
    githubUrl: `${GITHUB}/simple-shell`,
    tags: ["C", "POSIX", "Systems"],
    height: "md",
  },
  {
    id: "cache-manager",
    title: "Cache Manager",
    description:
      "FIFO cache engine using hash tables for O(1) eviction and lookup.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",
    category: "Systems",
    githubUrl: `${GITHUB}/cache-manager`,
    tags: ["C++", "Hash Tables", "Linked Lists"],
    height: "md",
  },
  {
    id: "cache-manager-bst",
    title: "Cache Manager BST",
    description:
      "Hybrid cache with BST-backed indexing for ordered key retrieval.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
    category: "Systems",
    githubUrl: `${GITHUB}/cache-manager-bst`,
    tags: ["C++", "BST", "Hash Tables"],
    height: "lg",
  },
  {
    id: "binary-search-tree-cpp",
    title: "Binary Search Tree C++",
    description:
      "Core BST operations built for fast search, insert, and delete.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80",
    category: "Systems",
    githubUrl: `${GITHUB}/binary-search-tree-cpp`,
    tags: ["C++", "Algorithms", "Data Structures"],
    height: "sm",
  },
];
