import { getStacks, getStackBySlug } from '@/lib/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 3600

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const stacks = await getStacks()
  return stacks.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const stack = await getStackBySlug(params.slug)
  if (!stack) return { title: 'Stack Not Found' }
  return {
    title: `${stack.title} — RunAtlas Stacks`,
    description: stack.description,
  }
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
  intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
}

export default async function StackDetailPage({ params }: Props) {
  const stack = await getStackBySlug(params.slug)

  if (!stack) notFound()

  const diffClass = DIFFICULTY_COLORS[stack.difficulty] ?? 'text-white/50 bg-white/5 border-white/10'

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link href="/stacks" className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
        ← Back to Stacks
      </Link>

      {/* Header Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`text-sm px-3 py-1 rounded-full border capitalize ${diffClass}`}>
            {stack.difficulty}
          </span>
          {stack.cost_monthly !== null && (
            <span className="text-sm px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/50">
              ~${stack.cost_monthly}/mo
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">{stack.title}</h1>
        <p className="text-white/50 text-sm mb-4">🎯 {stack.goal}</p>
        <p className="text-white/70 leading-relaxed">{stack.description}</p>

        <div className="flex gap-6 mt-6 pt-6 border-t border-white/5 text-sm text-white/30">
          <span>👁 {stack.views.toLocaleString()} views</span>
          <span>⚡ {stack.clones} clones</span>
        </div>
      </div>

      {/* Steps */}
      {stack.steps && stack.steps.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Workflow Steps</h2>
          <div className="space-y-4">
            {stack.steps.map((step, idx) => (
              <div
                key={step.id}
                className="relative flex gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-cyan-400/20 transition-colors"
              >
                {/* Step number */}
                <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/20 flex items-center justify-center text-cyan-400 font-bold text-sm">
                  {idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{step.tool_name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400">
                      {step.role}
                    </span>
                  </div>
                  <p className="text-sm text-white/60">{step.action}</p>
                </div>

                {/* Connector line */}
                {idx < stack.steps!.length - 1 && (
                  <div className="absolute left-[26px] top-full w-0.5 h-4 bg-gradient-to-b from-white/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 text-center">
        <Link
          href="/generate"
          className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition-all hover:scale-105 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
        >
          ✦ Generate a Custom Stack
        </Link>
      </div>
    </div>
  )
}
