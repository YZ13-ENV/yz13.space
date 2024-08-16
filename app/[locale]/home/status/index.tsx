import { getI18n } from "@/locales/server"
import { get } from "@vercel/edge-config"
import { PiDotDuotone } from "react-icons/pi"
import { cn } from "yz13/cn"
import { StatusButtons } from "./status-buttons"

type ListProps = {
}

const Status = async ({ }: ListProps) => {
  const status_work = await get<string>("work-status")
  const isAvailable = status_work === "available"
  const isNotAvailable = status_work === "not-available"
  const t = await getI18n()
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
        <span className="text-foreground">{t("home.widget.status.type.active")}</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusButtons />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs">{t("home.widget.status.description-primary")}</span>
          <span className="text-xs">{t("home.widget.status.description-secondary")}</span>
        </div>
      </div>
    </div>
  )
}
export { Status }
