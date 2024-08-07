import { Locales } from "@/dictionaries/tools";
import { JournalHead } from "@/journal/types";
import { readdirSync } from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { unstable_cache as cache } from "next/cache";
import { join } from "path";
import { isDev } from "../(auth)/(routes)/login/get-url";
import { getMDX } from "./[...path]/get-mdx";

const getJournal = (locale: Locales) => {
  try {
    const pathToContent = join(process.cwd(), "journal", locale);
    const dir = readdirSync(pathToContent);
    return dir;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const parseJournal = (locale: Locales, path: string[]) => {
  const joined = path.join("/");
  const mdx = getMDX(locale, joined);
  const serialized = compileMDX<JournalHead>({
    source: mdx,
    options: { parseFrontmatter: true },
  });
  return serialized;
};

const getFullJournal = async (locale: Locales) => {
  const getCachedJournal = cache(
    (path: string, locale: Locales) => parseJournal(locale, [path]),
    ["journal"],
    { revalidate: 60 * 60 }
  );
  if (isDev) {
    const journal = getJournal(locale);
    const parsed = journal.map((path) => parseJournal(locale, [path]));
    const resolved = await Promise.all(parsed);
    return resolved;
  } else {
    const journal = getJournal(locale);
    const parsed = journal.map((path) => getCachedJournal(path, locale));
    const resolved = await Promise.all(parsed);
    return resolved;
  }
};

export { getFullJournal, getJournal, parseJournal };
