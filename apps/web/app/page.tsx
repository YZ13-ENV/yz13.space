import { getThreads } from "@yz13/api/db/threads";
import dayjs from "dayjs";
import { Contacts } from "./_components/contacts";
import { Footer } from "./_components/footer";
import { LeftSide } from "./_components/left";
import { RightSide } from "./_components/right";
import { Thread } from "./_components/thread/ui/thread";

const page = async () => {
  const threads_res = await getThreads()
  const threads = (threads_res.data || []).sort((a, b) => {
    const a_date = dayjs(a.created_at)
    const b_date = dayjs(b.created_at)
    return b_date.diff(a_date)
  })
  return (
    <div className="flex lg:flex-row lg:max-w-full max-w-xl lg:mx-0 mx-auto flex-col lg:divide-x divide-x-0 w-full justify-center min-h-screen">
      <LeftSide />
      <RightSide>
        <div className="w-full space-y-3">
          {
            threads.map(
              (thread) => <Thread
                key={thread.thread_id + "-" + thread.created_at}
                thread={thread}
                className="hover:bg-accents-1 transition-all rounded-2xl"
                max={3}
                enableLink
              />
            )
          }
          <Contacts />
          <Footer />
        </div>
      </RightSide>
    </div>
  )
}
export default page