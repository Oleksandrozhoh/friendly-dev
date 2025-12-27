import { createClient } from "@supabase/supabase-js";

  // Validate required environment variables
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Missing SUPABASE_URL environment variable. Please add it to your .env file."
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      "Missing SUPABASE_ANON_KEY environment variable. Please add it to your .env file."
    );
  }

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
