import type { Metadata } from "next";
import { ogFor } from "@/lib/og";
import Link from "next/link";

export const metadata: Metadata = { title: "About", ...ogFor("/chitrakavya/about") };

const lineage = [
  ["Lab", "IIITB-CSL", "The Computational Sciences Laboratory at IIIT-Bangalore, where the project began as a research initiative and whose team curated the original archive."],
  ["The modern reference", "Joshi and Sridharan, 2020", "Their paper in Resonance is the modern reference for the Rudraṭa knight's tour."],
  ["Long-form", "Sreenivasarao Vempati", "Blog essays that remain the most readable long-form English introduction to chitrabandha."],
  ["Infrastructure", "Vidyut and Ambuda", "Open-source Sanskrit tooling that makes the corpus digitally workable: sandhi, derivation, tagging."],
];

const reading: [string, string, boolean][] = [
  ["Visuals, the bandha gallery", "/chitrakavya/visuals", true],
  ["Pādukā, verses 929 and 930", "/chitrakavya/paduka", true],
  ["Knight's Tour, the interactive", "/chitrakavya/knights-tour", true],
  ["Resources, papers and primary corpus", "/chitrakavya/resources", true],
  ["Chitra-kāvya on Wikipedia", "https://en.wikipedia.org/wiki/Chitra-kavya", false],
  ["koushikr/Chitrakavya on GitHub", "https://github.com/koushikr/Chitrakavya", false],
  ["vrraghy.github.io, Chitrakaavyas", "https://vrraghy.github.io/chitrakaavya/", false],
];

export default function CkAbout() {
  return (
    <>
      <div className="pagehead col">
        <h1 className="display">The argument, the lineage, a reading list.</h1>
      </div>

      <section className="block" style={{ paddingTop: 40, borderTop: 0 }}>
        <div className="prose" style={{ padding: 0, border: 0, fontSize: 17 }}>
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

      <section className="block">
        <div className="rule"><span className="label">Lineage</span></div>
        <ul className="lenses" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {lineage.map(([k, t, p]) => (
            <li key={t}>
              <div className="label">{k}</div>
              <div className="t">{t}</div>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <p className="muted small" style={{ marginTop: 18, maxWidth: "64ch" }}>
          Vedānta Deśika solved the knight&apos;s tour in poetry five centuries before Euler. The original
          archive suffered link rot, dark Flash media, paywalled PDFs and broken anchors; this is a
          link-checked rebuild, first published in April 2026 and moved here in October 2026.
        </p>
      </section>

      <section className="block">
        <div className="rule"><span className="label">Reading list</span></div>
        <ul className="refs">
          {reading.map(([t, u, internal]) => (
            <li key={u}>
              {internal ? <Link className="u" href={u}>{t}</Link> : <a className="u" href={u} target="_blank" rel="noopener noreferrer">{t}</a>}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
