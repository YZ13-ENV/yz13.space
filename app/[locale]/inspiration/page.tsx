import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { InspirationGrid, InspirationGridSkeleton } from "./inspiration-grid"
import { Header } from "@/components/header/header"
import { Searchbar } from "./search-bar"
import { Suspense } from "react"


const page = async () => {
  const lang = getCurrentLocale()
  const t = await getI18n()
  return (
    <>
      <Header lang={lang} />
      <Main>
        <Aside>
          <NavList />
        </Aside>
        <Content className="space-y-4">
          <h1 className="text-4xl font-medium">{t("inspiration.title")}</h1>
          <div className="flex flex-col w-full gap-2">
            <Searchbar />
            <div className="flex items-center justify-between gap-2 px-2">
            </div>
          </div>
          <Suspense fallback={<InspirationGridSkeleton />}>
            <InspirationGrid lang={lang} />
          </Suspense>
        </Content>
      </Main>
    </>
  )
}
export default page
