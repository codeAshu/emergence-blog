"use client";

import { useEffect, useRef } from "react";

export default function GameTheoryDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 300;

    let time = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;

      // Draw three game type zones
      const zones = [
        { x: 100, label: "ONE-SHOT", icon: "single" },
        { x: 300, label: "ITERATIVE", icon: "loop" },
        { x: 500, label: "EVOLUTIONARY", icon: "tree" },
      ];

      zones.forEach((zone, idx) => {
        const pulse = Math.sin(time * 0.02 + idx) * 0.2 + 0.8;

        // Zone glow
        const gradient = ctx.createRadialGradient(
          zone.x, centerY, 0,
          zone.x, centerY, 60
        );
        gradient.addColorStop(0, `rgba(255, 107, 0, ${0.15 * pulse})`);
        gradient.addColorStop(1, "rgba(255, 107, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(zone.x, centerY, 60, 0, Math.PI * 2);
        ctx.fill();

        // Icon
        ctx.strokeStyle = `rgba(255, 107, 0, ${0.6 * pulse})`;
        ctx.lineWidth = 2;

        if (zone.icon === "single") {
          // Single dot
          ctx.fillStyle = `rgba(255, 107, 0, ${pulse})`;
          ctx.beginPath();
          ctx.arc(zone.x, centerY, 8, 0, Math.PI * 2);
          ctx.fill();
        } else if (zone.icon === "loop") {
          // Loop arrow
          ctx.beginPath();
          ctx.arc(zone.x, centerY, 20, 0.5, Math.PI * 1.8);
          ctx.stroke();
          // Arrow head
          const arrowAngle = Math.PI * 1.8;
          const ax = zone.x + Math.cos(arrowAngle) * 20;
          const ay = centerY + Math.sin(arrowAngle) * 20;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(ax + 8, ay - 4);
          ctx.lineTo(ax + 4, ay + 6);
          ctx.closePath();
          ctx.fillStyle = `rgba(255, 107, 0, ${0.6 * pulse})`;
          ctx.fill();
        } else if (zone.icon === "tree") {
          // Branching tree
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
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * pulse})`;
        ctx.font = "11px monospace";
        ctx.textAlign = "center";
        ctx.fillText(zone.label, zone.x, centerY + 55);
      });

      // Draw connecting arrows
      ctx.strokeStyle = "rgba(255, 107, 0, 0.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);

      // Arrow from one-shot to iterative
      ctx.beginPath();
      ctx.moveTo(160, centerY);
      ctx.lineTo(240, centerY);
      ctx.stroke();

      // Arrow from iterative to evolutionary
      ctx.beginPath();
      ctx.moveTo(360, centerY);
      ctx.lineTo(440, centerY);
      ctx.stroke();

      ctx.setLineDash([]);

      // Floating particles representing agents
      for (let i = 0; i < 15; i++) {
        const angle = time * 0.01 + i * 0.5;
        const radius = 80 + Math.sin(time * 0.02 + i) * 20;
        const zoneIdx = Math.floor(i / 5);
        const zone = zones[zoneIdx];

        const x = zone.x + Math.cos(angle + zoneIdx * 2) * (radius * 0.4);
        const y = centerY + Math.sin(angle * 1.5 + i) * (radius * 0.3);

        const alpha = 0.3 + Math.sin(time * 0.03 + i) * 0.2;
        ctx.fillStyle = `rgba(255, 107, 0, ${alpha})`;
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
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-lg glass-panel">
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div className="absolute bottom-2 right-2 text-xs text-white/30 header-mono">
        Game Types
      </div>
    </div>
  );
}
