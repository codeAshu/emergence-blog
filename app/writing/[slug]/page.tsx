import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts, fmt } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.subtitle ?? p.excerpt,
    openGraph: { type: "article", title: p.title, description: p.subtitle ?? p.excerpt, publishedTime: p.date, authors: [p.author] },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const others = getPosts().filter((o) => o.slug !== slug).slice(0, 3);

  return (
    <article>
      <div className="wrap">
        <header className="article-head">
          <div className="meta">
            <span className="cat">{p.category}</span>
            <span>{fmt(p.date)}</span>
            <span>{p.author}</span>
            <span>{Math.max(1, Math.round((p.words ?? 0) / 230))} min read</span>
          </div>
          <h1 className="display" style={{ fontSize: "clamp(36px, 5.4vw, 64px)", maxWidth: "18ch" }}>{p.title}</h1>
          {p.subtitle && <p className="sub">{p.subtitle}</p>}
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: p.html ?? "" }} />
        {others.length > 0 && (
          <section className="section" style={{ paddingTop: 56 }}>
            <div className="kicker"><b>More</b> writing</div>
            <ul className="rows">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/writing/${o.slug}`} className="row">
                    <span className="cat">{o.category}</span>
                    <span>{fmt(o.date)}</span>
                    <span className="t">{o.title}</span>
                    <span className="auth">{o.author}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
