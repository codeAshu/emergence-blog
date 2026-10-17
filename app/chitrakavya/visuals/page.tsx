import type { Metadata } from "next";
import Bandha from "@/components/ck/Bandha";
import KnuthPoems from "@/components/ck/KnuthPoems";
import Sarvatobhadra from "@/components/ck/Sarvatobhadra";
import { bandhas, sarvatobhadra } from "@/lib/ck";

export const metadata: Metadata = { title: "Visuals" };

const refs = [
  ["Chitra-kāvya, Wikipedia", "https://en.wikipedia.org/wiki/Chitra-kavya"],
  ["Sreenivasa Rao on chitrabandha", "https://sreenivasaraos.com/2012/10/10/chitrakavya-chitrabandha/"],
  ["Wisdomlib, padmabandha", "https://www.wisdomlib.org/definition/padmabandha"],
  ["Wisdomlib, Jarasandhavadha Mahākāvyam (bandhas)", "https://www.wisdomlib.org/hinduism/book/jarasandhavadha-mahakavyam/d/doc419451.html"],
  ["Pollastri, Sound, image and meaning (PDF)", "https://www.academia.edu/8786970/Sound_image_and_meaning_Many_aspects_of_Sanskrit_figurative_poetry"],
  ["Śiśupālavadha, Wikipedia", "https://en.wikipedia.org/wiki/Shishupala_Vadha"],
  ["Tiro Devanagari Sanskrit, Google Fonts", "https://fonts.google.com/specimen/Tiro+Devanagari+Sanskrit"],
];

export default function Visuals() {
  const classical = bandhas.filter((b) => b.era === "classical");
  const nineteenth = bandhas.filter((b) => b.era === "nineteenth");
  return (
    <>
      <div className="pagehead col">
        <h1 className="display">Figures that carry a verse.</h1>
        <p className="lead">
          Each figure carries a reading rule. The figures rely on Devanāgarī, where one akṣara is one
          glyph, so they lose their property under transliteration.
        </p>
      </div>

      <section className="block" style={{ paddingTop: 40, borderTop: 0 }}>
        <div className="rule"><span className="label">Classical bandhas</span></div>
        <ul className="bandhas">
          {classical.map((b) => (
            <li key={b.key} className="bandha" id={b.key}>
              <Bandha b={b} />
              <div><span className="name">{b.name}</span><span className="skt">{b.skt}</span></div>
              <p>{b.desc}</p>
              <p className="how">{b.rule}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="block" id="sarvatobhadra">
        <div className="rule"><span className="label">Sarvatōbhadra</span></div>
        <div className="two" style={{ alignItems: "start" }}>
          <div>
            <h2 className="h3">The four-fold palindrome.</h2>
            <p className="muted" style={{ marginTop: 12, maxWidth: "48ch" }}>
              A 4×8 surface on the syllables sa, ka, ra, ta. Reading left to right, right to left, top
              to bottom or bottom to top repeats the same sequence.
            </p>
            <div style={{ marginTop: 20 }} data-mount="sarvatobhadra"><Sarvatobhadra /></div>
          </div>
          <div>
            <h2 className="h3">Kirātārjunīya 15.25, Bhāravi.</h2>
            <p className="muted" style={{ marginTop: 12, maxWidth: "48ch" }}>
              The full 8×8 square. Each row and each column is a palindrome, and the whole square reads
              the same from any side.
            </p>
            <div className="sb" aria-label="Sarvatobhadra grid" style={{ marginTop: 20 }}>
              {sarvatobhadra.rows.flatMap((r, i) => r.map((c, j) => <div key={i + "-" + j}>{c}</div>))}
            </div>
            <p className="verse" style={{ marginTop: 16, fontSize: 19 }}>{sarvatobhadra.verse}</p>
            <p className="verse-tr">{sarvatobhadra.iast}</p>
          </div>
        </div>
      </section>

      <section className="block" id="knuth">
        <div className="rule"><span className="label">Modern English chitrakāvya, Donald Knuth, 2005</span></div>
        <div className="prose" style={{ padding: 0, border: 0, fontSize: 17 }}>
          <p>
            In 2005, in correspondence with the IIITB-CSL group, Donald Knuth contributed two
            English-language chitrakāvyas: pairs of 32-word verses arranged on a 4×8 chessboard so that
            a knight&apos;s tour over the first verse produces the second. They are the only widely known
            modern analogues of Vedānta Deśika&apos;s Pādukāsahasra and the Harivijaya. Where the Sanskrit
            originals exploit the meaning-stable word order of Sanskrit, Knuth exploits the homophonic
            looseness of English: two and too, four and for, see and sea, terns and turns, passed and
            past are the same syllable when spoken aloud.
          </p>
          <p>
            Both poems are reproduced with audio recitations from the IIITB archive. Press Listen to
            recital and the knight jumps in time with the voice, one cell per spoken word; the
            word-onset timestamps were recovered from the recordings by onset detection. Step and
            Auto-play walk the tour silently.
          </p>
        </div>
        <div data-mount="knuth"><KnuthPoems /></div>
      </section>

      <section className="block">
        <div className="rule"><span className="label">Nineteenth-century bandhas</span></div>
        <ul className="bandhas">
          {nineteenth.map((b) => (
            <li key={b.key} className="bandha" id={b.key}>
              <Bandha b={b} />
              <div><span className="name">{b.name}</span><span className="skt">{b.skt}</span></div>
              <p>{b.desc}</p>
              <p className="how">{b.rule}</p>
            </li>
          ))}
        </ul>
        <p className="muted small" style={{ marginTop: 18, maxWidth: "64ch" }}>
          The figures are set in Tiro Devanagari Sanskrit. Misalignment usually indicates font fallback.
        </p>
      </section>

      <section className="block">
        <div className="rule"><span className="label">References</span></div>
        <ul className="refs">
          {refs.map(([t, u]) => (
            <li key={u}><a className="u" href={u} target="_blank" rel="noopener noreferrer">{t}</a></li>
          ))}
        </ul>
      </section>
    </>
  );
}
