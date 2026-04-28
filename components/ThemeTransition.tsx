"use client";

import { useEffect, useState, useRef } from "react";

export default function ThemeTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState<"sunrise" | "moonrise" | null>(null);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const persistentCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const persistentAnimationRef = useRef<number>(0);

  // Track current theme
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setCurrentTheme(theme === "dark" ? "dark" : "light");
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Listen for theme changes
    const handleThemeChange = (e: CustomEvent) => {
      const newTheme = e.detail.theme;
      setTransitionType(newTheme === "light" ? "sunrise" : "moonrise");
      setIsTransitioning(true);
    };

    window.addEventListener("themeTransition" as any, handleThemeChange);
    return () => window.removeEventListener("themeTransition" as any, handleThemeChange);
  }, []);

  // Persistent celestial body animation
  useEffect(() => {
    const canvas = persistentCanvasRef.current;
    if (!canvas || isTransitioning) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    const drawPersistent = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (currentTheme === "light") {
        drawPersistentSun(ctx, canvas.width, canvas.height);
      } else {
        drawPersistentMoon(ctx, canvas.width, canvas.height);
      }

      persistentAnimationRef.current = requestAnimationFrame(drawPersistent);
    };

    drawPersistent();

    return () => {
      cancelAnimationFrame(persistentAnimationRef.current);
      window.removeEventListener("resize", updateSize);
    };
  }, [currentTheme, isTransitioning]);

  // Transition animation
  useEffect(() => {
    if (!isTransitioning || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const startTime = Date.now();
    const duration = 2000; // 2 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (transitionType === "sunrise") {
        drawSunrise(ctx, canvas.width, canvas.height, eased);
      } else {
        drawMoonrise(ctx, canvas.width, canvas.height, eased);
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsTransitioning(false);
          setTransitionType(null);
        }, 200);
      }
    };

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [isTransitioning, transitionType]);

  const drawPersistentSun = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const sunX = width - 80;
    const sunY = height - 100;
    const sunRadius = 35;
    const pulse = Math.sin(Date.now() * 0.001) * 0.1 + 0.9;

    // Golden hour hue
    const hueRadius = sunRadius * 5;
    const hueGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, hueRadius);
    hueGradient.addColorStop(0, `rgba(255, 180, 100, ${0.08 * pulse})`);
    hueGradient.addColorStop(0.5, `rgba(255, 150, 80, ${0.04 * pulse})`);
    hueGradient.addColorStop(1, "rgba(255, 100, 50, 0)");
    ctx.fillStyle = hueGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, hueRadius, 0, Math.PI * 2);
    ctx.fill();

    // Sun glow
    for (let i = 2; i >= 0; i--) {
      const glowRadius = sunRadius * (1.8 + i * 0.8);
      const glowAlpha = (0.08 - i * 0.02) * pulse;
      const gradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, glowRadius);
      gradient.addColorStop(0, `rgba(255, 220, 140, ${glowAlpha})`);
      gradient.addColorStop(0.6, `rgba(255, 180, 80, ${glowAlpha * 0.4})`);
      gradient.addColorStop(1, "rgba(255, 140, 40, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(sunX, sunY, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Sun core
    const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
    sunGradient.addColorStop(0, `rgba(255, 250, 220, ${0.85 * pulse})`);
    sunGradient.addColorStop(0.6, `rgba(255, 200, 100, ${0.75 * pulse})`);
    sunGradient.addColorStop(1, `rgba(255, 150, 50, ${0.65 * pulse})`);
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    ctx.fill();

    // Subtle birds
    ctx.strokeStyle = `rgba(80, 60, 40, 0.15)`;
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";

    const birds = [
      { x: width - 180, y: height - 160, size: 8, phase: 0 },
      { x: width - 140, y: height - 190, size: 6, phase: 0.5 },
      { x: width - 200, y: height - 130, size: 5, phase: 1 },
    ];

    birds.forEach((bird) => {
      const wingFlap = Math.sin(Date.now() * 0.006 + bird.phase) * 3;
      ctx.beginPath();
      ctx.moveTo(bird.x - bird.size, bird.y + wingFlap);
      ctx.quadraticCurveTo(bird.x - bird.size * 0.3, bird.y - 2, bird.x, bird.y);
      ctx.quadraticCurveTo(bird.x + bird.size * 0.3, bird.y - 2, bird.x + bird.size, bird.y + wingFlap);
      ctx.stroke();
    });
  };

  const drawPersistentMoon = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const moonX = width - 80;
    const moonY = height - 100;
    const moonRadius = 28;
    const pulse = Math.sin(Date.now() * 0.0008) * 0.1 + 0.9;

    // Silver/blue hue
    const hueRadius = moonRadius * 4;
    const hueGradient = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, hueRadius);
    hueGradient.addColorStop(0, `rgba(180, 200, 240, ${0.08 * pulse})`);
    hueGradient.addColorStop(0.5, `rgba(140, 170, 220, ${0.04 * pulse})`);
    hueGradient.addColorStop(1, "rgba(80, 100, 150, 0)");
    ctx.fillStyle = hueGradient;
    ctx.beginPath();
    ctx.arc(moonX, moonY, hueRadius, 0, Math.PI * 2);
    ctx.fill();

    // Moon glow
    for (let i = 2; i >= 0; i--) {
      const glowRadius = moonRadius * (1.5 + i * 0.7);
      const glowAlpha = (0.08 - i * 0.02) * pulse;
      const gradient = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, glowRadius);
      gradient.addColorStop(0, `rgba(220, 235, 255, ${glowAlpha})`);
      gradient.addColorStop(0.6, `rgba(180, 200, 240, ${glowAlpha * 0.4})`);
      gradient.addColorStop(1, "rgba(140, 160, 200, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(moonX, moonY, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Stars
    const stars = [
      { x: width - 180, y: height - 180, size: 1.2 },
      { x: width - 45, y: height - 210, size: 1.5 },
      { x: width - 130, y: height - 55, size: 1 },
      { x: width - 200, y: height - 120, size: 0.8 },
      { x: width - 60, y: height - 140, size: 1.3 },
      { x: width - 150, y: height - 200, size: 1 },
    ];

    stars.forEach((star, i) => {
      const twinkle = Math.sin(Date.now() * 0.003 + i * 1.7) * 0.3 + 0.7;
      const alpha = 0.25 * twinkle;

      const starGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
      starGlow.addColorStop(0, `rgba(230, 240, 255, ${alpha})`);
      starGlow.addColorStop(0.5, `rgba(200, 220, 255, ${alpha * 0.3})`);
      starGlow.addColorStop(1, "rgba(180, 200, 240, 0)");
      ctx.fillStyle = starGlow;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Moon surface
    const moonGradient = ctx.createRadialGradient(
      moonX - moonRadius * 0.3,
      moonY - moonRadius * 0.3,
      0,
      moonX,
      moonY,
      moonRadius
    );
    moonGradient.addColorStop(0, `rgba(250, 252, 255, ${0.9 * pulse})`);
    moonGradient.addColorStop(0.5, `rgba(220, 230, 245, ${0.85 * pulse})`);
    moonGradient.addColorStop(1, `rgba(180, 195, 220, ${0.8 * pulse})`);
    ctx.fillStyle = moonGradient;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    ctx.fill();

    // Craters
    const craters = [
      { x: -5, y: -3, r: 2.5 },
      { x: 3, y: 2, r: 2 },
      { x: -1, y: 5, r: 1.5 },
    ];
    for (const crater of craters) {
      ctx.fillStyle = `rgba(160, 175, 200, 0.12)`;
      ctx.beginPath();
      ctx.arc(moonX + crater.x, moonY + crater.y, crater.r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawSunrise = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    progress: number
  ) => {
    // Subtle warm wash across page
    const skyGradient = ctx.createLinearGradient(width, 0, 0, height);
    const skyAlpha = progress * 0.3;
    skyGradient.addColorStop(0, `rgba(255, 200, 150, ${skyAlpha * 0.4})`);
    skyGradient.addColorStop(0.5, `rgba(255, 180, 120, ${skyAlpha * 0.2})`);
    skyGradient.addColorStop(1, `rgba(255, 150, 80, 0)`);
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);

    // Sun position - rises from bottom right corner
    const sunX = width - 80;
    const sunStartY = height + 40;
    const sunEndY = height - 100;
    const sunY = sunStartY + (sunEndY - sunStartY) * progress;
    const sunRadius = 25 + progress * 10;

    // Golden hour hue around sun
    const hueRadius = sunRadius * 6;
    const hueGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, hueRadius);
    hueGradient.addColorStop(0, `rgba(255, 180, 100, ${0.15 * progress})`);
    hueGradient.addColorStop(0.4, `rgba(255, 150, 80, ${0.08 * progress})`);
    hueGradient.addColorStop(0.7, `rgba(255, 120, 60, ${0.03 * progress})`);
    hueGradient.addColorStop(1, "rgba(255, 100, 50, 0)");
    ctx.fillStyle = hueGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, hueRadius, 0, Math.PI * 2);
    ctx.fill();

    // Sun glow layers
    for (let i = 3; i >= 0; i--) {
      const glowRadius = sunRadius * (2 + i * 1.2);
      const glowAlpha = (0.14 - i * 0.03) * progress;
      const gradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, glowRadius);
      gradient.addColorStop(0, `rgba(255, 220, 140, ${glowAlpha})`);
      gradient.addColorStop(0.5, `rgba(255, 180, 80, ${glowAlpha * 0.5})`);
      gradient.addColorStop(1, "rgba(255, 140, 40, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(sunX, sunY, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Sun core
    const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
    sunGradient.addColorStop(0, `rgba(255, 250, 220, ${progress})`);
    sunGradient.addColorStop(0.6, `rgba(255, 200, 100, ${progress})`);
    sunGradient.addColorStop(1, `rgba(255, 150, 50, ${progress * 0.9})`);
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    ctx.fill();

    // Subtle birds silhouettes
    const birdAlpha = Math.max(0, (progress - 0.3) / 0.7) * 0.25;
    if (birdAlpha > 0) {
      ctx.strokeStyle = `rgba(80, 60, 40, ${birdAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";

      const birds = [
        { x: width - 180, y: height - 160, size: 8, phase: 0 },
        { x: width - 140, y: height - 190, size: 6, phase: 0.5 },
        { x: width - 200, y: height - 130, size: 5, phase: 1 },
        { x: width - 120, y: height - 145, size: 7, phase: 1.5 },
        { x: width - 160, y: height - 110, size: 5, phase: 2 },
      ];

      birds.forEach((bird) => {
        const wingFlap = Math.sin(Date.now() * 0.008 + bird.phase) * 3;
        ctx.beginPath();
        ctx.moveTo(bird.x - bird.size, bird.y + wingFlap);
        ctx.quadraticCurveTo(bird.x - bird.size * 0.3, bird.y - 2, bird.x, bird.y);
        ctx.quadraticCurveTo(bird.x + bird.size * 0.3, bird.y - 2, bird.x + bird.size, bird.y + wingFlap);
        ctx.stroke();
      });
    }
  };

  const drawMoonrise = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    progress: number
  ) => {
    // Subtle night wash
    const skyGradient = ctx.createLinearGradient(width, 0, 0, height);
    const skyAlpha = progress * 0.25;
    skyGradient.addColorStop(0, `rgba(30, 30, 60, ${skyAlpha})`);
    skyGradient.addColorStop(0.5, `rgba(20, 20, 40, ${skyAlpha * 0.5})`);
    skyGradient.addColorStop(1, `rgba(15, 15, 30, 0)`);
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);

    // Moon position - rises from bottom right corner
    const moonX = width - 80;
    const moonStartY = height + 30;
    const moonEndY = height - 100;
    const moonY = moonStartY + (moonEndY - moonStartY) * progress;
    const moonRadius = 20 + progress * 8;

    // Silver/blue hue around moon
    const hueRadius = moonRadius * 5;
    const hueGradient = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, hueRadius);
    hueGradient.addColorStop(0, `rgba(180, 200, 240, ${0.12 * progress})`);
    hueGradient.addColorStop(0.4, `rgba(140, 170, 220, ${0.06 * progress})`);
    hueGradient.addColorStop(0.7, `rgba(100, 130, 180, ${0.02 * progress})`);
    hueGradient.addColorStop(1, "rgba(80, 100, 150, 0)");
    ctx.fillStyle = hueGradient;
    ctx.beginPath();
    ctx.arc(moonX, moonY, hueRadius, 0, Math.PI * 2);
    ctx.fill();

    // Moon glow layers - soft silver/blue glow
    for (let i = 3; i >= 0; i--) {
      const glowRadius = moonRadius * (1.8 + i * 1);
      const glowAlpha = (0.12 - i * 0.025) * progress;
      const gradient = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, glowRadius);
      gradient.addColorStop(0, `rgba(220, 235, 255, ${glowAlpha})`);
      gradient.addColorStop(0.5, `rgba(180, 200, 240, ${glowAlpha * 0.5})`);
      gradient.addColorStop(1, "rgba(140, 160, 200, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(moonX, moonY, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Subtle scattered stars
    const starAlphaBase = Math.max(0, (progress - 0.25) / 0.75) * 0.35;
    if (starAlphaBase > 0) {
      const stars = [
        { x: width - 180, y: height - 180, size: 1.2 },
        { x: width - 45, y: height - 210, size: 1.5 },
        { x: width - 130, y: height - 55, size: 1 },
        { x: width - 200, y: height - 120, size: 0.8 },
        { x: width - 60, y: height - 140, size: 1.3 },
        { x: width - 150, y: height - 200, size: 1 },
        { x: width - 100, y: height - 80, size: 0.9 },
        { x: width - 220, y: height - 170, size: 1.1 },
      ];

      stars.forEach((star, i) => {
        const twinkle = Math.sin(Date.now() * 0.004 + i * 1.7) * 0.35 + 0.65;
        const alpha = starAlphaBase * twinkle;

        const starGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
        starGlow.addColorStop(0, `rgba(230, 240, 255, ${alpha})`);
        starGlow.addColorStop(0.5, `rgba(200, 220, 255, ${alpha * 0.3})`);
        starGlow.addColorStop(1, "rgba(180, 200, 240, 0)");
        ctx.fillStyle = starGlow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Moon surface gradient
    const moonGradient = ctx.createRadialGradient(
      moonX - moonRadius * 0.3,
      moonY - moonRadius * 0.3,
      0,
      moonX,
      moonY,
      moonRadius
    );
    moonGradient.addColorStop(0, `rgba(250, 252, 255, ${progress})`);
    moonGradient.addColorStop(0.5, `rgba(220, 230, 245, ${progress})`);
    moonGradient.addColorStop(1, `rgba(180, 195, 220, ${progress * 0.95})`);
    ctx.fillStyle = moonGradient;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    ctx.fill();

    // Moon craters (subtle)
    const craters = [
      { x: -5, y: -3, r: 2.5 },
      { x: 3, y: 2, r: 2 },
      { x: -1, y: 5, r: 1.5 },
    ];
    for (const crater of craters) {
      ctx.fillStyle = `rgba(160, 175, 200, ${progress * 0.15})`;
      ctx.beginPath();
      ctx.arc(moonX + crater.x, moonY + crater.y, crater.r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return (
    <>
      {/* Persistent celestial body */}
      {!isTransitioning && (
        <canvas
          ref={persistentCanvasRef}
          className="fixed inset-0 pointer-events-none z-[50]"
          style={{ background: "transparent" }}
        />
      )}

      {/* Transition animation */}
      {isTransitioning && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-[100]"
          style={{ background: "transparent" }}
        />
      )}
    </>
  );
}
