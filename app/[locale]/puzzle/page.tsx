import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { Header } from "@/components/header/header"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale } from "@/locales/server"
import { Input } from "@yz13/mono/components/input"


const page = () => {
  const lang = getCurrentLocale()
  return (
    <>
      <Header lang={lang} />
      <Main>
        <Aside>
          <NavList />
        </Aside>
        <Content className="space-y-4">
          <div className="w-full h-56 rounded-xl border flex items-center justify-center">
            <h1>Pzzl</h1>
          </div>

          <Input placeholder="Paste url to image..." />
        </Content>
      </Main>
    </>
  )
}
export default page
