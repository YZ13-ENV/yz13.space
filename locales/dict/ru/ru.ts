import settings from "./dock.settings";
import journal from "./journal";
export default { ...journal, ...settings } as const;
