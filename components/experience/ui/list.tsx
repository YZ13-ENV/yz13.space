import { Locales } from "@/dictionaries/tools"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/ru"
import duration from "dayjs/plugin/duration"
import { PiBagSimpleDuotone } from "react-icons/pi"
import { getExperience } from "../api/experience.api"
dayjs.extend(duration);
const ExperienceList = async ({ lang = "en" }: { lang?: Locales }) => {
  const experience = await getExperience(lang)
  const list = (experience.data || [])
  return (
    <>
      <Separator />
      <div className="w-full rounded-xl border">
        {
          !!list.length ?
            <ul className="divide-y">
              {
                list
                  .sort((a, b) => {
                    const a_to_date = dayjs(a.from)
                    const b_to_date = dayjs(b.from)
                    return b_to_date.diff(a_to_date)
                  })
                  .map(item => {
                    const from_date = dayjs(item.from).locale(lang)
                    // const from = from_date.format("MM.YYYY")
                    const not_ended = item.not_ended
                    const to_date = not_ended ? dayjs().locale(lang) : dayjs(item.to).locale(lang)
                    // const to = not_ended ? null : to_date ? to_date.format("MM.YYYY") : null
                    const duration = to_date ? dayjs.duration(from_date.diff(to_date)).locale(lang) : null
                    const durationString = duration?.humanize()
                    return <li key={item.name + "#" + item.id} className="relative first:rounded-t-xl border-collapses last:rounded-b-xl bg-background">
                      <div className="w-full p-2 flex gap-2">
                        <div className="w-11 aspect-square border rounded-lg flex items-center justify-center bg-background">
                          <PiBagSimpleDuotone size={18} />
                        </div>
                        <div className="w-full flex flex-col">
                          <span className="font-medium text-sm">{item.name}</span>
                          <span className="text-xs text-secondary">{durationString}</span>
                        </div>
                      </div>
                    </li>
                  })
              }
            </ul>
            : <div className="w-full h-12 flex items-center justify-center">
              <span className="text-sm">No experience yet</span>
            </div>
        }
      </div>
    </>
  )
}
export { ExperienceList }
