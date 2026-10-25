import type { Metadata } from "next";
import WritingIndex, { type Row } from "@/components/WritingIndex";
import { fmt } from "@/lib/posts";
import { getEntries } from "@/lib/entries";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and notes on yoga, the mind, AI, the society of agents, mathematics, philosophy, beauty, science and side research.",
};

export default function WritingPage() {
  const rows: Row[] = getEntries().map((e) => ({
    slug: e.slug,
    title: e.title,
    category: e.category,
    date: e.date,
    dateLabel: fmt(e.date),
    author: "Ashutosh Trivedi",
    excerpt: e.excerpt,
    href: e.href,
    topics: e.topics,
  }));

  return (
    <div className="wrap">
      <div className="pagehead col">
        <h1 className="display">Writing</h1>
        <p className="lead">
          Essays and notes. Yoga and the mind, AI and the society of agents, mathematics, philosophy,
          beauty, science, and the side research I cannot put down.
        </p>
      </div>
      <div data-mount="writing-index" data-rows={JSON.stringify(rows)}><WritingIndex rows={rows} /></div>
    </div>
  );
}
