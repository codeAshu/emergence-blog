"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  brightness: number;
  society: number;
  age: number;
  loyalty: number;
  influence: number; // Leadership potential
  isEmissary: boolean; // Trade route travelers
  emissaryTarget: number; // Target society for emissaries
  signalStrength: number; // Information propagation
  memory: { x: number; y: number }[]; // Trail memory
}

interface Society {
  centerX: number;
  centerY: number;
  targetX: number;
  targetY: number;
  hue: number;
  formation: number;
  members: number;
  leader: number; // Index of current leader particle
  collectiveGoal: { x: number; y: number } | null;
  signalOrigin: { x: number; y: number; time: number } | null;
  tradePartner: number; // Index of allied society
  tradeStrength: number; // How strong the alliance is
}

interface TradeRoute {
  from: number;
  to: number;
  particles: { x: number; y: number; progress: number }[];
  strength: number;
}

export default function BackgroundSwarm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const societiesRef = useRef<Society[]>([]);
  const tradeRoutesRef = useRef<TradeRoute[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());
  const cyclePhaseRef = useRef<"forming" | "dispersing">("forming");
  const cycleStartRef = useRef<number>(Date.now());
  const [isDarkMode, setIsDarkMode] = useState(true);

  const numSocieties = 3;
  const particlesPerSociety = 50;
  const visualRange = 80;
  const protectedRange = 15;

  // Cycle timing (ms)
  const formationDuration = 120000; // 2 minutes to form
  const dispersionDuration = 30000; // 30 seconds to scatter

  // Evolution parameters (~2 min full formation)
  const maxSpeed = 0.4;
  const minSpeed = 0.08;
  const baseAttraction = 0.00006;
  const maxAttraction = 0.001;
  const formationRate = 0.00006;
  const loyaltyGrowth = 0.0003;

  // Phase 2 & 3 parameters
  const leaderEmergenceRate = 0.0015;
  const emissarySpawnChance = 0.003;
  const signalDecay = 0.995;
  const signalSpreadRate = 0.02;
  const memoryLength = 30;
  const tradeRouteStrengthGrowth = 0.0003;

  // Dispersion parameters
  const disperseForce = 0.002;
  const disperseDecay = 0.003;

  const initSocieties = useCallback((width: number, height: number) => {
    const societies: Society[] = [];
    const positions = [
      { x: width * 0.2, y: height * 0.25 },
      { x: width * 0.75, y: height * 0.4 },
      { x: width * 0.35, y: height * 0.8 },
    ];

    for (let i = 0; i < numSocieties; i++) {
      societies.push({
        centerX: positions[i].x,
        centerY: positions[i].y,
        targetX: positions[i].x,
        targetY: positions[i].y,
        hue: 18 + i * 10,
        formation: 0,
        members: 0,
        leader: -1,
        collectiveGoal: null,
        signalOrigin: null,
        tradePartner: (i + 1) % numSocieties,
        tradeStrength: 0,
      });
    }
    return societies;
  }, []);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];

    for (let i = 0; i < numSocieties * particlesPerSociety; i++) {
      const society = i % numSocieties;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5 + 0.8,
        brightness: Math.random() * 0.3 + 0.2,
        society,
        age: 0,
        loyalty: 0,
        influence: Math.random() * 0.1,
        isEmissary: false,
        emissaryTarget: -1,
        signalStrength: 0,
        memory: [],
      });
    }
    return particles;
  }, []);

  const initTradeRoutes = useCallback(() => {
    const routes: TradeRoute[] = [];
    for (let i = 0; i < numSocieties; i++) {
      routes.push({
        from: i,
        to: (i + 1) % numSocieties,
        particles: [],
        strength: 0,
      });
    }
    return routes;
  }, []);

  const distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  };

  const updateCycle = useCallback((
    societies: Society[],
    particles: Particle[],
    tradeRoutes: TradeRoute[],
    width: number,
    height: number
  ) => {
    const now = Date.now();
    const cycleElapsed = now - cycleStartRef.current;

    if (cyclePhaseRef.current === "forming") {
      // Check if it's time to disperse
      const avgFormation = societies.reduce((sum, s) => sum + s.formation, 0) / societies.length;
      if (cycleElapsed > formationDuration || avgFormation > 0.85) {
        cyclePhaseRef.current = "dispersing";
        cycleStartRef.current = now;
      }
    } else {
      // Check if dispersion is complete
      const avgFormation = societies.reduce((sum, s) => sum + s.formation, 0) / societies.length;
      if (cycleElapsed > dispersionDuration && avgFormation < 0.1) {
        cyclePhaseRef.current = "forming";
        cycleStartRef.current = now;
        // Reset society positions
        const positions = [
          { x: width * 0.2, y: height * 0.25 },
          { x: width * 0.75, y: height * 0.4 },
          { x: width * 0.35, y: height * 0.8 },
        ];
        societies.forEach((society, i) => {
          society.targetX = positions[i].x;
          society.targetY = positions[i].y;
          society.leader = -1;
          society.collectiveGoal = null;
        });
        tradeRoutes.forEach(route => {
          route.strength = 0;
          route.particles = [];
        });
      }
    }
  }, []);

  const updateSocieties = useCallback((
    societies: Society[],
    particles: Particle[],
    tradeRoutes: TradeRoute[],
    width: number,
    height: number
  ) => {
    const isDispersing = cyclePhaseRef.current === "dispersing";

    for (let idx = 0; idx < societies.length; idx++) {
      const society = societies[idx];
      let nearMembers = 0;
      let totalX = 0;
      let totalY = 0;
      let maxInfluence = 0;
      let leaderCandidate = -1;

      for (let pIdx = 0; pIdx < particles.length; pIdx++) {
        const p = particles[pIdx];
        if (p.society === idx && !p.isEmissary) {
          const d = distance(p.x, p.y, society.centerX, society.centerY);
          if (d < 250) {
            nearMembers++;
            totalX += p.x;
            totalY += p.y;

            // Phase 3: Find emerging leader
            if (p.influence > maxInfluence) {
              maxInfluence = p.influence;
              leaderCandidate = pIdx;
            }
          }
        }
      }

      society.members = nearMembers;

      if (isDispersing) {
        // Decay formation and loyalty during dispersion
        society.formation = Math.max(0, society.formation - disperseDecay);
        society.leader = -1;
        society.collectiveGoal = null;
        society.signalOrigin = null;
      } else {
        // Society formation
        if (nearMembers > particlesPerSociety * 0.3) {
          society.formation = Math.min(1, society.formation + formationRate);
        }

        // Phase 3: Emergent leader
        if (society.formation > 0.3 && leaderCandidate !== -1) {
          society.leader = leaderCandidate;
        }
      }

      // Update center
      if (nearMembers > 5) {
        society.centerX += (totalX / nearMembers - society.centerX) * 0.015;
        society.centerY += (totalY / nearMembers - society.centerY) * 0.015;
      }

      // Phase 3: Collective goal setting (by leader)
      if (society.leader !== -1 && society.formation > 0.5) {
        if (!society.collectiveGoal || Math.random() < 0.006) {
          const margin = 150;
          society.collectiveGoal = {
            x: margin + Math.random() * (width - margin * 2),
            y: margin + Math.random() * (height - margin * 2),
          };
        }
      }

      // Phase 2: Signal propagation (random events)
      if (society.formation > 0.4 && Math.random() < 0.0015) {
        society.signalOrigin = {
          x: society.centerX,
          y: society.centerY,
          time: Date.now(),
        };
      }

      // Drift toward target
      if (Math.random() < 0.015) {
        const margin = 200;
        society.targetX = margin + Math.random() * (width - margin * 2);
        society.targetY = margin + Math.random() * (height - margin * 2);
      }

      society.centerX += (society.targetX - society.centerX) * 0.003;
      society.centerY += (society.targetY - society.centerY) * 0.003;

      // Phase 2: Trade route strength grows with formation
      if (society.formation > 0.3) {
        const route = tradeRoutes.find(r => r.from === idx);
        if (route) {
          route.strength = Math.min(1, route.strength + tradeRouteStrengthGrowth);
        }
      }
    }
  }, []);

  const updateTradeRoutes = useCallback((
    tradeRoutes: TradeRoute[],
    societies: Society[],
    particles: Particle[]
  ) => {
    for (const route of tradeRoutes) {
      const fromSociety = societies[route.from];
      const toSociety = societies[route.to];

      // Spawn trade route particles when societies are formed
      if (route.strength > 0.2 && Math.random() < route.strength * 0.002) {
        route.particles.push({
          x: fromSociety.centerX,
          y: fromSociety.centerY,
          progress: 0,
        });
      }

      // Update trade particles
      for (let i = route.particles.length - 1; i >= 0; i--) {
        const tp = route.particles[i];
        tp.progress += 0.002 * route.strength;

        // Bezier curve between societies
        const midX = (fromSociety.centerX + toSociety.centerX) / 2;
        const midY = Math.min(fromSociety.centerY, toSociety.centerY) - 100;

        const t = tp.progress;
        const mt = 1 - t;
        tp.x = mt * mt * fromSociety.centerX + 2 * mt * t * midX + t * t * toSociety.centerX;
        tp.y = mt * mt * fromSociety.centerY + 2 * mt * t * midY + t * t * toSociety.centerY;

        if (tp.progress >= 1) {
          route.particles.splice(i, 1);
        }
      }

      // Keep reasonable number of trade particles
      if (route.particles.length > 10) {
        route.particles.shift();
      }
    }
  }, []);

  const updateParticle = useCallback(
    (
      particle: Particle,
      pIndex: number,
      particles: Particle[],
      societies: Society[],
      width: number,
      height: number
    ) => {
      const isDispersing = cyclePhaseRef.current === "dispersing";

      particle.age++;

      if (isDispersing) {
        // Decay loyalty during dispersion
        particle.loyalty = Math.max(0, particle.loyalty - loyaltyGrowth * 2);
        particle.influence = Math.max(0, particle.influence - leaderEmergenceRate);
      } else {
        particle.loyalty = Math.min(1, particle.loyalty + loyaltyGrowth);
      }

      // Phase 3: Influence grows for well-connected particles
      let connectionCount = 0;
      let avgVx = 0, avgVy = 0;
      let avgX = 0, avgY = 0;
      let closeX = 0, closeY = 0;
      let neighbors = 0;

      const society = societies[particle.society];
      const effectiveRange = visualRange * (0.5 + society.formation * 0.5);

      for (const other of particles) {
        if (other === particle) continue;
        const d = distance(particle.x, particle.y, other.x, other.y);

        if (d < effectiveRange) {
          const sameSociety = other.society === particle.society;

          if (sameSociety) {
            connectionCount++;
          }

          const weight = sameSociety ? (0.3 + particle.loyalty * 0.7) : 0.1;

          avgVx += other.vx * weight;
          avgVy += other.vy * weight;
          avgX += other.x * weight;
          avgY += other.y * weight;
          neighbors += weight;

          if (d < protectedRange) {
            closeX += particle.x - other.x;
            closeY += particle.y - other.y;
          }

          // Phase 2: Signal propagation
          if (sameSociety && other.signalStrength > particle.signalStrength + 0.1) {
            particle.signalStrength += (other.signalStrength - particle.signalStrength) * signalSpreadRate;
          }
        }
      }

      // Phase 3: Update influence based on connections
      if (connectionCount > 5) {
        particle.influence = Math.min(1, particle.influence + leaderEmergenceRate * connectionCount);
      } else {
        particle.influence *= 0.9999;
      }

      // Phase 2: Signal decay
      particle.signalStrength *= signalDecay;

      // Signal boost from origin
      if (society.signalOrigin) {
        const signalAge = (Date.now() - society.signalOrigin.time) / 1000;
        const signalRadius = signalAge * 50;
        const d = distance(particle.x, particle.y, society.signalOrigin.x, society.signalOrigin.y);

        if (Math.abs(d - signalRadius) < 20) {
          particle.signalStrength = Math.min(1, particle.signalStrength + 0.3);
        }

        // Clear old signals
        if (signalAge > 10) {
          society.signalOrigin = null;
        }
      }

      // Phase 3: Memory trail
      if (particle.age % 10 === 0) {
        particle.memory.push({ x: particle.x, y: particle.y });
        if (particle.memory.length > memoryLength) {
          particle.memory.shift();
        }
      }

      if (neighbors > 0) {
        avgVx /= neighbors;
        avgVy /= neighbors;
        avgX /= neighbors;
        avgY /= neighbors;

        const alignStrength = 0.005 + particle.loyalty * 0.02;
        particle.vx += (avgVx - particle.vx) * alignStrength;
        particle.vy += (avgVy - particle.vy) * alignStrength;

        const cohesionStrength = 0.0005 + particle.loyalty * 0.002;
        particle.vx += (avgX - particle.x) * cohesionStrength;
        particle.vy += (avgY - particle.y) * cohesionStrength;
      }

      // Separation
      particle.vx += closeX * 0.02;
      particle.vy += closeY * 0.02;

      // Attraction to society center (or repulsion during dispersion)
      if (isDispersing) {
        // Push away from center during dispersion
        const dx = particle.x - society.centerX;
        const dy = particle.y - society.centerY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        particle.vx += (dx / dist) * disperseForce * (1 + Math.random() * 0.5);
        particle.vy += (dy / dist) * disperseForce * (1 + Math.random() * 0.5);
      } else {
        const attraction = baseAttraction + (maxAttraction - baseAttraction) * society.formation * particle.loyalty;
        particle.vx += (society.centerX - particle.x) * attraction;
        particle.vy += (society.centerY - particle.y) * attraction;
      }

      // Phase 3: Follow leader if exists and formed (disabled during dispersion)
      if (!isDispersing && society.leader !== -1 && society.formation > 0.4 && society.leader !== pIndex) {
        const leader = particles[society.leader];
        const leaderInfluence = 0.00005 * society.formation * particle.loyalty;
        particle.vx += (leader.x - particle.x) * leaderInfluence;
        particle.vy += (leader.y - particle.y) * leaderInfluence;
      }

      // Phase 3: Move toward collective goal (disabled during dispersion)
      if (!isDispersing && society.collectiveGoal && society.formation > 0.6) {
        const goalAttraction = 0.00002 * society.formation;
        particle.vx += (society.collectiveGoal.x - particle.x) * goalAttraction;
        particle.vy += (society.collectiveGoal.y - particle.y) * goalAttraction;
      }

      // Random wandering (decreases with loyalty, increases during dispersion)
      const baseWander = isDispersing ? 0.05 : 0.02;
      const wanderStrength = baseWander * (1 - particle.loyalty * 0.8);
      particle.vx += (Math.random() - 0.5) * wanderStrength;
      particle.vy += (Math.random() - 0.5) * wanderStrength;

      // Mouse attraction
      const mouseDist = distance(particle.x, particle.y, mouseRef.current.x, mouseRef.current.y);
      if (mouseDist < 150 && mouseDist > 20) {
        particle.vx += (mouseRef.current.x - particle.x) * 0.00008;
        particle.vy += (mouseRef.current.y - particle.y) * 0.00008;
      }

      // Edge avoidance
      const margin = 50;
      const turnFactor = 0.03;

      if (particle.x < margin) particle.vx += turnFactor;
      if (particle.x > width - margin) particle.vx -= turnFactor;
      if (particle.y < margin) particle.vy += turnFactor;
      if (particle.y > height - margin) particle.vy -= turnFactor;

      // Speed limits
      const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
      const currentMaxSpeed = maxSpeed * (0.5 + society.formation * 0.5);
      if (speed > currentMaxSpeed) {
        particle.vx = (particle.vx / speed) * currentMaxSpeed;
        particle.vy = (particle.vy / speed) * currentMaxSpeed;
      }
      if (speed < minSpeed) {
        particle.vx = (particle.vx / speed) * minSpeed;
        particle.vy = (particle.vy / speed) * minSpeed;
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      // Brightness based on formation, loyalty, and signal
      const baseBrightness = 0.15 + society.formation * 0.2 + particle.loyalty * 0.15;
      const signalBoost = particle.signalStrength * 0.3;
      const leaderBoost = (society.leader === pIndex) ? 0.3 : 0;
      particle.brightness = baseBrightness + signalBoost + leaderBoost +
        Math.sin(Date.now() * 0.0005 + particle.x * 0.005) * 0.1;
    },
    []
  );

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      particles: Particle[],
      societies: Society[],
      tradeRoutes: TradeRoute[],
      width: number,
      height: number,
      darkMode: boolean
    ) => {
      /* ----- Theme-aware palette ----- */
      // Dark mode: fire orange | Light mode: blue/turquoise
      const baseHue = darkMode ? 25 : 190; // Orange vs Turquoise
      const hueVariation = (idx: number) => baseHue + (idx - 1) * 8;

      const inkLightness = (idx: number) =>
        darkMode ? [75, 65, 55][idx % 3] : [35, 45, 55][idx % 3];

      const ink = (idx: number, alpha: number) =>
        `hsla(${hueVariation(idx)}, ${darkMode ? 80 : 60}%, ${inkLightness(idx)}%, ${alpha})`;

      // Accent color — brighter version of the theme
      const accent = (alpha: number) => {
        const h = darkMode ? 20 : 185;
        const s = darkMode ? 95 : 75;
        const l = darkMode ? 60 : 45;
        return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
      };

      // Background trail fade — matches page background.
      // Dark: deep charcoal | Light: warm natural beige
      ctx.fillStyle = darkMode
        ? "rgba(20, 20, 22, 0.06)"
        : "rgba(245, 240, 230, 0.10)";
      ctx.fillRect(0, 0, width, height);

      /* ----- Trade routes ----- */
      for (const route of tradeRoutes) {
        if (route.strength > 0.1) {
          const fromSociety = societies[route.from];
          const toSociety = societies[route.to];

          // Subtle ink line
          ctx.strokeStyle = ink(route.from, route.strength * 0.10);
          ctx.lineWidth = Math.max(0.4, route.strength * 1.2);
          ctx.beginPath();
          ctx.moveTo(fromSociety.centerX, fromSociety.centerY);

          const midX = (fromSociety.centerX + toSociety.centerX) / 2;
          const midY = Math.min(fromSociety.centerY, toSociety.centerY) - 100;
          ctx.quadraticCurveTo(midX, midY, toSociety.centerX, toSociety.centerY);
          ctx.stroke();

          // Trade messengers — accent magenta (rare, decisive)
          for (const tp of route.particles) {
            const gradient = ctx.createRadialGradient(tp.x, tp.y, 0, tp.x, tp.y, 6);
            gradient.addColorStop(0, accent(route.strength * 0.55));
            gradient.addColorStop(1, accent(0));
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(tp.x, tp.y, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      /* ----- Signal waves and collective-goal markers (accent only) ----- */
      for (const society of societies) {
        if (society.signalOrigin) {
          const signalAge = (Date.now() - society.signalOrigin.time) / 1000;
          const signalRadius = signalAge * 50;
          const signalAlpha = Math.max(0, 0.22 - signalAge * 0.03);

          ctx.strokeStyle = accent(signalAlpha);
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(society.signalOrigin.x, society.signalOrigin.y, signalRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        if (society.collectiveGoal && society.formation > 0.6) {
          const pulseSize = 10 + Math.sin(Date.now() * 0.003) * 5;
          ctx.strokeStyle = accent(society.formation * 0.28);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(society.collectiveGoal.x, society.collectiveGoal.y, pulseSize, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      /* ----- Connections (ink) ----- */
      const connAlphaMultiplier = darkMode ? 0.18 : 0.22;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const d = distance(p1.x, p1.y, p2.x, p2.y);

          const sameSociety = p1.society === p2.society;
          const connectionRange = sameSociety ? visualRange : visualRange * 0.5;

          if (d < connectionRange) {
            const society = societies[p1.society];
            const formationAlpha = sameSociety
              ? society.formation
              : Math.min(societies[p1.society].formation, societies[p2.society].formation) * 0.3;
            const alpha =
              ((1 - d / connectionRange) * connAlphaMultiplier * formationAlpha *
                (p1.loyalty + p2.loyalty)) / 2;

            if (alpha > 0.01) {
              ctx.strokeStyle = ink(p1.society, alpha);
              ctx.lineWidth = sameSociety ? 0.55 : 0.2;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      /* ----- Particles ----- */
      const brightnessMultiplier = darkMode ? 1 : 1.4;

      for (let pIdx = 0; pIdx < particles.length; pIdx++) {
        const particle = particles[pIdx];
        const society = societies[particle.society];
        const isLeader = society.leader === pIdx;
        const adjustedBrightness = Math.min(1, particle.brightness * brightnessMultiplier);

        // Memory trail for leaders — accent magenta, low alpha
        if (isLeader && particle.memory.length > 2) {
          ctx.strokeStyle = accent(darkMode ? 0.18 : 0.22);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.memory[0].x, particle.memory[0].y);
          for (let m = 1; m < particle.memory.length; m++) {
            ctx.lineTo(particle.memory[m].x, particle.memory[m].y);
          }
          ctx.stroke();
        }

        const baseGlow = particle.size * (3 + society.formation * 3);
        const leaderGlow = isLeader ? particle.size * 4 : 0;
        const signalGlow = particle.signalStrength * particle.size * 3;
        const glowSize = baseGlow + leaderGlow + signalGlow;

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize,
        );

        if (isLeader) {
          // Single decisive accent for the leader
          gradient.addColorStop(0, accent(adjustedBrightness * 0.55));
          gradient.addColorStop(0.5, accent(adjustedBrightness * 0.18));
          gradient.addColorStop(1, accent(0));
        } else {
          gradient.addColorStop(0, ink(particle.society, adjustedBrightness * 0.45));
          gradient.addColorStop(0.5, ink(particle.society, adjustedBrightness * 0.12));
          gradient.addColorStop(1, ink(particle.society, 0));
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Core
        const coreSize = isLeader ? particle.size * 1.6 : particle.size;
        ctx.fillStyle = isLeader
          ? accent(adjustedBrightness)
          : ink(particle.society, adjustedBrightness);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, coreSize, 0, Math.PI * 2);
        ctx.fill();

        // Leader crown ring — accent
        if (isLeader && society.formation > 0.5) {
          ctx.strokeStyle = accent(society.formation * 0.45);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    },
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      societiesRef.current = initSocieties(canvas.width, canvas.height);
      particlesRef.current = initParticles(canvas.width, canvas.height);
      tradeRoutesRef.current = initTradeRoutes();
      startTimeRef.current = Date.now();
    };

    // Theme observer
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDarkMode(theme !== "light");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initial fill based on theme — match the page background tokens
    // Dark: deep charcoal | Light: warm natural beige
    const initialTheme = document.documentElement.getAttribute("data-theme");
    ctx.fillStyle =
      initialTheme === "dark" ? "rgb(20, 20, 22)" : "rgb(245, 240, 230)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const animate = () => {
      updateCycle(
        societiesRef.current,
        particlesRef.current,
        tradeRoutesRef.current,
        canvas.width,
        canvas.height
      );
      updateSocieties(
        societiesRef.current,
        particlesRef.current,
        tradeRoutesRef.current,
        canvas.width,
        canvas.height
      );
      updateTradeRoutes(tradeRoutesRef.current, societiesRef.current, particlesRef.current);

      for (let i = 0; i < particlesRef.current.length; i++) {
        updateParticle(
          particlesRef.current[i],
          i,
          particlesRef.current,
          societiesRef.current,
          canvas.width,
          canvas.height
        );
      }

      const currentTheme = document.documentElement.getAttribute("data-theme");
      draw(
        ctx,
        particlesRef.current,
        societiesRef.current,
        tradeRoutesRef.current,
        canvas.width,
        canvas.height,
        currentTheme !== "light"
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [draw, initParticles, initSocieties, initTradeRoutes, updateCycle, updateParticle, updateSocieties, updateTradeRoutes]);

  return (
    <canvas
      ref={canvasRef}
      className="swarm-bg"
      style={{ background: isDarkMode ? "#0f0f0f" : "#f5f0e6" }}
    />
  );
}
