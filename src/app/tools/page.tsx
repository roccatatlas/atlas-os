import { getTools, CATEGORIES } from "@/lib/data";
import ToolCard from "@/components/ToolCard";
import Link from "next/link";

export const metadata = {
  title: "AI Tool Catalog — ATLAS",
  description: "Explore 10,000+ AI tools across writing, image, video, audio, coding, and more.",
};

export default function ToolsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category || "All";
  const tools = getTools({ category });

  return (
    <div className="min-h-screen px-4 py-16 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-[10px] font-mono tracking-widest text-slate-600 border border-[#1e293b] px-3 py-1 rounded-full">
          Tool Explorer · 10,000+ Tools
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-text">
        AI Tool Catalog
      </h1>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={cat === "All" ? "/tools" : `/tools?category=${cat}`}
            className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors ${
              category === cat
                ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                : "border-[#1e293b] text-slate-500 hover:text-slate-300 hover:border-slate-600"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Tool grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {tools.length === 0 && (
        <div className="text-center py-20 text-slate-500 text-sm">
          No tools found in this category.
        </div>
      )}
    </div>
  );
}
