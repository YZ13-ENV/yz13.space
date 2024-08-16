import { createI18nServer } from "next-international/server";

export const { getI18n, getScopedI18n, getCurrentLocale, getStaticParams } =
  createI18nServer(
    {
      en: () => import("./dict/en/en"),
      ru: () => import("./dict/ru/ru"),
    },
    {
      fallbackLocale: { en: () => import("./dict/en/en") },
    }
  );
export type Locales = ReturnType<typeof getCurrentLocale>