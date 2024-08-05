import { Locales, getLocale } from "@/dictionaries/tools"
import { Suspense } from "react"
import { JournalSection, JournalSkeleton } from "../journal/journal"
import { Stack } from "../new-home/stack"

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
        <div className="w-full flex flex-col gap-2 p-3 max-w-lg mx-auto">
          <h1 className="text-4xl font-medium">Journal</h1>
        </div>
        <Stack>
          <Stack.Header>
            <h2 className="text-lg font-medium text-foreground">Upcoming</h2>
          </Stack.Header>
          <Stack.Content>
            <JournalSkeleton />
          </Stack.Content>
        </Stack>
        <div className="w-full space-y-6 max-w-lg p-3 mx-auto">
          <Suspense fallback={<JournalSkeleton />}>
            <JournalSection locale={lang} />
          </Suspense>
        </div>
      </main>
    </>
  )
}
export default page