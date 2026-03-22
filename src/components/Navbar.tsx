'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { href: '/tools', label: 'Tools' },
    { href: '/stacks', label: 'Stacks' },
    { href: '/categories', label: 'Categories' },
    { href: '/generate', label: 'Generate' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 64,
      background: scrolled ? 'rgba(11,11,12,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid #1E1F23' : '1px solid transparent',
      transition: 'all 0.6s ease',
      display: 'flex', alignItems: 'center',
      padding: '0 32px',
    }}>
      <div style={{
        maxWidth: 1200, width: '100%', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{
            fontSize: 18, fontWeight: 900, letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #ffffff, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>ATLAS</span>
          <span style={{ fontSize: 10, color: '#334155', marginLeft: 8, fontWeight: 700, letterSpacing: 2 }}>OS</span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              color: pathname === l.href ? '#ffffff' : '#8F8F93',
              background: pathname === l.href ? '#1E1F23' : 'transparent',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}>
              {l.label}
            </Link>
          ))}
          <Link href="/tools" style={{
            marginLeft: 8,
            padding: '8px 20px',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            color: '#fff',
            textDecoration: 'none',
            boxShadow: '0 0 20px rgba(6,182,212,0.25)',
            transition: 'box-shadow 0.3s ease',
          }}>
            Explore Atlas
          </Link>
        </div>
      </div>
    </nav>
  )
}
