"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  bestX: number;
  bestY: number;
  bestValue: number;
}

interface SwarmVizProps {
  width?: number;
  height?: number;
  numParticles?: number;
}

export default function SwarmViz({
  width = 600,
  height = 300,
  numParticles = 50,
}: SwarmVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const globalBestRef = useRef({ x: 0, y: 0, value: Infinity });
  const animationRef = useRef<number>(0);

  const fitness = useCallback(
    (x: number, y: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const dx = x - centerX;
      const dy = y - centerY;
      return Math.sin(dx * 0.02) * Math.cos(dy * 0.02) + (dx * dx + dy * dy) * 0.0001;
    },
    [height, width]
  );

  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const value = fitness(x, y);
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        bestX: x,
        bestY: y,
        bestValue: value,
      });

      if (value < globalBestRef.current.value) {
        globalBestRef.current = { x, y, value };
      }
    }
    return particles;
  }, [fitness, height, numParticles, width]);

  const updateParticle = useCallback(
    (particle: Particle) => {
      const w = 0.5;
      const c1 = 1.5;
      const c2 = 2.0;

      const r1 = Math.random();
      const r2 = Math.random();

      particle.vx =
        w * particle.vx +
        c1 * r1 * (particle.bestX - particle.x) +
        c2 * r2 * (globalBestRef.current.x - particle.x);

      particle.vy =
        w * particle.vy +
        c1 * r1 * (particle.bestY - particle.y) +
        c2 * r2 * (globalBestRef.current.y - particle.y);

      const maxVel = 5;
      const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
      if (speed > maxVel) {
        particle.vx = (particle.vx / speed) * maxVel;
        particle.vy = (particle.vy / speed) * maxVel;
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.y = Math.max(0, Math.min(height, particle.y));

      const value = fitness(particle.x, particle.y);
      if (value < particle.bestValue) {
        particle.bestX = particle.x;
        particle.bestY = particle.y;
        particle.bestValue = value;

        if (value < globalBestRef.current.value) {
          globalBestRef.current = { x: particle.x, y: particle.y, value };
        }
      }
    },
    [fitness, height, width]
  );

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
      // Fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      // Draw connections
      ctx.strokeStyle = "rgba(255, 107, 0, 0.08)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.sqrt(
            (particles[i].x - particles[j].x) ** 2 +
            (particles[i].y - particles[j].y) ** 2
          );
          if (d < 60) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles with glow
      for (const particle of particles) {
        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, 12
        );
        gradient.addColorStop(0, "rgba(255, 107, 0, 0.5)");
        gradient.addColorStop(0.5, "rgba(255, 107, 0, 0.15)");
        gradient.addColorStop(1, "rgba(255, 107, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 12, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = "rgba(255, 140, 50, 0.8)";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw global best with stronger glow
      const gb = globalBestRef.current;
      const gbGradient = ctx.createRadialGradient(gb.x, gb.y, 0, gb.x, gb.y, 25);
      gbGradient.addColorStop(0, "rgba(255, 107, 0, 0.8)");
      gbGradient.addColorStop(0.3, "rgba(255, 107, 0, 0.3)");
      gbGradient.addColorStop(1, "rgba(255, 107, 0, 0)");
      ctx.fillStyle = gbGradient;
      ctx.beginPath();
      ctx.arc(gb.x, gb.y, 25, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ff6b00";
      ctx.beginPath();
      ctx.arc(gb.x, gb.y, 6, 0, Math.PI * 2);
      ctx.fill();
    },
    [height, width]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    globalBestRef.current = { x: 0, y: 0, value: Infinity };
    particlesRef.current = initParticles();

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    const animate = () => {
      for (const particle of particlesRef.current) {
        updateParticle(particle);
      }
      draw(ctx, particlesRef.current);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [draw, height, initParticles, updateParticle, width]);

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
