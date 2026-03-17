import { getStackBySlug, MOCK_STACKS } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export function generateStaticParams() {
  return MOCK_STACKS.map((stack) => ({ slug: stack.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const stack = getStackBySlug(params.slug);
  if (!stack) return { title: "Stack Not Found — ATLAS" };
  return {
    title: `${stack.title} — ATLAS Stack`,
    description: stack.goal,
  };
}

const difficultyColor: Record<string, string> = {
  Beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Advanced: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function StackDetailPage({ params }: { params: { slug: string } }) {
  const stack = getStackBySlug(params.slug);
  if (!stack) notFound();

  return (
    <div className="min-h-screen px-4 py-16 max-w-3xl mx-auto">
      <Link href="/stacks" className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors mb-8 inline-block">
        ← Back to Stacks
      </Link>

      <div className="card-surface rounded-2xl p-8 mb-6">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">{stack.title}</h1>
          <span className={`text-[10px] px-2 py-0.5 rounded border ${difficultyColor[stack.difficulty] || "bg-slate-800 text-slate-400 border-[#1e293b]"}`}>
            {stack.difficulty}
          </span>
        </div>

        <p className="text-sm text-slate-400 mb-6">{stack.goal}</p>

        <div className="flex gap-4 text-[11px] text-slate-500 mb-8 pb-6 border-b border-[#1e293b]">
          <span>💰 ${stack.cost_monthly}/mo</span>
          <span>👁 {stack.views.toLocaleString()} views</span>
          <span>📋 {stack.clones.toLocaleString()} clones</span>
        </div>

        {/* Steps */}
        <h3 className="text-xs font-mono text-slate-500 tracking-wider mb-4">WORKFLOW STEPS</h3>
        <div className="space-y-4 mb-8">
          {stack.steps.map((step) => (
            <div key={step.step_order} className="flex gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)", color: "#fff" }}>
                {step.step_order}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-white">{step.tool_name}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">{step.role}</span>
                </div>
                <p className="text-xs text-slate-400">{step.action}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button className="px-6 py-2.5 rounded-lg text-sm font-medium text-white" style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}>
            Clone Stack
          </button>
          <Link href="/generate" className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-300 border border-[#1e293b] hover:border-slate-600 transition-colors">
            Generate Similar
          </Link>
        </div>
      </div>
    </div>
  );
}
