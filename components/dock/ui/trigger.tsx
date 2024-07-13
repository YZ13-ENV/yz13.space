import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover"
import { ReactNode } from "react"

type TriggerProps = {
  children?: ReactNode
  content?: ReactNode
  className?: string
  asChild?: boolean
}
const Trigger = ({ children, asChild = false, content, className = '' }: TriggerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 aspect-square bg-yz-neutral-200 rounded-full"
          asChild={asChild}
        >
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={24} className={cn("p-0 shadow-none border-0 w-[32rem]", className)}>
        {content}
      </PopoverContent>
    </Popover>

  )
}
export { Trigger }
