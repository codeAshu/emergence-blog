import type { Metadata } from "next";
import { ogFor } from "@/lib/og";
import { resources } from "@/lib/ck";

export const metadata: Metadata = { title: "Resources", ...ogFor("/chitrakavya/resources") };

function Rows({ rows, cols }: { rows: string[][]; cols: string[] }) {
  return (
    <table className="table table--stack">
      <thead><tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => {
              const isUrl = /^https?:\/\//.test(c);
              if (isUrl) return <td key={j} data-label={cols[j]}><a href={c} target="_blank" rel="noopener noreferrer">{new URL(c).hostname.replace("www.", "")}</a></td>;
              return <td key={j} data-label={cols[j]}>{c}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const sections: { label: string; cols: string[]; rows: string[][]; note?: string }[] = [
  { label: "Primary and semi-primary texts", cols: ["Title", "Author, date", "Link", "Note"], rows: resources.primary.map((r) => [r[0], r[1], r[2] || "", r[3]]) },
  { label: "Peer-reviewed papers and project materials", cols: ["Title", "Author, date", "Link", "Note"], rows: resources.papers },
  { label: "Long-form essays and secondary sources", cols: ["Title", "Author", "Link", "Note"], rows: resources.essays },
  { label: "Reference articles", cols: ["Title", "Link"], rows: resources.wiki },
  { label: "Open-source code and data", cols: ["Repository", "Link", "Note"], rows: resources.code, note: "Licenses are not stated here. Check each repository before reuse." },
  {
    label: "Link replacement map",
    cols: ["Original (dead)", "Replacement", "Note"],
    rows: [
      ["iiitb.ac.in/csl/projects/Chitrakavya/downloads/01331065.pdf (IEEE link rot)", "Joshi and Sridharan, Resonance 2020, plus the IIITB Ganaka mirror", "Substitution"],
      ["CSL visuals.html videos and animations (Flash-era media)", "SVG figures under Visuals and the interactive under Knight's Tour", "Rebuilt, not archived"],
      ["learnsanskrit.html declension-table download", "ambuda-org/vidyut", "Modern, maintained replacement"],
    ],
  },
];

export default function Resources() {
  return (
    <>
      <div className="pagehead col">
        <h1 className="display">Papers, books, repositories, primary texts.</h1>
        <p className="lead">
          Every link here was checked when the archive was rebuilt. Where an original link had died, the
          replacement is recorded in the map at the end.
        </p>
      </div>
      {sections.map((s, i) => (
        <section key={s.label} className="block" style={i === 0 ? { paddingTop: 40, borderTop: 0 } : undefined}>
          <div className="rule"><span className="label">{s.label}</span></div>
          <Rows cols={s.cols} rows={s.rows} />
          {s.note && <p className="muted small" style={{ marginTop: 14 }}>{s.note}</p>}
        </section>
      ))}
    </>
  );
}
