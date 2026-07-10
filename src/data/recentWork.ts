export type ProjectCategory =
  | "PM"
  | "SWE"
  | "AI"
  | "Full Stack"
  | "Systems";

export type RecentWorkProject = {
  id: string;
  title: string;
  category: ProjectCategory;
  impact: string;
  techStack: string[];
  image: string;
  githubUrl?: string;
  isPrivate?: boolean;
};

const GITHUB = "https://github.com/atiksha05";

export const recentWorkProjects: RecentWorkProject[] = [
  {
    id: "studysync-ai",
    title: "StudySync-AI",
    category: "AI",
    impact:
      "AI study companion that turns notes into personalized review plans.",
    techStack: ["Python", "OpenAI", "React", "FastAPI"],
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
    isPrivate: true,
  },
  {
    id: "atiksha-portfolio",
    title: "Atiksha Portfolio",
    category: "Full Stack",
    impact:
      "Product-led portfolio showcasing PM thinking and engineering craft.",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
    githubUrl: `${GITHUB}/atiksha-portfolio`,
  },
  {
    id: "personal-finance-tracker",
    title: "Personal Finance Tracker",
    category: "PM",
    impact:
      "Smart budgeting tool connecting spending habits to savings goals.",
    techStack: ["Next.js", "Plaid", "OpenAI", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    isPrivate: true,
  },
  {
    id: "learn-loop",
    title: "LearnLoop",
    category: "Full Stack",
    impact:
      "Mentorship platform matching learners with skill-sharing sessions.",
    techStack: ["Node.js", "PostgreSQL", "React", "JWT"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80",
    githubUrl: `${GITHUB}/Learn-Loop`,
  },
  {
    id: "campus-event-planner",
    title: "Campus Event Auto Planner",
    category: "PM",
    impact:
      "Event ops platform forecasting attendance to optimize campus resources.",
    techStack: ["React", "MongoDB", "Express", "Python"],
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
    isPrivate: true,
  },
  {
    id: "simple-shell",
    title: "Simple Shell",
    category: "Systems",
    impact:
      "Unix-style shell handling pipes, redirection, and process control.",
    techStack: ["C", "POSIX", "Process Management"],
    image:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=900&q=80",
    githubUrl: `${GITHUB}/simple-shell`,
  },
  {
    id: "cache-manager",
    title: "Cache Manager",
    category: "Systems",
    impact:
      "FIFO cache engine using hash tables for O(1) eviction and lookup.",
    techStack: ["C++", "Hash Tables", "Linked Lists"],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",
    githubUrl: `${GITHUB}/cache-manager`,
  },
  {
    id: "cache-manager-bst",
    title: "Cache Manager BST",
    category: "Systems",
    impact:
      "Hybrid cache with BST-backed indexing for ordered key retrieval.",
    techStack: ["C++", "BST", "Hash Tables"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
    githubUrl: `${GITHUB}/cache-manager-bst`,
  },
  {
    id: "binary-search-tree-cpp",
    title: "Binary Search Tree C++",
    category: "Systems",
    impact:
      "Core BST operations built for fast search, insert, and delete.",
    techStack: ["C++", "Algorithms", "Data Structures"],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80",
    githubUrl: `${GITHUB}/binary-search-tree-cpp`,
  },
];

const categoryStyles: Record<ProjectCategory, string> = {
  PM: "border-fuchsia-400/35 bg-fuchsia-500/15 text-fuchsia-200",
  SWE: "border-pink-400/35 bg-pink-500/15 text-pink-200",
  AI: "border-violet-400/35 bg-violet-500/15 text-violet-200",
  "Full Stack": "border-rose-400/35 bg-rose-500/15 text-rose-200",
  Systems: "border-pink-300/30 bg-pink-500/10 text-pink-100/80",
};

export function getCategoryStyle(category: ProjectCategory) {
  return categoryStyles[category];
}
