import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <div className="serif" style={{ fontSize: 22, color: "var(--ink)", marginBottom: 10 }}>
              emergence
            </div>
            <p style={{ maxWidth: "32ch" }}>
              A notebook on beauty, philosophy, science, technology and the human experience.
            </p>
          </div>
          <div>
            <h4>Here</h4>
            <ul>
              <li><Link href="/writing">Writing</Link></li>
              <li><Link href="/chitrakavya">Chitrakāvya</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>
          <div>
            <h4>Elsewhere</h4>
            <ul>
              <li><a href={site.social.x} target="_blank" rel="noopener noreferrer">X</a></li>
              <li><a href={site.social.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h4>Work</h4>
            <ul>
              <li><a href={site.company.url} target="_blank" rel="noopener noreferrer">{site.company.name}</a></li>
              <li><a href={site.social.email}>Email</a></li>
            </ul>
          </div>
        </div>
        <div className="copy">
          <span>{site.name} © {new Date().getFullYear()}</span>
          <span>Somewhere between the mountains and the machine.</span>
        </div>
      </div>
    </footer>
  );
}
