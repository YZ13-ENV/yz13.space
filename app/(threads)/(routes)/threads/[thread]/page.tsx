import { Contacts, ContactsSkeleton } from "@/app/(threads)/_components/contacts"
import { Footer } from "@/app/(threads)/_components/footer"
import { Header } from "@/app/_components/header"
import { LeftSide } from "@/app/_components/left"
import { RightSide } from "@/app/_components/right"
import { SplitViewContainer } from "@/app/_components/split-view-container"
import { getLocale } from "@/dictionaries/tools"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { BiLeftArrowAlt } from "react-icons/bi"
import { Changelog, ChangelogSkeleton } from "../changelog"
import { Skeleton } from "../skeleton"
import { OtherThreads } from "./other-threads"
import { ThreadWrapper } from "./thread"

type Props = {
  params: {
    thread: string
  }
  searchParams: {
    filter?: string
    lang?: string
  }
}

const page = ({ params, searchParams }: Props) => {
  const thread_id = parseInt(params.thread)
  const filter = searchParams.filter
  const lang = searchParams.lang
  const locale = getLocale()
  if (!lang) redirect(`/threads/${thread_id}?lang=${locale}`)
  return (
    <SplitViewContainer>
      <LeftSide>
        <div className="p-6 h-screen">
          <div className="w-full h-1/3">
            <div className="w-full">
              <h1 className="xl:text-9xl lg:text-8xl md:text-7xl text-8xl font-bold">Blog</h1>
            </div>
          </div>
          <Suspense fallback={<ChangelogSkeleton />}>
            <Changelog lang={lang} />
          </Suspense>
        </div>
      </LeftSide>
      <RightSide>
        <div className="w-full divide-y">
          <Header />
          <div className="flex items-center justify-start p-6">
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
          <Suspense fallback={<ContactsSkeleton />}>
            <Contacts className="p-6" />
          </Suspense>
          <Footer className="p-6" />
        </div>
      </RightSide>
    </SplitViewContainer>
  )
}
export default page