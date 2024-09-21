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
import { Button } from "@yz13/mono/components/button"
import { GlobeIcon, PackageIcon, PanelTopIcon, SquareTerminalIcon } from "lucide-react"
import { cn } from "yz13/cn"

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
            <div className="w-full grid sm:!grid-cols-3 grid-cols-1 auto-rows-auto gap-3">
              <div
                className={cn(
                  "aspect-video relative group w-full h-full flex items-center justify-center rounded-xl border overflow-hidden",
                  "hover:border-foreground hover:bg-yz-neutral-100",
                  "cursor-pointer transition-colors *:transition-colors"
                )}
              >
                <span className="capitalize text-base text-secondary group-hover:text-foreground absolute top-2.5 left-2.5">{t("works.work.type.website")}</span>
                <PanelTopIcon
                  strokeWidth={0.25}
                  fill="hsl(var(--yz13-background)"
                  className="text-yz-neutral-200 w-full h-full aspect-square absolute -right-1/3 top-1/4 group-hover:text-foreground"
                />
              </div>
              <div
                className={cn(
                  "aspect-video relative group w-full h-full flex items-center justify-center rounded-xl border overflow-hidden",
                  "hover:border-foreground hover:bg-yz-neutral-100",
                  "cursor-pointer transition-colors *:transition-colors"
                )}
              >
                <span className="capitalize text-base text-secondary group-hover:text-foreground absolute top-2.5 left-2.5">{t("works.work.type.package")}</span>
                <PackageIcon
                  strokeWidth={0.25}
                  fill="hsl(var(--yz13-background)"
                  className="text-yz-neutral-200 w-full h-full aspect-square absolute -right-1/3 top-1/4 group-hover:text-foreground"
                />
              </div>
              <div
                className={cn(
                  "aspect-video relative group w-full h-full flex items-center justify-center rounded-xl border overflow-hidden",
                  "hover:border-foreground hover:bg-yz-neutral-100",
                  "cursor-pointer transition-colors *:transition-colors"
                )}
              >
                <span className="capitalize text-base text-secondary group-hover:text-foreground absolute top-2.5 left-2.5">{t("works.work.type.service")}</span>
                <GlobeIcon
                  strokeWidth={0.25}
                  fill="hsl(var(--yz13-background)"
                  className="text-yz-neutral-200 w-full h-full aspect-square absolute -right-1/3 top-1/4 group-hover:text-foreground"
                />
              </div>
            </div>
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
