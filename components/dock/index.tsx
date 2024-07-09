import { NewThreadForm } from "@/app/(threads)/_components/new-thread/form"
import { Locales } from "@/dictionaries/tools"
import { createClient } from "@/packages/supabase/src/supabase/server"
import { Separator } from "@repo/ui/separator"
import { cookies } from "next/headers"
import { BsThreads } from "react-icons/bs"
import { LuMenu } from "react-icons/lu"
import { Menu } from "./ui/section/menu"
import { User } from "./ui/section/user"
import { Trigger } from "./ui/trigger"
import { DockWrapper } from "./ui/wrapper"

const Dock = async ({ lang = "en" }: { lang?: Locales }) => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const metadata = user?.user_metadata
  const isAdmin = (metadata?.type || "user") === "admin"
  return (
    <DockWrapper>
      <Trigger className="lg:w-80 w-screen" content={<Menu />}>
        <LuMenu size={16} />
      </Trigger>
      <Separator orientation="vertical" className="h-2/3" />
      {
        (user && isAdmin) &&
        <Trigger content={
          <div className="max-w-xl border w-full rounded-2xl max-h-full bg-background h-fit">
            <NewThreadForm user={user} />
          </div>
        }>
          <BsThreads size={16} />
        </Trigger>
      }
      <Trigger>
        <User />
      </Trigger>
    </DockWrapper>
  )
}
export { Dock }
