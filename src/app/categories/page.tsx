import { getCategories } from '@/lib/data'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Categories — RunAtlas',
  description: 'Browse AI tools by category.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  // Group by super_cat
  const grouped = categories.reduce<Record<string, typeof categories>>((acc, cat) => {
    const key = cat.super_cat ?? 'Other'
    if (!acc[key]) acc[key] = []
    acc[key].push(cat)
    return acc
  }, {})

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white mb-2">Categories</h1>
        <p className="text-white/50">{categories.length} categories of AI tools</p>
      </div>

      {/* Grouped grid */}
      {Object.entries(grouped).map(([group, cats]) => (
        <div key={group} className="mb-12">
          <h2 className="text-lg font-semibold text-white/70 mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
            {group}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cats.map((cat) => (
              <Link
                key={cat.slug}
                href={`/tools?category=${cat.slug}`}
                className="group block"
              >
                <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.10)]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{cat.icon ?? '🔧'}</span>
                    <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                  {cat.description && (
                    <p className="text-sm text-white/40 leading-relaxed line-clamp-2 mb-4">
                      {cat.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">{cat.tool_count} tools</span>
                    <span className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
