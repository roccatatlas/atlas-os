"use client";

import { useState, useMemo } from "react";
import { getTools } from "@/lib/data";
import ToolCard from "@/components/ToolCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const allTools = useMemo(() => getTools(), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allTools;
    return getTools({ search: query });
  }, [query, allTools]);

  return (
    <div className="min-h-screen px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-text">
        Search Tools
      </h1>

      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search AI tools..."
          className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-[#1e293b] text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-500 text-sm">
          No tools match your search.
        </div>
      )}
    </div>
  );
}
