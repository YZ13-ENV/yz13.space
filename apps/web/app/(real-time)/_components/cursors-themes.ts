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
const red_theme: CursorTheme = {
  id: 2,
  border: "#ff718a",
  color: "#ff4d6d",
};
const yellow_theme: CursorTheme = {
  id: 3,
  border: "#fff4d7",
  color: "#ffb703",
};
const green_theme: CursorTheme = {
  id: 4,
  border: "#dff6ed",
  color: "#31c48d",
};

const themes = [default_theme, red_theme, yellow_theme, green_theme];
const getRandomThemeId = () => {
  const sorted_themes = themes.sort((a, b) => b.id - a.id);
  const min = sorted_themes[0]?.id || 1;
  const max = sorted_themes[sorted_themes.length - 1]?.id || themes.length;
  return randomNumber(min, max);
};
const getThemeById = (id: number) => themes.find((theme) => (theme.id = id));
export { getRandomThemeId, getThemeById, themes };
export type { CursorTheme };
