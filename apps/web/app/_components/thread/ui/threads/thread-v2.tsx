import { Separator } from "@repo/ui/separator"
import { getSubThreads } from "@yz13/api/db/threads"
import { ThreadItem, ThreadTree } from "@yz13/api/db/types"
import dayjs from "dayjs"
import Link from "next/link"
import { BiDotsVerticalRounded, BiStar } from "react-icons/bi"
import { SubThreadBig } from "../sub-threads/big-sub-thread"
import { SubThreadV2 } from "../sub-threads/sub-thread-v2"

type Props = {
  thread: ThreadTree
  max?: number
  enableLink?: boolean
  className?: string
  component?: (props: SubThreadsProps) => Promise<JSX.Element>
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
  const sorted = sub_threads.sort((a, b) => {
    const a_date = dayjs(a.created_at)
    const b_date = dayjs(b.created_at)
    return a_date.diff(b_date)
  })
  const maxed_sub_threads = (max !== 0 ? sorted.slice(0, max) : sorted)
  return (
    <section id={name} className={className}>
      {
        name &&
        <div className="flex items-center gap-2">
          {thread.pinned &&
            <BiStar className="text-warning-foreground" size={20} />
          }
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
      }
      <div className="w-full">
        {
          maxed_sub_threads
            .slice(0, 1)
            .map(
              (sub_thread, i) => {
                return SubThreadBig({ enableLink: enableLink, sub_thread: sub_thread })
              }
            )
        }
        <div className="w-full h-fit relative">
          {
            maxed_sub_threads
              .slice(1, maxed_sub_threads.length)
              .map(
                (sub_thread, i) => {
                  return component({ enableLink: enableLink, sub_thread: sub_thread })
                }
              )
          }
          {
            maxed_sub_threads
              .slice(1, maxed_sub_threads.length).length >= 2 &&
            <div className="absolute w-9 h-full -left-0.5 py-3 flex justify-center top-0 z-[-2]">
              <Separator orientation="vertical" className="w-[3px]" />
            </div>
          }
        </div>
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
