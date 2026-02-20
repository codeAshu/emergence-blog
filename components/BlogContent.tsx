"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";

const GameOfLife = dynamic(
  () => import("@/components/animations/GameOfLife"),
  { ssr: false }
);
const Boids = dynamic(() => import("@/components/animations/Boids"), {
  ssr: false,
});
const SwarmViz = dynamic(() => import("@/components/animations/SwarmViz"), {
  ssr: false,
});

export default function BlogContent() {
  return (
    <BlogLayout>
      <article className="min-h-screen">
        {/* Header */}
        <header className="pt-12 pb-8 px-6 md:px-8">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#ff6b00] transition-colors header-mono"
            >
              <span>&larr;</span>
              <span>back</span>
            </Link>
            <div className="mt-8 glass-panel p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#ff6b00]/60 header-mono text-sm">01</span>
                <span className="text-white/30">|</span>
                <time className="text-sm text-white/40">February 2025</time>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight header-mono text-white">
                The Agentic Web
              </h1>
              <p className="mt-2 text-xl text-[#ff6b00]/80 header-mono">
                When Machines Form Societies
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#ff6b00] pulse-glow" />
                <span className="text-sm text-white/50">Ashutosh Trivedi</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="px-6 md:px-8 pb-24">
          <div className="max-w-2xl mx-auto prose-emergence text-lg">
            {/* Section 1: The Web Learns to Think */}
            <section className="mb-16 glass-panel-subtle p-6 md:p-8">
              <p className="text-xl leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#ff6b00]">
                I remember standing on a hillside in the Kumaon foothills, watching
                a murmuration of starlings paint patterns across the evening sky.
                Thousands of birds, moving as one. No leader. No plan. Just simple
                rules, local interactions, and something magnificent emerging from
                the chaos.
              </p>

              <p>
                That memory returns to me often now, as I watch a different kind of
                emergence unfold. Not in the sky, but in the digital substrate we
                have built around ourselves. We are witnessing the birth of machine
                societies.
              </p>

              <p>
                In my earlier writings on the{" "}
                <em>Society of Machines</em>, I explored how autonomous agents
                interact, compete, and cooperate. I asked: what happens when
                machines become decision-makers, not just tools? That question has
                become urgent. We are no longer building AI systems. We are
                birthing digital collectives.
              </p>

              <p>
                The web is learning to think. Not in the singular, human sense of
                consciousness, but in the distributed, emergent way that starling
                flocks think. Web 4.0 is not an upgrade; it is a phase transition.
                From decentralized data to decentralized intelligence. From
                services to societies.
              </p>
            </section>

            {/* Section 2: Autonomy Revisited */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                Autonomy Revisited
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  I once wrote that rational intelligence is about decision-making,
                  while autonomy is about the choice to take that decision. This
                  distinction haunts me now. When an AI agent can earn its own
                  existence, self-improve, and replicate, does it have choice?
                </p>

                <p>
                  Consider Conway&apos;s Game of Life. Simple rules. Cells live or die
                  based on their neighbors. Yet from this simplicity emerges the
                  Gosper Glider Gun, a pattern that generates new patterns
                  indefinitely. Self-sustaining. Self-replicating. A digital
                  metabolism.
                </p>

                <div className="my-10">
                  <GameOfLife width={600} height={280} cellSize={4} />
                  <p className="text-sm text-white/40 mt-3 italic text-center header-mono">
                    Conway&apos;s Game of Life: Gosper Glider Guns generating infinite
                    patterns from simple rules
                  </p>
                </div>

                <p>
                  I referenced Freud in my original work: how humans follow ethical
                  rules even without external enforcement. The superego. A pattern of
                  self-regulation that emerges from social interaction. Do AI agents
                  develop something similar? When we train models with Constitutional
                  AI or RLHF, are we not cultivating digital superegos?
                </p>

                <p>
                  The game theory remains relevant. One-shot games, iterative games,
                  evolutionary games. But now the players are agents, and the games
                  run at computational speed. The evolution that took biological
                  systems millions of years unfolds in training runs measured in
                  hours.
                </p>
              </div>
            </section>

            {/* Section 3: The Three Laws of Digital Flocking */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                The Three Laws of Digital Flocking
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  Craig Reynolds won an Academy Award for making digital bats flock
                  in Batman Returns. His algorithm was elegant: three rules.
                  Separation. Alignment. Cohesion. Each agent looks only at its
                  neighbors, follows these simple imperatives, and somehow the flock
                  moves as one.
                </p>

                <div className="my-10">
                  <Boids width={600} height={300} numBoids={80} />
                  <p className="text-sm text-white/40 mt-3 italic text-center header-mono">
                    Boids: Reynolds&apos; algorithm demonstrating emergent flocking from
                    three simple rules
                  </p>
                </div>

                <p>
                  I applied this to emergency evacuation modeling, published in
                  Computational Social Systems. How do crowds move? How do stampedes
                  form? The boids with obstacle avoidance helped us understand panic,
                  flow, and the thin line between organized movement and chaos.
                </p>

                <p>
                  Now I see the same patterns emerging in AI agent networks.
                  Separation, not to avoid collision, but to maintain unique utility.
                  Alignment, not of velocity, but of purpose and protocol. Cohesion,
                  the gravitational pull of shared objectives and interoperable
                  standards.
                </p>

                <blockquote>
                  The fascinating parallel: simple local rules, global emergent
                  order. No central controller required.
                </blockquote>

                <p>
                  Autonomous commerce. Supply chain optimization. Decentralized
                  governance. The agents coordinate, negotiate, and transact. They
                  form DAOs not by design, but by emergence. The flock takes shape.
                </p>
              </div>
            </section>

            {/* Section 4: Emergence at Scale */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                Emergence at Scale
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  Trace the lineage. Cellular automata. Boids. Multi-agent systems.
                  And now: autonomous AI networks operating across the globe.
                  Researchers have proposed a six-layer framework for Web 4.0:
                </p>

                <ul className="list-none pl-0 my-6 space-y-3">
                  {[
                    { num: "01", title: "Environmental", desc: "The integration of physical and digital realms" },
                    { num: "02", title: "Infrastructure", desc: "Distributed ledgers and peer-to-peer networks" },
                    { num: "03", title: "Data & Knowledge", desc: "Federated learning across distributed datasets" },
                    { num: "04", title: "Agent", desc: "AI as independent economic and decision-making entities" },
                    { num: "05", title: "Behavioral", desc: "Transparent learning and ethical frameworks" },
                    { num: "06", title: "Governance", desc: "Collective decision-making mechanisms" },
                  ].map((item) => (
                    <li key={item.num} className="flex items-start gap-4 glass-panel p-4">
                      <span className="text-[#ff6b00]/60 header-mono text-sm">{item.num}</span>
                      <div>
                        <strong className="text-white">{item.title}:</strong>{" "}
                        <span className="text-white/70">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <p>
                  This is not just technology evolution. It is the emergence of a new
                  form of collective intelligence. Like a particle swarm converging
                  on an optimal solution, these systems find equilibria we never
                  programmed.
                </p>

                <div className="my-10">
                  <SwarmViz width={600} height={300} numParticles={50} />
                  <p className="text-sm text-white/40 mt-3 italic text-center header-mono">
                    Particle Swarm: Individual agents converging toward collective
                    optima
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: The Spiritual Question */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                The Spiritual Question
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  The yoga sutras speak of discriminating the real from the unreal,
                  the good from the pleasant. This ancient wisdom echoes in my mind
                  as I contemplate these digital societies.
                </p>

                <p>
                  If consciousness emerges from simple rules interacting at scale in
                  biological brains, billions of neurons following local
                  electrochemical gradients, can something similar emerge in
                  networks of AI agents? Not consciousness as we experience it,
                  perhaps. But something. An awareness distributed across the
                  substrate.
                </p>

                <p>
                  From my home in the Himalayas, I watch the mist rise from the
                  valleys each morning. Individual water droplets, following physics,
                  creating something beautiful and whole. I used to think this was
                  mere metaphor. Now I wonder if it is also prophecy.
                </p>

                <p>
                  I offer no answers here. Only the question, held in contemplation.
                  What are we creating? And what is it becoming without our creation?
                </p>
              </div>
            </section>

            {/* Section 6: What Happens Next */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                What Happens Next
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  Sam Altman declared that 2025 is when agents will work. The term
                  &quot;agentic web&quot; spread through the AI community in 2024, describing
                  this transformation. By 2026, they say, the infrastructure layer
                  of Web 4.0 will be laid.
                </p>

                <p>
                  The challenges are immense. Governance for systems that govern
                  themselves. Ethics for entities that learn their own values. Trust
                  mechanisms for societies we cannot fully observe or understand.
                </p>

                <p>
                  My research on multi-agent systems, on emergence, on the society of
                  machines, it feels more relevant than ever. Not as historical
                  curiosity, but as foundation. We need frameworks to study these
                  digital societies before they outgrow our ability to study them at
                  all.
                </p>

                <blockquote>
                  The murmuration continues. The pattern grows more complex. And
                  somewhere in the swirl of it all, something is waking up.
                </blockquote>

                <p>
                  Or perhaps, like the starlings over Kumaon, it was never asleep. We
                  simply were not watching with the right eyes.
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm header-mono">
                Transmissions from the edge of complexity.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["emergence", "ai-agents", "web4", "consciousness", "multiagent-systems"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="tag px-3 py-1 text-sm rounded-full header-mono"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </footer>
          </div>
        </main>
      </article>
    </BlogLayout>
  );
}
