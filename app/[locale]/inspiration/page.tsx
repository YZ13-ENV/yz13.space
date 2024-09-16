import { inspiration } from "@/actions/inspiration"
import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { LogoHeader } from "@/components/header/logo"
import { UserHeader } from "@/components/header/user"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale, getI18n } from "@/locales/server"
import Link from "next/link"


const page = async () => {
  const lang = getCurrentLocale()
  const t = await getI18n()
  const list = await inspiration(lang)
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
        <Content className="space-y-4">
          <h1 className="text-4xl font-medium">{t("inspiration.title")}</h1>
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

        </Content>
      </Main>
    </>
  )
}
export default page
