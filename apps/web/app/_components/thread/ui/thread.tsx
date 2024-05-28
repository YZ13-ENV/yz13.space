import { Separator } from "@repo/ui/separator"
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
const Thread = ({ thread, max = 0, enableLink = false, className = "" }: Props) => {
  const { created_at, thread_id, threads } = thread
  return (
    <div className={className}>
      <div className="w-full relative">

        <div className="w-full h-fit">
          {
            (
              max !== 0
                ? threads.slice(0, max)
                : threads
            )
              .map(
                sub_thread =>
                  <SubThread
                    key={`${thread_id}-${thread}`}
                    thread_id={thread_id}
                    enableLink={enableLink}
                    sub_thread_id={sub_thread} />
              )
          }
        </div>
        <div className="absolute w-9 h-full left-2.5 py-3 flex justify-center top-0 z-[-2]">
          <Separator orientation="vertical" className="w-[3px]" />
        </div>
      </div>
      {
        max >= 1 &&
        <div className="w-full h-12 flex items-center relative gap-3 pl-2.5">
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
