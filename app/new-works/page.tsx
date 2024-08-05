import { Dock } from "@/components/dock"
import { getLocale, Locales } from "@/dictionaries/tools"
import { Suspense } from "react"
import { Abc } from "./abc"
import { AbcWorksList } from "./abc-works-list"

type Props = {
  searchParams: {
    lang?: string
    lt?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const searchParamLang = searchParams.lang
  const lt = searchParams.lt
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  return (
    <>
      <Suspense fallback={<></>}>
        <Dock lang={lang} />
      </Suspense>
      <main className="space-y-6 w-full pt-36 pl-4 pr-8 pb-12">
        <div className="w-full flex flex-col gap-2 p-3 max-w-lg mx-auto">
          <h1 className="text-4xl font-medium">Works</h1>
        </div>
        <AbcWorksList lt={lt} />
        {/* <Stack.Wrapper>
          <Stack.Header>A</Stack.Header>
          <Stack.Content>
            <button className="w-full flex rounded-lg hover:bg-yz-neutral-200 items-center gap-2 justify-start">
              <span className="size-10 inline-flex items-center justify-center">
                <PiUserDuotone size={18} />
              </span>
              <span className="inline-flex flex-col items-start">
                <span className="text-sm font-medium text-foreground">User</span>
                <span className="text-xs text-secondary">Notification</span>
              </span>
            </button>
          </Stack.Content>
        </Stack.Wrapper>
        <Stack.Wrapper>
          <Stack.Header>B</Stack.Header>
          <Stack.Content></Stack.Content>
        </Stack.Wrapper>
        <Stack.Wrapper>
          <Stack.Header>C</Stack.Header>
          <Stack.Content></Stack.Content>
        </Stack.Wrapper> */}
      </main>
      <Abc defaultValue={lt} />
    </>
  )
}
export default page
