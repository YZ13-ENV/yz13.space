import { journal } from "@/actions/journal"
import { GroupedAvatars } from "@/components/avatar-group/group"
import { ImageIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "yz13/cn"

const JournalLastList = async () => {
  const list: any[] = await journal()
  return (
    <>
      {
        list.map(
          item => {
            const id = item["publication-id"]
            const title = item?.markdown?.title
            const description = item?.markdown?.description
            const authors = item?.authors ?? []
            const href = `/journal/${id}`
            return (
              <div className="w-full flex items-center gap-4">
                <div
                  className={cn(
                    "h-16 aspect-video rounded-xl border relative hover:border-foreground transition-colors",
                    "flex items-center justify-center"
                  )}
                >
                  <ImageIcon size={16} className="text-secondary" />
                </div>
                <div className="flex flex-col relative">
                  <Link href={href} className="absolute top-0 left-0 w-full h-full" />
                  <div className="flex items-center gap-2">
                    <GroupedAvatars className="-space-x-3" size={24} users={authors} />
                    <span className="text-foreground text-lg line-clamp-1 font-medium">{title}</span>
                  </div>
                  <span className="text-sm text-secondary line-clamp-2">
                    {description}
                  </span>
                </div>
              </div>
            )
          }
        )
      }
    </>
  )
}
export { JournalLastList }
