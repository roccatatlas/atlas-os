import { CATEGORIES, getTools } from "@/lib/data";
import Link from "next/link";

export const metadata = {
  title: "AI Tool Categories — ATLAS",
  description: "Browse AI tools by category: Writing, Image, Video, Audio, Research, Automation, and more.",
};

export default function CategoriesPage() {
  const categories = CATEGORIES.filter((c) => c !== "All");

  return (
    <div className="min-h-screen px-4 py-16 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-[10px] font-mono tracking-widest text-slate-600 border border-[#1e293b] px-3 py-1 rounded-full">
          Categories
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 gradient-text">
        Browse by Category
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const tools = getTools({ category: cat });
          return (
            <Link
              key={cat}
              href={`/tools?category=${cat}`}
              className="card-surface rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 group block"
            >
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                {cat}
              </h3>
              <p className="text-xs text-slate-500">
                {tools.length} tool{tools.length !== 1 ? "s" : ""} indexed
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
