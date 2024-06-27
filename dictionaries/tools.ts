import "server-only";

export type Locales = "en" | "ru";

const getDict = (dict: string, locale: Locales) =>
  import(`./${dict}/${locale}.json`).then((module) => module.default);
export { getDict };
