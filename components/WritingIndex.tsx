"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type Row = {
  slug: string;
  title: string;
  category: string;
  date: string;
  dateLabel: string;
  author: string;
  excerpt?: string;
  href?: string;
};

export default function WritingIndex({ rows }: { rows: Row[] }) {
  const [tab, setTab] = useState("All");
  const cats = useMemo(() => {
    const m = new Map<string, number>();
    rows.forEach((r) => m.set(r.category, (m.get(r.category) ?? 0) + 1));
    return [["All", rows.length] as [string, number], ...Array.from(m.entries())];
  }, [rows]);
  const list = rows.filter((r) => tab === "All" || r.category === tab);

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
            <Link href={p.href ?? `/writing/${p.slug}`} className="post">
              <span className="when"><b>{p.category}</b>{p.dateLabel}</span>
              <span>
                <span className="t">{p.title}</span>
                {p.excerpt && <p>{p.excerpt}</p>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
