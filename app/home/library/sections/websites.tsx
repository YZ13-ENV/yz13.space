"use server"
import { getWorksByType } from "@/packages/api/src/db/works"
import { cn } from "@/packages/ui/lib/utils"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
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
            return (
              <div key={`website#${website.id}`} className="w-full">
                <div
                  className={cn(
                    "flex items-center aspect-[4/2.5] justify-center rounded-xl border bg-background w-full h-full",
                    "hover:border-foreground hover:bg-yz-neutral-100 cursor-pointer transition-colors"
                  )}
                >
                  <span className="select-none">Website - 1</span>
                </div>
                <div className="flex py-2 w-full justify-between items-center">
                  <span className="text-sm">{website.name}</span>
                  <span className="text-xs text-secondary">{created_at}</span>
                </div>
              </div>
            )
          })
          : <div className="w-full h-full flex justify-center border border-dashed rounded-xl row-span-full col-span-full items-center">
            <span className="text-sm text-secondary">No websites yet</span>
          </div>
      }
    </>

  )
}

export { WebsitesList, websites }

