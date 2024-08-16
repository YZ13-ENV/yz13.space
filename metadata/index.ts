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
import { getI18n } from "./locales/server";
import pages from "./pages";

export type Page = keyof typeof pages;

const INTERNAL__dynamicMetadata = async (path?: Page) => {
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
    const t = await getI18n();
    const title = t(`metadata.${path}.title`);
    const description = t(`metadata.${path}.description`);
    return {
      ...pageMetadata,
      title,
      description,
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
    const metadata = await INTERNAL__dynamicMetadata(path);
    return metadata;
  } else {
    const getCachedMetadata = cache(
      async (path?: Page) => await INTERNAL__dynamicMetadata(path),
      ["metadata"],
      { revalidate: 60 * 60 * 6 }
    );
    const metadata = await getCachedMetadata(path);
    return metadata;
  }
};
