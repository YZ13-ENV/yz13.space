import { cookies } from "next/headers";
import "server-only";

export type Locales = "en" | "ru";

const getDict = <T extends any>(dict: string, locale: Locales): Promise<T> =>
  import(`./${dict}/${locale}.json`).then((module) => module.default);

const getLocale = (): Locales => {
  const cks = cookies();
  const locale = (cks.get("locale")?.value || "").slice(0, 2) as Locales;
  return locale;
};

export { getDict, getLocale };
