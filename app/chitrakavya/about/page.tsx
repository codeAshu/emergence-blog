import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About" };

export default function CkAbout() {
  return (
    <>
      <div style={{ padding: "56px 0 8px" }}>
        <div className="kicker"><b>About</b> the archive</div>
        <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>The argument, the lineage, a reading list.</h1>
      </div>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="kicker"><b>01 /</b> The argument</div>
        <div className="prose" style={{ margin: 0, padding: 0, fontSize: 17, maxWidth: "64ch" }}>
          <p>
            Chitrakāvya reads classical Sanskrit visual verse as a computational object, alongside its
            life as literature. A bandha is a poem built to be three things at once: a sound, a shape and
            a rule. The designer trades execution speed for descriptive density, and Sanskrit&apos;s stable
            word order and single-glyph akṣara make the trade possible.
          </p>
          <p>
            The corpus is a long empirical survey of how much meaning a 32-syllable verse can carry while
            also drawing a wheel and tracing a knight&apos;s tour. By the archive&apos;s reckoning this
            anticipates constraint satisfaction by about 1,200 years.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="kicker"><b>02 /</b> Lineage</div>
        <div className="cells cells--2">
          <div className="cell">
            <span className="num">LAB</span>
            <span className="t">IIITB-CSL</span>
            <p>The Computational Sciences Laboratory at IIIT-Bangalore, where the project began as a research initiative and whose team curated the original archive.</p>
          </div>
          <div className="cell">
            <span className="num">THE MODERN REFERENCE</span>
            <span className="t">Joshi and Sridharan, 2020</span>
            <p>Their paper in Resonance is the modern reference for the Rudraṭa knight&apos;s tour.</p>
          </div>
          <div className="cell">
            <span className="num">LONG-FORM</span>
            <span className="t">Sreenivasarao Vempati</span>
            <p>Blog essays that remain the most readable long-form English introduction to chitrabandha.</p>
          </div>
          <div className="cell">
            <span className="num">INFRASTRUCTURE</span>
            <span className="t">Vidyut and Ambuda</span>
            <p>Open-source Sanskrit tooling that makes the corpus digitally workable: sandhi, derivation, tagging.</p>
          </div>
        </div>
        <p className="muted small" style={{ marginTop: 18, maxWidth: "64ch" }}>
          Vedānta Deśika solved the knight&apos;s tour in poetry five centuries before Euler. The original
          archive suffered link rot, dark Flash media, paywalled PDFs and broken anchors; this is a
          link-checked rebuild, first published in April 2026 and moved to emergence.live in October 2026.
        </p>
      </section>

      <section className="section">
        <div className="kicker"><b>03 /</b> Reading list</div>
        <ul className="rows" style={{ fontSize: 15 }}>
          {[
            ["Visuals, the bandha gallery", "/chitrakavya/visuals", true],
            ["Pādukā, verses 929 and 930", "/chitrakavya/paduka", true],
            ["Knight's Tour, the interactive", "/chitrakavya/knights-tour", true],
            ["Resources, papers and primary corpus", "/chitrakavya/resources", true],
            ["Chitra-kāvya on Wikipedia", "https://en.wikipedia.org/wiki/Chitra-kavya", false],
            ["koushikr/Chitrakavya on GitHub", "https://github.com/koushikr/Chitrakavya", false],
            ["vrraghy.github.io, Chitrakaavyas", "https://vrraghy.github.io/chitrakaavya/", false],
          ].map(([t, u, internal]) => (
            <li key={String(u)} style={{ padding: "10px 0", borderBottom: "1px solid var(--hair-2)" }}>
              {internal ? <Link className="textlink" href={String(u)}>{t}</Link> : <a className="textlink" href={String(u)} target="_blank" rel="noopener noreferrer">{t}</a>}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
