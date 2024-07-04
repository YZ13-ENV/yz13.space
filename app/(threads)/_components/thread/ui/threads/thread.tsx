import { cn } from "@/packages/ui/lib/utils"
import { Separator } from "@repo/ui/separator"
import { FullSubThread } from "@yz13/api/db/types"
import dayjs from "dayjs"
import Link from "next/link"
import { ReactNode } from "react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { SubThreadBig } from "../sub-threads/big-sub-thread"
import { SubThreadV2 } from "../sub-threads/sub-thread-v2"
// template


type ThreadProps = {
  id: string
  className?: string
  children?: ReactNode
}

type Extensions = {
  displayName: string
  Link: typeof ThreadLink
  List: typeof SubThreadsList
}

const ThreadWrapper = ({ children, id, className }: ThreadProps) => {
  return <article id={id} className={className}>
    {children}
  </article>
}

const ThreadLink = ({ id }: { id: string }) => {
  return (
    <div className="px-6 pb-6">
      <div className="w-full h-10 flex items-center relative gap-3 hover:bg-accents-1 rounded-xl transition-colors">
        <div className="w-9 h-9 flex justify-center items-center">
          <BiDotsVerticalRounded size={18} className="text-secondary" />
        </div>
        <>
          <Link href={`/${id}`} className="w-full absolute left-0 h-full top-0" />
          <span className="text-sm">Show all</span>
        </>
      </div>
    </div>
  )
}

type ListProps = {
  thread_id: number
  className?: string
  sub_threads?: FullSubThread[]
  enableLink?: boolean
  forceLine?: boolean
  tag?: string
  pinned?: boolean
}
const SubThreadsList = ({
  forceLine = false,
  tag,
  enableLink = false,
  thread_id,
  sub_threads = [],
  className = "",
  pinned = false
}: ListProps) => {
  const sorted = sub_threads.sort((a, b) => {
    const a_date = dayjs(a.created_at)
    const b_date = dayjs(b.created_at)
    return b_date.diff(a_date)
  })
  const first_part = sorted.slice(0, 1)
  const second_part = sorted.slice(1, sorted.length)
  return (
    <div className={cn("w-full", className)}>
      {
        first_part
          .map(
            sub_thread =>
              <SubThreadBig
                key={`thread#${thread_id}-sub-thread#${sub_thread.sub_thread_id}`}
                tag={tag}
                sub_thread={sub_thread}
                enableLink={enableLink}
                pinned={pinned}
              />
          )
      }
      {
        !!second_part.length &&
        <>
          <Separator />
          <div className="w-full h-fit relative">
            {
              second_part
                .map(
                  (sub_thread, index, arr) => {
                    const isLast = index === arr.length - 1
                    return (
                      <SubThreadV2
                        key={`thread#${thread_id}-sub-thread#${sub_thread.sub_thread_id}`}
                        className="first:pt-6 pb-6"
                        sub_thread={sub_thread}
                        enableLink={enableLink}
                        enableLine={forceLine ? forceLine : !isLast}
                        pinned={pinned}
                      />
                    )
                  }
                )
            }
          </div>
        </>
      }
    </div>
  )
}



const Thread = ThreadWrapper as typeof ThreadWrapper & Extensions
Thread.displayName = "Thread"
Thread.Link = ThreadLink
Thread.List = SubThreadsList

export { Thread }
