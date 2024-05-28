import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { TooltipProvider } from "@repo/ui/tooltip"
import { ThreadItem } from "@yz13/api/db/types"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Link from "next/link"
import { BiChart, BiHeart } from "react-icons/bi"
import { Author } from "./author"

type Props = {
  sub_thread: ThreadItem
  enableLink?: boolean
  className?: string
}
dayjs.extend(relativeTime)
const SubThread = async ({ enableLink = false, sub_thread, className = "" }: Props) => {
  const created_at = dayjs(sub_thread?.created_at).fromNow(false)
  return (
    <div className={cn("flex items-start py-3 gap-3 relative", className)}>
      <div className="w-9 -space-y-4">
        <TooltipProvider delayDuration={100}>
          {
            sub_thread?.author.map(
              (author, i) => <Author key={author + "-" + i} author={author} />)
          }
        </TooltipProvider>
      </div>
      <div className="w-full flex flex-col gap-3">
        {
          enableLink
            ? <Link href={`/${sub_thread.thread_id}`}>
              <span className="text-sm">{sub_thread?.text}</span>
            </Link>
            : <span className="text-sm">{sub_thread?.text}</span>
        }
        <div className="w-full flex items-center justify-between">
          <div className="relative -left-3 flex items-center gap-2">
            <Button disabled variant="ghost" size="sm" className="gap-2">
              <BiHeart size={16} />
              <span className="text-sm text-inherit">{sub_thread?.likes.length || 0}</span>
            </Button>
            <Button disabled variant="ghost" size="sm" className="gap-2">
              <BiChart size={16} />
              <span className="text-sm text-inherit">{sub_thread?.views.length || 0}</span>
            </Button>
          </div>
          <span className="text-xs">{created_at}</span>
        </div>
      </div>
    </div>
  )
}
export { SubThread }
