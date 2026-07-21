export type PmLesson = {
  id: string;
  number: string;
  title: string;
  copy: string;
};

export const leadershipLessons: PmLesson[] = [
  {
    id: "communication",
    number: "01",
    title: "Communication",
    copy: "I learned to explain goals clearly, adjust my message for different audiences, and keep people aligned through meetings, updates, and documentation.",
  },
  {
    id: "prioritization",
    number: "02",
    title: "Prioritization",
    copy: "When time, people, and resources are limited, I focus the team on what matters most and make tradeoffs visible.",
  },
  {
    id: "ownership",
    number: "03",
    title: "Ownership",
    copy: "I take responsibility for moving work forward, following up, resolving blockers, and making sure commitments do not get lost.",
  },
  {
    id: "stakeholder-alignment",
    number: "04",
    title: "Stakeholder Alignment",
    copy: "Working across students, staff, sponsors, vendors, and university teams taught me how to balance different needs while protecting the main goal.",
  },
  {
    id: "empathy",
    number: "05",
    title: "Empathy",
    copy: "Supporting new students, volunteers, and teammates taught me to listen first and understand the human experience behind every problem.",
  },
];

export const engineeringLessons: PmLesson[] = [
  {
    id: "systems-thinking",
    number: "01",
    title: "Systems Thinking",
    copy: "I learned to understand how components, users, data, and constraints affect one another before choosing a solution.",
  },
  {
    id: "problem-decomposition",
    number: "02",
    title: "Problem Decomposition",
    copy: "Complex problems become manageable when they are broken into smaller questions, dependencies, and testable steps.",
  },
  {
    id: "technical-feasibility",
    number: "03",
    title: "Technical Feasibility",
    copy: "I can communicate with engineers, understand implementation tradeoffs, and recognize when a simple idea may have complex technical consequences.",
  },
  {
    id: "iteration",
    number: "04",
    title: "Iteration",
    copy: "Products improve through testing, feedback, debugging, and repeated refinement—not through trying to design the perfect solution once.",
  },
  {
    id: "data-informed",
    number: "05",
    title: "Data-Informed Decisions",
    copy: "I use evidence, feedback, and product behavior to challenge assumptions and guide improvements.",
  },
];

/** Optional cross-column hover pairings */
export const lessonPairings: Record<string, string> = {
  communication: "stakeholder-alignment",
  "stakeholder-alignment": "communication",
  "systems-thinking": "technical-feasibility",
  "technical-feasibility": "systems-thinking",
  prioritization: "data-informed",
  "data-informed": "prioritization",
  empathy: "iteration",
  iteration: "empathy",
};

export const pmProcessSteps = [
  "Understand",
  "Align",
  "Prioritize",
  "Build",
  "Measure",
  "Improve",
] as const;

export const pmConnectionTags = [
  "People",
  "Technology",
  "Business",
  "Execution",
] as const;
