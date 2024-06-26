"use server"
import { getWorksByType } from "@/packages/api/src/db/works"
import { getStorageItem } from "@/packages/supabase/src/supabase/storage"
import { cn } from "@/packages/ui/lib/utils"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image"
import Link from "next/link"
import { BiImage } from "react-icons/bi"
import { placeholderCount } from "./common"

dayjs.extend(relativeTime)
const websites = (): Promise<number[]> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(placeholderCount)
    }, 1000)
  })
}

const WebsitesList = async () => {
  const list = await getWorksByType("website")
  const websites = (list.data || [])
  return (
    <>
      {
        !!websites.length
          ?
          websites.map(website => {
            const created_at = dayjs(website.created_at).fromNow()
            const href = website.link
            const link = website.thumbnail
            const thumbnail = link ? getStorageItem(["media", link]) : null
            return (
              <div key={`website#${website.id}`} className="w-full overflow-hidden relative group h-fit border rounded-xl hover:bg-yz-neutral-100">
                <div
                  className={cn(
                    "flex items-center aspect-[4/3] justify-center bg-transparent w-full h-full",
                    "cursor-pointer transition-colors shrink-0 relative"
                  )}
                >
                  {
                    thumbnail
                      ? <>
                        {
                          href
                            ? <Link href={href}>
                              <Image className="rounded-xl" src={thumbnail} fill alt="thumbnail" />
                            </Link>
                            : <Image className="rounded-xl" src={thumbnail} fill alt="thumbnail" />
                        }
                      </>
                      : <BiImage size={24} />
                  }
                </div>
                <div
                  className="flex p-2 shrink-0 w-full justify-between rounded-b-xl absolute left-0 transition-all group-hover:bottom-0 -bottom-[100%] border-t bg-background items-center"
                >
                  <span className="text-sm">{website.name}</span>
                  <span className="text-xs text-secondary">{created_at}</span>
                </div>
              </div>
            )
          })
          : <div className="w-full h-full flex justify-center border border-dashed rounded-none row-span-full col-span-full items-center">
            <span className="text-sm text-secondary">No websites yet</span>
          </div>
      }
    </>

  )
}

export { WebsitesList, websites }

