export type FeaturedCaseStudy = {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  role: string;
  skills: string[];
  stack: string[];
  href?: string;
  ctaLabel: string;
  featured?: boolean;
};

/**
 * Homepage featured product work.
 * SignalIQ copy is qualitative only — no invented metrics.
 */
export const featuredCaseStudies: FeaturedCaseStudy[] = [
  {
    id: "signaliq",
    name: "SignalIQ",
    tagline: "Turning fragmented customer feedback into product decisions",
    problem:
      "Customer feedback is scattered across channels, making it hard to see which issues should shape the roadmap.",
    solution:
      "A product workflow that synthesizes feedback into clear themes, priorities, and decision-ready insights.",
    role: "Product lead · research, prioritization, and solution design",
    skills: ["Problem Framing", "Prioritization", "Product Strategy"],
    stack: ["Product Discovery", "AI/LLMs", "Analytics"],
    ctaLabel: "View Case Study",
    featured: true,
  },
  {
    id: "studysync-ai",
    name: "StudySync AI",
    tagline: "One workspace for learning, interview prep, and career momentum",
    problem:
      "Students juggle notes, study plans, and career prep across disconnected tools — losing clarity on what to do next.",
    solution:
      "A unified AI workspace that turns goals into a calm daily surface with the next best action.",
    role: "Product + full-stack builder",
    skills: ["User Journey Design", "MVP Scoping", "AI Product Thinking"],
    stack: ["Python", "OpenAI", "React", "FastAPI"],
    href: "/projects/studysync-ai",
    ctaLabel: "View Case Study",
  },
  {
    id: "experimentos",
    name: "ExperimentOS",
    tagline: "Turning product hypotheses into measurable decisions.",
    problem:
      "Product teams often ship changes without a structured way to measure whether they actually improve user outcomes.",
    solution:
      "An experimentation workspace for defining hypotheses, comparing A/B test performance, measuring lift and statistical confidence, and supporting evidence-backed product decisions.",
    role: "Product + full-stack builder",
    skills: ["Experimentation", "Product Analytics", "A/B Testing"],
    stack: ["React", "TypeScript", "Recharts"],
    href: "https://github.com/atiksha05/ExperimentOS",
    ctaLabel: "View Project",
  },
];

export const featuredWorkSection = {
  label: "Featured Work",
  title: "Product case studies",
  subtitle:
    "Selected work where I framed problems, shaped product direction, and shipped thoughtful experiences.",
  allProjectsHref: "/projects",
  allProjectsLabel: "All Projects",
};
