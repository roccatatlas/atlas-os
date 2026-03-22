import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Admin-Route benutzt den Service Role Key — bypasst RLS
const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET /api/admin/submissions?status=pending
export async function GET(req: NextRequest) {
  const status = new URL(req.url).searchParams.get("status") ?? "pending";

  const { data, error } = await adminSupabase
    .from("tool_submissions")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// PATCH /api/admin/submissions  { id, status: "approved" | "rejected" }
export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();

  if (!id || !["approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { error } = await adminSupabase
    .from("tool_submissions")
    .update({ status, reviewed_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Wenn approved → Tool automatisch in tools-Tabelle übernehmen
  if (status === "approved") {
    const { data: sub } = await adminSupabase
      .from("tool_submissions")
      .select("*")
      .eq("id", id)
      .single();

    if (sub) {
      const slug = sub.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      await adminSupabase.from("tools").insert({
        name:          sub.name,
        slug:          slug,
        description:   sub.description ?? "",
        website_url:   sub.url,
        pricing_model: "freemium", // Default — kann danach manuell angepasst werden
        status:        "active",
        source:        "user_submission",
      });
    }
  }

  return NextResponse.json({ success: true });
}
