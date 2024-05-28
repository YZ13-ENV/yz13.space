import { getThread } from "@yz13/api/db/threads"
import Link from "next/link"
import { BiLeftArrowAlt } from "react-icons/bi"
import { LeftSide } from "../_components/left"
import { RightSide } from "../_components/right"
import { Thread } from "../_components/thread/ui/thread"

type Props = {
  params: {
    thread: string
  }
}
const page = async ({ params }: Props) => {
  const thread_id = parseInt(params.thread)
  const thread_res = await getThread(thread_id)
  const thread = thread_res.data
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
            <Thread thread={thread} />
          }
        </div>
      </RightSide>
    </div>
  )
}
export default page