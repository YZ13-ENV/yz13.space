import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { Page, dynamicMetadata } from "@/metadata"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { JournalLastFive } from "../journal/journal-last-five"
import { LocalData } from "./local-data"
import { LastChangelog } from "./last-changelog"
import { InspirationGrid, InspirationGridSkeleton } from "../inspiration/inspiration-grid"
import { TeamExperience } from "./team-info/team-experience"
import { Header } from "@/components/header/header"
import { Searchbar } from "../inspiration/search-bar"
import { Works, WorksSkeleton } from "./works"

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const lang = getCurrentLocale()
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
  const lang = getCurrentLocale()
  const t = await getI18n()
  return (
    <>
      <Header lang={lang} />
      <Main>
        <Aside>
          <NavList />
        </Aside>
        <Content>
          <div className="flex flex-col w-full gap-2">
            <Searchbar />
            <div className="flex items-center justify-between gap-2 px-2">
              <LocalData lang={lang} />
              <LastChangelog lang={lang} />
            </div>
          </div>
          <div className="w-full gap-6 h-fit flex sm:!flex-row flex-col items-start">
            <div className="xl:!w-1/2 w-full sm:!h-full h-fit space-y-3">
              <div className="flex items-center h-9 gap-2">
                <Link
                  href="/journal"
                  className="text-lg font-medium text-secondary hover:text-foreground transition-colors"
                >
                  {t("journal.title")}
                </Link>
              </div>
              <Suspense fallback={
                <ul className="h-fit w-full space-y-3">
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                </ul>
              }>
                <JournalLastFive lang={lang} />
              </Suspense>
            </div>
            <div className="xl:!w-1/2 w-full sm:!h-full h-fit space-y-3">
              <div className="flex items-center h-9 gap-2">
                <Link
                  href="/team"
                  className="text-lg font-medium text-secondary hover:text-foreground transition-colors"
                >
                  {t("team.title")}
                </Link>
              </div>
              <TeamExperience lang={lang} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center h-9 gap-2">
              <Link
                href="/works"
                className="text-lg font-medium text-secondary hover:text-foreground transition-colors"
              >
                {t("works.title")}
              </Link>
            </div>
            <Suspense fallback={<WorksSkeleton />}>
              <Works lang={lang} />
            </Suspense>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center h-9 gap-2">
              <Link
                href="/inspiration"
                className="text-lg font-medium text-secondary hover:text-foreground transition-colors"
              >
                {t("inspiration.title")}
              </Link>
            </div>
            <Suspense fallback={<InspirationGridSkeleton />}>
              <InspirationGrid lang={lang} max={12} />
            </Suspense>
            <footer className="flex justify-between items-center mt-6">
              <span className="text-sm text-secondary">YZ13</span>
              <span className="text-sm text-secondary">2024</span>
            </footer>
          </div>
        </Content>
      </Main>
    </>
  )
}
export default page
