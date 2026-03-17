"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";

/* ── Hooks ── */
function useMousePos() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return pos;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = deleting ? speed / 2 : speed;

    if (!deleting && charIdx === word.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setCharIdx((prev) => prev + (deleting ? -1 : 1));
      setText(word.substring(0, charIdx + (deleting ? -1 : 1)));
    }, timeout);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

/* ── Star field data ── */
function generateStars(count: number) {
  const stars: { x: number; y: number; size: number; delay: number; dur: number }[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      dur: Math.random() * 3 + 2,
    });
  }
  return stars;
}

/* ── Tool Node data ── */
const TOOL_NODES = [
  { name: "ChatGPT", x: 15, y: 20, color: "#10b981" },
  { name: "Midjourney", x: 80, y: 25, color: "#f59e0b" },
  { name: "ElevenLabs", x: 25, y: 70, color: "#8b5cf6" },
  { name: "Cursor", x: 70, y: 65, color: "#06b6d4" },
  { name: "Runway", x: 50, y: 15, color: "#ef4444" },
  { name: "Zapier", x: 85, y: 50, color: "#f97316" },
  { name: "Perplexity", x: 10, y: 45, color: "#3b82f6" },
];

const GOALS = [
  "Automate my YouTube channel",
  "Build a SaaS landing page",
  "Launch a podcast with AI",
  "Create a content marketing engine",
  "Ship code 10x faster",
  "Generate AI art at scale",
  "Build an AI customer support bot",
];

const CHAOS_TAGS = [
  "ChatGPT?", "Claude?", "Gemini?", "Midjourney?", "Runway?",
  "DALL·E?", "Copilot?", "Jasper?", "Notion AI?", "Synthesia?",
  "ElevenLabs?", "Zapier?", "LangChain?", "Hugging Face?", "Cursor?",
];

const ARCH_LAYERS = [
  { icon: "◎", title: "Interface Layer", desc: "Next.js 14 · Tailwind · Cosmic UI" },
  { icon: "⚡", title: "Intelligence Core", desc: "Claude Opus · GPT-4 · Model Router" },
  { icon: "🤖", title: "Agent Mesh", desc: "Autonomous research · Stack assembly" },
  { icon: "🔍", title: "Discovery Engine", desc: "10,000+ tools · Graph relationships" },
  { icon: "💾", title: "Data Core", desc: "Supabase · pgvector · Embeddings" },
  { icon: "📡", title: "Distribution Net", desc: "SEO · API · Embeds · Syndication" },
];

const FLOW_STEPS = ["Discover", "Graph", "Recommend", "Generate", "Share", "Repeat"];

/* ── Component ── */
export default function HomePage() {
  const mouse = useMousePos();
  const scrollY = useScrollY();
  const typed = useTypewriter(GOALS, 70, 1800);
  const stars = useMemo(() => generateStars(220), []);

  // Parallax factor for orb
  const orbX = (mouse.x - (typeof window !== "undefined" ? window.innerWidth / 2 : 0)) * 0.02;
  const orbY = (mouse.y - (typeof window !== "undefined" ? window.innerHeight / 2 : 0)) * 0.02;

  return (
    <div className="relative">
      {/* ═══════════════ SCENE 1 — HERO ═══════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "100vh" }}
      >
        {/* Star field */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {stars.map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                borderRadius: "50%",
                background: "#fff",
                animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>

        {/* Nebulae */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "10%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
              animation: "nebulaPulse 8s ease-in-out infinite",
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "40%",
              right: "5%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
              animation: "nebulaPulse 10s ease-in-out 2s infinite",
              filter: "blur(50px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "40%",
              width: 350,
              height: 350,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
              animation: "nebulaPulse 12s ease-in-out 4s infinite",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Floating tool nodes */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {TOOL_NODES.map((node, i) => (
            <div
              key={node.name}
              style={{
                position: "absolute",
                left: `${node.x}%`,
                top: `${node.y}%`,
                animation: `float ${6 + i}s ease-in-out ${i * 0.5}s infinite`,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: node.color,
                  boxShadow: `0 0 20px ${node.color}44`,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 14,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 9,
                  color: "#64748b",
                  whiteSpace: "nowrap",
                  fontFamily: "monospace",
                }}
              >
                {node.name}
              </span>
            </div>
          ))}
        </div>

        {/* Core Orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            width: 200,
            height: 200,
            transform: `translate(calc(-50% + ${orbX}px), calc(-50% + ${orbY}px))`,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(59,130,246,0.05) 50%, transparent 70%)",
            animation: "corePulse 4s ease-in-out infinite",
            transition: "transform 0.3s ease-out",
          }}
          aria-hidden
        />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          {/* Badge */}
          <div
            className="animate-fadeIn"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "#64748b",
              fontFamily: "monospace",
              border: "1px solid #1e293b",
              padding: "6px 16px",
              borderRadius: 20,
              marginBottom: 32,
            }}
          >
            AI WORKFLOW INFRASTRUCTURE · VERSION 20.0
          </div>

          {/* Headline */}
          <h1
            className="animate-fadeUp"
            style={{
              fontSize: "clamp(40px, 8vw, 90px)",
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 900,
              background: "linear-gradient(135deg, #e2e8f0, #06b6d4, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            The OS for Building AI&nbsp;Systems
          </h1>

          {/* Typewriter */}
          <div
            className="animate-fadeUp"
            style={{
              marginTop: 24,
              fontSize: "clamp(14px, 2vw, 20px)",
              color: "#94a3b8",
              fontFamily: "monospace",
              animationDelay: "0.2s",
            }}
          >
            Your goal:{" "}
            <span style={{ color: "#06b6d4" }}>{typed}</span>
            <span
              style={{
                color: "#06b6d4",
                animation: "pulse-dot 1s infinite",
              }}
            >
              |
            </span>
          </div>

          {/* Tagline */}
          <p
            className="animate-fadeUp"
            style={{
              marginTop: 16,
              fontSize: 13,
              color: "#475569",
              maxWidth: 500,
              animationDelay: "0.4s",
            }}
          >
            Google indexed the web. Atlas indexes intelligence.
          </p>

          {/* Buttons */}
          <div
            className="animate-fadeUp flex gap-3 mt-8"
            style={{ animationDelay: "0.6s" }}
          >
            <Link
              href="/generate"
              className="px-6 py-2.5 rounded-lg text-sm font-medium text-white"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                boxShadow: "0 0 30px rgba(6,182,212,0.2)",
              }}
            >
              Generate Your Stack →
            </Link>
            <Link
              href="/tools"
              className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-300 border border-[#1e293b] hover:border-slate-600 transition-colors"
            >
              Explore Tools
            </Link>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            style={{
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <div className="w-5 h-8 rounded-full border border-[#1e293b] flex items-start justify-center p-1">
              <div
                className="w-1 h-2 rounded-full bg-cyan-400"
                style={{ animation: "pulse-dot 2s infinite" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SCENE 2 — PROBLEM ═══════════════ */}
      <section
        className="relative overflow-hidden flex flex-col items-center justify-center px-4 text-center"
        style={{ minHeight: "80vh" }}
      >
        {/* Red nebula */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "30%",
            left: "30%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "nebulaPulse 10s ease-in-out infinite",
          }}
          aria-hidden
        />

        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "#ef4444",
            fontFamily: "monospace",
            marginBottom: 24,
          }}
        >
          THE PROBLEM
        </span>

        <h2
          style={{
            fontSize: "clamp(28px, 5vw, 56px)",
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 800,
            background: "linear-gradient(135deg, #e2e8f0, #fca5a5, #ef4444)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          50,000+ AI tools. Nobody knows which ones work together.
        </h2>

        {/* Chaos tags */}
        <div
          className="flex flex-wrap justify-center gap-2 mt-10 max-w-xl"
          style={{ opacity: 0.6 }}
        >
          {CHAOS_TAGS.map((tag, i) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-1 rounded border border-red-500/20 text-red-400/60"
              style={{
                animation: `float ${4 + (i % 4)}s ease-in-out ${i * 0.3}s infinite`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════════ SCENE 3 — SOLUTION ═══════════════ */}
      <section
        className="relative overflow-hidden flex flex-col items-center justify-center px-4 text-center"
        style={{ minHeight: "90vh" }}
      >
        {/* Cyan nebula */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "20%",
            right: "10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "nebulaPulse 8s ease-in-out infinite",
          }}
          aria-hidden
        />

        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "#06b6d4",
            fontFamily: "monospace",
            marginBottom: 24,
          }}
        >
          THE SOLUTION
        </span>

        <h2
          style={{
            fontSize: "clamp(28px, 5vw, 56px)",
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 800,
            background: "linear-gradient(135deg, #e2e8f0, #06b6d4, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          You describe the goal. ATLAS builds the system.
        </h2>

        {/* Demo card */}
        <div
          className="mt-12 w-full max-w-lg text-left"
          style={{
            background: "rgba(15,23,42,0.8)",
            border: "1px solid #1e293b",
            borderRadius: 16,
            padding: 24,
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="text-[10px] font-mono text-cyan-400 mb-3"
            style={{ letterSpacing: "0.1em" }}
          >
            atlas.generate()
          </div>
          <div
            className="text-sm text-slate-300 mb-6 pb-4"
            style={{ borderBottom: "1px solid #1e293b" }}
          >
            &quot;I want to automate a YouTube channel&quot;
          </div>

          {[
            { n: 1, tool: "Perplexity", role: "Research trending topics" },
            { n: 2, tool: "ChatGPT", role: "Write video scripts" },
            { n: 3, tool: "ElevenLabs", role: "Generate voiceover" },
            { n: 4, tool: "Runway", role: "Create B-roll footage" },
            { n: 5, tool: "Midjourney", role: "Design thumbnails" },
          ].map((step) => (
            <div key={step.n} className="flex items-center gap-3 mb-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  color: "#fff",
                }}
              >
                {step.n}
              </div>
              <div>
                <span className="text-xs font-medium text-white">
                  {step.tool}
                </span>
                <span className="text-[11px] text-slate-500 ml-2">
                  {step.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ SCENE 4 — STATS ═══════════════ */}
      <section
        className="relative flex items-center justify-center px-4"
        style={{ minHeight: "60vh" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full">
          {[
            { val: "10,000+", label: "AI Tools" },
            { val: "300+", label: "Categories" },
            { val: "1M+", label: "SEO Pages" },
            { val: "98%", label: "Workflow Success Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.val}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ SCENE 5 — ARCHITECTURE ═══════════════ */}
      <section
        className="relative flex flex-col items-center justify-center px-4"
        style={{ minHeight: "80vh" }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "#64748b",
            fontFamily: "monospace",
            marginBottom: 16,
          }}
        >
          SYSTEM ARCHITECTURE
        </span>

        <h2
          className="text-2xl md:text-4xl font-bold mb-12"
          style={{
            background: "linear-gradient(135deg, #e2e8f0, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Six Layers of Intelligence
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
          {ARCH_LAYERS.map((layer, i) => (
            <div
              key={layer.title}
              style={{
                background: "rgba(15,23,42,0.6)",
                border: "1px solid #1e293b",
                borderRadius: 12,
                padding: 20,
                backdropFilter: "blur(8px)",
                transition: "border-color 0.3s",
              }}
              className="hover:border-cyan-500/30"
            >
              <div className="text-2xl mb-2">{layer.icon}</div>
              <div className="text-sm font-semibold text-white mb-1">
                {layer.title}
              </div>
              <div className="text-[11px] text-slate-500">{layer.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ SCENE 6 — NETWORK EFFECT ═══════════════ */}
      <section
        className="relative flex flex-col items-center justify-center px-4 text-center"
        style={{ minHeight: "70vh" }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "#64748b",
            fontFamily: "monospace",
            marginBottom: 16,
          }}
        >
          NETWORK EFFECT
        </span>

        <h2
          className="text-xl md:text-3xl font-bold mb-10 max-w-2xl"
          style={{
            background: "linear-gradient(135deg, #e2e8f0, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          More tools → Better graph → More users → Stronger&nbsp;ATLAS
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {FLOW_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div
                className="px-4 py-2 rounded-lg text-xs font-medium"
                style={{
                  background: "rgba(15,23,42,0.8)",
                  border: "1px solid #1e293b",
                  color: "#06b6d4",
                }}
              >
                {step}
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <span className="text-slate-600 text-xs">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ SCENE 7 — CTA ═══════════════ */}
      <section
        className="relative overflow-hidden flex flex-col items-center justify-center px-4 text-center"
        style={{ minHeight: "80vh" }}
      >
        {/* Nebulae */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "30%",
            left: "20%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "nebulaPulse 8s ease-in-out infinite",
          }}
          aria-hidden
        />

        <h2
          style={{
            fontSize: "clamp(36px, 7vw, 80px)",
            fontWeight: 700,
            lineHeight: 1.05,
            background: "linear-gradient(135deg, #e2e8f0, #06b6d4, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Enter ATLAS
        </h2>

        <p className="text-slate-500 text-sm mt-4 mb-8">
          Start mapping your AI universe
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/generate"
            className="px-8 py-3 rounded-lg text-sm font-medium text-white"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              boxShadow: "0 0 40px rgba(6,182,212,0.2)",
            }}
          >
            Generate Your First Stack →
          </Link>
          <Link
            href="/tools"
            className="px-8 py-3 rounded-lg text-sm font-medium text-slate-300 border border-[#1e293b] hover:border-slate-600 transition-colors"
          >
            Explore 10,000+ Tools
          </Link>
        </div>
      </section>
    </div>
  );
}
