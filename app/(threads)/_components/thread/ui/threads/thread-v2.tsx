import { FullSubThread, FullThread } from "@yz13/api/db/types"
import { SubThreadV2 } from "../sub-threads/sub-thread-v2"
import { Thread as ThreadWrapper } from "./thread"

type Props = {
  thread: FullThread
  max?: number
  enableLink?: boolean
  className?: string
  component?: (props: SubThreadsProps) => JSX.Element
}
export type SubThreadsProps = {
  tag?: string
  sub_thread: FullSubThread
  pinned?: boolean
  enableLink?: boolean
  className?: string
  enableLine?: boolean
}
const Thread = async ({ thread, max = 0, enableLink = false, className = "", component = SubThreadV2 }: Props) => {
  const { name, threads, thread_id } = thread
  const sub_threads = threads
  const hasMoreThanMax = sub_threads.length >= max && max >= 1
  return (
    <ThreadWrapper id={name ? name?.toLowerCase() : String(thread_id)} className={className}>
      <ThreadWrapper.List
        tag={thread.name || "unnamed"}
        enableLink={enableLink}
        thread_id={thread.thread_id}
        sub_threads={sub_threads}
        pinned={thread.pinned}
      />
      {
        hasMoreThanMax &&
        <ThreadWrapper.Link id={String(thread_id)} />
      }
    </ThreadWrapper>
  )
}
export { Thread }
