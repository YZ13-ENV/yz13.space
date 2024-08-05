import { getLocale, Locales } from "@/dictionaries/tools"
import { Button } from "@yz13/mono/components/button"
import { Stack } from "../new-home/stack"
import { PiUserDuotone } from "react-icons/pi"


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
          <h1 className="text-4xl font-medium">Works</h1>
        </div>
        <Stack>
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
        </Stack>
        <Stack>
          <Stack.Header>B</Stack.Header>
          <Stack.Content></Stack.Content>
        </Stack>
        <Stack>
          <Stack.Header>C</Stack.Header>
          <Stack.Content></Stack.Content>
        </Stack>

      </main>
      <aside className="w-8 h-screen fixed bottom-0 right-0 flex flex-col gap-1 items-center justify-center">
        <Button className="size-6 uppercase" variant="ghost" size="icon">#</Button>
        <Button className="size-6 uppercase" variant="ghost" size="icon">A</Button>
        <Button className="size-6 uppercase" variant="ghost" size="icon">B</Button>
        <Button className="size-6 uppercase" variant="ghost" size="icon">C</Button>
        <Button className="size-6 uppercase" variant="ghost" size="icon">D</Button>
        <Button className="size-6 uppercase" variant="ghost" size="icon">E</Button>
      </aside>
    </>
  )
}
export default page
