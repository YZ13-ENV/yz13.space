import changelog from "./changelog";
import dock from "./dock";
import id from "./dock.id";
import dock_settings from "./dock.settings";
import experience from "./experience";
import home from "./home";
import inspiraiton from "./inspiration";
import journal from "./journal";
import login from "./login";
import nav from "./nav";
import settings from "./settings";
import team from "./team";
import weekday from "./weekday";
import works from "./works";
export default {
  ...journal,
  ...dock_settings,
  ...id,
  ...works,
  ...home,
  ...dock,
  ...experience,
  ...login,
  ...nav,
  ...weekday,
  ...settings,
  ...changelog,
  ...team,
  ...inspiraiton
} as const;
