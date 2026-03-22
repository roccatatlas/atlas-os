'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// DATA (gekürzt für Übersicht – funktioniert trotzdem)
const MARQUEE_TOOLS = [
  { name: 'ChatGPT', c: '#10B981' },
  { name: 'Claude', c: '#7C3AED' },
  { name: 'Midjourney', c: '#3B82F6' },
  { name: 'Runway', c: '#EC4899' },
]

const HERO_NODES = [
  { x: 10, y: 20, s: 5, c: '#3B82F6' },
  { x: 88, y: 25, s: 4, c: '#7C3AED' },
  { x: 6, y: 65, s: 6, c: '#10B981' },
]

// TYPEWRITER
function useTypewriter(words: string[]) {
  const [text, setText] = useState('')
  const index = useRef(0)

  useEffect(() => {
    const word = words[index.current]
    let i = 0

    const interval = setInterval(() => {
      setText(word.slice(0, i))
      i++
      if (i > word.length) {
        clearInterval(interval)
        setTimeout(() => {
          index.current = (index.current + 1) % words.length
          setText('')
        }, 1500)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [words])

  return text
}

// MAIN
export default function AtlasPage() {
  const typed = useTypewriter([
    'Automate workflows',
    'Build AI systems',
    'Discover tools'
  ])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background nodes */}
      {HERO_NODES.map((n, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: n.s,
            height: n.s,
            borderRadius: '50%',
            background: n.c,
            boxShadow: `0 0 10px ${n.c}`,
            opacity: 0.6
          }}
        />
      ))}

      {/* HERO */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold mb-6">
          ATLAS
        </h1>

        <p className="text-lg text-gray-400 mb-6">
          Map of Artificial Intelligence
        </p>

        <div className="text-cyan-400 mb-10 text-xl">
          {typed}
        </div>

        <Link
          href="/"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
        >
          Enter Platform →
        </Link>
      </section>

      {/* MARQUEE */}
      <div className="absolute bottom-0 w-full overflow-hidden border-t border-white/10">
        <div className="flex gap-8 animate-pulse p-4 text-sm text-gray-400">
          {MARQUEE_TOOLS.map((t, i) => (
            <span key={i}>{t.name}</span>
          ))}
        </div>
      </div>
    </div>
  )
}