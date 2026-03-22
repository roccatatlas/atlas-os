'use client'
import Link from 'next/link'
import { Tool } from '@/lib/data'

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

function PricingBadge({ pricing }: { pricing: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    free: { bg: '#10b98122', color: '#10b981' },
    freemium: { bg: '#06b6d422', color: '#06b6d4' },
    paid: { bg: '#3b82f622', color: '#3b82f6' },
    enterprise: { bg: '#7c3aed22', color: '#7c3aed' },
  }
  const style = map[pricing?.toLowerCase()] || map.paid
  return (
    <span style={{
      background: style.bg,
      color: style.color,
      border: `1px solid ${style.color}33`,
      borderRadius: 6,
      padding: '2px 8px',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.05em',
      textTransform: 'capitalize' as const,
    }}>
      {pricing}
    </span>
  )
}

export default function ToolCard({ tool }: { tool: Tool }) {
  const color = CATEGORY_COLORS[tool.category] || CATEGORY_COLORS.default

  return (
    <Link href={`/tools/${tool.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#111214',
        border: '1px solid #1E1F23',
        borderRadius: 12,
        padding: '20px',
        height: '100%',
        cursor: 'pointer',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.borderColor = `${color}44`
          el.style.boxShadow = `0 0 24px ${color}18`
          el.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.borderColor = '#1E1F23'
          el.style.boxShadow = 'none'
          el.style.transform = 'translateY(0)'
        }}
      >
        {/* Subtle corner glow */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: 60, height: 60,
          background: `radial-gradient(circle at top left, ${color}15, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Logo / Icon */}
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: `${color}15`,
              border: `1px solid ${color}22`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }}>
              {tool.logo || '🤖'}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{tool.name}</div>
              {tool.company && (
                <div style={{ fontSize: 11, color: '#8F8F93' }}>{tool.company}</div>
              )}
            </div>
          </div>
          {tool.pricing && <PricingBadge pricing={tool.pricing} />}
        </div>

        {/* Description */}
        <p style={{
          fontSize: 12, color: '#8F8F93', lineHeight: 1.6,
          marginBottom: 14,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden',
        }}>{tool.description}</p>

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
            {tool.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{
                background: '#1E1F23', color: '#8F8F93',
                borderRadius: 4, padding: '2px 6px',
                fontSize: 10, fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: '1px solid #1E1F23', paddingTop: 12, marginTop: 4,
        }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color, opacity: 0.8,
          }}>
            {tool.category}
          </span>
          {tool.atlas_score && (
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: tool.atlas_score >= 80 ? '#06b6d4' : '#8F8F93',
            }}>
              ★ {Math.round(Number(tool.atlas_score))}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
