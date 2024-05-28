import { Separator } from "@repo/ui/separator"
import { getSubThreads } from "@yz13/api/db/threads"
import { ThreadTree } from "@yz13/api/db/types"
import Link from "next/link"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { SubThread } from "./sub-thread"

type Props = {
  thread: ThreadTree
  max?: number
  enableLink?: boolean
  className?: string
}
const Thread = async ({ thread, max = 0, enableLink = false, className = "" }: Props) => {
  const { created_at, thread_id, threads } = thread
  const sub_threads_res = await getSubThreads(thread_id)
  const sub_threads = (sub_threads_res.data || [])
  return (
    <div className={className}>
      <div className="w-full relative">
        <div className="w-full h-fit">
          {
            (
              max !== 0
                ? sub_threads.slice(0, max)
                : sub_threads
            )
              .map(
                sub_thread =>
                  <SubThread
                    key={`${thread_id}-${thread}`}
                    enableLink={enableLink}
                    sub_thread={sub_thread} />
              )
          }
        </div>
        <div className="absolute w-9 h-full -left-0.5 py-3 flex justify-center top-0 z-[-2]">
          <Separator orientation="vertical" className="w-[3px]" />
        </div>
      </div>
      {
        sub_threads.length >= max && max >= 1 &&
        <div className="w-full h-12 flex items-center relative gap-3">
          <div className="w-9 h-9 flex justify-center items-center">
            <BiDotsVerticalRounded size={18} className="text-secondary" />
          </div>
          {
            enableLink &&
            <>
              <Link href={`/${thread.thread_id}`} className="w-full absolute left-0 h-full top-0" />
              <span className="text-sm">Show all</span>
            </>
          }
        </div>
      }
    </div>
  )
}
export { Thread }
