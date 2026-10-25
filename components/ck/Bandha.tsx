import { aksharas, type Bandha as B } from "@/lib/ck";

// Hairline SVG figures for the bandha gallery. Syllables are placed by position
// so the Devanagari clusters stay intact (no textPath splitting).

const W = 320, H = 240, CX = 160, CY = 120;
const ink = "var(--ink)", hair = "var(--hair)", faint = "var(--faint)", accent = "var(--accent)";
const T = { fontFamily: "var(--deva)", fontSize: 15, fill: ink, textAnchor: "middle" as const, dominantBaseline: "central" as const };

function pick(list: string[], n: number) {
  if (list.length === 0) return [] as string[];
  return Array.from({ length: n }, (_, i) => list[i % list.length]);
}

function Wheel({ spokes = 8, text }: { spokes?: number; text: string }) {
  const a = aksharas(text);
  const R = 92, r = 34;
  const rim = pick(a, spokes);
  const inner = pick(a.slice(spokes), spokes);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none">
      <circle cx={CX} cy={CY} r={R} stroke={hair} />
      <circle cx={CX} cy={CY} r={r} stroke={hair} />
      <circle cx={CX} cy={CY} r={3} fill={accent} />
      {Array.from({ length: spokes }).map((_, i) => {
        const t = (i / spokes) * Math.PI * 2 - Math.PI / 2;
        const x1 = CX + Math.cos(t) * r, y1 = CY + Math.sin(t) * r;
        const x2 = CX + Math.cos(t) * R, y2 = CY + Math.sin(t) * R;
        const xm = CX + Math.cos(t) * (R - 14), ym = CY + Math.sin(t) * (R - 14);
        const xi = CX + Math.cos(t) * (r + 16), yi = CY + Math.sin(t) * (r + 16);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={hair} />
            {rim[i] && <text x={xm} y={ym} {...T}>{rim[i]}</text>}
            {inner[i] && spokes <= 8 && <text x={xi} y={yi} {...T} fontSize={12} fill={faint}>{inner[i]}</text>}
          </g>
        );
      })}
    </svg>
  );
}

function Lotus({ petals = 8, text }: { petals?: number; text: string }) {
  const a = pick(aksharas(text), petals);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none">
      {Array.from({ length: petals }).map((_, i) => {
        const t = (i / petals) * 360;
        return <ellipse key={i} cx={CX} cy={CY - 58} rx={petals > 8 ? 12 : 18} ry={54} stroke={hair} transform={`rotate(${t} ${CX} ${CY})`} />;
      })}
      <circle cx={CX} cy={CY} r={22} stroke={hair} />
      {a.map((s, i) => {
        const t = (i / petals) * Math.PI * 2 - Math.PI / 2;
        return <text key={i} x={CX + Math.cos(t) * 86} y={CY + Math.sin(t) * 86} {...T}>{s}</text>;
      })}
      <circle cx={CX} cy={CY} r={3} fill={accent} />
    </svg>
  );
}

function Drum({ text }: { text: string }) {
  const a = aksharas(text);
  const rows = [pick(a, 7), pick(a.slice(7), 7)];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none">
      <path d="M60 70 C60 40 260 40 260 70 L250 170 C250 200 70 200 70 170 Z" stroke={hair} />
      <ellipse cx={160} cy={70} rx={100} ry={14} stroke={hair} />
      <ellipse cx={160} cy={170} rx={90} ry={14} stroke={hair} />
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={70 + i * 30} y1={84} x2={76 + i * 26} y2={156} stroke={hair} />
      ))}
      {rows[0].map((s, i) => <text key={"a" + i} x={70 + i * 30} y={100} {...T}>{s}</text>)}
      {rows[1].map((s, i) => <text key={"b" + i} x={76 + i * 26} y={140} {...T}>{s}</text>)}
    </svg>
  );
}

function Sword({ text }: { text: string }) {
  const a = aksharas(text);
  const n = Math.max(a.length, 1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none">
      <path d="M30 120 L230 104 L286 120 L230 136 Z" stroke={hair} />
      <path d="M46 120 L222 120" stroke={hair} strokeDasharray="2 4" />
      <rect x="18" y="96" width="14" height="48" stroke={hair} />
      <path d="M232 100 L232 140" stroke={ink} />
      <rect x="236" y="112" width="40" height="16" stroke={hair} />
      {a.map((s, i) => <text key={i} x={56 + (i / n) * 160} y={120} {...T} fontSize={14}>{s}</text>)}
    </svg>
  );
}

function Snake({ text }: { text: string }) {
  const a = aksharas(text);
  const n = Math.max(a.length, 1);
  const pts = Array.from({ length: 60 }, (_, i) => {
    const t = i / 59;
    return [30 + t * 240, CY + Math.sin(t * Math.PI * 2.5) * 48] as const;
  });
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none">
      <path d={d} stroke={hair} strokeWidth="18" strokeLinecap="round" opacity=".6" />
      <path d={d} stroke={hair} />
      <circle cx={270} cy={CY + Math.sin(Math.PI * 2.5) * 48} r={12} stroke={ink} />
      {a.map((s, i) => {
        const t = (i + 0.5) / n;
        return <text key={i} x={30 + t * 230} y={CY + Math.sin(t * Math.PI * 2.5 * (230 / 240)) * 48} {...T} fontSize={14}>{s}</text>;
      })}
    </svg>
  );
}

function Zigzag({ text }: { text: string }) {
  const a = aksharas(text);
  const half = Math.ceil(a.length / 2);
  const top = a.slice(0, half), bot = a.slice(half);
  const n = Math.max(half, 1);
  const x = (i: number) => 40 + (i / (n - 1 || 1)) * 240;
  const z = top.map((_, i) => `${i ? "L" : "M"}${x(i)} ${i % 2 ? 150 : 90}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none">
      <line x1="30" y1="90" x2="290" y2="90" stroke={hair} />
      <line x1="30" y1="150" x2="290" y2="150" stroke={hair} />
      <path d={z} stroke={accent} strokeWidth="1" />
      {top.map((s, i) => <text key={"t" + i} x={x(i)} y={90} {...T}>{s}</text>)}
      {bot.map((s, i) => <text key={"b" + i} x={x(i)} y={150} {...T}>{s}</text>)}
    </svg>
  );
}

function Grid() {
  const rows = [["दे", "वा", "का", "नि"], ["वा", "हि", "का", "स्व"], ["का", "का", "रे", "भ"], ["नि", "स्व", "भ", "व्य"]];
  const s = 44, ox = CX - 2 * s, oy = CY - 2 * s;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none">
      {rows.map((r, i) => r.map((c, j) => (
        <g key={i + "-" + j}>
          <rect x={ox + j * s} y={oy + i * s} width={s} height={s} stroke={hair} />
          <text x={ox + j * s + s / 2} y={oy + i * s + s / 2} {...T}>{c}</text>
        </g>
      )))}
      <path d={`M${ox - 14} ${oy + 2 * s} h8 M${ox + 4 * s + 6} ${oy + 2 * s} h8 M${ox + 2 * s} ${oy - 14} v8 M${ox + 2 * s} ${oy + 4 * s + 6} v8`} stroke={accent} />
    </svg>
  );
}

function Fish({ text }: { text: string }) {
  const a = aksharas(text);
  const n = Math.max(a.length, 1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none">
      <path d="M40 120 C90 60 190 60 240 120 C190 180 90 180 40 120 Z" stroke={hair} />
      <path d="M240 120 L290 86 L280 120 L290 154 Z" stroke={hair} />
      <path d="M86 120 C110 100 150 100 190 120" stroke={hair} strokeDasharray="2 4" />
      <circle cx="70" cy="110" r="4" stroke={ink} />
      {a.map((s, i) => <text key={i} x={70 + ((i + 0.5) / n) * 150} y={120} {...T} fontSize={14}>{s}</text>)}
    </svg>
  );
}

function Gateway({ text }: { text: string }) {
  const a = aksharas(text);
  const lintel = a.slice(0, 9);
  const rest = a.slice(9);
  const half = Math.ceil(rest.length / 2);
  const left = rest.slice(0, half).slice(0, 8), right = rest.slice(half).slice(0, 8);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none">
      <path d="M50 48 H270" stroke={hair} />
      <path d="M50 72 H270" stroke={hair} />
      <path d="M62 72 V210 M90 72 V210 M230 72 V210 M258 72 V210" stroke={hair} />
      {lintel.map((s, i) => <text key={"l" + i} x={64 + i * 24} y={60} {...T} fontSize={13}>{s}</text>)}
      {left.map((s, i) => <text key={"a" + i} x={76} y={88 + i * 16} {...T} fontSize={13}>{s}</text>)}
      {right.map((s, i) => <text key={"b" + i} x={244} y={88 + i * 16} {...T} fontSize={13}>{s}</text>)}
    </svg>
  );
}

function Umbrella({ text }: { text: string }) {
  const a = aksharas(text);
  const arc = a.slice(0, 9), staff = a.slice(9, 15);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none">
      <path d="M40 110 C60 40 260 40 280 110" stroke={hair} />
      <path d="M40 110 Q70 96 100 110 T160 110 T220 110 T280 110" stroke={hair} />
      <path d="M160 110 V210" stroke={hair} />
      <path d="M30 118 l8 -6 l-2 8" stroke={accent} />
      {arc.map((s, i) => {
        const t = i / 8;
        const x = 52 + t * 216;
        const y = 92 - Math.sin(t * Math.PI) * 40;
        return <text key={"a" + i} x={x} y={y} {...T} fontSize={14}>{s}</text>;
      })}
      {staff.map((s, i) => <text key={"s" + i} x={176} y={124 + i * 16} {...T} fontSize={13}>{s}</text>)}
    </svg>
  );
}

export default function Bandha({ b }: { b: B }) {
  switch (b.shape) {
    case "wheel": return <Wheel spokes={b.spokes} text={b.text} />;
    case "lotus": return <Lotus petals={b.spokes} text={b.text} />;
    case "drum": return <Drum text={b.text} />;
    case "sword": return <Sword text={b.text} />;
    case "snake": return <Snake text={b.text} />;
    case "zigzag": return <Zigzag text={b.text} />;
    case "grid": return <Grid />;
    case "fish": return <Fish text={b.text} />;
    case "gateway": return <Gateway text={b.text} />;
    case "umbrella": return <Umbrella text={b.text} />;
  }
}
