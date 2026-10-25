import Link from "next/link";
import { topicBySlug } from "@/lib/topics";

export default function TopicChips({ slugs, size = "sm" }: { slugs: string[]; size?: "sm" | "md" }) {
  const list = slugs.map((s) => topicBySlug[s]).filter(Boolean);
  if (!list.length) return null;
  return (
    <span className={"chips chips--" + size}>
      {list.map((t) => (
        <Link key={t.slug} href={`/topics/${t.slug}`} className="chip">{t.name}</Link>
      ))}
    </span>
  );
}
