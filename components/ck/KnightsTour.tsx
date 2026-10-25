"use client";

import { useEffect, useState } from "react";
import { verse929, verse930, tour, moveNumber } from "@/lib/ck";

export default function KnightsTour({ compact = false }: { compact?: boolean }) {
  const [k, setK] = useState(0); // number of syllables revealed (0..32)
  const [auto, setAuto] = useState(false);
  const [showNumbers, setShowNumbers] = useState(true);

  useEffect(() => {
    if (!auto) return;
    if (k >= 32) { setAuto(false); return; }
    const t = setTimeout(() => setK((x) => x + 1), 650);
    return () => clearTimeout(t);
  }, [auto, k]);

  const visited = new Set(tour.slice(0, k));
  const current = k > 0 ? tour[k - 1] : -1;

  // path line for the SVG overlay
  const cell = 100 / 8;
  const c = (i: number) => [((i % 8) + 0.5) * cell, (Math.floor(i / 8) + 0.5) * (cell)];
  const d = tour.slice(0, k).map((i, j) => (j ? "L" : "M") + c(i)[0] + " " + c(i)[1] * 2).join(" ");

  return (
    <div>
      <div style={{ position: "relative", maxWidth: 520 }}>
        <div className="board">
          {verse929.cells.map((s, i) => (
            <div
              key={i}
              className={
                "sq" + (((i % 8) + Math.floor(i / 8)) % 2 ? " dark" : "") + (visited.has(i) ? " visited" : "") + (i === current ? " current" : "")
              }
            >
              {showNumbers && <span className="n">{moveNumber[i]}</span>}
              {s}
            </div>
          ))}
        </div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          <path d={d} fill="none" stroke="var(--accent)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" style={{ strokeWidth: 1.2 }} />
        </svg>
      </div>

      <div className="ck-controls">
        <button className="btn btn--ghost" onClick={() => { setAuto(false); setK((x) => Math.min(32, x + 1)); }} disabled={k >= 32}>Step</button>
        <button className="btn btn--ghost" onClick={() => { setAuto(false); setK((x) => Math.max(0, x - 1)); }} disabled={k <= 0}>Back</button>
        <button className="btn" onClick={() => { if (k >= 32) setK(0); setAuto((a) => !a); }}>{auto ? "Pause" : "Auto-play"}</button>
        <button className="btn btn--ghost" onClick={() => { setAuto(false); setK(0); }}>Reset</button>
        <label className="small muted" style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: 8 }}>
          <input type="checkbox" checked={showNumbers} onChange={(e) => setShowNumbers(e.target.checked)} /> move numbers
        </label>
        <span className="small muted" style={{ marginLeft: "auto" }}>{k} / 32</span>
      </div>

      {!compact && (
        <div className="ck-readout" aria-live="polite">
          {verse930.syllables.map((s, i) => (
            <span key={i} className={i < k - 1 ? "lit" : i === k - 1 ? "cur" : ""}>
              {s}
              {i === 7 || i === 23 ? " " : ""}
              {i === 15 ? " । " : i === 31 ? " ॥" : ""}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
