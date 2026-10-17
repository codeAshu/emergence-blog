import type { Metadata } from "next";
import Bandha from "@/components/ck/Bandha";
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
        <div className="rule"><span className="label">Sarvatōbhadra, full square</span></div>
        <div className="two" style={{ alignItems: "center" }}>
          <div>
            <h2 className="h3">Kirātārjunīya 15.25, Bhāravi.</h2>
            <p className="muted" style={{ marginTop: 12, maxWidth: "48ch" }}>
              The 8×8 surface. Each row and each column is a palindrome, and the whole square reads the
              same from any side. The verse below is the top-to-bottom, left-to-right reading.
            </p>
            <p className="verse" style={{ marginTop: 20 }}>{sarvatobhadra.verse}</p>
            <p className="verse-tr">{sarvatobhadra.iast}</p>
          </div>
          <div className="sb" aria-label="Sarvatobhadra grid">
            {sarvatobhadra.rows.flatMap((r, i) => r.map((c, j) => <div key={i + "-" + j}>{c}</div>))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="rule"><span className="label">Modern English chitrakāvya, Donald Knuth, 2005</span></div>
        <div className="prose" style={{ padding: 0, border: 0, fontSize: 17 }}>
          <p>
            In correspondence with the IIITB-CSL group, Donald Knuth contributed two English poems built
            on the same principle: a pair of 32-word verses on a 4×8 board, where a knight&apos;s tour over
            one verse produces the other. They exploit English homophones (two/too, four/for, see/sea,
            terns/turns, passed/past), and they are the only widely known modern analogues of the
            Pādukāsahasra and Haravijaya.
          </p>
          <p>
            In the first, read in the manner of the Pādukāsahasra, verse one is read sequentially and
            verse two by knight&apos;s tour. In the second, in the manner of the Haravijaya, verse one
            emerges only by following the knight and verse two reads sequentially. The original Flash
            recitals from IIITB no longer play in modern browsers; the texts will be added here once
            cleared for reproduction.
          </p>
        </div>
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
