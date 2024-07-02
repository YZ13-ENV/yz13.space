import { getDict, getLocale } from "@/dictionaries/tools"
import Link from "next/link"
import { CatchPhrase } from "../_components/illustration/catch-phrase"
import { Logo } from "../_components/illustration/logo"
import { Position } from "../_components/illustration/position"
import { Username } from "../_components/illustration/username"
import { YLetter } from "../_components/illustration/y-letter"
import { LeftSide } from "../_components/left"
import { RightSide } from "../_components/right"
import { SplitViewContainer } from "../_components/split-view-container"
import { nav_links } from "../_conts/nav-links"

const page = async () => {
  const locale = getLocale()
  const navDict = await getDict("nav", locale) as { labels: { label: string, link: string }[] }
  const local_nav_links = nav_links.map(nav => {
    const target = navDict.labels.find(item => item.link === nav.link)
    if (target) {
      return {
        ...nav,
        label: target.label
      }
    } else return nav
  })
  return (
    <SplitViewContainer>
      <LeftSide className="h-dvh">
        <div id="illustration" className="w-full h-full p-6">
          <div className="w-full h-full rounded-[3.75rem] border-foreground border-2 border-dashed aspect-square shrink-0">
            <Logo id="illustration-logo" className="w-full h-full" />
          </div>
          <div className="w-full h-full rounded-[3.75rem] border-foreground border-2">
            <Username id="username" className="w-full h-full" />
          </div>
          <div className="w-full h-full rounded-[3.75rem] border-foreground border-2">
            <Position id="position" className="w-full h-full" />
          </div>
          <div className="w-full h-full rounded-[3.75rem] border-foreground border-2 border-dashed aspect-square shrink-0">
            <YLetter id="y-letter" className="w-full h-full" />
          </div>
          <div className="w-full h-full rounded-[3.75rem] border-foreground border-2">
            <CatchPhrase id="catch-phrase" className="w-full h-full" />
          </div>
        </div>
      </LeftSide>
      <RightSide className="p-6 flex flex-col">
        {
          local_nav_links.map(
            item =>
              <Link
                key={item.link}
                href={item.link}
                className="w-full hover:text-foreground text-secondary xl:text-9xl text-8xl font-bold transition-colors"
              >
                {item.label}
              </Link>
          )
        }
      </RightSide>
    </SplitViewContainer>
  )
}
export default page

/*
      <RightSide className="divide-y">
        <Header />
        <AdBanner />
        <div className="w-full p-6 space-y-3">
          <p className="text-2xl font-semibold">
            Привет, я YZ13 занимаюсь веб разработкой, очень люблю свое дело, если стало интересно - посмотрите мои работы
          </p>
          <p className="text-2xl font-semibold">
            Мне нравится использовать темы в стиле ч/б.
          </p>
        </div>
        <div className="w-full flex flex-col gap-3 p-6">
          <p className="inline-flex flex-col text-2xl font-semibold text-secondary">
            <b className="text-foreground shrink-0">{readyBanner.title}</b>
            {readyBanner.description}
          </p>
          <Button className="w-fit" asChild>
            <Link href="/contact">
              {readyBanner.action}
            </Link>
          </Button>
        </div>
        <footer
          className="w-full p-6 mx-auto h-fit"
          dangerouslySetInnerHTML={{ __html: homeDict.footer }}
        >
        </footer>
      </RightSide>
 */