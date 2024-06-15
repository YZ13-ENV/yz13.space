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
    <div className={cn("flex items-start group h-fit p-6 group gap-3 relative", className)}>
      {
        enableLine &&
        <div
          style={{ width: `${avatar_size}px`, height: "100%", top: `${avatar_size}px` }}
          className="absolute w-fit h-full left-6 py-0 flex justify-center z-[-1]"
        >
          <Separator orientation="vertical" className="w-[3px] bg-accents-3" />
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
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2">
          <span className="font-semibold text-base text-foreground line-clamp-1">
            {!!sub_thread?.author.length && sub_thread.author.map(item => item ? item.username : "").join(", ")}
          </span>
          <span className="text-xs text-secondary">{created_at}</span>
        </div>
        <div className="space-y-2">
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
