"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Art from "@/components/Art";

export type Row = {
  slug: string;
  title: string;
  category: string;
  date: string;
  dateLabel: string;
  author: string;
  excerpt?: string;
  featured?: boolean;
  href?: string;
  art?: string;
};

export default function WritingIndex({ rows }: { rows: Row[] }) {
  const [tab, setTab] = useState("All");
  const cats = useMemo(() => {
    const m = new Map<string, number>();
    rows.forEach((r) => m.set(r.category, (m.get(r.category) ?? 0) + 1));
    return [["All", rows.length] as [string, number], ...Array.from(m.entries())];
  }, [rows]);
  const list = rows.filter((r) => tab === "All" || r.category === tab);
  const featured = rows.filter((r) => r.featured).slice(0, 3);

  return (
    <>
      {featured.length > 0 && (
        <section className="section section--first" style={{ paddingTop: 56 }}>
          <div className="kicker"><b>Featured</b></div>
          <div className="cards">
            {featured.map((p) => (
              <Link key={p.slug} href={p.href ?? `/writing/${p.slug}`} className="card">
                <div className="art"><Art kind={p.art} /></div>
                <div className="meta">
                  <span className="cat">{p.category}</span>
                  <span>{p.dateLabel}</span>
                </div>
                <div className="t">{p.title}</div>
                <p>{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: 56 }}>
        <div className="tabs" role="tablist">
          {cats.map(([c, n]) => (
            <button key={c} role="tab" className="tab" aria-selected={tab === c} onClick={() => setTab(c)}>
              {c}<span>{n}</span>
            </button>
          ))}
        </div>
        <ul className="rows">
          {list.map((p) => (
            <li key={p.slug}>
              <Link href={p.href ?? `/writing/${p.slug}`} className="row">
                <span className="cat">{p.category}</span>
                <span>{p.dateLabel}</span>
                <span className="t">{p.title}</span>
                <span className="auth">{p.author}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
