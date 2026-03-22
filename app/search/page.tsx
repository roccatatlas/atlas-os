"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { CATEGORIES, PRICING_LABELS, PRICING_COLORS } from "@/lib/constants";

type Result = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string | null;
  pricing_model: string;
  rating: number;
  review_count: number;
  categories: { name: string; color: string } | null;
};

let debounceTimer: ReturnType<typeof setTimeout>;

export default function SearchPage() {
  const [query,   setQuery]   = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [pricing,  setPricing]  = useState("");

  const doSearch = useCallback(
    (q: string, cat: string, price: string) => {
      clearTimeout(debounceTimer);
      if (q.length < 2) { setResults([]); return; }

      debounceTimer = setTimeout(async () => {
        setLoading(true);
        try {
          const params = new URLSearchParams({ q });
          if (cat)   params.set("category", cat);
          if (price) params.set("pricing",  price);
          const res  = await fetch(`/api/search?${params}`);
          const data = await res.json();
          setResults(data.results ?? []);
          setTotal(data.total ?? 0);
        } finally {
          setLoading(false);
        }
      }, 300);
    },
    []
  );

  function handleQuery(val: string) {
    setQuery(val);
    doSearch(val, category, pricing);
  }

  function handleCat(val: string) {
    setCategory(val);
    doSearch(query, val, pricing);
  }

  function handlePricing(val: string) {
    setPricing(val);
    doSearch(query, category, val);
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-white">

      {/* Hero Search */}
      <div className="bg-gradient-to-b from-[#0D0D12] to-[#09090B] border-b border-[#1E1E24]">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h1 className="text-[32px] font-bold mb-3">Find the perfect AI tool</h1>
          <p className="text-[#6B6A7A] mb-8">Search across 1,000+ tools</p>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6A7A] text-lg">🔍</span>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => handleQuery(e.target.value)}
              placeholder="Search tools, features, use cases..."
              className="w-full bg-[#111113] border border-[#2A2A33] focus:border-blue-500/50 focus:outline-none rounded-xl pl-12 pr-6 py-4 text-[16px] text-white placeholder-[#3A3A45] transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex gap-8">

          {/* Filter Sidebar */}
          <aside className="w-48 flex-shrink-0 hidden md:block">
            <div className="sticky top-20">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B6A7A] mb-3">
                Category
              </div>
              <div className="flex flex-col gap-1 mb-6">
                <button
                  onClick={() => handleCat("")}
                  className={`text-left text-[13px] px-3 py-2 rounded-lg transition-colors ${!category ? "bg-[#1E1E24] text-white font-medium" : "text-[#6B6A7A] hover:text-white"}`}
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCat(cat.slug)}
                    className={`text-left text-[13px] px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${category === cat.slug ? "bg-[#1E1E24] text-white font-medium" : "text-[#6B6A7A] hover:text-white"}`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>

              <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B6A7A] mb-3">
                Pricing
              </div>
              <div className="flex flex-col gap-1">
                {["", "free", "freemium", "paid", "open_source"].map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePricing(p)}
                    className={`text-left text-[13px] px-3 py-2 rounded-lg transition-colors ${pricing === p ? "bg-[#1E1E24] text-white font-medium" : "text-[#6B6A7A] hover:text-white"}`}
                  >
                    {p === "" ? "All" : PRICING_LABELS[p]}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            {query.length < 2 ? (
              <div className="text-center py-20 text-[#6B6A7A]">
                <div className="text-4xl mb-4">🔍</div>
                <p>Start typing to search...</p>
              </div>
            ) : loading ? (
              <div className="flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-[#111113] border border-[#1E1E24] rounded-xl h-20 animate-pulse" />
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-20 text-[#6B6A7A]">
                <div className="text-4xl mb-4">😕</div>
                <p>No results for &ldquo;{query}&rdquo;</p>
              </div>
            ) : (
              <>
                <p className="text-[13px] text-[#6B6A7A] mb-4">
                  {total} results for &ldquo;<strong className="text-white">{query}</strong>&rdquo;
                </p>
                <div className="flex flex-col gap-3">
                  {results.map((r) => {
                    const catColor  = r.categories?.color ?? "#3B82F6";
                    const pColor    = PRICING_COLORS[r.pricing_model] ?? "#6B7280";
                    return (
                      <Link
                        key={r.id}
                        href={`/tools/${r.slug}`}
                        className="bg-[#111113] border border-[#1E1E24] hover:border-[#2A2A33] rounded-xl p-5 flex gap-4 transition-all group"
                      >
                        {r.logo_url ? (
                          <img src={r.logo_url} alt={r.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-sm" style={{ background: `${catColor}22`, color: catColor }}>
                            {r.name[0]}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[15px] group-hover:text-blue-400 transition-colors truncate">
                            {r.name}
                          </h3>
                          <p className="text-[13px] text-[#6B6A7A] line-clamp-1 mt-0.5">
                            {r.description}
                          </p>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {r.categories && (
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded" style={{ background: `${catColor}18`, color: catColor }}>
                                {r.categories.name}
                              </span>
                            )}
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded" style={{ background: `${pColor}18`, color: pColor }}>
                              {PRICING_LABELS[r.pricing_model] ?? r.pricing_model}
                            </span>
                            {r.rating > 0 && (
                              <span className="text-[11px] text-[#6B6A7A] flex items-center gap-0.5">
                                <span className="text-yellow-400">★</span>
                                {r.rating.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
