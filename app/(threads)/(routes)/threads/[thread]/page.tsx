import { Contacts, ContactsSkeleton } from "@/app/(threads)/_components/contacts"
import { Footer } from "@/app/(threads)/_components/footer"
import { Dock } from "@/components/dock"
import { Header } from "@/components/header"
import { Logo } from "@/components/logo"
import { metadata as layoutMetadata } from "@/const/metadata"
import { Locales, getLocale } from "@/dictionaries/tools"
import { getFullThread } from "@yz13/api/db/threads"
import { Metadata } from "next"
import Link from "next/link"
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseInt(params.thread)
  const thread = (await getFullThread(id)).data
  const name = thread?.name || "Thread"
  if (!thread) return layoutMetadata
  return {
    ...layoutMetadata,
    title: name,
    description: `There is all posts on ${name} thread`
  }
}

const page = ({ params, searchParams }: Props) => {
  const thread_id = parseInt(params.thread)
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  return (
    <>
      <Link href="/threads">
        <Logo
          width={36} height={36}
          className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
        />
      </Link>
      <Dock />
      <div className="max-w-3xl w-full mx-auto">
        <div className="p-6 h-fit">
          <Suspense fallback={<ChangelogSkeleton />}>
            <Changelog lang={lang} />
          </Suspense>
        </div>
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
      </div>
    </>
  )
}
export default page