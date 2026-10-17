import type { Metadata } from "next";
import Link from "next/link";
import { verse929, verse930, moveNumber } from "@/lib/ck";

export const metadata: Metadata = { title: "Pādukā" };

const lineage = [
  ["Rudraṭa, Kāvyālaṅkāra 5.15", "c. 850 CE", "4 × 8", "32 + 32", "Poetic ornament"],
  ["Ratnākara, Haravijaya ch. 6", "c. 850 CE", "4 × 8", "32 + 32", "Hymn to Śiva"],
  ["Vedānta Deśika, Pādukāsahasra 30.40–41", "c. 1300 CE", "4 × 8", "32 + 32", "Praise of Raṅganātha's sandals"],
  ["Euler, Solution d'une question curieuse", "1759 CE", "8 × 8", "", "First Western analysis"],
];

export default function Paduka() {
  return (
    <>
      <div style={{ padding: "56px 0 8px" }}>
        <div className="kicker"><b>Pādukā</b> verses 929 and 930</div>
        <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>A chess puzzle that is also a hymn.</h1>
        <p className="lead" style={{ marginTop: 18 }}>
          Around 1300 CE, Veṅkaṭanātha, remembered as Vedānta Deśika, composed the Pādukāsahasram:
          1,008 verses in praise of the sandals of Raṅganātha at Śrīraṅgam. Tradition says it was
          composed overnight. Chapter 30, the Citra Paddhati, holds these two 32-syllable anuṣṭubh verses.
        </p>
      </div>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="two">
          <div>
            <div className="kicker"><b>929</b> the sequential reading</div>
            <p className="verse">{verse929.deva[0]}<br />{verse929.deva[1]}</p>
            <p className="verse-tr" style={{ marginTop: 10 }}>{verse929.iast}</p>
            <p className="muted" style={{ marginTop: 16, fontSize: 15 }}>
              A prayer to the sandals: lead me, ever worthy of worship, whose feet are unshaken, to the
              feet of the king of Raṅga.
            </p>
          </div>
          <div>
            <div className="kicker"><b>930</b> the knight&apos;s-tour reading</div>
            <p className="verse">{verse930.deva[0]}<br />{verse930.deva[1]}</p>
            <p className="verse-tr" style={{ marginTop: 10 }}>{verse930.iast}</p>
            <p className="muted" style={{ marginTop: 16, fontSize: 15 }}>
              The same 32 syllables, read in the order a chess knight visits the squares of a half-board.
              Both verses are metrical, grammatical and devotionally meaningful.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="kicker"><b>01 /</b> The board</div>
        <div className="two" style={{ alignItems: "center" }}>
          <div>
            <h2 className="h3">Chaturaṅga-turaṅga-pāda-bandha</h2>
            <p className="muted" style={{ marginTop: 12, maxWidth: "48ch" }}>
              &ldquo;Binding by the foot-step of a chess-knight.&rdquo; Verse 929 is laid on a 4×8
              half-chessboard in row-major order, one syllable per square, matching anuṣṭubh&apos;s
              four pādas of eight. The small number in each cell is that syllable&apos;s position in verse
              930&apos;s tour.
            </p>
            <p style={{ marginTop: 22 }}>
              <Link href="/chitrakavya/knights-tour" className="btn">Step through the tour</Link>
            </p>
          </div>
          <div className="board">
            {verse929.cells.map((s, i) => (
              <div key={i} className={"sq" + (((i % 8) + Math.floor(i / 8)) % 2 ? " dark" : "")}>
                <span className="n">{moveNumber[i]}</span>{s}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="kicker"><b>02 /</b> Three lenses</div>
        <div className="cells cells--3">
          <div className="cell">
            <span className="num">GRAPH THEORY</span>
            <span className="t">A Hamiltonian path</span>
            <p>The 32 squares form a graph in which knight moves are edges. The tour visits every vertex once. The Sanskrit fixes which of the many possible paths is used.</p>
          </div>
          <div className="cell">
            <span className="num">POETICS</span>
            <span className="t">Two readings, one set of syllables</span>
            <p>Each verse has four pādas of eight syllables. The first is read normally; the second is the same syllables reordered by the path, and it still scans.</p>
          </div>
          <div className="cell">
            <span className="num">DEVOTION</span>
            <span className="t">Constraint and grace</span>
            <p>The chess-puzzle form matches the theme of the verses, which treat the world as a play of constraint and grace.</p>
          </div>
        </div>
        <p className="muted small" style={{ marginTop: 18, maxWidth: "64ch" }}>
          The achievement is a joint constraint: the permutation must be a Hamiltonian path on the knight
          graph, the reordered syllables must scan as anuṣṭubh, and the result must be grammatical and
          devotional. One sequence of syllables carries several readings at once, an early case of dense
          multi-constraint encoding.
        </p>
      </section>

      <section className="section">
        <div className="kicker"><b>03 /</b> Lineage</div>
        <table className="table">
          <thead><tr><th>Author, work</th><th>Date</th><th>Board</th><th>Syllables</th><th>Subject</th></tr></thead>
          <tbody>
            {lineage.map((r) => (
              <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
        <p className="muted small" style={{ marginTop: 16, maxWidth: "64ch" }}>
          Rudraṭa and Ratnākara are the earlier Kashmiri instances; Deśika is the synthesis. The overnight
          composition is tradition rather than established fact.
        </p>
      </section>

      <section className="section">
        <div className="kicker"><b>References</b></div>
        <ul className="rows" style={{ fontSize: 15 }}>
          {[
            ["Pādukāsahasra, Wikipedia", "https://en.wikipedia.org/wiki/Paduka_Sahasra"],
            ["prapatti.com, full Sanskrit text with commentary", "https://www.prapatti.com/categories/paadukaasahasram.php"],
            ["Internet Archive, public-domain edition", "https://archive.org/details/in.ernet.dli.2015.495568"],
            ["Haravijaya, Wikipedia", "https://en.wikipedia.org/wiki/Haravijaya"],
            ["Rudraṭa, Wikipedia", "https://en.wikipedia.org/wiki/Rudrata"],
            ["Joshi and Sridharan, The Knight's Tour Problem and Rudraṭa's Verse, Resonance 2020", "https://link.springer.com/article/10.1007/s12045-020-1026-7"],
            ["IIITB, Knight's Tour in the Pādukāsahasra", "https://www.iiitb.ac.in/Ganaka/projects/paduka/paduka.html"],
            ["The Dexterous Deśika (PDF)", "https://sridharshanam.org/wp-content/uploads/2019/01/Dextreous-Desika_1.pdf"],
            ["Pollastri, Sound, Image and Meaning (PDF)", "https://academia.edu/8786970/Sound_image_and_meaning._Many_aspects_of_Sanskrit_figurative_poetry"],
          ].map(([t, u]) => (
            <li key={u} style={{ padding: "10px 0", borderBottom: "1px solid var(--hair-2)" }}>
              <a className="textlink" href={u} target="_blank" rel="noopener noreferrer">{t}</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
