import Dock from "@/components/dock"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { Page, dynamicMetadata } from "@/metadata"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { Metadata } from "next"
import { Suspense } from "react"
import { JournalSection, JournalSkeleton } from "./journal"
import { UpcomingJournal } from "./upcoming-journal"

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const lang = getCurrentLocale()
  const page: Page = "journal"
  const metadata = dynamicMetadata(lang, page)
  return metadata
}

type Props = {
  searchParams: {
    lang?: string
  }
}
const page = async ({ }: Props) => {
  const lang = getCurrentLocale()
  const t = await getI18n()
  return (
    <>
      <Suspense fallback={<></>}>
        <Dock lang={lang} />
      </Suspense>
      <main className="space-y-6 w-full pt-36 px-6 pb-12">
        <div className="w-full flex flex-col gap-2 p-3 max-w-lg mx-auto">
          <Suspense
            fallback={
              <Skeleton className="h-10 w-36" />
            }
          >
            <h1 className="text-4xl font-medium">{t("journal.title")}</h1>
          </Suspense>
        </div>
        <Suspense fallback={
          <div className="w-full rounded-xl max-w-lg mx-auto border-2 bg-yz-neutral-100 h-44 animate-pulse" />
        }>
          <UpcomingJournal locale={lang} />
        </Suspense>
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