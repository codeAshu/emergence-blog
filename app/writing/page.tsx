import type { Metadata } from "next";
import WritingIndex, { type Row } from "@/components/WritingIndex";
import { getPosts, fmt } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and notes on yoga, the mind, AI, the society of agents, beauty, science and side research.",
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
    featured: p.featured,
    href: p.href,
    art: p.art,
  }));
  rows.push({
    slug: "chitrakavya",
    title: "Chitrakāvya: poems that are programs",
    category: "Research",
    date: "2026-04-01",
    dateLabel: fmt("2026-04-01"),
    author: "Archive",
    excerpt: "Sanskrit poets encoded knight's tours, magic squares and palindromic surfaces into verse, a thousand years before Euler.",
    featured: true,
    href: "/chitrakavya",
    art: "knight",
  });
  rows.sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="wrap">
      <div style={{ padding: "64px 0 8px" }}>
        <div className="kicker"><b>emergence</b> writing</div>
        <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>Writing</h1>
        <p className="lead" style={{ marginTop: 18 }}>
          Essays and notes. Yoga and the mind, AI and the society of agents, beauty, science, and the
          side research I cannot put down.
        </p>
      </div>
      <WritingIndex rows={rows} />
    </div>
  );
}
