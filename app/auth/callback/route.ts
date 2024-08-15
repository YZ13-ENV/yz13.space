import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "yz13/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("continue") || "/";
  const nextIsExternalLink =
    next.startsWith("http://") || next.startsWith("https://");

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      if (nextIsExternalLink) {
        return NextResponse.redirect(next);
      } else return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
