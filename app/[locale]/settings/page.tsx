import { Aside } from "@/components/container/aside"
import { Checkbox } from "@yz13/mono/components/checkbox"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { LogoHeader } from "@/components/header/logo"
import { UserHeader } from "@/components/header/user"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { LanguageSettings } from "./language-settings"
import { Info, Properties, Wrapper } from "./settings"
import { cn } from "yz13/cn"


const page = async () => {
  const lang = getCurrentLocale()
  const t = await getI18n()
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
          <h1 className="text-4xl font-medium">{t("settings.title")}</h1>
          <div className="flex flex-col gap-6">
            <Wrapper>
              <Info>
                <span className="text-sm">{t("settings.property.theme.title")}</span>
              </Info>
              <Properties className="flex items-center p-2 overflow-x-auto gap-2">
                <div className="flex flex-col gap-2">
                  <div
                    className={cn(
                      "relative h-24 aspect-video border rounded-lg",
                      "flex flex-row",
                      "ring-2 ring-offset-2 ring-foreground"
                    )}
                  >
                    <Checkbox checked className="absolute left-1 bottom-1 bg-background" />
                    <div className="w-1/2 h-full pl-2 pt-2 bg-yz-neutral-100 rounded-l-lg">
                      <div className="w-full h-full rounded-tl-md border-l border-t bg-yz-neutral-50"></div>
                    </div>
                    <div className="w-1/2 h-full pr-2 pt-2 bg-yz-neutral-900 rounded-r-lg">
                      <div className="w-full h-full rounded-tr-md border-r border-t border-yz-neutral-800 bg-foreground"></div>
                    </div>
                  </div>
                  <span className="text-foreground text-xs">{t("settings.property.theme.variant.system")}</span>
                </div>
              </Properties>
            </Wrapper>
            <LanguageSettings lang={lang} />
          </div>
        </Content>
      </Main>
    </>
  )
}
export default page
