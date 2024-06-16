import { Separator } from "@repo/ui/separator"
import { getFullThread, otherThreads } from "@yz13/api/db/threads"
import { unstable_noStore } from "next/cache"
import Link from "next/link"
import { BiLeftArrowAlt } from "react-icons/bi"
import { Footer } from "../../_components/footer"
import { SubThreadV2 } from "../../_components/thread/ui/sub-threads/sub-thread-v2"
import { Thread } from "../../_components/thread/ui/threads/thread-v2"

type Props = {
  params: {
    thread: string
  }
}

const page = async ({ params }: Props) => {
  unstable_noStore()
  const thread_id = parseInt(params.thread)
  const thread = await getFullThread(thread_id)
  const other_threads = await otherThreads(thread_id)
  return (
    <div className="w-full">
      <div className="border-t border-r">
        <div className="flex items-center justify-start p-6 border-b">
          <Link href="/" className="inline-flex items-center text-secondary gap-1">
            <BiLeftArrowAlt size={16} className="text-inherit" />
            <span className="text-sm text-inherit">Back</span>
          </Link>
        </div>
        <div className="w-full space-y-3 py-6">
          {
            thread &&
            <Thread thread={thread} component={SubThreadV2} />
          }
        </div>
        {
          !!other_threads.length &&
          <>
            <Separator />
            <section>
              <div className="p-6 border-b">
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
            </section>
          </>
        }
        <Footer className="p-6 border-t" />
      </div>
    </div>
  )
}
export default page