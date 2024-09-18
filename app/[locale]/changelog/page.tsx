import { logs } from "@/changelog/log-list"
import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { Header } from "@/components/header/header"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { dynamicMetadata, Page } from "@/metadata"
import { Separator } from "@yz13/mono/components/separator"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const lang = getCurrentLocale()
  const page: Page = "changelog"
  const metadata = dynamicMetadata(lang, page)
  return metadata
}

const page = async () => {
  const lang = getCurrentLocale()
  const t = await getI18n()
  const logsForCurrentLang = logs.filter(log => log.lang.includes(lang))
  return (
    <>
      <Header lang={lang} />
      <Main>
        <Aside>
          <NavList />
        </Aside>
        <Content className="space-y-4">
          <h1 className="text-4xl font-medium">{t("changelog.title")}</h1>
          <div className="w-full h-fit flex flex-col gap-4 relative">
            <div className="w-4 flex justify-center h-full absolute left-0 top-0">
              <Separator orientation="vertical" />
            </div>
            {
              logsForCurrentLang
                .map(
                  log => {
                    return (
                      <section key={log.version} className="w-full h-fit flex flex-col group/log gap-2">
                        <div className="flex items-center">
                          <div className="w-4 flex z-10 justify-center items-center">
                            <div className="size-[7px] rounded-full bg-yz-neutral-400 transition-colors border border-background group-hover/log:bg-foreground" />
                          </div>
                          <div className="w-2 mr-1.5 ml-0.5 flex items-center">
                            <Separator className="group-hover/log:bg-foreground transition-colors" />
                          </div>
                          <span className="text-sm text-secondary transition-colors group-hover/log:text-foreground">{log.version}</span>
                        </div>
                        <div className="flex flex-col pl-9">
                          <h2 className="text-base font-medium">{log.title}</h2>
                          <p className="text-sm text-secondary">{log.description}</p>
                        </div>
                        {
                          log.list &&
                          <div className="flex flex-col pl-4">
                            <ul className="list list-ul">
                              {
                                log.list.map(
                                  (item, index) => <li
                                    key={`${log.version}/${index}`}
                                    className="text-sm"
                                  >
                                    {item}
                                  </li>
                                )
                              }
                            </ul>
                          </div>
                        }
                      </section>
                    )
                  }
                )
            }
          </div>
        </Content>
      </Main>
    </>
  )
}
export default page
