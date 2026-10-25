import Link from "next/link";
import Swarm from "@/components/Swarm";
import Fig from "@/components/Fig";
import { topics } from "@/lib/topics";
import { fmt } from "@/lib/posts";
import { getEntries } from "@/lib/entries";
import { site } from "@/lib/site";
import PostRow from "@/components/PostRow";

export default function Home() {
  const entries = getEntries();
  const latest = entries.slice(0, 5);
  const count = (slug: string) => entries.filter((e) => e.topics.includes(slug)).length;

  return (
    <>
      <section className="hero">
        <div className="swarm"><Swarm /></div>
        <div className="wrap" style={{ position: "relative" }}>
          <div className="row">
            <div className="portrait">
              <img src={site.photo} alt={site.name} width={96} height={96} />
            </div>
            <div className="col">
              <h1 className="display">
                Trying to win over <span className="accent">my mind</span>.
              </h1>
              <p className="lead">
                I am {site.name}. I build at the intersection of machine learning and distributed
                systems, and I write here about beauty, philosophy, mathematics, science, technology and the
                human experience.
              </p>
              <div className="meta">
                <a href={site.company.url} target="_blank" rel="noopener noreferrer">Founder, {site.company.name}</a>
                <a href={site.social.x} target="_blank" rel="noopener noreferrer">X</a>
                <a href={site.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0, borderTop: 0 }}>
        <div className="wrap">
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
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="rule"><span className="label">Latest</span></div>
          <ul className="posts">
            {latest.map((e) => (
              <li key={e.slug}>
                <PostRow href={e.href} category={e.category} dateLabel={fmt(e.date)} title={e.title} excerpt={e.excerpt} topics={e.topics} />
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 28 }}>
            <Link href="/writing" className="u arrow">All writing</Link>
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="strip">
            <div>
              <h2 className="h2">A poem, a diagram and an algorithm in one composition.</h2>
              <p className="lead" style={{ marginTop: 18 }}>
                Around 1300 CE, Vedānta Deśika wrote a 32-syllable hymn that, read along a
                knight&apos;s tour of a half chessboard, becomes a second hymn.
              </p>
              <p style={{ marginTop: 26 }}>
                <Link href="/chitrakavya/knights-tour" className="btn">Step through the tour</Link>
              </p>
            </div>
            <figure className="fig-lg">
              <Fig k="tour" alt="Knight's tour" />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
