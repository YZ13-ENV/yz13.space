import { Header } from "@/app/_components/header";
import { LeftSide } from "@/app/_components/left";
import { RightSide } from "@/app/_components/right";
import { SplitViewContainer } from "@/app/_components/split-view-container";
import { getLocale } from "@/dictionaries/tools";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Contacts, ContactsSkeleton } from "../../_components/contacts";
import { Footer } from "../../_components/footer";
import { SearchBar } from "../../_components/search-bar";
import { Changelog, ChangelogSkeleton } from "./changelog";
import { Skeleton } from "./skeleton";
import { ThreadsList } from "./threads-list";

type Props = {
  searchParams: {
    filter?: string
    lang?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const filter = searchParams.filter
  const lang = searchParams.lang
  const locale = getLocale()
  if (!lang) redirect(`?lang=${locale}`)
  return (
    <SplitViewContainer>
      <LeftSide>
        <div className="p-6 h-screen">
          <div className="w-full h-1/3">
            <div className="w-full">
              <h1 className="xl:text-9xl lg:text-8xl md:text-7xl text-8xl font-bold">Blog</h1>
            </div>
            <div className="w-full h-fit flex gap-3 xl:flex-row py-6 flex-col">
              <div className="xl:w-2/3 w-full space-y-3">
                <span className="text-lg text-secondary">Languages</span>
                <div className="w-full flex flex-row flex-wrap gap-1">
                  <Link href="?lang=ru" className="text-sm border rounded-lg px-2 py-1 bg-yz-neutral-100">Russian</Link>
                  <Link href="?lang=en" className="text-sm border rounded-lg px-2 py-1 bg-yz-neutral-100">English</Link>
                </div>
              </div>
              <div className="xl:w-1/3 w-full space-y-3">
                <span className="text-lg text-secondary">Search</span>
                <SearchBar />
              </div>
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
          <Suspense fallback={<Skeleton />}>
            <ThreadsList filter={filter} lang={lang} />
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