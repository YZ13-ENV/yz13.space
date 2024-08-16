import { Locales, getI18n } from "@/locales/server"
import json from "@/package.json"
import { LuBox } from "react-icons/lu"

type VersionProps = {
  lang?: Locales
}

const Version = async ({ lang = "en" }: VersionProps) => {
  const t = await getI18n()
  return (
    <div className="w-full h-10 rounded-md flex items-center justify-between">
      <div className="flex items-center gap-2 text-foreground/60">
        <LuBox size={16} className="text-inherit" />
        <span className="text-sm text-inherit">{t("settings.version.title")}</span>
      </div>
      <div className="px-1.5">
        <span className="text-sm text-secondary">{json.version}</span>
      </div>
    </div>
  )
}
export { Version }
