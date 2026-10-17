import type { Metadata } from "next";
import { resources } from "@/lib/ck";

export const metadata: Metadata = { title: "Resources" };

function Rows({ rows, cols }: { rows: string[][]; cols: string[] }) {
  return (
    <table className="table">
      <thead><tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => {
              const isUrl = /^https?:\/\//.test(c);
              if (isUrl) return <td key={j}><a href={c} target="_blank" rel="noopener noreferrer">{new URL(c).hostname.replace("www.", "")}</a></td>;
              return <td key={j}>{c}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Resources() {
  return (
    <>
      <div style={{ padding: "56px 0 8px" }}>
        <div className="kicker"><b>Resources</b> link-checked</div>
        <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>Papers, books, repositories, primary texts.</h1>
        <p className="lead" style={{ marginTop: 18 }}>
          Every link here was checked when the archive was rebuilt. Where an original link had died, the
          replacement is recorded in the map at the end.
        </p>
      </div>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="kicker"><b>A /</b> Primary and semi-primary texts</div>
        <Rows cols={["Title", "Author, date", "Link", "Note"]} rows={resources.primary.map((r) => [r[0], r[1], r[2] || "", r[3]])} />
      </section>

      <section className="section">
        <div className="kicker"><b>B /</b> Peer-reviewed papers and project materials</div>
        <Rows cols={["Title", "Author, date", "Link", "Note"]} rows={resources.papers} />
      </section>

      <section className="section">
        <div className="kicker"><b>C /</b> Long-form essays and secondary sources</div>
        <Rows cols={["Title", "Author", "Link", "Note"]} rows={resources.essays} />
      </section>

      <section className="section">
        <div className="kicker"><b>D /</b> Reference articles</div>
        <Rows cols={["Title", "Link"]} rows={resources.wiki} />
      </section>

      <section className="section">
        <div className="kicker"><b>E /</b> Open-source code and data</div>
        <Rows cols={["Repository", "Link", "Note"]} rows={resources.code} />
        <p className="muted small" style={{ marginTop: 14 }}>Licenses are not stated here. Check each repository before reuse.</p>
      </section>

      <section className="section">
        <div className="kicker"><b>F /</b> Link replacement map</div>
        <Rows
          cols={["Original (dead)", "Replacement", "Note"]}
          rows={[
            ["iiitb.ac.in/csl/projects/Chitrakavya/downloads/01331065.pdf (IEEE link rot)", "Joshi and Sridharan, Resonance 2020, plus the IIITB Ganaka mirror", "Substitution"],
            ["CSL visuals.html videos and animations (Flash-era media)", "SVG figures under Visuals and the interactive under Knight's Tour", "Rebuilt, not archived"],
            ["learnsanskrit.html declension-table download", "ambuda-org/vidyut", "Modern, maintained replacement"],
          ]}
        />
      </section>
    </>
  );
}
