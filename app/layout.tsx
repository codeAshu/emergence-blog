import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: { default: `${site.name} · emergence`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "emergence.live",
    title: site.ogTitle,
    description: site.ogDescription,
  },
  twitter: { card: "summary_large_image", creator: "@ashu_trv", title: site.ogTitle, description: site.ogDescription },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#F2F1EC" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&family=Tiro+Devanagari+Sanskrit&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
