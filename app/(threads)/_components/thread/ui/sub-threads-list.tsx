import { Separator } from "@/packages/ui/src/components/separator"
import { cn } from "@repo/ui/cn"
import { FullSubThread } from "@yz13/api/db/types"
import dayjs from "dayjs"
import { useMemo } from "react"
import { SubThreadBig } from "./sub-threads/big-sub-thread"
import { SubThreadV2 } from "./sub-threads/sub-thread-v2"
import { SubThreadsProps } from "./threads/thread-v2"


type Props = {
  thread_id: number
  sub_threads?: FullSubThread[]
  className?: string
  enableLink?: boolean
  tag?: string
  component?: (props: SubThreadsProps) => JSX.Element
}
const SubThreadsList = ({
  tag,
  enableLink = false,
  thread_id,
  className = "",
  sub_threads = [],
}: Props) => {
  const sorted = sub_threads.sort((a, b) => {
    const a_date = dayjs(a.created_at)
    const b_date = dayjs(b.created_at)
    return b_date.diff(a_date)
  })
  const first_part = useMemo(() => { return sorted.slice(0, 1) }, [sorted])
  const second_part = useMemo(() => { return sorted.slice(1, sorted.length) }, [sorted])
  return (
    <div className={cn("w-full", className)}>
      <div className="w-full">
        {
          first_part
            .map(sub_thread => <SubThreadBig sub_thread={sub_thread} tag={tag} />)
        }
        <Separator />
        <div className="w-full h-fit relative">
          {
            second_part
              .map(
                (sub_thread, index, arr) => {
                  const isLast = index === arr.length - 1
                  return <SubThreadV2
                    key={`thread#${thread_id}-sub-thread#${sub_thread.sub_thread_id}`}
                    sub_thread={sub_thread}
                    enableLink={enableLink}
                    enableLine={!isLast}
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
