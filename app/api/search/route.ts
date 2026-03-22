import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q         = searchParams.get("q")?.trim() ?? "";
  const category  = searchParams.get("category");
  const pricing   = searchParams.get("pricing");
  const minRating = parseFloat(searchParams.get("minRating") ?? "0");

  if (q.length < 2) {
    return NextResponse.json({ results: [], total: 0 });
  }

  let query = supabase
    .from("tools")
    .select(
      `id, name, slug, description, logo_url,
       pricing_model, rating, review_count,
       categories(name, slug, color)`,
      { count: "exact" }
    )
    .eq("status", "active")
    .or(`name.ilike.%${q}%,description.ilike.%${q}%,tagline.ilike.%${q}%`)
    .order("rating", { ascending: false })
    .limit(30);

  if (category)       query = query.eq("categories.slug", category);
  if (pricing)        query = query.eq("pricing_model", pricing);
  if (minRating > 0)  query = query.gte("rating", minRating);

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ results: data ?? [], total: count ?? 0 });
}
