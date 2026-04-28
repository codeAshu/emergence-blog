import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ThemeTransition from "@/components/ThemeTransition";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://emergence.ashutoshtrivedi.com"),
  title: "Emergence | Ashutosh Trivedi",
  description:
    "Research notes on multi-agent systems, collective intelligence, and computational models of consciousness.",
  openGraph: {
    title: "Emergence",
    description:
      "Research notes on multi-agent systems, collective intelligence, and computational models of consciousness.",
    type: "website",
    siteName: "Emergence",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Emergence — Research on AI and Collective Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergence | Ashutosh Trivedi",
    description:
      "Research notes on multi-agent systems, collective intelligence, and computational models of consciousness.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/*
          Default to light. Editorial reading is a light-mode activity per
          the Impeccable design system. Only honor an explicit saved choice.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = (saved === 'dark' || saved === 'light') ? saved : 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${instrument.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeTransition />
        <Header />
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}
