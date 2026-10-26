import type { Metadata } from "next";
import { ogFor } from "@/lib/og";
import Link from "next/link";
import { topics } from "@/lib/topics";
import Fig from "@/components/Fig";
import { getEntries } from "@/lib/entries";

export const metadata: Metadata = { title: "Topics", description: "The index of the site: nine topics, each with its figure.", ...ogFor("/topics") };

export default function TopicsPage() {
  const entries = getEntries();
  const count = (slug: string) => entries.filter((e) => e.topics.includes(slug)).length;
  return (
    <div className="wrap">
      <div className="pagehead col">
        <h1 className="display">Topics</h1>
        <p className="lead">The index. Everything written here is filed under one or more of these.</p>
      </div>
      <section className="block" style={{ paddingTop: 36, borderTop: 0 }}>
        <ul className="figs figs--4">
          {topics.map((t) => {
            const n = count(t.slug);
            return (
              <li key={t.slug}>
                <Link href={`/topics/${t.slug}`}>
                  <span className="label">{t.figureName}</span>
                  <span className="fig"><Fig k={t.figure} alt={t.figureName} /></span>
                  <span className="t">{t.name}</span>
                  <span className="line">{t.line}</span>
                  <span className="count">{n ? `${n} ${n === 1 ? "piece" : "pieces"}` : t.href ? "Archive" : "Soon"}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
