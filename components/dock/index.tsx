import { Locales } from "@/dictionaries/tools"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { Suspense } from "react"
import { LuMenu } from "react-icons/lu"
import { DockContent } from "./ui/content"
import { Contacts } from "./ui/section/contacts"
import { Menu } from "./ui/section/menu"
import { User } from "./ui/section/user"
import { Trigger } from "./ui/trigger"
import { DockWrapper } from "./ui/wrapper"

const Dock = ({ lang = "en" }: { lang?: Locales }) => {
  return (
    <DockWrapper>
      <DockContent
        content={{
          "menu": <Menu lang={lang} />
        }}
      />
      <div className="flex items-center shrink-0 justify-center mx-auto h-8 w-fit gap-1.5">
        <Trigger value="menu">
          <LuMenu size={16} />
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
        <Trigger value="user">
          <Suspense fallback={<Skeleton className="size-6 rounded-full" />}>
            <User size={24} />
          </Suspense>
        </Trigger>
      </div>
    </DockWrapper>
  )
}
export { Dock }
