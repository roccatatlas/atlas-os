"use client";

// ─────────────────────────────────────────────────────────────
// ATLAS Admin Dashboard
// Route: /admin
// Schutz: Middleware (siehe unten) oder Supabase Auth Guard
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

type Submission = {
  id: string;
  name: string;
  url: string;
  description: string | null;
  category: string | null;
  submitter_email: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

type Tab = "pending" | "approved" | "rejected";

export default function AdminPage() {
  const [tab,         setTab]         = useState<Tab>("pending");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [processing,  setProcessing]  = useState<string | null>(null);

  useEffect(() => { fetchSubmissions(tab); }, [tab]);

  async function fetchSubmissions(status: Tab) {
    setLoading(true);
    try {
      const res  = await fetch(`/api/admin/submissions?status=${status}`);
      const data = await res.json();
      setSubmissions(data ?? []);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: "approved" | "rejected") {
    setProcessing(id);
    try {
      await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      setSubmissions((s) => s.filter((x) => x.id !== id));
    } finally {
      setProcessing(null);
    }
  }

  const TAB_COLORS: Record<Tab, string> = {
    pending:  "text-amber-400  border-amber-400/30  bg-amber-400/8",
    approved: "text-green-400  border-green-400/30  bg-green-400/8",
    rejected: "text-red-400    border-red-400/30    bg-red-400/8",
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[24px] font-bold">Admin Dashboard</h1>
            <p className="text-[#6B6A7A] text-[13px] mt-1">Tool Submissions · Review Queue</p>
          </div>
          <span className="font-mono text-[11px] text-[#3A3A45] border border-[#1E1E24] rounded px-2 py-1">
            /admin
          </span>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-2 mb-6">
          {(["pending", "approved", "rejected"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-[13px] font-semibold px-4 py-2 rounded-lg border capitalize transition-all ${
                tab === t
                  ? TAB_COLORS[t]
                  : "text-[#6B6A7A] border-[#1E1E24] hover:border-[#2A2A33] hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#111113] border border-[#1E1E24] rounded-xl h-24 animate-pulse" />
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20 text-[#6B6A7A]">
            <div className="text-4xl mb-3">✓</div>
            <p>No {tab} submissions</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-[#111113] border border-[#1E1E24] rounded-xl p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Name + URL */}
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-semibold text-[15px]">{sub.name}</h3>
                      <a
                        href={sub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] text-blue-400 hover:text-blue-300 font-mono truncate max-w-[200px]"
                      >
                        {sub.url}
                      </a>
                    </div>

                    {/* Description */}
                    {sub.description && (
                      <p className="text-[13px] text-[#6B6A7A] line-clamp-2 mb-2">
                        {sub.description}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex gap-3 text-[11px] text-[#3A3A45] font-mono flex-wrap">
                      <span>{sub.submitter_email}</span>
                      {sub.category && <span>· {sub.category}</span>}
                      <span>· {new Date(sub.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions — only show on pending */}
                  {tab === "pending" && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => updateStatus(sub.id, "approved")}
                        disabled={processing === sub.id}
                        className="text-[12px] font-semibold px-3 py-1.5 rounded-lg border border-green-500/30 text-green-400 bg-green-400/8 hover:bg-green-400/15 disabled:opacity-40 transition-all"
                      >
                        {processing === sub.id ? "..." : "Approve"}
                      </button>
                      <button
                        onClick={() => updateStatus(sub.id, "rejected")}
                        disabled={processing === sub.id}
                        className="text-[12px] font-semibold px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 bg-red-400/8 hover:bg-red-400/15 disabled:opacity-40 transition-all"
                      >
                        {processing === sub.id ? "..." : "Reject"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
