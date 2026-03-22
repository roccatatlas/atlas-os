"use client";

import { useState, useEffect, useCallback } from "react";
import { ToolCard } from "@/components/ToolCard";
import { CATEGORIES, PRICING_LABELS } from "@/lib/constants";
import type { Tool } from "@/lib/supabase";

const PRICING_OPTIONS = ["free", "freemium", "paid", "open_source"];

export default function ToolsPage() {
  const [tools, setTools]         = useState<Tool[]>([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(true);
  const [category, setCategory]   = useState("");
  const [pricing, setPricing]     = useState("");
  const [offset, setOffset]       = useState(0);
  const LIMIT = 24;

  const fetchTools = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: String(LIMIT),
        offset: String(offset),
        ...(category && { category }),
        ...(pricing  && { pricing }),
      });
      const res  = await fetch(`/api/tools?${params}`);
      const data = await res.json();
      setTools(data.tools ?? []);
      setTotal(data.total ?? 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [category, pricing, offset]);

  useEffect(() => {
    setOffset(0);
  }, [category, pricing]);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  function resetFilters() {
    setCategory("");
    setPricing("");
    setOffset(0);
  }

  const hasFilter = category || pricing;

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold mb-2">All AI Tools</h1>
          <p className="text-[#6B6A7A] text-[15px]">
            {total > 0 ? `${total} tools` : "Loading..."} · Browse and filter
          </p>
        </div>

        <div className="flex gap-8">

          {/* ── Sidebar Filter ── */}
          <aside className="w-52 flex-shrink-0 hidden md:block">
            <div className="sticky top-20">

              {/* Category */}
              <div className="mb-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B6A7A] mb-3">
                  Category
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setCategory("")}
                    className={`text-left text-[13px] px-3 py-2 rounded-lg transition-colors ${
                      !category
                        ? "bg-[#1E1E24] text-white font-medium"
                        : "text-[#6B6A7A] hover:text-white hover:bg-[#111113]"
                    }`}
                  >
                    All categories
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setCategory(cat.slug)}
                      className={`text-left text-[13px] px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        category === cat.slug
                          ? "bg-[#1E1E24] text-white font-medium"
                          : "text-[#6B6A7A] hover:text-white hover:bg-[#111113]"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B6A7A] mb-3">
                  Pricing
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setPricing("")}
                    className={`text-left text-[13px] px-3 py-2 rounded-lg transition-colors ${
                      !pricing
                        ? "bg-[#1E1E24] text-white font-medium"
                        : "text-[#6B6A7A] hover:text-white hover:bg-[#111113]"
                    }`}
                  >
                    All pricing
                  </button>
                  {PRICING_OPTIONS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPricing(p)}
                      className={`text-left text-[13px] px-3 py-2 rounded-lg transition-colors ${
                        pricing === p
                          ? "bg-[#1E1E24] text-white font-medium"
                          : "text-[#6B6A7A] hover:text-white hover:bg-[#111113]"
                      }`}
                    >
                      {PRICING_LABELS[p]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              {hasFilter && (
                <button
                  onClick={resetFilters}
                  className="w-full text-[12px] text-[#6B6A7A] hover:text-white border border-[#1E1E24] hover:border-[#2A2A33] rounded-lg px-3 py-2 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </aside>

          {/* ── Main Grid ── */}
          <main className="flex-1 min-w-0">

            {/* Mobile Filter Pills */}
            <div className="flex gap-2 mb-6 flex-wrap md:hidden">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setCategory(category === cat.slug ? "" : cat.slug)}
                  className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                    category === cat.slug
                      ? "border-blue-500 text-blue-400 bg-blue-500/10"
                      : "border-[#1E1E24] text-[#6B6A7A]"
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {/* Loading */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#111113] border border-[#1E1E24] rounded-xl h-44 animate-pulse"
                  />
                ))}
              </div>
            ) : tools.length === 0 ? (
              <div className="text-center py-24 text-[#6B6A7A]">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-[16px]">No tools found for this filter.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-blue-400 hover:text-blue-300 text-[13px]"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {tools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>

                {/* Pagination */}
                {total > LIMIT && (
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setOffset(Math.max(0, offset - LIMIT))}
                      disabled={offset === 0}
                      className="px-4 py-2 text-[13px] border border-[#1E1E24] rounded-lg text-[#6B6A7A] hover:text-white hover:border-[#2A2A33] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      ← Previous
                    </button>
                    <span className="px-4 py-2 text-[13px] text-[#6B6A7A]">
                      {Math.floor(offset / LIMIT) + 1} / {Math.ceil(total / LIMIT)}
                    </span>
                    <button
                      onClick={() => setOffset(offset + LIMIT)}
                      disabled={offset + LIMIT >= total}
                      className="px-4 py-2 text-[13px] border border-[#1E1E24] rounded-lg text-[#6B6A7A] hover:text-white hover:border-[#2A2A33] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
