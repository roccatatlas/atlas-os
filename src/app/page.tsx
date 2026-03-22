'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

// ─── DATA ───
const MARQUEE_TOOLS = [
  { name: 'ChatGPT', c: '#10B981' }, { name: 'Claude', c: '#7C3AED' },
  { name: 'Midjourney', c: '#3B82F6' }, { name: 'Runway', c: '#EC4899' },
  { name: 'Cursor', c: '#F59E0B' }, { name: 'ElevenLabs', c: '#06B6D4' },
  { name: 'Perplexity', c: '#6366F1' }, { name: 'Zapier', c: '#14B8A6' },
  { name: 'Figma AI', c: '#EC4899' }, { name: 'Copilot', c: '#10B981' },
  { name: 'Suno', c: '#F59E0B' }, { name: 'Replicate', c: '#3B82F6' },
  { name: 'Hugging Face', c: '#7C3AED' }, { name: 'Stability AI', c: '#06B6D4' },
  { name: 'Jasper', c: '#EC4899' }, { name: 'Descript', c: '#F59E0B' },
  { name: 'v0', c: '#10B981' }, { name: 'Bolt', c: '#6366F1' },
  { name: 'Lovable', c: '#EC4899' }, { name: 'Kling', c: '#14B8A6' },
]

const WORKFLOW = [
  { tool: 'Perplexity', role: 'Deep Research', color: 'var(--accent-cyan)', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.15)' },
  { tool: 'Claude', role: 'Script Writing', color: 'var(--accent-purple)', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.15)' },
  { tool: 'ElevenLabs', role: 'Voice Synthesis', color: 'var(--accent-green)', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.15)' },
  { tool: 'Runway', role: 'Visual Generation', color: 'var(--accent-pink)', bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.15)' },
  { tool: 'Descript', role: 'Edit & Publish', color: 'var(--accent-amber)', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.15)' },
]

const CONSTELLATIONS = [
  { name: 'Language Models', count: '2,400+', c: 'var(--accent-purple)' },
  { name: 'Image Generation', count: '1,800+', c: 'var(--accent-blue)' },
  { name: 'Automation', count: '1,200+', c: 'var(--accent-green)' },
  { name: 'Code Assistants', count: '980+', c: 'var(--accent-teal)' },
  { name: 'Video & Motion', count: '640+', c: 'var(--accent-amber)' },
  { name: 'Audio & Voice', count: '520+', c: 'var(--accent-pink)' },
  { name: 'AI Agents', count: '890+', c: 'var(--accent-indigo)' },
  { name: 'Data & Analytics', count: '1,100+', c: 'var(--accent-cyan)' },
]

const FEATURED_TOOLS = [
  { name: 'ChatGPT', cat: 'Language Model', desc: 'The most versatile conversational AI for reasoning, code, and creative tasks.', c: '#10B981', icon: 'G' },
  { name: 'Claude', cat: 'Language Model', desc: 'Advanced reasoning with long context windows and careful, nuanced analysis.', c: '#7C3AED', icon: 'C' },
  { name: 'Midjourney', cat: 'Image Generation', desc: 'Create stunning art and visuals from text prompts with unmatched aesthetics.', c: '#3B82F6', icon: 'M' },
  { name: 'Cursor', cat: 'Code Assistant', desc: 'AI-native code editor that writes, refactors, and debugs alongside you.', c: '#F59E0B', icon: 'Cu' },
  { name: 'Runway', cat: 'Video Generation', desc: 'Generate cinematic video content using AI — from text to motion picture.', c: '#EC4899', icon: 'R' },
  { name: 'ElevenLabs', cat: 'Audio & Voice', desc: 'Ultra-realistic AI voice generation and multi-language text-to-speech.', c: '#06B6D4', icon: 'E' },
  { name: 'Perplexity', cat: 'Research', desc: 'AI search engine delivering sourced, real-time answers with citations.', c: '#6366F1', icon: 'P' },
  { name: 'v0', cat: 'Code Assistant', desc: 'Generate production-ready UI components from natural language prompts.', c: '#14B8A6', icon: 'v0' },
]

const SYSTEM_LAYERS = [
  { icon: '◈', name: 'Interface', desc: 'Web · Dashboard · API', c: 'var(--accent-cyan)' },
  { icon: '⬡', name: 'Intelligence', desc: 'Stack Generator · Recs', c: 'var(--accent-purple)' },
  { icon: '◎', name: 'Agents', desc: 'Architect · Research · Build', c: 'var(--accent-blue)' },
  { icon: '⊕', name: 'Discovery', desc: 'GitHub · PH · HuggingFace', c: 'var(--accent-green)' },
  { icon: '◉', name: 'Data Core', desc: 'Knowledge Graph · SQL', c: 'var(--accent-amber)' },
  { icon: '△', name: 'Distribution', desc: 'Social · Newsletter · SDK', c: 'var(--accent-pink)' },
]

const HERO_NODES = [
  { x: 10, y: 20, s: 5, c: 'var(--accent-blue)', d: 6, delay: 0 },
  { x: 88, y: 25, s: 4, c: 'var(--accent-purple)', d: 7, delay: 1 },
  { x: 6, y: 65, s: 6, c: 'var(--accent-green)', d: 8, delay: 0.5 },
  { x: 92, y: 60, s: 3, c: 'var(--accent-amber)', d: 5.5, delay: 1.5 },
  { x: 20, y: 85, s: 4, c: 'var(--accent-pink)', d: 7.5, delay: 2 },
  { x: 80, y: 80, s: 5, c: 'var(--accent-cyan)', d: 6, delay: 0.8 },
  { x: 50, y: 12, s: 3, c: 'var(--accent-indigo)', d: 9, delay: 1.2 },
  { x: 35, y: 75, s: 4, c: 'var(--accent-teal)', d: 6.5, delay: 0.3 },
  { x: 65, y: 88, s: 3, c: 'var(--accent-blue)', d: 8, delay: 2.5 },
]

// ─── TYPEWRITER HOOK ───
function useTypewriter(words: string[], speed = 40) {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing')
  const idx = useRef(0)

  useEffect(() => {
    const target = words[idx.current]
    let timer: NodeJS.Timeout

    if (phase === 'typing') {
      if (text.length < target.length) {
        timer = setTimeout(() => setText(target.slice(0, text.length + 1)), speed + Math.random() * 30)
      } else {
        timer = setTimeout(() => setPhase('pause'), 3000)
      }
    } else if (phase === 'pause') {
      timer = setTimeout(() => setPhase('deleting'), 400)
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), 20)
      } else {
        idx.current = (idx.current + 1) % words.length
        setPhase('typing')
      }
    }
    return () => clearTimeout(timer)
  }, [text, phase, words, speed])

  return text
}

// ─── ANIMATED COUNTER HOOK ───
function useCounter(target: number, suffix: string, duration = 2000) {
  const [value, setValue] = useState('0' + suffix)
  const ref = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !triggered.current) {
        triggered.current = true
        const start = performance.now()
        function update(now: number) {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(Math.round(target * eased).toLocaleString() + suffix)
          if (p < 1) requestAnimationFrame(update)
        }
        requestAnimationFrame(update)
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, suffix, duration])

  return { value, ref }
}

// ─── TOPOGRAPHIC CANVAS ───
function TopoCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number
    let time = 0

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function noise(x: number, y: number, t: number) {
      return Math.sin(x * 0.006 + t * 0.2) * Math.cos(y * 0.005 + t * 0.15) +
             Math.sin(x * 0.01 - y * 0.008 + t * 0.1) * 0.6 +
             Math.cos(x * 0.004 + y * 0.006 + t * 0.18) * 0.4
    }

    function draw() {
      const w = canvas!.width, h = canvas!.height
      ctx!.clearRect(0, 0, w, h)
      const levels = 20, step = 10

      for (let level = 0; level < levels; level++) {
        const threshold = (level / levels) * 2.8 - 1.4
        const alpha = 0.04 + (level % 4 === 0 ? 0.06 : 0)
        ctx!.strokeStyle = `rgba(59, 130, 246, ${alpha})`
        ctx!.lineWidth = level % 4 === 0 ? 0.8 : 0.4
        ctx!.beginPath()

        for (let x = 0; x < w; x += step) {
          let prevPy: number | null = null
          for (let y = 0; y < h; y += step) {
            const v = noise(x, y, time)
            const right = x + step < w ? noise(x + step, y, time) : v
            const bottom = y + step < h ? noise(x, y + step, time) : v

            if ((v >= threshold) !== (right >= threshold)) {
              const t_val = Math.abs(threshold - v) / (Math.abs(right - v) + 0.001)
              const px = x + t_val * step
              ctx!.moveTo(px, y); ctx!.lineTo(px, y + step * 0.6)
            }
            if ((v >= threshold) !== (bottom >= threshold)) {
              const t_val = Math.abs(threshold - v) / (Math.abs(bottom - v) + 0.001)
              const py = y + t_val * step
              if (prevPy !== null && Math.abs(py - prevPy) < step * 2) {
                ctx!.lineTo(x, py)
              } else {
                ctx!.moveTo(x, py)
              }
              prevPy = py
            }
          }
        }
        ctx!.stroke()
      }

      time += 0.002
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}

// ─── PARTICLE CANVAS ───
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['59,130,246', '124,58,237', '6,182,212', '16,185,129', '99,102,241']
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.4 + 0.1,
    }))

    function draw() {
      const w = canvas!.width, h = canvas!.height
      ctx!.clearRect(0, 0, w, h)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx!.beginPath()
            ctx!.strokeStyle = `rgba(59,130,246,${0.03 * (1 - dist / 150)})`
            ctx!.lineWidth = 0.5
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${p.color},${p.alpha})`
        ctx!.fill()

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${p.color},${p.alpha * 0.15})`
        ctx!.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }} />
}

// ─── SCROLL REVEAL ───
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setVisible(true)
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(60px)',
        transition: `opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// ─── CUSTOM CURSOR ───
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const dot = dotRef.current, ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMove)

    let animId: number
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
    function animate() {
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)
      ring!.style.left = rx + 'px'
      ring!.style.top = ry + 'px'
      animId = requestAnimationFrame(animate)
    }
    animate()

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)
    const targets = document.querySelectorAll('button, a, .tool-card, .constellation-card, .system-cell, .chaos-tag')
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${hovering ? 'hovering' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  )
}

// ─── MAIN PAGE ───
export default function HomePage() {
  const [navScrolled, setNavScrolled] = useState(false)
  const typed = useTypewriter([
    '"Automate my YouTube pipeline"',
    '"Build an AI customer support agent"',
    '"Generate marketing visuals at scale"',
    '"Create a podcast from blog posts"',
  ])

  const statTools = useCounter(10000, '+')
  const statCats = useCounter(300, '+')

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Parallax glow orbs
  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY
      document.querySelectorAll('.glow-orb').forEach((orb, i) => {
        const speed = 0.02 + (i % 3) * 0.01
        ;(orb as HTMLElement).style.transform = `translate(-50%, calc(-50% + ${sy * speed}px))`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-primary)', overflowX: 'hidden' }}>
      {/* OVERLAY LAYERS */}
      <div className="grain" />
      <div className="scanline" />
      <div className="vignette" />
      <TopoCanvas />
      <ParticleCanvas />
      <CustomCursor />

      {/* ── NAVBAR ── */}
      <nav className={`navbar ${navScrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
          RUN<span>ATLAS</span>
        </Link>
        <div className="nav-links">
          <Link href="/tools">Tools</Link>
          <Link href="/stacks">Stacks</Link>
          <Link href="/categories">Galaxy</Link>
          <Link href="/search">Search</Link>
        </div>
        <Link href="/tools" className="nav-cta" style={{ textDecoration: 'none' }}>
          Enter Atlas
        </Link>
      </nav>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* SCENE 1: HERO */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="scene hero">
        <div className="glow-orb" style={{ width: 700, height: 700, background: 'rgba(59,130,246,0.05)', left: '50%', top: '45%', transform: 'translate(-50%,-50%)' }} />
        <div className="glow-orb" style={{ width: 500, height: 500, background: 'rgba(124,58,237,0.03)', left: '25%', top: '65%', transform: 'translate(-50%,-50%)' }} />

        {/* Floating nodes */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
          {HERO_NODES.map((n, i) => (
            <div key={i} style={{
              position: 'absolute', left: `${n.x}%`, top: `${n.y}%`,
              width: n.s, height: n.s, borderRadius: '50%',
              background: n.c, boxShadow: `0 0 ${n.s * 2}px ${n.c}`,
              animation: `nodeFloat ${n.d}s ${n.delay}s infinite ease-in-out`,
              opacity: 0.5,
            }} />
          ))}
        </div>

        <div className="hero-content">
          <Reveal>
            <div className="hero-badge">
              <div className="pulse" />
              NAVIGATING THE AI UNIVERSE
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="hero-title">
              <span className="line">The Map of</span>
              <span className="line accent">Artificial</span>
              <span className="line accent">Intelligence.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="hero-sub">
              Every model. Every tool. One atlas.<br />
              Discover, compare, and build AI workflows — at the speed of thought.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="hero-ctas">
              <Link href="/tools" className="btn-primary" style={{ textDecoration: 'none' }}>Explore the Atlas →</Link>
              <Link href="/generate" className="btn-ghost" style={{ textDecoration: 'none' }}>Generate a Stack</Link>
            </div>
          </Reveal>
        </div>

        <div className="scroll-indicator">
          <span>SCROLL</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...MARQUEE_TOOLS, ...MARQUEE_TOOLS].map((t, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-dot" style={{ background: t.c, boxShadow: `0 0 6px ${t.c}` }} />
              {t.name}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* SCENE 2: THE PROBLEM */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="scene" style={{ minHeight: '85vh' }}>
        <div className="glow-orb" style={{ width: 500, height: 500, background: 'rgba(239,68,68,0.03)', right: '10%', top: '30%' }} />
        <Reveal>
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, maxWidth: 720 }}>
            <div className="section-label">THE PROBLEM</div>
            <h2 className="section-title" style={{
              background: 'linear-gradient(135deg, var(--text-primary) 30%, #ef4444 80%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              50,000+ AI tools.<br />No map. No system.<br />No clarity.
            </h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Teams waste weeks comparing tools. The ecosystem grows faster than anyone can track. What if someone mapped the entire landscape?
            </p>
            <div className="chaos-grid">
              {['ChatGPT', 'Claude', 'Gemini', 'Midjourney', 'Runway', 'Cursor', 'ElevenLabs', 'Suno', 'Perplexity', 'Replicate', '…and 49,990 more'].map(t => (
                <div key={t} className="chaos-tag">{t}</div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <div className="divider" />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* SCENE 3: THE SOLUTION */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="scene" style={{ minHeight: '90vh' }}>
        <div className="glow-orb" style={{ width: 600, height: 600, background: 'rgba(59,130,246,0.04)', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />
        <Reveal>
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, maxWidth: 800 }}>
            <div className="section-label" style={{ color: 'var(--accent-blue)' }}>THE SOLUTION</div>
            <h2 className="section-title">
              Describe the goal.<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Atlas builds the stack.</span>
            </h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Enter your objective. Atlas generates the optimal AI workflow — tools, order, and connections — in seconds.
            </p>

            <div className="solution-card">
              <div className="solution-label">YOUR OBJECTIVE</div>
              <div className="solution-goal">
                {typed}<span style={{ color: 'var(--accent-blue)', animation: 'pulse 0.8s infinite' }}>|</span>
              </div>
              <div className="solution-label" style={{ marginTop: 8 }}>GENERATED STACK</div>
              {WORKFLOW.map((s, i) => (
                <div key={i} className="workflow-step">
                  <div className="step-num" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="step-tool" style={{ color: s.color }}>{s.tool}</div>
                  <div className="step-role">{s.role}</div>
                  {i < WORKFLOW.length - 1 && <div className="step-arrow">→</div>}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* SCENE 4: STATS */}
      {/* ══════════════════════════════════════════════════════════ */}
      <div className="divider" />
      <section className="stats-section">
        <Reveal>
          <div className="stats-row">
            <div className="stat-item" ref={statTools.ref}>
              <div className="stat-num blue">{statTools.value}</div>
              <div className="stat-label">AI TOOLS</div>
            </div>
            <div className="stat-item" ref={statCats.ref}>
              <div className="stat-num cyan">{statCats.value}</div>
              <div className="stat-label">CATEGORIES</div>
            </div>
            <div className="stat-item">
              <div className="stat-num purple">∞</div>
              <div className="stat-label">POSSIBLE STACKS</div>
            </div>
            <div className="stat-item">
              <div className="stat-num green">24/7</div>
              <div className="stat-label">LIVE DISCOVERY</div>
            </div>
          </div>
        </Reveal>
      </section>
      <div className="divider" />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* SCENE 5: CONSTELLATIONS */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="scene" style={{ minHeight: '85vh', flexDirection: 'column' }}>
        <div className="glow-orb" style={{ width: 500, height: 500, background: 'rgba(99,102,241,0.03)', left: '60%', top: '40%' }} />
        <Reveal>
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <div className="section-label">NAVIGATE BY CONSTELLATION</div>
            <h2 className="section-title">Every star has a place.</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              8 constellations. Thousands of tools. Navigate the AI universe by domain.
            </p>
            <div className="constellation-grid">
              {CONSTELLATIONS.map(c => (
                <div key={c.name} className="constellation-card">
                  <div className="constellation-node" style={{ background: c.c, boxShadow: `0 0 10px ${c.c}`, color: c.c }} />
                  <div className="constellation-name">{c.name}</div>
                  <div className="constellation-count">{c.count} tools</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* SCENE 6: FEATURED TOOLS */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="scene" style={{ minHeight: '75vh', flexDirection: 'column' }}>
        <Reveal>
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, width: '100%' }}>
            <div className="section-label">SIGNAL FROM THE ATLAS</div>
            <h2 className="section-title">Trending Tools</h2>
            <div className="tools-scroll">
              {FEATURED_TOOLS.map(t => (
                <Link key={t.name} href={`/tools/${t.name.toLowerCase().replace(/\s+/g, '-')}`} className="tool-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="tool-card-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: t.c, opacity: 0, transition: 'opacity 0.4s' }} />
                  <div className="tool-icon" style={{ background: `${t.c}11`, color: t.c, border: `1px solid ${t.c}22` }}>{t.icon}</div>
                  <div className="tool-name">{t.name}</div>
                  <div className="tool-cat">{t.cat}</div>
                  <div className="tool-desc">{t.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <div className="divider" />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* SCENE 7: ARCHITECTURE */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="scene" style={{ minHeight: '75vh', flexDirection: 'column' }}>
        <div className="glow-orb" style={{ width: 500, height: 500, background: 'rgba(59,130,246,0.03)', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />
        <Reveal>
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <div className="section-label">UNDER THE HOOD</div>
            <h2 className="section-title">The Intelligence Stack</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Six layers. One system. Designed for discovery.
            </p>
            <div className="system-grid">
              {SYSTEM_LAYERS.map(l => (
                <div key={l.name} className="system-cell">
                  <div className="system-icon">{l.icon}</div>
                  <div className="system-layer" style={{ color: l.c }}>{l.name}</div>
                  <div className="system-desc">{l.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* SCENE 8: CTA */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="scene cta-section" style={{ minHeight: '85vh' }}>
        <div className="glow-orb" style={{ width: 900, height: 900, background: 'rgba(59,130,246,0.04)', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />
        <Reveal>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="cta-orb-wrap">
              <div className="cta-orb"><span>A</span></div>
              <div className="cta-orb-ring" />
            </div>
            <h2 className="section-title" style={{ textAlign: 'center', fontSize: 'clamp(40px, 7vw, 88px)' }}>
              <span style={{
                background: 'linear-gradient(135deg, var(--text-primary) 10%, var(--accent-blue) 50%, var(--accent-purple) 90%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                backgroundSize: '200% 200%', animation: 'gradientShift 6s ease infinite',
              }}>Enter the Atlas</span>
            </h2>
            <p className="section-sub" style={{ textAlign: 'center', margin: '24px auto 56px' }}>
              Google indexed the web.<br />Atlas indexes intelligence.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/tools" className="btn-primary" style={{ padding: '16px 44px', fontSize: 14, textDecoration: 'none' }}>
                Launch Atlas →
              </Link>
              <Link href="/categories" className="btn-ghost" style={{ padding: '16px 44px', fontSize: 14, textDecoration: 'none' }}>
                Explore Galaxy Map
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-left">ATLAS · 2025 · The Map of AI</div>
        <div className="footer-right">
          <Link href="/tools">Tools</Link>
          <Link href="/stacks">Stacks</Link>
          <Link href="/generate">Generator</Link>
          <Link href="/categories">Galaxy</Link>
        </div>
      </footer>
    </div>
  )
}
