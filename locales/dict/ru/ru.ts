import settings from "./dock.settings";
import journal from "./journal";
import works from "./works";
export default { ...journal, ...settings, ...works } as const;
