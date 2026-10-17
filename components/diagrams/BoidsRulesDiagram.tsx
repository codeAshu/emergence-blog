"use client";

import { useEffect, useRef } from "react";
import { useThemeColorsRef } from "../animations/useThemeColors";

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function BoidsRulesDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const boidsRef = useRef<Boid[]>([]);
  const themeRef = useThemeColorsRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 250;

    // Initialize boids in three groups for three rules
    const boids: Boid[] = [];
    const zones = [
      { x: 100, y: 125 }, // Separation
      { x: 300, y: 125 }, // Alignment
      { x: 500, y: 125 }, // Cohesion
    ];

    zones.forEach((zone, zoneIdx) => {
      for (let i = 0; i < 8; i++) {
        boids.push({
          x: zone.x + (Math.random() - 0.5) * 60,
          y: zone.y + (Math.random() - 0.5) * 60,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
        });
      }
    });

    boidsRef.current = boids;

    let time = 0;

    const draw = () => {
      const t = themeRef.current;

      ctx.fillStyle = t.fadeOverlay;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const labels = ["SEPARATION", "ALIGNMENT", "COHESION"];

      zones.forEach((zone, zoneIdx) => {
        // Zone boundary
        ctx.strokeStyle = t.hairline(0.18);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(zone.x, zone.y, 70, 0, Math.PI * 2);
        ctx.stroke();

        // Label
        ctx.fillStyle = t.ink(0.55);
        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.fillText(labels[zoneIdx], zone.x, zone.y + 90);

        // Update and draw boids for this zone
        const startIdx = zoneIdx * 8;
        const endIdx = startIdx + 8;
        const zoneBoids = boids.slice(startIdx, endIdx);

        zoneBoids.forEach((boid, i) => {
          const globalIdx = startIdx + i;

          // Apply zone-specific behavior
          if (zoneIdx === 0) {
            // Separation - push apart
            zoneBoids.forEach((other, j) => {
              if (i === j) return;
              const dx = boid.x - other.x;
              const dy = boid.y - other.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 30 && dist > 0) {
                boid.vx += (dx / dist) * 0.15;
                boid.vy += (dy / dist) * 0.15;
              }
            });
          } else if (zoneIdx === 1) {
            // Alignment - match velocity
            let avgVx = 0, avgVy = 0;
            zoneBoids.forEach((other) => {
              avgVx += other.vx;
              avgVy += other.vy;
            });
            avgVx /= zoneBoids.length;
            avgVy /= zoneBoids.length;
            boid.vx += (avgVx - boid.vx) * 0.05;
            boid.vy += (avgVy - boid.vy) * 0.05;
          } else if (zoneIdx === 2) {
            // Cohesion - move toward center
            let avgX = 0, avgY = 0;
            zoneBoids.forEach((other) => {
              avgX += other.x;
              avgY += other.y;
            });
            avgX /= zoneBoids.length;
            avgY /= zoneBoids.length;
            boid.vx += (avgX - boid.x) * 0.01;
            boid.vy += (avgY - boid.y) * 0.01;
          }

          // Keep in zone
          const dx = boid.x - zone.x;
          const dy = boid.y - zone.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 60) {
            boid.vx -= dx * 0.02;
            boid.vy -= dy * 0.02;
          }

          // Speed limit
          const speed = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);
          if (speed > 1.5) {
            boid.vx = (boid.vx / speed) * 1.5;
            boid.vy = (boid.vy / speed) * 1.5;
          }
          if (speed < 0.3) {
            boid.vx = (boid.vx / speed) * 0.3;
            boid.vy = (boid.vy / speed) * 0.3;
          }

          // Update position
          boid.x += boid.vx;
          boid.y += boid.vy;

          // Draw boid as triangle pointing in direction
          const angle = Math.atan2(boid.vy, boid.vx);
          const size = 6;

          ctx.save();
          ctx.translate(boid.x, boid.y);
          ctx.rotate(angle);

          // Glow
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 12);
          gradient.addColorStop(0, t.ink(0.25));
          gradient.addColorStop(1, t.ink(0));
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, 12, 0, Math.PI * 2);
          ctx.fill();

          // Triangle
          ctx.fillStyle = t.ink(0.85);
          ctx.beginPath();
          ctx.moveTo(size, 0);
          ctx.lineTo(-size / 2, size / 2);
          ctx.lineTo(-size / 2, -size / 2);
          ctx.closePath();
          ctx.fill();

          ctx.restore();

          // Interaction lines — accent magenta only on the rule indicator
          if (zoneIdx === 0) {
            zoneBoids.forEach((other, j) => {
              if (i === j) return;
              const odx = boid.x - other.x;
              const ody = boid.y - other.y;
              const odist = Math.sqrt(odx * odx + ody * ody);
              if (odist < 30) {
                ctx.strokeStyle = t.accent(0.30 * (1 - odist / 30));
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(other.x, other.y);
                ctx.lineTo(other.x + odx * 0.3, other.y + ody * 0.3);
                ctx.stroke();
              }
            });
          } else if (zoneIdx === 1 && i === 0) {
            let avgVx = 0, avgVy = 0;
            zoneBoids.forEach((other) => {
              avgVx += other.vx;
              avgVy += other.vy;
            });
            const avgAngle = Math.atan2(avgVy, avgVx);
            ctx.strokeStyle = t.accent(0.55);
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(zone.x, zone.y);
            ctx.lineTo(zone.x + Math.cos(avgAngle) * 30, zone.y + Math.sin(avgAngle) * 30);
            ctx.stroke();
          } else if (zoneIdx === 2) {
            let avgX = 0, avgY = 0;
            zoneBoids.forEach((other) => {
              avgX += other.x;
              avgY += other.y;
            });
            avgX /= zoneBoids.length;
            avgY /= zoneBoids.length;

            ctx.strokeStyle = t.hairline(0.16);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(boid.x, boid.y);
            ctx.lineTo(avgX, avgY);
            ctx.stroke();

            if (i === 0) {
              ctx.fillStyle = t.accent(0.65);
              ctx.beginPath();
              ctx.arc(avgX, avgY, 4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
      });

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
        Reynolds&apos; Boids Rules
      </div>
    </div>
  );
}
