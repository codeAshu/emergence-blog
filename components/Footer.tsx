import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="row">
          <div className="links">
            <Link href="/writing">Writing</Link>
            <Link href="/topics">Topics</Link>
            <Link href="/darsana">Darśana</Link>
            <Link href="/chitrakavya">Chitrakāvya</Link>
            <Link href="/about">About</Link>
          </div>
          <div className="links">
            <a href={site.social.x} target="_blank" rel="noopener noreferrer">X</a>
            <a href={site.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={site.social.email}>Email</a>
          </div>
        </div>
        <p className="sig">Somewhere between the mountains and the machine.</p>
        <p className="small" style={{ marginTop: 8 }}>{site.name} © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
