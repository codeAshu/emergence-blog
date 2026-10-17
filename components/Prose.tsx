"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { createRoot, type Root } from "react-dom/client";

// The original essays carried live canvas figures. Markdown can't hold React, so a post
// marks a figure with <figure data-fig="boids"> and this component mounts the real thing there.
const GameOfLife = dynamic(() => import("@/components/animations/GameOfLife"), { ssr: false });
const Boids = dynamic(() => import("@/components/animations/Boids"), { ssr: false });
const SwarmViz = dynamic(() => import("@/components/animations/SwarmViz"), { ssr: false });
const BoidsRulesDiagram = dynamic(() => import("@/components/diagrams/BoidsRulesDiagram"), { ssr: false });
const GameTheoryDiagram = dynamic(() => import("@/components/diagrams/GameTheoryDiagram"), { ssr: false });

function Figure({ name }: { name: string }) {
  switch (name) {
    case "life":
      return <GameOfLife width={600} height={280} cellSize={4} />;
    case "boids":
      return <Boids width={600} height={300} numBoids={80} />;
    case "swarm":
      return <SwarmViz width={600} height={300} numParticles={50} />;
    case "boids-rules":
      return <BoidsRulesDiagram />;
    case "game-theory":
      return <GameTheoryDiagram />;
    default:
      return null;
  }
}

export default function Prose({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const roots: Root[] = [];
    el.querySelectorAll<HTMLElement>("figure[data-fig]").forEach((fig) => {
      const name = fig.dataset.fig ?? "";
      const mount = document.createElement("div");
      mount.className = "fig";
      fig.insertBefore(mount, fig.firstChild);
      const root = createRoot(mount);
      root.render(<Figure name={name} />);
      roots.push(root);
    });
    return () => {
      // defer unmount so React doesn't warn about unmounting during render
      setTimeout(() => roots.forEach((r) => r.unmount()), 0);
    };
  }, [html]);

  return <div ref={ref} className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
}
