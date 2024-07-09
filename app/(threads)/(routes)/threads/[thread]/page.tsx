import { Contacts, ContactsSkeleton } from "@/app/(threads)/_components/contacts"
import { Footer } from "@/app/(threads)/_components/footer"
import { Dock } from "@/components/dock"
import { Header } from "@/components/header"
import { Logo } from "@/components/logo"
import { Locales, getLocale } from "@/dictionaries/tools"
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

const page = ({ params, searchParams }: Props) => {
  const thread_id = parseInt(params.thread)
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  return (
    <>
      <Logo
        width={36} height={36}
        className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
      />
      <Dock />
      <div className="max-w-3xl w-full mx-auto">
        <div className="p-6 h-fit">
          <div className="w-full h-1/3">
            <div className="w-full">
              <h1 className="text-7xl font-bold">Blog</h1>
            </div>
          </div>
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