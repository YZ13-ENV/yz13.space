import { getWorksByType } from "@/packages/api/src/db/works"
import { getStorageItem } from "@/packages/supabase/src/supabase/storage"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image"
import Link from "next/link"
import { LuGlobe } from "react-icons/lu"

dayjs.extend(relativeTime)
const Works = async () => {
  const list = await getWorksByType("website")
  const websites = (list.data || [])
  return (
    <div className="w-full divide-y">
      {
        websites.map(
          site => {
            const link = site.thumbnail
            const thumbnail = link ? getStorageItem(["media", link]) : null
            return (
              <div key={"site#" + site.id} className="w-full p-4 space-y-4">
                <div className="w-full aspect-video">
                  <div className="w-full aspect-video relative rounded-xl border overflow-hidden">
                    <div className="w-full aspect-video">
                      {
                        thumbnail &&
                        <Image className="w-full aspect-video" src={thumbnail} width={600} height={500} alt="website-thumbnail" />
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
