import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { Header } from "@/components/header/header"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { Searchbar } from "../search-bar"

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
        <Content>
          <div className="flex flex-col w-full gap-2">
            <Searchbar />
          </div>
          <div className="w-full aspect-video flex items-center justify-center">
            <span className="text-xs text-secondary">{t("inspiration.search.empty")}</span>
          </div>
        </Content>
      </Main>
    </>
  )
}
export default page
