import { Stack } from "@/app/new-home/stack"
import { DynamicImage } from "@/components/dynamic-image"
import { Locales, getLocale } from "@/dictionaries/tools"
import { BiUser } from "react-icons/bi"
import { LocalData } from "./local-data"


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
      <main className="space-y-6 w-full pt-36 px-6 pb-12">
        <LocalData lang={lang} />
        <Stack hovered>
          <Stack.Header expandable>
            <span className="size-7 group-hover:border-foreground transition-colors inline-flex items-center justify-center rounded-full border">
              <BiUser size={14} className="text-foreground" />
            </span>
            <h1 className="text-lg text-foreground">
              Hey, i'm a YZ13
            </h1>
          </Stack.Header>
          <Stack.Content>
            <p className="text-base text-foreground/60">
              Hi, I'm a fullstack developer. I like to create beautiful websites, in my free time I practice creating UI to improve the design of my work, I also try to learn more about backend development.
            </p>
          </Stack.Content>
        </Stack>
        <Stack hovered>
          <Stack.Header>
            <div className="size-7 shrink-0 relative">
              <DynamicImage
                image={{
                  dark: "https://yzstatic.yz13.space/logo/yz-dark.svg",
                  light: "https://yzstatic.yz13.space/logo/yz-light.svg"
                }}
                alt="logo"
              />
            </div>
            <h2 className="text-lg font-medium text-foreground">YZ13</h2>
          </Stack.Header>
          <Stack.Content>
            <p className="text-base text-foreground/60">
              Hey
            </p>
          </Stack.Content>
        </Stack>
        <Stack>
          <Stack.Header link="/works">
            <div className="size-7 shrink-0 relative">
              <DynamicImage
                image={{
                  dark: "https://yzstatic.yz13.space/logo/yz-dark.svg",
                  light: "https://yzstatic.yz13.space/logo/yz-light.svg"
                }}
                alt="logo"
              />
            </div>
            <h2 className="text-lg font-medium text-foreground">YZ13/Works</h2>
          </Stack.Header>
          {/* <Stack.Content className="mt-1">
            <button className="w-full h-10 group/work flex justify-between items-center gap-2">
              <span className="inline-flex items-center gap-2">
                <PiNewspaperDuotone size={18} className="transition-colors mx-1.5 text-foreground/60 group-hover/work:text-foreground" />
                <span className="transition-colors font-medium text-foreground/60 group-hover/work:text-foreground">News</span>
              </span>
              <BiRightArrowAlt size={18} className="group-hover/work:right-1.5 group-hover/work:opacity-100 right-3 relative transition-all opacity-0" />
            </button>
            <button className="w-full h-10 group/work flex justify-between items-center gap-2">
              <span className="inline-flex items-center gap-2">
                <PiStorefrontDuotone size={18} className="transition-colors mx-1.5 text-foreground/60 group-hover/work:text-foreground" />
                <span className="transition-colors font-medium text-foreground/60 group-hover/work:text-foreground">JSON Store</span>
              </span>
              <BiRightArrowAlt size={18} className="group-hover/work:right-1.5 group-hover/work:opacity-100 right-3 relative transition-all opacity-0" />
            </button>
          </Stack.Content> */}
        </Stack>
        <Stack>
          <Stack.Header link="/journal">
            <div className="size-7 shrink-0 relative">
              <DynamicImage
                image={{
                  dark: "https://yzstatic.yz13.space/logo/yz-dark.svg",
                  light: "https://yzstatic.yz13.space/logo/yz-light.svg"
                }}
                alt="logo"
              />
            </div>
            <h2 className="text-lg font-medium text-foreground">YZ13/Journal</h2>
          </Stack.Header>
          {/* <Stack.Content></Stack.Content> */}
        </Stack>
      </main>
    </>
  )
}
export default page


{/*
      <header className="w-full px-6 py-3 flex items-center justify-between min-h-12">
        <div className="h-12 w-28 shrink-0 relative">
          <DynamicImage
            image={{
              dark: "https://yzstatic.yz13.space/logo/yz-dark-full.svg",
              light: "https://yzstatic.yz13.space/logo/yz-light-full.svg"
            }}
            alt="logo"
          />
        </div>
        <User />
      </header>
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
          </Project.Content>
          <Project.SubContent>
          </Project.SubContent>
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
              <span className="text-foreground/60 font-medium">Socials</span>
              <ul>
                <li className="font-medium h-8">
                  <div className="inline-flex h-full gap-2 group items-center">
                    <PiGithubLogoDuotone size={16} className="transition-colors text-secondary group-hover:text-foreground" />
                    <span className="text-sm transition-colors text-secondary group-hover:text-foreground">Github</span>
                  </div>
                </li>
                <li className="font-medium h-8">
                  <div className="inline-flex h-full gap-2 group items-center">
                    <PiTelegramLogoDuotone size={16} className="transition-colors text-secondary group-hover:text-foreground" />
                    <span className="text-sm transition-colors text-secondary group-hover:text-foreground">Telegram</span>
                  </div>
                </li>
                <li className="font-medium h-8">
                  <div className="inline-flex h-full group gap-2 items-center">
                    <PiTwitterLogoDuotone size={16} className="transition-colors text-secondary group-hover:text-foreground" />
                    <span className="text-sm transition-colors text-secondary group-hover:text-foreground">Twitter(X)</span>
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
                <Button variant="secondary" disabled className="w-1/4">Top news</Button>
                <Button variant="secondary" disabled className="w-1/4">Politics</Button>
                <Button variant="secondary" disabled className="w-1/4">Sports</Button>
                <Button variant="secondary" disabled className="w-1/4">Finance</Button>
              </Project.ContentItem>
              <Project.ContentItem>
                <div className="w-full aspect-square flex flex-col items-center justify-center gap-2">
                  <span>Wait for data</span>
                </div>
              </Project.ContentItem>
            </Project.ContentItemGroup>
          </Project.Content>
          <Project.SubContent className="flex flex-col gap-2">
            <span className="text-foreground/60 font-medium">News service(IN DEV)</span>
            <span className="text-sm text-secondary">
              Sevice that provide access to the News
            </span>
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
                <span className="text-3xl font-medium">JSON Store</span>
              </Project.ContentItem>
            </Project.ContentItemGroup>
          </Project.Content>
          <Project.SubContent className="flex flex-col gap-2">
            <span className="text-foreground/60 font-medium">JSON Store</span>
            <span className="text-sm text-secondary">
              A web app that give ability to create and manage your JSON stores,
              up to 10 stores per user and 10kB per store.
            </span>
            <span className="text-foreground/60 font-medium">JSON Store (NPM-Package)</span>
            <span className="text-sm text-secondary">
              NPM-Package provide access to json through package, you can get entire store by getAll(), or specific field by get(key).
            </span>
          </Project.SubContent>
        </Project.Wrapper>
 */}