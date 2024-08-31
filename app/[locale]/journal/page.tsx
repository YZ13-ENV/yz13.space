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
import { JournalLastList } from "./journal-last"
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
          <section className="w-full h-fit pb-12 pt-6 space-y-6">
            <h2 className="text-2xl font-medium text-foreground/80">{t("journal.section.picked.title")}</h2>
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
            <h2 className="text-2xl font-medium text-foreground/80">{t("journal.section.all.title")}</h2>
            <div className="w-full grid lg:!grid-cols-3 md:!grid-cols-2 grid-cols-1 auto-rows-auto gap-6">
              <JournalLastList />
            </div>
          </section>
        </Content>
      </Main>
    </>
  )
}
export default page