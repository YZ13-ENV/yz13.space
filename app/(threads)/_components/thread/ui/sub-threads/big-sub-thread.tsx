import { cn } from "@repo/ui/cn"
import { TooltipProvider } from "@repo/ui/tooltip"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Link from "next/link"
import { Attachments } from "../attachmets"
import { Author } from "../author"
import { SubThreadStatistics } from "../sub-thread-statistics"
import { SubThreadsProps } from "../threads/thread-v2"
dayjs.extend(relativeTime)

const SubThreadBig = ({ enableLink = false, sub_thread, className = "" }: SubThreadsProps) => {
  const created_at = dayjs(sub_thread?.created_at).fromNow()
  return (
    <div className={cn("flex flex-col items-start py-3 group gap-3 relative", className)}>
      <div className="w-full flex items-center gap-2">
        <div className="w-fit shrink-0 -space-y-4">
          <TooltipProvider delayDuration={100}>
            {
              sub_thread?.author &&
              sub_thread?.author.map(
                (author, i) => <Author size={42} key={author + "-" + i} author={author} />)
            }
          </TooltipProvider>
        </div>
        <div className="w-full flex justify-between items-center gap-2">
          <div className="flex flex-col">
            <span className="font-semibold text-base text-foreground line-clamp-1">
              {sub_thread?.author && sub_thread.author.map(item => item.username).join(", ")}
            </span>
            <span className="text-xs text-accents-5">
              {sub_thread?.author && sub_thread.author.map(item => item.position).join(", ")}
            </span>
          </div>
          <span className="text-xs text-secondary">{created_at}</span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="py-2 px-2.5 rounded-tl-md group-hover:bg-accents-1 group-hover:border-foreground duration-500 bg-background transition-colors rounded-bl-2xl space-y-2 rounded-r-2xl border">
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
        </div>
        <SubThreadStatistics sub_thread={sub_thread} hideTime format="HH:mm / DD MMMM YYYY" className="justify-start gap-2" />
      </div>
    </div>
  )
}
export { SubThreadBig }
