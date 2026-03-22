'use client'

import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [particles, setParticles] = useState<any[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [counters, setCounters] = useState({ tools: 0, categories: 0, stacks: 0 })
  const [typewriterIndex, setTypewriterIndex] = useState(0)

  const goals = ['Discover Tools', 'Learn Systems', 'Share Knowledge', 'Build Better']

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      r: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }))
    setParticles(newParticles)
  }, [])

  // Animation loop for particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const animate = () => {
      ctx.fillStyle = 'rgba(11, 11, 12, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections
        particles.forEach((p2, j) => {
          if (i < j) {
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
            if (dist < 150) {
              ctx.strokeStyle = `rgba(59, 130, 246, ${p.opacity * 0.3})`
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [particles])

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

  // Typewriter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTypewriterIndex(prev => (prev + 1) % (goals[Math.floor(typewriterIndex / 20)] || goals[0]).length)
    }, 100)
    return () => clearInterval(interval)
  }, [typewriterIndex])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Custom Cursor */}
      <div
        className="fixed w-3 h-3 bg-blue-500 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
        }}
        onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
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
            <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded border border-blue-400 transition">
              Enter
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-900 rounded border border-gray-700">
              <div className="text-4xl font-bold text-blue-400">{counters.tools}</div>
              <div className="text-gray-300 mt-2">AI Tools</div>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded border border-gray-700">
              <div className="text-4xl font-bold text-purple-400">{counters.categories}</div>
              <div className="text-gray-300 mt-2">Categories</div>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded border border-gray-700">
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
              <div className="p-6 bg-gray-900 rounded border border-gray-700 hover:border-blue-500 transition">
                <h3 className="text-xl font-bold mb-3">Smart Discovery</h3>
                <p className="text-gray-400">Find the perfect AI tools for your workflow</p>
              </div>
              <div className="p-6 bg-gray-900 rounded border border-gray-700 hover:border-purple-500 transition">
                <h3 className="text-xl font-bold mb-3">Community Driven</h3>
                <p className="text-gray-400">Curated by experts, loved by creators</p>
              </div>
              <div className="p-6 bg-gray-900 rounded border border-gray-700 hover:border-pink-500 transition">
                <h3 className="text-xl font-bold mb-3">Live Comparison</h3>
                <p className="text-gray-400">Compare tools side by side</p>
              </div>
              <div className="p-6 bg-gray-900 rounded border border-gray-700 hover:border-cyan-500 transition">
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