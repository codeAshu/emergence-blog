"use client";

import { useEffect, useRef } from "react";

// A quiet murmuration drawn in ink on the cream canvas. Reynolds' three rules.
type B = { x: number; y: number; vx: number; vy: number };

export default function Flock({ count = 90, className }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const boids: B[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
    }));

    const ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#161614";
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#d14016";

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < boids.length; i++) {
        const b = boids[i];
        let sx = 0, sy = 0, ax = 0, ay = 0, cx = 0, cy = 0, n = 0;
        for (let j = 0; j < boids.length; j++) {
          if (i === j) continue;
          const o = boids[j];
          const dx = o.x - b.x, dy = o.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 70 * 70) {
            n++;
            ax += o.vx; ay += o.vy;
            cx += o.x; cy += o.y;
            if (d2 < 22 * 22) { sx -= dx; sy -= dy; }
          }
        }
        if (n) {
          ax = ax / n - b.vx; ay = ay / n - b.vy;
          cx = cx / n - b.x; cy = cy / n - b.y;
        }
        b.vx += sx * 0.02 + ax * 0.04 + cx * 0.0015;
        b.vy += sy * 0.02 + ay * 0.04 + cy * 0.0015;
        // keep away from the edges softly
        if (b.x < 60) b.vx += 0.03; if (b.x > w - 60) b.vx -= 0.03;
        if (b.y < 40) b.vy += 0.03; if (b.y > h - 40) b.vy -= 0.03;
        const sp = Math.hypot(b.vx, b.vy) || 1;
        const max = 1.5, min = 0.6;
        if (sp > max) { b.vx = (b.vx / sp) * max; b.vy = (b.vy / sp) * max; }
        if (sp < min) { b.vx = (b.vx / sp) * min; b.vy = (b.vy / sp) * min; }
        b.x += b.vx; b.y += b.vy;

        const a = Math.atan2(b.vy, b.vx);
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(a);
        ctx.beginPath();
        ctx.moveTo(-4, 3); ctx.lineTo(4, 0); ctx.lineTo(-4, -3);
        ctx.strokeStyle = i % 23 === 0 ? accent : ink;
        ctx.globalAlpha = 0.55;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
      if (!reduce) raf = requestAnimationFrame(step);
    };
    step();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [count]);

  return <canvas ref={ref} className={className} aria-hidden style={{ width: "100%", height: "100%" }} />;
}
