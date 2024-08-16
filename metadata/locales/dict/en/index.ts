import home from "./home";
import journal from "./journal";
import works from "./works";
export default {
  ...home,
  ...journal,
  ...works,
} as const;
