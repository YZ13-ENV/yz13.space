import { Locales } from "@/dictionaries/tools";
import { JournalHead } from "@/journal/types";
import { readdirSync } from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { join } from "path";
import { getMDX } from "./[...path]/get-mdx";

const getJournal = (locale: Locales) => {
  const pathToContent = join(process.cwd(), "journal", locale);
  const dir = readdirSync(pathToContent);
  return dir;
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
  const journal = getJournal(locale);
  const parsed = journal.map((path) => parseJournal(locale, [path]));
  const resolved = await Promise.all(parsed);
  return resolved;
};

export { getFullJournal, getJournal, parseJournal };
