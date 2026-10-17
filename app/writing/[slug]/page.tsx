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
        <header className="article-head col">
          <div className="meta">
            <span className="cat">{p.category}</span>
            <span>{fmt(p.date)}</span>
            <span>{Math.max(1, Math.round((p.words ?? 0) / 230))} min read</span>
          </div>
          <h1 className="display">{p.title}</h1>
          {p.subtitle && <p className="sub">{p.subtitle}</p>}
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: p.html ?? "" }} />
        {others.length > 0 && (
          <section className="block" style={{ paddingTop: 48 }}>
            <div className="rule"><span className="label">More</span></div>
            <ul className="posts">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/writing/${o.slug}`} className="post">
                    <span className="when"><b>{o.category}</b>{fmt(o.date)}</span>
                    <span><span className="t">{o.title}</span></span>
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
