import { Separator } from "@yz13/mono/components/separator"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { Menu, SlidersHorizontal } from "lucide-react"
import { Suspense } from "react"
import { Trigger } from "../ui/trigger"
import { User } from "./user"

const Plank = () => {
  return (
    <div className="flex items-center shrink-0 justify-center mx-auto h-10 w-fit gap-1.5">
      <Trigger value="menu">
        <Menu size={20} />
      </Trigger>
      <Separator orientation="vertical" className="h-6" />
      <Trigger value="settings">
        <SlidersHorizontal size={20} />
      </Trigger>
      <Trigger value="user">
        <Suspense fallback={<Skeleton className="size-6 rounded-full" />}>
          <User size={36} />
        </Suspense>
      </Trigger>
    </div>
  )
}
export { Plank }
