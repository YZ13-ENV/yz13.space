import "server-only";

type Dictionaries = {
  [key: string]: () => Promise<{}>;
};

const dictionaries: Dictionaries = {
  en: () => import("./en/en.json").then((module) => module.default),
  ru: () => import("./ru/ru.json").then((module) => module.default),
};

export const getDictionary = async <T>(
  locale: keyof Dictionaries
): Promise<T | {}> => {
  const targetDict = dictionaries[locale];
  const defaultDict = dictionaries["en"];
  if (targetDict) return targetDict();
  return (defaultDict as () => Promise<T>)();
};
