import { Dock } from "@/components/dock"
import { Locales, getLocale } from "@/dictionaries/tools"
import { Page, dynamicMetadata } from "@/metadata"
import { Metadata } from "next"
import { Suspense } from "react"
import { JournalSection, JournalSkeleton } from "../journal/journal"
import { UpcomingJournal } from "./upcoming-journal"

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const page: Page = "journal"
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
      <main className="space-y-6 w-full pt-36 px-6 pb-12">
        <div className="w-full flex flex-col gap-2 p-3 max-w-lg mx-auto">
          <h1 className="text-4xl font-medium">Journal</h1>
        </div>
        <UpcomingJournal />
        <div className="w-full space-y-6 max-w-lg p-3 mx-auto">
          <Suspense fallback={<JournalSkeleton />}>
            <JournalSection locale={lang} />
          </Suspense>
        </div>
      </main>
    </>
  )
}
export default page