import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"

type MarkerSize = "max" | "mid" | "min"
type Props = {
  className?: string
  size?: MarkerSize
  text?: string
}
const Marker = ({ text = "", size = 'max', className = "" }: Props) => {
  const formattedSize = size === 'max' ? "h-full" : size === 'mid' ? 'h-2/3' : "h-1/3"
  return (
    <div className={cn('relative flex items-end justify-center h-full', className)}>
      <div className='absolute flex items-center justify-center w-5 h-5 rounded-md -top-10'>
        <span className="text-xs transition-colors text-accents-4 hover:text-accent-foreground">{text}</span>
      </div>
      <Separator className={formattedSize} orientation="vertical" />
    </div>
  )
}
export { Marker }
