// Generative figures for the home page, one per subject. Deterministic, computed at build time,
// rendered as inline SVG. Ink greys on the cream surface, one orange accent, hairline strokes.

const W = 320, H = 320;
const ink = "var(--ink)";
const ink2 = "var(--ink-2)";
const muted = "var(--muted)";
const faint = "var(--faint)";
const hair = "var(--hair)";
const accent = "var(--accent)";

type Bucket = { fill: string; op: number; d: string[] };
function bucketed(): { add: (fill: string, op: number, d: string) => void; paths: () => React.JSX.Element[] } {
  const m = new Map<string, Bucket>();
  return {
    add(fill, op, d) {
      const q = Math.round(op * 8) / 8; // 8 opacity steps
      const k = fill + "|" + q;
      const b = m.get(k) ?? { fill, op: q, d: [] };
      b.d.push(d);
      m.set(k, b);
    },
    paths: () => Array.from(m.values()).map((b, i) => <path key={i} d={b.d.join("")} fill={b.fill} fillOpacity={b.op} />),
  };
}
const rectD = (x: number, y: number, w: number, h: number) => `M${x.toFixed(1)} ${y.toFixed(1)}h${w.toFixed(1)}v${h.toFixed(1)}h${(-w).toFixed(1)}z`;
const circD = (cx: number, cy: number, r: number) => `M${(cx - r).toFixed(1)} ${cy.toFixed(1)}a${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(2 * r).toFixed(2)} 0a${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(-2 * r).toFixed(2)} 0z`;

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* 1. Mandelbrot set as a cell grid. Inside: ink. The boundary, where escape is slow: orange. */
export function Mandelbrot() {
  const cols = 40, rows = 40, cell = W / cols, maxIt = 48;
  const cells: { x: number; y: number; it: number }[] = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const cx = -2.05 + (i + 0.5) / cols * 2.7;
      const cy = -1.35 + (j + 0.5) / rows * 2.7;
      let x = 0, y = 0, it = 0;
      while (x * x + y * y <= 4 && it < maxIt) {
        const xt = x * x - y * y + cx;
        y = 2 * x * y + cy;
        x = xt;
        it++;
      }
      cells.push({ x: i * cell, y: j * cell, it });
    }
  }
  const g = bucketed();
  cells.forEach((c) => {
    const inside = c.it >= maxIt;
    const edge = !inside && c.it >= 7;
    const fill = inside ? ink : edge ? accent : faint;
    const op = inside ? 0.9 : edge ? Math.min(1, 0.25 + (c.it - 7) / 18) : 0.08 + Math.min(0.22, c.it * 0.04);
    g.add(fill, op, rectD(c.x + 1, c.y + 1, cell - 2, cell - 2));
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="The Mandelbrot set drawn as a grid of cells">
      {g.paths()}
    </svg>
  );
}

/* 2. A loss landscape with gradient descent. Level sets by marching squares; the path in orange. */
export function Descent() {
  const N = 64;
  const f = (x: number, y: number) => {
    // x, y in [0,1]; a shallow bowl with two wells
    const b = 1.6 * ((x - 0.55) ** 2 + (y - 0.5) ** 2);
    const w1 = -0.55 * Math.exp(-(((x - 0.68) ** 2 + (y - 0.62) ** 2) / 0.02));
    const w2 = -0.3 * Math.exp(-(((x - 0.3) ** 2 + (y - 0.3) ** 2) / 0.03));
    const r = 0.08 * Math.sin(9 * x) * Math.cos(7 * y);
    return b + w1 + w2 + r;
  };
  const grid: number[][] = [];
  let lo = Infinity, hi = -Infinity;
  for (let j = 0; j <= N; j++) {
    grid[j] = [];
    for (let i = 0; i <= N; i++) {
      const v = f(i / N, j / N);
      grid[j][i] = v;
      if (v < lo) lo = v;
      if (v > hi) hi = v;
    }
  }
  const levels = 11;
  const segs: string[] = [];
  const P = (i: number, j: number) => [i / N * W, j / N * H];
  for (let l = 1; l < levels; l++) {
    const t = lo + (hi - lo) * (l / levels);
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const a = grid[j][i], b = grid[j][i + 1], c = grid[j + 1][i + 1], d = grid[j + 1][i];
        const idx = (a > t ? 8 : 0) | (b > t ? 4 : 0) | (c > t ? 2 : 0) | (d > t ? 1 : 0);
        if (idx === 0 || idx === 15) continue;
        const lerp = (p: number[], q: number[], v1: number, v2: number) => {
          const k = (t - v1) / (v2 - v1 || 1e-9);
          return [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k];
        };
        const top = lerp(P(i, j), P(i + 1, j), a, b);
        const right = lerp(P(i + 1, j), P(i + 1, j + 1), b, c);
        const bottom = lerp(P(i, j + 1), P(i + 1, j + 1), d, c);
        const left = lerp(P(i, j), P(i, j + 1), a, d);
        const table: Record<number, number[][][]> = {
          1: [[left, bottom]], 2: [[bottom, right]], 3: [[left, right]], 4: [[top, right]],
          5: [[left, top], [bottom, right]], 6: [[top, bottom]], 7: [[left, top]], 8: [[left, top]],
          9: [[top, bottom]], 10: [[left, bottom], [top, right]], 11: [[top, right]], 12: [[left, right]],
          13: [[bottom, right]], 14: [[left, bottom]],
        };
        for (const [p, q] of table[idx]) segs.push(`M${p[0].toFixed(1)} ${p[1].toFixed(1)}L${q[0].toFixed(1)} ${q[1].toFixed(1)}`);
      }
    }
  }
  // gradient descent from the top-left
  const path: number[][] = [];
  let x = 0.1, y = 0.9;
  const h = 1e-3, lr = 0.03;
  for (let s = 0; s < 110; s++) {
    path.push([x * W, y * H]);
    const gx = (f(x + h, y) - f(x - h, y)) / (2 * h);
    const gy = (f(x, y + h) - f(x, y - h)) / (2 * h);
    x -= lr * gx; y -= lr * gy;
    x = Math.max(0.02, Math.min(0.98, x)); y = Math.max(0.02, Math.min(0.98, y));
  }
  const d = path.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join("");
  const end = path[path.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Contour lines of a loss landscape with a gradient descent path">
      <path d={segs.join("")} fill="none" stroke={ink2} strokeOpacity="0.7" strokeWidth="0.9" />
      <path d={d} fill="none" stroke={accent} strokeWidth="1.6" strokeLinejoin="round" />
      {path.filter((_, i) => i % 8 === 0).map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2" fill={accent} />)}
      <circle cx={end[0]} cy={end[1]} r="4.5" fill={accent} />
      <circle cx={end[0]} cy={end[1]} r="9" fill="none" stroke={accent} strokeWidth="1" />
    </svg>
  );
}

/* 3. Phyllotaxis. Seeds at the golden angle; one parastichy picked out in orange. */
export function Phyllotaxis() {
  const n = 420, ga = Math.PI * (3 - Math.sqrt(5));
  const pts = Array.from({ length: n }, (_, i) => {
    const r = 7.6 * Math.sqrt(i), t = i * ga;
    return { x: W / 2 + r * Math.cos(t), y: H / 2 + r * Math.sin(t), i, s: 1.2 + 2.4 * Math.sqrt(i / n) };
  });
  const g = bucketed();
  pts.forEach((p) => {
    const arm = p.i % 34 === 13;
    g.add(arm ? accent : ink, arm ? 1 : 0.22 + 0.5 * (p.i / n), circD(p.x, p.y, p.s));
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="A phyllotaxis spiral of seeds with one spiral arm highlighted">
      {g.paths()}
    </svg>
  );
}

/* 4. A society of agents. Three clusters, local edges, one leader per cluster, a few trade routes. */
export function Society() {
  const r = rng(11);
  const centers = [[88, 96], [236, 118], [150, 236]];
  const pts: { x: number; y: number; c: number }[] = [];
  centers.forEach(([cx, cy], c) => {
    for (let k = 0; k < 26; k++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 54;
      pts.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d * 0.85, c });
    }
  });
  const edges: string[] = [];
  const cross: string[] = [];
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
    if (pts[i].c === pts[j].c && d < 34) edges.push(`M${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}L${pts[j].x.toFixed(1)} ${pts[j].y.toFixed(1)}`);
    else if (pts[i].c !== pts[j].c && d < 62 && r() < 0.35) cross.push(`M${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}L${pts[j].x.toFixed(1)} ${pts[j].y.toFixed(1)}`);
  }
  const leaders = [3, 26 + 7, 52 + 12];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Three clusters of agents with a leader in each and routes between them">
      <path d={edges.join("")} stroke={ink} strokeOpacity="0.28" strokeWidth="0.7" fill="none" />
      <path d={cross.join("")} stroke={accent} strokeOpacity="0.35" strokeWidth="0.7" fill="none" strokeDasharray="2 3" />
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={leaders.includes(i) ? 4 : 2.1} fill={leaders.includes(i) ? accent : ink} fillOpacity={leaders.includes(i) ? 1 : 0.8} />)}
      {leaders.map((i) => <circle key={"l" + i} cx={pts[i].x} cy={pts[i].y} r="9" fill="none" stroke={accent} strokeWidth="1" />)}
    </svg>
  );
}

/* 5. Stillness. Traces of a restless mind damping to a line; the settled end in orange. */
export function Stillness() {
  const traces = 9;
  const paths = Array.from({ length: traces }, (_, k) => {
    const y0 = 52 + k * (H - 104) / (traces - 1);
    const f = 0.045 + k * 0.012, ph = k * 1.3;
    let d = "";
    for (let x = 0; x <= W; x += 3) {
      const t = x / W;
      const amp = (26 - k * 1.2) * Math.exp(-3.6 * t);
      const y = y0 + amp * Math.sin(x * f + ph);
      d += (x ? "L" : "M") + x + " " + y.toFixed(1);
    }
    return { d, y0 };
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Wavy traces that settle into straight lines">
      {paths.map((p, k) => (
        <g key={k}>
          <path d={p.d} fill="none" stroke={ink} strokeOpacity="0.55" strokeWidth="0.9" />
          <circle cx={W - 6} cy={p.y0} r="2.4" fill={accent} />
        </g>
      ))}
    </svg>
  );
}

/* 6. The Pādukāsahasra knight's tour on a 4×8 board, as a path. */
export function Tour() {
  const path = [0, 10, 4, 14, 31, 21, 27, 17, 2, 12, 6, 23, 29, 19, 25, 8, 18, 24, 9, 3, 20, 30, 15, 5, 22, 7, 13, 28, 11, 1, 16, 26];
  const cell = 36, ox = (W - 8 * cell) / 2, oy = (H - 4 * cell) / 2;
  const c = (i: number) => [ox + (i % 8) * cell + cell / 2, oy + Math.floor(i / 8) * cell + cell / 2];
  const d = path.map((i, k) => (k ? "L" : "M") + c(i).join(" ")).join("");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="A knight's tour across a four by eight board">
      {Array.from({ length: 32 }).map((_, i) => (
        <rect key={i} x={ox + (i % 8) * cell} y={oy + Math.floor(i / 8) * cell} width={cell} height={cell} stroke={hair} fill={(i + Math.floor(i / 8)) % 2 ? "var(--tint)" : "none"} />
      ))}
      <path d={d} fill="none" stroke={ink} strokeWidth="1.1" strokeLinejoin="round" />
      <circle cx={c(0)[0]} cy={c(0)[1]} r="4" fill={accent} />
      <circle cx={c(26)[0]} cy={c(26)[1]} r="3" fill={ink} />
    </svg>
  );
}

/* 7. Interference. Two point sources, the intensity sampled on a grid: science as measured pattern. */
export function Interference() {
  const n = 36, cell = W / n;
  const s1 = [W * 0.38, H * 0.5], s2 = [W * 0.62, H * 0.5], k = 0.62;
  const dots: { x: number; y: number; a: number }[] = [];
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const x = (i + 0.5) * cell, y = (j + 0.5) * cell;
    const d1 = Math.hypot(x - s1[0], y - s1[1]), d2 = Math.hypot(x - s2[0], y - s2[1]);
    const amp = Math.cos(k * d1) + Math.cos(k * d2);
    dots.push({ x, y, a: amp / 2 });
  }
  const g = bucketed();
  dots.forEach((d) => {
    const v = Math.abs(d.a);
    if (v < 0.22) return;
    const sz = Math.round((1.4 + v * 5.6) * 2) / 2;
    g.add(ink, 0.12 + v * 0.7, rectD(d.x - sz / 2, d.y - sz / 2, sz, sz));
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Interference pattern from two point sources">
      {g.paths()}
      <circle cx={s1[0]} cy={s1[1]} r="3.5" fill={accent} />
      <circle cx={s2[0]} cy={s2[1]} r="3.5" fill={accent} />
    </svg>
  );
}

/* 8. A walk. One path of many small steps; where it is now in orange. */
export function Walk() {
  const r = rng(29);
  let x = W * 0.3, y = H * 0.62, a = -0.6;
  const pts: number[][] = [[x, y]];
  for (let i = 0; i < 520; i++) {
    a += (r() - 0.5) * 0.9;
    x += Math.cos(a) * 3.2; y += Math.sin(a) * 3.2;
    if (x < 24 || x > W - 24) a = Math.PI - a; if (y < 24 || y > H - 24) a = -a;
    x = Math.max(24, Math.min(W - 24, x)); y = Math.max(24, Math.min(H - 24, y));
    pts.push([x, y]);
  }
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join("");
  const end = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="A long wandering path with its current position marked">
      <path d={d} fill="none" stroke={ink} strokeOpacity="0.6" strokeWidth="0.9" strokeLinejoin="round" />
      {pts.filter((_, i) => i % 40 === 0).map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="1.8" fill={ink} fillOpacity="0.5" />)}
      <circle cx={pts[0][0]} cy={pts[0][1]} r="3" fill="none" stroke={ink} strokeWidth="1" />
      <circle cx={end[0]} cy={end[1]} r="4.5" fill={accent} />
    </svg>
  );
}

/* 9. A tree. Division into kinds, down to the particular; one line of argument followed in orange. */
export function Tree() {
  const depth = 5;
  const nodes: { x: number; y: number; d: number; id: number }[] = [];
  const edges: { a: number; b: number; hot: boolean }[] = [];
  const hotPath = [0, 2, 5, 12, 25]; // ids along one branch, root to leaf
  let id = 0;
  const place = (d: number, i: number, count: number) => {
    const y = 36 + d * ((H - 72) / (depth - 1));
    const x = (W / (count + 1)) * (i + 1);
    nodes.push({ x, y, d, id: id++ });
  };
  for (let d = 0; d < depth; d++) for (let i = 0; i < 2 ** d; i++) place(d, i, 2 ** d);
  nodes.forEach((n) => {
    if (n.d === depth - 1) return;
    const c1 = 2 * n.id + 1, c2 = 2 * n.id + 2;
    edges.push({ a: n.id, b: c1, hot: hotPath.includes(n.id) && hotPath.includes(c1) });
    edges.push({ a: n.id, b: c2, hot: hotPath.includes(n.id) && hotPath.includes(c2) });
  });
  const P = (i: number) => nodes[i];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="A branching tree of divisions with one path followed to a leaf">
      {edges.map((e, i) => (
        <path key={i} d={`M${P(e.a).x} ${P(e.a).y}C${P(e.a).x} ${(P(e.a).y + P(e.b).y) / 2} ${P(e.b).x} ${(P(e.a).y + P(e.b).y) / 2} ${P(e.b).x} ${P(e.b).y}`} fill="none" stroke={e.hot ? accent : ink} strokeOpacity={e.hot ? 1 : 0.45} strokeWidth={e.hot ? 1.4 : 0.8} />
      ))}
      {nodes.map((n) => (
        <circle key={n.id} cx={n.x} cy={n.y} r={hotPath.includes(n.id) ? 3.6 : 2.2} fill={hotPath.includes(n.id) ? accent : ink} fillOpacity={hotPath.includes(n.id) ? 1 : 0.7} />
      ))}
    </svg>
  );
}

export const figureByKey: Record<string, () => React.JSX.Element> = {
  mandelbrot: Mandelbrot, descent: Descent, phyllotaxis: Phyllotaxis, society: Society,
  stillness: Stillness, tour: Tour, interference: Interference, walk: Walk, tree: Tree,
};

void muted;
