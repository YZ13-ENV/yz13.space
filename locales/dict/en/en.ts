import dock from "./dock";
import id from "./dock.id";
import settings from "./dock.settings";
import experience from "./experience";
import home from "./home";
import journal from "./journal";
import login from "./login";
import nav from "./nav";
import weekday from "./weekday";
import works from "./works";
export default {
  ...journal,
  ...settings,
  ...id,
  ...works,
  ...home,
  ...dock,
  ...experience,
  ...login,
  ...nav,
  ...weekday,
} as const;
