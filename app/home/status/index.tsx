import { getDict, getLocale, Locales } from "@/dictionaries/tools"
import { cn } from "@repo/ui/cn"
import { get } from "@vercel/edge-config"
import { PiDotDuotone } from "react-icons/pi"
import { StatusButtons } from "./status-buttons"

type ListProps = {
  lang?: Locales
  hideTitle?: boolean
  title?: ({ name }: { name: string }) => JSX.Element
}

const Status = async ({ lang: providedLang = "en", title: providedTitle, hideTitle = false }: ListProps) => {
  const status_work = await get<string>("work-status")
  const locale = getLocale()
  const lang = providedLang ? providedLang : locale
  const dict = await getDict<any>("status", lang)
  const description = dict["description"]
  const name = dict[status_work || ""]
  const title = providedTitle
  const isAvailable = status_work === "available"
  const isNotAvailable = status_work === "not-available"
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <PiDotDuotone
          size={24}
          className={cn(
            "animate-ping",
            isAvailable ? "text-success-foreground" : "",
            isNotAvailable ? "text-error-foreground" : "",
          )}
        />
        {
          !hideTitle && title && title({ name })
        }
      </div>
      <div className="flex items-center gap-2">
        <StatusButtons />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs">{description["main"]}</span>
          <span className="text-xs">{description["secondary"]}</span>
        </div>
      </div>
    </div>
  )
}
export { Status }
