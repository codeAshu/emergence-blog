import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import GameTheoryDiagram from "@/components/diagrams/GameTheoryDiagram";

export const metadata: Metadata = {
  title: "Autonomy and Choice | Emergence",
  description:
    "Why do humans struggle with complex decisions? A framework for understanding choice through game theory and multi-agent systems.",
};

export default function AutonomyAndChoicePage() {
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
                <span className="text-[#ff6b00]/60 header-mono text-sm">04</span>
                <span className="text-white/30">|</span>
                <time className="text-sm text-white/40">February 2025</time>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight header-mono text-white">
                Autonomy and Choice
              </h1>
              <p className="mt-2 text-xl text-[#ff6b00]/80 header-mono">
                Game Theory of Decision-Making Agents
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
            <section className="mb-16 glass-panel-subtle p-6 md:p-8">
              <p className="text-xl leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#ff6b00]">
                Why do humans struggle with complex decisions? We face cognitive
                overload when rationality, emotion, and belief collide. Yet simpler
                choices&mdash;eating when hungry, sleeping when tired&mdash;require no
                conscious deliberation. They are instinct.
              </p>

              <p>
                Here lies the distinction that matters for artificial agents:
                machines executing trained behaviors lack free will and genuine
                choice, even when performing intelligently. They do what they do.
                Some machines do intelligent things, but not with choice.
              </p>

              <p>
                True autonomy requires something deeper: the ability to refrain
                from deciding. The power of &quot;not yet.&quot;
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                Life as a Game
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  Every decision we make can be reframed as a game. Not in the
                  trivial sense, but in the mathematical sense&mdash;strategic
                  interactions with rules, players, and payoffs.
                </p>

                <div className="my-8">
                  <GameTheoryDiagram />
                </div>

                <ul className="list-none pl-0 my-6 space-y-3">
                  {[
                    {
                      num: "01",
                      title: "One-Shot Games",
                      desc: "Decisions made once with lasting consequences. Choosing a graduate school. Accepting a job offer. Getting married. No replay, no iteration.",
                    },
                    {
                      num: "02",
                      title: "Iterative Games",
                      desc: "Repeated interactions with incremental learning. Your daily commute. Negotiations with colleagues. Each round informs the next.",
                    },
                    {
                      num: "03",
                      title: "Evolutionary Games",
                      desc: "Complex systems with multiple agents, changing conditions, and strategies that evolve over generations. Markets. Ecosystems. Societies.",
                    },
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
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                Multi-Agent Systems
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  When multiple agents interact&mdash;each pursuing objectives
                  while affecting others&mdash;we enter the realm of Multi-Agent
                  Systems. This is where individual rationality meets collective
                  complexity.
                </p>

                <div className="my-8 p-6 glass-panel border-l-2 border-[#ff6b00]">
                  <code className="text-[#ff6b00] header-mono text-sm block mb-2">
                    // Components of a Multi-Agent System
                  </code>
                  <ul className="text-white/80 m-0 space-y-2">
                    <li>Available actions for each agent</li>
                    <li>Payoff structures (gains and losses)</li>
                    <li>Conflicting or cooperative interests</li>
                    <li>Environmental constraints and resources</li>
                  </ul>
                </div>

                <p>
                  The fascinating property of these systems: <em>emergence</em>.
                  Individual agents pursuing self-interest create system-wide
                  outcomes that nobody explicitly programmed.
                </p>

                <blockquote>
                  Emergence can be designed as the global objective, and the whole
                  system tries to achieve it through local interactions alone.
                </blockquote>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                The Traffic Problem
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  Consider urban traffic&mdash;a perfect example of multi-agent
                  complexity. Each commuter is an agent with a simple objective:
                  minimize travel time. Yet the collective behavior creates
                  congestion that hurts everyone.
                </p>

                <p>
                  How do you reduce traffic without commanding each driver? You
                  change the game. Adjust transport fares across modes. Add
                  incentives for off-peak travel. Balance accessibility, capacity,
                  and equity through mechanism design.
                </p>

                <p>
                  The solution emerges from aligned incentives, not central
                  control. Each agent still chooses freely, but the game has
                  changed beneath them.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                From Iteration to Evolution
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  The practical insight: identify the iterative games in your
                  life. Your recurring negotiations. Your repeated interactions.
                  These are opportunities for strategic evolution.
                </p>

                <p>
                  Can you convert an iterative game into an evolutionary one?
                  Instead of just learning from each round, can you change the
                  rules themselves? This is the meta-game&mdash;the game about
                  games.
                </p>

                <div className="my-8 p-6 glass-panel border-l-2 border-[#ff6b00]">
                  <code className="text-[#ff6b00] header-mono text-sm block mb-2">
                    // The Meta-Question
                  </code>
                  <p className="text-white/80 m-0">
                    When AI agents begin playing these games with us, what new
                    equilibria will emerge? What happens when machines can iterate
                    faster than humans can adapt?
                  </p>
                </div>

                <p>
                  Human decision-making in multi-agent contexts requires
                  understanding both rational choice and strategic interaction.
                  For designing effective AI systems, this is not optional. It is
                  foundational.
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm header-mono">
                Transmissions from the edge of complexity.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["game-theory", "autonomy", "multi-agent", "decision-making", "emergence"].map(
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
