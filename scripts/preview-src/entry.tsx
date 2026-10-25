// Preview bundle: mounts the real React components into the static export's markup.
// This is what the artifact runs; the live site hydrates the same components through Next.
import { createRoot } from "react-dom/client";
import BackgroundSwarm from "../../components/BackgroundSwarm";
import GameOfLife from "../../components/animations/GameOfLife";
import Boids from "../../components/animations/Boids";
import SwarmViz from "../../components/animations/SwarmViz";
import BoidsRulesDiagram from "../../components/diagrams/BoidsRulesDiagram";
import GameTheoryDiagram from "../../components/diagrams/GameTheoryDiagram";
import KnightsTour from "../../components/ck/KnightsTour";
import KnuthPoems from "../../components/ck/KnuthPoems";
import Sarvatobhadra from "../../components/ck/Sarvatobhadra";
import WritingIndex from "../../components/WritingIndex";

function mount(el: Element | null, node: React.ReactNode) {
  if (!el) return;
  el.innerHTML = "";
  createRoot(el).render(node);
}

// Home: society swarm behind the hero
mount(document.querySelector(".hero .swarm"), <BackgroundSwarm />);

// Essays: figures
document.querySelectorAll<HTMLElement>("figure[data-fig]").forEach((fig) => {
  const host = document.createElement("div");
  host.className = "fig";
  fig.insertBefore(host, fig.firstChild);
  const k = fig.dataset.fig;
  const node =
    k === "life" ? <GameOfLife width={600} height={280} cellSize={4} /> :
    k === "boids" ? <Boids width={600} height={300} numBoids={80} /> :
    k === "swarm" ? <SwarmViz width={600} height={300} numParticles={50} /> :
    k === "boids-rules" ? <BoidsRulesDiagram /> :
    k === "game-theory" ? <GameTheoryDiagram /> : null;
  mount(host, node);
});

// Chitrakāvya interactives: the export already rendered the static markup; replace with live ones
document.querySelectorAll<HTMLElement>("[data-mount]").forEach((el) => {
  const k = el.dataset.mount;
  if (k === "knights-tour") mount(el, <KnightsTour />);
  if (k === "knights-tour-compact") mount(el, <KnightsTour compact />);
  if (k === "knuth") mount(el, <KnuthPoems />);
  if (k === "sarvatobhadra") mount(el, <Sarvatobhadra />);
  if (k === "writing-index") {
    const rows = JSON.parse(el.dataset.rows ?? "[]");
    mount(el, <WritingIndex rows={rows} />);
  }
});
