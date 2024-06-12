import { cn } from "@repo/ui/cn"
import { SubThread } from "@yz13/api/db/types"
import dayjs from "dayjs"
import { useMemo } from "react"
import { SubThreadBig } from "./sub-threads/big-sub-thread"
import { SubThreadV2 } from "./sub-threads/sub-thread-v2"
import { SubThreadsProps } from "./threads/thread-v2"


type Props = {
  thread_id: number
  sub_threads?: SubThread[]
  className?: string
  enableLink?: boolean
  forceLines?: boolean
  component?: (props: SubThreadsProps) => JSX.Element
}
const SubThreadsList = ({ forceLines = false, enableLink = false, thread_id, className = "", sub_threads = [], component = SubThreadV2 }: Props) => {
  const sorted = sub_threads.sort((a, b) => {
    const a_date = dayjs(a.created_at)
    const b_date = dayjs(b.created_at)
    // from newer to older
    return b_date.diff(a_date)
    // from older to newer
    // return a_date.diff(b_date)
  })
  const Component = component
  const first_part = useMemo(() => { return sorted.slice(0, 1) }, [sorted])
  const second_part = useMemo(() => { return sorted.slice(1, sorted.length) }, [sorted])
  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="w-full">
        {
          first_part
            .map(
              sub_thread => <SubThreadBig enableLink={enableLink} key={`thread#${thread_id}-sub-thread#${sub_thread.sub_thread_id}`} sub_thread={sub_thread} />
            )
        }
        <div className="w-full space-y-3 h-fit relative">
          {
            second_part
              .map(
                (sub_thread, index, arr) => {
                  const isLast = index === arr.length - 1
                  return <Component
                    key={`thread#${thread_id}-sub-thread#${sub_thread.sub_thread_id}`}
                    sub_thread={sub_thread}
                    enableLink={enableLink}
                  />
                }
              )
          }
        </div>
      </div>
    </div>
  )
}
export { SubThreadsList }
