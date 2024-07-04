import { Dock } from "@/app/_components/dock";
import { Header } from "@/app/_components/header";
import { LeftSide } from "@/app/_components/left";
import { RightSide } from "@/app/_components/right";
import { SplitViewContainer } from "@/app/_components/split-view-container";
import { Locales, getDict, getLocale } from "@/dictionaries/tools";
import { createClient } from "@/packages/supabase/src/supabase/server";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { Contacts, ContactsSkeleton } from "../../_components/contacts";
import { Footer } from "../../_components/footer";
import { NewThreadForm } from "../../_components/new-thread/form";
import { NewThreadTrigger } from "../../_components/new-thread/new-thread-trigger";
import { NewThreadOverlay } from "../../_components/new-thread/overlay";
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
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const threadsDict = await getDict<any>("threads", lang)
  const name = threadsDict.name
  const search = threadsDict.search
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const metadata = user?.user_metadata
  const userType = metadata?.type || "user"
  const isAdmin = userType === "admin"
  return (
    <>
      {
        (user && isAdmin) &&
        <NewThreadOverlay>
          <NewThreadForm user={user} />
        </NewThreadOverlay>
      }
      <Dock />
      <SplitViewContainer>
        <LeftSide>
          <div className="p-6 xl:h-screen h-fit">
            <div className="w-full xl:h-1/3 h-fit">
              <div className="w-full">
                <h1 className="xl:text-9xl lg:text-8xl md:text-7xl text-8xl font-bold">{name}</h1>
              </div>
              <div className="w-full h-fit flex gap-3 xl:flex-row py-6 flex-col">
                <div className="space-y-3 w-full max-w-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-secondary">{search.name}</span>
                    {
                      (user && isAdmin) &&
                      <NewThreadTrigger />
                    }
                  </div>
                  <SearchBar placeholder={search.placeholder} />
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
            <Header lang={lang} />
            <Suspense fallback={<Skeleton />}>
              <ThreadsList filter={filter} lang={lang} />
            </Suspense>
            <Suspense fallback={<ContactsSkeleton />}>
              <Contacts className="p-6" lang={lang} />
            </Suspense>
            <Footer className="p-6" />
          </div>
        </RightSide>
      </SplitViewContainer>
    </>
  )
}
export default page