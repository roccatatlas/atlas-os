"use client";

import { useState } from "react";

interface GeneratedStep {
  tool: string;
  role: string;
  action: string;
  why: string;
}

interface GeneratedStack {
  title: string;
  summary: string;
  difficulty: string;
  time: string;
  cost: string;
  wsr: number;
  steps: GeneratedStep[];
  pro_tip: string;
  moat: string;
}

const EXAMPLES = [
  "YouTube channel automation",
  "SaaS landing page",
  "Podcast production",
  "AI coding workflow",
  "Content marketing pipeline",
];

const MOCK_RESULTS: Record<string, GeneratedStack> = {
  default: {
    title: "AI Content Automation Stack",
    summary: "A production-ready workflow combining research, writing, visual generation, and distribution tools to create and publish high-quality content at scale.",
    difficulty: "Intermediate",
    time: "2-3 hours setup",
    cost: "$75/mo",
    wsr: 94,
    steps: [
      { tool: "Perplexity", role: "Research Engine", action: "Research topics, trends, and competitor content with real-time citations", why: "Provides accurate, cited research faster than manual browsing" },
      { tool: "Claude", role: "Strategy Planner", action: "Create content calendar, outlines, and editorial strategy", why: "Excels at long-form strategic thinking with 200k context" },
      { tool: "ChatGPT", role: "Content Writer", action: "Draft articles, social posts, and marketing copy", why: "Best general-purpose writing with strong creative range" },
      { tool: "Midjourney", role: "Visual Creator", action: "Generate featured images, social graphics, and illustrations", why: "Industry-leading image quality and aesthetic control" },
      { tool: "Zapier", role: "Distribution Hub", action: "Auto-publish to WordPress, social media, and email platforms", why: "Connects 6,000+ apps for seamless automation" },
    ],
    pro_tip: "Set up Zapier webhooks to trigger content generation automatically when new research topics are identified.",
    moat: "This stack combines the strongest AI tools in each category, creating a workflow that would take a 5-person team to replicate manually.",
  },
  youtube: {
    title: "YouTube Automation Pipeline",
    summary: "End-to-end YouTube content machine: from topic research to thumbnail generation, voice synthesis, and video production — all AI-powered.",
    difficulty: "Intermediate",
    time: "3-4 hours setup",
    cost: "$85/mo",
    wsr: 96,
    steps: [
      { tool: "Perplexity", role: "Trend Scanner", action: "Identify trending topics with search volume data", why: "Real-time search delivers fresher trends than static databases" },
      { tool: "ChatGPT", role: "Script Writer", action: "Write engaging video scripts with hooks and CTAs", why: "GPT-4 produces the most natural-sounding YouTube scripts" },
      { tool: "ElevenLabs", role: "Voice Generator", action: "Convert scripts to natural voiceover in your cloned voice", why: "Most realistic voice cloning with emotional range" },
      { tool: "Runway", role: "Video Producer", action: "Generate B-roll footage and visual transitions", why: "Gen-2 produces the highest quality AI video clips" },
      { tool: "Midjourney", role: "Thumbnail Creator", action: "Design high-CTR thumbnails with consistent style", why: "Unmatched aesthetic quality for eye-catching thumbnails" },
    ],
    pro_tip: "Clone your voice in ElevenLabs once, then use the API to batch-generate voiceovers for multiple scripts simultaneously.",
    moat: "This pipeline reduces video production from 20+ hours to under 3 hours while maintaining professional quality.",
  },
  saas: {
    title: "SaaS Landing Page Stack",
    summary: "AI-powered workflow to research, design, code, and optimize a high-converting SaaS landing page in a single sprint.",
    difficulty: "Beginner",
    time: "1-2 hours setup",
    cost: "$40/mo",
    wsr: 92,
    steps: [
      { tool: "Perplexity", role: "Market Researcher", action: "Analyze competitor landing pages and positioning", why: "Provides cited competitive analysis in minutes" },
      { tool: "ChatGPT", role: "Copywriter", action: "Generate headlines, value props, and page copy", why: "Best at producing multiple copy variations quickly" },
      { tool: "Midjourney", role: "Visual Designer", action: "Create hero images and section illustrations", why: "Produces professional-grade visuals without a designer" },
      { tool: "Cursor", role: "Developer", action: "Code the landing page with AI-assisted development", why: "AI-first editor ships code 10x faster" },
    ],
    pro_tip: "Use ChatGPT to generate 10 headline variations, then A/B test the top 3 with real traffic.",
    moat: "Skip the $5K agency cost. This stack lets a solo founder build a professional landing page in a single afternoon.",
  },
  podcast: {
    title: "AI Podcast Production Pipeline",
    summary: "Comprehensive podcast workflow from research and scripting through AI voice generation to automated multi-platform distribution.",
    difficulty: "Intermediate",
    time: "2-3 hours setup",
    cost: "$60/mo",
    wsr: 91,
    steps: [
      { tool: "Perplexity", role: "Deep Researcher", action: "Research episode topics with academic-quality citations", why: "Delivers comprehensive research with source links" },
      { tool: "Claude", role: "Script Developer", action: "Write detailed episode scripts with natural dialogue flow", why: "200k context handles full episode scripts effortlessly" },
      { tool: "ElevenLabs", role: "Voice Engine", action: "Generate intro, outro, and supplementary voice segments", why: "Natural voice synthesis with multi-speaker support" },
      { tool: "ChatGPT", role: "Content Packager", action: "Create show notes, social clips, and email newsletters", why: "Excels at reformatting content across multiple formats" },
      { tool: "Zapier", role: "Distribution Automator", action: "Auto-publish to Spotify, Apple, YouTube, and social media", why: "Single trigger publishes across all platforms simultaneously" },
    ],
    pro_tip: "Use Claude to generate a content calendar for 12 episodes at once, then batch-produce them.",
    moat: "Produces a weekly podcast that sounds professional without requiring a studio, editor, or production team.",
  },
  coding: {
    title: "AI-Augmented Development Stack",
    summary: "Ship production code at 10x speed with AI-powered research, architecture design, pair programming, code review, and documentation.",
    difficulty: "Advanced",
    time: "1-2 hours setup",
    cost: "$45/mo",
    wsr: 97,
    steps: [
      { tool: "Perplexity", role: "Technical Researcher", action: "Research libraries, APIs, and architecture patterns", why: "Real-time search for latest docs and solutions" },
      { tool: "Claude", role: "System Architect", action: "Design data models, API schemas, and system architecture", why: "Excels at complex technical reasoning with large context" },
      { tool: "Cursor", role: "AI Pair Programmer", action: "Write, refactor, and debug code with codebase-aware AI", why: "Understands your entire codebase for contextual suggestions" },
      { tool: "ChatGPT", role: "Code Reviewer", action: "Review PRs for bugs, security issues, and best practices", why: "Catches subtle bugs and suggests improvements quickly" },
      { tool: "Notion AI", role: "Doc Writer", action: "Generate API docs, READMEs, and architecture decision records", why: "Integrated documentation stays synced with your workspace" },
      { tool: "Zapier", role: "DevOps Connector", action: "Automate CI/CD notifications, issue tracking, and monitoring", why: "Connects GitHub, Slack, Linear, and monitoring tools" },
    ],
    pro_tip: "Use Claude for architecture decisions and Cursor for implementation. Let ChatGPT review the final PR before merging.",
    moat: "A solo developer with this stack ships faster than a 3-person team using traditional workflows.",
  },
};

function matchResult(goal: string): GeneratedStack {
  const g = goal.toLowerCase();
  if (g.includes("youtube") || g.includes("video")) return MOCK_RESULTS.youtube;
  if (g.includes("saas") || g.includes("landing")) return MOCK_RESULTS.saas;
  if (g.includes("podcast") || g.includes("audio")) return MOCK_RESULTS.podcast;
  if (g.includes("coding") || g.includes("code") || g.includes("develop")) return MOCK_RESULTS.coding;
  return MOCK_RESULTS.default;
}

export default function GeneratePage() {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedStack | null>(null);

  const handleGenerate = () => {
    if (!goal.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(matchResult(goal));
      setLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setResult(null);
    setGoal("");
  };

  return (
    <div className="min-h-screen px-4 py-16 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-[10px] font-mono tracking-widest text-slate-600 border border-[#1e293b] px-3 py-1 rounded-full">
          AI Stack Generator · Model Router
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-text">
        Generate Your AI Stack
      </h1>

      {!result && (
        <>
          <div className="card-surface rounded-xl p-6 mb-6">
            <label className="text-xs text-slate-500 font-mono mb-2 block">DESCRIBE YOUR GOAL</label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. I want to automate a YouTube channel from research to publishing..."
              className="w-full h-28 bg-transparent text-sm text-slate-200 placeholder-slate-600 resize-none focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setGoal(ex)}
                className="text-[11px] px-3 py-1.5 rounded-full border border-[#1e293b] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleGenerate}
              disabled={!goal.trim() || loading}
              className="px-8 py-3 rounded-lg text-sm font-medium text-white disabled:opacity-50 transition-opacity"
              style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)", boxShadow: "0 0 30px rgba(6,182,212,0.15)" }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating Stack...
                </span>
              ) : "Generate Stack →"}
            </button>
          </div>
        </>
      )}

      {loading && (
        <div className="text-center py-20">
          <div className="w-12 h-12 mx-auto border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mb-4" />
          <p className="text-sm text-slate-400">Analyzing goal and selecting optimal tools...</p>
          <p className="text-[10px] text-slate-600 mt-1 font-mono">Model Router → Claude Opus → Stack Assembly</p>
        </div>
      )}

      {result && !loading && (
        <div className="animate-fadeUp">
          <div className="card-surface rounded-xl p-6 mb-4">
            <h2 className="text-xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-sm text-slate-400 mb-4">{result.summary}</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{result.difficulty}</span>
              <span className="text-[10px] px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{result.time}</span>
              <span className="text-[10px] px-2 py-1 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">{result.cost}</span>
              <span className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">WSR: {result.wsr}%</span>
            </div>
          </div>

          <div className="card-surface rounded-xl p-6 mb-4">
            <h3 className="text-xs font-mono text-slate-500 tracking-wider mb-4">WORKFLOW STEPS</h3>
            <div className="space-y-4">
              {result.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)", color: "#fff" }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-white">{step.tool}</span>
                      <span className="text-[10px] text-cyan-400 font-mono">{step.role}</span>
                    </div>
                    <p className="text-xs text-slate-400">{step.action}</p>
                    <p className="text-[10px] text-slate-600 mt-1">↳ {step.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="card-surface rounded-xl p-5">
              <h3 className="text-[10px] font-mono text-emerald-400 tracking-wider mb-2">💡 PRO TIP</h3>
              <p className="text-xs text-slate-400">{result.pro_tip}</p>
            </div>
            <div className="card-surface rounded-xl p-5">
              <h3 className="text-[10px] font-mono text-violet-400 tracking-wider mb-2">🏰 MOAT</h3>
              <p className="text-xs text-slate-400">{result.moat}</p>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button onClick={handleReset} className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-300 border border-[#1e293b] hover:border-slate-600 transition-colors">
              New Stack
            </button>
            <button className="px-6 py-2.5 rounded-lg text-sm font-medium text-white" style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}>
              Save &amp; Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
