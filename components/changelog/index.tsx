import { changelog } from "@/actions/changelog"
import { Locales, getDict, getLocale } from "@/dictionaries/tools"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import dayjs from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/ru"
import Link from "next/link"

type ChangelogProps = {
  max?: number
  lang?: Locales
  hideTitle?: boolean
  title?: ({ name }: { name: string }) => JSX.Element
}

export const LocalizedTitle = ({ name }: { name: string }) => {
  return <span className="text-lg">{name}</span>
}

const Changelog = async ({ title: providedTitle, lang: providedLang, hideTitle = false, max = 7 }: ChangelogProps) => {
  const locale = getLocale()
  const lang = providedLang ? providedLang : locale
  const changelog_result = await changelog(lang)
  const changelogs = changelog_result?.data
  if (!changelogs) return "error"
  const logs = (changelogs.data || [])
    .sort((a, b) => {
      const a_date = dayjs(a.created_at)
      const b_date = dayjs(b.created_at)
      return b_date.diff(a_date)
    })
  const changelogDict = await getDict<any>("changelog", lang)
  const name = changelogDict.name
  const isMoreThanMax = logs.length >= (max + 1)
  const title = providedTitle
  return (
    <div className="w-full h-fit space-y-3">
      {
        !hideTitle && title && title({ name })
      }
      <ul className="space-y-1.5">
        {
          !!logs.length &&
          logs
            .slice(0, max)
            .map(changelog => {
              const created_at = dayjs(changelog.created_at).locale(lang).format("DD MMMM, HH:mm")
              return <li key={`changelog#${changelog.id}`} className="w-full group h-9">
                <button className="w-full h-full transition-all">
                  <span className="xl:text-base w-full text-sm text-secondary text-left float-left space-x-2 shrink-0">
                    <span className="inline">{created_at}</span>
                    <span
                      className={cn(
                        "xl:text-base text-start text-sm group-hover:text-foreground transition-colors"
                      )}
                    >
                      {changelog.title}
                    </span>
                  </span>
                </button>
              </li>
            }
            )
        }
        {
          isMoreThanMax &&
          <li>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/changelog">See all</Link>
            </Button>
          </li>
        }
      </ul>
    </div>
  )
}

const ChangelogSkeleton = () => {
  return (
    <div className="w-full h-full space-y-3">
      <span className="w-1/3 h-7 inline-block rounded-md bg-yz-neutral-300 animate-pulse"></span>
      <ul className="w-full flex flex-col gap-3">
        <li className="w-full h-9">
          <button className="flex items-center w-full h-full">
            <span className="xl:text-base w-full inline-flex space-x-2 shrink-0">
              <span className="animate-pulse w-24 inline-block h-5 rounded-md bg-yz-neutral-300" />
              <span className="animate-pulse w-full inline-block h-5 rounded-md bg-yz-neutral-300" />
            </span>
          </button>
        </li>
        <li className="w-full h-9">
          <button className="flex items-center w-full h-full">
            <span className="xl:text-base w-full inline-flex space-x-2 shrink-0">
              <span className="animate-pulse w-24 inline-block h-5 rounded-md bg-yz-neutral-300" />
              <span className="animate-pulse w-full inline-block h-5 rounded-md bg-yz-neutral-300" />
            </span>
          </button>
        </li>
        <li className="w-full h-9">
          <button className="flex items-center w-full h-full">
            <span className="xl:text-base w-full inline-flex space-x-2 shrink-0">
              <span className="animate-pulse w-24 inline-block h-5 rounded-md bg-yz-neutral-300" />
              <span className="animate-pulse w-full inline-block h-5 rounded-md bg-yz-neutral-300" />
            </span>
          </button>
        </li>
      </ul>
    </div>
  )
}
export { Changelog, ChangelogSkeleton }
