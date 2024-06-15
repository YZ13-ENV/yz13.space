import { FullThread, SubThread } from "@yz13/api/db/types"
import Link from "next/link"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { SubThreadsList } from "../sub-threads-list"
import { SubThreadV2 } from "../sub-threads/sub-thread-v2"

type Props = {
  thread: FullThread
  max?: number
  enableLink?: boolean
  className?: string
  component?: (props: SubThreadsProps) => JSX.Element
}
export type SubThreadsProps = {
  tag?: string
  sub_thread: SubThread
  enableLink?: boolean
  className?: string
}
const Thread = async ({ thread, max = 0, enableLink = false, className = "", component = SubThreadV2 }: Props) => {
  const { name, threads } = thread
  const sub_threads = threads
  const hasMoreThanMax = sub_threads.length >= max && max >= 1
  return (
    <section id={name?.toLowerCase()} className={className}>
      <SubThreadsList
        tag={thread.name}
        enableLink={enableLink}
        thread_id={thread.thread_id}
        sub_threads={sub_threads}
      />
      {
        hasMoreThanMax &&
        <div className="px-6 pb-6">
          <div className="w-full h-10 flex items-center relative gap-3 hover:bg-accents-1 rounded-xl transition-colors">
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
        </div>
      }
    </section>
  )
}
export { Thread }
