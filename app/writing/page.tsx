import type { Metadata } from "next";
import WritingIndex, { type Row } from "@/components/WritingIndex";
import { getPosts, fmt } from "@/lib/posts";
import { darsanaPosts, darsanaSeries } from "@/lib/darsana";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and notes on yoga, the mind, AI, the society of agents, mathematics, beauty, science and side research.",
};

export default function WritingPage() {
  const rows: Row[] = getPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    date: p.date,
    dateLabel: fmt(p.date),
    author: p.author,
    excerpt: p.excerpt,
    href: p.href,
  }));
  darsanaPosts.forEach((p) =>
    rows.push({
      slug: `darsana-${p.slug}`,
      title: `${p.title}`,
      category: darsanaSeries.category,
      date: darsanaSeries.date,
      dateLabel: `${fmt(darsanaSeries.date)} · ${p.school}, ${p.n} of 6`,
      author: "Ashutosh Trivedi",
      excerpt: p.excerpt,
      href: `/darsana/${p.slug}`,
    }),
  );
  rows.push({
    slug: "chitrakavya",
    title: "Chitrakāvya: poems that are programs",
    category: "Research",
    date: "2026-04-01",
    dateLabel: "Apr 2026",
    author: "Archive",
    excerpt: "Sanskrit poets encoded knight's tours, magic squares and palindromic surfaces into verse, a thousand years before Euler. The archive, with the tour you can step through.",
    href: "/chitrakavya",
  });
  // newest first; a stable comparator keeps same-day entries (the six darśana posts) in series order
  rows.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return (
    <div className="wrap">
      <div className="pagehead col">
        <h1 className="display">Writing</h1>
        <p className="lead">
          Essays and notes. Yoga and the mind, AI and the society of agents, mathematics, beauty,
          science, and the side research I cannot put down.
        </p>
      </div>
      <div data-mount="writing-index" data-rows={JSON.stringify(rows)}><WritingIndex rows={rows} /></div>
    </div>
  );
}
