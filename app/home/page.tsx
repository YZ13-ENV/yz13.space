import { LocalizedTitle } from "@/components/changelog"
import { Dock } from "@/components/dock"
import { HonoIcon } from "@/components/pixel-stack/hono-icon"
import { JestIcon } from "@/components/pixel-stack/jest-icon"
import { MongoDBIcon } from "@/components/pixel-stack/mongodb-icon"
import { NextIcon } from "@/components/pixel-stack/next-icon"
import { NodeIcon } from "@/components/pixel-stack/node-icon"
import { ReactIcon } from "@/components/pixel-stack/react-icon"
import { ShadcnIcon } from "@/components/pixel-stack/shadcn-ui-icon"
import { SupabaseIcon } from "@/components/pixel-stack/supabase-icon"
import { TailwindIcon } from "@/components/pixel-stack/tailwind-icon"
import { TypeScriptIcon } from "@/components/pixel-stack/typescript-icon"
import { ViteIcon } from "@/components/pixel-stack/vite-icon"
import { ZodIcon } from "@/components/pixel-stack/zod"
import { Stack } from "@/components/stack"
import { Locales, getLocale } from "@/dictionaries/tools"
import { Page, dynamicMetadata } from "@/metadata"
import { Metadata } from "next"
import { Suspense } from "react"
import { BiUser } from "react-icons/bi"
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
        <Stack.Wrapper hovered>
          <Stack.Header>
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
        </Stack.Wrapper>
        <Stack.Wrapper hovered>
          <Stack.Content>
            <Suspense fallback={<></>}>
              <Status lang={lang} title={LocalizedTitle} />
            </Suspense>
          </Stack.Content>
        </Stack.Wrapper>
        <Stack.GroupStack>
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
        </Stack.GroupStack>
      </main>
    </>
  )
}
export default page
