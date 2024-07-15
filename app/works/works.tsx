import { DynamicImage } from "@/components/dynamic-image"
import { getDict, getLocale, Locales } from "@/dictionaries/tools"
import { cn } from "@/packages/ui/lib/utils"
import { getWorksByType } from "@yz13/api/db/works"
import { getStorageItem } from "@yz13/supabase/storage"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Link from "next/link"
import { LuGlobe } from "react-icons/lu"

dayjs.extend(relativeTime)

type ListProps = {
  lang?: Locales
  itemClassName?: string
  className?: string
  hideTitle?: boolean
  title?: ({ name }: { name: string }) => JSX.Element
}
const Works = async ({ lang: providedLang = "en", title: providedTitle, hideTitle = false, className, itemClassName }: ListProps) => {
  const list = await getWorksByType("website")
  const websites = (list.data || [])
  const locale = getLocale()
  const lang = providedLang ? providedLang : locale
  const changelogDict = await getDict<any>("works", lang)
  const name = changelogDict.name
  const title = providedTitle
  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {
        !hideTitle && title && title({ name })
      }
      <div className="w-full grid grid-cols-2 auto-rows-auto gap-4">
        {
          websites.map(
            site => {
              const thumb = site.thumbnail as { dark: string, light: string }
              const dark = getStorageItem(["media", thumb?.dark])
              const light = getStorageItem(["media", thumb?.light])
              const thumbnail = {
                dark: dark,
                light: light
              }
              return (
                <div key={"site#" + site.id} className={cn("w-full p-4 space-y-4", itemClassName)}>
                  <div className="w-full aspect-video">
                    <div className="w-full aspect-video relative rounded-xl border overflow-hidden">
                      <div className="relative w-full aspect-video">
                        {
                          thumbnail &&
                          <DynamicImage image={thumbnail} className="object-fill" alt="works-dynamic-image" />
                        }
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between px-2">
                    <div className="h-full flex items-center gap-3">
                      <LuGlobe size={20} className="text-secondary" />
                      <div className="w-fit flex flex-col">
                        <span className="text-sm text-foreground">{site.name}</span>
                        {site.link && <Link className="text-xs text-secondary hover:underline" href={site.link}>{site.link}</Link>}
                      </div>
                    </div>
                    <span className="text-xs text-secondary">{dayjs(site.created_at).fromNow()}</span>
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

const WorksSkeleton = () => {
  return (
    <div className="w-full h-full space-y-3">
      <span className="w-1/3 h-7 inline-block rounded-md bg-yz-neutral-300 animate-pulse"></span>
      <div className="w-full grid grid-cols-2 auto-rows-auto gap-4">
        <div className="w-full h-full space-y-4">
          <div className="w-full aspect-video relative rounded-xl bg-yz-neutral-300 animate-pulse border" />
          <div className="w-full h-9 rounded-lg bg-yz-neutral-300 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export { Works, WorksSkeleton }
