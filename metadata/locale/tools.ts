import { unstable_cache as cache } from "next/cache";
import "server-only";

export type Locales = "en" | "ru";
export const locales = ["en", "ru"];

const getLocaleMetadata = async <T extends any>(
  dict: string,
  locale: Locales
): Promise<T> => {
  const key = `metadata-dict-${locale}`;
  const getCachedModule = cache(
    (dict: string, locale: Locales) => import(`./${dict}/${locale}.json`),
    [key],
    {
      revalidate: 60 * 60,
    }
  );
  const module = await getCachedModule(dict, locale);
  const defaultModule = module;
  return defaultModule;
};

export { getLocaleMetadata };
