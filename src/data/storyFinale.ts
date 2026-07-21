export type StoryPrinciple = {
  id: string;
  title: string;
  description: string;
  source: string;
  icon: "ear" | "compass" | "users" | "refresh";
};

export const storyPrinciples = {
  eyebrow: "HOW I WORK",
  title: "The Principles I Build By",
  subtitle:
    "My leadership roles, technical work, and community experiences have shaped a few principles that guide how I approach people, products, and problems.",
  cards: [
    {
      id: "listen",
      title: "Listen Before Building",
      description:
        "The strongest solutions begin with understanding the people experiencing the problem—not assuming what they need.",
      source: "Learned through Orientation and ORSP",
      icon: "ear",
    },
    {
      id: "clarity",
      title: "Create Clarity",
      description:
        "I turn broad goals into owners, timelines, requirements, and next steps so teams can move forward with confidence.",
      source: "Learned through ACM and project coordination",
      icon: "compass",
    },
    {
      id: "people",
      title: "Build With People",
      description:
        "Great outcomes come from trust, communication, and giving every person a meaningful role in the work.",
      source: "Learned through ISA, ACM, and SF Hacks",
      icon: "users",
    },
    {
      id: "system",
      title: "Leave the System Better",
      description:
        "I want every project to improve not only the final outcome, but also the process used to create it.",
      source: "Learned through ORSP and software development",
      icon: "refresh",
    },
  ] satisfies StoryPrinciple[],
};

export const storyClosing = {
  eyebrow: "WHAT COMES NEXT",
  titleLines: ["Still Learning.", "Still Building."],
  copy: "Every team, project, student, and community has shaped the way I think and lead. I'm excited to bring that curiosity, ownership, and care into the next product I help build.",
  primary: {
    label: "Let's Build Something Meaningful",
    href: "/#contact",
  },
  secondary: {
    label: "Back to My Work",
    href: "/#projects",
  },
};
