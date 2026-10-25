import Link from "next/link";
import TopicChips from "@/components/TopicChips";

// One row in a list of writing. The title link is stretched over the row; topic chips sit above it.
export default function PostRow({
  href, category, dateLabel, title, excerpt, topics, hideTopic,
}: {
  href: string; category: string; dateLabel: string; title: string; excerpt?: string; topics?: string[]; hideTopic?: string;
}) {
  const slugs = (topics ?? []).filter((s) => s !== hideTopic);
  return (
    <div className="post">
      <span className="when"><b>{category}</b>{dateLabel}</span>
      <span className="body">
        <Link href={href} className="t">{title}</Link>
        {excerpt && <p>{excerpt}</p>}
        {slugs.length > 0 && <TopicChips slugs={slugs} />}
      </span>
    </div>
  );
}
