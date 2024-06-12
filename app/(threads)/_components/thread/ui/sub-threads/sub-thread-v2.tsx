import { SubThread } from "@/packages/api/src/db/types"
import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import { TooltipProvider } from "@repo/ui/tooltip"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Link from "next/link"
import { Attachments } from "../attachmets"
import { Author } from "../author"
import { SubThreadStatistics } from "../sub-thread-statistics"
dayjs.extend(relativeTime)

export type SubThreadsProps = {
  sub_thread: SubThread
  enableLine?: boolean
  enableLink?: boolean
  className?: string
}

const SubThreadV2 = ({
  enableLink = false,
  sub_thread,
  className = "",
  enableLine = false
}: SubThreadsProps) => {
  const created_at = dayjs(sub_thread?.created_at).fromNow()
  const avatar_size = 36
  return (
    <div className={cn("flex items-start group h-fit gap-3 relative", className)}>
      {
        enableLine &&
        <div
          style={{ width: `${avatar_size}px`, top: `${avatar_size / 2}px` }}
          className="absolute w-fit h-full left-0 py-0 flex justify-center top-0 z-[-2]"
        >
          <Separator orientation="vertical" className="w-[3px]" />
        </div>
      }
      <div className="w-9 h-full shrink-0 relative -space-y-4">
        <TooltipProvider delayDuration={100}>
          {
            sub_thread?.author &&
            sub_thread.author.map(
              (author, i) => <Author size={avatar_size} key={author + "-" + i} author={author} />)
          }
        </TooltipProvider>
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-foreground line-clamp-1">
              {sub_thread?.author && sub_thread.author.map(item => item.username).join(", ")}
            </span>
          </div>
          <span className="text-xs text-secondary">{created_at}</span>
        </div>
        <div className="py-2 px-2.5 rounded-tl-md group-hover:bg-accents-1 group-hover:border-foreground duration-500 transition-colors rounded-bl-2xl rounded-r-2xl space-y-2 border">
          {
            enableLink
              ? <Link href={`/${sub_thread.thread_id}`}>
                <span className="group-hover:text-foreground transition-colors text-sm">{sub_thread?.text}</span>
              </Link>
              : <span className="group-hover:text-foreground transition-colors text-sm">{sub_thread?.text}</span>
          }
          {
            sub_thread.attachments.length !== 0 &&
            <Attachments attachments={sub_thread.attachments} />
          }
          <SubThreadStatistics sub_thread={sub_thread} hideTime className="justify-start ml-1 gap-2" />
        </div>
      </div>
    </div>
  )
}
export { SubThreadV2 }
