import { Skeleton } from "@yz13/mono/components/skeleton"
import { Suspense } from "react"
import { LuMenu, LuSettings2 } from "react-icons/lu"
import { Contacts } from "../content/contacts"
import { Trigger } from "../ui/trigger"
import { User } from "./user"

const Plank = () => {
  return (
    <div className="flex items-center shrink-0 justify-center mx-auto h-10 w-fit gap-1.5">
      <Trigger value="menu">
        <LuMenu size={20} />
      </Trigger>
      <Suspense fallback={
        <>
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="size-6 rounded-full" />
        </>
      }>
        <Contacts />
      </Suspense>
      {/* <Trigger value="control-center">
            <LuLayoutGrid size={20} />
          </Trigger> */}
      <Trigger value="settings">
        <LuSettings2 size={20} />
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
