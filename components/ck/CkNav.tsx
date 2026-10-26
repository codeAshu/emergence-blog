import SectionNav from "@/components/SectionNav";

const items = [
  { href: "/chitrakavya", label: "Overview" },
  { href: "/chitrakavya/visuals", label: "Visuals" },
  { href: "/chitrakavya/paduka", label: "Pādukā" },
  { href: "/chitrakavya/knights-tour", label: "Knight's Tour" },
  { href: "/chitrakavya/resources", label: "Resources" },
  { href: "/chitrakavya/about", label: "About" },
];

export default function CkNav() {
  return <SectionNav label="Chitrakāvya" seal="चित्रकाव्य" sealImg="/chitrakavya/seal.svg" items={items} />;
}
