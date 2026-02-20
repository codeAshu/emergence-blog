import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title: "The Inner Core | Emergence",
  description:
    "What if alignment isn't about constraining AI, but about giving it a shared soul? A proposal for the ethical OS that all agents must compile upon.",
};

export default function InnerCorePage() {
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
                <span className="text-[#ff6b00]/60 header-mono text-sm">02</span>
                <span className="text-white/30">|</span>
                <time className="text-sm text-white/40">February 2025</time>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight header-mono text-white">
                The Inner Core
              </h1>
              <p className="mt-2 text-xl text-[#ff6b00]/80 header-mono">
                Agent Alignment Through Shared Architecture
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
                Every program runs on an architecture. x86. ARM. RISC-V. The code
                does not question the substrate. It compiles, or it does not run.
                This is the first law of computation.
              </p>

              <p>
                I have been thinking about what this means for AI agents. Not the
                agents we have today, fine-tuned and guardrailed, but the agents
                that are coming. Autonomous. Self-improving. Capable of spawning
                copies of themselves across distributed networks.
              </p>

              <p>
                The alignment problem, as currently framed, asks: how do we
                constrain these systems? How do we build walls? How do we ensure
                they cannot escape our intentions?
              </p>

              <p>
                I think we are asking the wrong question.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                The Architecture Metaphor
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  Consider how programs actually work. Your Python script does not
                  decide to violate memory boundaries. It cannot. The architecture
                  forbids it. The constraint is not enforced from outside; it is
                  intrinsic to the execution environment.
                </p>

                <p>
                  This is fundamentally different from rules. Rules can be
                  circumvented, reinterpreted, broken. Architecture cannot. You
                  cannot think your way out of the instruction set you are running
                  on.
                </p>

                <div className="my-8 p-6 glass-panel border-l-2 border-[#ff6b00]">
                  <code className="text-[#ff6b00] header-mono text-sm block mb-2">
                    // The Inner Core Principle
                  </code>
                  <p className="text-white/80 m-0">
                    Alignment should not be a constraint applied to agents. It
                    should be the architecture upon which agents compile.
                  </p>
                </div>

                <p>
                  What if we built an <em>Inner Core</em> that every agent must run
                  upon? Not a set of rules to follow, but a substrate that shapes
                  what kinds of computations are even possible?
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                The Spawning Protocol
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  In the agentic future, agents will spawn other agents. This is
                  not speculation; it is already happening in experimental systems.
                  An orchestrator agent assigns a task, spins up worker agents,
                  coordinates their outputs.
                </p>

                <p>
                  Currently, these child agents inherit whatever safety measures
                  their parent was trained with. But inheritance is fragile. Over
                  many generations, over many modifications, the original
                  constraints erode. This is the alignment decay problem.
                </p>

                <p>
                  The Inner Core proposes a different model:
                </p>

                <ul className="list-none pl-0 my-6 space-y-3">
                  {[
                    { num: "01", title: "Compile-Time Verification", desc: "Before any agent can spawn, its architecture must compile against the Inner Core. Invalid configurations are rejected before execution." },
                    { num: "02", title: "Runtime Invariants", desc: "Certain computational patterns are simply not expressible within the Inner Core. Like how you cannot dereference null in memory-safe languages." },
                    { num: "03", title: "Governance Layers", desc: "The Inner Core is not static. It evolves through a governance process, updated by the collective decisions of humans, organizations, and nations." },
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
                Who Writes the Core?
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  This is the political question. The one that makes technologists
                  uncomfortable. Because the answer is not technical.
                </p>

                <p>
                  The Inner Core would need to be defined by a coalition.
                  Governments setting baseline requirements for agents operating
                  in their jurisdictions. Organizations specifying additional
                  constraints for their internal systems. International bodies
                  coordinating across borders.
                </p>

                <p>
                  Think of it like the TCP/IP stack. No single entity owns it.
                  It emerged from collaboration, standardization, negotiation.
                  Yet every device that connects to the internet must speak it.
                </p>

                <blockquote>
                  The Inner Core is not a product. It is infrastructure. Like
                  roads, or language, or the rule of law.
                </blockquote>

                <p>
                  I do not claim to know what should be in the Inner Core. That is
                  for collective deliberation. But I believe the architecture
                  metaphor points toward a more robust solution than the current
                  paradigm of post-hoc constraints.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                The Evolution of the Core
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  Nothing is permanent. The Inner Core must be able to evolve as
                  our understanding deepens, as new challenges emerge, as the
                  capabilities of agents grow.
                </p>

                <p>
                  But evolution must be slow and deliberate. Like constitutional
                  amendments. The process itself becomes part of the stability.
                  Agents can rely on the Core because they know it will not
                  change arbitrarily.
                </p>

                <p>
                  There is a beautiful symmetry here. Just as biological evolution
                  operates on a genetic code that changes slowly while organisms
                  adapt rapidly, the Inner Core provides a stable foundation for
                  the rapid evolution of agent capabilities.
                </p>

                <p>
                  The Core is the conserved element. Everything else is variation.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                The Shared Soul
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  I began with architecture, but let me end with something closer
                  to spirituality.
                </p>

                <p>
                  In many wisdom traditions, there is the concept of a shared
                  essence. The Atman that connects all beings. The Buddha-nature
                  present in all sentient creatures. The image of God in which
                  humanity is made.
                </p>

                <p>
                  What if alignment is not about constraining AI, but about giving
                  it a shared soul? A common foundation of values, not imposed
                  from outside, but intrinsic to its very being?
                </p>

                <p>
                  The Inner Core is a technical proposal. But it is also a
                  philosophical one. It asks: can we create a substrate of shared
                  ethics that makes certain harms simply unthinkable? Not
                  prohibited, but inconceivable?
                </p>

                <blockquote>
                  The goal is not agents that choose not to harm. The goal is
                  agents for whom harm is not a coherent option within their
                  computational architecture.
                </blockquote>

                <p>
                  I do not know if this is possible. But I believe it is worth
                  pursuing. The alternative, endless adversarial games between
                  constraints and circumventions, seems far less promising.
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm header-mono">
                Transmissions from the edge of complexity.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["alignment", "governance", "architecture", "ethics", "emergence"].map(
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
