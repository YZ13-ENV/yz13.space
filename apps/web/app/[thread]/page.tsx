import { getThread } from "@yz13/api/db/threads"
import Image from "next/image"
import Link from "next/link"
import { BiLeftArrowAlt } from "react-icons/bi"
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
    <div className="w-full max-w-xl mx-auto h-full space-y-12 md:px-6 px-3 py-12">
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center text-secondary gap-1">
          <BiLeftArrowAlt size={16} className="text-inherit" />
          <span className="text-sm text-inherit">Back to home</span>
        </Link>
        <Image src="/brand/yz13-dark.svg" width={36} height={36} alt="brand-logo" />
      </div>
      <div className="w-full space-y-3">
        {
          thread &&
          <Thread thread={thread} />
        }
      </div>
    </div>
  )
}
export default page