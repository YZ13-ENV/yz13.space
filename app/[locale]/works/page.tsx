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
import { AbcReset } from "./abc/abc-reset"
import { KanbanSkeleton, WorksKanban } from "./works-kanban"

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const lang = getCurrentLocale()
  const page: Page = "works"
  const metadata = dynamicMetadata(lang, page)
  return metadata
}

type Props = {
  searchParams: {
    lang?: string
    lt?: string
    workId?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const t = await getI18n()
  const lang = getCurrentLocale()
  const lt = searchParams.lt
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
          <div className="flex items-center gap-2">
            <Suspense
              fallback={
                <Skeleton className="h-10 w-36" />
              }
            >
              <h1 className="text-4xl font-medium">{t("works.title")}</h1>
            </Suspense>
            {
              !!lt &&
              <AbcReset lt={lt} />
            }
          </div>
          <Suspense fallback={<KanbanSkeleton />}>
            <WorksKanban lang={lang} />
          </Suspense>
        </Content>
        {/* <Suspense fallback={<AbcWorkListSkeleton />}>
          <AbcWorksList lt={lt} />
        </Suspense> */}
      </Main>
      {/* <Abc defaultValue={lt} /> */}
    </>
  )
}
export default page
