// Abstract hairline illustrations for cards. Deterministic, no runtime deps.

const ink = "var(--ink)";
const faint = "var(--faint)";
const hair = "var(--hair)";
const accent = "var(--accent)";

function Clay() {
  // potter's wheel: concentric rings, one off-centre vessel profile
  const rings = [36, 60, 84, 108, 132];
  return (
    <svg viewBox="0 0 320 200" fill="none">
      {rings.map((r) => (
        <ellipse key={r} cx="160" cy="118" rx={r} ry={r * 0.36} stroke={hair} />
      ))}
      <path d="M126 118 C126 90 140 72 148 56 C150 44 170 44 172 56 C180 72 194 90 194 118" stroke={ink} strokeWidth="1.2" />
      <path d="M118 118 Q160 134 202 118" stroke={ink} strokeWidth="1.2" />
      <circle cx="160" cy="118" r="2.5" fill={accent} />
      <path d="M40 160 H280" stroke={hair} />
    </svg>
  );
}

function Flock() {
  // a murmuration of small chevrons following a soft curve
  const pts: { x: number; y: number; a: number; s: number }[] = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < 110; i++) {
    const t = i / 110;
    const x = 30 + t * 260 + (rnd() - 0.5) * 36;
    const y = 100 + Math.sin(t * Math.PI * 1.6) * 44 + (rnd() - 0.5) * 42;
    const a = Math.cos(t * Math.PI * 1.6) * 40 + (rnd() - 0.5) * 30;
    pts.push({ x, y, a, s: 3 + rnd() * 3 });
  }
  return (
    <svg viewBox="0 0 320 200" fill="none">
      {pts.map((p, i) => (
        <path
          key={i}
          d={`M-${p.s} ${p.s * 0.8} L${p.s} 0 L-${p.s} -${p.s * 0.8}`}
          transform={`translate(${p.x} ${p.y}) rotate(${p.a})`}
          stroke={i % 17 === 0 ? accent : ink}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

function Knight() {
  // 4x8 board with the Paduka knight's path
  const path = [0, 10, 4, 14, 31, 21, 27, 17, 2, 12, 6, 23, 29, 19, 25, 8, 18, 24, 9, 3, 20, 30, 15, 5, 22, 7, 13, 28, 11, 1, 16, 26];
  const cell = 30;
  const ox = 40, oy = 40;
  const c = (i: number) => [ox + (i % 8) * cell + cell / 2, oy + Math.floor(i / 8) * cell + cell / 2];
  const d = path.map((i, k) => (k === 0 ? "M" : "L") + c(i).join(" ")).join(" ");
  return (
    <svg viewBox="0 0 320 200" fill="none">
      {Array.from({ length: 32 }).map((_, i) => (
        <rect
          key={i}
          x={ox + (i % 8) * cell}
          y={oy + Math.floor(i / 8) * cell}
          width={cell}
          height={cell}
          stroke={hair}
          fill={(i + Math.floor(i / 8)) % 2 ? "#ebe9e2" : "none"}
        />
      ))}
      <path d={d} stroke={ink} strokeWidth="1.1" strokeLinejoin="round" />
      <circle cx={c(0)[0]} cy={c(0)[1]} r="3" fill={accent} />
      <circle cx={c(26)[0]} cy={c(26)[1]} r="3" fill={ink} />
    </svg>
  );
}

function Lines() {
  return (
    <svg viewBox="0 0 320 200" fill="none">
      {Array.from({ length: 14 }).map((_, i) => (
        <path key={i} d={`M${20 + i * 20} 180 L${80 + i * 20} 20`} stroke={i === 6 ? accent : faint} strokeWidth={i === 6 ? 1.4 : 1} />
      ))}
    </svg>
  );
}

export default function Art({ kind }: { kind?: string }) {
  switch (kind) {
    case "clay":
      return <Clay />;
    case "flock":
      return <Flock />;
    case "knight":
      return <Knight />;
    default:
      return <Lines />;
  }
}
