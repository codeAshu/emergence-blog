"use client";

import { useEffect, useRef } from "react";

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
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const labels = ["SEPARATION", "ALIGNMENT", "COHESION"];

      zones.forEach((zone, zoneIdx) => {
        // Zone boundary
        ctx.strokeStyle = `rgba(255, 107, 0, 0.15)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(zone.x, zone.y, 70, 0, Math.PI * 2);
        ctx.stroke();

        // Label
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.font = "11px monospace";
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
          gradient.addColorStop(0, "rgba(255, 107, 0, 0.3)");
          gradient.addColorStop(1, "rgba(255, 107, 0, 0)");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, 12, 0, Math.PI * 2);
          ctx.fill();

          // Triangle
          ctx.fillStyle = `rgba(255, 107, 0, 0.8)`;
          ctx.beginPath();
          ctx.moveTo(size, 0);
          ctx.lineTo(-size / 2, size / 2);
          ctx.lineTo(-size / 2, -size / 2);
          ctx.closePath();
          ctx.fill();

          ctx.restore();

          // Draw interaction lines based on rule
          if (zoneIdx === 0) {
            // Separation - repulsion arrows
            zoneBoids.forEach((other, j) => {
              if (i === j) return;
              const odx = boid.x - other.x;
              const ody = boid.y - other.y;
              const odist = Math.sqrt(odx * odx + ody * ody);
              if (odist < 30) {
                ctx.strokeStyle = `rgba(255, 107, 0, ${0.3 * (1 - odist / 30)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(other.x, other.y);
                ctx.lineTo(other.x + odx * 0.3, other.y + ody * 0.3);
                ctx.stroke();
              }
            });
          } else if (zoneIdx === 1 && i === 0) {
            // Alignment - show average direction
            let avgVx = 0, avgVy = 0;
            zoneBoids.forEach((other) => {
              avgVx += other.vx;
              avgVy += other.vy;
            });
            const avgAngle = Math.atan2(avgVy, avgVx);
            ctx.strokeStyle = "rgba(255, 107, 0, 0.4)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(zone.x, zone.y);
            ctx.lineTo(zone.x + Math.cos(avgAngle) * 30, zone.y + Math.sin(avgAngle) * 30);
            ctx.stroke();
          } else if (zoneIdx === 2) {
            // Cohesion - lines to center
            let avgX = 0, avgY = 0;
            zoneBoids.forEach((other) => {
              avgX += other.x;
              avgY += other.y;
            });
            avgX /= zoneBoids.length;
            avgY /= zoneBoids.length;

            ctx.strokeStyle = "rgba(255, 107, 0, 0.1)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(boid.x, boid.y);
            ctx.lineTo(avgX, avgY);
            ctx.stroke();

            if (i === 0) {
              ctx.fillStyle = "rgba(255, 107, 0, 0.5)";
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
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-lg glass-panel">
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div className="absolute bottom-2 right-2 text-xs text-white/30 header-mono">
        Reynolds&apos; Boids Rules
      </div>
    </div>
  );
}
