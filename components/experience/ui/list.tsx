import { getDict, getLocale, Locales } from "@/dictionaries/tools"
import { cn } from "@repo/ui/cn"
import dayjs from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/ru"
import duration from "dayjs/plugin/duration"
import { getExperience } from "../api/experience.api"

type ListProps = {
  lang?: Locales
  hideTitle?: boolean
  title?: ({ name }: { name: string }) => JSX.Element
}

dayjs.extend(duration);
const ExperienceList = async ({ lang: providedLang = "en", title: providedTitle, hideTitle = false }: ListProps) => {
  const locale = getLocale()
  const lang = providedLang ? providedLang : locale
  const changelogDict = await getDict<any>("experience", lang)
  const name = changelogDict.name
  const experience = await getExperience(lang)
  const list = (experience.data || [])
  const title = providedTitle
  return (
    <>
      <div className="w-full h-fit space-y-3">
        {
          !hideTitle && title && title({ name })
        }
        {
          !!list.length ?
            <ul>
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
                    return (
                      <li key={item.name + "#" + item.id} className="w-full group h-9">
                        <button className="flex items-center w-full h-full">
                          <span className="xl:text-base w-full text-sm text-secondary text-left float-left space-x-2 shrink-0">
                            <span className="inline">{durationString}</span>
                            <span
                              className={cn(
                                "xl:text-base text-start text-sm group-hover:text-foreground transition-colors"
                              )}
                            >
                              {item.name}
                            </span>
                          </span>
                        </button>
                      </li>
                    )
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
