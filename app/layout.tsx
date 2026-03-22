import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATLAS — AI Tool Discovery",
  description: "Find, compare, and discover the best AI tools for every use case.",
  openGraph: {
    title: "ATLAS — AI Tool Discovery",
    description: "Browse 1,000+ AI tools across every category.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#09090B] text-white antialiased`}>

        {/* ── Navigation ── */}
        <nav className="sticky top-0 z-50 bg-[#09090B]/90 backdrop-blur-md border-b border-[#1E1E24]">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

            {/* Brand */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[13px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                ATLAS
              </span>
            </Link>

            {/* Links */}
            <div className="flex items-center gap-1">
              {[
                { href: "/tools",    label: "Browse" },
                { href: "/search",   label: "Search" },
                { href: "/submit",   label: "Submit" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-medium text-[#6B6A7A] hover:text-white px-3 py-1.5 rounded-lg hover:bg-[#111113] transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* ── Page Content ── */}
        {children}

        {/* ── Footer ── */}
        <footer className="border-t border-[#1E1E24] mt-20">
          <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-[12px] text-[#6B6A7A]">
            <span className="font-bold tracking-widest uppercase text-[11px] bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              ATLAS
            </span>
            <span>AI Tool Discovery Platform</span>
          </div>
        </footer>

      </body>
    </html>
  );
}
