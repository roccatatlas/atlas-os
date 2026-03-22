'use client'

import { useState, useCallback } from 'react'
import { Tool } from '@/lib/data'
import { supabase } from '@/lib/supabase'
import ToolCard from '@/components/ToolCard'

function useDebounce<T extends (...args: Parameters<T>) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>
  return ((...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }) as T
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Tool[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      setSearched(false)
      return
    }
    setLoading(true)
    setSearched(true)
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('status', 'active')
        .ilike('name', `%${q}%`)
        .order('atlas_score', { ascending: false })
        .limit(20)

      if (error) throw error
      setResults((data as Tool[]) ?? [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const debouncedSearch = useDebounce(doSearch, 400)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    debouncedSearch(val)
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-white mb-3">Search AI Tools</h1>
        <p className="text-white/50">Find the perfect tool for your workflow</p>
      </div>

      {/* Search input */}
      <div className="relative mb-10">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">🔍</span>
        <input
          type="text"
          placeholder="Search by tool name, category, or use case..."
          value={query}
          onChange={handleChange}
          autoFocus
          className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/40 focus:shadow-[0_0_20px_rgba(34,211,238,0.08)] transition-all text-lg"
        />
        {loading && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm animate-pulse">
            Searching...
          </span>
        )}
      </div>

      {/* Results */}
      {searched && !loading && (
        <div>
          <p className="text-sm text-white/30 mb-4">
            {results.length} results for &quot;{query}&quot;
          </p>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">🔭</p>
              <p className="text-white/40">No tools found for &quot;{query}&quot;</p>
              <p className="text-white/25 text-sm mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      )}

      {!searched && (
        <div className="text-center py-16 text-white/20">
          <p className="text-5xl mb-4">⚡</p>
          <p>Start typing to search across all AI tools</p>
        </div>
      )}
    </div>
  )
}
