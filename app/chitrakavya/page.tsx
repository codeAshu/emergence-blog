import Link from "next/link";
import KnightsTour from "@/components/ck/KnightsTour";

export default function CkHome() {
  return (
    <>
      <section className="ck-hero">
        <div>
          <div className="kicker"><b>Chitrakāvya</b> picture-poems</div>
          <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>
            Poems that are also diagrams and algorithms.
          </h1>
          <p className="lead" style={{ marginTop: 20 }}>
            Sanskrit poets encoded knight&apos;s tours, magic squares and palindromic surfaces into
            verse, about a thousand years before Euler. This archive reads those compositions as
            computational objects: one text that is a poem, a figure and a program at once.
          </p>
          <p className="muted small" style={{ marginTop: 20, maxWidth: "48ch" }}>
            Rebuilt from the project originally hosted by the Computational Sciences Laboratory at
            IIIT-Bangalore. Link-checked, Flash-free, and now living at emergence.live.
          </p>
        </div>
        <div>
          <KnightsTour compact />
          <p className="small muted" style={{ marginTop: 12 }}>
            Pādukāsahasra 30.40. Step through the knight&apos;s tour that turns verse 929 into verse 930.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="kicker"><b>01 /</b> The thesis</div>
        <div className="two">
          <h2 className="h2">Computation is specifying a structure precisely enough that someone else can reproduce it.</h2>
          <div className="prose" style={{ margin: 0, padding: 0, fontSize: 17 }}>
            <p>
              By that definition a chitrakāvya verse is a program. It survives only when read both as
              sound and as shape. The shapes include wheels, lotuses, drums, swords and chessboards. The
              readings trace petals, spokes, palindromic symmetry, or the L-shaped jumps of a knight.
            </p>
            <p>
              A bandha is built to be three things at once: a sound, a shape and a rule. The composer
              trades execution speed for descriptive density, and Sanskrit&apos;s stable word order and
              single-glyph akṣara make the trade possible. The corpus is a long empirical survey of how
              much meaning a 32-syllable verse can carry while also drawing a wheel and tracing a
              knight&apos;s tour.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="kicker"><b>02 /</b> Three families of artefact</div>
        <div className="cells cells--3">
          <Link href="/chitrakavya/visuals" className="cell">
            <span className="num">AAKĀRA-CITRA</span>
            <span className="t">Bandha, the shape-poem</span>
            <p>Syllables plotted on a grid form a recognisable figure. The reading rule lives in the figure.</p>
          </Link>
          <Link href="/chitrakavya/knights-tour" className="cell">
            <span className="num">GATI-CITRA</span>
            <span className="t">Turagapadabandha, the path-poem</span>
            <p>A verse, a Hamiltonian path and a riddle in one. The knight&apos;s tour over a 4×8 board.</p>
          </Link>
          <Link href="/chitrakavya/visuals#sarvatobhadra" className="cell">
            <span className="num">VINYĀSA-CITRA</span>
            <span className="t">Sarvatōbhadra, the arrangement-poem</span>
            <p>&ldquo;Auspicious in every direction.&rdquo; Reads the same forward, backward, down and up.</p>
          </Link>
        </div>
        <p className="muted small" style={{ marginTop: 18, maxWidth: "60ch" }}>
          Each artefact is presented with the verse, a reconstructed visualisation, and the modern problem
          it encodes: Hamiltonian path, magic square, palindrome, lipogram or constrained composition.
        </p>
      </section>

      <section className="section">
        <div className="kicker"><b>03 /</b> Doors</div>
        <div className="doors">
          <Link href="/chitrakavya/visuals"><span className="t">Visuals</span><p>Thirteen bandhas, drawn as hairline figures.</p></Link>
          <Link href="/chitrakavya/paduka"><span className="t">Pādukā</span><p>Verses 929 and 930, a chess puzzle that is a hymn.</p></Link>
          <Link href="/chitrakavya/knights-tour"><span className="t">Knight&apos;s Tour</span><p>Square by square, with the second verse appearing.</p></Link>
          <Link href="/chitrakavya/resources"><span className="t">Resources</span><p>Papers, books, repositories and primary texts.</p></Link>
          <Link href="/chitrakavya/about"><span className="t">About</span><p>The argument, the lineage, a reading list.</p></Link>
        </div>
      </section>

      <section className="section">
        <div className="kicker"><b>04 /</b> The claim</div>
        <div className="two">
          <h2 className="h2">A computing history that includes computation as form.</h2>
          <div className="prose" style={{ margin: 0, padding: 0, fontSize: 17 }}>
            <p>
              The histories of computing we are taught begin with mechanism: gears, relays, valves. The
              chitrakāvya corpus points at an older strand, where the computational act is the
              specification itself, held in metre and shape so that a reader a thousand years later can
              execute it exactly. Where a primary source is contested, this archive says so and links the
              strongest secondary scholarship it can find.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
