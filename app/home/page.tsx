import Dock from "@/components/dock"
import { LocalizedTitle } from "@/components/localized-title(deprecated)"
import { Stack } from "@/components/stack"
import { Locales, getLocale } from "@/dictionaries/tools"
import { Page, dynamicMetadata } from "@/metadata"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { Metadata } from "next"
import { Suspense } from "react"
import { About } from "./about"
import { UserActivity } from "./activity/activity-widget"
import { LocalData } from "./local-data"
import { Status } from "./status"
import { TeamInfo } from "./team-info/team-info"
import { WhatIOffer } from "./what-i-offer"

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const page: Page = "home"
  const metadata = dynamicMetadata(lang, page)
  return metadata
}

type Props = {
  searchParams: {
    lang?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  return (
    <>
      <Suspense fallback={<></>}>
        <Dock lang={lang} />
      </Suspense>
      <main className="space-y-6 w-full pt-36 px-6 pb-24">
        <LocalData lang={lang} />
        <Stack.Wrapper>
          <Stack.Content>
            <Suspense fallback={<Skeleton className="max-w-lg mx-auto w-full h-28 rounded-xl" />}>
              <Status lang={lang} title={LocalizedTitle} />
            </Suspense>
          </Stack.Content>
          <Stack.Expandable>1</Stack.Expandable>
        </Stack.Wrapper>
        <Suspense fallback={<Skeleton className="max-w-lg mx-auto w-full h-28 rounded-xl " />}>
          <About lang={lang} />
        </Suspense>
        <Suspense fallback={<Skeleton className="max-w-lg mx-auto w-full h-36 rounded-xl" />}>
          <UserActivity uid="d5f98156-1776-42da-8f20-686d6a1ae2a8" lang={lang} />
        </Suspense>
        <Suspense fallback={<Skeleton className="max-w-lg mx-auto w-full h-48 rounded-xl" />}>
          <TeamInfo lang={lang} />
        </Suspense>
        <Suspense fallback={<Skeleton className="max-w-lg mx-auto w-full h-48 rounded-xl" />}>
          <WhatIOffer lang={lang} />
        </Suspense>
      </main>
    </>
  )
}
export default page
