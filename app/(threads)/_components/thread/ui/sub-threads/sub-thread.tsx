import { cn } from "@repo/ui/cn"
import { TooltipProvider } from "@repo/ui/tooltip"
import Link from "next/link"
import { Author } from "../author"
import { SubThreadStatistics } from "../sub-thread-statistics"
import { SubThreadsProps } from "../threads/thread-v2"

const SubThread = ({ enableLink = false, sub_thread, className = "" }: SubThreadsProps) => {
  return (
    <div className={cn("flex items-start py-3 group gap-3 relative", className)}>
      <div className="w-9 -space-y-4">
        <TooltipProvider delayDuration={100}>
          {
            sub_thread?.author.map(
              (author, i) => <Author key={author + "-" + i} author={author} />)
          }
        </TooltipProvider>
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="p-2 rounded-tl-md group-hover:bg-accents-1 transition-colors rounded-bl-2xl rounded-r-2xl border">
          {
            enableLink
              ? <Link href={`/${sub_thread.thread_id}`}>
                <span className="group-hover:text-foreground transition-colors text-sm">{sub_thread?.text}</span>
              </Link>
              : <span className="group-hover:text-foreground transition-colors text-sm">{sub_thread?.text}</span>
          }
        </div>
        <SubThreadStatistics sub_thread={sub_thread} />
      </div>
    </div>
  )
}
export { SubThread }
