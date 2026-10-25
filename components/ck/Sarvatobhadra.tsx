"use client";

// Ported from chitrakavya.worlddb.io/visuals.html: the 4×8 sarvatōbhadra demonstration with
// row and column highlighting. Same grid, same highlight rule (a column lights with its mirror).
import { useState } from "react";

const GRID = [
  ["स","क","र","त", "त","र","क","स"],
  ["क","र","त","स", "स","त","र","क"],
  ["र","त","स","क", "क","स","त","र"],
  ["त","स","क","र", "र","क","स","त"],
];

export default function Sarvatobhadra() {
  const [hot, setHot] = useState<{ kind: "row" | "col"; n: number } | null>(null);
  const isHot = (r: number, c: number) =>
    hot ? (hot.kind === "row" ? r === hot.n : c === hot.n || c === 7 - hot.n) : false;

  return (
    <div>
      <div className="sb sb--4" aria-label="Sarvatobhadra 4 by 8 grid">
        {GRID.flatMap((row, r) => row.map((ch, c) => <div key={r + "-" + c} className={isHot(r, c) ? "hot" : ""}>{ch}</div>))}
      </div>
      <div className="ck-controls">
        {[0, 1, 2, 3].map((n) => (
          <button key={"r" + n} className="btn btn--ghost" onClick={() => setHot({ kind: "row", n })}>Row {n + 1}</button>
        ))}
        {[0, 1, 2, 3].map((n) => (
          <button key={"c" + n} className="btn btn--ghost" onClick={() => setHot({ kind: "col", n })}>Col {n + 1}</button>
        ))}
        <button className="btn" onClick={() => setHot(null)}>Reset</button>
      </div>
      <p className="muted small" style={{ marginTop: 12, maxWidth: "56ch" }}>
        Each row is a palindrome, and each column mirrors the column across the centre. Pick a row or a
        column to see the symmetry.
      </p>
    </div>
  );
}
