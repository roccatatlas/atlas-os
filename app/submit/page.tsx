"use client";

import { useState } from "react";
import { CATEGORIES, PRICING_LABELS } from "@/lib/constants";

type FormData = {
  name: string;
  description: string;
  website_url: string;
  logo_url: string;
  category: string;
  pricing_model: string;
  email: string;
};

const EMPTY: FormData = {
  name: "", description: "", website_url: "",
  logo_url: "", category: "", pricing_model: "freemium", email: "",
};

export default function SubmitPage() {
  const [form,     setForm]     = useState<FormData>(EMPTY);
  const [errors,   setErrors]   = useState<Partial<FormData>>({});
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState<string | null>(null);
  const [apiError, setApiError] = useState("");

  function validate() {
    const e: Partial<FormData> = {};
    if (!form.name.trim())         e.name        = "Required";
    if (!form.description.trim())  e.description = "Required";
    if (!form.website_url.trim())  e.website_url = "Required";
    else {
      try { new URL(form.website_url); }
      catch { e.website_url = "Invalid URL — must start with https://"; }
    }
    if (!form.category)            e.category    = "Required";
    if (!form.email.includes("@")) e.email       = "Valid email required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError("");
    try {
      const res  = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setDone(data.id);
      setForm(EMPTY);
    } catch (e: any) {
      setApiError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function field(
    key: keyof FormData,
    label: string,
    placeholder: string,
    required = false
  ) {
    return (
      <div>
        <label className="block text-[13px] font-semibold text-[#A0A0B0] mb-1.5">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        <input
          type="text"
          value={form[key]}
          onChange={(e) => {
            setForm((f) => ({ ...f, [key]: e.target.value }));
            setErrors((er) => ({ ...er, [key]: "" }));
          }}
          placeholder={placeholder}
          className={`w-full bg-[#111113] border rounded-xl px-4 py-2.5 text-[14px] text-white placeholder-[#3A3A45] focus:outline-none transition-colors ${
            errors[key]
              ? "border-red-500/50 focus:border-red-500"
              : "border-[#1E1E24] focus:border-blue-500/50"
          }`}
        />
        {errors[key] && (
          <p className="text-red-400 text-[12px] mt-1">{errors[key]}</p>
        )}
      </div>
    );
  }

  // ── Success State ──
  if (done) {
    return (
      <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center px-6">
        <div className="bg-[#111113] border border-[#1E1E24] rounded-2xl p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-[22px] font-bold mb-2">Submitted!</h2>
          <p className="text-[#6B6A7A] text-[14px] mb-2">
            We'll review your submission and get back to you within 48 hours.
          </p>
          <p className="font-mono text-[11px] text-[#3A3A45] mb-6">ID: {done}</p>
          <button
            onClick={() => setDone(null)}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-[14px]"
          >
            Submit another tool
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <div className="max-w-xl mx-auto px-6 py-14">

        <div className="mb-10">
          <h1 className="text-[28px] font-bold mb-2">Submit an AI Tool</h1>
          <p className="text-[#6B6A7A] text-[15px]">
            Help the community discover great AI tools. We review all submissions within 48 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {field("name",        "Tool Name",    "e.g. ChatGPT",               true)}
          {field("website_url", "Website URL",  "https://example.com",        true)}

          {/* Description */}
          <div>
            <label className="block text-[13px] font-semibold text-[#A0A0B0] mb-1.5">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => {
                setForm((f) => ({ ...f, description: e.target.value }));
                setErrors((er) => ({ ...er, description: "" }));
              }}
              placeholder="What does this tool do? Who is it for?"
              rows={3}
              className={`w-full bg-[#111113] border rounded-xl px-4 py-2.5 text-[14px] text-white placeholder-[#3A3A45] focus:outline-none transition-colors resize-none ${
                errors.description
                  ? "border-red-500/50"
                  : "border-[#1E1E24] focus:border-blue-500/50"
              }`}
            />
            <div className="flex justify-between mt-1">
              {errors.description
                ? <p className="text-red-400 text-[12px]">{errors.description}</p>
                : <span />}
              <span className="text-[11px] text-[#3A3A45]">{form.description.length}/500</span>
            </div>
          </div>

          {field("logo_url", "Logo URL", "https://example.com/logo.png")}

          {/* Category */}
          <div>
            <label className="block text-[13px] font-semibold text-[#A0A0B0] mb-1.5">
              Category <span className="text-red-400">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => {
                setForm((f) => ({ ...f, category: e.target.value }));
                setErrors((er) => ({ ...er, category: "" }));
              }}
              className={`w-full bg-[#111113] border rounded-xl px-4 py-2.5 text-[14px] focus:outline-none transition-colors ${
                errors.category
                  ? "border-red-500/50 text-[#3A3A45]"
                  : "border-[#1E1E24] focus:border-blue-500/50 text-white"
              }`}
            >
              <option value="" className="text-[#3A3A45]">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>{cat.icon} {cat.name}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-400 text-[12px] mt-1">{errors.category}</p>
            )}
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-[13px] font-semibold text-[#A0A0B0] mb-1.5">
              Pricing Model
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["free", "freemium", "paid", "open_source"].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setForm((f) => ({ ...f, pricing_model: p }))}
                  className={`px-4 py-2.5 rounded-xl border text-[13px] font-medium transition-all ${
                    form.pricing_model === p
                      ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                      : "border-[#1E1E24] text-[#6B6A7A] hover:border-[#2A2A33] hover:text-white"
                  }`}
                >
                  {PRICING_LABELS[p]}
                </button>
              ))}
            </div>
          </div>

          {field("email", "Your Email", "you@example.com", true)}

          {apiError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-[13px] text-red-400">
              {apiError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-[14px] mt-2"
          >
            {loading ? "Submitting..." : "Submit Tool →"}
          </button>

          <p className="text-[12px] text-[#3A3A45] text-center">
            * Required fields · We review within 48 hours
          </p>
        </form>
      </div>
    </div>
  );
}
