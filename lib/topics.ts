// The site's index. Every post names one or more topics in its frontmatter (topics: [agents, mathematics]);
// each topic has a figure, a page at /topics/<slug>, and collects the posts that name it.

export type Topic = {
  slug: string;
  name: string; // short, used in chips and labels
  figure: string; // key into figureByKey
  figureName: string; // the object drawn
  line: string; // one line under the figure
  href?: string; // an extra destination the topic page points at (an archive, a section)
  hrefLabel?: string;
};

export const topics: Topic[] = [
  {
    slug: "mathematics",
    name: "Mathematics",
    figure: "mandelbrot",
    figureName: "Mandelbrot",
    line: "Fractals, higher-order structure, and the proofs that feel inevitable once you see them. Self-similarity as a way of thinking.",
  },
  {
    slug: "optimization",
    name: "Optimization",
    figure: "descent",
    figureName: "Descent",
    line: "Gradients, search, equilibria, and what a system is really minimising when it looks like it is learning.",
  },
  {
    slug: "beauty",
    name: "Beauty",
    figure: "phyllotaxis",
    figureName: "Phyllotaxis",
    line: "Why some structures feel right before they are proven. Murmurations, metre, proofs, mountains.",
  },
  {
    slug: "agents",
    name: "AI and agents",
    figure: "society",
    figureName: "Society",
    line: "Emergence, alignment as architecture, and what happens when the players are no longer human.",
  },
  {
    slug: "philosophy",
    name: "Philosophy",
    figure: "tree",
    figureName: "A tree",
    line: "The six darśanas, the Greeks, and the questions that stay open: what there is, how we know it, and what to do about it.",
    href: "/darsana",
    hrefLabel: "The darśana series",
  },
  {
    slug: "mind",
    name: "Yoga and the mind",
    figure: "stillness",
    figureName: "Stillness",
    line: "The oldest engineering manual for awareness, read by someone who builds minds for a living.",
  },
  {
    slug: "science",
    name: "Science and technology",
    figure: "interference",
    figureName: "Interference",
    line: "Notes from building infrastructure for machines that see, and from the papers that change how I think.",
  },
  {
    slug: "chitrakavya",
    name: "Chitrakāvya",
    figure: "tour",
    figureName: "Knight's tour",
    line: "Computation as poetry. Sanskrit verses that are also diagrams and algorithms, and the side research around them.",
    href: "/chitrakavya",
    hrefLabel: "Open the archive",
  },
  {
    slug: "human",
    name: "The human experience",
    figure: "walk",
    figureName: "A walk",
    line: "What it is like to be a person learning in public, one moment at a time.",
  },
];

export const topicBySlug = Object.fromEntries(topics.map((t) => [t.slug, t])) as Record<string, Topic>;
