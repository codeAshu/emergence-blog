import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Emergence | Ashutosh Trivedi",
  description: "Exploring consciousness, emergence, and the society of machines in the age of AI",
  openGraph: {
    title: "Emergence | Ashutosh Trivedi",
    description: "Exploring consciousness, emergence, and the society of machines in the age of AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black text-stone-100`}
      >
        {children}
      </body>
    </html>
  );
}
