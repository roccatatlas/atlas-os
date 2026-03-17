import { getStacks } from "@/lib/data";
import Link from "next/link";

export const metadata = {
  title: "AI Workflow Stacks — ATLAS",
  description: "Browse curated AI workflow stacks for content creation, development, marketing, and more.",
};

const difficultyColor: Record<string, string> = {
  Beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Advanced: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function StacksPage() {
  const stacks = getStacks();

  return (
    <div className="min-h-screen px-4 py-16 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-[10px] font-mono tracking-widest text-slate-600 border border-[#1e293b] px-3 py-1 rounded-full">
          Stack Library
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 gradient-text">
        AI Workflow Stacks
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stacks.map((stack) => (
          <Link
            key={stack.id}
            href={`/stacks/${stack.slug}`}
            className="card-surface rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 group block"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {stack.title}
              </h3>
              <span className={`text-[9px] px-1.5 py-0.5 rounded border ${difficultyColor[stack.difficulty] || "bg-slate-800 text-slate-400 border-[#1e293b]"}`}>
                {stack.difficulty}
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">{stack.goal}</p>

            {/* Steps preview */}
            <div className="space-y-2 mb-4">
              {stack.steps.slice(0, 4).map((step) => (
                <div key={step.step_order} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold bg-[#0a0f1e] text-cyan-400 border border-[#1e293b] shrink-0">
                    {step.step_order}
                  </div>
                  <span className="text-[11px] text-slate-300">{step.tool_name}</span>
                  <span className="text-[10px] text-slate-600">·</span>
                  <span className="text-[10px] text-slate-500 truncate">{step.role}</span>
                </div>
              ))}
              {stack.steps.length > 4 && (
                <p className="text-[10px] text-slate-600 pl-6">+{stack.steps.length - 4} more steps</p>
              )}
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-3 border-t border-[#1e293b]">
              <span>${stack.cost_monthly}/mo</span>
              <span>{stack.views.toLocaleString()} views</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
