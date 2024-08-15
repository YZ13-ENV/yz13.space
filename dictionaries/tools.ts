import { isDev } from "@/app/[locale]/(auth)/(routes)/login/get-url";
import { unstable_cache as cache } from "next/cache";
import { cookies } from "next/headers";
import "server-only";

export type Locales = "en" | "ru";
export const locales = ["en", "ru"];

const getDict = async <T extends any>(
  dict: string,
  locale: Locales
): Promise<T> => {
  const key = `dict-${locale}`;
  const getCachedModule = cache(
    (dict: string, locale: Locales) => import(`./${dict}/${locale}.json`),
    [key],
    {
      revalidate: 60 * 60,
    }
  );
  if (isDev) {
    const module = await import(`./${dict}/${locale}.json`);
    const defaultModule = module?.default;
    return defaultModule;
  } else {
    const module = await getCachedModule(dict, locale);
    const defaultModule = module;
    return defaultModule;
  }
};

const getLocale = (): Locales => {
  const cks = cookies();
  const locale = (cks.get("locale")?.value || "en").toLowerCase() as Locales;
  return locale;
};

export { getDict, getLocale };
