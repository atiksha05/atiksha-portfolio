export const studySyncAi = {
  id: "studysync-ai",
  slug: "studysync-ai",
  title: "StudySync AI",
  subtitle:
    "Your all-in-one AI workspace for learning, interviews, career growth, and productivity.",
  tags: ["AI", "Career", "Productivity"] as const,
  showcaseTags: [
    "AI",
    "Career OS",
    "Education",
    "Productivity",
    "Full Stack",
  ] as const,
  eyebrow: "Case Study",
  heroHeadline: "The operating system for ambitious students.",
  heroSubheadline:
    "StudySync AI unifies learning, interview prep, and career momentum into one intelligent workspace — designed to feel as polished as the tools you already love.",

  problem: {
    title: "Scattered tools. Fragmented momentum.",
    body: "Ambitious students don't lack ambition — they lack a system. Notes live in one app, applications in a spreadsheet, interview prep in another tab, and career advice in a group chat. Context switching kills focus, and nothing talks to anything else.",
    points: [
      "4–7 disconnected apps for learning and career prep",
      "No single view of progress across academics and recruiting",
      "Generic AI tools that don't understand student workflows",
      "Manual tracking that breaks under real semester pressure",
    ],
  },

  solution: {
    title: "One workspace. Every workflow.",
    body: "StudySync AI is a unified command center that connects study planning, interview readiness, application tracking, and AI-guided career coaching. Instead of juggling tools, users get a single surface that learns their goals and surfaces the next best action.",
    highlights: [
      "Unified dashboard with real-time progress across every workflow",
      "AI Career Assistant with context-aware recommendations",
      "Smart scheduling that balances academics and recruiting",
      "Analytics that turn activity into actionable insight",
    ],
  },

  personas: [
    {
      name: "Maya",
      role: "CS Junior · Targeting SWE internships",
      goal: "Land a top-tier summer internship while maintaining GPA",
      pain: "Spends hours context-switching between LeetCode, Notion, and LinkedIn with no clear daily plan.",
    },
    {
      name: "Jordan",
      role: "Career-switcher · PM track",
      goal: "Build a credible PM portfolio while interviewing",
      pain: "Struggles to prioritize case prep, networking, and project work without a system.",
    },
    {
      name: "Alex",
      role: "Grad student · Research + industry",
      goal: "Balance thesis deadlines with recruiting season",
      pain: "Needs one place to see academic and career commitments without double-booking effort.",
    },
  ],

  coreFeatures: [
    {
      title: "AI Career Assistant",
      description:
        "Context-aware coaching that tailors advice to your resume, target roles, and upcoming interviews.",
    },
    {
      title: "Internship Tracker",
      description:
        "Pipeline view from discovery to offer — with stage-based insights and follow-up reminders.",
    },
    {
      title: "Resume Score",
      description:
        "AI-powered resume analysis with actionable improvements mapped to role requirements.",
    },
    {
      title: "Interview Progress",
      description:
        "Structured prep tracks for behavioral, technical, and PM case interviews with completion metrics.",
    },
    {
      title: "Application Tracker",
      description:
        "Visual funnel analytics showing where applications stall and where to focus next.",
    },
    {
      title: "Study Planner",
      description:
        "Adaptive daily plans that balance coursework, skill-building, and recruiting priorities.",
    },
    {
      title: "Productivity Analytics",
      description:
        "Focus time, streaks, and trend lines that reveal how effort maps to outcomes.",
    },
    {
      title: "Calendar & Projects",
      description:
        "Integrated scheduling and project hubs that keep academics and builds in sync.",
    },
  ],

  productThinking:
    "I designed StudySync AI around a single insight: students optimizing for careers don't need more features — they need fewer surfaces with smarter defaults. I mapped the full journey from semester start to offer letter, identified the highest-friction handoffs (notes → plan, plan → action, action → feedback), and built the MVP around the dashboard as a daily ritual. Every widget answers one question: What should I do next? The product prioritizes clarity over configurability, matching the restraint of tools like Linear and Notion.",

  technicalArchitecture: {
    summary:
      "A modular, API-first architecture designed for fast iteration on AI workflows without sacrificing frontend polish.",
    layers: [
      {
        name: "Experience Layer",
        detail: "Next.js + React with real-time dashboard state, optimistic updates, and responsive layouts.",
      },
      {
        name: "API Gateway",
        detail: "FastAPI services with typed contracts, auth middleware, and rate-limited AI endpoints.",
      },
      {
        name: "AI Orchestration",
        detail: "Prompt pipelines with retrieval-augmented context from user documents and activity history.",
      },
      {
        name: "Data Layer",
        detail: "PostgreSQL for relational data, Redis for sessions and job queues, S3 for document storage.",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "OpenAI",
      "PostgreSQL",
      "Redis",
      "Vercel",
    ],
  },

  aiWorkflow: [
    {
      step: "Ingest",
      detail: "User uploads resumes, notes, or job descriptions. Documents are parsed and embedded.",
    },
    {
      step: "Contextualize",
      detail: "The system builds a user profile graph linking goals, skills, deadlines, and activity.",
    },
    {
      step: "Recommend",
      detail: "LLM agents generate prioritized actions — study blocks, resume edits, interview drills.",
    },
    {
      step: "Execute",
      detail: "Actions surface in the dashboard with one-click workflows and calendar integration.",
    },
    {
      step: "Learn",
      detail: "Feedback loops refine recommendations based on completion rates and outcome signals.",
    },
  ],

  roadmap: [
    {
      phase: "Now",
      items: [
        "Core dashboard with 9 integrated widgets",
        "AI Career Assistant v1 with resume context",
        "Application and internship pipeline tracking",
      ],
    },
    {
      phase: "Next",
      items: [
        "Calendar sync (Google, Notion)",
        "Collaborative study rooms",
        "Mobile companion app",
      ],
    },
    {
      phase: "Future",
      items: [
        "University partnerships and cohort analytics",
        "Fine-tuned models per discipline",
        "Marketplace for mentor sessions",
      ],
    },
  ],

  resultsAndVision: {
    title: "Built for scale. Designed for trust.",
    metrics: [
      { label: "Widgets shipped", value: "9" },
      { label: "AI workflows", value: "5" },
      { label: "Core user journeys", value: "4" },
    ],
    body: "StudySync AI is positioned as a category-defining workspace for the next generation of builders — not a homework helper, but a career acceleration platform. The vision is a product students open every morning the way professionals open Linear: a calm, intelligent surface that turns ambition into momentum.",
    vision:
      "Become the default operating system for student builders — from first internship to first offer, with AI that grows alongside every milestone.",
  },

  isPrivate: false,
  githubUrl: "https://github.com/atiksha05/StudySync-AI",
};
