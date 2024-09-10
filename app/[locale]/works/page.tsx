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
import { KanbanSkeleton, WorksKanban, WorksList } from "./works-kanban"

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
        <Content className="flex flex-col">
          <div className="flex items-center gap-2">
            <Suspense
              fallback={
                <Skeleton className="h-10 w-36" />
              }
            >
              <h1 className="text-4xl font-medium">{t("works.title")}</h1>
            </Suspense>
          </div>
          <WorksList lang={lang} />
          {/** 
 <Suspense fallback={<KanbanSkeleton />}>
            <WorksKanban lang={lang} />
          </Suspense>
 **/}
        </Content>
      </Main>
    </>
  )
}
export default page
