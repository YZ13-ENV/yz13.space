import { Button } from "@repo/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover"
import { PiBagSimpleDuotone } from "react-icons/pi"
import { SimpleTooltip } from "../../simple-tooltip"
import { Grid } from "./grid"
import { Wrapper } from "./wrapper"


const Works = () => {
  return (
    <Popover>
      <SimpleTooltip text="Работы" sideOffset={10}>
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
        <Wrapper>
          <Grid />
        </Wrapper>
      </PopoverContent>
    </Popover>
  )
}
export { Works }
