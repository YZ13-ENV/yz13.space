import { Separator } from "@repo/ui/separator"
import { getSubThreads } from "@yz13/api/db/threads"
import { ThreadTree } from "@yz13/api/db/types"
import dayjs from "dayjs"
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
  const { thread_id, name } = thread
  const sub_threads_res = await getSubThreads(thread_id)
  const sub_threads = (sub_threads_res.data || [])
  const sorted = sub_threads.sort((a, b) => {
    const a_date = dayjs(a.created_at)
    const b_date = dayjs(b.created_at)
    return a_date.diff(b_date)
  })
  const maxed_sub_threads = (max !== 0 ? sorted.slice(0, max) : sorted)
  return (
    <section className={className}>
      {
        name &&
        <h3 className="text-xl font-semibold">{name}</h3>
      }
      <div className="w-full relative">
        <div className="w-full h-fit">
          {
            maxed_sub_threads.map(
              sub_thread =>
                <SubThread
                  key={`${thread_id}-${thread}`}
                  enableLink={enableLink}
                  sub_thread={sub_thread} />
            )
          }
        </div>
        {
          sub_threads.length >= 2 &&
          <div className="absolute w-9 h-full -left-0.5 py-3 flex justify-center top-0 z-[-2]">
            <Separator orientation="vertical" className="w-[3px]" />
          </div>
        }
      </div>
      {
        sub_threads.length >= max && max >= 1 &&
        <div className="w-full h-12 flex items-center relative gap-3 hover:bg-accents-1 rounded-xl transition-colors">
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
      {
        // max && sub_threads.length > max &&
        // <ThreadSummary sub_threads={sub_threads} />
      }
    </section>
  )
}
export { Thread }
