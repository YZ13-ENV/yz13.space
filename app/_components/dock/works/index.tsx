import { getLocalizedTabs } from "@/app/home/library/localized-tabs"
import { Locales, getDict, getLocale } from "@/dictionaries/tools"
import { Button } from "@repo/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover"
import { PiBagSimpleDuotone } from "react-icons/pi"
import { SimpleTooltip } from "../../simple-tooltip"
import { Grid } from "./grid"
import { Wrapper } from "./wrapper"

type Props = {
  lang?: Locales
}
const Works = async ({ lang: provided_lang }: Props) => {
  const locale = getLocale()
  const lang = provided_lang ? provided_lang : locale
  const dockDict = await getDict<any>("dock", lang)
  const works = dockDict.works
  const name = works.name
  const tabs = await getLocalizedTabs(provided_lang)
  const serverTabs = tabs.map(tab => ({ ...tab, icon: tab.icon({ size: 14, className: "z-[1]" }) }))
  return (
    <Popover>
      <SimpleTooltip text={name} sideOffset={10}>
        <PopoverTrigger asChild>
          <Button size="icon" variant="ghost">
            <PiBagSimpleDuotone size={18} />
          </Button>
        </PopoverTrigger>
      </SimpleTooltip>
      <PopoverContent
        sideOffset={24}
        side="top"
        className="p-2 !border-0 lg:w-[50dvw] h-[50dvh] w-dvw  shadow-none"
      // h-[87.5dvh]
      >
        <Wrapper providedTabs={serverTabs}>
          <Grid />
        </Wrapper>
      </PopoverContent>
    </Popover>
  )
}
export { Works }
