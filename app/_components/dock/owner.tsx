import { YZ13Info, YZ13InfoSkeleton } from "@/app/(threads)/_components/yz13-info"
import { Locales, getDict, getLocale } from "@/dictionaries/tools"
import { Button } from "@/packages/ui/src/components/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/packages/ui/src/components/popover"
import { Suspense } from "react"
import { PiBracketsCurlyDuotone } from "react-icons/pi"
import { SimpleTooltip } from "../simple-tooltip"

const Owner = async ({ lang: provided_lang }: { lang?: Locales }) => {
  const locale = getLocale()
  const lang = provided_lang ? provided_lang : locale
  const dockDict = await getDict<any>("dock", lang)
  const owner = dockDict.owner
  const ownerName = owner.name
  return (
    <Popover>
      <SimpleTooltip text={ownerName} sideOffset={10}>
        <PopoverTrigger asChild>
          <Button size="icon" variant="ghost">
            <PiBracketsCurlyDuotone size={18} />
          </Button>
        </PopoverTrigger>
      </SimpleTooltip>
      <PopoverContent
        sideOffset={24}
        side="top"
        className="border lg:w-96 w-screen p-6 bg-yz-neutral-100 rounded-xl shadow-none"
      >
        <Suspense fallback={<YZ13InfoSkeleton />}>
          <YZ13Info />
        </Suspense>
      </PopoverContent>
    </Popover>
  )
}
export { Owner }
