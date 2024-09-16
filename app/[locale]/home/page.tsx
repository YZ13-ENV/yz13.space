import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { LogoHeader } from "@/components/header/logo"
import { UserHeader } from "@/components/header/user"
import { NavList } from "@/components/nav/list"
import { HonoIcon } from "@/components/pixel-stack/hono-icon"
import { JestIcon } from "@/components/pixel-stack/jest-icon"
import { MongoDBIcon } from "@/components/pixel-stack/mongodb-icon"
import { NextIcon } from "@/components/pixel-stack/next-icon"
import { NodeIcon } from "@/components/pixel-stack/node-icon"
import { ReactIcon } from "@/components/pixel-stack/react-icon"
import { ShadcnIcon } from "@/components/pixel-stack/shadcn-ui-icon"
import { SupabaseIcon } from "@/components/pixel-stack/supabase-icon"
import { TailwindIcon } from "@/components/pixel-stack/tailwind-icon"
import { TypeScriptIcon } from "@/components/pixel-stack/typescript-icon"
import { ViteIcon } from "@/components/pixel-stack/vite-icon"
import { ZodIcon } from "@/components/pixel-stack/zod"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { Page, dynamicMetadata } from "@/metadata"
import { Separator } from "@yz13/mono/components/separator"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { JournalLastFive } from "../journal/journal-last-five"
import { UserActivity } from "./activity/activity-widget"
import { LocalData } from "./local-data"
import { TeamInfo } from "./team-info/team-info"
import { Input } from "@yz13/mono/components/input"
import { SearchIcon } from "lucide-react"
import { Button } from "@yz13/mono/components/button"

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
      <header className="flex h-12 lg:!px-6 px-3 max-w-7xl mx-auto w-full justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 flex justify-center items-center">
            <LogoHeader className="size-7" />
          </div>
          <span className="text-xl text-foreground font-pixel">YZ13</span>
        </div>
        <div className="flex items-center h-9">
          <UserHeader size={28} lang={lang} />
        </div>
      </header>
      <Main>
        <Aside>
          <NavList />
        </Aside>
        <Content>
          <div className="flex flex-col w-full gap-2">
            <div className="relative w-full h-10">
              <div className="size-10 flex items-center absolute left-0 justify-center">
                <SearchIcon size={16} className="text-secondary" />
              </div>
              <Input placeholder="Search for inspiration..." className="h-10 rounded-xl text-base !pl-10" />
              {/*
<div className="p-1 absolute right-0 h-full top-0">
                <Button variant="secondary" className="h-full">Search</Button>
              </div>
              */}
            </div>
            <div className="flex items-center gap-2 px-2">
              <LocalData lang={lang} />
            </div>
          </div>
          <div className="w-full gap-6 xl:!h-64 h-fit flex xl:!flex-row flex-col xl:!items-center items-start">
            <div className="xl:!w-1/2 w-full md:!h-full h-fit space-y-3">
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
            <div className="xl:!w-1/2 w-full md:!h-full h-fit space-y-3">
              <div className="flex items-center h-9 gap-2">
                <Link
                  href="/journal"
                  className="text-lg font-medium text-secondary hover:text-foreground transition-colors"
                >
                  {t("team.title")}
                </Link>
              </div>
              <div className="w-full h-24 rounded-lg bg-yz-neutral-200"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center h-9 gap-2">
              <Link
                href="/journal"
                className="text-lg font-medium text-secondary hover:text-foreground transition-colors"
              >
                Inspiration
              </Link>
            </div>
            <div className="w-full grid gap-4 grid-cols-3 auto-rows-auto">

              <div className="flex flex-col gap-1 relative">
                <Link href="/inspiration/???" className="absolute left-0 top-0 w-full h-full" />
                <div className="w-full rounded-lg border aspect-video"></div>
                <div className="flex items-start gap-2">
                  <div className="size-6 rounded-md mt-1 border" />
                  <div className="flex flex-col">
                    <span className="text-sm text-foreground">Site name</span>
                    <span className="text-xs text-secondary">Site description</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 relative">
                <Link href="/inspiration/???" className="absolute left-0 top-0 w-full h-full" />
                <div className="w-full rounded-lg border aspect-video"></div>
                <div className="flex items-start gap-2">
                  <div className="size-6 rounded-md mt-1 border" />
                  <div className="flex flex-col">
                    <span className="text-sm text-foreground">Site name</span>
                    <span className="text-xs text-secondary">Site description</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 relative">
                <Link href="/inspiration/???" className="absolute left-0 top-0 w-full h-full" />
                <div className="w-full rounded-lg border aspect-video"></div>
                <div className="flex items-start gap-2">
                  <div className="size-6 rounded-md mt-1 border" />
                  <div className="flex flex-col">
                    <span className="text-sm text-foreground">Site name</span>
                    <span className="text-xs text-secondary">Site description</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Content>
      </Main>
    </>
  )
}
export default page
