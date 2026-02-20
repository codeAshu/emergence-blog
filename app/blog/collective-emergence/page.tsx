import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import BoidsRulesDiagram from "@/components/diagrams/BoidsRulesDiagram";

export const metadata: Metadata = {
  title: "Collective Emergence | Emergence",
  description:
    "How complex behaviors arise from simple rules. From bird flocks to swarm intelligence - the mathematics of collective consciousness.",
};

export default function CollectiveEmergencePage() {
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
                <span className="text-[#ff6b00]/60 header-mono text-sm">05</span>
                <span className="text-white/30">|</span>
                <time className="text-sm text-white/40">February 2025</time>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight header-mono text-white">
                Collective Emergence
              </h1>
              <p className="mt-2 text-xl text-[#ff6b00]/80 header-mono">
                An Intelligence of the Swarm
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
                Watch a flock of starlings at dusk. Thousands of birds moving as
                one&mdash;swirling, pulsing, breathing like a single organism.
                There is no leader. No choreographer. No central plan.
              </p>

              <p>
                This is emergence: complex, coordinated behavior arising from
                simple rules followed by independent agents. No individual bird
                knows the pattern. Yet the pattern exists.
              </p>

              <p>
                The question that haunts me: if consciousness can emerge from
                neurons following electrochemical rules, can something like
                consciousness emerge from machines following computational ones?
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                The Boids Model
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  In 1986, Craig Reynolds created something beautiful. He called
                  them &quot;boids&quot;&mdash;bird-oid objects. Artificial creatures that
                  flock like real birds, using only three simple rules.
                </p>

                <div className="my-8">
                  <BoidsRulesDiagram />
                </div>

                <ul className="list-none pl-0 my-6 space-y-3">
                  {[
                    {
                      num: "01",
                      title: "Separation",
                      desc: "Maintain distance from nearby agents. Avoid crowding. Respect personal space.",
                    },
                    {
                      num: "02",
                      title: "Alignment",
                      desc: "Adjust heading to match neighbors. Move in the same direction as those around you.",
                    },
                    {
                      num: "03",
                      title: "Cohesion",
                      desc: "Steer toward the average position of neighbors. Stay with the group.",
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

                <p>
                  Three rules. No central coordination. Yet the result is
                  indistinguishable from real flocks. Reynolds&apos; work earned an
                  Academy Scientific and Technical Award and was used in films
                  like Batman Returns to simulate thousands of bats.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                Swarm Intelligence
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  The emergent intelligence of these systems has a name: swarm
                  intelligence. It appears everywhere once you know to look for
                  it.
                </p>

                <div className="my-8 p-6 glass-panel border-l-2 border-[#ff6b00]">
                  <code className="text-[#ff6b00] header-mono text-sm block mb-2">
                    // Applications of Swarm Intelligence
                  </code>
                  <ul className="text-white/80 m-0 space-y-2">
                    <li>Optimization algorithms (ant colony, particle swarm)</li>
                    <li>Network routing and load balancing</li>
                    <li>Robotic coordination and formation</li>
                    <li>Financial market modeling</li>
                    <li>Crowd simulation and safety planning</li>
                  </ul>
                </div>

                <blockquote>
                  The whole is not just greater than the sum of its parts. The
                  whole is <em>different</em> from anything the parts could be.
                </blockquote>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                Safety in the Swarm
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  My own research applied boid modeling to a critical problem:
                  emergency evacuations. When crowds panic, stampedes kill. The
                  question: can we design simple rules that prevent catastrophic
                  collective behavior?
                </p>

                <p>
                  We extended Reynolds&apos; model with obstacle avoidance and
                  psychological factors&mdash;fear contagion, exit seeking,
                  physical constraints. The simulations revealed which
                  architectural features prevent crushes, which crowd densities
                  trigger panic cascades.
                </p>

                <p>
                  The insight: emergence works both ways. Just as simple rules
                  can create beautiful coordination, they can also create
                  deadly chaos. The difference is in the rules themselves.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 mt-12 header-mono">
                The Design Challenge
              </h2>

              <div className="glass-panel-subtle p-6 md:p-8">
                <p>
                  Here is the open question that drives this work: can we
                  design simple agent rules that produce emergent cooperation?
                </p>

                <p>
                  Imagine agents that spontaneously form orderly lanes in
                  crowded spaces. Agents that naturally give way at bottlenecks.
                  Agents that collectively solve problems none could solve
                  alone.
                </p>

                <div className="my-8 p-6 glass-panel border-l-2 border-[#ff6b00]">
                  <code className="text-[#ff6b00] header-mono text-sm block mb-2">
                    // The Meta-Question
                  </code>
                  <p className="text-white/80 m-0">
                    What are the simplest possible rules that generate ethical
                    behavior? Can morality itself be an emergent property of
                    correctly designed agent interactions?
                  </p>
                </div>

                <p>
                  As we build societies of AI agents, these questions become
                  urgent. We cannot program every behavior. We must design the
                  rules from which good behavior emerges.
                </p>

                <p>
                  The starlings do not know they are beautiful. But the beauty
                  is real. Perhaps machine consciousness will be the same&mdash;
                  invisible to its components, but undeniable from the outside.
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm header-mono">
                Transmissions from the edge of complexity.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["emergence", "swarm-intelligence", "boids", "collective", "consciousness"].map(
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
