export type WipProject = {
  id: string;
  title: string;
  description: string;
  progress: number;
  techStack: string[];
  image: string;
  githubUrl?: string;
  comingSoon?: boolean;
};

const GITHUB = "https://github.com/atiksha05";

export const wipProjects: WipProject[] = [
  {
    id: "personal-finance-tracker",
    title: "Personal Finance Tracker",
    description: "AI-powered budgeting with Plaid sync and spending insights.",
    progress: 72,
    techStack: ["Next.js", "Plaid", "OpenAI", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    githubUrl: `${GITHUB}/personal-finance-tracker`,
  },
  {
    id: "learn-loop",
    title: "Learn-Loop",
    description: "Skill-sharing platform connecting mentors and learners.",
    progress: 85,
    techStack: ["Node.js", "React", "PostgreSQL", "JWT"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    githubUrl: `${GITHUB}/Learn-Loop`,
  },
  {
    id: "campus-event-planner",
    title: "Campus Event Auto-Planner",
    description: "MERN event management with ML attendance forecasting.",
    progress: 58,
    techStack: ["React", "MongoDB", "Express", "Python"],
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    githubUrl: `${GITHUB}/campus-event-auto-planner`,
  },
  {
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    description: "Resume scoring and keyword optimization with LLM feedback.",
    progress: 45,
    techStack: ["Python", "FastAPI", "OpenAI", "React"],
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=80",
    githubUrl: `${GITHUB}/ai-resume-analyzer`,
  },
  {
    id: "research-dashboard",
    title: "Research Dashboard",
    description: "ORSP analytics dashboard for grant and project tracking.",
    progress: 63,
    techStack: ["Python", "Tableau", "AWS", "REST APIs"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    githubUrl: `${GITHUB}/research-dashboard`,
  },
  {
    id: "project-6",
    title: "Project 6",
    description: "Early concept — shaping the next product experiment.",
    progress: 12,
    techStack: ["TBD", "Design", "Prototype"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    comingSoon: true,
  },
];
