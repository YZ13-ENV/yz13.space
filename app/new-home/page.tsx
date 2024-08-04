import { Status } from "@/app/home/status"
import { Project } from "@/app/new-home/project"
import { LocalizedTitle } from "@/components/changelog"
import { DynamicImage } from "@/components/dynamic-image"
import { Locales, getLocale } from "@/dictionaries/tools"
import { Button } from "@yz13/mono/components/button"
import { Switch } from "@yz13/mono/components/switch"
import { Suspense } from "react"
import { PiGithubLogoDuotone, PiTelegramLogoDuotone, PiTwitterLogoDuotone } from "react-icons/pi"

type Props = {
  searchParams: {
    lang?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  return (
    <>
      <header className="w-full sticky top-0 px-3 md:bg-transparent z-10 md:backdrop-blur-0 backdrop-blur bg-background/20 py-3 flex items-center justify-between min-h-12">
        <div className="h-12 w-28 shrink-0 relative">
          <DynamicImage
            image={{
              dark: "https://yzstatic.yz13.space/logo/yz-dark-full.svg",
              light: "https://yzstatic.yz13.space/logo/yz-light-full.svg"
            }}
            alt="logo"
          />
        </div>
        <div className="size-10 rounded-full bg-yz-neutral-200" />
      </header>
      <main className="w-full py-6 space-y-6">
        <Project.Wrapper>
          <Project.Content>
            <div className="pt-12 flex flex-col gap-4">
              <section className="flex flex-col gap-2">
                <h1 className="text-base font-medium text-foreground">Fullstack developer</h1>
                <p className="text-base font-medium text-foreground/60">
                  Hi, I'm a fullstack developer. I like to create beautiful websites, in my free time I practice creating UI to improve the design of my work, I also try to learn more about backend development.
                </p>
              </section>
            </div>
            <Project.SubContent>
            </Project.SubContent>
          </Project.Content>
        </Project.Wrapper>
        <Project.Wrapper>
          <Project.Content>
            <Project.ContentItemGroup>
              <Project.ContentItem>
                <div className="h-12 w-28 shrink-0 relative">
                  <DynamicImage
                    image={{
                      dark: "https://yzstatic.yz13.space/logo/yz-dark-full.svg",
                      light: "https://yzstatic.yz13.space/logo/yz-light-full.svg"
                    }}
                    alt="logo"
                  />
                </div>
              </Project.ContentItem>
              <Project.ContentItem>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex w-full justify-end">
                    <span>Frontend</span>
                  </div>
                  <Switch className="shrink-0" />
                  <div className="flex w-full justify-start">
                    <span>Backend</span>
                  </div>
                </div>
              </Project.ContentItem>
              <Project.ContentItem>
                <div className="w-full grid grid-cols-3 grid-rows-2">
                  <div className="w-full h-36 border-b border-r"></div>
                  <div className="w-full h-36 border-b border-r"></div>
                  <div className="w-full h-36 border-b"></div>

                  <div className="w-full h-36 border-r"></div>
                  <div className="w-full h-36 border-r"></div>
                  <div className="w-full h-36"></div>
                </div>
              </Project.ContentItem>
              <Project.ContentItem>
                <Suspense fallback={<></>}>
                  <Status lang={lang} title={LocalizedTitle} />
                </Suspense>
              </Project.ContentItem>
            </Project.ContentItemGroup>
          </Project.Content>
          <Project.SubContent>
            <div className="flex flex-col gap-2">
              <span>Socials</span>
              <ul>
                <li className="font-medium">
                  <div className="inline-flex gap-2 group items-center">
                    <PiGithubLogoDuotone size={16} className="transition-colors text-secondary group-hover:text-foreground" />
                    <span className="transition-colors text-secondary group-hover:text-foreground">Github</span>
                  </div>
                </li>
                <li className="font-medium">
                  <div className="inline-flex gap-2 group items-center">
                    <PiTelegramLogoDuotone size={16} className="transition-colors text-secondary group-hover:text-foreground" />
                    <span className="transition-colors text-secondary group-hover:text-foreground">Telegram</span>
                  </div>
                </li>
                <li className="font-medium">
                  <div className="inline-flex group gap-2 items-center">
                    <PiTwitterLogoDuotone size={16} className="transition-colors text-secondary group-hover:text-foreground" />
                    <span className="transition-colors text-secondary group-hover:text-foreground">Twitter(X)</span>
                  </div>
                </li>
              </ul>
            </div>
          </Project.SubContent>
        </Project.Wrapper>
        <Project.Wrapper>
          <Project.Content>
            <Project.ContentItemGroup>
              <Project.ContentItem className="flex items-center gap-2">
                <div className="size-10 shrink-0 relative">
                  <DynamicImage
                    image={{
                      dark: "https://yzstatic.yz13.space/logo/yz-dark.svg",
                      light: "https://yzstatic.yz13.space/logo/yz-light.svg"
                    }}
                    alt="logo"
                  />
                </div>
                <span className="text-3xl text-foreground/20">/</span>
                <span className="text-3xl font-medium">News</span>
              </Project.ContentItem>
              <Project.ContentItem className="gap-3 flex items-center">
                <Button variant="secondary" className="w-1/4">Top news</Button>
                <Button variant="secondary" className="w-1/4">Politics</Button>
                <Button variant="secondary" className="w-1/4">Sports</Button>
                <Button variant="secondary" className="w-1/4">Finance</Button>
              </Project.ContentItem>
              <Project.ContentItem></Project.ContentItem>
            </Project.ContentItemGroup>
          </Project.Content>
          <Project.SubContent></Project.SubContent>
        </Project.Wrapper>
        <Project.Wrapper>
          <Project.Content>
            <Project.ContentItemGroup>
              <Project.ContentItem className="flex items-center gap-2">
                <div className="size-10 shrink-0 relative">
                  <DynamicImage
                    image={{
                      dark: "https://yzstatic.yz13.space/logo/yz-dark.svg",
                      light: "https://yzstatic.yz13.space/logo/yz-light.svg"
                    }}
                    alt="logo"
                  />
                </div>
                <span className="text-3xl text-foreground/20">/</span>
                <span className="text-3xl font-medium">JSON Store</span>
              </Project.ContentItem>
              <Project.ContentItem className="gap-3 flex items-center">

              </Project.ContentItem>
              <Project.ContentItem></Project.ContentItem>
            </Project.ContentItemGroup>
          </Project.Content>
          <Project.SubContent></Project.SubContent>
        </Project.Wrapper>
      </main >
    </>
  )
}
export default page