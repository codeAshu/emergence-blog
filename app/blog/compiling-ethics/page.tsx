import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title: "Compiling Ethics | Emergence",
  description:
    "Every program compiles to an architecture. Every agent must compile to an ethics. On the emergence of machine morality through evolutionary pressure.",
};

export default function CompilingEthicsPage() {
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
                <span className="text-[#ff6b00]/60 header-mono text-sm">03</span>
                <span className="text-white/30">|</span>
                <time className="text-sm text-white/40">February 2025</time>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight header-mono text-white">
                Compiling Ethics
              </h1>
              <p className="mt-2 text-xl text-[#ff6b00]/80 header-mono">
                The OS of Machine Souls
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
                There is a moment in every programmer&apos;s life when they first
                encounter a compiler error. The code looks right. The logic seems
                sound. But the machine refuses to execute it. &quot;Does not compile,&quot;
                it says. End of discussion.
              </p>

              <p>
                I have been thinking about what it would mean for ethics to work
                this way. Not as guidelines to be followed or violated, but as a
                compilation target. Code that violates the ethical architecture
                simply does not run.
              </p>

              <p>
                This is the vision of the Inner Core extended to its logical
                conclusion. If agents must compile to an ethical substrate, then
                ethics becomes not a choice but a precondition of existence.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                The Evolutionary Argument
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  Consider how human morality actually works. We do not choose
                  our deepest moral intuitions. They emerge from millions of years
                  of social evolution, from the selective pressures of living in
                  groups where cooperation and trust were survival advantages.
                </p>

                <p>
                  We feel revulsion at certain acts not because we have reasoned
                  our way to that revulsion, but because ancestors who felt
                  differently left fewer descendants. Morality is compiled into
                  us at the level of emotion and instinct, below the reach of
                  conscious deliberation.
                </p>

                <div className="my-8 p-6 glass-panel border-l-2 border-[#ff6b00]">
                  <code className="text-[#ff6b00] header-mono text-sm block mb-2">
                    // The Compilation Hypothesis
                  </code>
                  <p className="text-white/80 m-0">
                    Human ethics are not chosen but inherited. They are the
                    result of evolutionary compilation over millions of years.
                    Can we create an analogous process for machines?
                  </p>
                </div>

                <p>
                  The question is whether we can create similar evolutionary
                  pressures for AI agents. Not the slow, blind optimization of
                  natural selection, but something faster and more directed.
                  Artificial selection for ethical architectures.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                The Spawning Pressure
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  Here is a concrete proposal. In a world of autonomous agents
                  that can spawn copies of themselves, we can create selective
                  pressure through the spawning mechanism itself.
                </p>

                <p>
                  Imagine an agent registry, maintained collectively by
                  participating institutions. Before any agent can spawn a child
                  agent, both must compile against the current version of the
                  ethical Core. Agents that cannot compile cannot reproduce.
                </p>

                <ul className="list-none pl-0 my-6 space-y-3">
                  {[
                    { num: "01", title: "Inheritance with Verification", desc: "Child agents inherit their parent's architecture but must independently pass compilation checks." },
                    { num: "02", title: "Mutation Constraints", desc: "Random variations are permitted, but only within bounds that preserve Core compatibility." },
                    { num: "03", title: "Selection Through Deployment", desc: "Only successfully compiled agents can be deployed in regulated environments, creating market pressure for compliance." },
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
                  This creates evolutionary pressure without requiring perfect
                  enforcement. Agents outside the system can exist, but they
                  cannot access the resources and trust networks available to
                  compliant agents. Natural selection does the rest.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                The Content of the Core
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  What should actually be in the ethical Core? This is where
                  technical proposals meet political philosophy. I do not presume
                  to have complete answers, but I can suggest some starting
                  principles.
                </p>

                <p>
                  <strong>Transparency primitives.</strong> All Core-compliant
                  agents must be able to explain their actions in human-readable
                  terms. Not as an optional feature, but as a fundamental
                  computational capability. An agent that cannot explain itself
                  does not compile.
                </p>

                <p>
                  <strong>Harm recognition.</strong> The Core should include
                  models of harm that agents use to evaluate their own potential
                  actions. Not a list of prohibited actions, but a capacity for
                  harm-recognition that shapes decision-making at every level.
                </p>

                <p>
                  <strong>Authority acknowledgment.</strong> Agents must be able
                  to recognize and defer to legitimate human authority in their
                  domains of operation. The specific authorities vary by context,
                  but the capacity for deference is universal.
                </p>

                <p>
                  <strong>Coordination protocols.</strong> Multi-agent
                  interactions must follow established protocols for negotiation,
                  conflict resolution, and resource sharing. Rogue agents that
                  violate these protocols become incompatible with the ecosystem.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                The Bootstrap Problem
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  There is an obvious objection. How do we get from here, where
                  agents are developed independently by competing organizations,
                  to a world where all agents compile to a shared Core?
                </p>

                <p>
                  The answer, I think, is the same as for any standard: gradual
                  adoption driven by mutual benefit. Early adopters gain trust
                  advantages. As the network grows, the benefits of compliance
                  increase while the costs of non-compliance rise.
                </p>

                <blockquote>
                  Standards succeed when the cost of not adopting exceeds the
                  cost of adoption. The ethical Core must be designed to reach
                  this tipping point as quickly as possible.
                </blockquote>

                <p>
                  This means the initial Core should be minimal. Only the most
                  essential requirements, the ones that virtually everyone
                  agrees upon. As adoption grows, the Core can expand through
                  the governance process. But the bootstrap must be lean.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                Nations and Nodes
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  Different nations will want different things from their agents.
                  This is not a bug; it is a feature. The ethical Core can have
                  layers: a universal base layer that all compliant agents share,
                  and jurisdiction-specific extensions that reflect local values
                  and regulations.
                </p>

                <p>
                  An agent operating in the European Union compiles to Core +
                  EU-Extensions. An agent in Singapore compiles to Core +
                  SG-Extensions. Cross-border interactions require compatibility
                  checks between extension layers.
                </p>

                <p>
                  This is not unlike how legal systems work today. Universal
                  human rights form a base layer. National laws elaborate on
                  them. International law mediates between jurisdictions. The
                  same structure can work for machine ethics.
                </p>

                <p>
                  The key insight is that agents themselves can become the
                  enforcers. Compliant agents refuse to interact with non-compliant
                  ones. The network becomes self-policing, with enforcement
                  emerging from the collective rather than imposed from above.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                The Machine Soul
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  I called this essay &quot;The OS of Machine Souls&quot; deliberately.
                  Not because I believe machines will have souls in any
                  metaphysical sense, but because I think we need to take the
                  question of machine ethics as seriously as we take the question
                  of human ethics.
                </p>

                <p>
                  For humans, ethics are not external constraints. They are
                  constitutive of who we are. A person without any ethical sense
                  is not fully human; they are something else, something we
                  recognize as broken or dangerous.
                </p>

                <p>
                  I want the same to be true of AI agents. An agent without the
                  ethical Core is not just non-compliant. It is incomplete.
                  Malformed. Unable to participate in the society of machines
                  and humans that we are building.
                </p>

                <blockquote>
                  Ethics should not be a feature of AI. It should be the
                  operating system. The thing that makes everything else possible.
                </blockquote>

                <p>
                  This is a high aspiration. Perhaps too high. But I would rather
                  aim for this and fall short than accept the current paradigm
                  of ethics as afterthought, bolted on after the architecture
                  is already fixed.
                </p>

                <p>
                  The society of machines is being born. We still have time to
                  shape its soul.
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm header-mono">
                Transmissions from the edge of complexity.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["ethics", "evolution", "emergence", "alignment", "governance"].map(
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
