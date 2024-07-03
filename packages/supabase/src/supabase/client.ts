import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase";

const isDev = process.env.NODE_ENV === "development";
export const createClient = (): SupabaseClient<Database, "public", any> =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        domain: isDev ? "localhost" : ".yz13.space",
        sameSite: "lax",
        secure: !isDev,
      },
    }
  );
