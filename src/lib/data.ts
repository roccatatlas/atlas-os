import { supabase } from './supabase'

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

export interface Tool {
  id: string
  slug: string
  name: string
  description: string
  category: string
  company: string
  pricing: string
  pricing_num: number | null
  logo: string | null
  rating: number | null
  users: string | null
  api_available: boolean
  open_source: boolean
  deploy: string | null
  integrations: string[] | null
  context_window: number | null
  affiliate_url: string | null
  atlas_score: number | null
  monthly_visitors: number | null
  github_stars: number | null
  website_url: string | null
  sponsored_tier: string | null
  tags: string[]
  use_cases: string[]
  status: string
}

export interface Category {
  id: number
  slug: string
  name: string
  super_cat: string | null
  description: string | null
  tool_count: number
  icon: string | null
  display_order: number
  status: string
}

export interface StackStep {
  id: string
  stack_id: string
  tool_name: string
  role: string
  action: string
  step_order: number
}

export interface Stack {
  id: string
  slug: string
  title: string
  goal: string
  description: string
  difficulty: string
  cost_monthly: number | null
  views: number
  clones: number
  is_public: boolean
  status: string
  steps?: StackStep[]
}

export interface Comparison {
  id: string
  tool_a_id: string
  tool_b_id: string
  slug: string
  verdict: string | null
  content_json: Record<string, unknown> | null
  views: number
  tool_a?: { name: string; slug: string; logo: string | null }
  tool_b?: { name: string; slug: string; logo: string | null }
}

// ─── Fallback Demo Data ─────────────────────────────────────────────────────

const FALLBACK_TOOLS: Tool[] = [
  {
    id: 'fallback-1',
    slug: 'chatgpt',
    name: 'ChatGPT',
    description: 'The most popular AI assistant for writing, coding, analysis, and more.',
    category: 'llm',
    company: 'OpenAI',
    pricing: 'freemium',
    pricing_num: 20,
    logo: null,
    rating: 4.8,
    users: '100M+',
    api_available: true,
    open_source: false,
    deploy: 'cloud',
    integrations: ['Zapier', 'Slack', 'Microsoft 365'],
    context_window: 128000,
    affiliate_url: null,
    atlas_score: 98,
    monthly_visitors: 1500000000,
    github_stars: null,
    website_url: 'https://chat.openai.com',
    sponsored_tier: null,
    tags: ['chatbot', 'writing', 'coding', 'analysis'],
    use_cases: ['Content creation', 'Code generation', 'Data analysis'],
    status: 'active',
  },
  {
    id: 'fallback-2',
    slug: 'midjourney',
    name: 'Midjourney',
    description: 'AI image generation tool producing stunning artistic visuals.',
    category: 'image-gen',
    company: 'Midjourney',
    pricing: 'paid',
    pricing_num: 10,
    logo: null,
    rating: 4.7,
    users: '15M+',
    api_available: false,
    open_source: false,
    deploy: 'cloud',
    integrations: ['Discord'],
    context_window: null,
    affiliate_url: null,
    atlas_score: 94,
    monthly_visitors: 50000000,
    github_stars: null,
    website_url: 'https://midjourney.com',
    sponsored_tier: null,
    tags: ['image', 'art', 'design', 'creative'],
    use_cases: ['Art creation', 'Marketing visuals', 'Concept design'],
    status: 'active',
  },
  {
    id: 'fallback-3',
    slug: 'cursor',
    name: 'Cursor',
    description: 'AI-powered code editor built for pair programming with AI.',
    category: 'coding',
    company: 'Anysphere',
    pricing: 'freemium',
    pricing_num: 20,
    logo: null,
    rating: 4.9,
    users: '1M+',
    api_available: false,
    open_source: false,
    deploy: 'desktop',
    integrations: ['GitHub', 'GitLab'],
    context_window: null,
    affiliate_url: null,
    atlas_score: 97,
    monthly_visitors: 10000000,
    github_stars: null,
    website_url: 'https://cursor.sh',
    sponsored_tier: null,
    tags: ['coding', 'IDE', 'developer', 'productivity'],
    use_cases: ['Code generation', 'Debugging', 'Refactoring'],
    status: 'active',
  },
  {
    id: 'fallback-4',
    slug: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s AI assistant focused on safety and nuanced reasoning.',
    category: 'llm',
    company: 'Anthropic',
    pricing: 'freemium',
    pricing_num: 20,
    logo: null,
    rating: 4.7,
    users: '10M+',
    api_available: true,
    open_source: false,
    deploy: 'cloud',
    integrations: ['Slack', 'Zapier'],
    context_window: 200000,
    affiliate_url: null,
    atlas_score: 96,
    monthly_visitors: 80000000,
    github_stars: null,
    website_url: 'https://claude.ai',
    sponsored_tier: null,
    tags: ['chatbot', 'writing', 'analysis', 'safety'],
    use_cases: ['Long document analysis', 'Writing', 'Research'],
    status: 'active',
  },
]

const FALLBACK_CATEGORIES: Category[] = [
  { id: 1, slug: 'llm', name: 'Language Models', super_cat: 'AI Core', description: 'Large language models and chatbots', tool_count: 24, icon: '🧠', display_order: 1, status: 'active' },
  { id: 2, slug: 'image-gen', name: 'Image Generation', super_cat: 'Creative AI', description: 'AI image and art generation tools', tool_count: 18, icon: '🎨', display_order: 2, status: 'active' },
  { id: 3, slug: 'coding', name: 'Coding Assistants', super_cat: 'Dev Tools', description: 'AI-powered coding and developer tools', tool_count: 15, icon: '💻', display_order: 3, status: 'active' },
  { id: 4, slug: 'productivity', name: 'Productivity', super_cat: 'Workflows', description: 'Automate tasks and boost productivity', tool_count: 20, icon: '⚡', display_order: 4, status: 'active' },
]

const FALLBACK_STACKS: Stack[] = [
  {
    id: 'stack-1',
    slug: 'saas-mvp-stack',
    title: 'SaaS MVP Builder',
    goal: 'Build a SaaS product from idea to launch',
    description: 'A battle-tested stack for solo founders building their first SaaS.',
    difficulty: 'intermediate',
    cost_monthly: 60,
    views: 1240,
    clones: 87,
    is_public: true,
    status: 'approved',
    steps: [
      { id: 's1', stack_id: 'stack-1', tool_name: 'ChatGPT', role: 'Ideation', action: 'Validate your idea and write copy', step_order: 1 },
      { id: 's2', stack_id: 'stack-1', tool_name: 'Cursor', role: 'Development', action: 'Build the product with AI assistance', step_order: 2 },
      { id: 's3', stack_id: 'stack-1', tool_name: 'Midjourney', role: 'Design', action: 'Generate brand visuals', step_order: 3 },
    ],
  },
]

// ─── Data Fetching Functions ────────────────────────────────────────────────

export async function getTools(): Promise<Tool[]> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('status', 'active')
      .order('atlas_score', { ascending: false })

    if (error) throw error
    if (!data || data.length === 0) return FALLBACK_TOOLS

    return data as Tool[]
  } catch (err) {
    console.error('[getTools] Supabase error, using fallback:', err)
    return FALLBACK_TOOLS
  }
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data as Tool
  } catch (err) {
    console.error(`[getToolBySlug] Error for slug "${slug}", using fallback:`, err)
    return FALLBACK_TOOLS.find((t) => t.slug === slug) ?? null
  }
}

export async function getToolsByCategory(category: string): Promise<Tool[]> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('category', category)
      .eq('status', 'active')
      .order('atlas_score', { ascending: false })

    if (error) throw error
    if (!data || data.length === 0) return FALLBACK_TOOLS.filter((t) => t.category === category)

    return data as Tool[]
  } catch (err) {
    console.error(`[getToolsByCategory] Error for category "${category}":`, err)
    return FALLBACK_TOOLS.filter((t) => t.category === category)
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('status', 'active')
      .order('display_order', { ascending: true })

    if (error) throw error
    if (!data || data.length === 0) return FALLBACK_CATEGORIES

    return data as Category[]
  } catch (err) {
    console.error('[getCategories] Supabase error, using fallback:', err)
    return FALLBACK_CATEGORIES
  }
}

export async function getStacks(): Promise<Stack[]> {
  try {
    const { data, error } = await supabase
      .from('stacks')
      .select('*')
      .eq('is_public', true)
      .eq('status', 'approved')
      .order('views', { ascending: false })

    if (error) throw error
    if (!data || data.length === 0) return FALLBACK_STACKS

    return data as Stack[]
  } catch (err) {
    console.error('[getStacks] Supabase error, using fallback:', err)
    return FALLBACK_STACKS
  }
}

export async function getStackBySlug(slug: string): Promise<Stack | null> {
  try {
    const { data: stackData, error: stackError } = await supabase
      .from('stacks')
      .select('*')
      .eq('slug', slug)
      .single()

    if (stackError) throw stackError

    const { data: steps, error: stepsError } = await supabase
      .from('stack_steps')
      .select('*')
      .eq('stack_id', stackData.id)
      .order('step_order', { ascending: true })

    if (stepsError) console.warn('[getStackBySlug] Could not fetch steps:', stepsError)

    return { ...stackData, steps: steps ?? [] } as Stack
  } catch (err) {
    console.error(`[getStackBySlug] Error for slug "${slug}", using fallback:`, err)
    return FALLBACK_STACKS.find((s) => s.slug === slug) ?? null
  }
}

export async function getComparisons(): Promise<Comparison[]> {
  try {
    const { data, error } = await supabase
      .from('tool_comparisons')
      .select(`
        *,
        tool_a:tool_a_id ( name, slug, logo ),
        tool_b:tool_b_id ( name, slug, logo )
      `)
      .order('views', { ascending: false })

    if (error) throw error
    return (data ?? []) as Comparison[]
  } catch (err) {
    console.error('[getComparisons] Supabase error:', err)
    return []
  }
}

export async function searchTools(query: string): Promise<Tool[]> {
  if (!query.trim()) return []

  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('status', 'active')
      .ilike('name', `%${query}%`)
      .order('atlas_score', { ascending: false })
      .limit(20)

    if (error) throw error
    if (!data || data.length === 0) {
      // Fallback: filter local fallback data
      return FALLBACK_TOOLS.filter((t) =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase())
      )
    }

    return data as Tool[]
  } catch (err) {
    console.error('[searchTools] Supabase error:', err)
    return FALLBACK_TOOLS.filter((t) =>
      t.name.toLowerCase().includes(query.toLowerCase())
    )
  }
}

export async function getRelatedTools(toolId: string): Promise<Tool[]> {
  try {
    const { data: integrations, error: intError } = await supabase
      .from('tool_integrations')
      .select('integrates_with_id')
      .eq('tool_id', toolId)

    if (intError) throw intError
    if (!integrations || integrations.length === 0) return []

    const relatedIds = integrations.map((i) => i.integrates_with_id)

    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .in('id', relatedIds)
      .eq('status', 'active')

    if (error) throw error
    return (data ?? []) as Tool[]
  } catch (err) {
    console.error(`[getRelatedTools] Error for toolId "${toolId}":`, err)
    return []
  }
}
