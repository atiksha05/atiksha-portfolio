import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { CursorDot } from "@/components/effects/CursorDot";
import { HashScroll } from "@/components/layout/HashScroll";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Atiksha Antil — Product Manager",
  description:
    "Portfolio of Atiksha Antil — Product Manager with a Computer Science background. Product strategy, AI products, and technical execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">
        <CursorDot />
        <HashScroll />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
