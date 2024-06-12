import { LeftSide } from "@/app/_components/left"
import { RightSide } from "@/app/_components/right"
import { SplitViewContainer } from "@/app/_components/split-view-container"
import { ThreadsWrapper } from "@/app/_components/threads-wrapper"
import { Separator } from "@repo/ui/separator"
import { getFullThread, otherThreads } from "@yz13/api/db/threads"
import { unstable_noStore } from "next/cache"
import Link from "next/link"
import { BiLeftArrowAlt } from "react-icons/bi"
import { Footer } from "../../_components/footer"
import { SubThreadV2 } from "../../_components/thread/ui/sub-threads/sub-thread-v2"
import { Thread } from "../../_components/thread/ui/threads/thread-v2"
import { YZ13Info } from "../../_components/yz13-info"

type Props = {
  params: {
    thread: string
  }
}

unstable_noStore()
const page = async ({ params }: Props) => {
  const thread_id = parseInt(params.thread)
  const thread = await getFullThread(thread_id)
  const other_threads = await otherThreads(thread_id)
  return (
    <SplitViewContainer>
      <LeftSide showButton>
        <YZ13Info />
      </LeftSide>
      <RightSide>
        <ThreadsWrapper>
          <div className="flex items-center justify-start">
            <Link href="/" className="inline-flex items-center text-secondary gap-1">
              <BiLeftArrowAlt size={16} className="text-inherit" />
              <span className="text-sm text-inherit">Back</span>
            </Link>
          </div>
          <div className="w-full space-y-3">
            {
              thread &&
              <Thread thread={thread} component={SubThreadV2} />
            }
          </div>
          {
            !!other_threads.length &&
            <>
              <Separator />
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Other</h2>
                <div className="w-full py-3 space-y-3">
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
          <Footer />
        </ThreadsWrapper>
      </RightSide>
    </SplitViewContainer>
  )
}
export default page