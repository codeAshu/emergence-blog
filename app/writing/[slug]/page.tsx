import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts, fmt } from "@/lib/posts";
import Prose from "@/components/Prose";
import TopicChips from "@/components/TopicChips";
import PostRow from "@/components/PostRow";
import { topicBySlug } from "@/lib/topics";

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
  const related = getPosts().filter((o) => o.slug !== slug && o.topics.some((t) => p.topics.includes(t))).slice(0, 3);
  const others = related.length ? related : getPosts().filter((o) => o.slug !== slug).slice(0, 3);
  const firstTopic = p.topics[0] ? topicBySlug[p.topics[0]] : undefined;

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
          <div style={{ marginTop: 22 }}><TopicChips slugs={p.topics} size="md" /></div>
        </header>
        <Prose html={p.html ?? ""} />
        {others.length > 0 && (
          <section className="block" style={{ paddingTop: 48 }}>
            <div className="rule"><span className="label">{related.length && firstTopic ? `More in ${firstTopic.name}` : "More"}</span></div>
            <ul className="posts">
              {others.map((o) => (
                <li key={o.slug}>
                  <PostRow href={`/writing/${o.slug}`} category={o.category} dateLabel={fmt(o.date)} title={o.title} topics={o.topics} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
