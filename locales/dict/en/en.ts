import settings from "./dock.settings";
import home from "./home";
import journal from "./journal";
import works from "./works";
export default {
  ...journal,
  ...settings,
  ...works,
  ...home,
} as const;
