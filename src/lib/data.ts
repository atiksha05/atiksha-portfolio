export const backgroundVideo = {
  src: "/videos/sf_night.mp4",
  /** Radius of video reveal around cursor / touch (px) */
  revealRadius: 220,
};

export const site = {
  name: "Atiksha Antil",
  email: "atikshasunilantil@gmail.com",
  phone: "650-642-4740",
  linkedin: "https://www.linkedin.com/in/atiksha-antil-1677142b0/",
  github: "https://github.com/atiksha05",
  location: "San Francisco, CA",
};

export const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

export const hero = {
  name: "Atiksha Antil",
  titleLeft: ["Product", "Manager"],
  titleRight: ["Software", "Engineer"],
  pmSubtitle: "Vision to roadmap — I align teams and deliver impact.",
  sweSubtitle: "Full-stack builder — I ship systems that scale.",
  image: "/images/atiksha-hero.png",
  imageAlt: "/images/atiksha-hero-alt.png",
};

export type MarqueeSkill = {
  label: string;
  icon:
    | "react"
    | "python"
    | "aws"
    | "nextjs"
    | "agile"
    | "rest"
    | "jira"
    | "postgresql"
    | "roadmaps"
    | "docker"
    | "tableau";
};

/** SWE + PM skills from resume — hero logo-cloud marquee */
export const marqueeItems: MarqueeSkill[] = [
  { label: "React", icon: "react" },
  { label: "Python", icon: "python" },
  { label: "AWS", icon: "aws" },
  { label: "Next.js", icon: "nextjs" },
  { label: "Agile", icon: "agile" },
  { label: "REST APIs", icon: "rest" },
  { label: "JIRA", icon: "jira" },
  { label: "PostgreSQL", icon: "postgresql" },
  { label: "Roadmaps", icon: "roadmaps" },
  { label: "Docker", icon: "docker" },
  { label: "Tableau", icon: "tableau" },
];

export const projects = [
  {
    id: 1,
    title: "Personal Finance Tracker",
    description: "AI budgeting with Plaid & OpenAI",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    href: "#",
    tags: ["Next.js", "PM", "SWE"],
  },
  {
    id: 2,
    title: "Campus Event Auto-Planner",
    description: "MERN event management with ML attendance",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    href: "#",
    tags: ["React", "MongoDB", "PM"],
  },
  {
    id: 3,
    title: "Codebase Query Engine",
    description: "AI semantic search for developer repos",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    href: "#",
    tags: ["FastAPI", "LangChain", "SWE"],
  },
  {
    id: 4,
    title: "Learn-Loop",
    description: "Full-stack skill-sharing platform",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    href: "https://github.com/atiksha05/Learn-Loop",
    tags: ["Node.js", "PostgreSQL"],
  },
  {
    id: 5,
    title: "Cache Manager",
    description: "C++ FIFO cache with hash tables & BST",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    href: "https://github.com/atiksha05/cache-manager",
    tags: ["C++", "Systems"],
  },
];

/** Projects in the hero marquee strip (+ placeholders until more are added) */
export const projectMarquee = [
  ...projects,
  {
    id: 6,
    title: "Project 1",
    description: "Coming soon",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    href: "#projects",
    tags: ["SWE"],
  },
  {
    id: 7,
    title: "Project 2",
    description: "Coming soon",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
    href: "#projects",
    tags: ["PM"],
  },
];

export const about = {
  title: "The Person Behind the Product",
  intro: [
    "I'm Atiksha, a Computer Science student at San Francisco State University, software engineer, and aspiring product manager. I love building products that combine technology, creativity, and empathy — from AI tools to campus platforms and productivity systems.",
    "I'm especially interested in creating experiences that help people learn, grow, and feel more organized in their everyday lives.",
  ],
  portrait: "/images/atiksha-about.png",
  avatar3d: "/images/atiksha-avatar-3d-cutout.png",
  skillPills: [
    "React",
    "Next.js",
    "TypeScript",
    "AI",
    "Product Management",
    "Leadership",
    "Full Stack",
    "UX Thinking",
  ],
};

export const myStory = {
  title: "My Story",
  intro:
    "From mentoring students in CSME to building full-stack tools at ACM and ORSP — here's how I got here, what I'm doing now, and where I'm headed.",
  past: {
    heading: "Where I've Been",
    body: "I started at SFSU diving deep into computer science — data structures, systems, and software development — while tutoring 100+ students as a CSME Teacher Fellow. That taught me how to break down complex ideas and lead with empathy, skills I still use every day in engineering and product work.",
  },
  present: {
    heading: "What I'm Doing Now",
    body: "I'm a Student Assistant at ORSP building Python automation and dashboards, and Outreach Officer at ACM shipping React/Node.js tools on AWS. I'm also pursuing internships where I can blend SWE and PM — scoping requirements, writing code, and delivering measurable impact.",
  },
  future: {
    heading: "Where I'm Headed",
    body: "After graduating in May 2027, I want to join a team in the Bay Area that values both technical depth and product thinking — shipping systems that scale while driving roadmaps, stakeholder alignment, and real user outcomes.",
  },
};

export const skillTags = [
  "Java",
  "Python",
  "JavaScript",
  "React",
  "Next.js",
  "Spring Boot",
  "AWS",
  "Docker",
  "PostgreSQL",
  "MongoDB",
  "REST APIs",
  "GraphQL",
  "JIRA",
  "Trello",
  "Agile",
  "Tableau",
  "TensorFlow",
  "Unit Testing",
];

export const experience = [
  {
    role: "Student Assistant",
    company: "ORSP · SFSU",
    period: "Jan 2025 – Present",
  },
  {
    role: "Outreach Officer",
    company: "ACM · SFSU",
    period: "May 2025 – Present",
  },
  {
    role: "Teacher Fellow",
    company: "CSME · SFSU",
    period: "Aug 2024 – May 2025",
  },
];

export const processSteps = [
  {
    number: "1",
    title: "Understand the Problem",
    description:
      "Gather requirements, align stakeholders, and define scope — turning ambiguous goals into a clear roadmap with measurable outcomes.",
    icon: "vision" as const,
  },
  {
    number: "2",
    title: "Build & Align",
    description:
      "Ship iteratively with Agile sprints — writing code, designing APIs, and keeping cross-functional teams synced through documentation and delivery.",
    icon: "build" as const,
  },
  {
    number: "3",
    title: "Ship & Measure",
    description:
      "Deploy to production, monitor performance, and iterate from real feedback — optimizing workflows and scaling systems that hold up under pressure.",
    icon: "ship" as const,
  },
];

export const services = [
  {
    title: "Full-Stack Development",
    description:
      "Building responsive web applications with React, Next.js, Node.js, and robust backend APIs — from database design to deployment.",
  },
  {
    title: "Technical Program Leadership",
    description:
      "Driving programs from requirements to delivery with JIRA, Confluence, and Agile — coordinating teams and mitigating risks along the way.",
  },
  {
    title: "Systems & Cloud",
    description:
      "Designing scalable infrastructure on AWS with Docker and microservices — monitoring performance and cutting errors through smart automation.",
  },
  {
    title: "Product & Requirements",
    description:
      "Translating business needs into technical specs, prototyping dashboards, and delivering stakeholder-aligned solutions with clear impact metrics.",
  },
];

export const serviceTags = [
  "React",
  "Python",
  "AWS",
  "Roadmaps",
  "REST APIs",
  "PostgreSQL",
  "Agile",
  "Docker",
  "Tableau",
  "JWT Auth",
  "Microservices",
  "Stakeholder Alignment",
  "MongoDB",
  "GraphQL",
  "CI/CD",
];

export const testimonials = [
  {
    name: "Cross-functional impact",
    role: "ORSP · Automation",
    quote:
      "Built Python automation that reduced onboarding effort by 30% — streamlining workflows and documenting requirements for stakeholder alignment.",
  },
  {
    name: "Technical leadership",
    role: "ACM · Outreach",
    quote:
      "Led Agile sprints delivering React & Node.js tools on AWS — scaling infrastructure to 200+ concurrent users while cutting admin workload by 50%.",
  },
  {
    name: "Mentorship at scale",
    role: "CSME · Teaching",
    quote:
      "Mentored 100+ students in CS and math, creating Python tutorials that boosted course performance by 15% and reduced grading effort by 30%.",
  },
  {
    name: "End-to-end delivery",
    role: "Personal Projects",
    quote:
      "Scoped and shipped full-stack platforms with real integrations — Plaid, OpenAI, Google Calendar — from requirements through secure JWT-authenticated deployment.",
  },
];

export const stats = [
  { value: "5+", label: "projects shipped" },
  { value: "30%", label: "workflow efficiency gained" },
  { value: "100+", label: "students mentored" },
];

export const faqs = [
  {
    question: "What roles are you looking for?",
    answer:
      "Software engineering and product-focused roles — internships and new grad opportunities in the San Francisco Bay Area. I'm open to hybrid SWE/PM tracks where I can contribute on both technical and strategic levels.",
  },
  {
    question: "What's your tech stack?",
    answer:
      "Java, Python, JavaScript, React, Next.js, Spring Boot, PostgreSQL, MongoDB, AWS, Docker, REST/GraphQL APIs, and tools like JIRA, Trello, and Tableau for program delivery.",
  },
  {
    question: "SWE or PM — which do you prefer?",
    answer:
      "Both. I love writing code and shipping systems, and I'm equally energized by requirements gathering, roadmaps, and cross-functional leadership. My ideal role lets me do both.",
  },
  {
    question: "When do you graduate?",
    answer:
      "May 2027 with a B.S. in Computer Science from San Francisco State University.",
  },
  {
    question: "Are you based in San Francisco?",
    answer:
      "Yes — I'm based in San Francisco and studying at SFSU. I'm looking for opportunities in the Bay Area.",
  },
  {
    question: "How do I reach you?",
    answer:
      "Email me at atikshasunilantil@gmail.com, connect on LinkedIn, or check out my projects on GitHub. Resume available on request.",
  },
];

export const faqTags = [
  "Software Engineering",
  "Product Management",
  "San Francisco",
];
