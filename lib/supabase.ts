import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Typen — passen exakt zum ATLAS_MVP_DATABASE.sql Schema
export type Tool = {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline: string | null;
  website_url: string;
  logo_url: string | null;
  pricing_model: "free" | "freemium" | "paid" | "open_source";
  featured: boolean;
  rating: number;
  review_count: number;
  view_count: number;
  created_at: string;
  categories: {
    name: string;
    slug: string;
    color: string;
  } | null;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string;
  tool_count: number;
};
