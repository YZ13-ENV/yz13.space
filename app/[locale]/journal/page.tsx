import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { LogoHeader } from "@/components/header/logo"
import { UserHeader } from "@/components/header/user"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { Page, dynamicMetadata } from "@/metadata"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { Metadata } from "next"
import { Suspense } from "react"
import { JournalList } from "./journal-list"

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
  const JournalRecord = () => {
    return (
      <div className="w-full flex items-center gap-4">
        <div className="h-16 aspect-video rounded-xl border relative hover:border-foreground transition-colors"></div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="-space-x-2 shrink-0 h-5">
              <div className="size-5 inline-block rounded-full bg-yz-neutral-100 border" />
              <div className="size-5 inline-block rounded-full bg-yz-neutral-100 border" />
              <div className="size-5 inline-block rounded-full bg-yz-neutral-100 border" />
            </div>
            <span className="text-foreground line-clamp-1 font-medium">Journal record</span>
          </div>
          <span className="text-sm text-secondary line-clamp-2">
            Description that came from journal record
          </span>
        </div>
      </div>
    )
  }
  return (
    <>
      <header className="flex px-6 mt-6 justify-between items-center">
        <div className="flex items-center gap-2">
          <LogoHeader className="size-9" />
          <span className="text-2xl text-foreground font-pixel">YZ13</span>
        </div>
        <div className="flex items-center h-9">
          <UserHeader size={36} lang={lang} />
        </div>
      </header>
      <Main>
        <Aside>
          <NavList />
        </Aside>
        <Content className="flex flex-col">
          <Suspense
            fallback={
              <Skeleton className="h-10 w-36" />
            }
          >
            <h1 className="text-4xl font-medium">{t("journal.title")}</h1>
          </Suspense>
          <section className="w-full h-fit py-12 space-y-6">
            <h2 className="text-2xl font-medium text-foreground/80">Last records</h2>
            <ul className="w-full h-fit grid lg:!grid-cols-4 md:!grid-cols-3 sm:!grid-cols-2 grid-cols-1 auto-rows-auto gap-6">
              <Suspense fallback={
                <>
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                </>
              }>
                <JournalList />
              </Suspense>
            </ul>
          </section>
          <section className="space-y-6 w-full h-fit">
            <h2 className="text-2xl font-medium text-foreground/80">All records</h2>
            <div className="w-full grid lg:!grid-cols-3 md:!grid-cols-2 grid-cols-1 auto-rows-auto gap-6">
              <JournalRecord />
              <JournalRecord />
              <JournalRecord />

              <JournalRecord />
              <JournalRecord />
              <JournalRecord />
            </div>
          </section>
        </Content>
      </Main>
    </>
  )
}
export default page