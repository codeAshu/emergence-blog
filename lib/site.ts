export const site = {
  name: "Ashutosh Trivedi",
  short: "Ashu",
  domain: "https://emergence.live",
  tagline: "Observe the unknown.",
  description:
    "Essays on beauty, philosophy, mathematics, science, technology and the human experience. Yoga, the mind, AI, the society of agents, fractals and optimization, and side research.",
  social: {
    x: "https://x.com/ashu_trv",
    github: "https://github.com/codeAshu",
    linkedin: "https://linkedin.com/in/ashutoshtrivedi",
    email: "mailto:ashu@videodb.io",
  },
  company: { name: "VideoDB", url: "https://videodb.io" },
  photo: "/ashu.jpg",
};

export const categories = ["Essay", "Darśana", "Yoga", "Mind", "AI", "Mathematics", "Research", "Notes"] as const;
export type Category = (typeof categories)[number];
