import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { LogoHeader } from "@/components/header/logo"
import { UserHeader } from "@/components/header/user"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale } from "@/locales/server"

const page = () => {
  const lang = getCurrentLocale()
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
        <Content className="space-y-6">
          <h1 className="text-4xl font-medium">Contacts</h1>
          <div className="w-full grid lg:!grid-cols-3 md:!grid-cols-2 grid-cols-1 gap-4 auto-rows-auto">
            <div className="w-full h-fit rounded-xl border p-2 flex items-center gap-2 bg-yz-neutral-50 transition-colors group hover:border-foreground">
              <div className="size-9 rounded-md border group-hover:border-foreground transition-colors"></div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Example</span>
                <span className="text-xs text-secondary">https://expample.com</span>
              </div>
            </div>
            <div className="w-full h-fit rounded-xl border p-2 flex items-center gap-2 bg-yz-neutral-50 transition-colors group hover:border-foreground">
              <div className="size-9 rounded-md border group-hover:border-foreground transition-colors"></div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Example</span>
                <span className="text-xs text-secondary">https://expample.com</span>
              </div>
            </div>
            <div className="w-full h-fit rounded-xl border p-2 flex items-center gap-2 bg-yz-neutral-50 transition-colors group hover:border-foreground">
              <div className="size-9 rounded-md border group-hover:border-foreground transition-colors"></div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Example</span>
                <span className="text-xs text-secondary">https://expample.com</span>
              </div>
            </div>
          </div>
        </Content>
      </Main>
    </>
  )
}
export default page
