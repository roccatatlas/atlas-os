import { getTools, getCategories } from '@/lib/data'
import ToolCatalog from './ToolCatalog'
import Navbar from '@/components/Navbar'

export const revalidate = 3600

export default async function ToolsPage() {
  const [tools, categories] = await Promise.all([getTools(), getCategories()])

  return (
    <div style={{ background: '#0B0B0C', minHeight: '100vh', color: '#fff' }}>
      <Navbar />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 20px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{
            display: 'inline-block',
            background: '#06b6d410', color: '#06b6d4',
            border: '1px solid #06b6d422',
            borderRadius: 20, padding: '4px 16px',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            marginBottom: 16,
          }}>
            AI TOOL CATALOG
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #f8fafc 20%, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 8,
          }}>
            AI Tool Catalog
          </h1>
          <p style={{ color: '#8F8F93', fontSize: 14 }}>
            {tools.length} tools ranked by ATLAS Score
          </p>
        </div>

        <ToolCatalog tools={tools} categories={categories} />
      </div>
    </div>
  )
}
