import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Ashutosh Trivedi. Builder at the edge of complexity.",
};

export default function AboutPage() {
  return (
    <div className="wrap">
      <div className="about">
        <div>
          <div className="photo">
            <img src={site.photo} alt={site.name} />
          </div>
          <div className="links">
            <a className="textlink" href={site.social.x} target="_blank" rel="noopener noreferrer">X</a>
            <a className="textlink" href={site.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="textlink" href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="textlink" href={site.social.email}>Email</a>
          </div>
        </div>
        <div>
          <div className="kicker"><b>About</b></div>
          <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>{site.name}</h1>
          <div className="prose" style={{ margin: 0, padding: "28px 0 0", maxWidth: "58ch" }}>
            <p>
              I build at the intersection of machine learning and distributed systems. By day I run{" "}
              <a href={site.company.url} target="_blank" rel="noopener noreferrer">VideoDB</a>, where we
              build data infrastructure for machines that see. Before that, a decade in natural language
              processing and multi-agent systems: embeddings, summarization, reasoning, and the question
              of how many agents following simple rules add up to something none of them intended.
            </p>
            <p>
              My first training in formal structure was a Sanskrit grammatical tradition, long before
              computer science. That is why this site has a whole wing on Chitrakāvya, the Sanskrit
              practice of poems that are also diagrams and algorithms. Some questions never leave you.
            </p>
            <h2>What I care about</h2>
            <p>
              Beauty, philosophy, science, technology and the human experience. I am learning every
              moment and trying to win over my mind. Yoga is the oldest engineering manual for attention
              that I know of, and I read it next to papers on agents, memory and alignment.
            </p>
            <h2>What you will find here</h2>
            <ul>
              <li>Essays on the mind, yoga and the practice of attention.</li>
              <li>AI, AGI and the society of agents: emergence, alignment, what comes next.</li>
              <li>Side research, starting with the Chitrakāvya archive.</li>
              <li>Notes from building, reading and walking in the mountains.</li>
            </ul>
            <p className="note">
              Somewhere between the mountains and the machine. Write to me at{" "}
              <a href={site.social.email}>{site.social.email.replace("mailto:", "")}</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
