import { Dock } from "@/components/dock";
import { Header } from "@/components/header";
import { Logo } from "@/components/logo";
import { Locales, getDict, getLocale } from "@/dictionaries/tools";
import { createClient } from "@/packages/supabase/src/supabase/server";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { Contacts, ContactsSkeleton } from "../../_components/contacts";
import { Footer } from "../../_components/footer";
import { AnimatedWrapper } from "../../_components/new-thread/animated-wrapper";
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

export const metadata: Metadata = {
  title: "Threads"
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
      <Link href="/home">
        <Logo
          width={36} height={36}
          className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
        />
      </Link>
      {
        (user && isAdmin) &&
        <NewThreadOverlay>
          <AnimatedWrapper>
            <NewThreadForm user={user} />
          </AnimatedWrapper>
        </NewThreadOverlay>
      }
      <Dock />
      <div className="max-w-3xl w-full mx-auto">
        <div className="p-6 h-fit space-y-6">
          <div className="w-full xl:h-1/3 h-fit">
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
          <Suspense fallback={<ChangelogSkeleton />}>
            <Changelog lang={lang} />
          </Suspense>
        </div>
        <Header lang={lang} />
        <Suspense fallback={<Skeleton />}>
          <ThreadsList filter={filter} lang={lang} />
        </Suspense>
        <Suspense fallback={<ContactsSkeleton />}>
          <Contacts className="p-6" lang={lang} />
        </Suspense>
        <Footer className="p-6" />
      </div>
    </>
  )
}
export default page