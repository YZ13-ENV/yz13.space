import { randomNumber } from "@yz13/api/helpers/random-number";

type CursorTheme = {
  id: number;
  color: string; // #hex
  border: string;
};

const default_theme: CursorTheme = {
  id: 1,
  border: "#fff",
  color: "#000",
};

const themes = [default_theme];
const getRandomThemeId = () => {
  const sorted_themes = themes.sort((a, b) => b.id - a.id);
  const min = sorted_themes[0]?.id || 0;
  const max = sorted_themes[sorted_themes.length - 1]?.id || themes.length - 1;
  return randomNumber(min, max);
};
const getThemeById = (id: number) => themes.find((theme) => (theme.id = id));
export { getRandomThemeId, getThemeById, themes };
export type { CursorTheme };
