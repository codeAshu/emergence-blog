import Link from "next/link";
import Swarm from "@/components/Swarm";
import Art from "@/components/Art";
import { getPosts, fmt } from "@/lib/posts";
import { site } from "@/lib/site";

const threads = [
  { t: "Yoga and the mind", p: "The oldest engineering manual for attention, read by someone who builds minds for a living." },
  { t: "AI and the society of agents", p: "Emergence, alignment as architecture, and what happens when the players are no longer human." },
  { t: "Beauty", p: "Why some structures feel right before they are proven. Murmurations, metre, proofs, mountains." },
  { t: "Science and technology", p: "Notes from building infrastructure for machines that see, and from the papers that change how I think." },
  { t: "Side research", p: "Chitrakāvya, computation as poetry, and other questions that will not let me go." },
  { t: "The human experience", p: "What it is like to be a person learning in public, one moment at a time." },
];

export default function Home() {
  const posts = getPosts().slice(0, 4);

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
                Learning every moment. Trying to win over <span className="accent">my mind</span>.
              </h1>
              <p className="lead">
                I am {site.name}. I build at the intersection of machine learning and distributed
                systems, and I write here about beauty, philosophy, science, technology and the human
                experience.
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

      <section className="block">
        <div className="wrap">
          <div className="rule"><span className="label">Writing</span></div>
          <ul className="posts">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={p.href ?? `/writing/${p.slug}`} className="post">
                  <span className="when"><b>{p.category}</b>{fmt(p.date)}</span>
                  <span>
                    <span className="t">{p.title}</span>
                    {p.excerpt && <p>{p.excerpt}</p>}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/chitrakavya" className="post">
                <span className="when"><b>Research</b>Apr 2026</span>
                <span>
                  <span className="t">Chitrakāvya: poems that are programs</span>
                  <p>Sanskrit poets encoded knight&apos;s tours, magic squares and palindromic surfaces into verse, a thousand years before Euler. The archive, with the tour you can step through.</p>
                </span>
              </Link>
            </li>
          </ul>
          <p style={{ marginTop: 28 }}>
            <Link href="/writing" className="u arrow">All writing</Link>
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="rule"><span className="label">Threads</span></div>
          <ul className="threads">
            {threads.map((x) => (
              <li key={x.t}>
                <div className="t">{x.t}</div>
                <p>{x.p}</p>
              </li>
            ))}
          </ul>
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
            <figure>
              <Art kind="knight" />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
