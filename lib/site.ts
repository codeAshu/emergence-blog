export const site = {
  name: "Ashutosh Trivedi",
  short: "Ashu",
  domain: "https://emergence.live",
  tagline: "Learning every moment. Trying to win over my mind.",
  description:
    "Essays on beauty, philosophy, science, technology and the human experience. Yoga, the mind, AI, the society of agents, and side research.",
  social: {
    x: "https://x.com/ashu_trv",
    github: "https://github.com/codeAshu",
    linkedin: "https://linkedin.com/in/ashutoshtrivedi",
    email: "mailto:ashu@videodb.io",
  },
  company: { name: "VideoDB", url: "https://videodb.io" },
  photo: "/ashu.jpg",
};

export const categories = ["Essay", "Yoga", "Mind", "AI", "Research", "Notes"] as const;
export type Category = (typeof categories)[number];
