import { createServerClient } from "@supabase/ssr";


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

export function createSupabaseClient(request: Request) {
  const cookieHeader = request.headers.get("Cookie") ?? "";
  const cookies: Record<string, string> = {};

  for (const cookie of cookieHeader.split("; ")) {
    const [name, ...rest] = cookie.split("=");
    if (name) {
      cookies[name] = rest.join("="); // Preserve '=' in value (important for JWTs)
    }
  }
  const responseCookies: string[] = [];

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookieArray = Object.entries(cookies)
            .filter(([name, value]) => typeof value === "string")
            .map(([name, value]) => ({ name, value: value as string }));
          return cookieArray.length > 0 ? cookieArray : [];
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            responseCookies.push(
              `${name}=${value}; Path=${options?.path ?? "/"}; HttpOnly; SameSite=Lax${options?.maxAge ? `; Max-Age=${options.maxAge}` : ""}`
            );
          });
        },
      },
    }
  );

  // Return a function to get headers AFTER auth operations are done
  const getHeaders = () => {
    const headers = new Headers();
    responseCookies.forEach(cookie => headers.append("Set-Cookie", cookie));
    return headers;
  };

  return { supabase, getHeaders };
}

