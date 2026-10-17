import Link from "next/link";
import Flock from "@/components/Flock";
import Art from "@/components/Art";
import { getPosts, fmt } from "@/lib/posts";
import { site } from "@/lib/site";

const threads = [
  {
    t: "Yoga and the mind",
    p: "The oldest engineering manual for attention. What the sutras say about the mind, read by someone who builds minds for a living.",
  },
  {
    t: "AI and the society of agents",
    p: "Emergence, alignment as architecture, and what happens when the players in the game are no longer human.",
  },
  {
    t: "Beauty",
    p: "Why some structures feel right before they are proven. Murmurations, metre, proofs, mountains.",
  },
  {
    t: "Science and technology",
    p: "Notes from building infrastructure for machines that see, and from the papers that change how I think.",
  },
  {
    t: "Side research",
    p: "Chitrakāvya, computation as poetry, and other questions that will not let me go.",
  },
];

export default function Home() {
  const posts = getPosts();
  const featured = [
    ...posts.filter((p) => p.featured).slice(0, 2),
    {
      slug: "chitrakavya",
      title: "Chitrakāvya: poems that are programs",
      category: "Research",
      date: "2026-04-01",
      author: "Archive",
      excerpt: "Sanskrit poets encoded knight's tours, magic squares and palindromic surfaces into verse, a thousand years before Euler.",
      href: "/chitrakavya",
      art: "knight",
    },
  ];

  return (
    <>
      <section className="hero">
        <div className="flock">
          <Flock count={80} />
        </div>
        <div className="wrap">
          <div className="grid">
            <div>
              <div className="kicker">
                <b>emergence</b> a personal notebook
              </div>
              <h1 className="display">
                Learning every moment.
                <br />
                Trying to win over <span className="accent">my mind</span>.
              </h1>
              <div className="sub">
                <p>
                  I am {site.name}. I build at the intersection of machine learning and distributed
                  systems, and I write here about beauty, philosophy, science, technology and the human
                  experience. Yoga and the mind. AI and the society of agents. Side research that keeps
                  pulling me back.
                </p>
              </div>
              <div className="actions">
                <Link href="/writing" className="btn">Read the writing</Link>
                <Link href="/about" className="btn btn--ghost">About me</Link>
              </div>
            </div>
            <figure className="photo">
              <img src={site.photo} alt={site.name} />
              <figcaption>
                {site.name} · Founder, {site.company.name}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="kicker">
            <b>01 /</b> Writing
          </div>
          <div className="cards">
            {featured.map((p) => (
              <Link key={p.slug} href={p.href ?? `/writing/${p.slug}`} className="card">
                <div className="art">
                  <Art kind={p.art} />
                </div>
                <div className="meta">
                  <span className="cat">{p.category}</span>
                  <span>{fmt(p.date)}</span>
                </div>
                <div className="t">{p.title}</div>
                <p>{p.excerpt}</p>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 36 }}>
            <Link href="/writing" className="textlink arrow">All writing</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="kicker">
            <b>02 /</b> Threads
          </div>
          <div className="threads">
            <div>
              <h2 className="h2">Five things I keep coming back to.</h2>
              <p className="lead" style={{ marginTop: 20 }}>
                The questions that keep me awake: what patterns persist across scales, where order
                comes from, and whether we can design systems that are more than the sum of their
                parts. That includes the system doing the asking.
              </p>
            </div>
            <ul className="list">
              {threads.map((x, i) => (
                <li key={x.t}>
                  <span className="num">0{i + 1}</span>
                  <div>
                    <div className="t">{x.t}</div>
                    <p>{x.p}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="kicker">
            <b>03 /</b> Side research
          </div>
          <div className="two" style={{ alignItems: "center" }}>
            <div>
              <h2 className="h2">A poem, a diagram and an algorithm in one composition.</h2>
              <p className="lead" style={{ marginTop: 20 }}>
                Chitrakāvya is a Sanskrit tradition of visual verse. Around 1300 CE, Vedānta Deśika
                wrote a 32-syllable hymn that, read along a knight&apos;s tour of a half chessboard,
                becomes a second hymn. The archive lives here now, with the tour you can step through.
              </p>
              <p style={{ marginTop: 28 }}>
                <Link href="/chitrakavya" className="btn">Open the archive</Link>
              </p>
            </div>
            <Link href="/chitrakavya/knights-tour" className="card" aria-label="Knight's tour">
              <div className="art" style={{ aspectRatio: "16/10" }}>
                <Art kind="knight" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section closing">
        <div className="wrap">
          <h2 className="h2">The murmuration continues. The pattern grows more complex.</h2>
          <div className="actions" style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            <a href={site.social.x} className="btn" target="_blank" rel="noopener noreferrer">Follow on X</a>
            <a href={site.social.email} className="btn btn--ghost">Write to me</a>
          </div>
        </div>
      </section>
    </>
  );
}
