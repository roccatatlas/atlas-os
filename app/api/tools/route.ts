import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");       // slug, z.B. "coding"
  const pricing  = searchParams.get("pricing");        // "free" | "freemium" | etc.
  const featured = searchParams.get("featured");       // "true"
  const limit    = Math.min(parseInt(searchParams.get("limit")  || "24"), 100);
  const offset   = parseInt(searchParams.get("offset") || "0");

  let query = supabase
    .from("tools")
    .select(
      `id, name, slug, description, tagline,
       website_url, logo_url, pricing_model,
       featured, rating, review_count, view_count, created_at,
       categories(name, slug, color)`,
      { count: "exact" }
    )
    .eq("status", "active")
    .order("featured", { ascending: false })
    .order("rating",   { ascending: false })
    .range(offset, offset + limit - 1);

  // Optionale Filter
  if (category) query = query.eq("categories.slug", category);
  if (pricing)  query = query.eq("pricing_model", pricing);
  if (featured === "true") query = query.eq("featured", true);

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    tools: data ?? [],
    total: count ?? 0,
    limit,
    offset,
  });
}
