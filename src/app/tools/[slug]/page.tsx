import { getToolBySlug, MOCK_TOOLS } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export function generateStaticParams() {
  return MOCK_TOOLS.map((tool) => ({ slug: tool.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: "Tool Not Found — ATLAS" };
  return {
    title: `${tool.name} — ATLAS AI Tool`,
    description: tool.description,
  };
}

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const stats = [
    { label: "Users", value: tool.users },
    { label: "Deployment", value: tool.deploy },
    { label: "Context Window", value: tool.context_window },
    { label: "Integrations", value: tool.integrations.toLocaleString() },
    { label: "Atlas Score", value: `${tool.atlas_score}/100` },
    { label: "Open Source", value: tool.open_source ? "Yes" : "No" },
  ];

  return (
    <div className="min-h-screen px-4 py-16 max-w-3xl mx-auto">
      <Link href="/tools" className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors mb-8 inline-block">
        ← Back to Tools
      </Link>

      <div className="card-surface rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <span className="text-5xl">{tool.logo}</span>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{tool.name}</h1>
            <p className="text-sm text-slate-500">{tool.company}</p>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-[#1e293b]">
                {tool.category}
              </span>
              {tool.api_available && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  API Available
                </span>
              )}
              {tool.open_source && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Open Source
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-lg font-bold text-white">{tool.rating}</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">{tool.pricing}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 mb-8 leading-relaxed">{tool.description}</p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#0a0f1e] rounded-lg p-4 border border-[#1e293b]">
              <div className="text-[10px] text-slate-600 font-mono mb-1">{stat.label}</div>
              <div className="text-sm font-semibold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            className="px-8 py-3 rounded-lg text-sm font-medium text-white"
            style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)", boxShadow: "0 0 30px rgba(6,182,212,0.15)" }}
          >
            Try {tool.name} Free →
          </button>
        </div>
      </div>
    </div>
  );
}
