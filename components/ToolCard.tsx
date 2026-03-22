"use client";

import Link from "next/link";
import { Tool } from "@/lib/supabase";
import { PRICING_LABELS, PRICING_COLORS } from "@/lib/constants";

export function ToolCard({ tool }: { tool: Tool }) {
  const pricingColor = PRICING_COLORS[tool.pricing_model] ?? "#6B7280";
  const pricingLabel = PRICING_LABELS[tool.pricing_model] ?? tool.pricing_model;
  const catColor     = tool.categories?.color ?? "#3B82F6";

  return (
    <Link href={`/tools/${tool.slug}`} className="block group">
      <div className="
        relative h-full
        bg-[#111113] border border-[#1E1E24]
        rounded-xl p-5
        hover:border-[#2A2A33] hover:bg-[#141418]
        transition-all duration-200
      ">
        {/* Featured Badge */}
        {tool.featured && (
          <div className="
            absolute top-3 right-3
            text-[10px] font-bold tracking-wider uppercase
            bg-cyan-400/10 text-cyan-400 border border-cyan-400/20
            px-2 py-0.5 rounded
          ">
            Featured
          </div>
        )}

        {/* Header: Logo + Name */}
        <div className="flex items-start gap-3 mb-3">
          {tool.logo_url ? (
            <img
              src={tool.logo_url}
              alt={tool.name}
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-[#1E1E24]"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <div
              className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-bold"
              style={{ background: `${catColor}22`, color: catColor }}
            >
              {tool.name[0]}
            </div>
          )}
          <div className="flex-1 min-w-0 pr-6">
            <h3 className="font-semibold text-[15px] text-white leading-tight truncate">
              {tool.name}
            </h3>
            {tool.tagline && (
              <p className="text-[12px] text-[#6B6A7A] mt-0.5 truncate">
                {tool.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-[13px] text-[#6B6A7A] leading-relaxed line-clamp-2 mb-4">
          {tool.description}
        </p>

        {/* Footer: Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category */}
          {tool.categories && (
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded"
              style={{
                background: `${catColor}18`,
                color: catColor,
                border: `1px solid ${catColor}30`,
              }}
            >
              {tool.categories.name}
            </span>
          )}

          {/* Pricing */}
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded"
            style={{
              background: `${pricingColor}18`,
              color: pricingColor,
              border: `1px solid ${pricingColor}30`,
            }}
          >
            {pricingLabel}
          </span>

          {/* Rating */}
          {tool.rating > 0 && (
            <span className="ml-auto text-[12px] text-[#6B6A7A] flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              {tool.rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
