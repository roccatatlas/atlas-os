import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { PRICING_LABELS, PRICING_COLORS } from "@/lib/constants";

// Alle bekannten Slugs bei Build-Zeit generieren
export async function generateStaticParams() {
  const { data } = await supabase
    .from("tools")
    .select("slug")
    .eq("status", "active");
  return (data ?? []).map((t) => ({ slug: t.slug }));
}

export const revalidate = 3600;

async function getTool(slug: string) {
  const { data, error } = await supabase
    .from("tools")
    .select(
      `id, name, slug, description, tagline,
       long_description, website_url, logo_url,
       pricing_model, featured, rating, review_count,
       view_count, created_at,
       categories(name, slug, color),
       reviews(id, rating, review_text, reviewer_name, created_at, status)`
    )
    .eq("slug", slug)
    .eq("status", "active")
    .single();

  if (error || !data) return null;
  return data;
}

export default async function ToolPage({
  params,
}: {
  params: { slug: string };
}) {
  const tool = await getTool(params.slug);
  if (!tool) notFound();

  const approvedReviews = (tool.reviews ?? []).filter(
    (r: any) => r.status === "approved"
  );
  const catColor     = (tool.categories as any)?.color ?? "#3B82F6";
  const pricingColor = PRICING_COLORS[tool.pricing_model] ?? "#6B7280";
  const pricingLabel = PRICING_LABELS[tool.pricing_model] ?? tool.pricing_model;

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Back */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-[13px] text-[#6B6A7A] hover:text-white mb-8 transition-colors"
        >
          ← Back to Tools
        </Link>

        {/* Header */}
        <div className="flex items-start gap-5 mb-8">
          {tool.logo_url ? (
            <img
              src={tool.logo_url}
              alt={tool.name}
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-[#1E1E24]"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-xl font-bold"
              style={{ background: `${catColor}22`, color: catColor }}
            >
              {tool.name[0]}
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-[28px] font-bold leading-tight mb-1">{tool.name}</h1>
            {tool.tagline && (
              <p className="text-[15px] text-[#6B6A7A]">{tool.tagline}</p>
            )}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {(tool.categories as any) && (
                <span
                  className="text-[12px] font-semibold px-2.5 py-1 rounded"
                  style={{ background: `${catColor}18`, color: catColor, border: `1px solid ${catColor}30` }}
                >
                  {(tool.categories as any).name}
                </span>
              )}
              <span
                className="text-[12px] font-semibold px-2.5 py-1 rounded"
                style={{ background: `${pricingColor}18`, color: pricingColor, border: `1px solid ${pricingColor}30` }}
              >
                {pricingLabel}
              </span>
              {tool.rating > 0 && (
                <span className="text-[13px] text-[#6B6A7A] flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  {tool.rating.toFixed(1)}
                  <span className="text-[11px]">({tool.review_count})</span>
                </span>
              )}
            </div>
          </div>

          {/* CTA */}
          <a
            href={tool.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-[14px]"
          >
            Visit →
          </a>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Pricing",   value: pricingLabel },
            { label: "Rating",    value: tool.rating > 0 ? `${tool.rating.toFixed(1)} / 5` : "No ratings" },
            { label: "Reviews",   value: String(tool.review_count) },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111113] border border-[#1E1E24] rounded-xl p-4"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B6A7A] mb-1">
                {stat.label}
              </div>
              <div className="text-[16px] font-semibold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="bg-[#111113] border border-[#1E1E24] rounded-xl p-6 mb-8">
          <h2 className="text-[15px] font-bold mb-3">About {tool.name}</h2>
          <p className="text-[#6B6A7A] text-[14px] leading-relaxed">
            {(tool as any).long_description || tool.description}
          </p>
        </div>

        {/* Reviews */}
        <div className="bg-[#111113] border border-[#1E1E24] rounded-xl p-6">
          <h2 className="text-[15px] font-bold mb-5">
            Reviews ({approvedReviews.length})
          </h2>

          {approvedReviews.length === 0 ? (
            <p className="text-[#6B6A7A] text-[14px]">
              No reviews yet. Be the first!
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {approvedReviews.map((review: any) => (
                <div
                  key={review.id}
                  className="border-b border-[#1E1E24] pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-semibold">
                      {review.reviewer_name}
                    </span>
                    <span className="text-yellow-400 text-[13px]">
                      {"★".repeat(review.rating)}
                      <span className="text-[#1E1E24]">
                        {"★".repeat(5 - review.rating)}
                      </span>
                    </span>
                  </div>
                  {review.review_text && (
                    <p className="text-[#6B6A7A] text-[13px] leading-relaxed">
                      {review.review_text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
