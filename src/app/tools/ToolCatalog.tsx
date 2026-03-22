'use client'

import { useState, useMemo } from 'react'
import { Tool, Category } from '@/lib/data'
import ToolCard from '@/components/ToolCard'

interface ToolCatalogProps {
  tools: Tool[]
  categories: Category[]
}

const CATEGORY_COLORS: Record<string, string> = {
  llm: '#7C3AED',
  'image-gen': '#3B82F6',
  automation: '#10B981',
  coding: '#14B8A6',
  video: '#F59E0B',
  audio: '#EC4899',
  agents: '#6366F1',
  data: '#06B6D4',
  default: '#3B82F6',
}

export default function ToolCatalog({ tools, categories }: ToolCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [pricingFilter, setPricingFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchCat = activeCategory === 'all' || t.category === activeCategory
      const matchSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
      const matchPricing = pricingFilter === 'all' || t.pricing === pricingFilter
      return matchCat && matchSearch && matchPricing
    })
  }, [tools, activeCategory, search, pricingFilter])

  return (
    <>
      {/* Search & Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: 200,
              background: '#111214',
              border: '1px solid #1E1F23',
              borderRadius: 10,
              padding: '10px 16px',
              color: '#fff',
              fontSize: 13,
              outline: 'none',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = '#06b6d433')}
            onBlur={e => (e.currentTarget.style.borderColor = '#1E1F23')}
          />
          <select
            value={pricingFilter}
            onChange={(e) => setPricingFilter(e.target.value)}
            style={{
              background: '#111214',
              border: '1px solid #1E1F23',
              borderRadius: 10,
              padding: '10px 16px',
              color: '#8F8F93',
              fontSize: 13,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Pricing</option>
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
        <button
          onClick={() => setActiveCategory('all')}
          style={{
            padding: '6px 14px',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            border: activeCategory === 'all' ? '1px solid #06b6d444' : '1px solid #1E1F23',
            background: activeCategory === 'all' ? '#06b6d415' : '#111214',
            color: activeCategory === 'all' ? '#06b6d4' : '#8F8F93',
            transition: 'all 0.2s ease',
          }}
        >
          All ({tools.length})
        </button>
        {categories.map((cat) => {
          const color = CATEGORY_COLORS[cat.slug] || CATEGORY_COLORS.default
          const isActive = activeCategory === cat.slug
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                border: isActive ? `1px solid ${color}44` : '1px solid #1E1F23',
                background: isActive ? `${color}15` : '#111214',
                color: isActive ? color : '#8F8F93',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {cat.icon && <span>{cat.icon}</span>}
              {cat.name}
            </button>
          )
        })}
      </div>

      {/* Results count */}
      <p style={{ fontSize: 12, color: '#334155', marginBottom: 16 }}>
        Showing {filtered.length} tools
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <p style={{ fontSize: 40, marginBottom: 16 }}>🔭</p>
          <p style={{ color: '#8F8F93', marginBottom: 16 }}>No tools found matching your filters.</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearch(''); setPricingFilter('all') }}
            style={{
              color: '#06b6d4', fontSize: 13, background: 'none',
              border: 'none', cursor: 'pointer', textDecoration: 'underline',
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  )
}
