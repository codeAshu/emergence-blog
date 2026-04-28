import type { Metadata } from "next";
import BlogLayout from "@/components/BlogLayout";
import BlogPostHeader from "@/components/BlogPostHeader";
import BlogPostFooter from "@/components/BlogPostFooter";
import GameTheoryDiagram from "@/components/diagrams/GameTheoryDiagram";

export const metadata: Metadata = {
  title: "Autonomy and Choice | Emergence",
  description:
    "Why do humans struggle with complex decisions? A framework for understanding choice through game theory and multi-agent systems.",
  openGraph: {
    title: "Autonomy and Choice: Game Theory of Decision-Making Agents",
    description: "Why do humans struggle with complex decisions? A framework for understanding choice through game theory.",
    type: "article",
    publishedTime: "2025-02-22",
    authors: ["Ashutosh Trivedi"],
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autonomy and Choice: Game Theory of Decision-Making Agents",
    description: "Why do humans struggle with complex decisions? A framework for understanding choice through game theory.",
    images: ["/og-image.png"],
  },
};

export default function AutonomyAndChoicePage() {
  return (
    <BlogLayout>
      <article className="min-h-screen">
        <BlogPostHeader
          title="Autonomy and Choice: Game Theory of Decision-Making Agents"
          date="February 22, 2025"
        />

        {/* Content */}
        <main className="px-6 md:px-8 py-12">
          <div className="max-w-4xl mx-auto prose-emergence">
            <section className="mb-12">
              <p>
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

            <section className="mb-12">
              <h2>
                Life as a Game
              </h2>

              <p>
                Every decision we make can be reframed as a game. Not in the
                trivial sense, but in the mathematical sense&mdash;strategic
                interactions with rules, players, and payoffs.
              </p>

              <div className="my-8">
                <GameTheoryDiagram />
              </div>

              <p>
                Game theory distinguishes three fundamental categories. <strong>One-shot games</strong> are
                decisions made once with lasting consequences: choosing a graduate school, accepting
                a job offer, getting married. No replay, no iteration. <strong>Iterative games</strong> involve
                repeated interactions with incremental learning: your daily commute, negotiations
                with colleagues, each round informing the next. <strong>Evolutionary games</strong> are
                complex systems with multiple agents, changing conditions, and strategies that
                evolve over generations: markets, ecosystems, societies.
              </p>
            </section>

            <section className="mb-12">
              <h2>
                Multi-Agent Systems
              </h2>

              <p>
                When multiple agents interact&mdash;each pursuing objectives
                while affecting others&mdash;we enter the realm of Multi-Agent
                Systems. This is where individual rationality meets collective
                complexity.
              </p>

              <p>
                The components of such systems include: available actions for each agent,
                payoff structures defining gains and losses, conflicting or cooperative
                interests, and environmental constraints and resources. The fascinating
                property of these systems is <em>emergence</em>. Individual agents pursuing
                self-interest create system-wide outcomes that nobody explicitly programmed.
              </p>

              <blockquote>
                Emergence can be designed as the global objective, and the whole
                system tries to achieve it through local interactions alone.
              </blockquote>
            </section>

            <section className="mb-12">
              <h2>
                The Traffic Problem
              </h2>

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
            </section>

            <section className="mb-12">
              <h2>
                From Iteration to Evolution
              </h2>

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

              <blockquote>
                When AI agents begin playing these games with us, what new
                equilibria will emerge? What happens when machines can iterate
                faster than humans can adapt?
              </blockquote>

              <p>
                Human decision-making in multi-agent contexts requires
                understanding both rational choice and strategic interaction.
                For designing effective AI systems, this is not optional. It is
                foundational.
              </p>
            </section>

            <BlogPostFooter date="February 2025" />
          </div>
        </main>
      </article>
    </BlogLayout>
  );
}
