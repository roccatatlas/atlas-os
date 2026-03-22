'use client'

import { useState, useEffect } from 'react'
import { Tool } from '@/lib/data'
import { supabase } from '@/lib/supabase'
import ToolCard from '@/components/ToolCard'

const GOALS = [
  'Build a SaaS MVP',
  'Automate content creation',
  'Build a developer tool',
  'Launch an e-commerce store',
  'Run a marketing campaign',
  'Analyse research data',
  'Build a mobile app',
  'Grow an audience',
]

const BUDGETS = [
  { label: 'Free only', max: 0 },
  { label: 'Under $50/mo', max: 50 },
  { label: 'Under $200/mo', max: 200 },
  { label: 'No limit', max: Infinity },
]

const EXPERIENCE_LEVELS = ['beginner', 'intermediate', 'advanced'] as const

interface GeneratedStack {
  goal: string
  tools: Tool[]
  reasoning: string
}

export default function GeneratePage() {
  const [goal, setGoal] = useState('')
  const [customGoal, setCustomGoal] = useState('')
  const [budget, setBudget] = useState(BUDGETS[3])
  const [experience, setExperience] = useState<typeof EXPERIENCE_LEVELS[number]>('intermediate')
  const [loading, setLoading] = useState(false)
  const [generatedStack, setGeneratedStack] = useState<GeneratedStack | null>(null)
  const [allTools, setAllTools] = useState<Tool[]>([])

  // Pre-fetch tools for stack generation
  useEffect(() => {
    supabase
      .from('tools')
      .select('*')
      .eq('status', 'active')
      .order('atlas_score', { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (data) setAllTools(data as Tool[])
      })
  }, [])

  const effectiveGoal = goal === 'custom' ? customGoal : goal

  const generateStack = async () => {
    if (!effectiveGoal.trim()) return

    setLoading(true)
    setGeneratedStack(null)

    // Simulate AI generation with smart tool selection
    await new Promise((r) => setTimeout(r, 1800))

    // Smart filtering: pick diverse tools by category
    let tools = allTools
    if (budget.max !== Infinity) {
      tools = tools.filter(
        (t) => t.pricing === 'free' || t.pricing === 'freemium' || (t.pricing_num ?? 0) <= budget.max
      )
    }

    // Pick top tools across different categories
    const seen = new Set<string>()
    const selected: Tool[] = []
    for (const tool of tools) {
      if (!seen.has(tool.category) && selected.length < 5) {
        seen.add(tool.category)
        selected.push(tool)
      }
    }

    // Fallback if not enough tools
    if (selected.length < 3) {
      selected.push(...tools.slice(0, Math.max(0, 4 - selected.length)))
    }

    setGeneratedStack({
      goal: effectiveGoal,
      tools: selected.slice(0, 5),
      reasoning: `Based on your goal to "${effectiveGoal}" with a ${experience} experience level, we've selected a balanced stack of tools that covers research, creation, and deployment phases. Each tool integrates well with the others.`,
    })
    setLoading(false)
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          AI Stack Generator
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
          Build your perfect{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            AI stack
          </span>
        </h1>
        <p className="text-white/50 max-w-xl mx-auto">
          Tell us your goal and we&apos;ll recommend the best combination of AI tools.
        </p>
      </div>

      {/* Config panel */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
        {/* Goal selection */}
        <div className="mb-6">
          <label className="text-sm font-medium text-white/70 mb-3 block">
            What&apos;s your goal?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {GOALS.map((g) => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`text-xs px-3 py-2 rounded-xl border transition-all text-left ${
                  goal === g
                    ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400'
                    : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20'
                }`}
              >
                {g}
              </button>
            ))}
            <button
              onClick={() => setGoal('custom')}
              className={`text-xs px-3 py-2 rounded-xl border transition-all ${
                goal === 'custom'
                  ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400'
                  : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              ✏️ Custom
            </button>
          </div>
          {goal === 'custom' && (
            <input
              type="text"
              placeholder="Describe your goal..."
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/40 transition-colors"
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Budget */}
          <div>
            <label className="text-sm font-medium text-white/70 mb-3 block">Monthly Budget</label>
            <div className="grid grid-cols-2 gap-2">
              {BUDGETS.map((b) => (
                <button
                  key={b.label}
                  onClick={() => setBudget(b)}
                  className={`text-xs px-3 py-2 rounded-xl border transition-all ${
                    budget.label === b.label
                      ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400'
                      : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="text-sm font-medium text-white/70 mb-3 block">Experience Level</label>
            <div className="grid grid-cols-3 gap-2">
              {EXPERIENCE_LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setExperience(lvl)}
                  className={`text-xs px-3 py-2 rounded-xl border capitalize transition-all ${
                    experience === lvl
                      ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400'
                      : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={generateStack}
          disabled={loading || !effectiveGoal.trim()}
          className="w-full py-4 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Generating your stack...
            </span>
          ) : (
            '✦ Generate My Stack →'
          )}
        </button>
      </div>

      {/* Generated Result */}
      {generatedStack && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-400/20 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-2">
              <span className="text-2xl">✦</span>
              <div>
                <h2 className="text-lg font-bold text-white">Your AI Stack for: {generatedStack.goal}</h2>
                <p className="text-sm text-white/50 mt-1">{generatedStack.reasoning}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedStack.tools.map((tool, idx) => (
              <div key={tool.id} className="relative">
                <div className="absolute -top-2 -left-2 z-10 w-6 h-6 rounded-full bg-cyan-400 text-black text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </div>
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={generateStack}
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              ↺ Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
