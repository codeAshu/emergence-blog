import type { Metadata } from "next";
import KnightsTour from "@/components/ck/KnightsTour";
import { tour } from "@/lib/ck";

export const metadata: Metadata = { title: "Knight's Tour" };

const refs = [
  ["Joshi and Sridharan, The Knight's Tour Problem and Rudraṭa's Verse, Resonance 2020", "https://link.springer.com/article/10.1007/s12045-020-1026-7"],
  ["IIITB, Knight's Tour in the Padukasahasra", "https://www.iiitb.ac.in/Ganaka/projects/paduka/paduka.html"],
  ["Knight's tour, Wikipedia", "https://en.wikipedia.org/wiki/Knight%27s_tour"],
  ["Pādukāsahasra, Wikipedia", "https://en.wikipedia.org/wiki/Paduka_Sahasra"],
  ["sgalal/knights-tour-visualization", "https://github.com/sgalal/knights-tour-visualization"],
  ["oliver-pham/knights-tour", "https://github.com/oliver-pham/knights-tour"],
  ["koushikr/Chitrakavya", "https://github.com/koushikr/Chitrakavya"],
];

export default function KnightsTourPage() {
  const grid = Array.from({ length: 4 }, (_, r) => Array.from({ length: 8 }, (_, c) => tour.indexOf(r * 8 + c) + 1));
  return (
    <>
      <div className="pagehead col">
        <h1 className="display">Thirty-two squares, one knight, two hymns.</h1>
        <p className="lead">
          Vedānta Deśika&apos;s 32-syllable śloka, square by square. Verse 929 sits on the board. Press
          Step and watch verse 930 assemble in the order the knight lands.
        </p>
      </div>

      <section className="block" style={{ paddingTop: 40, borderTop: 0 }}>
        <KnightsTour />
      </section>

      <section className="block">
        <div className="two" style={{ alignItems: "start" }}>
          <div>
            <h2 className="h3">The tour as a table</h2>
            <p className="muted" style={{ marginTop: 12, maxWidth: "48ch" }}>
              Move numbers in board order. The knight starts at the top-left corner and ends at the
              third square of the last row. It is an open tour: no closed knight&apos;s tour exists on a
              4×8 board. Starting from the corner, it is the unique knight&apos;s path whose cell sequence
              spells verse 930, which is how this reconstruction was verified.
            </p>
            <p className="muted small" style={{ marginTop: 14, maxWidth: "48ch" }}>
              Nasal marks shift with sandhi between the two readings (daṃ reads as da, raṅga as raṃ ga),
              which is normal in the tradition and does not affect the tour.
            </p>
          </div>
          <table className="table" style={{ maxWidth: 400, fontVariantNumeric: "tabular-nums" }}>
            <tbody>
              {grid.map((r, i) => (
                <tr key={i}>{r.map((n, j) => <td key={j} style={{ textAlign: "center", padding: "10px 6px" }}>{n}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="block">
        <div className="prose" style={{ padding: 0, border: 0, fontSize: 17 }}>
          <p>
            The form is a useful model for specification and encoding: one sequence of syllables carries
            several readings at once, each valid under its own rule. That is a dense, multi-constraint
            encoding written a thousand years before anyone had a word for it. Rudraṭa described the
            figure in the ninth century; Euler analysed the general tour in 1759.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="rule"><span className="label">References and open implementations</span></div>
        <ul className="refs">
          {refs.map(([t, u]) => (
            <li key={u}><a className="u" href={u} target="_blank" rel="noopener noreferrer">{t}</a></li>
          ))}
        </ul>
      </section>
    </>
  );
}
