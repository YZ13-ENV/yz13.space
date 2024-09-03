import { Content } from "@/components/container/content"
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
import { Aside } from "../../../components/container/aside"
import { Main } from "../../../components/container/main"
import { JournalLastFive } from "../journal/journal-last-five"
import { UserActivity } from "./activity/activity-widget"
import { LocalData } from "./local-data"
import { TeamInfo } from "./team-info/team-info"

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
        <Content>
          <div className="md:!w-1/2 w-full gap-6 xl:!h-64 h-fit flex xl:!flex-row flex-col xl:!items-center items-start">
            <div className="xl:!w-1/3 w-full md:!h-full h-fit space-y-3 ">
              <LocalData className="w-full h-1/2" lang={lang} />
            </div>
            <div className="xl:!w-2/3 w-full md:!h-full h-fit ">
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
          </div>
          <div className="w-full flex lg:!flex-row flex-col">
            <div className="lg:!w-1/2 w-full lg:!h-full h-fit gap-6  flex flex-col">
              <Suspense fallback={<Skeleton className="rounded-xl w-full h-40" />}>
                <TeamInfo />
              </Suspense>
              <Separator />
              <Suspense fallback={<Skeleton className="rounded-xl w-full h-36" />}>
                <UserActivity uid="d5f98156-1776-42da-8f20-686d6a1ae2a8" lang={lang} />
              </Suspense>
              <Separator />
              {/* <About /> */}
            </div>
            <div className="lg:!w-1/2 w-full lg:!h-full h-fit gap-6  flex flex-col">
            </div>
          </div>
          <div className="lg:!w-1/2 w-full h-fit gap-3 flex flex-row">
            <section className="w-1/2 space-y-3">
              <h2 className="text-base font-medium text-foreground">Frontend</h2>
              <ul>
                <li>
                  <div className="h-9 flex items-center gap-2">
                    <ReactIcon size={18} />
                    <span>React</span>
                  </div>
                  <div className="h-9 flex items-center gap-2">
                    <NextIcon size={18} />
                    <span>NextJS</span>
                  </div>
                  <div className="h-9 flex items-center gap-2">
                    <ViteIcon size={18} />
                    <span>Vite</span>
                  </div>
                  <div className="h-9 flex items-center gap-2">
                    <TypeScriptIcon size={18} />
                    <span>Typescript</span>
                  </div>
                  <div className="h-9 flex items-center gap-2">
                    <TailwindIcon size={18} />
                    <span>TailwindCSS</span>
                  </div>
                  <div className="h-9 flex items-center gap-2">
                    <ShadcnIcon size={18} />
                    <span>Shadcn UI</span>
                  </div>
                </li>
              </ul>
            </section>
            <section className="w-1/2 space-y-3">
              <h2 className="text-base font-medium text-foreground">Backend</h2>
              <ul>
                <li>
                  <div className="h-9 flex items-center gap-2">
                    <NodeIcon size={18} />
                    <span>NodeJS</span>
                  </div>
                  <div className="h-9 flex items-center gap-2">
                    <HonoIcon size={18} />
                    <span>Hono</span>
                  </div>
                  <div className="h-9 flex items-center gap-2">
                    <SupabaseIcon size={18} />
                    <span>Supabase</span>
                  </div>
                  <div className="h-9 flex items-center gap-2">
                    <JestIcon size={18} />
                    <span>Jest</span>
                  </div>
                  <div className="h-9 flex items-center gap-2">
                    <MongoDBIcon size={18} />
                    <span>MongoDB</span>
                  </div>
                  <div className="h-9 flex items-center gap-2">
                    <ZodIcon size={18} />
                    <span>Zod</span>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </Content>
      </Main>
    </>
  )
}
export default page
