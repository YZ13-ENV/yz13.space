import { LogoHeader } from "@/components/header/logo"
import { MiniNav } from "@/components/header/mini-nav"
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
      <header className="flex ml-6 mt-6 md:!items-center items-start md:!flex-row flex-col gap-3 md:!gap-6">
        <div className="flex items-center gap-2">
          <LogoHeader className="size-9" />
          <span className="text-2xl font-pixel">YZ13</span>
        </div>
        <MiniNav />
      </header>
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