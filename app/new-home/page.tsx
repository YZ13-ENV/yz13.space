import { Status } from "@/app/home/status"
import { LocalizedTitle } from "@/components/changelog"
import { DynamicImage } from "@/components/dynamic-image"
import { Locales, getLocale } from "@/dictionaries/tools"
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
      <header className="w-full px-3 my-3 flex items-center justify-between h-12">
        <div className="h-12 w-28 shrink-0 relative">
          <DynamicImage
            image={{
              dark: "https://yzstatic.yz13.space/logo/yz-dark-full.svg",
              light: "https://yzstatic.yz13.space/logo/yz-light-full.svg"
            }}
            alt="logo"
          />
        </div>
        <div className="size-12 rounded-full bg-yz-neutral-200" />
      </header>
      <main className="w-full">
        <div className="w-2/3 h-fit flex ml-auto">
          <div className="w-full max-w-lg h-full shrink-0 space-y-6">
            <div className="pt-12 flex flex-col gap-4">
              <section className="flex flex-col gap-2">
                <h1 className="text-base font-medium text-foreground">Fullstack developer</h1>
                <p className="text-base font-medium text-foreground/60">
                  Hi, I'm a fullstack developer. I like to create beautiful websites, in my free time I practice creating UI to improve the design of my work, I also try to learn more about backend development.
                </p>
              </section>
            </div>
            <div className="w-full h-full">
            </div>
          </div>
        </div>
        <div className="w-2/3 h-fit flex gap-4 ml-auto">
          <div className="w-full max-w-lg h-full shrink-0 space-y-6">
            <div className="w-full h-fit p-3 space-y-3 rounded-xl bg-yz-neutral-200">
              <div className="w-full rounded-t-xl p-3 rounded-b-lg bg-background h-fit">
                <div className="h-12 w-28 shrink-0 relative">
                  <DynamicImage
                    image={{
                      dark: "https://yzstatic.yz13.space/logo/yz-dark-full.svg",
                      light: "https://yzstatic.yz13.space/logo/yz-light-full.svg"
                    }}
                    alt="logo"
                  />
                </div>
              </div>
              <div className="w-full rounded-lg bg-background p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex w-full justify-end">
                    <span>Frontend</span>
                  </div>
                  <Switch className="shrink-0" />
                  <div className="flex w-full justify-start">
                    <span>Backend</span>
                  </div>
                </div>
              </div>
              <div className="w-full rounded-lg bg-background p-3">
                <div className="w-full grid grid-cols-3 grid-rows-2">
                  <div className="w-full h-36 border-b border-r"></div>
                  <div className="w-full h-36 border-b border-r"></div>
                  <div className="w-full h-36 border-b"></div>

                  <div className="w-full h-36 border-r"></div>
                  <div className="w-full h-36 border-r"></div>
                  <div className="w-full h-36"></div>
                </div>
              </div>
              <div className="w-full rounded-b-xl rounded-t-lg bg-background h-fit p-3">
                <Suspense fallback={<></>}>
                  <Status lang={lang} title={LocalizedTitle} />
                </Suspense>
              </div>
            </div>
          </div>
          <div className="w-full h-full">
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
          </div>
        </div>
      </main >
    </>
  )
}
export default page