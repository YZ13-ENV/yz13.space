import { Thread } from "@/app/(threads)/_components/thread/ui/threads/thread-v2"
import { otherThreads } from "@/packages/api/src/db/threads"

type Props = {
  id: number
}
const OtherThreads = async ({ id }: Props) => {
  const other_threads = await otherThreads(id)
  return (
    <>
      {
        !!other_threads.length &&
        <>
          <div className="p-6">
            <h2 className="text-2xl font-semibold">Other</h2>
          </div>
          <div className="w-full">
            {
              other_threads.map(
                thread =>
                  <Thread
                    className="pt-6"
                    key={thread.thread_id + "-" + thread.created_at}
                    thread={thread}
                    enableLink
                    max={3}
                  />
              )
            }
          </div>
        </>
      }
    </>
  )
}
export { OtherThreads }
