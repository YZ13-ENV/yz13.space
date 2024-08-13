import { LocalizedTitle } from "@/components/changelog"
import Dock from "@/components/dock"
import { Stack } from "@/components/stack"
import { Locales, getLocale } from "@/dictionaries/tools"
import { Page, dynamicMetadata } from "@/metadata"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { Metadata } from "next"
import { Suspense } from "react"
import { About } from "./about"
import { Activity } from "./activity"
import { LocalData } from "./local-data"
import { Status } from "./status"

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const page: Page = "home"
  const metadata = dynamicMetadata(lang, page)
  return metadata
}

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
      <Suspense fallback={<></>}>
        <Dock lang={lang} />
      </Suspense>
      <main className="space-y-6 w-full pt-36 px-6 pb-24">
        <LocalData lang={lang} />
        <Stack.Wrapper>
          <Stack.Content>
            <Suspense fallback={<Skeleton className="max-w-lg mx-auto w-full h-28 rounded-xl" />}>
              <Status lang={lang} title={LocalizedTitle} />
            </Suspense>
          </Stack.Content>
          <Stack.Expandable>1</Stack.Expandable>
        </Stack.Wrapper>
        <Suspense fallback={<Skeleton className="max-w-lg mx-auto w-full h-28 rounded-xl " />}>
          <About lang={lang} />
        </Suspense>
        <Activity />
        <Stack.Wrapper>
          <Stack.Content className="flex h-fit items-start gap-4">
            <div className="w-2/3 h-full flex flex-col">
              <p className="text-foreground/60">
                I am very passionate about my work,
                in the future i want create my own development team and build beautiful websites.
              </p>
              <p className="text-foreground/60">
                For now i work alone, every day trying to upgrade my skills, make my designs more perfect.
              </p>
            </div>
            <div className="w-1/3 flex h-full flex-col gap-3">
              <div className="h-9 w-full -space-x-3">
                <div className="size-9 inline-block rounded-full border bg-yz-neutral-100" />
                <div className="size-9 inline-block rounded-full border bg-yz-neutral-100" />
                <div className="size-9 inline-block rounded-full border bg-yz-neutral-100" />
                <div className="size-9 inline-block rounded-full border bg-yz-neutral-100" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-foreground">+2 years</span>
                <span className="text-xs text-secondary">Experience</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-foreground">+10</span>
                <span className="text-xs text-secondary">Completed Projects</span>
              </div>
            </div>
          </Stack.Content>
        </Stack.Wrapper>
        <Stack.Wrapper>
          WHAT I OFFER
        </Stack.Wrapper>
        <Stack.Wrapper>
          FAQ
        </Stack.Wrapper>
      </main>
      {/* experimental */}
      {/* <div className="w-full max-w-7xl flex items-center relative justify-center mx-auto aspect-video">

        <div className="flex flex-col gap-6 items-center justify-center">
          <h2 className="text-center text-4xl font-medium">
            Not convinced yet?
          </h2>
          <div className="flex items-center gap-2 justify-center">
            <Button className="gap-2" variant="secondary">
              <LuPhone size={16} />
              Book a call
            </Button>
            <Button className="gap-2" variant="default">
              <LuMail size={16} />
              Contact me
            </Button>
          </div>
        </div>

      </div> */}
    </>
  )
}
export default page
