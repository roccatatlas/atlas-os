 import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("tools")
    .select(
      `id, name, slug, description, tagline,
       long_description, website_url, logo_url,
       pricing_model, featured, rating, review_count,
       view_count, created_at,
       categories(name, slug, color),
       reviews(id, rating, review_text, reviewer_name, status)`
    )
    .eq("slug", slug)
    .eq("status", "active")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  supabase
    .from("tools")
    .update({ view_count: (data.view_count ?? 0) + 1 })
    .eq("id", data.id)
    .then(() => {});

  return NextResponse.json(data);
}
