import changelog from "./changelog";
import home from "./home";
import journal from "./journal";
import settings from "./settings";
import team from "./team";
import works from "./works";
export default {
  ...home,
  ...journal,
  ...works,
  ...team,
  ...changelog,
  ...settings,
} as const;
