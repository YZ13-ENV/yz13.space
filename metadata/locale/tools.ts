import "server-only";

export type Locales = "en" | "ru";
export const locales = ["en", "ru"];

const getLocaleMetadata = <T extends any>(
  dict: string,
  locale: Locales
): Promise<T> =>
  import(`./${dict}/${locale}.json`).then((module) => module.default);

export { getLocaleMetadata };
