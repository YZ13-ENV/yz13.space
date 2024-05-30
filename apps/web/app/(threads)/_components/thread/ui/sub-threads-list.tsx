"use client"
import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import { onSubThreads } from "@yz13/api/db/client-threads"
import { ThreadItem } from "@yz13/api/db/types"
import dayjs from "dayjs"
import { useEffect, useMemo, useState } from "react"
import { SubThreadBig } from "./sub-threads/big-sub-thread"
import { SubThreadV2 } from "./sub-threads/sub-thread-v2"
import { SubThreadsProps } from "./threads/thread-v1"


type Props = {
  thread_id: number
  sub_threads?: ThreadItem[]
  className?: string
  enableLink?: boolean
  component?: (props: SubThreadsProps) => JSX.Element
}
const SubThreadsList = ({ enableLink = false, thread_id, className = "", sub_threads = [], component = SubThreadV2 }: Props) => {
  const sorted = useMemo(() => {
    return sub_threads.sort((a, b) => {
      const a_date = dayjs(a.created_at)
      const b_date = dayjs(b.created_at)
      return a_date.diff(b_date)
    })
  }, [sub_threads])
  const [threads, setThreads] = useState<ThreadItem[]>(sorted)
  const first_part = useMemo(() => { return threads.slice(0, 1) }, [threads])
  const second_part = useMemo(() => { return threads.slice(1, threads.length) }, [threads])
  const Component = component
  const replaceThread = (new_thread: ThreadItem) => {
    const update_threads = threads.map(old_thread => {
      if (old_thread.sub_thread_id === new_thread.sub_thread_id) return new_thread
      return old_thread
    })
    setThreads(update_threads)
  }
  const deleteThread = (sub_thread_id: number) => {
    const update_threads = threads.filter(old_thread => old_thread.sub_thread_id !== sub_thread_id)
    setThreads(update_threads)
  }
  const addThread = (new_thread: ThreadItem) => {
    const update_threads = [...threads, new_thread]
    setThreads(update_threads)
  }
  useEffect(() => {
    const channel = `thread-${thread_id}`
    onSubThreads(channel, thread_id, (payload) => {
      if (payload.eventType === "UPDATE") replaceThread(payload.new)
      if (payload.eventType === "DELETE" && payload.old.sub_thread_id) deleteThread(payload.old.sub_thread_id)
      if (payload.eventType === "INSERT") addThread(payload.new)
    })
  }, [thread_id])
  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="w-full">
        {
          first_part
            .map(
              (sub_thread, i) => {
                return <SubThreadBig enableLink={enableLink} key={`thread#${thread_id}-sub-thread#${sub_thread.sub_thread_id}`} sub_thread={sub_thread} />
              }
            )
        }
        <div className="w-full h-fit relative">
          {
            second_part
              .map(
                (sub_thread, i) => {
                  return <Component key={`thread#${thread_id}-sub-thread#${sub_thread.sub_thread_id}`} sub_thread={sub_thread} enableLink={enableLink} />
                }
              )
          }
          {
            second_part.length >= 2 &&
            <div className="absolute w-9 h-full -left-0.5 py-3 flex justify-center top-0 z-[-2]">
              <Separator orientation="vertical" className="w-[3px]" />
            </div>
          }
        </div>
      </div>
    </div>
  )
}
export { SubThreadsList }