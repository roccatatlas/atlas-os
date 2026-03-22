import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, description, website_url, logo_url,
          category, pricing_model, email } = body;

  // Server-side Validation
  if (!name?.trim())         return NextResponse.json({ error: "Name required"  }, { status: 400 });
  if (!description?.trim())  return NextResponse.json({ error: "Description required" }, { status: 400 });
  if (!website_url?.trim())  return NextResponse.json({ error: "URL required"   }, { status: 400 });
  if (!email?.includes("@")) return NextResponse.json({ error: "Valid email required" }, { status: 400 });

  try { new URL(website_url); }
  catch { return NextResponse.json({ error: "Invalid URL" }, { status: 400 }); }

  const { data, error } = await supabase
    .from("tool_submissions")
    .insert({
      name:             name.trim(),
      url:              website_url.trim(),
      description:      description.trim(),
      category:         category || null,
      submitter_email:  email.trim(),
      status:           "pending",
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id, status: "pending" });
}
