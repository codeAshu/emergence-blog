import type { Metadata } from "next";
import { ogFor } from "@/lib/og";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Ashutosh Trivedi. Builder at the edge of complexity.",
  ...ogFor("/about"),
};

export default function AboutPage() {
  return (
    <div className="wrap">
      <div className="about">
        <div>
          <div className="portrait">
            <img src={site.photo} alt={site.name} width={160} height={160} />
          </div>
          <div className="links">
            <a href={site.social.x} target="_blank" rel="noopener noreferrer">X</a>
            <a href={site.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={site.social.email}>{site.social.email.replace("mailto:", "")}</a>
          </div>
        </div>
        <div className="col">
          <h1 className="display">{site.name}</h1>
          <div className="prose" style={{ padding: "28px 0 0", borderTop: 0 }}>
            <p>
              By day I run{" "}
              <a href={site.company.url} target="_blank" rel="noopener noreferrer">VideoDB</a>, where we
              build data infrastructure for machines that see. Before that, a decade in natural language
              processing and multi-agent systems: embeddings, summarization, reasoning, and the question
              of how emergence arises as an intelligent pattern.
            </p>
            <p>
              My first training in formal structure was a Sanskrit grammatical tradition, long before
              computer science. That is why this site has a whole wing on Chitrakāvya, the Sanskrit
              practice of poems that are also diagrams and algorithms. Some questions never leave you.
            </p>
            <h2>What I care about</h2>
            <p>
              Nature first. I love nature, and alignment with it is what I seek: long treks through
              Himalayan terrain, meditation, music. Then beauty, philosophy, mathematics and science.
              Yoga is the oldest engineering manual for awareness I know of, and I read it next to
              papers on agents, memory and alignment.
            </p>
            <p>
              Mathematics and nature are where most of my wonder lives: fractals and self-similarity,
              higher-order structure, and optimization, the question of what a system is really
              minimising when it looks like it is learning.
            </p>
            <h2>What you will find here</h2>
            <ul>
              <li>Essays on the mind, yoga and the practice of awareness.</li>
              <li>AI, AGI and the society of agents: emergence, alignment, what comes next.</li>
              <li>Mathematics: fractals, higher-order structure, optimization, and the proofs I keep returning to.</li>
              <li>Side research I cannot put down.</li>
              <li>Notes from building, reading and walking in the mountains.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
