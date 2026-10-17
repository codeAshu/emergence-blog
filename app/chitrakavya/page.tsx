import Link from "next/link";
import KnightsTour from "@/components/ck/KnightsTour";

export default function CkHome() {
  return (
    <>
      <section className="ck-hero">
        <div>
          <h1 className="display">Poems that are also diagrams and algorithms.</h1>
          <p className="lead" style={{ marginTop: 22 }}>
            Sanskrit poets encoded knight&apos;s tours, magic squares and palindromic surfaces into
            verse, about a thousand years before Euler. This archive reads those compositions as
            computational objects: one text that is a poem, a figure and a program at once.
          </p>
          <p className="muted small" style={{ marginTop: 22, maxWidth: "48ch" }}>
            Rebuilt from the project originally hosted by the Computational Sciences Laboratory at
            IIIT-Bangalore. Link-checked and Flash-free.
          </p>
        </div>
        <div>
          <KnightsTour compact />
          <p className="small muted" style={{ marginTop: 12 }}>
            Pādukāsahasra 30.40. Step through the tour that turns verse 929 into verse 930.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="two">
          <h2 className="h2">Computation is specifying a structure precisely enough that someone else can reproduce it.</h2>
          <div className="prose" style={{ padding: 0, border: 0, fontSize: 17 }}>
            <p>
              By that definition a chitrakāvya verse is a program. It survives only when read both as
              sound and as shape. The shapes include wheels, lotuses, drums, swords and chessboards. The
              readings trace petals, spokes, palindromic symmetry, or the L-shaped jumps of a knight.
            </p>
            <p>
              A bandha is built to be three things at once: a sound, a shape and a rule. The composer
              trades execution speed for descriptive density, and Sanskrit&apos;s stable word order and
              single-glyph akṣara make the trade possible.
            </p>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="rule"><span className="label">Three families</span></div>
        <ul className="lenses">
          <li>
            <div className="label">Aakāra-citra</div>
            <Link href="/chitrakavya/visuals" className="t u">Bandha, the shape-poem</Link>
            <p>Syllables plotted on a grid form a recognisable figure. The reading rule lives in the figure.</p>
          </li>
          <li>
            <div className="label">Gati-citra</div>
            <Link href="/chitrakavya/knights-tour" className="t u">Turagapadabandha, the path-poem</Link>
            <p>A verse, a Hamiltonian path and a riddle in one. The knight&apos;s tour over a 4×8 board.</p>
          </li>
          <li>
            <div className="label">Vinyāsa-citra</div>
            <Link href="/chitrakavya/visuals#sarvatobhadra" className="t u">Sarvatōbhadra, the arrangement-poem</Link>
            <p>&ldquo;Auspicious in every direction.&rdquo; Reads the same forward, backward, down and up.</p>
          </li>
        </ul>
      </section>

      <section className="block">
        <div className="rule"><span className="label">In the archive</span></div>
        <div className="doors">
          <Link href="/chitrakavya/visuals"><span className="t">Visuals</span><p>Thirteen bandhas, drawn as hairline figures.</p></Link>
          <Link href="/chitrakavya/paduka"><span className="t">Pādukā</span><p>Verses 929 and 930, a chess puzzle that is a hymn.</p></Link>
          <Link href="/chitrakavya/knights-tour"><span className="t">Knight&apos;s Tour</span><p>Square by square, with the second verse appearing.</p></Link>
          <Link href="/chitrakavya/resources"><span className="t">Resources</span><p>Papers, books, repositories and primary texts.</p></Link>
          <Link href="/chitrakavya/about"><span className="t">About</span><p>The argument, the lineage, a reading list.</p></Link>
        </div>
      </section>
    </>
  );
}
