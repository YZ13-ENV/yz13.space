import { getSubThreads } from "@yz13/api/db/threads"
import { ThreadItem, ThreadTree } from "@yz13/api/db/types"
import Link from "next/link"
import { BiDotsVerticalRounded, BiStar } from "react-icons/bi"
import { SubThreadsList } from "../sub-threads-list"
import { SubThreadV2 } from "../sub-threads/sub-thread-v2"

type Props = {
  thread: ThreadTree
  max?: number
  enableLink?: boolean
  className?: string
  component?: (props: SubThreadsProps) => JSX.Element
}
export type SubThreadsProps = {
  sub_thread: ThreadItem
  enableLink?: boolean
  className?: string
}
const Thread = async ({ thread, max = 0, enableLink = false, className = "", component = SubThreadV2 }: Props) => {
  const { thread_id, name } = thread
  const sub_threads_res = await getSubThreads(thread_id)
  const sub_threads = (sub_threads_res.data || [])
  const hasMoreThanMax = sub_threads.length >= max && max >= 1
  return (
    <section id={name} className={className}>
      {
        name &&
        <div className="flex items-center gap-2 mb-2">
          {thread.pinned &&
            <BiStar className="text-warning-foreground" size={20} />
          }
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
      }
      <SubThreadsList
        forceLines={hasMoreThanMax}
        enableLink={enableLink}
        thread_id={thread.thread_id}
        sub_threads={sub_threads}
      />
      {
        hasMoreThanMax &&
        <div className="w-full h-10 mt-5 flex items-center relative gap-3 hover:bg-accents-1 rounded-xl transition-colors">
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
    </section>
  )
}
export { Thread }
