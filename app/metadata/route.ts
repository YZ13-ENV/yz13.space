import { Locales, getLocale } from "@/dictionaries/tools";
import { Page, dynamicMetadata } from "@/metadata";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const pageParam = searchParams.get("page");
  const page = pageParam ? (pageParam as Page) : undefined;
  const langSearchParam = searchParams.get("lang");
  const locale = getLocale();
  const lang = langSearchParam ? (langSearchParam as Locales) : locale;
  const metadata = await dynamicMetadata(lang, page);
  return new Response(JSON.stringify(metadata));
};
