import { Locales } from "@/dictionaries/tools"
import { getI18n } from "@/locales/server"
import { LuLanguages } from "react-icons/lu"
import { LanguageSwitcher } from "./language.switcher"

const Language = async ({ lang = "en" }: { lang?: Locales }) => {
  const t = await getI18n()
  return (
    <div className="w-full h-10 rounded-md flex items-center justify-between">
      <div className="flex items-center gap-2 text-foreground/60">
        <LuLanguages size={16} className="text-inherit" />
        <span className="text-sm text-inherit">{t("settings.language.title")}</span>
      </div>
      <LanguageSwitcher lang={lang} />
    </div>
  )
}
export { Language }
