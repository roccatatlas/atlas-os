'use client'

import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [counters, setCounters] = useState({ tools: 0, categories: 0, stacks: 0 })
  const [typewriterIndex, setTypewriterIndex] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<any[]>([])
  const mousePosRef = useRef({ x: 0, y: 0 })
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()

  const goals = ['Discover Tools', 'Learn Systems', 'Share Knowledge', 'Build Better']

  // Initialize particles
  useEffect(() => {
    particlesRef.current = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }))
  }, [])

  // OPTIMIZED: Use requestAnimationFrame for cursor (not React state)
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
      
      const dot = cursorDotRef.current
      const ring = cursorRingRef.current
      
      if (dot) {
        dot.style.left = `${e.clientX}px`
        dot.style.top = `${e.clientY}px`
      }
      if (ring) {
        ring.style.left = `${e.clientX}px`
        ring.style.top = `${e.clientY}px`
      }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('hoverable')) {
        cursorDotRef.current?.classList.add('hovering')
        cursorRingRef.current?.classList.add('hovering')
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('hoverable')) {
        cursorDotRef.current?.classList.remove('hovering')
        cursorRingRef.current?.classList.remove('hovering')
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  // OPTIMIZED: Canvas animation - reduced particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()

        // Only draw connections for nearby particles (more efficient)
        if (i % 2 === 0) {
          const p2 = particlesRef.current[i + 1]
          if (p2) {
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
            if (dist < 120) {
              ctx.strokeStyle = `rgba(59, 130, 246, ${p.opacity * 0.2})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        tools: prev.tools < 30 ? prev.tools + 1 : 30,
        categories: prev.categories < 12 ? prev.categories + 1 : 12,
        stacks: prev.stacks < 6 ? prev.stacks + 1 : 6,
      }))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Canvas Background - Optimized */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full"
        style={{ filter: 'brightness(0.8)' }}
      />

      {/* OPTIMIZED: Custom Cursor - Direct DOM manipulation */}
      <div
        ref={cursorDotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          backgroundColor: 'rgb(59, 130, 246)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 50,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)',
        }}
      />
      <div
        ref={cursorRingRef}
        className="cursor-ring"
        style={{
          position: 'fixed',
          width: '40px',
          height: '40px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 50,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              RunAtlas
            </h1>
            <p className="text-xl text-gray-300">
              AI Tool Discovery Platform
            </p>
            <button className="hoverable px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded border border-blue-400 transition">
              Enter
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-900 rounded border border-gray-700 hoverable">
              <div className="text-4xl font-bold text-blue-400">{counters.tools}</div>
              <div className="text-gray-300 mt-2">AI Tools</div>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded border border-gray-700 hoverable">
              <div className="text-4xl font-bold text-purple-400">{counters.categories}</div>
              <div className="text-gray-300 mt-2">Categories</div>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded border border-gray-700 hoverable">
              <div className="text-4xl font-bold text-pink-400">{counters.stacks}</div>
              <div className="text-gray-300 mt-2">Stacks</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="hoverable p-6 bg-gray-900 rounded border border-gray-700 hover:border-blue-500 transition">
                <h3 className="text-xl font-bold mb-3">Smart Discovery</h3>
                <p className="text-gray-400">Find the perfect AI tools for your workflow</p>
              </div>
              <div className="hoverable p-6 bg-gray-900 rounded border border-gray-700 hover:border-purple-500 transition">
                <h3 className="text-xl font-bold mb-3">Community Driven</h3>
                <p className="text-gray-400">Curated by experts, loved by creators</p>
              </div>
              <div className="hoverable p-6 bg-gray-900 rounded border border-gray-700 hover:border-pink-500 transition">
                <h3 className="text-xl font-bold mb-3">Live Comparison</h3>
                <p className="text-gray-400">Compare tools side by side</p>
              </div>
              <div className="hoverable p-6 bg-gray-900 rounded border border-gray-700 hover:border-cyan-500 transition">
                <h3 className="text-xl font-bold mb-3">Daily Updated</h3>
                <p className="text-gray-400">Always fresh tools and insights</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-gray-800">
          <div className="max-w-5xl mx-auto text-center text-gray-500">
            <p>RunAtlas - Discover the Tools. Master the Systems.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
