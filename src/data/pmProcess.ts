export type PmProcessItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  skills: string[];
  image: string;
  imageAlt: string;
};

export const pmProcessItems: PmProcessItem[] = [
  {
    id: "problem-discovery",
    number: "01",
    title: "Problem Discovery",
    description:
      "I start by framing the real problem — not the first solution someone asked for. I map stakeholder goals, user pain points, and business constraints to define a sharp problem statement with clear success metrics before anything gets built.",
    skills: ["Stakeholder Alignment", "Problem Framing", "PRDs", "Metrics"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&q=80",
    imageAlt: "Problem discovery and planning",
  },
  {
    id: "user-research",
    number: "02",
    title: "User Research",
    description:
      "I validate assumptions through interviews, surveys, and behavioral signals. I synthesize insights into personas, journey maps, and opportunity areas so product decisions are grounded in how people actually work — not how we think they do.",
    skills: ["User Research", "Interviews", "Journey Maps", "Analytics"],
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80",
    imageAlt: "User research and collaboration",
  },
  {
    id: "product-strategy",
    number: "03",
    title: "Product Strategy",
    description:
      "I translate insights into a focused roadmap — prioritizing by impact, feasibility, and risk. I define MVPs, write crisp requirements, and align engineering, design, and leadership around what to build now versus what to defer.",
    skills: ["Roadmapping", "Prioritization", "MVP Scoping", "SQL"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80",
    imageAlt: "Product strategy and analytics",
  },
  {
    id: "execution-collaboration",
    number: "04",
    title: "Execution & Collaboration",
    description:
      "I drive delivery through Agile rituals, clear specs, and tight cross-functional loops. Because I also code, I bridge PM and engineering — unblocking tradeoffs, refining acceptance criteria, and keeping momentum without losing product intent.",
    skills: ["Jira", "Agile", "Sprint Planning", "Engineering Collab"],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&q=80",
    imageAlt: "Execution and engineering collaboration",
  },
  {
    id: "launch-measure-iterate",
    number: "05",
    title: "Launch, Measure & Iterate",
    description:
      "I treat launch as the beginning, not the end. I instrument key flows, review adoption and quality signals, gather feedback, and run iteration cycles that turn shipped features into measurable outcomes teams can stand behind.",
    skills: ["A/B Testing", "KPIs", "Iteration", "Tableau"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80",
    imageAlt: "Launch metrics and iteration",
  },
];
