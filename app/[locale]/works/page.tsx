import { LogoHeader } from "@/components/header/logo"
import { MiniNav } from "@/components/header/mini-nav"
import { UserMini } from "@/components/header/user-mini"
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
      <header className="flex px-6 mt-6 justify-between items-start">
        <div className="flex md:!items-center items-start md:!flex-row flex-col gap-3 md:!gap-6">
          <div className="flex items-center gap-2">
            <LogoHeader className="size-9" />
            <span className="text-2xl font-pixel">YZ13</span>
          </div>
          <MiniNav />
        </div>
        <div className="flex items-center h-9">
          <UserMini />
        </div>
      </header>
      <main className="space-y-6 w-full min-h-screen pt-36 pl-6 pr-10 pb-12">
        <div className="w-full flex flex-col gap-2 p-3 max-w-7xl mx-auto">
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
        </div>
        <Suspense fallback={<KanbanSkeleton />}>
          <WorksKanban lang={lang} />
        </Suspense>
        {/* <Suspense fallback={<AbcWorkListSkeleton />}>
          <AbcWorksList lt={lt} />
        </Suspense> */}
      </main>
      {/* <Abc defaultValue={lt} /> */}
    </>
  )
}
export default page
