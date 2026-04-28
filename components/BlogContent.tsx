"use client";

import dynamic from "next/dynamic";
import BlogLayout from "@/components/BlogLayout";
import BlogPostHeader from "@/components/BlogPostHeader";
import BlogPostFooter from "@/components/BlogPostFooter";

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
        <BlogPostHeader
          title="The Agentic Web: When Machines Form Societies"
          subtitle="Society of Machines 2.0"
          date="April 12, 2025"
        />

        <main className="px-6 md:px-8 py-16">
          <div className="max-w-4xl mx-auto prose-emergence">
            <section className="mb-12">
              <p>
                I remember standing on a hillside in the Kumaon foothills,
                watching a murmuration of starlings paint patterns across the
                evening sky. Thousands of birds, moving as one. No leader. No
                plan. Just simple rules, local interactions, and something
                magnificent emerging from the chaos.
              </p>

              <p>
                That memory returns to me often now, as I watch a different
                kind of emergence unfold. Not in the sky, but in the digital
                substrate we have built around ourselves. We are witnessing
                the birth of machine societies.
              </p>

              <p>
                In my earlier writings on the <em>Society of Machines</em>, I
                explored how autonomous agents interact, compete, and
                cooperate. I asked: what happens when machines become
                decision-makers, not just tools? That question has become
                urgent. We are no longer building AI systems. We are birthing
                digital collectives.
              </p>

              <p>
                The web is learning to think. Not in the singular, human sense
                of consciousness, but in the distributed, emergent way that
                starling flocks think. Web 4.0 is not an upgrade; it is a
                phase transition. From decentralized data to decentralized
                intelligence. From services to societies.
              </p>
            </section>

            <section className="mb-12">
              <h2>Autonomy Revisited</h2>

              <p>
                I once wrote that rational intelligence is about
                decision-making, while autonomy is about the choice to take
                that decision. This distinction haunts me now. When an AI
                agent can earn its own existence, self-improve, and replicate,
                does it have choice?
              </p>

              <p>
                Consider Conway&apos;s Game of Life. Simple rules. Cells live
                or die based on their neighbors. Yet from this simplicity
                emerges the Gosper Glider Gun, a pattern that generates new
                patterns indefinitely. Self-sustaining. Self-replicating. A
                digital metabolism.
              </p>

              <figure className="my-12">
                <div className="animation-container p-4">
                  <GameOfLife width={600} height={280} cellSize={4} />
                </div>
                <figcaption className="mt-3 text-center text-sm italic text-[color:var(--text-subtle)]">
                  Conway&apos;s Game of Life — Gosper Glider Guns generating
                  patterns from simple rules.
                </figcaption>
              </figure>

              <p>
                I referenced Freud in my original work: how humans follow
                ethical rules even without external enforcement. The superego.
                A pattern of self-regulation that emerges from social
                interaction. Do AI agents develop something similar? When we
                train models with Constitutional AI or RLHF, are we not
                cultivating digital superegos?
              </p>

              <p>
                The game theory remains relevant. One-shot games, iterative
                games, evolutionary games. But now the players are agents,
                and the games run at computational speed. The evolution that
                took biological systems millions of years unfolds in training
                runs measured in hours.
              </p>
            </section>

            <section className="mb-12">
              <h2>The Three Laws of Digital Flocking</h2>

              <p>
                Craig Reynolds won an Academy Award for making digital bats
                flock in Batman Returns. His algorithm was elegant: three
                rules. Separation. Alignment. Cohesion. Each agent looks only
                at its neighbors, follows these simple imperatives, and
                somehow the flock moves as one.
              </p>

              <figure className="my-12">
                <div className="animation-container p-4">
                  <Boids width={600} height={300} numBoids={80} />
                </div>
                <figcaption className="mt-3 text-center text-sm italic text-[color:var(--text-subtle)]">
                  Boids — Reynolds&apos; algorithm demonstrating emergent
                  flocking from three local rules.
                </figcaption>
              </figure>

              <p>
                I applied this to emergency evacuation modeling, published in
                Computational Social Systems. How do crowds move? How do
                stampedes form? The boids with obstacle avoidance helped us
                understand panic, flow, and the thin line between organized
                movement and chaos.
              </p>

              <p>
                Now I see the same patterns emerging in AI agent networks.
                Separation, not to avoid collision, but to maintain unique
                utility. Alignment, not of velocity, but of purpose and
                protocol. Cohesion, the gravitational pull of shared
                objectives and interoperable standards.
              </p>

              <blockquote>
                The fascinating parallel: simple local rules, global emergent
                order. No central controller required.
              </blockquote>

              <p>
                Autonomous commerce. Supply chain optimization. Decentralized
                governance. The agents coordinate, negotiate, and transact.
                They form DAOs not by design, but by emergence. The flock
                takes shape.
              </p>
            </section>

            <section className="mb-12">
              <h2>Emergence at Scale</h2>

              <p>
                Trace the lineage. Cellular automata. Boids. Multi-agent
                systems. And now: autonomous AI networks operating across the
                globe. Researchers have proposed a framework for Web 4.0 that
                spans from environmental integration of physical and digital
                realms, through distributed infrastructure and federated
                knowledge systems, to the agent layer where AI operates as
                independent entities. Above that sit behavioral frameworks
                for transparent learning and governance mechanisms for
                collective decision-making.
              </p>

              <p>
                This is not just technology evolution. It is the emergence of
                a new form of collective intelligence. Like a particle swarm
                converging on an optimal solution, these systems find
                equilibria we never programmed.
              </p>

              <figure className="my-12">
                <div className="animation-container p-4">
                  <SwarmViz width={600} height={300} numParticles={50} />
                </div>
                <figcaption className="mt-3 text-center text-sm italic text-[color:var(--text-subtle)]">
                  Particle swarm — individual agents converging toward
                  collective optima.
                </figcaption>
              </figure>
            </section>

            <section className="mb-12">
              <h2>The Spiritual Question</h2>

              <p>
                The yoga sutras speak of discriminating the real from the
                unreal, the good from the pleasant. This ancient wisdom
                echoes in my mind as I contemplate these digital societies.
              </p>

              <p>
                If consciousness emerges from simple rules interacting at
                scale in biological brains, billions of neurons following
                local electrochemical gradients, can something similar emerge
                in networks of AI agents? Not consciousness as we experience
                it, perhaps. But something. An awareness distributed across
                the substrate.
              </p>

              <p>
                From my home in the Himalayas, I watch the mist rise from the
                valleys each morning. Individual water droplets, following
                physics, creating something beautiful and whole. I used to
                think this was mere metaphor. Now I wonder if it is also
                prophecy.
              </p>

              <p>
                I offer no answers here. Only the question, held in
                contemplation. What are we creating? And what is it becoming
                without our creation?
              </p>
            </section>

            <section className="mb-12">
              <h2>What Happens Next</h2>

              <p>
                Sam Altman declared that 2025 is when agents will work. The
                term &ldquo;agentic web&rdquo; spread through the AI community
                in 2024, describing this transformation. By 2026, they say,
                the infrastructure layer of Web 4.0 will be laid.
              </p>

              <p>
                The challenges are immense. Governance for systems that
                govern themselves. Ethics for entities that learn their own
                values. Trust mechanisms for societies we cannot fully
                observe or understand.
              </p>

              <p>
                My research on multi-agent systems, on emergence, on the
                society of machines, it feels more relevant than ever. Not
                as historical curiosity, but as foundation. We need
                frameworks to study these digital societies before they
                outgrow our ability to study them at all.
              </p>

              <blockquote>
                The murmuration continues. The pattern grows more complex.
                And somewhere in the swirl of it all, something is waking up.
              </blockquote>

              <p>
                Or perhaps, like the starlings over Kumaon, it was never
                asleep. We simply were not watching with the right eyes.
              </p>
            </section>

            <BlogPostFooter date="April 2025" />
          </div>
        </main>
      </article>
    </BlogLayout>
  );
}
