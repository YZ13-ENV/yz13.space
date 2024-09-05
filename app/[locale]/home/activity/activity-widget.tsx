
import { member } from "@/actions/team-member"
import CommitsActivity from "@/components/commits-activity"
import { getI18n, Locales } from "@/locales/server"
import dayjs from "dayjs"
import { HeatMap } from "./heat-map"

export type ActivityEvent = {
  id: string
  type: string,
  created_at: string
}


const UserActivity = async ({ lang = "en", uid }: { uid: string, lang?: Locales }) => {
  const user = await member(uid)
  const data = user?.data
  const now = dayjs()
  const year = data?.["experience-from"] ?? 2024
  const actualYear = now.year()
  const yearDifference = (actualYear + 1) - year
  const years = Array.from({ length: yearDifference }).map((_, i) => year + i).sort((a, b) => b - a)
  const t = await getI18n()
  return (
    <div className="flex h-fit shrink-0 items-center flex-col overflow-x-hidden gap-2">
      <div className="w-full h-full flex items-center gap-2">
        <div className="sticky left-0 h-full grid grid-rows-7 gap-0.5 mt-2">
          <span className="text-xs h-3 text-secondary capitalize">{t("weekday.monday").slice(0, 3)}</span>
          <span className="text-xs h-3 text-secondary capitalize"></span>
          <span className="text-xs h-3 text-secondary capitalize">{t("weekday.wednesday").slice(0, 3)}</span>
          <span className="text-xs h-3 text-secondary capitalize"></span>
          <span className="text-xs h-3 text-secondary capitalize">{t("weekday.friday").slice(0, 3)}</span>
        </div>
        <HeatMap lang={lang} years={years} />
      </div>
      <CommitsActivity.Legend />
    </div>
  )
}
export { UserActivity }
