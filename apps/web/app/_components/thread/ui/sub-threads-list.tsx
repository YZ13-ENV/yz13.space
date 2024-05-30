import { cn } from "@repo/ui/cn"
import { SubThreadV2 } from "./sub-threads/sub-thread-v2"
import { SubThreadsProps } from "./threads/thread-v1"


type Props = {
  className?: string
  component?: (props: SubThreadsProps) => Promise<JSX.Element>
}
const SubThreadsList = ({ className = "", component = SubThreadV2 }: Props) => {
  return (
    <div className={cn("w-full space-y-3", className)}>

    </div>
  )
}
export { SubThreadsList }
