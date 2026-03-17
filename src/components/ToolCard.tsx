"use client";

import Link from "next/link";
import type { Tool } from "@/lib/data";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="block card-surface rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.05)] group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{tool.logo}</span>
          <div>
            <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
              {tool.name}
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">{tool.company}</span>
          </div>
        </div>
        <div className="flex gap-1.5">
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-[#1e293b]">
            {tool.category}
          </span>
          {tool.api_available && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              API
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-400 line-clamp-2 mb-4">{tool.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-[10px] text-slate-500">{tool.pricing}</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-yellow-400">★</span>
          <span className="text-[10px] text-slate-400">{tool.rating}</span>
        </div>
      </div>
    </Link>
  );
}
