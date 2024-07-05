import { Locales, getDict } from "@/dictionaries/tools"
import { getFullThreads } from "@/packages/api/src/db/threads"
import dayjs from "dayjs"
import { unstable_noStore } from "next/cache"
import { SubThreadV2 } from "../../_components/thread/ui/sub-threads/sub-thread-v2"
import { Thread } from "../../_components/thread/ui/threads/thread-v2"


type Props = {
  filter?: string
  lang?: Locales
}
const ThreadsList = async ({ filter, lang = "en" }: Props) => {
  unstable_noStore()
  const threadsDict = await getDict<any>("threads", lang)
  const placeholder = threadsDict.list.placeholder
  const threads = (await getFullThreads(lang))
    .filter(thread => {
      const sub_threads = thread.threads
      const onlyText = sub_threads.map(sub_thread => ({
        thread_id: sub_thread.thread_id,
        sub_thread_id: sub_thread.sub_thread_id,
        text: (sub_thread.text || "").toLowerCase()
      }))
      const matched = onlyText.filter(text => filter ? text.text.includes(filter) : text)
      const isInMatch = matched.find(item => {
        const matchedId = item.thread_id === thread.thread_id
        const hasSubThreads = !!(thread.threads.find(sub => sub.sub_thread_id === item.sub_thread_id))
        return matchedId && hasSubThreads
      })
      return filter ? !!isInMatch : thread
    })
    .sort((a, b) => {
      const a_date = dayjs(a.created_at)
      const b_date = dayjs(b.created_at)
      return b_date.diff(a_date)
    })
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
  if (!threads.length) return (
    <div className="w-full aspect-video flex justify-center items-center">
      <span className="text-sm text-secondary">{placeholder}</span>
    </div>
  )
  return (
    <>
      {
        threads.map(
          (thread) => <Thread
            key={thread.thread_id + "-" + thread.created_at}
            thread={thread}
            max={3}
            component={SubThreadV2}
            enableLink
          />
        )
      }
    </>
  )
}
export { ThreadsList }
