import { Locales } from "@/dictionaries/tools";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const getMDX = (locale: Locales, path: string[]) => {
  try {
    const pathToContent = join(process.cwd(), "journal", locale, ...path);
    const file = readFileSync(pathToContent + ".mdx", { encoding: "utf-8" });
    return file;
  } catch (e) {
    console.log(e);
    return "";
  }
};

const isMDXExist = (locale: Locales, path: string[]) => {
  const pathToContent = join(process.cwd(), "journal", locale, ...path);
  const mdx = pathToContent + ".mdx";
  try {
    return existsSync(mdx);
  } catch (e) {
    return false;
  }
};

export { getMDX, isMDXExist };
