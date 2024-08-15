"use client";
import { createI18nClient } from "next-international/client";

export const { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale } =
  createI18nClient(
    {
      en: () => import("./dict/en/en"),
      ru: () => import("./dict/ru/ru"),
    },
    {
      fallbackLocale: { en: () => import("./dict/en/en") },
    }
  );
