import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { PRICING_LABELS, PRICING_COLORS } from "@/lib/constants";
import type { Tool } from "@/lib/supabase";

// URL-Format: /compare/chatgpt-vs-cursor
export async function generateStaticParams() {
  return []; // Dynamisch — kein Pre-Build nötig
}

export const revalidate = 3600;

async function getTools(slugA: string, slugB: string) {
  const { data } = await supabase
    .from("tools")
    .select(
      `id, name, slug, description, tagline, website_url,
       logo_url, pricing_model, featured, rating,
       review_count, view_count, created_at,
       categories(name, slug, color)`
    )
    .in("slug", [slugA, slugB])
    .eq("status", "active");

  const a = data?.find((t) => t.slug === slugA) as Tool | undefined;
  const b = data?.find((t) => t.slug === slugB) as Tool | undefined;
  return { a, b };
}

function ToolColumn({ tool, winner }: { tool: Tool; winner: boolean }) {
  const catColor     = (tool.categories as any)?.color ?? "#3B82F6";
  const pricingColor = PRICING_COLORS[tool.pricing_model] ?? "#6B7280";

  return (
    <div className={`flex-1 min-w-0 bg-[#111113] border rounded-xl p-6 ${
      winner ? "border-cyan-500/30" : "border-[#1E1E24]"
    }`}>
      {winner && (
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded px-2 py-0.5 mb-4">
          ★ Higher Rated
        </div>
      )}

      {/* Logo + Name */}
      <div className="flex items-center gap-3 mb-4">
        {tool.logo_url ? (
          <img src={tool.logo_url} alt={tool.name}
            className="w-12 h-12 rounded-xl object-cover bg-[#1E1E24]" />
        ) : (
          <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
            style={{ background: `${catColor}22`, color: catColor }}>
            {tool.name[0]}
          </div>
        )}
        <div>
          <h2 className="font-bold text-[18px]">{tool.name}</h2>
          {tool.tagline && <p className="text-[12px] text-[#6B6A7A]">{tool.tagline}</p>}
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(tool.categories as any) && (
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded"
            style={{ background: `${catColor}18`, color: catColor, border: `1px solid ${catColor}30` }}>
            {(tool.categories as any).name}
          </span>
        )}
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded"
          style={{ background: `${pricingColor}18`, color: pricingColor, border: `1px solid ${pricingColor}30` }}>
          {PRICING_LABELS[tool.pricing_model] ?? tool.pricing_model}
        </span>
      </div>

      {/* Description */}
      <p className="text-[13px] text-[#6B6A7A] leading-relaxed mb-6">
        {tool.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Rating",    value: tool.rating > 0 ? `${tool.rating.toFixed(1)} / 5` : "—" },
          { label: "Reviews",   value: tool.review_count > 0 ? String(tool.review_count) : "—" },
          { label: "Pricing",   value: PRICING_LABELS[tool.pricing_model] ?? tool.pricing_model },
          { label: "Category",  value: (tool.categories as any)?.name ?? "—" },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D0D10] rounded-lg p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#3A3A45] mb-1">
              {s.label}
            </div>
            <div className="text-[14px] font-semibold">{s.value}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href={tool.website_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity text-[14px]"
      >
        Visit {tool.name} →
      </a>
    </div>
  );
}

export default async function ComparePage({
  params,
}: {
  params: { slug: string };
}) {
  // Parse "chatgpt-vs-cursor" → ["chatgpt", "cursor"]
  const parts = params.slug.split("-vs-");
  if (parts.length !== 2) notFound();

  const [slugA, slugB] = parts;
  const { a, b } = await getTools(slugA, slugB);
  if (!a || !b) notFound();

  const winner = (a.rating ?? 0) >= (b.rating ?? 0) ? "a" : "b";

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Back */}
        <Link href="/tools"
          className="inline-flex items-center gap-2 text-[13px] text-[#6B6A7A] hover:text-white mb-8 transition-colors">
          ← Back to Tools
        </Link>

        {/* Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-[#6B6A7A] bg-[#111113] border border-[#1E1E24] rounded-full px-4 py-1.5 mb-4">
            Tool Comparison
          </div>
          <h1 className="text-[28px] font-bold">
            {a.name}{" "}
            <span className="text-[#3A3A45]">vs</span>{" "}
            {b.name}
          </h1>
          <p className="text-[#6B6A7A] text-[14px] mt-2">
            Side-by-side comparison · Ratings, pricing, and features
          </p>
        </div>

        {/* Columns */}
        <div className="flex gap-4 mb-10 flex-col sm:flex-row">
          <ToolColumn tool={a} winner={winner === "a"} />
          <div className="flex items-center justify-center text-[#3A3A45] font-bold text-[18px] sm:flex-col">
            VS
          </div>
          <ToolColumn tool={b} winner={winner === "b"} />
        </div>

        {/* Quick Verdict */}
        <div className="bg-[#111113] border border-[#1E1E24] rounded-xl p-6">
          <h3 className="font-bold text-[15px] mb-3">Quick Verdict</h3>
          <p className="text-[#6B6A7A] text-[14px] leading-relaxed">
            {winner === "a" ? a.name : b.name} has a higher community rating (
            {winner === "a"
              ? `${a.rating.toFixed(1)} vs ${b.rating.toFixed(1)}`
              : `${b.rating.toFixed(1)} vs ${a.rating.toFixed(1)}`}
            ). Both tools are worth trying depending on your specific use case —
            check pricing and category fit before deciding.
          </p>
        </div>

        {/* Related Compare Links */}
        <div className="mt-8 text-center">
          <p className="text-[12px] text-[#3A3A45] mb-3">Compare format: /compare/tool-a-vs-tool-b</p>
          <Link href="/tools"
            className="text-[13px] text-blue-400 hover:text-blue-300 transition-colors">
            Browse all tools to find more comparisons →
          </Link>
        </div>

      </div>
    </div>
  );
}
