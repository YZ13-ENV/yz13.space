import { DynamicImage } from "@/components/dynamic-image"
import { cn } from "@/packages/ui/lib/utils"
import { getWorksByType } from "@yz13/api/db/works"
import { getStorageItem } from "@yz13/supabase/storage"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Link from "next/link"
import { LuGlobe } from "react-icons/lu"

dayjs.extend(relativeTime)
const Works = async ({ itemClassName = "" }: { itemClassName?: string }) => {
  const list = await getWorksByType("website")
  const websites = (list.data || [])
  return (
    <div className="w-full divide-y">
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
  )
}
export { Works }
