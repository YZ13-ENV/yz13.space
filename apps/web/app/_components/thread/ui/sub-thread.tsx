import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { TooltipProvider } from "@repo/ui/tooltip"
import { getSubThread } from "@yz13/api/db/threads"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Link from "next/link"
import { BiChart, BiHeart } from "react-icons/bi"
import { Author } from "./author"

type Props = {
  thread_id: number
  sub_thread_id: number
  enableLink?: boolean
  className?: string
}
dayjs.extend(relativeTime)
const SubThread = async ({ enableLink = false, sub_thread_id, thread_id, className = "" }: Props) => {
  const sub_thread_res = await getSubThread(thread_id, sub_thread_id)
  const sub_thread = sub_thread_res.data
  const created_at = dayjs(sub_thread?.created_at).fromNow(false)
  return (
    <div className={cn("flex items-start p-3 gap-3 relative", className)}>
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
            ? <Link href={`/${thread_id}`}>
              <span className="text-sm">{sub_thread?.text}</span>
            </Link>
            : <span className="text-sm">{sub_thread?.text}</span>
        }
        <div className="w-full flex items-center justify-between">
          <div className="relative -left-3 flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <BiHeart size={16} />
              <span className="text-sm text-inherit">{sub_thread?.likes.length || 0}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
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
