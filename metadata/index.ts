import { isDev } from "@/app/[locale]/(auth)/(routes)/login/get-url";
import { Locales } from "@/locales/server";
import { Metadata } from "next";
import { unstable_cache as cache } from "next/cache";
import { defaultMetadata } from "./const/default-metadata";
import { icons } from "./const/icons";
import { openGraph } from "./const/og";
import { twitter } from "./const/twitter";
import { verification } from "./const/verification";
import { keywords } from "./dynamic/keywords";
import { getLocaleMetadata } from "./locale/tools";
import pages from "./pages";

export type Page = keyof typeof pages;

const INTERNAL__dynamicMetadata = async (locale: Locales, path?: Page) => {
  const pageMetadata = path
    ? (pages[path] ?? defaultMetadata)
    : defaultMetadata;
  const words = await keywords();
  if (!path) {
    return {
      ...pageMetadata,
      icons,
      keywords: words,
      verification,
      openGraph,
      twitter,
    };
  } else {
    const localeMetadata = await getLocaleMetadata<Metadata>(path, locale);
    return {
      ...pageMetadata,
      ...localeMetadata,
      icons,
      keywords: words,
      verification,
    };
  }
};

export const dynamicMetadata = async (
  locale: Locales,
  path?: Page
): Promise<Metadata> => {
  if (isDev) {
    const metadata = await INTERNAL__dynamicMetadata(locale, path);
    return metadata;
  } else {
    const getCachedMetadata = cache(
      async (locale: Locales, path?: Page) =>
        await INTERNAL__dynamicMetadata(locale, path),
      ["metadata"],
      { revalidate: 60 * 60 }
    );
    const metadata = await getCachedMetadata(locale, path);
    return metadata;
  }
};
