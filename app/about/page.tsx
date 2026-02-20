import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title: "About | Emergence",
  description: "Builder at the edge of complexity.",
};

export default function AboutPage() {
  return (
    <BlogLayout>
      <div className="min-h-screen">
        <header className="pt-12 pb-8 px-6 md:px-8">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#ff6b00] transition-colors header-mono"
            >
              <span>&larr;</span>
              <span>back</span>
            </Link>
          </div>
        </header>

        <main className="px-6 md:px-8 pb-24">
          <div className="max-w-2xl mx-auto">
            {/* Identity Block */}
            <div className="glass-panel p-8 md:p-12 mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-3 h-3 rounded-full bg-[#ff6b00] pulse-glow" />
                <div className="w-3 h-3 rounded-full bg-[#ff6b00]/50" />
                <div className="w-3 h-3 rounded-full bg-[#ff6b00]/25" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight header-mono text-white mb-2">
                Ashutosh Trivedi
              </h1>
              <p className="text-[#ff6b00]/70 header-mono text-lg">
                ashu
              </p>

              <div className="mt-8 space-y-1 text-white/40 header-mono text-sm">
                <p>builder</p>
                <p>seeker</p>
                <p>observer of patterns</p>
              </div>
            </div>

            {/* Philosophy */}
            <section className="mb-12">
              <div className="glass-panel-subtle p-6 md:p-8">
                <p className="text-xl text-white/80 leading-relaxed">
                  Beauty emerges when complex systems are made simple to use.
                </p>
                <p className="mt-6 text-white/50">
                  I build at the intersection of machine learning and distributed
                  systems. I think about emergence, consciousness, and the
                  mathematics that connects them.
                </p>
                <p className="mt-4 text-white/50">
                  The questions that keep me awake: What patterns persist across
                  scales? Where does order come from? Can we design systems that
                  are more than the sum of their parts?
                </p>
              </div>
            </section>

            {/* Interests */}
            <section className="mb-12">
              <h2 className="text-sm text-[#ff6b00]/60 uppercase tracking-wider header-mono mb-4">
                Territories
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "philosophy",
                  "mathematics",
                  "physics",
                  "music",
                  "emergence",
                  "consciousness",
                  "multi-agent systems",
                  "distributed computing",
                ].map((interest) => (
                  <div
                    key={interest}
                    className="glass-panel p-3 text-center text-white/60 text-sm header-mono"
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </section>

            {/* Signal */}
            <section className="mb-12">
              <h2 className="text-sm text-[#ff6b00]/60 uppercase tracking-wider header-mono mb-4">
                Signal
              </h2>
              <div className="glass-panel-subtle p-6 space-y-4">
                <a
                  href="https://twitter.com/ashu_trv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-white/50 hover:text-[#ff6b00] transition-colors group"
                >
                  <span className="header-mono">twitter</span>
                  <span className="text-white/20 group-hover:text-[#ff6b00]/50 transition-colors">
                    @ashu_trv
                  </span>
                </a>
                <div className="border-t border-white/5" />
                <a
                  href="https://github.com/codeAshu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-white/50 hover:text-[#ff6b00] transition-colors group"
                >
                  <span className="header-mono">github</span>
                  <span className="text-white/20 group-hover:text-[#ff6b00]/50 transition-colors">
                    codeAshu
                  </span>
                </a>
                <div className="border-t border-white/5" />
                <a
                  href="https://linkedin.com/in/ashutoshtrivedi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-white/50 hover:text-[#ff6b00] transition-colors group"
                >
                  <span className="header-mono">linkedin</span>
                  <span className="text-white/20 group-hover:text-[#ff6b00]/50 transition-colors">
                    ashutoshtrivedi
                  </span>
                </a>
              </div>
            </section>

            {/* Coordinates */}
            <section className="mb-12">
              <div className="glass-panel p-6 border-l-2 border-[#ff6b00]/30">
                <p className="text-white/30 text-sm header-mono">
                  coordinates unknown
                </p>
                <p className="text-white/50 mt-2 text-sm">
                  Somewhere between the mountains and the machine.
                </p>
              </div>
            </section>

            {/* Transmission */}
            <footer className="text-center">
              <p className="text-white/20 text-xs header-mono">
                this signal originates from the edge of complexity
              </p>
            </footer>
          </div>
        </main>
      </div>
    </BlogLayout>
  );
}
