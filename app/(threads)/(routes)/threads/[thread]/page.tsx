import { Footer } from "@/app/(threads)/_components/footer"
import Link from "next/link"
import { Suspense } from "react"
import { BiLeftArrowAlt } from "react-icons/bi"
import { Skeleton } from "../skeleton"
import { OtherThreads } from "./other-threads"
import { ThreadWrapper } from "./thread"

type Props = {
  params: {
    thread: string
  }
}

const page = ({ params }: Props) => {
  const thread_id = parseInt(params.thread)
  return (
    <div className="w-full">
      <div className="border-t border-r">
        <div className="flex items-center justify-start p-6 border-b">
          <Link href="/threads" className="inline-flex items-center text-secondary gap-1">
            <BiLeftArrowAlt size={16} className="text-inherit" />
            <span className="text-sm text-inherit">Back</span>
          </Link>
        </div>
        <div className="w-full">
          <Suspense fallback={<Skeleton prefix="-target-" length={1} />}>
            <ThreadWrapper id={thread_id} />
          </Suspense>
        </div>
        <Suspense fallback={<Skeleton prefix="-other-" length={3} />}>
          <OtherThreads id={thread_id} />
        </Suspense>
        <Footer className="p-6 border-t" />
      </div>
    </div>
  )
}
export default page