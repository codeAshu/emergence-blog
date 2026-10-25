import type { Metadata } from "next";
import CkNav from "@/components/ck/CkNav";

export const metadata: Metadata = {
  title: { default: "Chitrakāvya", template: "%s · Chitrakāvya" },
  description: "A research archive on Sanskrit visual verse and ancient combinatorics. Poems that are diagrams and algorithms.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap">
      <CkNav />
      {children}
    </div>
  );
}
