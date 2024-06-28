import { getDict, getLocale } from "@/dictionaries/tools"
import { Button } from "@/packages/ui/src/components/button"
import Link from "next/link"
import { AdBanner } from "../(threads)/(routes)/ad-banner"
import { Header } from "../_components/header"
import { LeftSide } from "../_components/left"
import { RightSide } from "../_components/right"
import { SplitViewContainer } from "../_components/split-view-container"

const page = async () => {
  const locale = getLocale()
  const homeDict = await getDict<any>("home", locale)
  const readyBanner = homeDict["ready-banner"]
  const hero = homeDict.hero
  return (
    <SplitViewContainer>
      <LeftSide>
        <div className="relative w-full h-full min-h-[50dvh] p-6 max-w-5xl mx-auto gap-2 flex flex-col items-center justify-center">
          <h1 className="text-5xl text-center font-bold">{hero.title}</h1>
          <p className="text-xl text-center text-secondary">{hero.description}</p>
        </div>
      </LeftSide>
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
    </SplitViewContainer>
  )
}
export default page