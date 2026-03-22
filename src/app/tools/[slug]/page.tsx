import { getTools, getToolBySlug, getRelatedTools } from '@/lib/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ToolCard from '@/components/ToolCard'
import type { Metadata } from 'next'

export const revalidate = 3600

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const tools = await getTools()
  return tools.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = await getToolBySlug(params.slug)
  if (!tool) return { title: 'Tool Not Found' }
  return {
    title: `${tool.name} — RunAtlas`,
    description: tool.description,
  }
}

const BADGE_COLORS: Record<string, string> = {
  free: 'text-green-400 border-green-400/30 bg-green-400/10',
  freemium: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
  paid: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
  enterprise: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
}

export default async function ToolDetailPage({ params }: Props) {
  const tool = await getToolBySlug(params.slug)

  if (!tool) notFound()

  const relatedTools = tool.id.startsWith('fallback')
    ? []
    : await getRelatedTools(tool.id)

  const pricingClass = BADGE_COLORS[tool.pricing] ?? 'text-white/50 border-white/10 bg-white/5'

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Back */}
      <Link href="/tools" className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
        ← Back to Tools
      </Link>

      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-3xl shrink-0">
            {tool.logo ? (
              <img src={tool.logo} alt={tool.name} className="w-12 h-12 object-contain rounded-xl" />
            ) : (
              <span>{tool.name.charAt(0)}</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-white">{tool.name}</h1>
              <span className={`text-sm px-2.5 py-0.5 rounded-full border capitalize ${pricingClass}`}>
                {tool.pricing}
              </span>
              {tool.sponsored_tier && (
                <span className="text-sm px-2.5 py-0.5 rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-400">
                  ✦ Featured
                </span>
              )}
            </div>
            <p className="text-white/50 text-sm mb-3">{tool.company}</p>
            <p className="text-white/70 leading-relaxed">{tool.description}</p>
          </div>

          {tool.website_url && (
            <a
              href={tool.affiliate_url ?? tool.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-5 py-2.5 bg-cyan-400 text-black font-semibold rounded-xl hover:bg-cyan-300 transition-all hover:scale-105"
            >
              Visit Site →
            </a>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {tool.atlas_score !== null && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-cyan-400">{tool.atlas_score}</p>
            <p className="text-xs text-white/40 mt-1">ATLAS Score</p>
          </div>
        )}
        {tool.rating !== null && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-yellow-400">★ {tool.rating}</p>
            <p className="text-xs text-white/40 mt-1">Rating</p>
          </div>
        )}
        {tool.users && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-white">{tool.users}</p>
            <p className="text-xs text-white/40 mt-1">Users</p>
          </div>
        )}
        {tool.context_window !== null && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-purple-400">{(tool.context_window / 1000).toFixed(0)}K</p>
            <p className="text-xs text-white/40 mt-1">Context Window</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {/* Details */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4">Details</h3>
          <dl className="space-y-3">
            <div className="flex justify-between text-sm">
              <dt className="text-white/40">Pricing</dt>
              <dd className={`capitalize ${pricingClass.split(' ')[0]}`}>
                {tool.pricing}{tool.pricing_num ? ` · $${tool.pricing_num}/mo` : ''}
              </dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-white/40">API Available</dt>
              <dd className={tool.api_available ? 'text-green-400' : 'text-white/40'}>
                {tool.api_available ? '✓ Yes' : '✗ No'}
              </dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-white/40">Open Source</dt>
              <dd className={tool.open_source ? 'text-green-400' : 'text-white/40'}>
                {tool.open_source ? '✓ Yes' : '✗ No'}
              </dd>
            </div>
            {tool.deploy && (
              <div className="flex justify-between text-sm">
                <dt className="text-white/40">Deployment</dt>
                <dd className="text-white/70 capitalize">{tool.deploy}</dd>
              </div>
            )}
            {tool.github_stars !== null && (
              <div className="flex justify-between text-sm">
                <dt className="text-white/40">GitHub Stars</dt>
                <dd className="text-white/70">{tool.github_stars.toLocaleString()}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Use Cases */}
        {tool.use_cases && tool.use_cases.length > 0 && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4">Use Cases</h3>
            <ul className="space-y-2">
              {tool.use_cases.map((uc) => (
                <li key={uc} className="flex items-start gap-2 text-sm text-white/60">
                  <span className="text-cyan-400 mt-0.5">→</span>
                  {uc}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tags */}
      {tool.tags && tool.tags.length > 0 && (
        <div className="mb-10">
          <h3 className="font-semibold text-white mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Integrates With</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.slice(0, 3).map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
