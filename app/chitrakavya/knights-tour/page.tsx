import type { Metadata } from "next";
import KnightsTour from "@/components/ck/KnightsTour";
import { tour } from "@/lib/ck";

export const metadata: Metadata = { title: "Knight's Tour" };

export default function KnightsTourPage() {
  const grid = Array.from({ length: 4 }, (_, r) => Array.from({ length: 8 }, (_, c) => tour.indexOf(r * 8 + c) + 1));
  return (
    <>
      <div style={{ padding: "56px 0 8px" }}>
        <div className="kicker"><b>Knight&apos;s Tour</b> interactive</div>
        <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>Thirty-two squares, one knight, two hymns.</h1>
        <p className="lead" style={{ marginTop: 18 }}>
          Vedānta Deśika&apos;s 32-syllable śloka, square by square. Verse 929 sits on the board. Press
          Step and watch verse 930 assemble in the order the knight lands.
        </p>
      </div>

      <section className="section" style={{ paddingTop: 48 }}>
        <KnightsTour />
      </section>

      <section className="section">
        <div className="kicker"><b>01 /</b> The tour as a table</div>
        <div className="two" style={{ alignItems: "start" }}>
          <div>
            <p className="muted" style={{ maxWidth: "48ch" }}>
              Move numbers in board order. The knight starts at the top-left corner and ends at the
              third square of the last row. It is an open tour: no closed knight's tour exists on a
              4×8 board. Starting from the corner, it is the unique knight&apos;s path whose cell sequence
              spells verse 930, which is how this reconstruction was verified.
            </p>
            <p className="muted small" style={{ marginTop: 14, maxWidth: "48ch" }}>
              Nasal marks shift with sandhi between the two readings (daṃ reads as da, raṅga as raṃ ga),
              which is normal in the tradition and does not affect the tour.
            </p>
          </div>
          <table className="table" style={{ maxWidth: 420, fontFamily: "ui-monospace, Menlo, monospace" }}>
            <tbody>
              {grid.map((r, i) => (
                <tr key={i}>{r.map((n, j) => <td key={j} style={{ textAlign: "center", padding: "8px 6px" }}>{n}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="kicker"><b>02 /</b> Why it matters for computing</div>
        <div className="prose" style={{ margin: 0, padding: 0, fontSize: 17, maxWidth: "64ch" }}>
          <p>
            The form is a useful model for specification and encoding: one sequence of syllables carries
            several readings at once, each valid under its own rule. That is a dense, multi-constraint
            encoding written a thousand years before anyone had a word for it. Rudraṭa described the
            figure in the ninth century; Euler analysed the general tour in 1759.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="kicker"><b>References and open implementations</b></div>
        <ul className="rows" style={{ fontSize: 15 }}>
          {[
            ["Joshi and Sridharan, The Knight's Tour Problem and Rudraṭa's Verse, Resonance 2020", "https://link.springer.com/article/10.1007/s12045-020-1026-7"],
            ["IIITB, Knight's Tour in the Padukasahasra", "https://www.iiitb.ac.in/Ganaka/projects/paduka/paduka.html"],
            ["Knight's tour, Wikipedia", "https://en.wikipedia.org/wiki/Knight%27s_tour"],
            ["Pādukāsahasra, Wikipedia", "https://en.wikipedia.org/wiki/Paduka_Sahasra"],
            ["sgalal/knights-tour-visualization", "https://github.com/sgalal/knights-tour-visualization"],
            ["oliver-pham/knights-tour", "https://github.com/oliver-pham/knights-tour"],
            ["koushikr/Chitrakavya", "https://github.com/koushikr/Chitrakavya"],
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
