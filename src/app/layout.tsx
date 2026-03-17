import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ATLAS — The AI Workflow Infrastructure",
  description:
    "Discover, compare, and combine 10,000+ AI tools into production-ready workflows. The operating system for building AI systems.",
  openGraph: {
    title: "ATLAS — The AI Workflow Infrastructure",
    description:
      "Discover, compare, and combine 10,000+ AI tools into production-ready workflows.",
    type: "website",
    url: "https://runatlas.com",
    siteName: "ATLAS OS",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATLAS — The AI Workflow Infrastructure",
    description:
      "Discover, compare, and combine 10,000+ AI tools into production-ready workflows.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans bg-[#010610] text-slate-100 antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
