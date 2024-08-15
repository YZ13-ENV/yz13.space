import { Locales } from "@/dictionaries/tools"
import { getI18n } from "@/locales/server"
import { Language } from "./language"
import { Version } from "./version"

type SettingsProps = {
  lang?: Locales
}

const Settings = async ({ lang = "en" }: SettingsProps) => {
  const t = await getI18n()
  return (
    <div className="w-full h-full px-2 py-1">
      <span className="uppercase text-xs text-secondary">{t("settings.title")}</span>
      <Language lang={lang} />
      <Version lang={lang} />
    </div>
  )
}
export { Settings }
