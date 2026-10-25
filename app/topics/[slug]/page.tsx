import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { topics, topicBySlug } from "@/lib/topics";
import Fig from "@/components/Fig";
import { getPostsByTopic, fmt } from "@/lib/posts";
import PostRow from "@/components/PostRow";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = topicBySlug[slug];
  if (!t) return {};
  return { title: t.name, description: t.line };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const t = topicBySlug[slug];
  if (!t) notFound();
  const posts = getPostsByTopic(slug);
  const others = topics.filter((o) => o.slug !== slug);

  return (
    <div className="wrap">
      <section className="topic-head">
        <figure className="fig-lg"><Fig k={t.figure} alt={t.figureName} /></figure>
        <div>
          <div className="label" style={{ marginBottom: 14 }}>Topic · {t.figureName}</div>
          <h1 className="display">{t.name}</h1>
          <p className="lead" style={{ marginTop: 18 }}>{t.line}</p>
          {t.href && (
            <p style={{ marginTop: 24 }}>
              <Link href={t.href} className="btn">{t.hrefLabel ?? "Open"}</Link>
            </p>
          )}
        </div>
      </section>

      <section className="block">
        <div className="rule"><span className="label">{posts.length ? `${posts.length} ${posts.length === 1 ? "piece" : "pieces"}` : "Writing"}</span></div>
        {posts.length ? (
          <ul className="posts">
            {posts.map((p) => (
              <li key={p.slug}>
                <PostRow href={`/writing/${p.slug}`} category={p.category} dateLabel={fmt(p.date)} title={p.title} excerpt={p.excerpt} topics={p.topics} hideTopic={slug} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted" style={{ maxWidth: "48ch" }}>
            Nothing filed here yet. {t.href ? "The archive is the place to start." : "It is on the list."}
          </p>
        )}
      </section>

      <section className="block">
        <div className="rule"><span className="label">Other topics</span></div>
        <ul className="figs figs--small">
          {others.map((o) => {
            return (
              <li key={o.slug}>
                <Link href={`/topics/${o.slug}`}>
                  <span className="fig"><Fig k={o.figure} alt={o.figureName} /></span>
                  <span className="t">{o.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
