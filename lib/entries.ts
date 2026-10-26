// Everything the index can point at, in one list: markdown posts plus the content that lives as
// its own pages (the darśana series, the Chitrakāvya archive). Home, Writing and topic pages read this.
import { getPosts } from "./posts";
import { darsanaPosts, darsanaSeries } from "./darsana";

export type Entry = {
  slug: string;
  href: string;
  title: string;
  category: string;
  group?: string; // tab in the writing index when it differs from the category
  date: string; // ISO
  excerpt?: string;
  topics: string[];
};

const standalone: Entry[] = [
  // the six darśana posts: each row is labelled by its school and filed under Darśana in the index
  ...darsanaPosts.map((p) => ({
    slug: `darsana-${p.slug}`,
    href: `/darsana/${p.slug}`,
    title: p.title,
    category: p.school,
    group: darsanaSeries.category,
    date: p.date,
    excerpt: p.excerpt,
    topics: p.topics,
  })),
  {
    slug: "chitrakavya",
    href: "/chitrakavya",
    title: "Chitrakāvya: poems that are programs",
    category: "Research",
    date: "2026-04-01",
    excerpt:
      "Sanskrit poets encoded knight's tours, magic squares and palindromic surfaces into verse, a thousand years before Euler. The archive, with the tour you can step through.",
    topics: ["chitrakavya", "mathematics"],
  },
];

export function getEntries(): Entry[] {
  const posts: Entry[] = getPosts().map((p) => ({
    slug: p.slug,
    href: `/writing/${p.slug}`,
    title: p.title,
    category: p.category,
    date: p.date,
    excerpt: p.excerpt,
    topics: p.topics,
  }));
  return [...posts, ...standalone].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getEntriesByTopic(slug: string): Entry[] {
  return getEntries().filter((e) => e.topics.includes(slug));
}
