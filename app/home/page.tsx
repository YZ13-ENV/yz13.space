import { LocalizedTitle } from "@/components/changelog"
import { Dock } from "@/components/dock"
import { Stack } from "@/components/stack"
import { Locales, getLocale } from "@/dictionaries/tools"
import { Page, dynamicMetadata } from "@/metadata"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { Metadata } from "next"
import { Suspense } from "react"
import { About } from "./about"
import { BGOverlay } from "./bg-overlay"
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
      <BGOverlay />
      <Suspense fallback={<></>}>
        <Dock lang={lang} />
      </Suspense>
      <main className="space-y-6 w-full pt-36 px-6 pb-12">
        <LocalData lang={lang} />
        <Suspense fallback={<Skeleton className="max-w-lg mx-auto w-full h-28 rounded-xl " />}>
          <About lang={lang} />
        </Suspense>
        <Stack.Wrapper hovered>
          <Stack.Content>
            <Suspense fallback={<Skeleton className="max-w-lg mx-auto w-full h-28 rounded-xl" />}>
              <Status lang={lang} title={LocalizedTitle} />
            </Suspense>
          </Stack.Content>
        </Stack.Wrapper>
        {/* <Stack.GroupStack stackName="Technologies">
          <Stack.Wrapper>
            <Stack.Header>
              <h2 className="text-lg font-medium text-foreground">Frontend</h2>
            </Stack.Header>
            <Stack.Content>
              <div className="w-full grid grid-cols-3 grid-rows-2 z-0">
                <div className="w-full border-r border-b aspect-square flex items-center justify-center">
                  <NextIcon size={64} className="z-0" />
                </div>
                <div className="w-full border-r border-b aspect-square flex items-center justify-center">
                  <ReactIcon size={64} className="z-0" />
                </div>
                <div className="w-full border-b aspect-square flex items-center justify-center">
                  <ViteIcon size={64} className="z-0" />
                </div>
                <div className="w-full border-r aspect-square flex items-center justify-center">
                  <TypeScriptIcon size={64} className="z-0" />
                </div>
                <div className="w-full border-r aspect-square flex items-center justify-center">
                  <TailwindIcon size={64} className="z-0" />
                </div>
                <div className="w-full aspect-square flex items-center justify-center">
                  <ShadcnIcon size={64} className="z-0" />
                </div>
              </div>
            </Stack.Content>
          </Stack.Wrapper>
          <Stack.Wrapper>
            <Stack.Header>
              <h2 className="text-lg font-medium text-foreground">Backend</h2>
            </Stack.Header>
            <Stack.Content>
              <div className="w-full grid grid-cols-3 grid-rows-2">
                <div className="w-full border-r border-b aspect-square flex items-center justify-center">
                  <NodeIcon size={64} className="z-0" />
                </div>
                <div className="w-full border-r border-b aspect-square flex items-center justify-center">
                  <HonoIcon size={64} className="z-0" />
                </div>
                <div className="w-full border-b aspect-square flex items-center justify-center">
                  <SupabaseIcon size={64} className="z-0" />
                </div>
                <div className="w-full border-r aspect-square flex items-center justify-center">
                  <JestIcon size={64} className="z-0" />
                </div>
                <div className="w-full border-r aspect-square flex items-center justify-center">
                  <MongoDBIcon size={64} className="z-0" />
                </div>
                <div className="w-full aspect-square flex items-center justify-center">
                  <ZodIcon size={64} className="z-0" />
                </div>
              </div>
            </Stack.Content>
          </Stack.Wrapper>
        </Stack.GroupStack> */}
      </main>
    </>
  )
}
export default page
