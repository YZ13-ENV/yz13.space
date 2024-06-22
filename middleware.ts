import { get } from "@vercel/edge-config";
import Negotiator from "negotiator";
import { NextResponse, userAgent, type NextRequest } from "next/server";

type Rewrites = {
  from: string;
  to: string;
};

export async function middleware(req: NextRequest) {
  const agent = userAgent(req);
  const cookies = req.cookies;
  const headers = req.headers;
  const locales = ["en-US", "ru-RU"];
  const default_locale = "en-US";
  let negotiator = new Negotiator({
    headers: headers as unknown as Negotiator.Headers,
  });
  const locale = negotiator.language(locales) || default_locale;
  const isBot = agent.isBot;
  const isDev = process.env.NODE_ENV === "development";
  const nextUrl = req.nextUrl;
  const url = req.nextUrl.host;
  const hasWWW = url.startsWith("www");
  const { pathname } = req.nextUrl;
  const isProdDomain = nextUrl.host === "yz13.space";
  const shouldRedirectToWWW = !hasWWW && isProdDomain && !isBot && !isDev;
  const WWWPrefix = "www.";
  const newUrl =
    nextUrl.protocol + "//" + WWWPrefix + nextUrl.hostname + pathname;
  const cookiesLocale = cookies.get("locale")?.value;
  const response = NextResponse.next();
  if (!cookiesLocale) response.cookies.set("locale", locale);
  // if (shouldRedirectToWWW) return NextResponse.redirect(newUrl);
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
