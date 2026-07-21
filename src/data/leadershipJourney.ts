export type LeadershipMilestone = {
  id: string;
  emoji: string;
  role: string;
  organization: string;
  duration: string;
  year: string;
  headline: string;
  summary: string;
  lesson: string;
  skills: string[];
  impact: string;
  quoteLabel: string;
  quote: string;
  isCurrent?: boolean;
};

export const leadershipJourney = {
  title: "Leadership Journey",
  subtitle:
    "Every experience taught me a different way to lead, solve problems, and create impact.",
  milestones: [
    {
      id: "orientation-leader",
      emoji: "🌱",
      role: "Orientation Leader",
      organization: "San Francisco State University",
      duration: "Summer 2024",
      year: "2024",
      headline: "Helping Students Find Their Place",
      summary:
        "I welcomed new students, answered difficult questions, and helped them transition into university life.",
      lesson: "Leadership begins by making people feel they belong.",
      skills: [
        "Public Speaking",
        "Mentorship",
        "Communication",
        "Empathy",
        "Conflict Resolution",
      ],
      impact:
        "Supported hundreds of incoming students during orientation and helped them confidently begin their college journey.",
      quoteLabel: "What orientation taught me",
      quote:
        "Leadership begins by making people feel they belong.",
    },
    {
      id: "events-head",
      emoji: "🎉",
      role: "Events Head",
      organization: "Indian Student Association",
      duration: "ISA",
      year: "2024",
      headline: "Creating Experiences",
      summary:
        "I organized cultural events, coordinated volunteers, fundraising, logistics, vendors, and planning.",
      lesson: "Behind every successful event is great teamwork.",
      skills: [
        "Event Planning",
        "Budgeting",
        "Team Coordination",
        "Fundraising",
        "Vendor Management",
      ],
      impact:
        "Built stronger student engagement through well-organized campus events.",
      quoteLabel: "What ISA taught me",
      quote:
        "Leadership isn't organizing people. It's inspiring them.",
    },
    {
      id: "student-assistant",
      emoji: "📚",
      role: "Student Assistant",
      organization: "Office of Research & Sponsored Programs",
      duration: "ORSP · Ongoing",
      year: "2024–26",
      headline: "Learning Product Operations",
      summary:
        "For nearly two years I have supported research operations by coordinating documentation, improving workflows, facilitating meetings, building dashboards, and creating internal tools.",
      lesson: "Great products depend on great systems.",
      skills: [
        "Product Operations",
        "Documentation",
        "Stakeholder Communication",
        "Workflow Design",
        "Data Analysis",
      ],
      impact:
        "Improved internal processes and supported faculty with scalable operational systems.",
      quoteLabel: "What ORSP taught me",
      quote:
        "Behind every successful product is a system that quietly works.",
      isCurrent: true,
    },
    {
      id: "outreach-officer",
      emoji: "🚀",
      role: "Outreach Officer",
      organization: "ACM @ SFSU",
      duration: "ACM",
      year: "2024–25",
      headline: "Growing Communities",
      summary:
        "I built partnerships, coordinated events, worked with companies, and helped students discover opportunities.",
      lesson: "Communities grow through consistent relationships.",
      skills: [
        "Outreach",
        "Partnerships",
        "Communication",
        "Community Building",
        "Collaboration",
      ],
      impact:
        "Expanded engagement between students and industry partners.",
      quoteLabel: "What ACM taught me",
      quote:
        "Communities don't grow by accident—they grow through trust.",
    },
    {
      id: "outreach-chair",
      emoji: "⭐",
      role: "Outreach Chair",
      organization: "ACM @ SFSU",
      duration: "Promotion · Ongoing",
      year: "2025–26",
      headline: "Leading Leaders",
      summary:
        "This role challenged me to think strategically rather than simply execute tasks. Now I lead meetings, guide outreach strategy, support my team, and build long-term partnerships.",
      lesson: "Leadership is creating more leaders.",
      skills: [
        "Leadership",
        "Team Management",
        "Strategy",
        "Decision Making",
        "Networking",
      ],
      impact: "Helping shape the future direction of ACM outreach.",
      quoteLabel: "What ACM taught me",
      quote: "Leadership is creating more leaders.",
      isCurrent: true,
    },
    {
      id: "vice-president",
      emoji: "👑",
      role: "Vice President",
      organization: "Indian Student Association",
      duration: "ISA · Ongoing",
      year: "2025–26",
      headline: "Building Culture",
      summary:
        "As Vice President I support our executive board, mentor newer officers, help organize events, fundraising initiatives, and strengthen our community.",
      lesson: "Culture is built one conversation at a time.",
      skills: [
        "Executive Leadership",
        "Mentorship",
        "Organization",
        "Communication",
        "Community",
      ],
      impact:
        "Supporting a student organization that connects hundreds of students.",
      quoteLabel: "What ISA taught me",
      quote:
        "Leadership isn't organizing people. It's inspiring them.",
      isCurrent: true,
    },
  ] satisfies LeadershipMilestone[],
};
