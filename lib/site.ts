export const site = {
  name: "Ashutosh Trivedi",
  short: "Ashu",
  domain: "https://emergence.live",
  tagline: "Observe the unknown.",
  ogTitle: "Notes from Ashutosh Trivedi",
  ogDescription: "I write here about nature, beauty, philosophy, mathematics, science and music.",
  description:
    "Essays on nature, beauty, philosophy, mathematics, science and music. Yoga, meditation and the mind, long treks in the Himalaya, AI and the society of agents, fractals and optimization, and side research.",
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
