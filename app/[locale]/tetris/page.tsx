import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { Header } from "@/components/header/header"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale } from "@/locales/server"

const page = async () => {
  const lang = getCurrentLocale()
  return (
    <>
      <Header lang={lang} />
      <Main>
        <Aside>
          <NavList />
        </Aside>
        <Content>
          <div className="w-full h-[85dvh] border">
            <span className="text-sm">tetris</span>
          </div>
        </Content>
      </Main>
    </>
  )
}
export default page
