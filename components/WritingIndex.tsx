"use client";

import { useMemo, useState } from "react";
import PostRow from "@/components/PostRow";

export type Row = {
  slug: string;
  title: string;
  category: string;
  date: string;
  dateLabel: string;
  author: string;
  excerpt?: string;
  href?: string;
  topics?: string[];
  group?: string;
};

export default function WritingIndex({ rows }: { rows: Row[] }) {
  const [tab, setTab] = useState("All");
  const cats = useMemo(() => {
    const m = new Map<string, number>();
    rows.forEach((r) => { const g = r.group ?? r.category; m.set(g, (m.get(g) ?? 0) + 1); });
    return [["All", rows.length] as [string, number], ...Array.from(m.entries())];
  }, [rows]);
  const list = rows.filter((r) => tab === "All" || (r.group ?? r.category) === tab);

  return (
    <section className="block" style={{ paddingTop: 36, borderTop: 0 }}>
      <div className="tabs" role="tablist">
        {cats.map(([c, n]) => (
          <button key={c} role="tab" className="tab" aria-selected={tab === c} onClick={() => setTab(c)}>
            {c}<span>{n}</span>
          </button>
        ))}
      </div>
      <ul className="posts">
        {list.map((p) => (
          <li key={p.slug}>
            <PostRow href={p.href ?? `/writing/${p.slug}`} category={p.category} dateLabel={p.dateLabel} title={p.title} excerpt={p.excerpt} topics={p.topics} />
          </li>
        ))}
      </ul>
    </section>
  );
}
