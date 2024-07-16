import { Locales } from "@/dictionaries/tools";
import { readdirSync } from "fs";
import { join } from "path";

const getJournal = (locale: Locales) => {
  const pathToContent = join(process.cwd(), "journal", locale);
  const dir = readdirSync(pathToContent);
  return dir;
};

export { getJournal };
