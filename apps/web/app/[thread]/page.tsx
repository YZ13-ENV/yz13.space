import { Separator } from "@repo/ui/separator"
import { getThread, otherThreads } from "@yz13/api/db/threads"
import Link from "next/link"
import { BiLeftArrowAlt } from "react-icons/bi"
import { LeftSide } from "../_components/left"
import { RightSide } from "../_components/right"
import { SubThreadV2 } from "../_components/thread/ui/sub-threads/sub-thread-v2"
import { PageThread } from "../_components/thread/ui/threads/page-thread"
import { Thread } from "../_components/thread/ui/threads/thread"

type Props = {
  params: {
    thread: string
  }
}
const page = async ({ params }: Props) => {
  const thread_id = parseInt(params.thread)
  const thread_res = await getThread(thread_id)
  const thread = thread_res.data
  const other_threads_res = await otherThreads(thread_id)
  const other_threads = other_threads_res.data ? other_threads_res.data : []
  return (
    <div className="flex lg:flex-row lg:max-w-full max-w-xl lg:mx-0 mx-auto flex-col lg:divide-x divide-x-0 w-full justify-center min-h-screen">
      <LeftSide />
      <RightSide>
        <div className="flex items-center justify-start">
          <Link href="/" className="inline-flex items-center text-secondary gap-1">
            <BiLeftArrowAlt size={16} className="text-inherit" />
            <span className="text-sm text-inherit">Back</span>
          </Link>
        </div>
        <div className="w-full space-y-3">
          {
            thread &&
            <PageThread thread={thread} component={SubThreadV2} />
          }
        </div>
        {
          !!other_threads.length &&
          <>
            <Separator />
            <section>
              <h2 className="text-2xl font-semibold">Other</h2>
              <div className="w-full space-y-3">
                {
                  other_threads.map(
                    thread =>
                      <Thread
                        key={thread.thread_id + "-" + thread.created_at}
                        thread={thread}
                        enableLink
                        max={3}
                      />
                  )
                }
              </div>
            </section>
          </>
        }

      </RightSide>
    </div>
  )
}
export default page