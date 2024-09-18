import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { dynamicMetadata, Page } from "@/metadata"
import { Checkbox } from "@yz13/mono/components/checkbox"
import { Metadata } from "next"
import { cn } from "yz13/cn"
import { LanguageSettings } from "./language-settings"
import { Info, Properties, Wrapper } from "./settings"
import { Header } from "@/components/header/header"

export async function generateMetadata(): Promise<Metadata> {
  const lang = getCurrentLocale()
  const page: Page = "settings"
  const metadata = dynamicMetadata(lang, page)
  return metadata
}

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
