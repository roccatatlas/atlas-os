import { getStacks } from '@/lib/data'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Stack Library — RunAtlas',
  description: 'Browse community-built AI tool stacks for every workflow.',
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
  intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
}

export default async function StacksPage() {
  const stacks = await getStacks()

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Stack Library</h1>
          <p className="text-white/50">
            {stacks.length} ready-to-deploy AI workflow stacks
          </p>
        </div>
        <Link
          href="/generate"
          className="px-5 py-2.5 bg-cyan-400 text-black font-semibold rounded-xl hover:bg-cyan-300 transition-all hover:scale-105"
        >
          ✦ Build My Stack
        </Link>
      </div>

      {stacks.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📚</p>
          <p className="text-white/40">No stacks available yet. Be the first to create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stacks.map((stack) => {
            const diffClass = DIFFICULTY_COLORS[stack.difficulty] ?? 'text-white/50 bg-white/5 border-white/10'
            return (
              <Link key={stack.id} href={`/stacks/${stack.slug}`} className="group block">
                <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border capitalize ${diffClass}`}>
                      {stack.difficulty}
                    </span>
                    {stack.cost_monthly !== null && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/40">
                        ~${stack.cost_monthly}/mo
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                    {stack.title}
                  </h3>
                  <p className="text-sm text-white/50 mb-4 leading-relaxed line-clamp-2">
                    {stack.description}
                  </p>
                  <p className="text-xs text-white/30 mb-6 line-clamp-1">
                    🎯 {stack.goal}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-white/30">
                    <span>👁 {stack.views.toLocaleString()} views</span>
                    <span>⚡ {stack.clones} clones</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
