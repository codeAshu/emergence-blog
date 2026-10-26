import SectionNav from "@/components/SectionNav";
import { darsanaPosts } from "@/lib/darsana";

const items = [
  { href: "/darsana", label: "The six, in order" },
  ...darsanaPosts.map((p) => ({ href: `/darsana/${p.slug}`, label: p.school, note: `${p.n} of 6 · ${p.title}` })),
];

// The posts set their own full-width layout, so the section menu sits as a fixed
// rail on the left of wide screens rather than in a grid column.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionNav rail label="Darśana" items={items} />
      {children}
    </>
  );
}
