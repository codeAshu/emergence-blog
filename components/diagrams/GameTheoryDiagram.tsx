"use client";

import { useEffect, useRef } from "react";
import { useThemeColorsRef } from "../animations/useThemeColors";

export default function GameTheoryDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const themeRef = useThemeColorsRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 300;

    let time = 0;

    const draw = () => {
      const t = themeRef.current;

      ctx.fillStyle = t.fadeOverlay;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;

      const zones = [
        { x: 100, label: "ONE-SHOT", icon: "single" },
        { x: 300, label: "ITERATIVE", icon: "loop" },
        { x: 500, label: "EVOLUTIONARY", icon: "tree" },
      ];

      zones.forEach((zone, idx) => {
        const pulse = Math.sin(time * 0.02 + idx) * 0.2 + 0.8;

        // Soft ink halo (no accent wash)
        const gradient = ctx.createRadialGradient(
          zone.x, centerY, 0,
          zone.x, centerY, 60,
        );
        gradient.addColorStop(0, t.ink(0.10 * pulse));
        gradient.addColorStop(1, t.ink(0));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(zone.x, centerY, 60, 0, Math.PI * 2);
        ctx.fill();

        // Icon — graphite ink
        ctx.strokeStyle = t.ink(0.7 * pulse);
        ctx.lineWidth = 2;

        if (zone.icon === "single") {
          ctx.fillStyle = t.ink(pulse);
          ctx.beginPath();
          ctx.arc(zone.x, centerY, 8, 0, Math.PI * 2);
          ctx.fill();
        } else if (zone.icon === "loop") {
          ctx.beginPath();
          ctx.arc(zone.x, centerY, 20, 0.5, Math.PI * 1.8);
          ctx.stroke();
          const arrowAngle = Math.PI * 1.8;
          const ax = zone.x + Math.cos(arrowAngle) * 20;
          const ay = centerY + Math.sin(arrowAngle) * 20;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(ax + 8, ay - 4);
          ctx.lineTo(ax + 4, ay + 6);
          ctx.closePath();
          ctx.fillStyle = t.ink(0.7 * pulse);
          ctx.fill();
        } else if (zone.icon === "tree") {
          ctx.beginPath();
          ctx.moveTo(zone.x, centerY + 25);
          ctx.lineTo(zone.x, centerY);
          ctx.lineTo(zone.x - 15, centerY - 20);
          ctx.moveTo(zone.x, centerY);
          ctx.lineTo(zone.x + 15, centerY - 20);
          ctx.moveTo(zone.x - 15, centerY - 20);
          ctx.lineTo(zone.x - 25, centerY - 35);
          ctx.moveTo(zone.x - 15, centerY - 20);
          ctx.lineTo(zone.x - 5, centerY - 35);
          ctx.moveTo(zone.x + 15, centerY - 20);
          ctx.lineTo(zone.x + 5, centerY - 35);
          ctx.moveTo(zone.x + 15, centerY - 20);
          ctx.lineTo(zone.x + 25, centerY - 35);
          ctx.stroke();
        }

        // Label
        ctx.fillStyle = t.ink(0.7 * pulse);
        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.fillText(zone.label, zone.x, centerY + 55);
      });

      // Connector arrows — single editorial-magenta thread
      ctx.strokeStyle = t.accent(0.35);
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);

      ctx.beginPath();
      ctx.moveTo(160, centerY);
      ctx.lineTo(240, centerY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(360, centerY);
      ctx.lineTo(440, centerY);
      ctx.stroke();

      ctx.setLineDash([]);

      // Floating agents — graphite, one in three magenta
      for (let i = 0; i < 15; i++) {
        const angle = time * 0.01 + i * 0.5;
        const radius = 80 + Math.sin(time * 0.02 + i) * 20;
        const zoneIdx = Math.floor(i / 5);
        const zone = zones[zoneIdx];

        const x = zone.x + Math.cos(angle + zoneIdx * 2) * (radius * 0.4);
        const y = centerY + Math.sin(angle * 1.5 + i) * (radius * 0.3);

        const alpha = 0.4 + Math.sin(time * 0.03 + i) * 0.2;
        ctx.fillStyle = i % 5 === 0 ? t.accent(alpha) : t.ink(alpha);
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      time++;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [themeRef]);

  return (
    <div className="relative w-full overflow-hidden animation-container">
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div className="absolute bottom-2 right-3 header-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-subtle)]">
        Game Types
      </div>
    </div>
  );
}
