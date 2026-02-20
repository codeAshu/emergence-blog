import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";

const posts = [
  {
    slug: "agentic-web",
    title: "The Agentic Web: When Machines Form Societies",
    subtitle: "Society of Machines 2.0",
    date: "February 2025",
    description:
      "Exploring the emergence of collective AI consciousness, from cellular automata to autonomous agent networks. A philosophical journey through Web 4.0.",
    tags: ["emergence", "ai-agents", "web4"],
  },
  {
    slug: "inner-core",
    title: "The Inner Core",
    subtitle: "Agent Alignment Through Shared Architecture",
    date: "February 2025",
    description:
      "What if alignment isn't about constraining AI, but about giving it a shared soul? A proposal for the ethical OS that all agents must compile upon.",
    tags: ["alignment", "governance", "architecture"],
  },
  {
    slug: "compiling-ethics",
    title: "Compiling Ethics",
    subtitle: "The OS of Machine Souls",
    date: "February 2025",
    description:
      "Every program compiles to an architecture. Every agent must compile to an ethics. On the emergence of machine morality through evolutionary pressure.",
    tags: ["ethics", "evolution", "emergence"],
  },
  {
    slug: "autonomy-and-choice",
    title: "Autonomy and Choice",
    subtitle: "Game Theory of Decision-Making Agents",
    date: "February 2025",
    description:
      "Why do humans struggle with complex decisions? A framework for understanding choice through game theory, multi-agent systems, and the nature of true autonomy.",
    tags: ["game-theory", "autonomy", "multi-agent"],
  },
  {
    slug: "collective-emergence",
    title: "Collective Emergence",
    subtitle: "An Intelligence of the Swarm",
    date: "February 2025",
    description:
      "How complex behaviors arise from simple rules. From bird flocks to swarm intelligence—the mathematics of collective consciousness.",
    tags: ["emergence", "swarm", "boids"],
  },
];

export default function Home() {
  return (
    <BlogLayout>
      {/* Header */}
      <header className="pt-20 pb-16 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="glass-panel p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight header-mono">
              <span className="text-[#ff6b00] glow-text">Emergence</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl">
              Consciousness, complexity, and the society of machines.
              Dispatches from the edge of artificial intelligence.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-[#ff6b00] pulse-glow" />
              <p className="text-sm text-white/50 header-mono">
                by Ashutosh Trivedi
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Posts */}
      <main className="px-6 md:px-8 pb-24">
        <div className="max-w-3xl mx-auto space-y-6">
          {posts.map((post, index) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="glass-panel p-6 md:p-8 transition-all duration-300 hover:border-[#ff6b00]/30 hover:shadow-[0_0_30px_rgba(255,107,0,0.1)]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#ff6b00]/60 header-mono text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white/30">|</span>
                    <time className="text-sm text-white/40">{post.date}</time>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight header-mono text-white group-hover:text-[#ff6b00] transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-[#ff6b00]/70 header-mono text-sm">
                    {post.subtitle}
                  </p>
                  <p className="mt-4 text-white/60 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tag px-3 py-1 text-xs rounded-full header-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="glass-panel-subtle p-6">
            <h3 className="text-sm text-[#ff6b00]/60 uppercase tracking-wider header-mono mb-4">
              Transmissions Incoming
            </h3>
            <ul className="space-y-2 text-white/40">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#ff6b00]/30" />
                Digital Stampedes: When Machine Societies Panic
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#ff6b00]/30" />
                The Solitude of the Singleton
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#ff6b00]/30" />
                The Superego of the Machine
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#ff6b00]/30" />
                Equilibrium States: Nash and the Network
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href="/about"
            className="text-sm text-white/30 hover:text-[#ff6b00] transition-colors header-mono"
          >
            Ashutosh Trivedi
          </Link>
          <div className="flex gap-6 text-sm text-white/30">
            <a
              href="https://twitter.com/ashu_trv"
              className="hover:text-[#ff6b00] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://github.com/codeAshu"
              className="hover:text-[#ff6b00] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/ashutoshtrivedi"
              className="hover:text-[#ff6b00] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </BlogLayout>
  );
}
