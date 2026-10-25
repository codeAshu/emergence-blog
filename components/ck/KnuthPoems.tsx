"use client";

// Ported as-is from chitrakavya.worlddb.io/visuals.html (the "Modern English Chitrakāvya"
// walk-through). Same tour, same word lists, same word-onset timestamps and audio-sync logic.
import { useEffect, useRef, useState } from "react";

const ROWS = 4, COLS = 8, N = 32;

// Verified 4×8 Hamiltonian knight's tour starting at (0,0).
const TOUR: [number, number][] = [
  [0,0],[2,1],[0,2],[1,0],[3,1],[1,2],[3,3],[1,4],
  [0,6],[2,7],[3,5],[1,6],[3,7],[2,5],[0,4],[2,3],
  [1,1],[3,0],[2,2],[0,1],[2,0],[3,2],[1,3],[3,4],
  [2,6],[0,7],[1,5],[0,3],[2,4],[0,5],[1,7],[3,6],
];

// Word-onset timestamps from Knuth's recital, derived from RMS-envelope onset detection
// on the original IIITB MP3s. 32 onsets per file, one per word.
const ONSETS: Record<string, number[]> = {
  "poem1.mp3": [0.80,1.40,2.28,3.00,3.92,4.84,6.16,7.16, 8.96,9.76,10.52,12.40,13.20,13.84,14.60,16.56, 17.16,17.76,18.52,19.16,20.44,21.40,22.52,23.24, 24.36,25.44,26.72,27.40,29.04,29.96,30.92,31.80],
  "poem2.mp3": [0.60,1.88,2.48,3.80,5.32,6.36,7.76,8.52, 9.12,9.80,10.44,11.88,12.40,13.20,13.72,16.40, 17.04,17.56,18.08,18.80,19.48,20.84,21.48,22.12, 23.08,24.48,25.44,26.00,26.72,28.12,28.64,29.32],
};

const P1_SEQ = ["One","two","three","four","See","each","word","here","Jumps","so","wise","now","find","their","place","passed","Terns","can't","soar","like","flies","the","free","rook","Goose","steps","just","won't","mean","knight","hops","last"];
const P1_KNIGHT = ["One","knight","jumps","like","three","rook","wise","steps","Past","sore","too","mean","so","just","for","free","Hops","here","turns","there","flies","each","goose","now","Can't","place","last","word?","Won't","find","the","sea"];
const P2_KNIGHT = ["Have","some","fun","Watch","this","or","that","word","great","four","lines","take","out","each","gives","eight","Left","than","two","black","and","just","here","white","three","rook","steps","make","one","knight","move","right"];
const P2_SEQ = ["One","two","three","four","watch","each","word","here","or","take","some","left","steps","and","move","eight","just","right","gives","this","black","rook","great","fun","than","have","lines","make","out","that","white","knight"];

type PoemProps = {
  kicker: string;
  title: string;
  seq: string[];
  knight: string[];
  audio: string;
  verse1: string[];
  verse2: string[];
  note: string;
  knightFirst?: boolean;
};

function Grid({ words, cls }: { words: string[]; cls: (i: number) => string }) {
  return (
    <div className="knuth-grid" role="img">
      {words.map((w, i) => {
        const r = Math.floor(i / COLS), c = i % COLS;
        return (
          <div key={i} className={((r + c) % 2 ? "dark " : "") + cls(i)}>
            <span className="num">{i + 1}</span>
            <span>{w}</span>
          </div>
        );
      })}
    </div>
  );
}

function Poem({ kicker, title, seq, knight, audio, verse1, verse2, note, knightFirst }: PoemProps) {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(false);
  const [listening, setListening] = useState(false);
  const audRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef(0);
  const onsets = ONSETS[audio] ?? [];

  // Auto-play: 380 ms per move, as in the original
  useEffect(() => {
    if (!auto) return;
    if (step >= N) { setAuto(false); return; }
    const t = setTimeout(() => setStep((s) => Math.min(N, s + 1)), 380);
    return () => clearTimeout(t);
  }, [auto, step]);

  // Audio-synced knight: advance to the largest k with onsets[k-1] <= currentTime
  useEffect(() => {
    if (!listening) return;
    const aud = audRef.current;
    if (!aud) return;
    const loop = () => {
      const t = aud.currentTime;
      let k = 0;
      for (let i = 0; i < onsets.length; i++) { if (t >= onsets[i] - 0.02) k = i + 1; else break; }
      setStep((s) => (s === k ? s : k));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [listening, onsets]);

  const visited = new Set<number>();
  for (let s = 0; s < step; s++) visited.add(TOUR[s][0] * COLS + TOUR[s][1]);
  const current = step > 0 ? TOUR[step - 1][0] * COLS + TOUR[step - 1][1] : -1;

  const seqCls = (i: number) => (i === current ? "current" : visited.has(i) ? "visited" : "");
  const mirrorCls = (i: number) => (i === step - 1 ? "current" : i < step - 1 ? "match" : "");

  const listen = async () => {
    const aud = audRef.current;
    if (!aud) return;
    if (aud.paused) {
      setAuto(false); setStep(0);
      aud.currentTime = 0;
      try { await aud.play(); setListening(true); } catch { setListening(false); }
    } else {
      aud.pause(); setListening(false);
    }
  };

  const grids = [
    <div key="seq"><div className="knuth-label">Sequential reading{knightFirst ? " (verse 2)" : " (verse 1)"}</div><Grid words={seq} cls={seqCls} /></div>,
    <div key="kn"><div className="knuth-label">Knight&apos;s-tour reading{knightFirst ? " (verse 1)" : " (verse 2)"}</div><Grid words={knight} cls={mirrorCls} /></div>,
  ];

  return (
    <article className="knuth">
      <div className="label" style={{ marginBottom: 8 }}>{kicker}</div>
      <h3 className="h3">{title}</h3>
      <div className="knuth-pair">{knightFirst ? [grids[1], grids[0]] : grids}</div>
      <div className="ck-controls">
        <button className="btn btn--ghost" onClick={() => { setAuto(false); setListening(false); audRef.current?.pause(); setStep((s) => Math.min(N, s + 1)); }} disabled={step >= N}>Step</button>
        <button className="btn" onClick={() => { setListening(false); audRef.current?.pause(); if (step >= N) setStep(0); setAuto((a) => !a); }}>{auto ? "Pause" : "Auto-play"}</button>
        <button className="btn btn--ghost" onClick={() => { setAuto(false); setListening(false); audRef.current?.pause(); setStep(0); }}>Reset</button>
        <button className="btn btn--ghost" onClick={listen}>{listening ? "Pause recital" : "Listen to recital"}</button>
        <audio ref={audRef} src={`/chitrakavya/${audio}`} preload="none" onPause={() => setListening(false)} onEnded={() => setListening(false)} />
        <span className="small muted" style={{ marginLeft: "auto", fontVariantNumeric: "tabular-nums" }}>{step} / 32</span>
      </div>
      <div className="knuth-verses">
        <p><span className="label">Verse 1{knightFirst ? ", knight's tour" : ", sequential"}</span>{verse1.map((l, i) => <span key={i}>{l}<br /></span>)}</p>
        <p><span className="label">Verse 2{knightFirst ? ", sequential" : ", knight's tour"}</span>{verse2.map((l, i) => <span key={i}>{l}<br /></span>)}</p>
      </div>
      <p className="muted small" style={{ marginTop: 14, maxWidth: "64ch" }}>{note}</p>
    </article>
  );
}

export default function KnuthPoems() {
  return (
    <div className="knuth-wrap">
      <Poem
        kicker="Poem 1, after the Pādukāsahasra"
        title="One, two, three, four, see each word here…"
        seq={P1_SEQ}
        knight={P1_KNIGHT}
        audio="poem1.mp3"
        verse1={["One two three four, See each word here.", "Jumps so wise now, find their place passed.", "Terns can't soar like flies, the free rook.", "Goose steps just won't mean knight hops last."]}
        verse2={["One knight jumps like three rook wise steps.", "Past sore too mean, so just for free.", "Hops here turns there, flies each goose now.", "Can't place last word? Won't find the sea."]}
        note="The same multiset of syllables, read in two orders. Listen with the recital playing: both verses sound nearly identical, only the punctuation and spelling change."
      />
      <Poem
        kicker="Poem 2, after the Harivijaya"
        title="Have some fun, watch this or that word…"
        seq={P2_SEQ}
        knight={P2_KNIGHT}
        audio="poem2.mp3"
        knightFirst
        verse1={["Have some fun, Watch this or that word.", "Great four lines take out each, gives eight.", "Left than two black and just here white.", "Three rook steps make one knight move right."]}
        verse2={["One two three four, watch each word here,", "or take some left steps and move eight.", "Just right gives this black rook great fun,", "than have lines make out that white knight."]}
        note="Here the order is reversed, as in the Harivijaya: the knight's-tour reading is the first verse, and the sequential reading is the second. Watch the left grid light up as the knight walks the right one."
      />
    </div>
  );
}
