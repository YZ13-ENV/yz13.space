import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest } from "next/server";
import variables from "./locales/variables";

const isProd = process.env.NODE_ENV === "production";
const url = isProd ? ".yz13.space" : "localhost";

const I18nMiddleware = createI18nMiddleware({
  locales: variables,
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
