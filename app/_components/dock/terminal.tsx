import { Terminal } from "@/app/works/terminal"
import { Button } from "@/packages/ui/src/components/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/packages/ui/src/components/popover"
import { PiTerminalDuotone } from "react-icons/pi"
import { SimpleTooltip } from "../simple-tooltip"

const DockTerminal = () => {
  return (
    <Popover>
      <SimpleTooltip text="Терминал" sideOffset={10}>
        <PopoverTrigger asChild>
          <Button size="icon" variant="ghost">
            <PiTerminalDuotone size={18} />
          </Button>
        </PopoverTrigger>
      </SimpleTooltip>
      <PopoverContent
        sideOffset={24}
        side="top"
        className="border lg:w-96 w-screen p-0 bg-yz-neutral-100 rounded-xl shadow-none"
      >
        <Terminal className="h-96 flex flex-col justify-between" />
      </PopoverContent>
    </Popover>
  )
}
export { DockTerminal }
