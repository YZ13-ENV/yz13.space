import { Locales, getDict, getLocale } from "@/dictionaries/tools"
import { getChangelog } from "@/packages/api/src/db/changelog"
import dayjs from "dayjs"


const Changelog = async ({ lang: providedLang, hideTitle = false }: { lang?: Locales, hideTitle?: boolean }) => {
  const locale = getLocale()
  const lang = providedLang ? providedLang : locale
  const changelogs = await getChangelog(lang)
  const logs = (changelogs.data || [])
  const changelogDict = await getDict<any>("changelog", lang)
  const name = changelogDict.name
  return (
    <div className="w-full xl:h-2/3 h-fit space-y-3">
      {
        !hideTitle &&
        <span className="text-lg font-semibold">{name}</span>
      }
      <ul className="space-y-1.5">
        {
          logs.map(changelog => {
            const created_at = dayjs(changelog.created_at).format("DD MMMM, HH:mm")
            return <li key={`changelog#${changelog.id}`} className="w-full h-9">
              <button className="w-full h-full flex gap-2 items-center rounded-lg transition-all">
                <span className="xl:text-base text-sm text-secondary shrink-0">{created_at}</span>
                <span className="xl:text-base text-start text-sm line-clamp-1">{changelog.title}</span>
              </button>
            </li>
          }
          )
        }
      </ul>
    </div>
  )
}

const ChangelogSkeleton = () => {
  return (
    <div className="w-full h-2/3 space-y-3">
      <span className="w-48 h-5 rounded-md bg-yz-neutral-100 animate-pulse"></span>
      <ul className="space-y-1.5">
        <li className="w-full h-9 rounded-md bg-yz-neutral-100 animate-pulse"></li>
        <li className="w-full h-9 rounded-md bg-yz-neutral-100 animate-pulse"></li>
        <li className="w-full h-9 rounded-md bg-yz-neutral-100 animate-pulse"></li>
        <li className="w-full h-9 rounded-md bg-yz-neutral-100 animate-pulse"></li>
      </ul>
    </div>
  )
}
export { Changelog, ChangelogSkeleton }
