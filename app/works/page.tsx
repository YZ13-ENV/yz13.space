import { Dock } from "@/components/dock"
import { LocalizedHeading } from "@/components/localized-heading"
import { getLocale, Locales } from "@/dictionaries/tools"
import { dynamicMetadata, Page } from "@/metadata"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { Metadata } from "next"
import { Suspense } from "react"
import { Abc } from "./abc"
import { AbcReset } from "./abc-reset"
import { AbcWorkListSkeleton, AbcWorksList } from "./abc-works-list"

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const page: Page = "works"
  const metadata = dynamicMetadata(lang, page)
  return metadata
}

type Props = {
  searchParams: {
    lang?: string
    lt?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const searchParamLang = searchParams.lang
  const lt = searchParams.lt
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  return (
    <>
      <Suspense fallback={<></>}>
        <Dock lang={lang} />
      </Suspense>
      <main className="space-y-6 w-full pt-36 pl-4 pr-8 pb-12">
        <div className="w-full flex flex-col gap-2 p-3 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <Suspense
              fallback={
                <Skeleton className="h-10 w-36" />
              }
            >
              <LocalizedHeading
                heading="h1"
                className="text-4xl font-medium"
                lang={lang}
                dict="works"
                field="name"
              />
            </Suspense>
            {
              !!lt &&
              <AbcReset lt={lt} />
            }
          </div>
        </div>
        <Suspense fallback={<AbcWorkListSkeleton />}>
          <AbcWorksList lt={lt} />
        </Suspense>
      </main>
      <Abc defaultValue={lt} />
    </>
  )
}
export default page
