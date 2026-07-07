export type ProjectHeight = "sm" | "md" | "lg" | "xl";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  tags?: string[];
  height: ProjectHeight;
};

const GITHUB = "https://github.com/atiksha05";

/** All projects — masonry grid on /projects */
export const allProjects: Project[] = [
  {
    id: "learn-loop",
    title: "Learn-Loop",
    description: "Full-stack skill-sharing platform with Node.js and PostgreSQL.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80",
    githubUrl: `${GITHUB}/Learn-Loop`,
    tags: ["Node.js", "PostgreSQL", "Full-Stack"],
    height: "xl",
  },
  {
    id: "simple-shell",
    title: "simple-shell",
    description: "Custom Unix shell with process management and I/O redirection.",
    image:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=900&q=80",
    githubUrl: `${GITHUB}/simple-shell`,
    tags: ["C", "Systems"],
    height: "md",
  },
  {
    id: "cache-manager-bst",
    title: "cache-manager-bst",
    description: "Cache manager backed by a binary search tree for fast lookups.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
    githubUrl: `${GITHUB}/cache-manager-bst`,
    tags: ["C++", "BST", "Systems"],
    height: "lg",
  },
  {
    id: "cache-manager",
    title: "cache-manager",
    description: "FIFO cache with hash tables and binary search trees in C++.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",
    githubUrl: `${GITHUB}/cache-manager`,
    tags: ["C++", "Data Structures"],
    height: "md",
  },
  {
    id: "binary-search-tree-cpp",
    title: "binary-search-tree-cpp",
    description: "Binary search tree implementation with core operations in C++.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80",
    githubUrl: `${GITHUB}/binary-search-tree-cpp`,
    tags: ["C++", "Algorithms"],
    height: "sm",
  },
  {
    id: "project-6",
    title: "Project 6",
    description: "Coming soon — new build in progress.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
    githubUrl: GITHUB,
    tags: ["SWE"],
    height: "lg",
  },
  {
    id: "project-7",
    title: "Project 7",
    description: "Coming soon — new build in progress.",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900&q=80",
    githubUrl: GITHUB,
    tags: ["PM"],
    height: "sm",
  },
  {
    id: "project-8",
    title: "Project 8",
    description: "Coming soon — new build in progress.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    githubUrl: GITHUB,
    tags: ["Full-Stack"],
    height: "xl",
  },
];
