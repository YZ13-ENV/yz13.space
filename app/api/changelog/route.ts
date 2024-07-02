import { createClient } from "@/packages/supabase/src/supabase/server";
import { unstable_cache as cache } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const lang = searchParams.get("lang");
  const cks = cookies();
  const client = createClient(cks);
  const hasLangParam = !!lang;
  const cached_changelog_response = cache(
    async () => client.from("changelog").select(),
    [],
    { revalidate: 360 }
  );
  const res = await cached_changelog_response();
  const changelog = (res.data || []).filter((item) => {
    if (hasLangParam) {
      return item.lang.includes(lang);
    } else return item;
  });
  return new Response(JSON.stringify(changelog), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
  });
};
