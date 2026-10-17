"use client";

import { useEffect, useRef, useCallback } from "react";
import { useThemeColorsRef } from "./useThemeColors";

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface BoidsProps {
  width?: number;
  height?: number;
  numBoids?: number;
}

export default function Boids({
  width = 600,
  height = 300,
  numBoids = 80,
}: BoidsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boidsRef = useRef<Boid[]>([]);
  const animationRef = useRef<number>(0);
  const themeRef = useThemeColorsRef();

  const visualRange = 50;
  const protectedRange = 15;
  const maxSpeed = 3;
  const minSpeed = 1.5;

  const initBoids = useCallback(() => {
    const boids: Boid[] = [];
    for (let i = 0; i < numBoids; i++) {
      boids.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      });
    }
    return boids;
  }, [height, numBoids, width]);

  const distance = (b1: Boid, b2: Boid) => {
    return Math.sqrt((b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2);
  };

  const updateBoid = useCallback(
    (boid: Boid, boids: Boid[]) => {
      let avgVx = 0, avgVy = 0;
      let avgX = 0, avgY = 0;
      let closeX = 0, closeY = 0;
      let neighbors = 0;

      for (const other of boids) {
        if (other === boid) continue;
        const d = distance(boid, other);

        if (d < visualRange) {
          avgVx += other.vx;
          avgVy += other.vy;
          avgX += other.x;
          avgY += other.y;
          neighbors++;

          if (d < protectedRange) {
            closeX += boid.x - other.x;
            closeY += boid.y - other.y;
          }
        }
      }

      if (neighbors > 0) {
        avgVx /= neighbors;
        avgVy /= neighbors;
        avgX /= neighbors;
        avgY /= neighbors;

        boid.vx += (avgVx - boid.vx) * 0.05;
        boid.vy += (avgVy - boid.vy) * 0.05;

        boid.vx += (avgX - boid.x) * 0.005;
        boid.vy += (avgY - boid.y) * 0.005;
      }

      boid.vx += closeX * 0.05;
      boid.vy += closeY * 0.05;

      const margin = 50;
      const turnFactor = 0.3;

      if (boid.x < margin) boid.vx += turnFactor;
      if (boid.x > width - margin) boid.vx -= turnFactor;
      if (boid.y < margin) boid.vy += turnFactor;
      if (boid.y > height - margin) boid.vy -= turnFactor;

      const speed = Math.sqrt(boid.vx ** 2 + boid.vy ** 2);
      if (speed > maxSpeed) {
        boid.vx = (boid.vx / speed) * maxSpeed;
        boid.vy = (boid.vy / speed) * maxSpeed;
      }
      if (speed < minSpeed) {
        boid.vx = (boid.vx / speed) * minSpeed;
        boid.vy = (boid.vy / speed) * minSpeed;
      }

      boid.x += boid.vx;
      boid.y += boid.vy;
    },
    [height, width]
  );

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, boids: Boid[]) => {
      const t = themeRef.current;

      // Trail fade matched to page background
      ctx.fillStyle = t.fadeOverlay;
      ctx.fillRect(0, 0, width, height);

      // Connections — hairline ink
      ctx.strokeStyle = t.hairline(0.12);
      ctx.lineWidth = 0.5;
      for (let i = 0; i < boids.length; i++) {
        for (let j = i + 1; j < boids.length; j++) {
          const d = distance(boids[i], boids[j]);
          if (d < visualRange) {
            ctx.beginPath();
            ctx.moveTo(boids[i].x, boids[i].y);
            ctx.lineTo(boids[j].x, boids[j].y);
            ctx.stroke();
          }
        }
      }

      // Boids — graphite arrow with restrained ink glow
      for (const boid of boids) {
        const angle = Math.atan2(boid.vy, boid.vx);

        ctx.save();
        ctx.translate(boid.x, boid.y);
        ctx.rotate(angle);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
        gradient.addColorStop(0, t.ink(0.32));
        gradient.addColorStop(0.5, t.ink(0.08));
        gradient.addColorStop(1, t.ink(0));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = t.ink(0.95);
        ctx.beginPath();
        ctx.moveTo(8, 0);
        ctx.lineTo(-4, 3);
        ctx.lineTo(-4, -3);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    },
    [height, themeRef, width],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    boidsRef.current = initBoids();

    ctx.fillStyle = themeRef.current.background;
    ctx.fillRect(0, 0, width, height);

    const animate = () => {
      for (const boid of boidsRef.current) {
        updateBoid(boid, boidsRef.current);
      }
      draw(ctx, boidsRef.current);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [draw, height, initBoids, themeRef, updateBoid, width]);

  return (
    <div className="animation-container w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-auto"
      />
    </div>
  );
}
