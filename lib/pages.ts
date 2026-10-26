// Every page the site serves, with what its social card and its Markdown alternate need.
// scripts/og.tsx renders one card per entry at build time (public/og/<key>.png); the
// metadata helper in lib/og.ts points each page at its card; app/md/[...path] serves the
// Markdown alternate the Human / Machine toggle shows.
import { site } from "./site";
import { topics } from "./topics";
import { getPosts, fmt } from "./posts";
import { darsanaPosts, darsanaSeries } from "./darsana";

export type PageCard = {
  /** URL path, e.g. "/writing/slug" */
  path: string;
  /** file key under public/og, e.g. "writing-slug" */
  key: string;
  title: string;
  description: string;
  /** small line above the title, e.g. "Essay · Oct 17, 2026" */
  kicker: string;
  /** a figure key from lib/topics (public/figures/<key>.svg) drawn on the right */
  figure?: string;
  /** or a raster image (path under public/) drawn on the right instead */
  image?: string;
};

export const ogKey = (path: string) => (path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "-"));

const chitrakavya: { path: string; title: string; description: string }[] = [
  { path: "/chitrakavya", title: "Chitrakāvya: poems that are programs", description: "Sanskrit poets encoded knight's tours, magic squares and palindromic surfaces into verse, a thousand years before Euler. An archive that reads those compositions as computational objects." },
  { path: "/chitrakavya/visuals", title: "Figures that carry a verse", description: "Chakrabandha, padmabandha, murajabandha and the other shape-poems: syllables plotted on a grid so that the figure itself holds the reading rule." },
  { path: "/chitrakavya/paduka", title: "A chess puzzle that is also a hymn", description: "Vedānta Deśika's Pādukāsahasra 30.40: two 32-syllable verses, one of them the other read along a knight's tour of a half chessboard." },
  { path: "/chitrakavya/knights-tour", title: "The knight's tour, step by step", description: "Step through the tour that turns verse 929 into verse 930: a Hamiltonian path over a 4×8 board, written as devotion seven centuries ago." },
  { path: "/chitrakavya/resources", title: "Chitrakāvya resources", description: "Texts, translations, papers and tools for Sanskrit visual verse and the combinatorics inside it." },
  { path: "/chitrakavya/about", title: "About the Chitrakāvya archive", description: "Where the archive came from, what it rebuilds from the IIIT-Bangalore project, and how to cite it." },
];

export function getPageCards(): PageCard[] {
  const cards: PageCard[] = [];
  const add = (c: Omit<PageCard, "key">) => cards.push({ ...c, key: ogKey(c.path) });

  add({ path: "/", title: site.ogTitle, description: site.ogDescription, kicker: "emergence.live", figure: "phyllotaxis" });
  add({ path: "/writing", title: "Writing", description: "Essays and notes. Yoga and the mind, AI and the society of agents, mathematics, philosophy, beauty, science, and the side research I cannot put down.", kicker: "emergence.live", figure: "walk" });
  add({ path: "/topics", title: "Topics", description: "The figures are the index. Each one gathers the pieces that touch it: mathematics, optimization, beauty, agents, philosophy, the mind, science, Chitrakāvya and the human experience.", kicker: "emergence.live", figure: "mandelbrot" });
  add({ path: "/about", title: site.name, description: site.description, kicker: "About", image: site.photo.replace(/^\//, "") });

  for (const p of getPosts()) {
    const figure = topics.find((t) => p.topics.includes(t.slug))?.figure ?? "walk";
    add({ path: `/writing/${p.slug}`, title: p.title, description: p.subtitle ?? p.excerpt ?? "", kicker: `${p.category} · ${fmt(p.date)}`, figure });
  }
  for (const t of topics) {
    add({ path: `/topics/${t.slug}`, title: t.name, description: t.line, kicker: `Topic · ${t.figureName}`, figure: t.figure });
  }
  add({ path: "/darsana", title: "The six darśanas", description: darsanaSeries.excerpt, kicker: "Darśana · six posts", figure: "tree" });
  for (const p of darsanaPosts) {
    add({ path: `/darsana/${p.slug}`, title: p.title, description: p.excerpt, kicker: `Darśana · ${p.school} · ${p.n} of 6 · ${fmt(p.date)}`, image: `og/lead/${p.slug}.png` });
  }
  for (const c of chitrakavya) {
    add({ path: c.path, title: c.title, description: c.description, kicker: "Chitrakāvya", figure: "tour" });
  }
  return cards;
}

export function getPageCard(path: string): PageCard | undefined {
  return getPageCards().find((c) => c.path === path);
}
