import { get } from "@vercel/edge-config";
import Negotiator from "negotiator";
import { NextResponse, type NextRequest } from "next/server";

type Rewrites = {
  from: string;
  to: string;
};

export async function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const headers = req.headers;
  const locales = ["en-US", "ru-RU"];
  const default_locale = "en-US";
  let negotiator = new Negotiator({
    headers: headers as unknown as Negotiator.Headers,
  });
  const locale = negotiator.language(locales) || default_locale;
  const { pathname } = req.nextUrl;
  const cookiesLocale = cookies.get("locale")?.value;
  const response = NextResponse.next();
  if (!cookiesLocale) response.cookies.set("locale", locale);
  try {
    const rewrites = await get<Rewrites[]>("rewrites");
    const matchedRewrite =
      rewrites && rewrites.length !== 0
        ? rewrites.find((item) => item.from === pathname)
        : undefined;
    if (matchedRewrite) {
      return NextResponse.redirect(new URL(matchedRewrite.to, req.url));
    } else return response;
  } catch (e) {
    console.log(e);
    return response;
  }
}

export const config = {
  matcher: ["/:path*"],
};
